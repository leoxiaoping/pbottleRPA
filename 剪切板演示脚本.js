const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
console.log(Date());

pbottleRPA.tts('电脑剪切板演示')
//延迟5秒
pbottleRPA.sleep(1000*5)

pbottleRPA.tts('已经将文字复制到您的剪切板，赶紧粘贴试试吧')


pbottleRPA.paste("小瓶RPA官网：https://rpa.pbottle.com/")



//延迟5秒
pbottleRPA.sleep(1000*5)



console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");