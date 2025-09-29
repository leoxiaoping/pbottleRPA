/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的文件下载功能
 * 通过自动触发文件下载并监测下载完成状态，实现完整的下载流程自动化
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限
const os = require('os');                     // 引入操作系统模块，用于获取系统信息
const path = require('node:path')             // 引入路径处理模块，用于处理文件路径

// 获取系统默认下载路径（用户主目录下的Downloads文件夹）
let 下载保存路径 = path.join(os.homedir(),'Downloads')
// 下载保存路径 = 'D:\\Users\\Leo\\Downloads'   // 可选：修改成自己电脑浏览器默认下载路径
// 输出下载路径信息到日志，提醒用户根据实际情况修改
pbottleRPA.日志输出('电脑浏览器默认下载路径，根据自己的情况修改',下载保存路径)

// 打开微信官网页面（准备下载微信安装包）
pbottleRPA.打开网址('https://pc.weixin.qq.com/')
// 直接打开微信Windows客户端安装包下载链接
pbottleRPA.打开网址('https://dldir1v6.qq.com/weixin/Windows/WeChatSetup.exe')
// 模拟按下回车键确认下载操作
pbottleRPA.键盘按键('enter')

// 等待指定文件下载完成，超时时间为120秒
// 在等待期间会循环输出"正在下载..."提示信息
pbottleRPA.等待文件(下载保存路径,'WeChatSetup.exe',()=>{
    pbottleRPA.日志输出('正在下载...');       // 等待期间输出下载状态
},120)

// 文件下载完成后输出成功信息到日志
pbottleRPA.日志输出('文件已经下载成功');
// 显示系统消息框提示用户下载已完成
pbottleRPA.showMsg('监测下载完成','文件已经下载成功')