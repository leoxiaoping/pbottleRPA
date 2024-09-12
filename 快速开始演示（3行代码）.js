/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */
const pbottleRPA = require('./pbottleRPA')


//开始RPA操作
pbottleRPA.打开网址('https://www.baidu.com/')
pbottleRPA.粘贴输入('小瓶RPA官网')
pbottleRPA.键盘按键('enter')