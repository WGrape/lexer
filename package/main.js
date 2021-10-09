let fs = require("fs")
let rootDirectory = __dirname + "/../";
let srcDirectory = rootDirectory + "src/";
let packageDirectory = rootDirectory + "package/";

// pack extension files and lexer file to min.js
let lexerFileCode = fs.readFileSync(srcDirectory + 'lexer.js').toString();
let extensions = [
    {
        file: srcDirectory + 'lang/c-define.js',
        define_min_file: packageDirectory + 'c-define.min.js',
        lexer_min_file: packageDirectory + 'c-lexer.min.js'
    },
    {
        file: srcDirectory + 'lang/sql-define.js',
        define_min_file: packageDirectory + 'sql-define.min.js',
        lexer_min_file: packageDirectory + 'sql-lexer.min.js'
    },
    {
        file: srcDirectory + 'lang/goal-define.js',
        define_min_file: packageDirectory + 'goal-define.min.js',
        lexer_min_file: packageDirectory + 'goal-lexer.min.js'
    },
];
for (let extension of extensions) {
    let extensionFileCode = fs.readFileSync(extension.file).toString();

    // create {lang}-lexer.min.js file
    let arr = [
        "(function(){\n",
        extensionFileCode,
        "\n",
        lexerFileCode,
        "\n\nif(typeof lexer !== 'undefined'){if(!tool.isNodeEnvironment()){window.lexer=lexer;}else{global.lexer=lexer;}}\n\n",
        "})();",
    ];
    let code = arr.join("");
    fs.writeFile(extension.lexer_min_file, code, function (err) {
        console.log(err);
    });

    // create {lang}-define.min.js file
    arr = [
        "(function(){\n",
        extensionFileCode,
        "\n",
        lexerFileCode,
        "\n\nif(typeof ENUM_CONST !== 'undefined'){if(!tool.isNodeEnvironment()){window.ENUM_CONST=ENUM_CONST;}else{global.ENUM_CONST=ENUM_CONST;}}\n",
        "\nif(typeof CHARSET_CONST !== 'undefined'){if(!tool.isNodeEnvironment()){window.CHARSET_CONST=CHARSET_CONST;}else{global.CHARSET_CONST=CHARSET_CONST;}}\n",
        "\nif(typeof DFA_STATE_CONST !== 'undefined'){if(!tool.isNodeEnvironment()){window.DFA_STATE_CONST=DFA_STATE_CONST;}else{global.DFA_STATE_CONST=DFA_STATE_CONST;}}\n",
        "\nif(typeof tool !== 'undefined'){if(!tool.isNodeEnvironment()){window.tool=tool;}else{global.tool=tool;}}\n",
        "\nif(typeof flowModel !== 'undefined'){if(!tool.isNodeEnvironment()){window.flowModel=flowModel;}else{global.flowModel=flowModel;}}\n",
        "})();",
    ];
    code = arr.join("");
    fs.writeFile(extension.define_min_file, code, function (err) {
        console.log(err);
    });
}
