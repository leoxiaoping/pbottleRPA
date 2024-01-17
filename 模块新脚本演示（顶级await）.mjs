/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 * 
 * es模块化新脚本，支持顶级 await
 */
import pbottleRPA from "./pbottleRPA.js";  //必须含 .js 后缀
import path from "path";
import { fileURLToPath } from 'url'


if (process.version<'v18') {
    console.log('当前nodejs版本：',process.version);
    pbottleRPA.tts('请升级nodejs v18 以上版本")')
    pbottleRPA.showMsg('小瓶RPA提示','pbottleRPA.exit("请升级nodejs v18 以上版本")')
    pbottleRPA.sleep(3000)
    pbottleRPA.exit("请升级nodejs v18 以上版本")
}


global.__filename = fileURLToPath(import.meta.url)
global.__dirname = path.dirname(__filename)
console.log('当前文件名：',__filename)
console.log('当前路径：',__dirname)

try {
    console.log('正在请求github.com，请稍后...');
    let res0 = await fetch(`https://github.com/`) //promise 同步
    console.log('github 请求状态:',res0.status);
} catch (error) {
    console.log('github 请求失败状态');
    // console.log(error);
}

console.log('正在请求本地，请稍后...');
let res = await fetch(`http://127.0.0.1:49888/`) //promise 同步
console.log('请求状态:',res.status);
let html = await res.text()
console.log('请求结果:',html);


//语音播报
pbottleRPA.tts('流程结束！~')
console.log('流程结束！~');
pbottleRPA.showMsg('小瓶RPA提示','流程结束！~')
