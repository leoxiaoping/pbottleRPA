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

pbottleRPA.tts('正在识别您的电脑屏幕左上角区域文字')
//延迟5秒
pbottleRPA.wait(5)

let start = Date.now()
console.log('屏幕orc结果：',pbottleRPA.aiOcr('screen',10,10,500,500))
let end = Date.now();
console.log('OCR耗时：（秒）',(end-start)/1000);


pbottleRPA.tts("已经输出 JSON 格式到运行日志")
pbottleRPA.wait(5);



//点击桌面微信
console.log("查找并点击微信")
pbottleRPA.tts("查找并点击微信")
let position = pbottleRPA.findText('微信',10,10,1000,500)
console.log('查找文字结果：',position);
if (position) {
    pbottleRPA.moveAndClick(position.x,position.y)
}else{
    console.log("范围内没有找到文字：微信");
}


console.log("准备结束脚本");
pbottleRPA.tts("准备结束脚本");

//脚本强制退出
pbottleRPA.showMsg('演示结束','请查看运行日志')
pbottleRPA.exit("结束")