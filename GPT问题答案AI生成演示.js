/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */
const pbottleRPA = require('./pbottleRPA')


//开始RPA操作

let asks = [
    '鲁迅为什么要打周树人？',
    '给我随便作一首诗吧',
    '你是谁？',
]


const start =  Date.now()
for (let index = 0; index < asks.length; index++) {
    const ask = asks[index];
    
    pbottleRPA.log(`问题 ${index+1}：`,ask);
    pbottleRPA.tts(ask)

    let rs= pbottleRPA.cloud_GPT(ask,0)
    pbottleRPA.log('云端 AI 生成答案:',rs.content)
    pbottleRPA.log('------------')
    pbottleRPA.log()
}
console.log('答案全部生成耗时（毫秒）：',Date.now()-start);
