/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')

console.log('常用工具 pbottleRPA.utils');

// pbottleRPA.utils

//语音播报
pbottleRPA.tts('常用工具 utils 演示')
pbottleRPA.showMsg('小瓶RPA提示','常用工具 utils 演示')
pbottleRPA.wait(2)


//标准格式时间
console.log('时间格式化:getTime');
let timeStr = pbottleRPA.工具箱.获取格式化时间()
console.log('标准格式时间:',timeStr);
console.log('任意格式日期:',pbottleRPA.getTime('Y/m/d'));
pbottleRPA.wait(1)


//随机数
console.log('随机数:uniqid');
console.log(pbottleRPA.utils.uniqid()); // 默认前缀和时间戳，可能没有额外的随机性  
console.log(pbottleRPA.utils.uniqid('myPrefix_')); // 使用自定义前缀  
console.log(pbottleRPA.utils.uniqid('', true)); // 带有额外随机性的唯一ID，默认只是毫秒级的
pbottleRPA.wait(1)


//数字字符串检测
console.log('检测变量是否为数字化：isNumeric');
console.log(pbottleRPA.utils.isNumeric(10)); // true
console.log(pbottleRPA.utils.isNumeric("10")); // true
console.log(pbottleRPA.utils.isNumeric("10.5")); // true
console.log(pbottleRPA.utils.isNumeric("abc")); // false
console.log(pbottleRPA.utils.isNumeric(null)); // false
console.log(pbottleRPA.utils.isNumeric(NaN)); // false
pbottleRPA.wait(1)


//变量是否包含数据
console.log('变量是否包含数据测试：hasData');
console.log(pbottleRPA.hasData());  // false
console.log(pbottleRPA.hasData([])); // false
console.log(pbottleRPA.hasData({}));  // false
console.log(pbottleRPA.hasData(0));  // false
console.log(pbottleRPA.hasData(Number("abc")));  // false
console.log(pbottleRPA.hasData(""));  // false
console.log(pbottleRPA.hasData('   '));  // false
console.log(pbottleRPA.hasData(false));  // false
console.log(pbottleRPA.hasData(null));  // false
console.log(pbottleRPA.hasData(undefined));  // false
console.log(pbottleRPA.hasData(0n));  // false
console.log('--------------------------');
console.log(pbottleRPA.hasData(800n)); // true
console.log(pbottleRPA.hasData(3.14)); // true
console.log(pbottleRPA.hasData('小瓶RPA ')); // true
console.log(pbottleRPA.hasData([12,5])); // true
console.log(pbottleRPA.hasData({"pbottleRPA":666})); // true
pbottleRPA.wait(1)


//模拟资源管理器的文件搜索
console.log('模拟资源管理器的文件搜索:searchFile');
let rs = pbottleRPA.utils.searchFile(__dirname,'.png')  
console.log('当前目录搜索.png文件',rs);