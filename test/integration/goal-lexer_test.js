/**
 * Returns integration test cases for C lexer.
 * Each case has an `input` string and an `output` expectation:
 * - If `output` is a number: it asserts the token count equals this number.
 * - If `output` is an array: it asserts each token's `type` and `value` match.
 */
function returnCaseList() {
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
}