// Constant type: Enum
const ENUM_CONST = {
    // Simple Operator
    PLUS: '+',
    SUBTRACT: '-',
    TIMES: '*',
    DIVIDE: '/',
    MODE: '%',

    // Logical Operator
    NOT: '!',

    // Compare Operator
    GREAT: '>',
    LESS: '<',
    ASSIGN: '=',

    GREAT_EQUAL: ">=",
    LESS_EQUAL: "<=",
    EQUAL: "==",
    NOT_EQUAL: "!=",

    // Bit Operator
    BIT_AND: '&',
    BIT_OR: '|',
    BIT_NOT: '~',
    BIT_XOR: '^',

    CONDITION_AND: "&&",
    CONDITION_OR: "||",
    BIT_LEFT_SHIFT: "<<",
    BIT_RIGHT_SHIFT: ">>",

    // Whitespace mark
    WHITESPACE: ' ',
    LINEFEED: '\n',

    // Bracket mark
    LEFT_BRACKET: '(',
    RIGHT_BRACKET: ')',
    LEFT_BRACE: '{',
    RIGHT_BRACE: '}',
    LEFT_SQUARE_BRACKET: '[',
    RIGHT_SQUARE_BRACKET: ']',

    // Other mark
    DOT: '.',
    COMMA: ',',
    SEMICOLON: ';',
    QUOTATION: '\'',
    DOUBLE_QUOTATION: '"',
    SHARP: '#',
    QUESTION: '?',
    COLON: ':',

    // TOKEN
    T_OPERATOR: 1,
    T_DOUBLE_OPERATOR: 2,
    T_SYMBOL: 3,
    T_WHITESPACE: 4,
    T_LINEFEED: 5,
    KEYWORD: 6,
    T_IDENTIFIER: 7,
    T_NUMBER: 8,
    T_FLOAT: 9,
    T_STRING: 10,
    T_CHAR: 11,
    T_UNKNOWN: 12,

    // DFA State
    S_RESET: 0,
    S_OPERATOR: 1,
    S_SYMBOL: 2,
    S_DOUBLE_CHAR_FIRST_BIT_AND: 3,
    S_DOUBLE_CHAR_SECOND_BIT_AND: 4,
    S_DOUBLE_CHAR_FIRST_BIT_OR: 5,
    S_DOUBLE_CHAR_SECOND_BIT_OR: 6,
    S_DOUBLE_CHAR_FIRST_GREAT: 7,
    S_DOUBLE_CHAR_SECOND_GREAT: 8,
    S_DOUBLE_CHAR_FIRST_LESS: 9,
    S_DOUBLE_CHAR_SECOND_LESS: 10,
    S_DOUBLE_CHAR_FIRST_NOT: 11,
    S_DOUBLE_CHAR_FIRST_ASSIGN: 12,
    S_DOUBLE_CHAR_SECOND_ASSIGN: 13,
    S_WHITESPACE: 14,
    S_LINEFEED: 15,
    S_IDENTIFIER: 16,
    S_NUMBER: 17,
    S_FLOAT: 18,
    S_STRING: 19,
    S_STRING_END: 20,
    S_CHAR: 21,
    S_CHAR_END: 22,
    S_END: 100,
};

