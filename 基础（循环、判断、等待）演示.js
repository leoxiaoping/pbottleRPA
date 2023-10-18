/**
 * 小瓶RPA 基础语法
 * 可以搜索js 循环 ，js判断 等关键词学习JavaScript基本语法
 */
const pbottleRPA = require('./pbottleRPA')


//for 循环 重复操作 10 次 打开网页
for (let index = 0; index < 10; index++) {
    console.log('第' + index + '次操作');

    pbottleRPA.openURL('https://www.baidu.com/') //操作：用默认浏览器打开网页
    pbottleRPA.sleep(500) //等待500毫秒
}


//判断
let number = Math.random() //生成一个 0-1 的随机数  用于判断
if (number < 0.5) {        //用 if 判断数值是否小于 0.5
    console.log('小于 0.5。', number)
} else {
    console.log('大于或等于 0.5。', number)
}


//语音播报
pbottleRPA.tts('流程结束！~')
pbottleRPA.showMsg('小瓶RPA提示','流程结束！~')
