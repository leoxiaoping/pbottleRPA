/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


let deviceID = pbottleRPA.deviceID();
console.log('设备号：',deviceID);
if (deviceID == '个人版不可用') {
    console.log('个人版不可用，请先开通企业版');
    pbottleRPA.showMsg('个人版不可用','请先开通企业版')
    pbottleRPA.tts('个人版不可用，请先开通企业版')
    pbottleRPA.exit('个人版不可用，请先开通企业版')
}


//控制中心配置参数从本地 buffer0 中直接读取
let buffer = pbottleRPA.bufferGet(0) 
console.log('控制中心任务参数（json格式）：',JSON.parse(buffer));

//流程开始
let resolution = pbottleRPA.getResolution()
console.log('当前电脑屏幕分辨率',resolution)

