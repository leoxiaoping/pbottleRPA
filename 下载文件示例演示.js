/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')
const os = require('os');
const path = require('node:path')


let downlaodPath = path.join(os.homedir(),'Downloads')
// downlaodPath = 'D:\\Users\\Leo\\Downloads'   //修改成自己电脑浏览器默认下载路径
console.log('电脑浏览器默认下载路径，根据自己的情况修改',downlaodPath)



pbottleRPA.openURL('https://pc.weixin.qq.com/')
pbottleRPA.openURL('https://dldir1v6.qq.com/weixin/Windows/WeChatSetup.exe')
pbottleRPA.keyTap('enter')

pbottleRPA.waitFile(downlaodPath,'WeChatSetup.exe',()=>{
    console.log('正在下载...');
},60)
console.log('文件已经下载成功');
pbottleRPA.showMsg('监测下载完成','文件已经下载成功')





