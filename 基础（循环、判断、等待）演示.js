/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


pbottleRPA.文字转语音('等待3秒开始')
pbottleRPA.日志输出('等待3秒开始');
pbottleRPA.等待(3)


//for 循环 重复操作 10 次 打开网页
for (let index = 0; index < 10; index++) {
    let 计数器 = index+1
    pbottleRPA.日志输出('第' + 计数器 + '次操作'); //输出到日志，文件日志永久保存
    pbottleRPA.打开网址('https://www.baidu.com/s?wd='+计数器) //操作：用默认浏览器打开网页
    pbottleRPA.等待(0.5)
}



//判断
let 随机数 = Math.random()
if (随机数 < 0.5) {        //用 if 判断数值是否小于 0.5
    pbottleRPA.日志输出('小于 0.5。', 随机数)
    pbottleRPA.文字转语音('小于 0.5')
} else {
    pbottleRPA.日志输出('大于或等于 0.5。', 随机数)
    pbottleRPA.文字转语音('大于等于 0.5。')
}
pbottleRPA.等待(3)


//语音播报
pbottleRPA.文字转语音('流程结束！~')
pbottleRPA.显示系统消息('小瓶RPA提示','流程结束！~')