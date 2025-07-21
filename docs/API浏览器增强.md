# 浏览器增强 - web应用

**⚠ 浏览器插件只是一种web浏览器页面操作的快捷操作方式，不是必须。按照小瓶RPA桌面应用的操作规则一样可以操作web浏览器应用。**

需要先安装小瓶RPA浏览器插件，安装方法查看：

https://rpa.pbottle.com/a-13942.html


基础调用方式：
`pbottleRPA.browserCMD.xxx()`

可以参考 “web增强“ 开头的demo示例。

## 元素选择器


小瓶RPA web增强基本遵循已经被广泛使用 **jQuery选择器** 的设计规则，可以参考jquery的选择器文档。

https://www.runoob.com/jquery/jquery-ref-selectors.html

相比 xpath 等方案优势：

- 学习成本低，规则和浏览器的 document.querySelector 原生方法一致
- 兼容性强，支持虚拟DOM的前端框架，如：Vue React 等
- 支持功能丰富且强大的伪类方案，可以高级选择定位

```javascript
pbottleRPA.browserCMD_click('button:contains(登录帐号)')
```




## 元素选择器测试工具

新版小瓶RPA增加了元素选择器测试功能，本功能旨在帮助用户在复杂网页中快速定位和选择html的元素。

![web增强插件](https://www.pbottle.com/static/upload/20250416/17447934102282.png)

**V2025.2 新增选中元素背景闪烁功能，方便用户查看元素位置。**


##  alert 警告框 


browserCMD_alert()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

警告框

@param {*} msg 显示文本内容

@returns 无


## url 获取|设置当前url 

browserCMD_url()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

@param {string} urlStr 当前网页转向新网址，默认为空获取当前网址 【小瓶RPA浏览器增强插件V2023.8以上生效】

@returns {string} 返回当前浏览器的url网址 或者 ok


## click 点击

browserCMD_click()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

模拟点击 参考 jQuery click() 方法 新版增加点击A标签能力

@param {*} selector 元素选择器

@returns


## count 元素计数 

browserCMD_count()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

元素数量 参考 jQuery 选择器

@param {string} selector 元素选择器

@returns {number} 返回选择元素的数量，最优的选择结果是1

## hide 隐藏元素

browserCMD_hide()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

隐藏 参考 jQuery hide() 方法

@param {*} selector 元素选择器

@returns


##  show 显示元素

browserCMD_show()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

显示 参考 jQuery show() 方法

@param {*} selector 元素选择器

@returns


## offset 获取元素位置

浏览器增强命令 需要安装小瓶RPA的浏览器拓展 2024.0 以上版本生效

获取元素定位，相对浏览器文档左上角 参考 jQuery offset() 方法

@param {string} selector 元素选择器

@returns {} 返回 json:`{"top":100,"left":100}`


## remove 移除元素

browserCMD_remove()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

移除元素 参考 jQuery remove() 方法

@param {*} selector 元素选择器

## text 获取|设置文本

browserCMD_text

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

获取或者设置文本 参考 jQuery text() 方法

@param {*} selector 元素选择器

@param {*} content

@returns

## html 设置|获取代码

browserCMD_html()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

获取或者设置html 参考 jQuery html() 方法

@param {*} selector 元素选择器

@param {*} content

@returns

## val 获取|设置值

browserCMD_val()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

获取或设置值 input select等 参考 jQuery val() 方法

@param {*} selector 元素选择器

@param {*} content

@returns

## cookie 获取|设置 小存储

browserCMD_cookie()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

获取或设置当前站点的 cookie

@param {*} cName cookie 名称

@param {*} cValue cookie 值 留空为获取cookie的值

@param {*} expDays cookie 过期时间，单位：天, 留空为会话cookie

@returns 返回 cookie的值


## css 获取|设置样式

browserCMD_css()

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

获取或设置css样式 参考 jQuery css() 方法

@param {*} selector 元素选择器

@param {*} propertyname

@param {*} value

@returns


## attr 获取|设置属性

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

获取或设置attr样式 参考 jQuery attr() 方法

@param {*} selector 元素选择器

@param {*} 属性名

@param {*} value


## prop 获取|设置prop

浏览器增强命令 需要安装小瓶RPA的浏览器拓展

获取或设置prop样式 参考 jQuery prop() 方法

@param {*} selector 元素选择器

@param {*} 属性名

@param {*} value


## 批量采集获取网页内容

当选择器结果为多个元素时候，会一次性返回所有内容，内容格式为：JSON数组。  注意：V2025.3 以上版本支持。

批量采集获取网页内容目前支持方法：

- text()
- html()
- val()
- attr()
  
  参考示例：WEB增强-数据批量爬取演示.js
