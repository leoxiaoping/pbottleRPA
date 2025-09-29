/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 */

const pbottleRPA = require('./pbottleRPA')

//日志回传
pbottleRPA.delaySet('./[企业版]集群控制中心日志回传.js'); 

const serverURL = pbottleRPA.clusterCenter();

let rs = pbottleRPA.getHtml(serverURL+'?action=update');
rsJson = JSON.parse(rs);
console.log('远程服务器返回：',rsJson);

const fileURL = serverURL.replace('/api/query','')+ rsJson.fileID
pbottleRPA.downloadFile(fileURL,'./newVersion.zip')
pbottleRPA.wait()

let destPath = pbottleRPA.path.resolve(__dirname + `/../${rsJson.version}`)
pbottleRPA.log('新工作空间：',destPath)
pbottleRPA.fs.mkdirSync(destPath, { recursive: true })
pbottleRPA.wait()
pbottleRPA.unZip('./newVersion.zip', destPath);
pbottleRPA.wait()
pbottleRPA.log('新版本下载并解压完成');

// 回传更新完成状态
rs = pbottleRPA.postJson(serverURL+'?action=updateFinish',{
    deviceId: pbottleRPA.deviceID(),
    version: rsJson.version,
    workDir: destPath.replaceAll('\\','/')+'/',
})
pbottleRPA.log('远程服务器返回：',rs);

