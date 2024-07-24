/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
// console.log(Date());
console.log('屏幕分辨率：',pbottleRPA.getResolution())
//

pbottleRPA.sleep(1000*3)

let start = Date.now()
console.log('屏幕物体轮廓查找结果：',pbottleRPA.findContours(2000))
let end = Date.now();
console.log('查找耗时：（秒）',(end-start)/1000);


pbottleRPA.tts("已经输出 JSON 格式到运行日志")
pbottleRPA.sleep(1000*3);

pbottleRPA.tts("已生成调试参考图片到RPA根目录 debug目录")
pbottleRPA.sleep(1000*3);

console.log("准备结束脚本");
pbottleRPA.tts("准备结束脚本");

//脚本强制退出
pbottleRPA.exit("结束")