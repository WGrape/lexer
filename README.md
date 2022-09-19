<p align="center">
<img width="417" alt="屏幕快照 2021-10-24 17 42 59" src="https://user-images.githubusercontent.com/35942268/138588691-afd41371-39fa-45a0-a7ce-3cbadabc28a0.png">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-ES5+-blue.svg">
    <img src="https://img.shields.io/npm/dt/chain-lexer.svg">
    <a href="https://app.travis-ci.com/github/WGrape/lexer"><img src="https://app.travis-ci.com/WGrape/lexer.svg?branch=main"><a>
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/wgrape/lexer">
    <img src="https://img.shields.io/badge/Document-中文/English-orange.svg">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">   
</p>

<div align="center">    
    <p>It is a lexical analyzer based on DFA that is built using JS and supports multi-language extensions. For a quick understanding and experience , please check the <a href="https://wgrape.github.io/lexer/">online website</a></p>
    <p>Document ：<a href="/README.zh-CN.md">中文</a> / <a href="/README.md">English</a></p>
</div>

<details>
  <summary>Contents</summary>

- [1、Background](#1)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) Situation](#11)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) Task](#12)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) Solution](#13)
- [2、Features](#2)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) Complete lexical analysis](#21)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) Support multi-language extension](#22)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) Provide state flow log](#23)
- [3、Get project](#3)
- [4、Ussage](#4)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) In your project](#41)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) Web preview and testing](#42)
- [5、Contributions](#5)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) Project Statistics](#51)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) Source code explanation](#52)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) Content contribution](#53)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(4) Release version](#54)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(5) Q&A](#55)
- [6、License](#6)
- [7、Thanks](#7)

</details>

## <span id="1">1、Background</span>

### <span id="11">(1) Situation</span>

Most lexical analyzers are closely coupled with the language, the amount of code is relatively large. It's hard to pay attention to the essential principles of lexical analyzer.

### <span id="12">(2) Task</span>

In order to focus on the working principle of lexical analyzer , not to consider the small differences caused by different languages , an idea of making a ```lexer``` project that is completely decoupled from the language was born.

### <span id="13">(3) Solution</span>

```lexer``` through the following two files, realize the decoupling of lexical analyzer and language

- ```src/lexer.js``` is the core part of lexical analyzer within 300 lines, including ```ISR``` and ```DFA```
- ```src/lang/{lang}-define.js```is the language extension of lexical analyzer. Support different languages，such as ```src/lang/c-define.js```

## <span id="2">2、Features</span>

### <span id="21">(1) Complete lexical analysis</span>

From inputting the character sequence to generating ```token``` after the analysis, ```lexer``` has complete steps for lexical analysis, and 12 token types for most language extensions

<img width="850" alt="" src="https://user-images.githubusercontent.com/35942268/137583888-8c12a85c-4af7-4288-942f-d2a2fcfe30c6.png">

### <span id="22">(2) Support multi-language extension</span>

```lexer``` supports different language extensions such as ```Python```, ```Go```, etc. How to make different language extensions, please check [Contributions](#5)

- C ：A popular programming language，[click here](https://wgrape.github.io/lexer/?lang=c) to see its lexical analysis
- SQL ：A popular database query language，[click here](https://wgrape.github.io/lexer/?lang=sql) to see its lexical analysis
- Goal ：A goal parser problem from leetCode ，[click here](https://wgrape.github.io/lexer/?lang=goal) to see its lexical analysis

### <span id="23">(3) Provide state flow log</span>

The core mechanism of lexical analyzer is based on the state flow of ```DFA```. For this reason, ```lexer``` records detailed state flow log to achieve the following requirements of you

- Debug mode
- Automatically generate ```DFA``` state flow diagram

<img width="700" src="https://user-images.githubusercontent.com/35942268/136378451-e025fffd-425d-43f1-8a58-454a1011e9c3.png" />

## <span id="3">3、Get project</span>

After ```git clone``` command, no need for any dependencies, and no extra installation steps

## <span id="4">4、Ussage</span>

### <span id="41">(1) In your project</span>

If you need use ```lexer``` in your project, such as code editor, etc. 

#### Using NPM
```
npm install chain-lexer
```

```js
var chainLexer = require('chain-lexer');
let lexer = chainLexer.cLexer;

let stream = "int a = 10;";
lexer.start(stream);
let parsedTokens = lexer.DFA.result.tokens;

lexer = chainLexer.sqlLexer;
stream = "select * from test where id >= 10;";
lexer.start(stream);
parsedTokens = lexer.DFA.result.tokens;
```

#### Using Script
Import the ```package/{lang}-lexer.min.js``` file, then visit ```lexer``` variable to get the object of lexical analyzer，and visit ```lexer.DFA.result.tokens``` to get ```tokens```

```js
// 1. The code that needs lexical analysis
let stream = "int a = 10;";

// 2. Start lexical analysis
lexer.start(strem);

// 3. After the lexical analysis is done, get the generated tokens
let parsedTokens = lexer.DFA.result.tokens;

// 4. Do what you want to do
parsedTokens.forEach((token) => {
    // ... ...
});
```

The [Provide state flow log](#23) part in features，visit ```flowModel.result.paths``` will get the detail logs of state flow inside ```lexer```. The data format is as follows

```js
[
    {
        state: 0, // now state
        ch: "a", // read char
        nextSstate: 2, // next state
        match: true, // is match
        end: false, // is last char
    },
    // ... ...
]
```

### <span id="42">(2) Web preview and testing</span>

In order to preview the process of ```lexer``` in real time, to debug and test, there is a ```index.html``` file in the root directory of this project. Open it directly in your browser, and after entering the code will automatically output the ```Token``` generated after ```lexer``` analysis, as shown in the figure below

```c
int a = 10;
int b =20;
int c = 20;

float f = 928.2332;
char b = 'b';

if(a == b){
    printf("Hello, World!");
}else if(b!=c){
    printf("Hello, World! Hello, World!");
}else{
    printf("Hello!");
}
```

![img](https://user-images.githubusercontent.com/35942268/137584888-28a1ce09-3474-4158-8e6f-ccbdb8614930.gif)

or check the [online website](wgrape.github.io/lexer/)

## <span id="5">5、Contributions</span>

### <span id="51">(1) Project Statistics</span>

> Who helped this project ? Please check the [Thanks](#7).

As of October 1, 2021, this project has obtained about 80 clones in one month, with 100 visitors and 400 visits (data will be updated continuously). The growth process of the number of Stars is as follows. 

<a href="https://starchart.cc/WGrape/lexer"><img src="https://starchart.cc/WGrape/lexer.svg" width="700"></a>

### <span id="52">(2) Source code explanation</span>
Documents about source code development, project design, unit testing, automated testing, development specifications, and how to make extensions in different languages, please read [source code explanation](/doc/explain.md)

### <span id="53">(3) Content contribution</span>
- Add more new features
- Add more extensions ```/src/lang/{lang}-define.js```

### <span id="54">(4) Release version</span>
The project is released with the version number of ```A-B-C```，regarding release log, you can check the [CHANGELOG](./CHANGELOG.md) or the [release record](https://github.com/WGrape/lexer/releases)

- ```A```：Major upgrade
- ```B```：Minor upgrade
- ```C```：bug fix / features / ...

### <span id="55">(5) Q&A</span>
If you have any problems or questions, please [submit an issue](https://github.com/WGrape/lexer/issues/new)

## <span id="6">6、License</span>

![GitHub](https://img.shields.io/github/license/WGrape/lexer)

## <span id="7">7、Thanks</span>
- [Hello github](https://github.com/521xueweihan/HelloGitHub/issues/1868): Thanks for your promotion on 2021.10.28
