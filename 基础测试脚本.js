const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
// console.log(Date());

pbottleRPA.tts('准备运行，小瓶RPA自动化流程测试脚本！~')
//延迟5秒
pbottleRPA.sleep(1000*5)



//测试鼠标拖拽
pbottleRPA.moveMouseSmooth(1634,143)
pbottleRPA.mouseLeftDragTo(500,500)





pbottleRPA.sleep(1000*30)


//微信消息测试
pbottleRPA.wxMessage('小瓶RPA机器人消息',"主人，我的任务已经完成了,随时等您的吩咐",'key599a9e4136010');







console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");