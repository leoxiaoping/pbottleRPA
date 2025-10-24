/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了企业版的AI物体识别功能
 * 可以识别屏幕指定区域内的物体类型和位置，依赖于当前的训练模型
 * 注意：此功能仅在企业版中可用
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log("=== 屏幕物体识别测试开始 ===");              // 在控制台输出测试开始信息
console.log(Date());                          // 在控制台输出当前日期时间

// 获取设备ID以检查是否为企业版
let deviceID = pbottleRPA.deviceID();
console.log('设备号：',deviceID);              // 输出设备ID到控制台

// 检查是否为个人版（个人版不支持此功能）
if (deviceID == '个人版不可用') {
    console.log('个人版不可用，请先开通企业版');   // 输出提示信息到控制台
    // 显示系统消息框提示用户
    pbottleRPA.showMsg('个人版不可用','请先开通企业版')
    // 使用文字转语音功能播报提示信息
    pbottleRPA.tts('个人版不可用，请先开通企业版')
    // 退出脚本并输出错误信息
    pbottleRPA.exit('个人版不可用，请先开通企业版')
}

// 提示用户物体识别种类依赖于当前的训练模型
console.log('物体识别种类依赖于当前的训练模型');
// 使用文字转语音功能播报提示信息
pbottleRPA.tts('物体识别种类依赖于当前的训练模型')

console.log("将要识别屏幕线框内物体，5秒后开始");
pbottleRPA.wait(5)                            // 等待5秒钟

// 使用AI物体识别功能检测屏幕指定区域内的物体
// 参数说明：置信度阈值0.5，检测区域坐标(745,291,424,565)
let rs = pbottleRPA.aiObject(0.5,745,291,424,565)
console.log("检测到物体结果：",rs);            // 输出检测到的物体结果到控制台