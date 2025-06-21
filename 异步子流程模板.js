const pbottleRPA = require('./pbottleRPA.js')



//集中注册全局变量，其他地方使用不用 global.
global.global_processName = '小瓶RPA——XXXX流程模板'   
global.global_startTime = pbottleRPA.utils.getTime()

//主流程指令序列化
async function main() {

    pbottleRPA.log("主流程开始 📍",global_startTime,global_processName)  //开始


    console.log('启动子流程  同步子流程'); 
    require('./快速开始演示（3行代码）.js')  //只有顶层代码的同步子流程

    
    console.log('启动异步子流程 test.js');
    let rs = await require('./test.js')('https://rpa.pbottle.com')  //子流程的输入和输出
    console.log('子流程返回结果：',rs);


    // await process1() //有错误
    pbottleRPA.log("主流程完成 ✅️")  //结束
}

main().catch((e)=>{  //主流程错误捕获
    console.log('❌ 未完成，错误',e);
    console.log('准备发送消息给管理员 👉');
})



//test.js 文件
// module.exports = async (url) => {
//     console.log('子流程开始')
//     const res = await fetch(url)
//     pbottleRPA.log('网络请求完成！~',res.ok,res.url)
//     console.log('子流程结束')
//     return true
// }