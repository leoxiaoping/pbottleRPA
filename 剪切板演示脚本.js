/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')



console.log("=== 测试 ===");
console.log(Date());

pbottleRPA.tts('电脑剪切板演示')
pbottleRPA.showMsg('超级剪切板','新版剪切板已经支持获取图片、网页格式内容')
console.log('超级剪切板','新版剪切板已经支持获取图片、网页格式内容')
//延迟5秒
pbottleRPA.wait(5)

pbottleRPA.tts('已经复制文字，赶紧记事本粘贴试试吧')
console.log('已经复制文字，赶紧记事本粘贴试试吧');
pbottleRPA.paste("小瓶RPA官网：https://rpa.pbottle.com/")



//延迟5秒
pbottleRPA.wait(10)
let text = pbottleRPA.getClipboard();
console.log("获取当前剪切板文本：",text);


//
console.log("复制文件模拟操作：")
pbottleRPA.copyFile(__dirname + '/input/RPAlogo128.png')
let filepath = pbottleRPA.getClipboard();
console.log("剪切板文件路径：",filepath);


pbottleRPA.tts('已经复制文件，赶紧桌面粘贴试试吧')
console.log('已经复制文件，赶紧桌面粘贴试试吧');
