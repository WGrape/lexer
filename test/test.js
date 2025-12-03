const fs = require('fs');
const path = require('path');

const rootDirectory = path.join(__dirname, '..');
const testDirectory = path.join(rootDirectory, 'test');
const packageDirectory = path.join(rootDirectory, 'package');

/**
 * Print an informational message in yellow.
 * @param {string} msg Message to print.
 */
function logInfo(msg) {
    console.info("\x1B[33m" + msg + "\x1B[0m");
}
/**
 * Print a success message in green.
 * @param {string} msg Message to print.
 */
function logSuccess(msg) {
    console.info("\x1B[32m" + msg + "\x1B[0m");
}
/**
 * Print a failure message in red.
 * @param {string} msg Message to print.
 */
function logFailed(msg) {
    console.error("\x1B[31m" + msg + "\x1B[0m");
}

/**
 * Execute a list of test cases against a lexer.
 * @param {*} lexer The lexer instance (with `start` and `DFA.result.tokens`).
 * @param {Array} caseList Array of cases: {input: string, output: number|Array<{type:string,value:string}>}.
 * @param {boolean} showProcess Whether to print per-case progress.
 * @returns {boolean} True if all cases pass, false otherwise.
 */
function runCaseList(lexer, caseList, showProcess) {
    if (showProcess) {
        logInfo(`Automated testing has ${caseList.length} cases, now is running ...`);
    }
    let anyFailed = false;

    for (let i = 0; i <= caseList.length - 1; ++i) {
        const outputs = caseList[i].output;
        lexer.start(caseList[i].input);

        let failed = false;
        const tokens = lexer.DFA.result.tokens;
        if (!isNaN(outputs)) {
            failed = outputs !== tokens.length;
        } else {
            for (let j = 0; j <= tokens.length - 1; ++j) {
                if (typeof outputs[j] === 'undefined' || outputs[j].type !== tokens[j].type || outputs[j].value !== tokens[j].value) {
                    failed = true;
                    break;
                }
            }
        }

        if (failed) {
            anyFailed = true;
            logFailed(`Case ${i + 1}: failed | input = ${caseList[i].input}`);
        } else if (showProcess) {
            logSuccess(`Case ${i + 1}: success | input = ${caseList[i].input}`);
        }
    }
    return !anyFailed;
}

/**
 * Load and eval a JS file (used for packaged test files and lexers).
 * @param {string} filePath Absolute path to file to evaluate.
 */
function loadFileEval(filePath) {
    const code = fs.readFileSync(filePath, 'utf8').toString();
    // eslint-disable-next-line no-eval
    eval(code);
}

/**
 * Run a single test job (unit/integration/npm) similar to legacy main.js.
 * @param {string} lang Language key: 'c' | 'sql' | 'goal'.
 * @param {number} type Test type: 1=Unit (define only), 2=Integration (package lexer), 3=NPM entry.
 * @param {string} testFile Test file relative path under `test/`.
 * @param {number} [showProcess=1] Whether to show process (1) or be quiet (0).
 * @returns {boolean} True on success, false on any failure.
 */
function runTest(lang, type, testFile, showProcess = 1) {
    // Show command used (align with main.js behavior)
    if (showProcess) {
        logInfo(`command="node test/test.js ${lang} ${type} ${testFile} ${showProcess}"`);
    }

    // Load language runtime depending on type
    if (type === 3) {
        const npmEntry = require(path.join(rootDirectory, 'index.js'));
        let lexer = null;
        if (lang === 'c') {
            lexer = npmEntry.cLexer;
        } else if (lang === 'sql') {
            lexer = npmEntry.sqlLexer;
        } else if (lang === 'goal') {
            // goal is packaged but not exported via index.js; fallback to package
            loadFileEval(path.join(packageDirectory, `${lang}-lexer.min.js`));
            lexer = global.lexer || (typeof window !== 'undefined' ? window.lexer : null);
        }

        loadFileEval(path.join(testDirectory, testFile));
        const caseList = typeof returnCaseList === 'function' ? returnCaseList() : [];
        return runCaseList(lexer, caseList, !!showProcess);

    } else if (type === 2) {
        loadFileEval(path.join(packageDirectory, `${lang}-lexer.min.js`));
        loadFileEval(path.join(testDirectory, testFile));

        const lexer = global.lexer || (typeof window !== 'undefined' ? window.lexer : null);
        const caseList = typeof returnCaseList === 'function' ? returnCaseList() : [];
        return runCaseList(lexer, caseList, !!showProcess);

    } else if (type === 1) {
        // Unit: load only define
        loadFileEval(path.join(packageDirectory, `${lang}-define.min.js`));
        loadFileEval(path.join(testDirectory, testFile));

        if (typeof runUnitTest === 'function') {
            return !!runUnitTest(!!showProcess);
        }
        logFailed('No unit test entry found (runUnitTest)');
        return false;
    }

    logFailed(`Unknown test type: ${type}`);
    return false;
}

/**
 * CLI entry: with no args run full suite; with args run a single test.
 * Usage: `node test/test.js [<lang> <type> <file> [<showProcess>]]`
 */
function runCLI() {
    const args = process.argv.slice(2);

    if (args.length == 0) {
        // CLI mode: node test/test.js
        const suite = [
            ['c', 1, 'unit/c-define_test.js'],
            ['goal', 1, 'unit/goal-define_test.js'],
            ['sql', 1, 'unit/sql-define_test.js'],

            ['c', 2, 'integration/c-lexer_test.js'],
            ['goal', 2, 'integration/goal-lexer_test.js'],
            ['sql', 2, 'integration/sql-lexer_test.js'],

            ['c', 3, 'integration/c-lexer_test.js'],
            ['sql', 3, 'integration/sql-lexer_test.js'],
        ];
    } else if (args.length == 3) {
        // CLI mode: node test/test.js <lang: c/sql/...> <type: 1/2/3> <file>
        const suite = [
            [args[0], parseInt(args[1], 10), args[2], 1]
        ]
    } else if (args.length > 3) {
        // CLI mode: node test/test.js <lang> <type> <file> <show
        const suite = [
            [args[0], parseInt(args[1], 10), args[2], parseInt(args[3], 10)]
        ]
    } else {
        console.error('Usage: node test/test.js [<lang> <type> <file> [<showProcess>]]');
        process.exit(1);
    }

    for (const [lang, type, file, showProcess] of suite) {
        const ok = runTest(lang, type, file, showProcess);
        if (!ok) {
            console.error('==========Unfortunately, you failed the test==========');
            process.exit(1);
        }
        logInfo();
    }

    logSuccess('Congratulations! Test Success!');
    logInfo();
}

runCLI();
