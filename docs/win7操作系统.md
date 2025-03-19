# win7 操作系统上使用小瓶RPA

国内政企单位仍有大量 win7 电脑设备

小瓶 RPA 仍然花费开发资源保持对 win7 系统的全功能模块兼容。



## win7 小瓶RPA平台基座

Win7 系统存在大量盗版精简系统，尽可能保持系统自动更新到最新版。

常见 win7 精简版因为缺乏 TTS 引擎 会导致小瓶RPA的 TTS 模块不可用。


## win7 脚本引擎特殊安装

win7已经被很多新版本放弃，win7只能下载最新版本zip版本，才能使用mjs、fetch 等最新特性

https://mirrors.cloud.tencent.com/nodejs-release/v18.20.4/node-v18.20.4-win-x64.zip



1. 下载zip版本node并解压后添加文件夹路径 到 环境变量 path 中，参考：https://www.pbottle.com/a-14057.html

2. 如果提示：“无法定位程序输入点EventSetInformation 于动态链接库ADVAPI32.dll上

保证win7最新更新，补丁编号KB3080149， 下载地址是 https://www.microsoft.com/zh-cn/download/confirmation.aspx?id=48636

3. node 运行的提示操作系统不适配，设置环境变量 NODE_SKIP_PLATFORM_CHECK=1 即可
