/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的常用工具函数（utils）
 * 通过这个示例，您可以学习如何使用pbottleRPA.utils提供的各种实用工具函数
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log('常用工具 pbottleRPA.utils');      // 在控制台输出工具类名称

// pbottleRPA.utils

// 语音播报演示
pbottleRPA.tts('常用工具 utils 演示')         // 使用文字转语音功能播报演示开始
// 显示系统消息框提示用户
pbottleRPA.showMsg('小瓶RPA提示','常用工具 utils 演示') 
pbottleRPA.wait(2)                            // 等待2秒钟

// 标准格式时间演示
console.log('时间格式化:getTime');            // 在控制台输出当前演示功能
// 使用工具箱中的获取格式化时间函数获取当前时间
let timeStr = pbottleRPA.工具箱.获取格式化时间() 
console.log('标准格式时间:',timeStr);          // 输出标准格式的时间字符串
// 获取自定义格式的日期（年/月/日格式）
console.log('任意格式日期:',pbottleRPA.getTime('Y/m/d')); 
pbottleRPA.wait(1)                            // 等待1秒钟

// 随机数生成演示
console.log('随机数:uniqid');                 // 在控制台输出当前演示功能
// 生成默认格式的唯一ID（基于时间戳）
console.log(pbottleRPA.utils.uniqid());      
// 生成带自定义前缀的唯一ID
console.log(pbottleRPA.utils.uniqid('myPrefix_')); 
// 生成带额外随机性的唯一ID
console.log(pbottleRPA.utils.uniqid('', true)); 
pbottleRPA.wait(1)                            // 等待1秒钟

// 数字字符串检测演示
console.log('检测变量是否为数字化：isNumeric'); // 在控制台输出当前演示功能
// 检测各种类型数据是否为数字
console.log(pbottleRPA.utils.isNumeric(10));       // 检测整数：true
console.log(pbottleRPA.utils.isNumeric("10"));     // 检测数字字符串：true
console.log(pbottleRPA.utils.isNumeric("10.5"));   // 检测小数字符串：true
console.log(pbottleRPA.utils.isNumeric("abc"));    // 检测非数字字符串：false
console.log(pbottleRPA.utils.isNumeric(null));     // 检测null：false
console.log(pbottleRPA.utils.isNumeric(NaN));      // 检测NaN：false
pbottleRPA.wait(1)                            // 等待1秒钟

// 变量是否包含数据检测演示
console.log('变量是否包含数据测试：hasData');   // 在控制台输出当前演示功能
// 检测各种类型数据是否包含有效数据
console.log(pbottleRPA.hasData());             // 检测无参数：false
console.log(pbottleRPA.hasData([]));           // 检测空数组：false
console.log(pbottleRPA.hasData({}));           // 检测空对象：false
console.log(pbottleRPA.hasData(0));            // 检测数字0：false
console.log(pbottleRPA.hasData(Number("abc"))); // 检测NaN：false
console.log(pbottleRPA.hasData(""));           // 检测空字符串：false
console.log(pbottleRPA.hasData('   '));        // 检测空格字符串：false
console.log(pbottleRPA.hasData(false));        // 检测布尔值false：false
console.log(pbottleRPA.hasData(null));         // 检测null：false
console.log(pbottleRPA.hasData(undefined));    // 检测undefined：false
console.log(pbottleRPA.hasData(0n));           // 检测BigInt 0：false
console.log('--------------------------');     // 输出分隔线
console.log(pbottleRPA.hasData(800n));         // 检测非零BigInt：true
console.log(pbottleRPA.hasData(3.14));         // 检测非零小数：true
console.log(pbottleRPA.hasData('小瓶RPA '));    // 检测非空字符串：true
console.log(pbottleRPA.hasData([12,5]));       // 检测非空数组：true
console.log(pbottleRPA.hasData({"pbottleRPA":666})); // 检测非空对象：true
pbottleRPA.wait(1)                            // 等待1秒钟

// 文本截取演示
// 定义要处理的字符串
let str = "小瓶RPA官网是 https://www.pbottle.com 输入浏览器即可访问官网" 
pbottleRPA.log('文本截取测试',str)             // 将原始字符串输出到日志
// 从字符串中截取指定标记之间的内容（从"官网是"到"输入"之间的内容）
let sub_str = pbottleRPA.utils.substringFromTo(str,'官网是','输入') 
pbottleRPA.log(sub_str)                       // 将截取结果输出到日志

// 模拟资源管理器的文件搜索演示
console.log('模拟资源管理器的文件搜索:searchFile'); // 在控制台输出当前演示功能
// 在指定目录中搜索指定扩展名的文件
let rs = pbottleRPA.utils.searchFile('./','.png',true) // 在当前目录搜索.png文件，包含子目录
console.log('当前目录搜索.png文件',rs);         // 输出搜索结果