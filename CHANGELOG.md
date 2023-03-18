## [1.8.2](https://github.com/WGrape/lexer/compare/1.8.1...v1.8.2) (2022-09-19)

### Docs

* add directory fold ([581d3aa](https://github.com/WGrape/lexer/commit/581d3aa2c58f499a3bb5d84a813ea61fba85bd51))
* fix explain document ([c125698](https://github.com/WGrape/lexer/commit/c1256980a7756736d967ff07ec76a8e5b2f29d63))
* fix version ([5635a8a](https://github.com/WGrape/lexer/commit/5635a8ac3416d91a09ad3bcb4ae8b89b0bb9805d))

## [1.9.0](https://github.com/WGrape/lexer/compare/v1.8.2...v1.9.0) (2023-03-18)


### Features

* add configure support and make some code cleaner ([bdde859](https://github.com/WGrape/lexer/commit/bdde8594961cabca869ad9e7603ec6a9b7bbc2bd))
* websit add comment feature ([5216151](https://github.com/WGrape/lexer/commit/521615151ae0235b9ef95b374d0e2ec26005abe6))


### Bug Fixes

* replace logo ([8ed5649](https://github.com/WGrape/lexer/commit/8ed5649b04ec37a4b1937f5f403f96858b665a4a))


### Styling

* adjuest websit comment style ([c57ef8b](https://github.com/WGrape/lexer/commit/c57ef8b8dd3d9d14ad086c214cecd2f25c66374c))


### Docs

* fix CHANGELOG.md ([9949b90](https://github.com/WGrape/lexer/commit/9949b9075a9bc9cd34a3d88a298cc9dfb99c518c))
* make doc better ([2d4f45c](https://github.com/WGrape/lexer/commit/2d4f45c17ba47cb6b8bb87b13875ab89d04384c8))
* make doc better ([9cb3bdd](https://github.com/WGrape/lexer/commit/9cb3bdd42541e1599922c5820a95db32101f3cc2))

### 6、Version ：1.8.1
Release date ：2021-12-20

desc ：Add string escape support

#### Features
- Feat: add string escape support, [here](https://github.com/WGrape/lexer/pull/47) is the PR

## [1.8.2](https://github.com/WGrape/lexer/compare/1.8.1...v1.8.2) (2022-09-19)


### Docs

* add directory fold ([581d3aa](https://github.com/WGrape/lexer/commit/581d3aa2c58f499a3bb5d84a813ea61fba85bd51))
* fix explain document ([c125698](https://github.com/WGrape/lexer/commit/c1256980a7756736d967ff07ec76a8e5b2f29d63))
* fix version ([5635a8a](https://github.com/WGrape/lexer/commit/5635a8ac3416d91a09ad3bcb4ae8b89b0bb9805d))

### 5、Version ：1.8.0
Release date ：2021-10-16

desc ：Added linefeed token and website support for real-time parsing

#### Features
- Feat: add a new token type to linefeed
- Feat: support real-time parsing on the [website](https://wgrape.github.io/lexer)

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
