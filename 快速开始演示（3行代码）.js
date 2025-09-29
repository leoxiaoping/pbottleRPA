/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：这是一个最基础的小瓶RPA JavaScript脚本示例，展示了如何使用RPA完成一个简单的百度搜索流程
 * 此脚本会打开百度网站，在搜索框中输入"小瓶RPA官网"，然后按回车键执行搜索
 */
const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限



pbottleRPA.打开网址('https://www.baidu.com/')  
pbottleRPA.粘贴输入('小瓶RPA官网')              
pbottleRPA.键盘按键('enter')                   