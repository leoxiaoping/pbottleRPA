/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的文件上传（发送）功能
 * 需要使用浏览器增强插件来操作网页元素，实现自动化的文件上传流程
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

// 语音播报开始信息
pbottleRPA.tts('上传发送文件演示')             // 使用文字转语音功能播报演示开始
// 显示系统消息框提示用户需要浏览器增强插件
pbottleRPA.showMsg('本演示需要浏览器增强插件','上传发送文件演示') 
pbottleRPA.wait(2)                            // 等待2秒钟

console.log('开始演示');                      // 在控制台输出开始演示信息

// 打开百度图片网站用于演示文件上传
pbottleRPA.openURL('https://image.baidu.com/') 
pbottleRPA.wait()                             // 等待页面加载完成

// 使用浏览器增强插件点击上传图标元素
// 通过CSS选择器匹配class以"img-upload-icon_"开头的span元素
pbottleRPA.browserCMD_click('span[class^="img-upload-icon_"]')

// 查找页面中的"上传图片"文字位置
let pos = pbottleRPA.findText('上传图片')      
// 移动鼠标到找到的位置并点击，打开文件选择对话框
pbottleRPA.moveAndClick(pos.x,pos.y)          

pbottleRPA.wait()                             // 等待对话框打开

// 复制要上传的文件到剪切板
pbottleRPA.copyFile(__dirname + '/input/RPAlogo128.png') 

// 使用快捷键操作选择文件上传方式
pbottleRPA.keyTap('shift+tab')                // 按下Shift+Tab组合键
pbottleRPA.keyTap('ctrl+v')                   // 按下Ctrl+V组合键粘贴文件

pbottleRPA.wait()                             // 等待文件粘贴完成
pbottleRPA.keyTap('enter')                    // 按下回车键确认文件选择

// 确定上传操作
pbottleRPA.keyTap('enter')                    // 再次按下回车键开始上传文件