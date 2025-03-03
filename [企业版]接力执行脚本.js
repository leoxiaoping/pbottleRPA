/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


//监测是否开通企业版
let bufferRS = pbottleRPA.bufferSet('pbottle');
if (bufferRS == '个人版不可用') {
    pbottleRPA.showMsg('个人版不可用','请先开通企业版')
    pbottleRPA.tts('个人版不可用，请先开通企业版')
    pbottleRPA.exit('⚠ 个人版不可用，请先开通企业版')
}



pbottleRPA.delaySet(__filename)  //自己接力自己

pbottleRPA.log('等待3秒')
pbottleRPA.wait(3)
pbottleRPA.log('完成')
