/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */


const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
console.log(Date());
pbottleRPA.setDefaultDelay(0); //手动管理操作延时



pbottleRPA.tts('开始运行小瓶RPA键盘操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出')
//延迟5秒
pbottleRPA.sleep(1000 * 12)



let resolution = pbottleRPA.getResolution()
console.log('当前电脑屏幕分辨率', resolution)



pbottleRPA.tts(`当前电脑屏幕分辨率: ${resolution.w} 乘以 ${resolution.h}`)
pbottleRPA.sleep(1000 * 6)



pbottleRPA.tts('准备打开网页浏览并用快捷键进入全屏，5秒后开始')
pbottleRPA.sleep(1000 * 10)

//用浏览器打开网址
pbottleRPA.openURL('https://rpa.pbottle.com?from=demo')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('f11')
pbottleRPA.sleep(1000 * 2)


pbottleRPA.tts('翻页查看')
pbottleRPA.keyTap('page down')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page down')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page down')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.tts('翻页回来')
pbottleRPA.keyTap('page up')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page up')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page up')
pbottleRPA.sleep(1000 * 2)




pbottleRPA.tts('收藏我们吧，十分感谢')
pbottleRPA.keyTap('ctrl + d')

pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('enter')
pbottleRPA.sleep(1000 * 2)






pbottleRPA.keyTap('f11')
pbottleRPA.tts('演示结束')
console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");