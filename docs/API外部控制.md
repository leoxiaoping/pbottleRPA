# 外部控制

除了实现软件操作自动化外，外部控制功能够实现小瓶RPA自身操作的自动化。

外部控制提供一系列控制小瓶RPA本身的 **http 接口** ，可以由 第三方系统 或者 RPA集群控制器 发出。

外部控制功能只对企业版开放 ，详细查看小瓶RPA软件授权：https://rpa.pbottle.com/License.php

## 外部启动流程

从外部控制启动小瓶RPA开始某项自定义的任务

用法：
:49888/?action=pbottleRPA_run&path=流程脚本路径

- 成功启动任务返回：ok
- 上一个任务还未结束：isRunning


## 外部停止流程

从外部控制停止小瓶RPA正在运行的任务

用法：

:49888/?action=pbottleRPA_stop


## 当前运行状态

从外部控制停止小瓶RPA正在运行的状态

用法：

:49888/?action=pbottleRPA_state

- 未运行状态返回：ready
- 正在运行状态返回：isRunning



## 外部控制buffer存取

buffer 是小瓶RPA的跨脚本的全局状态变量的存取管理机制。

#### bufferSet 命令

设置buffer存储内容

此buffer可以跨脚本存取，RPA重启时才重置，存取多线程下安全

@param {*} n buffer编号，从0-9共10个 默认：0 第一个buffer

@returns ok 表示成功

（POST方法）：http://ip:49888/action=bufferSet&n=0 ，content设置到Post的body中，通常为json的字符串

#### bufferGet 命令

获取buffer存储内容

此buffer可以跨脚本存取，RPA重启时才重置，存取多线程下安全

http外部获取方式：http://ip:49888/action=bufferGet&n=0

@param {*} n buffer编号，从0-9共10个 默认：0 第一个buffer

@returns 字符串

http://ip:49888/action=bufferGet&n=0


## 外部设置定时任务

从外部控制修改小瓶RPA的计划任务（定时器）

用法：

:49888/?action=pbottleRPA_plan&plan=* *

定时器规则参考： https://www.pbottle.com/a-13868.html


## 外部获取设备唯一号

外部获取当前设备RPA唯一号

用法：
:49888/?action=pbottleRPA_deviceID

多用于商业加密脚本的分发控制和验证

## delaySet 设置接力任务


`pbottle.delaySet(scriptPath)`

设置接力执行的脚本

当前脚本结束后（无论正常结束还是错误退出），立刻启动的自动脚本。

http外部设置方式（GET方法）：http://ip:49888/action=pbottleRPA_delay&path=MyPATH

@param {string} scriptPath 接力脚本的路径 如：'D:/test.mjs' 如果路径为空，默认清除当前已经设置的接力任务。

@returns {string} ok 表示成功


- 监督任务执行
A 任务是一个复杂的长流程，在执行过程中各种问题和错误，导致一定概率不能顺利玩成到任务最后。
这时候在A任务开头设置接力任务B，B 作为 A 的监督员，可以在 A 任务退出时候，验证 A 的关键指标完成。根据验证结果做出通知人工，甚至重启A任务的流程。
