// 枚举型常量
const ENUM_CONST = {
    S_RESET: 0,
    S_G: 1,
    S_LEFT_BRACKET: 2,
    S_O: 3,
    S_AL_A: 4,
    S_AL_L: 5,
    S_AL_RIGHT_BRACKET: 6,
};

// DFA状态常量
const DFA_STATE_CONST = {
    S_RESET: ENUM_CONST.S_RESET,
    S_G: ENUM_CONST.S_G,
    S_LEFT_BRACKET: ENUM_CONST.S_LEFT_BRACKET,
    S_O: ENUM_CONST.S_O,
    S_AL_A: ENUM_CONST.S_AL_A,
    S_AL_L: ENUM_CONST.S_AL_L,
    S_AL_RIGHT_BRACKET: ENUM_CONST.S_AL_RIGHT_BRACKET,
};

// 工具函数包
let tool = {
    isUndefined(obj) {
        return typeof obj === "undefined";
    },
    isNodeEnvironment() {
        return typeof window === "undefined";
    },
    judgeTokenType(state, value) {
        // 根据state推导token类型
        if (state === DFA_STATE_CONST.S_G) {
            return "G";
        }
        if (state === DFA_STATE_CONST.S_O) {
            return "o";
        }
        if (state === DFA_STATE_CONST.S_AL_RIGHT_BRACKET) {
            return "al";
        }
        return "";
    }
};

// 定义DFA状态流转模型
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
        return DFA_STATE_CONST.S_RESET;
    }
};

// 单元测试
if (tool.isNodeEnvironment()) {
    let assert = require('assert');
    assert.equal(tool.isUndefined(flowModel.FakeValue), true, "tool.isUndefined单测失败");
}

// 自动化测试
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