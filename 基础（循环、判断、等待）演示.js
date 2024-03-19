/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


//for 循环 重复操作 10 次 打开网页
for (let index = 0; index < 10; index++) {
    let number = index+1
    console.log('第' + number + '次操作'); //输出到日志，文件日志永久保存
    pbottleRPA.openURL('https://www.baidu.com/s?wd='+number) //操作：用默认浏览器打开网页
    pbottleRPA.sleep(500) //等待500毫秒
}


//判断
let number = Math.random() //生成一个 0-1 的随机数  用于判断
if (number < 0.5) {        //用 if 判断数值是否小于 0.5
    console.log('小于 0.5。', number)
    pbottleRPA.tts('小于 0.5')
} else {
    console.log('大于或等于 0.5。', number)
    pbottleRPA.tts('大于等于 0.5。')
}
pbottleRPA.sleep(1000)


//语音播报
pbottleRPA.tts('流程结束！~')
pbottleRPA.showMsg('小瓶RPA提示','流程结束！~')
