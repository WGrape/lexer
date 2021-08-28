# lexer
一个基于```DFA```法的支持多语言扩展的```JS```版开源词法分析器
![img](/doc/image/intro-v2.png)

下图为实际演示

![img](/doc/image/show.gif)

## 目录
- [背景](#1)
- [安装](#2)
- [使用](#3)
- [贡献](#4)
- [协议](#5)
## <span id="1">背景</span>
编译器前端中常用的词法分析方法包括```直接分析法```和```DFA（有限状态机）```两种，由于```直接分析法```不方便扩展，导致代码容易有各种```hack```，所以一般使用```DFA```实现词法分析器。

由于常见的词法分析器与语言耦合较为紧密且代码量较为庞大，难以关注词法分析器本质的工作原理，所以有了写一个完全与语言解耦的、精简的词法分析器的想法，以把关注重心放在词法分析器的工作原理上，不再需要考虑由不同语言造成的细枝末节差异。

- ```lexer.js```文件是词法分析器的核心，主要分为```ISR```（输入流读取器）和```DFA```（有限状态自动机），与语言解耦，代码会保持在300行内
- ```lang/{lang}-define.js```文件是词法分析器的扩展，支持不同语言的接入，如```lang/c-define.js```文件，接入不同语言的方式见[贡献](#4)文档

## <span id="2">安装</span>
下载本项目后，无需多余的安装步骤，在浏览器中打开```index.html```文件，可以正常使用即表示安装成功
```bash
git clone https://github.com/WGrape/lexer
```
## <span id="3">使用</span>
首先依次引入以下文件
- ```/lang/{lang}-define.js```
- ```lexer.js```

在JS代码中访问```lexer```变量即可获取到词法分析器的所有数据

```js
let myLexer = lexer;
console.log(myLexer);
console.log(myLexer.ISR);
console.log(myLexer.DFA);
```

## <span id="4">贡献</span>
- 提供更多语言的 ```/lang/{lang}-define.js```
- 源码解析请见[文档](/doc/explain.md)

## <span id="5">协议</span>
[MIT](/LICENSE)