// Constant type: Charset
const CHARSET_CONST = {
    // Char list
    CHAR: {
        // Operator list
        OPERATOR: [
            ENUM_CONST.PLUS, ENUM_CONST.SUBTRACT, ENUM_CONST.TIMES, ENUM_CONST.DIVIDE, ENUM_CONST.MODE,
            ENUM_CONST.NOT,
            ENUM_CONST.GREAT, ENUM_CONST.LESS, ENUM_CONST.ASSIGN,
            ENUM_CONST.BIT_AND, ENUM_CONST.BIT_OR, ENUM_CONST.BIT_NOT, ENUM_CONST.BIT_XOR,
        ],
        // Symbol list
        SYMBOL: [
            ENUM_CONST.LEFT_BRACKET, ENUM_CONST.RIGHT_BRACKET, ENUM_CONST.LEFT_BRACE, ENUM_CONST.RIGHT_BRACE, ENUM_CONST.LEFT_SQUARE_BRACKET, ENUM_CONST.RIGHT_SQUARE_BRACKET,
            ENUM_CONST.DOT, ENUM_CONST.COMMA, ENUM_CONST.SEMICOLON, ENUM_CONST.QUOTATION, ENUM_CONST.DOUBLE_QUOTATION, ENUM_CONST.SHARP, ENUM_CONST.QUESTION, ENUM_CONST.COLON,
        ],
        // Whitespace list
        WHITESPACE: [
            ENUM_CONST.WHITESPACE,
        ],
        // Line feed list
        LINEFEED: [
            ENUM_CONST.LINEFEED,
        ],
    },

    // Double char list
    DOUBLE_CHAR: [
        ENUM_CONST.GREAT_EQUAL, ENUM_CONST.LESS_EQUAL, ENUM_CONST.EQUAL, ENUM_CONST.NOT_EQUAL,
        ENUM_CONST.CONDITION_AND, ENUM_CONST.CONDITION_OR, ENUM_CONST.BIT_LEFT_SHIFT, ENUM_CONST.BIT_RIGHT_SHIFT,
    ],

    // Composition of double char: &&
    DOUBLE_CHAR_FIRST_BIT_AND: [ENUM_CONST.BIT_AND],
    DOUBLE_CHAR_SECOND_BIT_AND: [ENUM_CONST.BIT_AND],

    // Composition of double char: ||
    DOUBLE_CHAR_FIRST_BIT_OR: [ENUM_CONST.BIT_OR],
    DOUBLE_CHAR_SECOND_BIT_OR: [ENUM_CONST.BIT_OR],

    // Composition of double char: >>
    DOUBLE_CHAR_FIRST_GREAT: [ENUM_CONST.GREAT],
    DOUBLE_CHAR_SECOND_GREAT: [ENUM_CONST.GREAT],

    // Composition of double char: <<
    DOUBLE_CHAR_FIRST_LESS: [ENUM_CONST.LESS],
    DOUBLE_CHAR_SECOND_LESS: [ENUM_CONST.LESS],

    // Composition of double char: >= , <= , != , ==
    DOUBLE_CHAR_FIRST_NOT: [ENUM_CONST.NOT],
    DOUBLE_CHAR_FIRST_ASSIGN: [ENUM_CONST.ASSIGN],
    DOUBLE_CHAR_SECOND_ASSIGN: [ENUM_CONST.ASSIGN],

    // Keyword
    KEYWORD: [
        'char', 'int', 'short', 'long', 'float', 'double', 'sizeof', 'signed', 'unsigned',
        'if', 'else', 'while', 'for', 'do', 'break', 'continue', 'goto',
        'void', 'return', 'switch', 'case', 'default',
        'const', 'static', 'auto', 'extern', 'register',
        'struct', 'union', 'enum', 'typedef',
        'include',
    ],
};

// Constant type: DFA State
const DFA_STATE_CONST = {
    // State of reset
    S_RESET: ENUM_CONST.S_RESET,

    // State of operator
    // State of symbol
    S_OPERATOR: ENUM_CONST.S_OPERATOR,
    S_SYMBOL: ENUM_CONST.S_SYMBOL,

    // State of double char: &&
    S_DOUBLE_CHAR_FIRST_BIT_AND: ENUM_CONST.S_DOUBLE_CHAR_FIRST_BIT_AND,
    S_DOUBLE_CHAR_SECOND_BIT_AND: ENUM_CONST.S_DOUBLE_CHAR_SECOND_BIT_AND,

    // State of double char: ||
    S_DOUBLE_CHAR_FIRST_BIT_OR: ENUM_CONST.S_DOUBLE_CHAR_FIRST_BIT_OR,
    S_DOUBLE_CHAR_SECOND_BIT_OR: ENUM_CONST.S_DOUBLE_CHAR_SECOND_BIT_OR,

    // State of double char: >>
    S_DOUBLE_CHAR_FIRST_GREAT: ENUM_CONST.S_DOUBLE_CHAR_FIRST_GREAT,
    S_DOUBLE_CHAR_SECOND_GREAT: ENUM_CONST.S_DOUBLE_CHAR_SECOND_GREAT,

    // State of double char: <<
    S_DOUBLE_CHAR_FIRST_LESS: ENUM_CONST.S_DOUBLE_CHAR_FIRST_LESS,
    S_DOUBLE_CHAR_SECOND_LESS: ENUM_CONST.S_DOUBLE_CHAR_SECOND_LESS,

    // State of double char: >=, <=, !=, ==
    S_DOUBLE_CHAR_FIRST_NOT: ENUM_CONST.S_DOUBLE_CHAR_FIRST_NOT,
    S_DOUBLE_CHAR_FIRST_ASSIGN: ENUM_CONST.S_DOUBLE_CHAR_FIRST_ASSIGN,
    S_DOUBLE_CHAR_SECOND_ASSIGN: ENUM_CONST.S_DOUBLE_CHAR_SECOND_ASSIGN,

    // State of whitespace
    S_WHITESPACE: ENUM_CONST.S_WHITESPACE,

    // State of line feed
    S_LINEFEED: ENUM_CONST.S_LINEFEED,

    // State of identifier
    S_IDENTIFIER: ENUM_CONST.S_IDENTIFIER,

    // State of number literal
    S_NUMBER: ENUM_CONST.S_NUMBER,

    // State of float literal
    S_FLOAT: ENUM_CONST.S_FLOAT,

    // State of string literal
    S_STRING: ENUM_CONST.S_STRING,
    S_STRING_END: ENUM_CONST.S_STRING_END,

    // State of char literal
    S_CHAR: ENUM_CONST.S_CHAR,
    S_CHAR_END: ENUM_CONST.S_CHAR_END,

    // State of end
    S_END: ENUM_CONST.S_END,
};

