/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的基本文件操作功能，包括打开文件夹、打开文件、复制文件和删除文件
 * 通过这个示例，您可以学习如何在自动化流程中进行常见的文件管理操作
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限
const fs = require('fs')                      // 引入Node.js文件系统模块，用于执行文件操作

pbottleRPA.tts('打开文件夹')                  // 使用文字转语音功能播报即将执行的操作
console.log('打开文件夹');                    // 在控制台输出相同信息
pbottleRPA.wait(3)                            // 等待3秒钟

console.log('./input/');                      // 在控制台输出要打开的文件夹路径
pbottleRPA.openDir('./input/')                // 使用RPA功能打开指定文件夹
pbottleRPA.wait(2)                            // 等待2秒钟观察效果

pbottleRPA.tts('打开图片')                    // 使用文字转语音功能播报即将执行的操作
console.log('打开图片');                      // 在控制台输出相同信息

// 使用RPA功能打开指定图片文件（使用系统默认图片查看器）
pbottleRPA.openfile('./input/RPAlogo128.png') 
pbottleRPA.wait(2)                            // 等待2秒钟观察效果

pbottleRPA.tts('关闭')                        // 使用文字转语音功能播报即将执行的操作
pbottleRPA.keyTap('alt+f4')                   // 模拟按下Alt+F4组合键关闭当前窗口
pbottleRPA.wait()                             // 等待默认时间

pbottleRPA.tts('复制文件')                    // 使用文字转语音功能播报即将执行的操作
console.log('复制文件')                       // 在控制台输出相同信息

// 使用Node.js文件系统API复制文件（从源文件复制到新文件）
fs.copyFileSync('./input/RPAlogo128.png', './input/RPAlogo128-新复制.png')
pbottleRPA.wait(3)                            // 等待3秒钟

pbottleRPA.tts('删除文件')                    // 使用文字转语音功能播报即将执行的操作
console.log('删除文件')                       // 在控制台输出相同信息

// 使用Node.js文件系统API删除指定文件
fs.unlinkSync('./input/RPAlogo128-新复制.png') 

pbottleRPA.tts('演示结束')                    // 使用文字转语音功能播报演示结束
console.log('演示结束')                       // 在控制台输出相同信息

// 显示系统消息框提示用户演示结束，并建议查看运行日志
pbottleRPA.showMsg('演示结束','请查看运行日志')