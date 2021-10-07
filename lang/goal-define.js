// Constant type: Enum
const ENUM_CONST = {
    S_RESET: 0,
    S_G: 1,
    S_LEFT_BRACKET: 2,
    S_O: 3,
    S_AL_A: 4,
    S_AL_L: 5,
    S_AL_RIGHT_BRACKET: 6,
    S_UNKNOWN: 7,
};

// Constant type: DFA State
const DFA_STATE_CONST = {
    S_RESET: ENUM_CONST.S_RESET,
    S_G: ENUM_CONST.S_G,
    S_LEFT_BRACKET: ENUM_CONST.S_LEFT_BRACKET,
    S_O: ENUM_CONST.S_O,
    S_AL_A: ENUM_CONST.S_AL_A,
    S_AL_L: ENUM_CONST.S_AL_L,
    S_AL_RIGHT_BRACKET: ENUM_CONST.S_AL_RIGHT_BRACKET,
    S_UNKNOWN: ENUM_CONST.S_UNKNOWN,
};

// Tool package
let tool = {
    isUndefined(obj) {
        return typeof obj === "undefined";
    },
    isNodeEnvironment() {
        return typeof window === "undefined";
    },
    judgeTokenType(state, value) {
        // Derive Token type according to State
        if (state === DFA_STATE_CONST.S_G) {
            return "G";
        }
        if (state === DFA_STATE_CONST.S_O) {
            return "o";
        }
        if (state === DFA_STATE_CONST.S_AL_RIGHT_BRACKET) {
            return "al";
        }
        if (state === DFA_STATE_CONST.S_UNKNOWN) {
            return "Unknown";
        }
        return "";
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

    getNextState(ch, state) {
        // Handling of non-common parts
        if (ch === "G") {
            if (state === DFA_STATE_CONST.S_RESET) {
                return DFA_STATE_CONST.S_G;
            }
        } else if (ch === "a") {
            if (state === DFA_STATE_CONST.S_LEFT_BRACKET) {
                return DFA_STATE_CONST.S_AL_A;
            }
        } else if (ch === "l") {
            if (state === DFA_STATE_CONST.S_AL_A) {
                return DFA_STATE_CONST.S_AL_L;
            }
        } else if (ch === "(") {
            if (state === DFA_STATE_CONST.S_RESET) {
                return DFA_STATE_CONST.S_LEFT_BRACKET;
            }
        } else if (ch === ")") {
            if (state === DFA_STATE_CONST.S_LEFT_BRACKET) {
                return DFA_STATE_CONST.S_O;
            }
            if (state === DFA_STATE_CONST.S_AL_L) {
                return DFA_STATE_CONST.S_AL_RIGHT_BRACKET;
            }
        }

        // Handling of common parts
        if (state === DFA_STATE_CONST.S_RESET || state === DFA_STATE_CONST.S_UNKNOWN) {
            return DFA_STATE_CONST.S_UNKNOWN;
        }

        return DFA_STATE_CONST.S_RESET;
    }
};

// Unit Testing
if (tool.isNodeEnvironment()) {
    let assert = require('assert');
    assert.equal(tool.isUndefined(flowModel.FakeValue), true, "tool.isUndefined单测失败");
}

// Automated Testing
let autoTest = {
    returnCaseList() {
        return [
            {
                "input": "G()(al)",
                "output": 3,
            },
            {
                "input": "G()()()()(al)",
                "output": 6,
            },
            {
                "input": "(al)G(al)()()G",
                "output": 6,
            }
        ];
    },
};