function runUnitTesting() {
    function consoleSuccess(message) {
        console.info("\x1B[32m" + message + "\x1B[0m");
    }

    function consoleFailed(message) {
        console.error("\033[1;31m" + message + "\033[1;31m");
    }

    if (tool.isUndefined(flowModel.FakeValue) === true) {
        consoleSuccess("1. Test success: tool.isUndefined");
    } else {
        consoleFailed("2. Test failed: tool.isUndefined");
        return false;
    }

    return true;
}

