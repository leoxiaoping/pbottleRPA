/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 */

const pbottleRPA = require('./pbottleRPA')

//日志回传
pbottleRPA.delaySet('./[企业版]集群控制中心日志回传.js'); 


//监测是否开通企业版
let bufferRS = pbottleRPA.bufferSet('pbottle',5);
if (bufferRS == '个人版不可用') {
    pbottleRPA.showMsg('个人版不可用','请先开通企业版')
    pbottleRPA.tts('个人版不可用，请先开通企业版')
    pbottleRPA.exit('⚠ 个人版不可用，请先开通企业版')
}


//控制中心配置参数从本地 buffer0 中直接读取
let buffer = pbottleRPA.bufferGet(0) 
console.log('下达任务参数（json格式）：',buffer);

//流程开始
let resolution = pbottleRPA.getResolution()
console.log('当前电脑屏幕分辨率',resolution)

console.log('集群任务执行完成 🎉🎉🎉');


