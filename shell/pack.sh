# remove files generated
rm -f package/c-lexer.min.js
rm -f package/sql-lexer.min.js
rm -f package/goal-lexer.min.js

rm -f package/c-define.min.js
rm -f package/sql-define.min.js
rm -f package/goal-define.min.js

# run pack
node package/main.js

# compress files to one line file
uglifyjs package/c-lexer.min.js -o package/c-lexer.min.js
uglifyjs package/sql-lexer.min.js -o package/sql-lexer.min.js
uglifyjs package/goal-lexer.min.js -o package/goal-lexer.min.js

uglifyjs package/c-define.min.js -o package/c-define.min.js
uglifyjs package/sql-define.min.js -o package/sql-define.min.js
uglifyjs package/goal-define.min.js -o package/goal-define.min.js
