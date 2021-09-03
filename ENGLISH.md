## Contents

- [1、Background](#1)
- [2、Features](#2)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) Complete lexical analysis](#21)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) Support multi-language extension](#22)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) Provide flow-data](#23)
- [3、Get source code](#3)
- [4、Ussage](#4)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) In the project](#41)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) Web preview and test](#42)
- [5、Contributions](#5)
- [6、License](#6)

## <span id="1">1、Background</span>

At the present time, common lexical analyzers are closely coupled with the language, the amount of code is relatively large. It's hard to pay attention to the essential principles of lexical analyzer.

Therefore, the idea of writing a lexical analyzer that is completely decoupled from the language and condensed was born. 

```lexer``` through the following two files, realize the decoupling of lexical analyzer and language

- ```lexer.js``` is a core of lexical analyzer within 300 lines, including ```ISR```(Input Stream Reader) and ```DFA```(Deterministic Finite Automaton)
- ```lang/{lang}-define.js```is the language extension of lexical analyzer, support different languages，such as ```lang/c-define.js```

## <span id="2">2、Features</span>

### <span id="21">(1) Complete lexical analysis</span>

From inputting the character sequence to generating ```token``` after the analysis, ```lexer``` has a complete lexical analysis function, such as the built-in C language version ```lexer``` supports a total of 11 types Type of ```token```

![img](/doc/image/c-tokens.png)

### <span id="22">(2) Support multi-language extension</span>

```lexer``` supports access to different languages such as ```Python```, ```Go```, etc., to achieve the needs of lexical analysis of different languages, see [Contributions](#5)

### <span id="23">(3) Provide flow-data</span>

The core mechanism of the lexical analyzer is based on the status transfer of ```DFA```. For this reason, `lexer``` records detailed status transfer information to achieve the following requirements of the user

- Debug mode
- Automatically generate ```DFA``` state flow diagram

## <span id="3">3、Get source code</span>

After ```git clone``` command, no need for any dependencies, and no extra installation steps

## <span id="4">4、Ussage</span>

### <span id="41">(1) In the project</span>

If you need use ```lexer``` in the project（code editor, etc），import the following files in order

- ```/lang/{lang}-define.js```
- ```lexer.js```

then visit ```lexer``` variable to get the object of lexical analyzer，and visit ```lexer.DFA.result.tokens``` to get ```tokens```

```js
// 1. The code that requires lexical analysis
let stream = "int a = 10;";

// 2. Start lexical analysis
lexer.start(strem);

// 3. After the lexical analysis is over, get the generated tokens
let parsedTokens = lexer.DFA.result.tokens;

// 4. Do what you want to do
parsedTokens.forEach((token) => {
    // ... ...
});
```

The [Provide flow-data](#23) part in features，visit ```flowModel.result.paths``` will get details of state flow inside ```lexer```. The data format is as follows

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

### <span id="42">(2) Web preview and test</span>

> The automated test will be automatically completed before the page is opened, open the browser console to view the specific situation of the automated test

In order to view the work effect of ```lexer``` in real time, and to facilitate its development and testing, there is a ```index.html``` file in the root directory of the project. Open it directly in the browser, and after entering the code Will automatically output the ```Token``` generated after ```lexer``` analysis, as shown in the figure below

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

![img](/doc/image/show-v2.gif)

or check the [online website](wgrape.github.io/lexer/)

## <span id="5">5、Contributions</span>

- Support more different languages ```/lang/{lang}-define.js```
- Explain source code and provide language extensions, please check [Source code explanation](/doc/explain.md)
- If you have any usage problems or questions that need feedback, welcome to interact and communicate, click [submit issue](https://github.com/WGrape/lexer/issues/new)

## <span id="6">6、License</span>

![GitHub](https://img.shields.io/github/license/WGrape/lexer)
