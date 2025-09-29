/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 */

const pbottleRPA = require('./pbottleRPA')



const serverURL = pbottleRPA.clusterCenter();
console.log('集群控制中心地址:',serverURL);


const localLogURL = 'http://127.0.0.1:49888/?action=pbottleRPA_lastLog2'

const deviceId = pbottleRPA.deviceID()
const buffer0 = pbottleRPA.bufferGet(0)

// 获取taskId
let taskId;
try {
   taskId = JSON.parse(buffer0)._taskInfo.id
} catch (error) {
    pbottleRPA.exit('⚠ 未获取到taskId，日志回传终止')
}


// 获取本地运行日志
const content = pbottleRPA.getHtml(localLogURL)

console.log('本地日志长度：',content.length)
console.log('deviceId:',deviceId);
console.log("taskId:",taskId);


// 远程传输日志
fetch(serverURL+'?action=postLog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        deviceId,
        taskId,
        content
    })
})
.then(res => res.text()).then(text => console.log('日志回传结果：',text))

