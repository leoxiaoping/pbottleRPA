const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
// console.log(Date());

pbottleRPA.tts('欢迎使用 小瓶科技RPA自动化流程产品！~')
pbottleRPA.sleep(1000*2)




pbottleRPA.moveMouseSmooth(1634,143)
pbottleRPA.mouseLeftDragTo(500,500)


pbottleRPA.sleep(1000*100)
console.log("结束");