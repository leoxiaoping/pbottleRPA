/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的剪切板操作功能，包括复制文本、获取剪切板内容和复制文件
 * 通过这个示例，您可以学习如何在自动化流程中使用剪切板进行数据传递
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log("=== 剪切板测试 ===");                  // 在控制台输出测试标题
console.log(Date());                          // 在控制台输出当前日期时间

pbottleRPA.tts('电脑剪切板演示')               // 使用文字转语音功能播报当前演示内容
// 显示系统消息框，提示用户新版剪切板支持获取图片、网页格式内容
pbottleRPA.showMsg('超级剪切板','新版剪切板已经支持获取图片、网页格式内容') 
console.log('超级剪切板','新版剪切板已经支持获取图片、网页格式内容') // 在控制台输出相同信息
pbottleRPA.wait(5)                            // 等待5秒钟，给用户时间阅读提示信息

pbottleRPA.tts('已经复制文字，赶紧找个地方粘贴试试吧') // 语音播报已复制文字的提示信息
console.log('已经复制文字，赶紧找个地方粘贴试试吧');   // 在控制台输出相同信息

// 将指定文本内容复制到系统剪切板中
pbottleRPA.paste("小瓶RPA官网：https://rpa.pbottle.com/") 

pbottleRPA.wait(10)                           // 等待10秒钟，给用户时间进行粘贴测试

// 从系统剪切板中获取当前文本内容
let text = pbottleRPA.getClipboard();         
console.log("获取当前剪切板文本：",text);        // 在控制台输出获取到的剪切板文本内容

console.log("复制文件模拟操作：")               // 在控制台输出即将进行的操作说明
// 复制文件到系统剪切板（模拟文件复制操作）
pbottleRPA.copyFile(__dirname + '/input/RPAlogo128.png') // 将指定图片文件复制到剪切板
let filepath = pbottleRPA.getClipboard();     // 获取剪切板中的文件路径信息
console.log("剪切板文件路径：",filepath);       // 在控制台输出获取到的文件路径

pbottleRPA.tts('已经复制文件，赶紧桌面粘贴试试吧') // 语音播报已复制文件的提示信息
console.log('已经复制文件，赶紧桌面粘贴试试吧');   // 在控制台输出相同信息