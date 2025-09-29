/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的各种键盘操作，包括按键、组合键、页面导航等
 * 通过这些示例，您可以学习如何在RPA流程中精确控制键盘行为
 */

const pbottleRPA = require('./pbottleRPA')    // 引入小瓶RPA的核心库，获得对RPA功能的访问权限
console.log("=== 键盘操作测试 ===");          // 在控制台输出测试标题
console.log(Date());                         // 在控制台输出当前日期时间
pbottleRPA.setDefaultDelay(0);               // 设置默认操作延时为0，手动管理所有操作延时

pbottleRPA.tts('开始运行小瓶RPA键盘操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出') // 使用文字转语音功能播报开始信息
pbottleRPA.wait(12)                          // 等待12秒钟，给用户时间准备

let resolution = pbottleRPA.getResolution()  // 获取当前电脑屏幕分辨率信息
console.log('当前电脑屏幕分辨率', resolution)  // 在控制台输出屏幕分辨率信息
pbottleRPA.tts(`当前电脑屏幕分辨率: ${resolution.w} 乘以 ${resolution.h}`) // 语音播报当前屏幕分辨率
pbottleRPA.wait(6)                           // 等待6秒钟

pbottleRPA.tts('准备打开网页浏览并用快捷键进入全屏，5秒后开始') // 语音播报即将执行的操作
pbottleRPA.wait(10)                          // 等待10秒钟

pbottleRPA.openURL('https://rpa.pbottle.com?from=demo') // 使用默认浏览器打开小瓶RPA官网
pbottleRPA.wait(3)                           // 等待3秒钟让网页加载完成
pbottleRPA.moveAndClick(50,500)              // 移动鼠标到指定坐标并点击，确保页面获得焦点
pbottleRPA.tts('缩放页面')                    // 语音播报即将执行的操作

// 使用组合键控制页面缩放
pbottleRPA.keyTap('ctrl + -')                // 模拟按下Ctrl+-组合键，缩小页面
pbottleRPA.keyTap('ctrl + -')                // 再次缩小页面
pbottleRPA.keyTap('ctrl + -')                // 第三次缩小页面
pbottleRPA.keyTap('ctrl + =')                // 模拟按下Ctrl+=组合键，放大页面
pbottleRPA.keyTap('ctrl + =')                // 再次放大页面
pbottleRPA.keyTap('ctrl + =')                // 第三次放大页面

pbottleRPA.wait(1)                           // 等待1秒钟
pbottleRPA.keyTap('f11')                     // 模拟按下F11键，进入浏览器全屏模式
pbottleRPA.wait(2)                           // 等待2秒钟

pbottleRPA.tts('翻页查看')                    // 语音播报即将执行的操作

// 使用Page Down键向下翻页浏览页面内容
pbottleRPA.keyTap('page down')               // 模拟按下Page Down键，向下翻页
pbottleRPA.wait()                            // 等待默认时间（使用默认延时）
pbottleRPA.keyTap('page down')               // 再次向下翻页
pbottleRPA.wait()                            // 等待默认时间
pbottleRPA.keyTap('page down')               // 第三次向下翻页
pbottleRPA.wait()                            // 等待默认时间

pbottleRPA.tts('翻页回来')                    // 语音播报即将执行的操作

// 使用Page Up键向上翻页回到页面顶部
pbottleRPA.keyTap('page up')                 // 模拟按下Page Up键，向上翻页
pbottleRPA.wait()                            // 等待默认时间
pbottleRPA.keyTap('page up')                 // 再次向上翻页
pbottleRPA.wait()                            // 等待默认时间
pbottleRPA.keyTap('page up')                 // 第三次向上翻页
pbottleRPA.wait(2)                           // 等待2秒钟

pbottleRPA.tts('收藏我们吧，十分感谢')         // 语音播报即将执行的操作
pbottleRPA.keyTap('ctrl + d')                // 模拟按下Ctrl+D组合键，打开浏览器收藏夹对话框

pbottleRPA.wait(1)                           // 等待1秒钟
pbottleRPA.keyTap('enter')                   // 模拟按下Enter键，确认收藏操作
pbottleRPA.wait(2)                           // 等待2秒钟

pbottleRPA.keyTap('f11')                     // 模拟按下F11键，退出浏览器全屏模式
pbottleRPA.tts('演示结束')                    // 语音播报演示结束信息
console.log("准备结束脚本");                 // 在控制台输出脚本即将结束的信息

pbottleRPA.exit("脚本结束")                   // 退出RPA脚本执行，并输出结束信息