// Tool package
let tool = {
    isUndefined(obj) {
        return typeof obj === "undefined";
    },
    isNodeEnvironment() {
        return typeof window === "undefined";
    },
    isInArray(needle, haystack) {
        return haystack.indexOf(needle) > -1;
    },
    judgeTokenTypeByValue(value) {
        if (tool.isInArray(value, CHARSET_CONST.CHAR.OPERATOR)) {
            return 'Operator';
        }
        if (tool.isInArray(value, CHARSET_CONST.DOUBLE_CHAR)) {
            return 'DoubleOperator';
        }
        if (tool.isInArray(value, CHARSET_CONST.CHAR.SYMBOL)) {
            return 'Symbol';
        }
        if (tool.isInArray(value, CHARSET_CONST.KEYWORD)) {
            return 'Keyword';
        }
        return '';
    },
    judgeTokenType(state, value) {
        // Derive Token type according to Value
        let tokenType = tool.judgeTokenTypeByValue(value);
        if (tokenType) {
            return tokenType;
        }

        // Derive Token type according to State
        if (state === DFA_STATE_CONST.S_WHITESPACE) {
            return 'Whitespace';
        }
        if (state === DFA_STATE_CONST.S_LINEFEED) {
            return 'LineFeed';
        }
        if (state === DFA_STATE_CONST.S_IDENTIFIER) {
            return 'Identifier';
        }
        if (state === DFA_STATE_CONST.S_NUMBER) {
            return 'Number';
        }
        if (state === DFA_STATE_CONST.S_FLOAT) {
            return 'Float';
        }
        if (state === DFA_STATE_CONST.S_STRING_END) {
            return 'String';
        }
        if (state === DFA_STATE_CONST.S_CHAR_END) {
            return 'Char';
        }
        return 'Unknown';
    },
    getFirstCharState(ch) {
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_FIRST_BIT_AND)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_BIT_AND;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_FIRST_BIT_OR)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_BIT_OR;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_FIRST_GREAT)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_GREAT;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_FIRST_LESS)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_LESS;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_FIRST_NOT)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_NOT;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_FIRST_ASSIGN)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_ASSIGN;
        }
        return DFA_STATE_CONST.S_RESET;
    },
    getSecondCharState(ch) {
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_SECOND_BIT_AND)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_BIT_AND;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_SECOND_BIT_OR)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_BIT_OR;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_SECOND_GREAT)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_GREAT;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_SECOND_LESS)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_LESS;
        }
        if (tool.isInArray(ch, CHARSET_CONST.DOUBLE_CHAR_SECOND_ASSIGN)) {
            return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_ASSIGN;
        }
        return DFA_STATE_CONST.S_RESET;
    },

    isOperatorChar(ch) {
        return tool.isInArray(ch, CHARSET_CONST.CHAR.OPERATOR);
    },
    isSymbolChar(ch) {
        return tool.isInArray(ch, CHARSET_CONST.CHAR.SYMBOL);
    },
    isWhitespaceChar(ch) {
        return tool.isInArray(ch, CHARSET_CONST.CHAR.WHITESPACE);
    },
    isLineFeedChar(ch) {
        return tool.isInArray(ch, CHARSET_CONST.CHAR.LINEFEED);
    },
    isFirstCharOfDoubleChar(ch) {
        return tool.getFirstCharState(ch) > 0;
    },
    isSecondCharOfDoubleChar(ch) {
        return tool.getSecondCharState(ch) > 0;
    },
    isAlphabetChar(ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    },
    isNumberChar(ch) {
        return !isNaN(parseInt(ch)) && ch >= 0 && ch <= 9;
    },
    isInStates(state, states) {
        return tool.isInArray(state, states);
    }
};

