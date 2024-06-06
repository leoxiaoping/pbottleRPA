/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 * 
 * es模块化新脚本(.mjs)，支持顶级 await 处理 promise 异步
 * 注意：所有异步方法（async 返回 promise），都用 await 以形成顺序执行的流程
 */
import pbottleRPA from "./pbottleRPA.js";  //必须含 .js 后缀
import path from "path";
import { fileURLToPath } from 'url'


if (process.version<'v18') {
    console.log('当前nodejs版本：',process.version);
    pbottleRPA.tts('请升级nodejs v18 以上版本")')
    pbottleRPA.showMsg('小瓶RPA提示','请升级nodejs v18 以上版本')
    pbottleRPA.sleep(3000)
    pbottleRPA.exit("请升级nodejs v18 以上版本")
}


global.__filename = fileURLToPath(import.meta.url)
global.__dirname = path.dirname(__filename)  //pbottleRPA.__dirname 也可以
console.log('当前文件名：',__filename)
console.log('当前路径：',__dirname)


try {
    pbottleRPA.sleep(500)
    console.log('正在请求github.com，请稍后...');
    let res0 = await fetch(`https://github.com/`) //promise 同步
    console.log('github 请求状态:',res0.status);
} catch (error) {
    console.log('github 请求失败状态');
    // console.log(error);
}

pbottleRPA.sleep(500)
console.log('正在请求本地，请稍后...');
let res = await fetch(`http://127.0.0.1:49888/`) //promise 同步
console.log('请求状态:',res.status);
let html = await res.text()
console.log('请求结果:',html);


//语音播报
pbottleRPA.tts('演示流程结束！~')
console.log('演示流程结束！~')
pbottleRPA.showMsg('小瓶RPA提示','演示流程结束！~')