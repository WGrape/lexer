# lexer

一个基于```DFA```法的支持多语言扩展的```JS```版开源词法分析器，快速了解与体验请查看[线上网站](https://wgrape.github.io/lexer/)

![img](https://img.shields.io/badge/JavaScript-ES5+-blue.svg) &nbsp; [![Build Status](https://app.travis-ci.com/WGrape/lexer.svg?branch=main)](https://app.travis-ci.com/github/WGrape/lexer)

## 目录

- [1、项目背景](#1)
- [2、功能介绍](#2)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) 完整的词法分析](#21)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) 支持多语言扩展](#22)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) 记录状态流转信息](#23)
- [3、获取项目](#3)
- [4、使用方式](#4)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) 在项目中使用](#41)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) 可视化预览与测试](#42)
- [5、参与贡献](#5)
- [6、协议说明](#6)

## <span id="1">1、项目背景</span>

目前常见的词法分析器与语言耦合较为紧密且代码量较为庞大，难以关注词法分析器其本质原理，所以萌生了写一个完全与语言解耦且精简的词法分析器的想法，以把关注重心放在词法分析器的工作原理上，不再需要考虑由不同语言造成的细枝末节差异，于是就有了此```lexer```
项目。

```lexer```主要通过以下两个JS文件，实现词法分析器与语言的解耦

- ```lexer.js```文件是词法分析器的核心，主要分为```ISR```（输入流读取器）和```DFA```（有限状态自动机），代码会保持在300行内
- ```lang/{lang}-define.js```文件是词法分析器的扩展，支持不同语言的接入，如```lang/c-define.js```文件

## <span id="2">2、功能介绍</span>

### <span id="21">(1) 完整的词法分析</span>

从输入字符序列，到分析结束后生成```token```，```lexer```具备了完整的词法分析功能，如内置的C语言版```lexer```共支持11种类型的```token```

![img](/doc/image/c-tokens.png)

### <span id="22">(2) 支持多语言扩展</span>

```lexer```支持接入如```Python```、```Go```等不同的语言，实现对不同语言进行词法分析的需求，扩展接入方式见[贡献部分](#5)

### <span id="23">(3) 记录状态流转信息</span>

词法分析器的核心机制是基于```DFA```的状态流转，为此```lexer```记录了详细的状态流转信息，以实现使用方的以下需求

- 功能调试模式
- 自动生成```DFA```状态流转图

## <span id="3">3、获取项目</span>

使用```git clone```获取本项目后，不需要任何依赖的安装，也不需多余的安装步骤

## <span id="4">4、使用方式</span>

### <span id="41">(1) 在代码中使用</span>

如果有在代码中使用```lexer```的需求（如Web版代码编辑器），需要依次引入以下文件

- ```/lang/{lang}-define.js```
- ```lexer.js```

然后直接访问```lexer```变量即可获取到词法分析器对象，其中```tokens```数据可以通过访问```lexer.DFA.result.tokens```获取

```js
// 1. 需要词法分析的代码
let stream = "int a = 10;";

// 2. 开始词法分析
lexer.start(strem);

// 3. 词法分析结束后, 获取生成的tokens
let parsedTokens = lexer.DFA.result.tokens;

// 4. 做你想做的
parsedTokens.forEach((token) => {
    // ... ...
});
```

功能介绍中所描述的[记录状态流转信息](#23)，通过访问```flowModel.result.paths```即可获取到```lexer```内部状态机在每次状态流转时的详细信息，数据格式如下所示

```js
[
    {
        state: 0, // 当前状态
        ch: "a", // 当前读入的字符
        nextSstate: 2, // 下一个状态
        match: true, // 是否匹配
        end: false, // 是否是最后一个字符
    },
    // ... ...
]
```

### <span id="42">(2) 可视化预览与测试</span>

> ```lexer```的自动化测试会在页面打开前自动完成，打开浏览器控制台查看自动化测试的具体情况

为了实时查看```lexer```的工作效果，也方便对其进行开发测试，在项目根目录下有一个```index.html```文件，直接在浏览器中打开，输入代码后会自动输出经过```lexer```分析后生成的```Token```，如下图所演示

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

或者请查看[线上网站](https://wgrape.github.io/lexer/)

## <span id="5">5、参与贡献</span>

- 提供更多语言的 ```/lang/{lang}-define.js```
- 源码分析以及如何接入不同语言的扩展，请见[实现原理](/doc/explain.md)文档

## <span id="6">6、协议说明</span>

![GitHub](https://img.shields.io/github/license/WGrape/lexer)
