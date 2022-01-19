const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
// console.log(Date());
console.log('屏幕分辨率：',pbottleRPA.getResolution())
//


let imagePath = encodeURIComponent("d:/nodeAPP/QtAPP/pbottleRPA/build-pbottleRPA-Replacement_for_Replacement_for_qt5_15_vs2019-Release/input/000.png")
console.log('屏幕orc：',pbottleRPA.aiOcr('screen',10,10,800,800))


// process.exit(1)


//webhook
let msgJson={
    "msgtype": "text",
    "text": {
        "content": "小瓶Rpa测试脚本运行中..."
    }
};
pbottleRPA.postJson('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67bc3b43-85d1-4e0b-b7a2-d8c22d415a80',msgJson);



pbottleRPA.tts('准备运行，小瓶RPA自动化流程测试脚本！~')
//延迟5秒
pbottleRPA.sleep(1000*5)


//用浏览器打开网址
pbottleRPA.openURL('https://www.pbottle.com')
pbottleRPA.sleep(1000*2)



//测试鼠标拖拽
pbottleRPA.moveMouseSmooth(1634,143)
pbottleRPA.mouseLeftDragTo(500,500)




pbottleRPA.tts('准备滚动鼠标，10秒后开始')
pbottleRPA.sleep(1000*10)



pbottleRPA.tts('正在滑动鼠标滚轮滚')
pbottleRPA.mouseWheel()
pbottleRPA.sleep(1000*5)
pbottleRPA.tts('正在滑动鼠标滚轮滚')
pbottleRPA.mouseWheel(360)





pbottleRPA.sleep(1000*30)


//微信消息测试
pbottleRPA.wxMessage('小瓶RPA机器人消息',"主人，我的任务已经完成了,随时等您的吩咐",'key599a9e4136010');







console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");