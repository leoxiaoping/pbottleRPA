/**
 * 小瓶RPA 屏幕物体轮廓示例
 */

const pbottleRPA = require('./pbottleRPA')


console.log("=== 测试 ===");
// console.log(Date());
console.log('屏幕分辨率：',pbottleRPA.getResolution())
//

pbottleRPA.sleep(1000*3)

let start = Date.now()
console.log('屏幕物体查找结果：',pbottleRPA.findContours(2000))
let end = Date.now();
console.log('查找耗时：（秒）',(end-start)/1000);


pbottleRPA.tts("已经输出 JSON 格式到运行日志")
pbottleRPA.sleep(1000*3);

console.log("准备结束脚本");
pbottleRPA.tts("准备结束脚本");

//脚本强制退出
pbottleRPA.exit("结束")