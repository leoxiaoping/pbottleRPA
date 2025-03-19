# 系统相关

## wait 等待

  脚本暂停等待操作响应 (秒)
  注意：一次等待超过100s, 会有日志提示
  @param {number} seconds  秒,  缺省值为 1 秒。支持小数。

## setDefaultDelay 设置默认操作延时

设置RPA模拟操作的延时 包含鼠标、键盘、粘贴、打开网页操作
设置为 0 可以用 sleep() 手动管理操作延时

@param {*} millisecond 毫秒单位的数字


## jsPath 目录路径

变量名称：
当前脚本的文件夹路径，不带最后斜杠

别名：__dirname 方便在 .mjs 中使用

## getBasePath 基座路径 

获取并设置基座平台的根目录路径 | V2025.0 以上版本启用

@returns {string}

## showMsg 显示系统消息

@param {*} title 标题
@param {*} content 内容

本信息提示框为操作系统原生提示框

![提示框](https://foruda.gitee.com/images/1697684140653917645/45448f2b_799608.png)

系统设置

![alt text](https://foruda.gitee.com/images/1717396769929524137/aa3a2e03_799608.png)


## showRect 显示标记框

有效屏幕内显示一个彩色方框，直观提示流程操作范围和目标的当前的定位
V2024.6以上版本有效

@param {number} fromX 起始位置xy坐标，屏幕左上角为零点

@param {number} fromY

@param {number} width 宽度

@param {number} height 高度

@param {string} color 颜色 红绿蓝黄4色可选：red|green|blue|yellow

@param {number} msec 显示持续时间 单位毫秒

示例脚本：朋友圈点赞，截屏，文字识别

##  openFile 打开文件

用默认应用打开文件 如word、excel、pdf等

@param {*} path 文件路径

## openDir 打开目录

用资源管理器打开展示文件夹

@param {*} path 文件夹路径

## kill 关闭软件

（强行）关闭指定软件

@param {string} processName 进程名称，如：'WINWORD.EXE' 任务管理器 ‘进程名称’ 栏目 。注意不是 名称，如不显示，右键勾选显示这一栏目即可

@param {boolean} force 是否强制，相当于模拟任务管理器的结束任务操作。默认普通关闭，可能跟随保存确认框

```javascript
pbottleRPA.kill('WINWORD.EXE')  //关闭word
pbottleRPA.kill('EXCEL.EXE')  //关闭word
pbottleRPA.kill('msedge.exe')  //关闭edge浏览器
```


## copyText 复制文字 

模拟复制文字，相当于选择并复制文本内容

@param {string} txt 复制的文本内容

## copyFile 复制文件

模拟复制文件操作，支持文件路径和文件夹路径，复制后在目标文件夹ctrl+V 即可粘贴 V2024.7开始生效

复制文件后，在微信发送窗口粘贴，即可发送文件

@param {string} filepath 绝对路径

## exit 退出流程

强制退出当前脚本

@param {string} msg 退出时候输出的信息

## log 日志输出

@param {string} text 输出日志


## waitFile 等待文件

等待文件下载成功或者生成

@param {string} dirPath 监控文件夹目录 如：'c:/User/pbottle/download'

@param {string} keyWords 过滤关键词 如：'.zip'

@param {function} intervalFun 检测间隔的操作，function格式

@param {number} timeOut 等待超时时间 单位秒
