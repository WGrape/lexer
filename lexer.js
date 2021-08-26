// 词法分析器
let lexer = {

    // 输入流读取器 Input Stream Reader
    ISR: {
        props: {
            stream: "", // 字符流
            length: 0, // 字符流的长度
            seq: 0, // 字符流的序号
        },
        propsChange: {
            incrSeq() {
                lexer.ISR.props.seq++;
            },
            toDefault() {
                lexer.ISR.props.stream = '';
                lexer.ISR.props.length = 0;
                lexer.ISR.props.seq = 0;
            },
        },

        before(stream) {
            // 确定字符流
            lexer.ISR.props.stream = stream;

            // 换行符替换为空格
            lexer.ISR.props.stream = lexer.ISR.props.stream.replace(/\n/g, " ").trim();

            // 多个空格替换为1个空格
            lexer.ISR.props.stream = lexer.ISR.props.stream.replace(/\s+/g, " ").trim();

            // 计算字符流长度和序号
            lexer.ISR.props.length = lexer.ISR.props.stream.length;
            lexer.ISR.props.seq = 0;
        },
        after() {
            lexer.DFA.resultChange.filter();
        },
        nextChar() {
            let seq = lexer.ISR.props.seq;
            if (seq <= lexer.ISR.props.length - 1) {
                return lexer.ISR.props.stream[seq];
            }
            return undefined;
        },
        isLastChar() {
            return lexer.ISR.props.seq === lexer.ISR.props.length - 1;
        },
        read() {
            let ch = '';
            let currentStates = [];
            while (!tool.isUndefined(ch = lexer.ISR.nextChar())) {
                let match = false;
                let end = false;
                switch (true) {
                    case ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')):
                        currentStates = [LEXER_CONST.DFA.STATE.RESET, LEXER_CONST.DFA.STATE.S1];
                        if (currentStates.indexOf(lexer.DFA.state) > -1) {
                            match = true;
                            lexer.DFA.events.flowtoS1State(ch);
                        }
                        break;
                    case (!isNaN(parseInt(ch)) && ch >= 0 && ch <= 9):
                        currentStates = [LEXER_CONST.DFA.STATE.RESET, LEXER_CONST.DFA.STATE.S1, LEXER_CONST.DFA.STATE.S5];
                        if (currentStates.indexOf(lexer.DFA.state) > -1) {
                            match = true;
                            lexer.DFA.events.flowtoS5State(ch);
                        }
                        break;
                    case (LEXER_CONST.DFA.TOKEN.OPERATOR.COMPUTE.indexOf(ch) > -1):
                        currentStates = [LEXER_CONST.DFA.STATE.RESET];
                        if (currentStates.indexOf(lexer.DFA.state) > -1) {
                            match = true;
                            lexer.DFA.events.flowtoS2State(ch);
                        }
                        break;
                    case (LEXER_CONST.DFA.TOKEN.OPERATOR.COMPOSE.indexOf(ch) > -1):
                        currentStates = [LEXER_CONST.DFA.STATE.RESET];
                        if (currentStates.indexOf(lexer.DFA.state) > -1) {
                            match = true;
                            if (lexer.ISR.isLastChar()) {
                                end = true;
                                lexer.DFA.events.flowtoEndState(ch);
                            } else if (ch === LEXER_CONST.ISR.CHAR.NOT) {
                                lexer.DFA.events.flowtoS3State(ch);
                            } else {
                                lexer.DFA.events.flowtoS2State(ch);
                            }
                        }

                        currentStates = [LEXER_CONST.DFA.STATE.S1];
                        if (currentStates.indexOf(lexer.DFA.state) > -1) {
                            if (ch === LEXER_CONST.ISR.CHAR.UNDERLINE) {
                                match = true;
                                lexer.DFA.events.flowtoS1State(ch);
                            }
                        }
                        break;
                    case (LEXER_CONST.DFA.TOKEN.OPERATOR.COMPARE.indexOf(ch) > -1):
                        if (lexer.DFA.state === LEXER_CONST.DFA.STATE.RESET) {
                            match = true;
                            lexer.DFA.events.flowtoS4State(ch);
                        } else if (lexer.DFA.state === LEXER_CONST.DFA.STATE.S3 || lexer.DFA.state === LEXER_CONST.DFA.STATE.S4) {
                            if (ch === LEXER_CONST.ISR.CHAR.ASSIGN) {
                                match = true;
                                lexer.DFA.events.flowtoS6State(ch);
                            }
                        }
                        break;
                    case ([LEXER_CONST.ISR.CHAR.WHITESPACE].indexOf(ch) > -1):
                        if (lexer.DFA.state === LEXER_CONST.DFA.STATE.RESET) {
                            match = true;
                            lexer.DFA.events.flowtoS7State(ch);
                        }
                        break;
                    default:
                        // 如果当前是S1状态, 则说明英文字符串后跟了汉字等各种符号字符
                        currentStates = [LEXER_CONST.DFA.STATE.RESET, LEXER_CONST.DFA.STATE.S1];
                        if (currentStates.indexOf(lexer.DFA.state) > -1) {
                            match = true;
                            lexer.DFA.events.flowtoS1State(ch);
                        }
                        break;
                }

                if (match) {
                    lexer.ISR.propsChange.incrSeq();
                    if (end) {
                        lexer.DFA.resultChange.produceToken();
                    }
                } else {
                    lexer.DFA.events.flowtoResetState();
                    lexer.DFA.resultChange.produceToken();
                }
            }
        },
    },

    // 有限状态自动机 deterministic finite automaton
    DFA: {
        result: {
            queue: [], // 待组成token的字符队列
            tokens: [],
        },
        resultChange: {
            toDefault() {
                lexer.DFA.result.queue = [];
                lexer.DFA.result.tokens = [];
            },
            pushToTokens(token) {
                lexer.DFA.result.tokens.push(token);
                lexer.DFA.result.queue = [];
            },
            pushToQueue(ch) {
                lexer.DFA.result.queue.push(ch);
            },
            filter() {
                let tokens = [];
                lexer.DFA.result.tokens.forEach((token => {
                    if (token.value !== LEXER_CONST.ISR.CHAR.WHITESPACE) {
                        tokens.push(token);
                    }
                }));
                lexer.DFA.result.tokens = tokens;
            },
            produceToken() {
                if (lexer.DFA.result.queue.length) {
                    let value = lexer.DFA.result.queue.join('');
                    let type = tool.judgeTokenType(value);
                    let token = {
                        "type": type,
                        "value": value,
                    };
                    lexer.DFA.resultChange.pushToTokens(token);
                }
            },
        },

        state: LEXER_CONST.DFA.STATE.RESET, // 当前机器的状态
        events: {
            flowtoS1State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S1;
            },

            flowtoS2State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S2;
            },

            flowtoS3State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S3;
            },

            flowtoS4State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S4;
            },

            flowtoS5State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S5;
            },

            flowtoS6State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S6;
            },

            flowtoS7State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S7;
            },

            flowtoS8State(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.S8;
            },

            flowtoEndState(ch) {
                lexer.DFA.resultChange.pushToQueue(ch);
                lexer.DFA.state = LEXER_CONST.DFA.STATE.END;
            },

            flowtoResetState() {
                lexer.DFA.state = LEXER_CONST.DFA.STATE.RESET;
            },
        },
    },

    // 重置词法分析器数据
    resetDefault() {
        lexer.ISR.propsChange.toDefault();
        lexer.DFA.resultChange.toDefault();
    },

    // 开始工作
    start(stream) {
        lexer.resetDefault();
        lexer.ISR.before(stream);
        lexer.ISR.read();
        lexer.ISR.after();
    },
};