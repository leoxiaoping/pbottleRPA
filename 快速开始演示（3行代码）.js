/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


pbottleRPA.openURL('https://www.baidu.com/') // 用浏览器打开百度
pbottleRPA.paste('小瓶RPA官网')  //输入搜索词
pbottleRPA.keyTap('enter')  //确认搜索