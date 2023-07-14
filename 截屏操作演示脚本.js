const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
console.log(Date());



pbottleRPA.tts('开始运行小瓶RPA截屏操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出')
//延迟5秒
pbottleRPA.sleep(1000*12)



let resolution = pbottleRPA.getResolution()
console.log('当前电脑屏幕分辨率',resolution)

pbottleRPA.tts(`当前电脑屏幕分辨率: ${resolution.w} 乘以 ${resolution.h}`)
pbottleRPA.sleep(1000*6)



pbottleRPA.tts('正在截屏（全屏）...')
pbottleRPA.sleep(1000*3)

// pbottleRPA.screenShot('d:/abssds图片.png'); 

pbottleRPA.screenShot();

pbottleRPA.tts('正在截屏（区域）...')
let rs = pbottleRPA.screenShot('',resolution.w/4,resolution.h/4,resolution.w/2,resolution.h/2);
console.log('截屏结果：',rs);

pbottleRPA.sleep(1000*3)


pbottleRPA.tts('图片保存在我的电脑 我的图片...')
pbottleRPA.sleep(1000*5)



pbottleRPA.tts('演示结束')
console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");