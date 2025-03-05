/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')
const fs = require('fs')



pbottleRPA.tts('打开文件夹')
console.log('打开文件夹');
//延迟5秒
pbottleRPA.sleep(1000*3)
console.log('./input/');
pbottleRPA.openDir( './input/')
pbottleRPA.sleep(1000*2)

pbottleRPA.tts('打开图片')
console.log('打开图片');
pbottleRPA.openfile('./input/RPAlogo128.png')
pbottleRPA.sleep(1000*2)
pbottleRPA.tts('关闭')
pbottleRPA.keyTap('alt+f4')
pbottleRPA.sleep(1000)



pbottleRPA.tts('复制文件')
console.log('复制文件');
fs.copyFileSync('./input/RPAlogo128.png',  './input/RPAlogo128-新复制.png')
pbottleRPA.sleep(1000*3)

pbottleRPA.tts('删除文件')
console.log('删除文件')
fs.unlinkSync( './input/RPAlogo128-新复制.png')

pbottleRPA.tts('演示结束')
console.log('演示结束')
pbottleRPA.showMsg('演示结束','请查看运行日志')