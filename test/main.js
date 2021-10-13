let fs = require('fs');
let rootDirectory = __dirname + "/../";
let testDirectory = rootDirectory + "test/";
let packageDirectory = rootDirectory + "package/";
const args = process.argv.slice(2);
const argLang = args[0].toLowerCase(); // choose lang
const argTestType = parseInt(args[1]); // choose type of testing, 1:Unit Testing, 2:Automated Testing, 3:Npm Testing
const argTestFile = args[2]; // choose '*_test' file
const argShowProcess = parseInt(args[3]); // choose whether show process or not, notice: zero of string is true, so make sure it's integer

function runCaseList(lexer, caseList, showProcess) {
    if (showProcess) {
        console.info("\x1b[33m" + "Automated testing has " + caseList.length + ' cases, now is running ...' + "\x1b[33m");
    }

    for (let i = 0; i <= caseList.length - 1; ++i) {
        let outputs = caseList[i].output;
        lexer.start(caseList[i].input);

        let failed = false;
        let tokens = lexer.DFA.result.tokens;
        if (!isNaN(outputs)) {
            failed = outputs !== tokens.length;
        } else {
            for (let j = 0; j <= tokens.length - 1; ++j) {
                if (typeof outputs[j] === 'undefined' || outputs[j].type !== tokens[j].type || outputs[j].value !== tokens[j].value) {
                    failed = true;
                }
            }
        }

        if (failed) {
            console.error("\033[1;31m" + 'Case ' + (i + 1) + ': failed | ' + 'input = ' + caseList[i].input + "\033[1;31m");
        } else {
            if (showProcess) {
                console.info("\x1B[32m" + 'Case ' + (i + 1) + ': success | ' + 'input = ' + caseList[i].input + "\x1B[0m");
            }
        }
    }
}

if (argShowProcess) {
    console.log("command=\"node test/main.js " + args.join(" ") + "\"");
}
if (argTestType === 3) {
    let npmEntry = require(rootDirectory+"index.js");

    // require testFile
    eval(fs.readFileSync(testDirectory + argTestFile, 'utf8').toString());

    // define lexer
    let lexer = null;
    if (argLang === 'c') {
        lexer = npmEntry.cLexer;
    } else if (argLang === 'sql') {
        lexer = npmEntry.sqlLexer;
    } else if (argLang === 'goal') {
        lexer = npmEntry.goalLexer;
    }

    // define caseList
    let caseList = returnCaseList();

    // run caseList
    runCaseList(lexer, caseList, argShowProcess);

} else if (argTestType === 2) {
    // require package/{lang}-lexer.min.js file
    eval(fs.readFileSync(packageDirectory + argLang + '-lexer.min.js', 'utf8').toString());

    // require testFile
    eval(fs.readFileSync(testDirectory + argTestFile, 'utf8').toString());

    // define caseList
    let caseList = returnCaseList();

    // run caseList
    runCaseList(lexer, caseList, argShowProcess);
} else if (argTestType === 1) {
    // require package/{lang}-define.min.js file
    eval(fs.readFileSync(packageDirectory + argLang + '-define.min.js', 'utf8').toString());

    // require testFile
    eval(fs.readFileSync(testDirectory + argTestFile, 'utf8').toString());

    runUnitTesting(argShowProcess);
}