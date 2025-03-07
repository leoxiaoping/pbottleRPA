const pbottleRPA = require('./pbottleRPA');


//全局变量格式
let global_processName = '小瓶RPA——XXXX流程模板'
let global_startTime = pbottleRPA.utils.getTime()

//主流程指令序列化
async function main(params) {

    pbottleRPA.log("主流程开始 📍",global_startTime,global_processName)  //开始

    await process1() //有错误
    pbottleRPA.log(Date.now())
    pbottleRPA.wait(5)
    pbottleRPA.log(Date.now())

    pbottleRPA.log("主流程完成 ✅️")  //结束

}
main().catch((e)=>{  //主流程错误捕获

    console.log('❌ 未完成，错误',e);
    console.log('准备发送消息给管理员 👉');
})



//子流程
async function process1(params) {
    fs.readSync('555')
}