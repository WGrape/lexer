let tool = {
    isUndefined(obj) {
        return "undefined" === typeof obj;
    },
    judgeTokenType(token) {
        let list = LEXER_CONST.DFA.TOKEN;
        if (list.OPERATOR.COMPUTE.indexOf(token) > -1 || list.OPERATOR.COMPARE.indexOf(token) > -1 || list.OPERATOR.COMPOSE.indexOf(token) > -1) {
            return "Operator";
        } else if (list.DOUBLE_OPERATOR.COMPARE.indexOf(token) > -1) {
            return 'DoubleOperator';
        } else if (list.KEYWORD.indexOf(token) > -1) {
            return 'Keyword';
        } else if (!isNaN(parseInt(token))) {
            return "Number";
        } else {
            return 'Identifier';
        }
    }
};