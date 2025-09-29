/**
 * 小瓶RPA异步子流程模板
 * 
 * 功能说明：此脚本演示了RPA中如何使用异步子流程
 * 通过这个示例，您可以学习如何在主流程中调用同步和异步子流程，并处理子流程的返回结果
 */

// 引入小瓶RPA的核心库，获得对RPA功能的访问权限
const pbottleRPA = require('./pbottleRPA.js')

// 集中注册全局变量，其他地方使用不用加 global 前缀
global.global_processName = '小瓶RPA——XXXX流程模板'   // 定义全局流程名称变量
global.global_startTime = pbottleRPA.utils.getTime()   // 获取并定义全局开始时间变量

// 主流程函数，使用async关键字支持异步操作，使所有子流程序列化
async function main() {

    // 在日志中记录主流程开始信息，包括开始时间和流程名称
    pbottleRPA.log("主流程开始 📍",global_startTime,global_processName)

    await 子流程2('输入参数2');

    console.log('启动子流程  同步子流程'); 
    // 通过require直接执行同步子流程（只包含顶层代码的脚本）
    require('./快速开始演示（3行代码）.js')

    console.log('启动异步子流程 test.js');
    // 调用异步子流程，等待其执行完成并获取返回结果
    // 使用await关键字等待异步操作完成
    let rs = await require('./test.js')('https://rpa.pbottle.com')  // 传递参数给子流程
    console.log('子流程返回结果：',rs);  // 输出子流程返回的结果

    // await process1() //有错误（被注释掉的错误示例）
    pbottleRPA.log("主流程完成 ✅️")  // 在日志中记录主流程完成信息
}

// 执行主流程函数，并捕获可能发生的错误
main().catch((e)=>{  // 主流程错误捕获
    console.log('❌ 未完成，错误',e);  // 输出错误信息
    console.log('准备发送消息给管理员 👉');  // 输出后续处理信息
})

// test.js 文件内容说明（子流程）:
// module.exports = async (url) => {  
//     console.log('子流程开始')  
//     const res = await fetch(url) 
//     pbottleRPA.log('网络请求完成！~',res.ok,res.url)
//     console.log('子流程结束')  
//     return true 
// }


async function 子流程2(params) {  // 定义一个内联的异步函数作为子流程，接收参数，子流程推荐使用中文命名
    console.log('子流程2开始',params);
}