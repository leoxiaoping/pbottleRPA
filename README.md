#  小瓶RPA

#### 介绍
永久免费（含商用）RPA软件系统。 像挂QQ一样使用简单的RPA软件。 显著降本增效 & 工作100%准确 & 非侵入式集成。
 **如果好用或者帮到您，烦劳star一下。** 

产品官网：[https://rpa.pbottle.com/](https://rpa.pbottle.com/)

![小瓶RPA logo](input/RPAlogo128.png)

#### 小瓶RPA优势

① 基于AI图像识别技术，纯图像驱动，真正安全无侵入。

② 自主底层研发、可深度行业底层定制，可解决有难度的自动化问题。

③ 支持 NodeJS，Python等社区资源， 数以万计第三方功能包，最大化生态。

④ 绿色、轻巧、便捷，免安装，可脱网运行，软件包大小约50M。

⑤ 无登录和注册，永久免费软件，商业License授权零费用，真正的降本增效。

#### 图形拖拽  vs  脚本代码

 **图形拖拽** 具有直观、门槛低的特点优势，但复杂流程表达能力、版本迭代、工程化管理等 **脚本代码** 具有明显优势。
小瓶RPA现阶段采用脚本代码，原因是根据目前的自动化项目实践，有价值的自动化流程都有一定复杂度。
当然我们后期也会考虑将常用功能封装成图形编程的拖拽组件，在脚本代码开发基础上进一步降低开发门槛，让更多人享受自动化乐趣。

 V2023.3版本 新增加鼠标操作录制自动生成脚本功能。


#### 软件架构

![小瓶RPA架构图](https://images.gitee.com/uploads/images/2021/1126/130823_ef4a3e3b_799608.png "2111021453106180e0566ebe4.png")


#### 公司支持

北京小瓶科技有限公司

 官网：[https://www.pbottle.com/](https://www.pbottle.com/)


#### 使用须知

1.允许永久免费使用本项目，包括用于个人学习、毕业设计、教学案例、公益事业、商业项目和其他;

2.必须保留版权信息，请自觉遵守;

3.未经授权禁止将本软件、代码和其他资源以任何形式出售（包含收费项目捆绑的免费部分）;


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

- 键盘基础操作演示脚本.js
- 鼠标基础操作演示脚本.js
- 运维消息手机通知.js
- 微信朋友圈自动点赞.js
- 读写Excel演示脚本.js
- 屏幕文字提取OCR测试脚本.js
- 剪切板演示脚本.js
- 截屏操作演示脚本.js
- 浏览器元素操作（web增强）演示脚本.js

#### 全局热键

 **Ctrl + Shift + Q** 

①停止当前的脚本运行   

②结束当前的鼠标操作录制


 **Ctrl + Shift + R** 

①重新启动当前的脚本运行


# 开发流程脚本

#### RPA脚本开发文档
[文档入口](https://gitee.com/pbottle/pbottle-rpa/wikis/pages)




#### 其它参考

1. 键盘表  [https://rpa.pbottle.com/a-13862.html](https://rpa.pbottle.com/a-13862.html)
2. 挂机定时任务  [https://rpa.pbottle.com/a-13868.html](https://rpa.pbottle.com/a-13868.html)
3. 免费手机通知 [https://rpa.pbottle.com/a-12586.html](https://rpa.pbottle.com/a-12586.html)

#### 技术交流微信群

喜欢群聊的可以微信扫码加入（永不过期）：

![输入图片说明](https://www.pbottle.com/static/upload/20221213/16709408628938.jpg)


#### 官方定制开发服务

联系我们定制化开发更多更复杂的RPA流程脚本（付费） [联系我们](https://www.pbottle.com/page-contact.html) 

