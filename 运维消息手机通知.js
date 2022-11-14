const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
console.log(Date());


pbottleRPA.tts('准备运行手机消息通知脚本')
pbottleRPA.sleep(1000*5)


pbottleRPA.tts('方式一：采用webhook 方式  企业微信、钉钉都支持')
//延迟5秒
pbottleRPA.sleep(1000*5)


//webhook 方式  企业微信、钉钉都支持
let msgJson={
    "msgtype": "text",
    "text": {
        "content": "小瓶Rpa测试脚本运行中..."
    }
};
pbottleRPA.postJson('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67bc3b43-85d1-4e0b-b7a2-d8c22d415a80',msgJson);



pbottleRPA.tts('方式二：个人微信通知，需要关注小瓶科技公众号')
//延迟5秒
pbottleRPA.sleep(1000*5)

//微信消息测试，几乎零延迟，100%到达率   详情： https://www.pbottle.com/a-12586.html
pbottleRPA.wxMessage('小瓶RPA机器人消息',"主人，我的任务已经完成了,随时等您的吩咐",'key599a9e4136010');



pbottleRPA.tts("运行结束")

console.log("准备结束脚本");
pbottleRPA.sleep(1000*3)
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");