/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的GPT问题答案AI生成功能
 * 通过这个示例，您可以学习如何向云端AI提问并获取答案，实现智能问答功能
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限


// 定义要向AI提问的问题列表
let asks = [
    '鲁迅为什么要打周树人？',                 // 第一个问题：关于鲁迅的幽默问题
    '给我随便作一首诗吧',                     // 第二个问题：要求AI创作诗歌
    '你是谁？',                              // 第三个问题：询问AI身份
]

const start = Date.now()                      // 记录开始时间，用于计算处理所有问题的总耗时

// 使用循环遍历问题列表，逐个向AI提问
for (let index = 0; index < asks.length; index++) { // 遍历问题数组
    const ask = asks[index];                  // 获取当前问题
    
    pbottleRPA.log(`❓️ 问题 ${index+1}：`,ask);   // 将问题序号和内容输出到日志文件中
    pbottleRPA.tts(ask)                       // 使用文字转语音功能播报当前问题

    // 调用云端GPT API获取问题答案
    let rs = pbottleRPA.cloud_GPT(ask,0)      // 向云端AI提问，获取答案
    pbottleRPA.log('云端 AI 生成答案:')        // 在日志中输出提示信息
    pbottleRPA.log(rs.content)                // 将AI生成的答案内容输出到日志文件中
    pbottleRPA.log('------------')            // 输出分隔线
    pbottleRPA.log()                          // 输出空行，美化日志格式
}

// 输出所有问题答案生成的总耗时
console.log('答案全部生成耗时（毫秒）：',Date.now()-start);