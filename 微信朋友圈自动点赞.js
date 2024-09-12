/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */
const pbottleRPA = require('./pbottleRPA')


pbottleRPA.显示系统消息('流程已开始运行','请打开电脑声音，关注运行日志信息')
pbottleRPA.文字转语音('准备开始运行朋友圈批量点赞脚本，请先登录微信')
pbottleRPA.等待(7)


let 屏幕分辨率 = pbottleRPA.获取屏幕分辨率()
console.log('当前电脑屏幕分辨率',屏幕分辨率)
if (屏幕分辨率.ratio !==1) {
    pbottleRPA.文字转语音('错误：此demo只适配无缩放屏幕')
    console.log('错误：此demo只适配无缩放屏幕');
    pbottleRPA.等待(6)
    pbottleRPA.退出流程()
}


let 颜色1 = pbottleRPA.获取屏幕颜色(1,屏幕分辨率.h - 1); 
console.log('系统任务栏色：',颜色1);


//打开微信界面
pbottleRPA.键盘按键('ctrl+alt+w')


//输入路径中不要有自定义中文  
let position =  pbottleRPA.等待图像出现('./input/pengYouQuanDianZan/0.png',()=>{
    console.log('等待中，请先打开电脑版微信界面');
},120)


//打开微信朋友圈
pbottleRPA.鼠标移动并点击(position.x,position.y);
pbottleRPA.鼠标移动(1920/2,1080/2);


let 计数器 = 0;
function 重复() {
    console.log('进入开始：')
    let 结果 =  pbottleRPA.寻找图像('./input/pengYouQuanDianZan/1.png',0.99,100,100)
    if (结果 === false) {
        console.log('下一页')
        pbottleRPA.鼠标滚轮()
        pbottleRPA.等待(0.5)
        重复()
    }else{
        pbottleRPA.鼠标移动并点击(结果.x,结果.y);
        pbottleRPA.等待(0.1)
        pbottleRPA.鼠标移动并点击(结果.x-167,结果.y);
        计数器 += 1
        if (计数器 >= 1000) {
            pbottleRPA.退出流程('点1000个赞就行了，不要贪杯！~')
        }
        pbottleRPA.等待(0.1)
        重复()
    }
}
重复()
