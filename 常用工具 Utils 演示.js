/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')

console.log('常用工具 pbottleRPA.utils');

// pbottleRPA.utils

//语音播报
pbottleRPA.tts('常用工具 utils 演示')
pbottleRPA.showMsg('小瓶RPA提示','常用工具 utils 演示')
pbottleRPA.sleep(2000)


//标准格式时间
let timeStr = pbottleRPA.utils.getTime()  
console.log('标准格式时间:',timeStr);
pbottleRPA.sleep(1000)


//数字字符串检测
console.log('检测变量是否为数字或数字字符串：',pbottleRPA.utils.isNumeric("3.14")); 
pbottleRPA.sleep(1000)


//模拟资源管理器的文件搜索
let rs = pbottleRPA.utils.searchFile(__dirname,'.png')  
console.log('当前目录搜索.png文件',rs);