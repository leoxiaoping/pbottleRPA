/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的OCR文字识别和查找功能
 * 通过这些示例，您可以学习如何使用AI技术识别屏幕上的文字内容并进行查找定位
 */

const pbottleRPA = require('./pbottleRPA')      // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log("=== OCR 识别测试 ===");                   // 在控制台输出测试标题
console.log('屏幕分辨率：',pbottleRPA.getResolution()) // 在控制台输出当前屏幕分辨率信息

pbottleRPA.tts('正在识别您的电脑屏幕左上角区域文字') // 使用文字转语音功能播报即将执行的操作
pbottleRPA.wait(5)                             // 等待5秒钟

let start = Date.now()                         // 记录OCR识别开始时间（用于计算耗时）

console.log('屏幕orc结果：',pbottleRPA.aiOcr('screen',10,10,500,500)) // 对屏幕左上角区域(10,10,500,500)进行OCR文字识别，并输出结果到控制台
let end = Date.now();                          // 记录OCR识别结束时间
console.log('OCR耗时：（秒）',(end-start)/1000); // 计算并输出OCR识别耗时（转换为秒）

pbottleRPA.tts("已经输出 JSON 格式到运行日志")  // 语音播报OCR结果已输出
pbottleRPA.wait(5);                            // 等待5秒钟


console.log("查找并点击微信")                   // 在控制台输出操作信息
pbottleRPA.tts("查找并点击微信")                // 语音播报即将执行的操作

let position = pbottleRPA.findText('微信',10,10,1000,500) // 在屏幕区域(10,10,1000,500)内查找"微信"文字，返回位置信息
console.log('查找文字结果：',position);         // 在控制台输出查找到的文字位置信息


if (position) {                                // 如果找到了指定文字
    pbottleRPA.moveAndClick(position.x,position.y) // 移动鼠标到文字位置并点击
}else{                                         // 如果没有找到指定文字
    console.log("范围内没有找到文字：微信");      // 在控制台输出未找到的提示信息
}

console.log("准备结束脚本");                   // 在控制台输出脚本即将结束的信息
pbottleRPA.tts("准备结束脚本");                // 语音播报脚本即将结束的信息


pbottleRPA.showMsg('演示结束','请查看运行日志') // 显示系统消息框提示演示结束
pbottleRPA.exit("结束")                        // 退出RPA脚本执行