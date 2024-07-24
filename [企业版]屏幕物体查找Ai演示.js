/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试开始 ===");
console.log(Date());


console.log('物体识别种类依赖于当前的训练模型');
pbottleRPA.tts('物体识别种类依赖于当前的训练模型')

pbottleRPA.wait(5)

let rs = pbottleRPA.aiObject(0.5,745,291,424,565)
console.log("检测到物体结果：",rs);
