# 网络

流程同步网络方法

## openURL 打开网址

用电脑默认浏览器打开网址

@param {string} myurl 网址

示例：快速开始脚本

## getHtml 请求网址 （同步方法）

  普通请求网址，获取返回的html文本

  @param {string} url 网络地址 get方法

  @param {object} headersJson  请求头 Json对象 

  @returns {string} 返回的文本


## postJson 提交json

  向指定API网址post一个json，最常用网络接口方式
  
  @param {string} url API网络地址 
  
  @param {object} msgJson Json对象 
  
  @param {object} headersJson 请求头 Json对象 

  @param {string} method e.g. GET, POST, PUT, DELETE or HEAD

  @returns {string}

示例：运维消息手机通知.js

## postJsonFile 提交json文件

  向指定API网址post一个json文件，适合大型json内容

  @param {string} url API网络地址 

  @param {string} msgJsonFile Json文件路径 

  @param {object} headersJson 请求头Json对象 

  @param {string} method e.g. GET, POST, PUT, DELETE or HEAD

  @returns {string}

示例：GPT图像解析示例.js



## downloadFile 下载文件

  从网络下载一个文件到本地路径

  @param {string} fileUrl 网址

  @param {string} filename 本地路径文件名
  
  @param {object} headersJson  请求头 Json对象 


## wxMessage 微信消息发送（过期废止）

通知到手机

通过小瓶云发送微信通知 (微信到达率高，并且免费)

@param {string} name 消息标题

@param {string} content 消息详细内容

@param {string} key 获取key详情方法：https://www.pbottle.com/a-12586.html

## sendMail 发送邮件

 * 发送邮件；注意这个方法是个异步方法，请参考示例;
 * @param {string} to  收件人地址
 * @param {string} subject 邮件主题
 * @param {string} content 邮件内容;文本文件，换行用 '\n'
 * @param {string} host 服务器地址（如：smtp.qq.com）
 * @param {number} port 服务器端口 默认是465
 * @param {string} user 认证信息（用户名）一般也是发送邮件地址
 * @param {string} pass 认证信息（密码）
 * @returns 

示例：发送Email电子邮件.js