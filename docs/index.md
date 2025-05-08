---
next:
  text: 'Demo示例'
  link: 'Demo示例.html'
---


# 开始使用小瓶RPA

**小瓶RPA，专业用户的专业RPA软件。**

长难业务自动化流程专精，轻量级简单全能的RPA软件，显著降本增效 & 工作100%准确 & 非侵入式集成。同时支持浏览器web应用和客户端应用的操作流程自动化。同时支持 Js 和 Python 两种脚本制作流程。

具体API的使用可以参考demo，所有api接口都有demo。

下载官网：https://rpa.pbottle.com/


温馨提示：未经授权禁止出售小瓶RPA软件和其附加资源，参考
[《小瓶RPA 用户协议》](https://rpa.pbottle.com/a-13944.html)  [《小瓶RPA 软件授权对比》](https://rpa.pbottle.com/License.php)


![小瓶RPA logo](https://rpa.pbottle.com/TP/img/logo_rpa.png)



## 小瓶RPA的优势

1. 自动化、AI、大模型能力可以快速落实到工作流程，并能精细化调整。
2. 轻量级 + 开放接口能力，无缝整合现有工作系统，而非高成本替代。
3. 纯视觉模拟驱动，可以兼容操作所有应用程序。
4. 技术运维人员友好，主流脚本语言表达，高天花板。



## 自动流程入门示例

```javascript
const pbottleRPA = require('./pbottleRPA')  //引入小瓶RPA nodejs模块

pbottleRPA.openURL('https://www.baidu.com/') // 用浏览器打开百度
pbottleRPA.paste('小瓶RPA官网')  //输入搜索词
pbottleRPA.keyTap('enter')  //确认搜索
```


```python
import pbottleRPA  #引入小瓶RPA python模块

pbottleRPA.openURL('https://www.baidu.com/') #用浏览器打开百度
pbottleRPA.paste('小瓶RPA官网')  #输入搜索词
pbottleRPA.keyTap('enter')  #确认搜索

```


## 系统架构图

![小瓶RPA架构图](https://www.pbottle.com/TP/img/rpa.png)

## 小瓶RPA基座界面

![小瓶RPA软件截图](https://www.pbottle.com/static/upload/20250121/17374409604618.png)