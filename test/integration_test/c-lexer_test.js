function returnCaseList() {
    return [
        {
            "input": "",
            "output": 0,
        },
        {
            "input": "int",
            "output": [{"type": "Keyword", "value": "int"}],
        },
        {
            "input": "int;",
            "output": [
                {"type": "Keyword", "value": "int"},
                {"type": "Symbol", "value": ";"},
            ],
        },
        {
            "input": "int a",
            "output": [
                {"type": "Keyword", "value": "int"},
                {"type": "Identifier", "value": "a"},
            ],
        },
        {
            "input": "int a;",
            "output": [
                {"type": "Keyword", "value": "int"},
                {"type": "Identifier", "value": "a"},
                {"type": "Symbol", "value": ";"},
            ],
        },
        {
            "input": ";",
            "output": [
                {"type": "Symbol", "value": ";"},
            ],
        },
        {
            "input": ";int",
            "output": [
                {"type": "Symbol", "value": ";"},
                {"type": "Keyword", "value": "int"},
            ],
        },
        {
            "input": ";int;",
            "output": [
                {"type": "Symbol", "value": ";"},
                {"type": "Keyword", "value": "int"},
                {"type": "Symbol", "value": ";"},
            ],
        },
        {
            "input": "char;",
            "output": [
                {"type": "Keyword", "value": "char"},
                {"type": "Symbol", "value": ";"},
            ],
        },
        {
            "input": "float;",
            "output": [
                {"type": "Keyword", "value": "float"},
                {"type": "Symbol", "value": ";"},
            ],
        },
        {
            "input": "return 0.2224322432;",
            "output": 3,
        },
        {
            "input": ";;;;;",
            "output": 5,
        },
        {
            "input": 'int a = b^2;int a = b~2;',
            "output": 14,
        },
        {
            "input": "#include <stdio.h>",
            "output": 7,
        },
        {
            "input": "char *str = \"This is a string.\";",
            "output": 6,
        },
        {
            "input": "printf(\"char: %c\\n\", c);",
            "output": 7,
        },
        {
            "input": "printf(\"string1: %s\\n\", str);",
            "output": 7,
        },
        {
            "input": "printf(\"char: %c\\n\", c);\nprintf(\"string1: %s\\n\", str);",
            "output": 15,
        },
        {
            "input": "signed int a = 23;unsigned int b = 24324;",
            "output": 12,
        },
        {
            "input": "'A\"'';rt;ewr';trewl;\"'t,w4;5lmyktr ;jwngh25t;j1",
            "output": 12,
        },
        {
            "input": "%E^SP&*@#$hbj89hr24576rtgvyx6^%^$S%%32",
            "output": 16,
        },
        {
            "input": "[][<>[]]][][[[][[]{]{}[}",
            "output": 24,
        },
        {
            "input": "fruit = apples + oranges;",
            "output": 6,
        },
        {
            "input": "/* Hello,World */",
            "output": 7,
        },
        {
            "input": "a = a && 2 || 2 | 1 << 2 >> 1 <<<2;",
            "output": 17,
        },
        {
            "input": "''\"\">><><>KL:<L:L:M><>>>>><<!!!=!===!<<>'';'\t",
            "output": 32,
        },
        {
            "input": "~^%&541$!#$!t¥r54.,l;.',l\"/[?\\]\"[\\o''k\"[21'''\\\\''][kop",
            "output": 24,
        },
        {
            "input": '"hello \\world"',
            "output": [
                {"type": "String", "value": '"hello \\world"'},
            ],
        },
        {
            "input": '"hello \\" world"',
            "output": [
                {"type": "String", "value": '"hello \\" world"'},
            ],
        },
        {
            "input": '"hello \\"""world"',
            "output": [
                {"type": "String", "value": '"hello \\""'},
                {"type": "String", "value": '"world"'},
            ]
        },
        {
            "input": '"\\\""',
            "output": [
                {"type": "String", "value": '"\\\""'},
            ],
        },
    ];
}
