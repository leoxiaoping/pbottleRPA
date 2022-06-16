const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
// console.log(Date());
console.log('屏幕分辨率：',pbottleRPA.getResolution())
//


// let imagePath = encodeURIComponent("d:/nodeAPP/QtAPP/pbottleRPA/build-pbottleRPA-Replacement_for_Replacement_for_qt5_15_vs2019-Release/input/000.png")
// console.log('屏幕orc：',pbottleRPA.aiOcr(imagePath));


pbottleRPA.tts('正在识别您的电脑屏幕左上角区域文字')
//延迟5秒
pbottleRPA.sleep(1000*5)

console.log('屏幕orc结果：',pbottleRPA.aiOcr('screen',10,10,500,500))


console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");