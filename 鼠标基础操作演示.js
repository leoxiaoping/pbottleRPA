/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */


const pbottleRPA = require('./pbottleRPA')


console.log("=== 鼠标基础演示测试 ===");
console.log(Date());
pbottleRPA.setDefaultDelay(0); //手动管理操作延时



pbottleRPA.tts('开始运行小瓶RPA鼠标操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出')
//延迟5秒
pbottleRPA.sleep(1000*12)



let resolution = pbottleRPA.getResolution()
console.log('当前电脑屏幕分辨率',resolution)
pbottleRPA.keyTap('windows+d')


pbottleRPA.tts(`当前电脑屏幕分辨率: ${resolution.w} 乘以 ${resolution.h}`)
pbottleRPA.sleep(1000*6)

pbottleRPA.tts(`移动指针到屏幕中点`)
pbottleRPA.moveMouseSmooth(resolution.w/2,resolution.h/2)
pbottleRPA.sleep(1000*3)

pbottleRPA.tts(`长按左键`)
pbottleRPA.mouseClick('left',1500);
pbottleRPA.sleep(1000*2)



pbottleRPA.tts(`鼠标双击`)
pbottleRPA.moveMouseSmooth(38,38)
pbottleRPA.mouseDoubleClick()
pbottleRPA.sleep(1000*3)



pbottleRPA.tts('准备打开网页并滚动鼠标，5秒后开始')
pbottleRPA.sleep(1000*10)

//用浏览器打开网址
pbottleRPA.openURL('https://rpa.pbottle.com?from=demo')
pbottleRPA.sleep(1000*2)
pbottleRPA.keyTap('f11')
pbottleRPA.sleep(1000*1)


pbottleRPA.tts('滚动鼠标')
pbottleRPA.mouseWheel()
pbottleRPA.sleep(1000*4)
pbottleRPA.tts('反向滚动鼠标')
pbottleRPA.mouseWheel(360)
pbottleRPA.sleep(1000*4)



pbottleRPA.tts('右键页面')
pbottleRPA.moveMouseSmooth(100,100)
pbottleRPA.mouseClick('right')
pbottleRPA.sleep(1000*3)
pbottleRPA.moveMouseSmooth(35,35)
pbottleRPA.tts('左键单击')
pbottleRPA.mouseClick()
pbottleRPA.sleep(1000*3)




//测试鼠标拖拽
pbottleRPA.tts('拖拽或选区')
pbottleRPA.sleep(1000*4)
pbottleRPA.moveMouseSmooth(1634,143)
pbottleRPA.mouseLeftDragTo(500,500)



pbottleRPA.sleep(1000*5)

pbottleRPA.mouseClick()
pbottleRPA.keyTap('f11')
pbottleRPA.tts('演示结束')
console.log("准备结束脚本");
pbottleRPA.sleep(1000*3)
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");