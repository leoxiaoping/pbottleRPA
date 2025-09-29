/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的GPT图像解析功能，可以向云端AI提问关于图片内容的问题
 * 通过这个示例，您可以学习如何结合AI能力分析和理解图片内容
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

// 开始RPA操作

let ask = '描述图片中有什么？'                 // 定义要向AI提出的问题
console.log(ask,`./input/RPAlogo128.png`);    // 在控制台输出问题和要分析的图片路径

const start = Date.now()                      // 记录开始时间，用于计算处理耗时
pbottleRPA.log('云端 AI 生成答案:')            // 将提示信息输出到日志文件中
// 调用云端GPT图像分析API，传入问题和图片路径，并输出结果内容
console.log(pbottleRPA.cloud_GPTV(ask,`./input/RPAlogo128.png`).content) 
console.log('图片解析耗时：(毫秒)',Date.now()-start); // 计算并输出图片解析耗时（毫秒）