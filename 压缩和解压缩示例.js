/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */
const pbottleRPA = require('./pbottleRPA')
const fs = require("fs");


pbottleRPA.log('压缩文件测试')
pbottleRPA.zipDir(pbottleRPA.__dirname+'/input',pbottleRPA.__dirname+'/目标压缩包.zip')
pbottleRPA.wait(2)


console.log('监测压缩结果');
if (!fs.existsSync(pbottleRPA.__dirname+'/目标压缩包.zip')) {
    pbottleRPA.exit('未检测到，退出！~')
}


console.log('解压文件测试')
pbottleRPA.unZip(pbottleRPA.__dirname+'/目标压缩包.zip',pbottleRPA.__dirname+'/解压目录/')


console.log('压缩测试完成：正在打开目录');
pbottleRPA.openDir(pbottleRPA.__dirname)


