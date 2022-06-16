const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
console.log(Date());




pbottleRPA.tts('准备运行，小瓶RPA自动化流程脚本！~ 鼠标键盘操作')
//延迟5秒
pbottleRPA.sleep(1000*5)


//用浏览器打开网址
pbottleRPA.openURL('https://www.pbottle.com')
pbottleRPA.sleep(1000*2)



pbottleRPA.tts('准备滚动鼠标，10秒后开始')
pbottleRPA.sleep(1000*10)




pbottleRPA.tts('正在滑动鼠标滚轮滚')
pbottleRPA.mouseWheel()
pbottleRPA.sleep(1000*5)
pbottleRPA.tts('正在滑动鼠标滚轮滚')
pbottleRPA.mouseWheel(360)


//测试鼠标拖拽
pbottleRPA.tts('正在鼠标拖拽')
pbottleRPA.sleep(1000*3)
pbottleRPA.moveMouseSmooth(1634,143)
pbottleRPA.mouseLeftDragTo(500,500)





pbottleRPA.sleep(1000*30)







console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");