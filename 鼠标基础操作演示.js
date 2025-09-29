/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的各种鼠标操作，包括移动、点击、双击、滚轮、拖拽等
 * 通过这些示例，您可以学习如何在RPA流程中精确控制鼠标行为
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log("=== 鼠标基础演示测试 ===");       // 在控制台输出测试标题
console.log(Date());                          // 在控制台输出当前日期时间
pbottleRPA.setDefaultDelay(0);                // 设置默认操作延时为0，手动管理所有操作延时

pbottleRPA.tts('开始运行小瓶RPA鼠标操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出') // 使用文字转语音功能播报开始信息
pbottleRPA.wait(12)                           // 等待12秒钟，给用户时间准备

let resolution = pbottleRPA.getResolution()   // 获取当前电脑屏幕分辨率信息
console.log('当前电脑屏幕分辨率',resolution)   // 在控制台输出屏幕分辨率信息
pbottleRPA.keyTap('windows+d')                // 模拟按下Win+D组合键，显示桌面

pbottleRPA.tts(`当前电脑屏幕分辨率: ${resolution.w} 乘以 ${resolution.h}`) // 语音播报当前屏幕分辨率
pbottleRPA.wait(6)                            // 等待6秒钟

pbottleRPA.tts(`移动指针到屏幕中点`)           // 语音播报即将执行的操作
pbottleRPA.log(`移动指针到屏幕中点`)           // 将操作记录到日志文件中
pbottleRPA.moveMouse(resolution.w/2,resolution.h/2) // 移动鼠标到屏幕中心点位置
pbottleRPA.wait(3)                            // 等待3秒钟观察效果

pbottleRPA.tts(`长按左键`)                     // 语音播报即将执行的操作
pbottleRPA.log(`长按左键`)                     // 将操作记录到日志文件中
pbottleRPA.mouseClick('left',1500);           // 长按鼠标左键1500毫秒(1.5秒)
pbottleRPA.wait(2)                            // 等待2秒钟

pbottleRPA.tts(`鼠标双击`)                     // 语音播报即将执行的操作
pbottleRPA.log(`鼠标双击`)                     // 将操作记录到日志文件中
pbottleRPA.moveMouse(38,38)                   // 移动鼠标到屏幕左上角坐标(38,38)位置
pbottleRPA.mouseDoubleClick()                 // 执行鼠标双击操作
pbottleRPA.wait(3)                            // 等待3秒钟

pbottleRPA.tts('准备打开网页并滚动鼠标，5秒后开始') // 语音播报即将执行的操作
pbottleRPA.wait(10)                           // 等待10秒钟

pbottleRPA.openURL('https://rpa.pbottle.com?from=demo') // 使用默认浏览器打开小瓶RPA官网
pbottleRPA.wait(3)                            // 等待3秒钟让网页加载完成
pbottleRPA.keyTap('f11')                      // 模拟按下F11键，进入浏览器全屏模式
pbottleRPA.wait(1)                            // 等待1秒钟

pbottleRPA.tts('滚动鼠标')                     // 语音播报即将执行的操作
pbottleRPA.mouseWheel()                       // 执行鼠标滚轮向下滚动操作
pbottleRPA.wait(4)                            // 等待4秒钟观察效果
pbottleRPA.tts('反向滚动鼠标')                 // 语音播报即将执行的操作
pbottleRPA.mouseWheel(360)                    // 执行鼠标滚轮向上滚动360单位的操作
pbottleRPA.wait(4)                            // 等待4秒钟观察效果

pbottleRPA.tts('右键页面')                     // 语音播报即将执行的操作
pbottleRPA.log('右键页面')                     // 将操作记录到日志文件中
pbottleRPA.moveMouse(200,250)                 // 移动鼠标到坐标(200,250)位置
pbottleRPA.mouseClick('right')                // 执行鼠标右键单击操作
pbottleRPA.wait(3)                            // 等待3秒钟
pbottleRPA.moveMouse(150,250)                 // 移动鼠标到坐标(150,250)位置
pbottleRPA.tts('左键单击')                     // 语音播报即将执行的操作
pbottleRPA.log('左键单击')                     // 将操作记录到日志文件中
pbottleRPA.mouseClick()                       // 执行鼠标左键单击操作（默认为左键）
pbottleRPA.wait(3)                            // 等待3秒钟

// 测试鼠标拖拽操作
pbottleRPA.tts('拖拽或选区')                   // 语音播报即将执行的操作
pbottleRPA.log('拖拽或选区')                   // 将操作记录到日志文件中
pbottleRPA.wait(4)                            // 等待4秒钟
pbottleRPA.moveMouse(resolution.w*0.7,resolution.h*0.5) // 移动鼠标到屏幕右侧中间位置
pbottleRPA.wait(1)                            // 等待1秒钟
pbottleRPA.mouseLeftDragTo(resolution.w*0.3,resolution.h*0.2) // 从当前位置拖拽到屏幕左侧上方位置

pbottleRPA.tts('缓慢拖拽')                     // 语音播报即将执行的操作
pbottleRPA.log('缓慢拖拽')                     // 将操作记录到日志文件中
pbottleRPA.wait(4)                            // 等待4秒钟
pbottleRPA.mouseClick()                       // 执行鼠标单击操作
pbottleRPA.wait(1)                            // 等待1秒钟
pbottleRPA.mouseKeyToggle('left','down')      // 按下鼠标左键（保持按下状态）
pbottleRPA.moveMouse(resolution.w*0.7,resolution.h*0.5,3) // 缓慢移动鼠标到指定位置（耗时3秒）
pbottleRPA.mouseKeyToggle('left','up')        // 松开鼠标左键

pbottleRPA.wait(5)

pbottleRPA.mouseClick()
pbottleRPA.keyTap('f11')
pbottleRPA.tts('演示结束')
console.log("准备结束脚本");
pbottleRPA.wait(3)
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");