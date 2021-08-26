# lexer
一个基于JS实现的支持多语言的开源词法分析器
![img](/doc/image/intro.png)
## 目录
- [背景]()
- [安装]()
- [使用]()
- [贡献]()
- [协议]()
## 背景
编译器前端中常用的词法分析方法包括```直接分析法```和```DFA（有限状态机）```两种，由于```直接分析法```不方便扩展，导致代码容易有各种```hack```，所以一般使用```DFA```实现词法分析器。

本项目代码会控制```lexer.js```核心代码文件在500行内，以方便使用
## 安装
下载本项目后，无需多余的安装步骤，在浏览器中打开```index.html```文件可以正常使用即可
```bash
git clone https://github.com/WGrape/lexer
```
## 使用
首先依次引入以下文件
- ```/lang/x-constant.js```
- ```tool.js```
- ```lexer.js```

在JS代码中访问```lexer```变量即可获取到词法分析器的所有数据
```js
let myLexer = lexer;
console.log(myLexer);
console.log(myLexer.ISR);
console.log(myLexer.DFA);
```

## 贡献
- 提供更多语言的 ```/lang/x-constant.js```