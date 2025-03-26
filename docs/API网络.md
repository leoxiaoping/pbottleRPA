# 网络

## openURL 打开网址

用电脑默认浏览器打开网址

@param {*} myurl 网址

示例：快速开始脚本

## getHtml 请求网址

  普通请求网址，获取返回的html文本

  @param {string} url 网络地址 get方法

  @param {object} headersJson  请求头 Json对象 

  @returns {string} 返回的文本


## postJson 接口post

  向指定API网址post一个json，最常用网络接口方式
  
  @param {string} url API网络地址 
  
  @param {object} msgJson Json对象 
  
  @param {object} headersJson 请求头 Json对象 

  @param {string} method e.g. GET, POST, PUT, DELETE or HEAD

  @returns {string}


示例：运维消息手机通知.js


## downloadFile 下载文件

  从网络下载一个文件到本地路径

  @param {string} fileUrl 网址

  @param {string} filename 本地路径文件名
  
  @param {object} headersJson  请求头 Json对象 


## wxMessage 微信消息发送

通知到手机

通过小瓶云发送微信通知 (微信到达率高，并且免费)

@param {*} name 消息标题

@param {*} content 消息详细内容

@param {*} key 获取key详情方法：https://www.pbottle.com/a-12586.html