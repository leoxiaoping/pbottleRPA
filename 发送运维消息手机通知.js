/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的手机消息通知功能，包括通过Webhook发送企业微信/钉钉消息和通过微信公众号发送个人通知
 * 通过这个示例，您可以学习如何在自动化流程中集成手机通知功能，实现远程监控和告警
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log("=== 运维消息通知测试 ===");                  // 在控制台输出测试标题
console.log(Date());                          // 在控制台输出当前日期时间

pbottleRPA.tts('准备运行手机消息通知脚本')      // 使用文字转语音功能播报即将执行的操作
pbottleRPA.wait(5)                            // 等待5秒钟，给用户时间准备

pbottleRPA.tts('采用webhook 方式  企业微信、钉钉都支持') // 语音播报第一种通知方式
pbottleRPA.log("采用webhook 方式  企业微信、钉钉都支持")
pbottleRPA.wait(5)                            // 等待5秒钟

// webhook方式发送消息，企业微信、钉钉都支持此方式
let msgJson = {                               // 定义要发送的消息内容对象
    "msgtype": "text",                        // 消息类型为文本
    "text": {                                 // 文本消息内容
        "content": "小瓶Rpa测试脚本运行中..."   // 具体的文本内容
    }
};

// 修改下方接收地址，可以用自己手机接收信息  
// 参考：https://open.work.weixin.qq.com/help2/pc/14931#%E4%BA%94%E3%80%81%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BAWebhook%E5%9C%B0%E5%9D%80
let apiUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67bc3b43-85d1-4e0b-b7a2-d8c22d415a80'; // 企业微信机器人的Webhook地址

// 使用POST请求发送JSON格式消息到指定API地址
const rs = pbottleRPA.postJson(apiUrl,msgJson);
console.log('服务器返回结果：',rs);

pbottleRPA.tts("运行结束")                    // 语音播报运行结束信息
pbottleRPA.log("运行结束")
