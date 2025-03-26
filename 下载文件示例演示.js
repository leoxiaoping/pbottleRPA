/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')
const os = require('os');
const path = require('node:path')


let 下载保存路径 = path.join(os.homedir(),'Downloads')
// 下载保存路径 = 'D:\\Users\\Leo\\Downloads'   //修改成自己电脑浏览器默认下载路径
pbottleRPA.日志输出('电脑浏览器默认下载路径，根据自己的情况修改',下载保存路径)



pbottleRPA.打开网址('https://pc.weixin.qq.com/')
pbottleRPA.打开网址('https://dldir1v6.qq.com/weixin/Windows/WeChatSetup.exe')
pbottleRPA.键盘按键('enter')

pbottleRPA.等待文件(下载保存路径,'WeChatSetup.exe',()=>{
    pbottleRPA.日志输出('正在下载...');
},120)

pbottleRPA.日志输出('文件已经下载成功');
pbottleRPA.showMsg('监测下载完成','文件已经下载成功')
