let fs = require('fs')
let rootDirectory = __dirname + "/../";
let testDirectory = rootDirectory + "test/";
let packageDirectory = rootDirectory + "package/";
const args = process.argv.slice(2);
const argLang = args[0];
const argTestType = parseInt(args[1]); // 1:Unit Testing, 2:Automated Testing
const argTestFile = args[2];

console.log("command=\"node test/main.js " + args.join(" ") + "\"");
if (argTestType === 2) {
    // require package/{lang}-lexer.min.js file
    eval(fs.readFileSync(packageDirectory + argLang + '-lexer.min.js', 'utf8').toString());

    // require testFile
    eval(fs.readFileSync(testDirectory + argTestFile, 'utf8').toString());

    // define caseList
    let caseList = returnCaseList();
    console.info("\x1b[33m" + "Automated testing has " + caseList.length + ' cases, now is running ...' + "\x1b[33m");

    // run caseList
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
            console.info("\x1B[32m" + 'Case ' + (i + 1) + ': success | ' + 'input = ' + caseList[i].input + "\x1B[0m");
        }
    }
} else if (argTestType === 1) {
    // require package/{lang}-define.min.js file
    eval(fs.readFileSync(packageDirectory + argLang + '-define.min.js', 'utf8').toString());

    // require testFile
    eval(fs.readFileSync(testDirectory + argTestFile, 'utf8').toString());

    runUnitTesting();
}