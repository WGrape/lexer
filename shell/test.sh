node test/main.js c 1 unit/c-define_test.js 1
result=`node test/main.js c 1 unit/c-define_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js goal 1 unit/goal-define_test.js 1
result=`node test/main.js goal 1 unit/goal-define_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js sql 1 unit/sql-define_test.js 1
result=`node test/main.js sql 1 unit/sql-define_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js c 2 auto/c-lexer_test.js 1
result=`node test/main.js c 2 auto/c-lexer_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js goal 2 auto/goal-lexer_test.js 1
result=`node test/main.js goal 2 auto/goal-lexer_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js sql 2 auto/sql-lexer_test.js 1
result=`node test/main.js sql 2 auto/sql-lexer_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js c 3 auto/c-lexer_test.js 1
result=`node test/main.js c 3 auto/c-lexer_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js goal 3 auto/goal-lexer_test.js 1
result=`node test/main.js goal 3 auto/goal-lexer_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

node test/main.js sql 3 auto/sql-lexer_test.js 1
result=`node test/main.js sql 3 auto/sql-lexer_test.js 0 2>&1 | grep 'failed'`
if [ -n "$result" ]; then
    echo "==========Unfortunately, you failed the test=========="
    exit 1
fi
echo -e

echo "Congratulations! Test Success!"
echo -e