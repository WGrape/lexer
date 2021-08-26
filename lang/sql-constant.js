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
            NOT_EQUAL: "!=",

            DOT: '.',
            UNDERLINE: '_',
            COMMA: ',',
            BACK_QUOTE: '`',
            SEMICOLON: ';',

            LEFT_BRACKET: '(',
            RIGHT_BRACKET: '(',

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
            S8: 8,
            END: 100,
        },
        TOKEN: {
            OPERATOR: {
                COMPUTE: ['+', '-', '*', '/'],
                COMPARE: ['>', '<', '='],
                COMPOSE: [
                    '.', '_', ',', '`', ';',
                    '(', ')',
                    '#', '!', ' ',
                ],
            },
            DOUBLE_OPERATOR: {
                COMPARE: ['>=', '<=', '!='],
            },
            KEYWORD: [
                'select', 'from', 'where', 'and', 'group', 'order', 'by', 'having', 'desc', 'asc', 'limit',
                'insert', 'into', 'values',
                'update', 'set',
                'delete', 'drop', 'table'
            ],
            IDENTIFIER: [],
        },
    }
};