/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的屏幕物体轮廓查找功能
 * 通过这个示例，您可以学习如何使用AI视觉识别技术查找屏幕上的物体轮廓
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log("=== 测试 ===");                  // 在控制台输出测试标题
console.log('屏幕分辨率：',pbottleRPA.getResolution()) // 输出当前屏幕分辨率信息

pbottleRPA.wait(3)                            // 等待3秒钟

let start = Date.now()                        // 记录开始时间，用于计算处理耗时

// 使用findContours函数查找屏幕指定区域内的物体轮廓
// 参数1：区域宽度(2000像素)
// 参数2：区域高度(500像素)
// 参数3：最小轮廓面积阈值(200像素)
console.log('屏幕物体轮廓查找结果：',pbottleRPA.findContours(2000,500,200))

let end = Date.now();                         // 记录结束时间
console.log('查找耗时：（秒）',(end-start)/1000); // 计算并输出查找耗时（转换为秒）

pbottleRPA.tts("已经输出 JSON 格式到运行日志")  // 使用文字转语音功能播报结果已输出到日志
pbottleRPA.wait(3);                           // 等待3秒钟

pbottleRPA.tts("已生成调试参考图片到RPA根目录 debug目录") // 语音播报调试图片生成位置
pbottleRPA.wait(3);                           // 等待3秒钟

console.log("准备结束脚本");                  // 在控制台输出脚本即将结束的信息
pbottleRPA.tts("准备结束脚本");               // 使用文字转语音功能播报脚本即将结束

pbottleRPA.exit("结束")                       // 退出RPA脚本执行并输出结束信息