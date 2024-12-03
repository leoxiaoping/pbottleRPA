/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */
const pbottleRPA = require('./pbottleRPA')


//开始RPA操作

let ask = '描述图片中有什么？'
console.log(ask);

const start =  Date.now()
console.log(pbottleRPA.cloud_GPTV(ask,`./input/RPAlogo128.png`).content)
console.log('图片解析耗时：',Date.now()-start);
