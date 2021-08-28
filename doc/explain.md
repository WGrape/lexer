# 源码介绍

本文会对项目源码详细介绍，欢迎大家的参与

### 目录

- [一、项目结构](#1)
- [二、语言扩展](#2)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1、定义常量](#21)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2、定义函数工具包](#22)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3、定义单元测试](#23)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4、定义状态流转模型](#24)

## <span id="1">一、项目结构</span>

- ```/doc``` 存放项目文档、图片等资源
- ```/lang``` 存放不同语言的配置定义，如```c-define.js```
- ```/index.html``` 词法分析器的在线效果演示
- ```/lexer.js``` 词法分析器的核心文件

## <span id="2">二、语言扩展</span>

实现语言扩展的方式很简单，创建一个```/lang/{lang}-define.js```文件，然后按照如下步骤操作

### <span id="21">1、定义常量</span>

- \[必须\] 定义```枚举型```常量，如```符号```、```状态值```等
- \[必须\] 定义```字符集合```型常量，包括```单字符```、```双字符```、```双字符首位符```、```双字符次位符```，```关键字```，其中```单字符```又分为```运算符```、```符号```
  、```空白符```
- \[必须\] 定义```DFA```的```STATE```常量

```js
const ENUM_CONST = [];
const CHARSET_CONST = [];
const DFA_STATE_CONST = [];
```

### <span id="22">2、定义函数工具包</span>

以C语言版本为例，主要定义了如下函数

- ```judgeTokenTypeByValue(value)``` 通过```Value```值判断```Token```的类型，如```关键字```类型的```Token```可以直接通过```Value```值判断
- ```judgeTokenType(state, value)``` 判断```Token```的类型，包括根据```Value```判断和根据```State```判断两种
- ```getFirstCharState(ch)``` 如果是```双字符首位符```则返回对应的```state```，否则返回```S_RESET```重置状态
- ```getSecondCharState(ch)``` 如果是```双字符次位符```则返回对应的```state```，否则返回```S_RESET```重置状态

### <span id="23">3、定义单元测试</span>

只需要实现一个```returnCaseList()```函数返回测试Case即可

```js
let unitTest = {
    returnCaseList() {
        return [
            {
                'input': "int",
                'output': [{"type": "Keyword", "value": "int"}],
            },
        ];
    },
};
```

### <span id="24">4、定义状态流转模型（FlowModel）</span>

这一节是整个语言扩展环节中最核心的部分，其思想是用户定义自己的状态流转模型，工作原理是通过输入的```字符```和当前的```状态```，来判断```下一次```要```流转```的```状态```

```js
let flowModel = {
    getNextState(ch, state, matchs) {

        // ... 逻辑处理

        return nextState;
    }
}
```