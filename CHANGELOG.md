### 4、Version ：1.6.1
Release date ：2021-10-13

desc ：Change property name and remove ```goal_lexer``` property of chain-lexer, the package of NPM

#### Features
- Refactor: Change property name of chain-lexer.
  - ```c_lexer```: ```cLexer```
  - ```sql_lexer```: ```sqlLexer```
- Remove: remove ```goal_lexer``` property of chain-lexer

### 3、Version ：1.6.0
Release date ：2021-10-12

desc ：Publish project to NPM, named chain-lexer

#### Features
- NPM support: You can use lexer(chain-lexer) in your project by npm

### 2、Version ：1.5.0
Release date ：2021-10-10

desc ：Major upgrades to the project structure, such as package, shell, test, etc. You only need to import a ```/package/{lang}-lexer.min.js``` file in your project.

#### Features
- Add pack feature: pack ```/src/lexer.js``` and ```/src/lang/{lang}-define.js```
- Update testing: Decouple the testing from the ```/src/*``` file

### 1、Version ：1.0.0
Release date ：2021-09-31

desc ：the first version ```1.0.0``` of ```lexer``` is released.

#### Features
- Complete lexical analysis
- Support multi-language extension
- Provide state flow log
