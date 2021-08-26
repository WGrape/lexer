const LEXER_CONST = {
    ISR: {
        CHAR: {
            PLUS: '+',
            SUBTRACT: '-',
            TIMES: '*',
            DIVIDE: '/',

            GREAT: '>',
            LESS: '<',
            ASSIGN: '=',

            GREAT_EQUAL: ">=",
            LESS_EQUAL: "<=",
            EQUAL: '==',
            NOT_EQUAL: "!=",

            DOT: '.',
            COMMA: ',',
            SEMICOLON: ';',

            LEFT_BRACKET: '(',
            RIGHT_BRACKET: '(',
            LEFT_BRACE: '{',
            RIGHT_BRACE: '}',

            SHARP: "#",
            NOT: "!",
            WHITESPACE: ' ',
        },
    },
    DFA: {
        STATE: {
            RESET: 0,
            S1: 1,
            S2: 2,
            S3: 3,
            S4: 4,
            S5: 5,
            S6: 6,
            S7: 7,
            END: 100,
        },
        TOKEN: {
            OPERATOR: {
                COMPUTE: ['+', '-', '*', '/'],
                COMPARE: ['>', '<', '='],
                COMPOSE: [
                    '.', ',', ';',
                    '(', ')', '{', '}',
                    '#', '!', ' ',
                ],
            },
            DOUBLE_OPERATOR: {
                COMPARE: ['>=', '<=', '==', '!='],
            },
            KEYWORD: [
                'char', 'int', 'short', 'long', 'float', 'double', 'sizeof', 'signed', 'unsigned',
                'if', 'else', 'while', 'for', 'do', 'break', 'continue', 'goto',
                'void', 'return', 'switch', 'case', 'default',
                'const', 'static', 'auto', 'extern', 'register',
                'struct', 'union', 'enum', 'typedef',
            ],
            IDENTIFIER: [],
        },
    }
};