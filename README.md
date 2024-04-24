#  小瓶RPA

#### 介绍
小瓶RPA 永久免费（个人版）RPA软件系统。 轻量级简单全能的RPA软件，显著降本增效 & 工作100%准确 & 非侵入式集成。同时支持浏览器web应用和客户端应用的操作流程自动化。
 **如果好用或者帮到您，烦劳star一下。** 

产品官网：[https://rpa.pbottle.com/](https://rpa.pbottle.com/)

![小瓶RPA logo](input/RPAlogo128.png)

#### 小瓶RPA优势

① 基于AI图像识别技术，纯图像驱动，真正安全无侵入。

② 自主底层研发、可深度行业底层定制，可解决有难度的自动化问题。

③ 支持 NodeJS，Python等社区资源， 数以万计第三方功能包，最大化生态。

④ 绿色、轻巧、便捷，免安装，可脱网运行，软件包大小约50M。

⑤ 无登录和注册，个人版永久免费软件，真正的降本增效。

#### 产品设计常见疑问

❓︎ 为什么小瓶没有图形拖拽的所谓'设计器'，用编写js脚本来替代？

①图形编程历史已久，上手门槛虽然跟低，但同时天花板也更低，目前面对长难流程的开发管理往往不能满足和有更高综合成本。（有商业价值的自动化项目往往都是长难流程）

②js脚本可以融入完整的 Nodejs（Python）生态，无缝引入万亿第三方功能包，同时可以使用 git 等代码工程管理工具和传统IT项目自然对接。

③V2023.3版本 新增加鼠标操作录制自动生成简单的脚本功能。


❓︎ 为什么小瓶采用js作为脚本语言，可以用 python、java、c# 等吗？

可以，小瓶RPA内核和脚本层采用http通信接口，虽然官方的demo脚本层选用了js（同时兼容性支持Python），但有经验的其他语言开发者，可以随时通过最常规的http接口接入小瓶RPA。

JS目前是前端的主流脚本，有大量的web经验的群众基础。同时JS的前端开放性，GPT等大模型AI工具更容易输出准确的结果。


❓︎ 可以脱网或者内网使用小瓶RPA吗？

企业版支持，个人版启动一次联网免费授权。



#### 软件架构

![小瓶RPA架构图](https://images.gitee.com/uploads/images/2021/1126/130823_ef4a3e3b_799608.png "2111021453106180e0566ebe4.png")


#### 公司支持

北京小瓶科技有限公司

对商业版客户提供技术支持和增值服务

官网：[https://www.pbottle.com/](https://www.pbottle.com/)


#### 使用须知

1.允许个人永久免费使用本项目，包括用于个人学习、游戏娱乐、毕业设计、教学案例、公益事业和其他非商业用途；不包含个人的上班时的工作目的;

2.必须保留版权信息，请自觉遵守；

3.未经授权禁止将本软件、代码和其他资源以任何形式出售（包含收费项目捆绑的免费部分）；


# 安装教程

#### 步骤

1.  下载exe运行基座  pbottleRPA.zip  [基座exe程序绿色版](https://gitee.com/pbottle/pbottle-rpa/releases)
2.  安装 NodeJS 脚本引擎 .msi,并安装 [下载网站](http://nodejs.cn/download/)   安装后请重启基座
3.  下载[测试脚本](https://gitee.com/pbottle/pbottle-rpa/repository/archive/master.zip)，运行基座选择demo脚本即可开始运行

#### 常见问题

 ① 如果系统提示 缺少vcruntime140XX.dll   微软官网下载安装即可：[https://docs.microsoft.com/zh-CN/cpp/windows/latest-supported-vc-redist?view=msvc-140](https://docs.microsoft.com/zh-CN/cpp/windows/latest-supported-vc-redist?view=msvc-140)  （新版本已兼容）

 ② **exe启动目录的路径不能含中文** ，直接复制到其他目录，或者文件夹copy到磁盘根目录即可  （新版本已兼容）

 ③ 服务端口（49888）监听不成功问题  排查请看：[https://rpa.pbottle.com/a-13924.html](https://rpa.pbottle.com/a-13924.html)

 ④ 软件不再支持32位老旧版操作系统


#### 电脑要求

新！V2023版本进一步提高了AI算法库对电脑的兼容性，请下载最新版本。

win7系统注意事项：https://rpa.pbottle.com/a-13941.html


#### 手机应用RPA

手机应用可以采用 Android 模拟器方案，由于小瓶RPA采用纯图像识别的驱动方式，完全兼容各种手机应用模拟器

经过我们测试的推荐： 蓝叠

已经有问题的：雷电模拟器，剪切板同步延迟，输入有问题


#### Web应用浏览器增强

web增强可以使小瓶RPA脚本直接操作浏览器Dom元素，更方便快捷

同时支持使用Dom选择器选择元素并返回结果

 _注意：此功能需要安装小瓶RPA浏览器插件，版本需求：V2023.5以后支持_ 

插件安装下载地址：[https://rpa.pbottle.com/a-13942.html](https://rpa.pbottle.com/a-13942.html)


#### Demo示例

自带Demo示例：（中文标题为demo示例脚本 后续会添加更多）

- 基础（循环、判断、等待）演示
- 键盘基础操作演示
- 鼠标基础操作演示
- 运维消息手机通知
- 微信朋友圈自动点赞
- 屏幕文字提取OCR测试脚本
- 剪切板演示脚本
- 文件基础操作演示
- 截屏操作演示脚本
- 屏幕物体轮廓查找测试脚本
- WEB增强-浏览器元素操作演示
- WEB增强-数据批量爬取演示
- WEB增强-账号密码登录演示
- 模块新脚本演示（顶级await）.mjs
- [第三方] 读写Excel演示脚本

注：【web增强】需要先安装小瓶RPA浏览器插件，【第三方】需要先双击  _第三方模块安装.bat_  安装所需模块。

#### 全局热键

 **Ctrl + Shift + Q** 

①停止当前的脚本运行   

②结束当前的鼠标操作录制


 **Ctrl + Shift + R** 

①重新启动当前的脚本运行


# 开发流程脚本

#### RPA脚本开发文档
[文档入口](https://gitee.com/pbottle/pbottle-rpa/wikis/pages)

#### 支持脚本语言


1. NodeJS
2. Python（Beta）



#### 其它参考

1. 键盘表  [https://rpa.pbottle.com/a-13862.html](https://rpa.pbottle.com/a-13862.html)
2. 挂机定时任务  [https://rpa.pbottle.com/a-13868.html](https://rpa.pbottle.com/a-13868.html)
3. 免费手机通知 [https://rpa.pbottle.com/a-12586.html](https://rpa.pbottle.com/a-12586.html)

#### 技术交流微信群

喜欢群聊的可以微信扫码加入（永不过期）：

![输入图片说明](https://www.pbottle.com/static/upload/20221213/16709408628938.jpg)


#### 官方RPA增值服务

 [联系我们](https://rpa.pbottle.com/value-added.php) 

