const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
// console.log(Date());

pbottleRPA.tts('准备开始运行 朋友圈批量点赞脚本')
pbottleRPA.sleep(1000*2)



pbottleRPA.moveMouseSmooth(1634,143)
pbottleRPA.mouseLeftDragTo(500,500)


pbottleRPA.sleep(1000*100)
console.log("结束");