// Define the DFA state flow model
let flowModel = {
    result: {
        paths: [],
    },
    resultChange: {
        pathGrow(path) {
            flowModel.result.paths.push(path)
        },
        toDefault() {
            flowModel.result.paths = [];
        }
    },

    getNextState(ch, state, matchs) {

        // Handling of common parts
        if (tool.isInStates(state, [DFA_STATE_CONST.S_STRING])) {
            if (ch !== ENUM_CONST.DOUBLE_QUOTATION) {
                return DFA_STATE_CONST.S_STRING;
            } else {
                return DFA_STATE_CONST.S_STRING_END;
            }
        }
        if (tool.isInStates(state, [DFA_STATE_CONST.S_CHAR])) {
            if (matchs.length === 1) {
                return DFA_STATE_CONST.S_CHAR;
            }
            if (matchs.length === 2 && ch === ENUM_CONST.QUOTATION) {
                return DFA_STATE_CONST.S_CHAR_END;
            }
            return DFA_STATE_CONST.S_RESET;
        }

        // Handling of non-common parts
        if (tool.isAlphabetChar(ch)) {
            if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET, DFA_STATE_CONST.S_IDENTIFIER])) {
                return DFA_STATE_CONST.S_IDENTIFIER;
            }
        } else if (tool.isNumberChar(ch)) {
            if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET, DFA_STATE_CONST.S_NUMBER])) {
                return DFA_STATE_CONST.S_NUMBER;
            }
            if (tool.isInStates(state, [DFA_STATE_CONST.S_FLOAT])) {
                return DFA_STATE_CONST.S_FLOAT;
            }
            if (tool.isInStates(state, [DFA_STATE_CONST.S_IDENTIFIER])) {
                return DFA_STATE_CONST.S_IDENTIFIER;
            }
        } else if (tool.isOperatorChar(ch)) {
            if (tool.isFirstCharOfDoubleChar(ch)) {
                if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET])) {
                    return tool.getFirstCharState(ch);
                }
            }
            if (tool.isSecondCharOfDoubleChar(ch)) {
                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_BIT_AND && ch === ENUM_CONST.BIT_AND) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_BIT_AND;
                }
                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_BIT_OR && ch === ENUM_CONST.BIT_OR) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_BIT_OR;
                }
                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_GREAT && ch === ENUM_CONST.GREAT) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_GREAT;
                }
                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_LESS && ch === ENUM_CONST.LESS) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_LESS;
                }

                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_GREAT && ch === ENUM_CONST.ASSIGN) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_ASSIGN;
                }
                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_LESS && ch === ENUM_CONST.ASSIGN) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_ASSIGN;
                }
                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_NOT && ch === ENUM_CONST.ASSIGN) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_ASSIGN;
                }
                if (state === DFA_STATE_CONST.S_DOUBLE_CHAR_FIRST_ASSIGN && ch === ENUM_CONST.ASSIGN) {
                    return DFA_STATE_CONST.S_DOUBLE_CHAR_SECOND_ASSIGN;
                }
            }

            if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET])) {
                return DFA_STATE_CONST.S_OPERATOR;
            }
        } else if (tool.isSymbolChar(ch)) {
            if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET])) {
                if (ch === ENUM_CONST.QUOTATION) {
                    return DFA_STATE_CONST.S_CHAR;
                }
                if (ch === ENUM_CONST.DOUBLE_QUOTATION) {
                    return DFA_STATE_CONST.S_STRING;
                }
                return DFA_STATE_CONST.S_SYMBOL;
            }
            if (tool.isInStates(state, [DFA_STATE_CONST.S_NUMBER]) && ch === ENUM_CONST.DOT) {
                return DFA_STATE_CONST.S_FLOAT;
            }
        } else if (tool.isWhitespaceChar(ch)) {
            if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET])) {
                return DFA_STATE_CONST.S_WHITESPACE;
            }
        } else if (tool.isLineFeedChar(ch)) {
            if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET])) {
                return DFA_STATE_CONST.S_LINEFEED;
            }
        } else {
            if (tool.isInStates(state, [DFA_STATE_CONST.S_RESET, DFA_STATE_CONST.S_IDENTIFIER])) {
                return DFA_STATE_CONST.S_IDENTIFIER;
            }
        }
        return DFA_STATE_CONST.S_RESET;
    },
};
