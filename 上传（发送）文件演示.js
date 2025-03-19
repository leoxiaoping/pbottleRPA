/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')



//语音播报
pbottleRPA.tts('上传发送文件演示')
pbottleRPA.showMsg('本演示需要浏览器增强插件','上传发送文件演示')
pbottleRPA.wait(2)


console.log('开始演示');
pbottleRPA.openURL('https://image.baidu.com/')
pbottleRPA.wait()
pbottleRPA.browserCMD_click('span.img-upload-icon_y6ZWd')
let pos = pbottleRPA.findText('上传图片')
pbottleRPA.moveAndClick(pos.x,pos.y)
pbottleRPA.wait()
pbottleRPA.copyFile(__dirname + '/input/RPAlogo128.png')
pbottleRPA.keyTap('shift+tab')
pbottleRPA.keyTap('ctrl+v')
pbottleRPA.wait()
pbottleRPA.keyTap('enter')

//确定上传
pbottleRPA.keyTap('enter')


