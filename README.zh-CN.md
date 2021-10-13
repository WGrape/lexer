# lexer

一个基于```DFA```的支持多语言扩展的```JS```版开源词法分析器，快速了解与体验请查看[线上网站](https://wgrape.github.io/lexer/)

![img](https://img.shields.io/badge/JavaScript-ES5+-blue.svg) &nbsp; [![Build Status](https://app.travis-ci.com/WGrape/lexer.svg?branch=main)](https://app.travis-ci.com/github/WGrape/lexer) &nbsp; ![img](https://img.shields.io/badge/Release-1.6.1-blue.svg) &nbsp; ![img](https://img.shields.io/badge/Document-中文/English-orange.svg) &nbsp; ![GitHub](https://img.shields.io/badge/License-MIT-green.svg)

## 目录

- [1、项目背景](#1)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) 问题现状](#11)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) 项目萌芽](#12)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) 解决方案](#13)
- [2、功能介绍](#2)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) 完整的词法分析](#21)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) 支持多语言扩展](#22)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) 记录状态流转信息](#23)
- [3、获取项目](#3)
- [4、使用方式](#4)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) 在项目中使用](#41)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) 可视化预览与测试](#42)
- [5、参与贡献](#5)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(1) 项目统计](#51)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(2) 源码讲解](#52)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(3) 贡献范围](#53)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(4) 版本发布](#54)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(5) 问题交流](#55)
- [6、协议说明](#6)

## <span id="1">1、项目背景</span>

> 不了解词法分析器以及其应用场景吗？建议用2分钟时间查看入门文章：[词法分析器的介绍与应用场景](https://github.com/WGrape/Blog/issues/10)

### <span id="11">(1) 问题现状</span>
目前常见的词法分析器与语言耦合较为紧密且代码量较为庞大，难以关注词法分析器其本质原理。

### <span id="12">(2) 项目萌芽</span>
为把关注重心放在词法分析器的工作原理上，不再需要考虑由不同语言造成的细枝末节差异，于是就有了此```lexer```
项目。

### <span id="13">(3) 解决方案</span>
```lexer```主要通过以下两个JS文件，实现词法分析器与语言的解耦

- ```/src/lexer.js```文件是词法分析器的核心，主要分为```ISR```（输入流读取器）和```DFA```（有限状态自动机），代码会保持在300行内
- ```/src/lang/{lang}-define.js```文件是词法分析器的扩展，支持不同语言的接入，如```/src/lang/c-define.js```文件

## <span id="2">2、功能介绍</span>

### <span id="21">(1) 完整的词法分析</span>

从输入字符序列，到分析结束后生成```token```，```lexer```具备了完整的词法分析功能，如内置的C语言版```lexer```共支持11种类型的```token```

![img](/doc/image/c-tokens.png)

### <span id="22">(2) 支持多语言扩展</span>

```lexer```支持接入如```Python```、```Go```等不同的语言，实现对不同语言进行词法分析的需求，扩展接入方式见[贡献部分](#5)，目前已支持如下语言的词法分析

- C ：一种比较底层的编程语言，[点击查看](https://wgrape.github.io/lexer/?lang=c) 它的词法分析
- SQL ：一种数据库查询语言，[点击查看](https://wgrape.github.io/lexer/?lang=sql) 它的词法分析
- Goal ：一个来自LeetCode的Goal解析器题目，[点击查看](https://wgrape.github.io/lexer/?lang=goal) 它的词法分析

### <span id="23">(3) 记录状态流转信息</span>

词法分析器的核心机制是基于```DFA```的状态流转，为此```lexer```记录了详细的状态流转信息，以实现使用方的以下需求

- ```lexer```的功能调试模式
- 自动生成```DFA```状态流转图

<img width="700" src="https://user-images.githubusercontent.com/35942268/135863402-4765e07b-01bf-41e7-b564-9d5af5faed63.png" />

## <span id="3">3、获取项目</span>

使用```git clone```获取本项目后，不需要任何依赖的安装，也不需多余的安装步骤

## <span id="4">4、使用方式</span>

### <span id="41">(1) 在代码中使用</span>

如果有在代码中使用```lexer```的需求（如网页中的代码编辑器：高亮、代码提示等），只引入一个```/package/{lang}-lexer.min.js```文件即可

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

### <span id="51">(1) 项目统计</span>
截至2021年10月01日，此项目在1个月内获得的Clone操作共计约80次，访客量100人，访问量400次（数据会不断更新）。其中Star数量的增长过程如下
<a href="https://starchart.cc/WGrape/lexer"><img src="https://starchart.cc/WGrape/lexer.svg" width="700"></a>

### <span id="52">(2) 源码讲解</span>
关于项目设计、单元测试、自动化测试、开发规范、以及如何接入不同语言的扩展等与源码开发相关的文档，请阅读[源码讲解](/doc/explain.md)部分

### <span id="53">(3) 贡献范围</span>
- 提供更多新功能
- 提供更多语言的 ```/src/lang/{lang}-define.js```

此外，一切帮助项目变得更好的建议都欢迎讨论，交流渠道参考[问题交流](#55)部分

### <span id="54">(4) 版本发布</span>
项目以版本号为```大更新-小更新-修复完善```的规则发布，关于版本的更新记录可以查看项目的[CHANGELOG](./CHANGELOG.md)，或查看[Release记录](https://github.com/WGrape/lexer/releases)

### <span id="55">(5) 问题交流</span>
如果有使用问题或疑问需要反馈，可以<a href="https://qm.qq.com/cgi-bin/qm/qr?k=088TusnG1yLi--mr8v02PINh7thvjQD9&jump_from=webapi">加入群聊</a>，或[提交issue](https://github.com/WGrape/lexer/issues/new) ，欢迎大家的加入

<a href="https://qm.qq.com/cgi-bin/qm/qr?k=088TusnG1yLi--mr8v02PINh7thvjQD9&jump_from=webapi"><img width="200" src="https://user-images.githubusercontent.com/35942268/135754608-29ca599e-b8a6-4ad2-ae62-c4ee5d61d1f9.png" /></a>

## <span id="6">6、协议说明</span>

![GitHub](https://img.shields.io/github/license/WGrape/lexer)
