/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
console.log(Date());


//设备号
let deviceID = pbottleRPA.deviceID();
console.log('设备号：',deviceID);
if (deviceID == '个人版不可用') {
    console.log('个人版不可用，请先开通企业版');
    pbottleRPA.showMsg('个人版不可用','请先开通企业版')
    pbottleRPA.tts('个人版不可用，请先开通企业版')
    pbottleRPA.exit('个人版不可用，请先开通企业版')
}


/**
 * buffers
 */
pbottleRPA.sleep(200)
for (let index = 0; index < 10; index++) {
    let content = "我是 +=<& buffer"+index
    pbottleRPA.bufferSet(content,index)
}

pbottleRPA.sleep(200)
for (let index = 0; index < 10; index++) {
    console.log('buffer'+ index + ' 内容：', pbottleRPA.bufferGet(index));
}

let other = '其他内容'
let myJson = {
    name:'小瓶RPA',
    webSite:'https://rpa.pbottle.com/',
    version:2,
    app:['pc','web','mobile'],
    other,
}

pbottleRPA.bufferSet(myJson) //默认buffer0
console.log('获取buffer: ',pbottleRPA.bufferGet());


/**
 * 启停
 */
let path=__filename;
console.log(path);
let url = 'http://127.0.0.1:49888/?action=pbottleRPA_run&path='+encodeURIComponent(path)
console.log(url);
fetch(url).then((rs)=>{
    console.log(rs.status);
    return rs.text()
}).then((txt)=>{
    console.log('启动结果：',txt);
}).catch((error)=>{
    console.log(error);
})



setTimeout(()=>{
    //外部停止
    let urlStop = 'http://127.0.0.1:49888/?action=pbottleRPA_stop'
    fetch(urlStop)
},3000)