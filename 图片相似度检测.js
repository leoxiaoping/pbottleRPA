/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的图片相似度检测功能
 * 通过这个示例，您可以学习如何比较两张图片的相似度，这在自动化测试和图像验证场景中非常有用
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log("=== 图片相似度检测 ===");          // 在控制台输出测试标题
console.log(Date());                          // 在控制台输出当前日期时间
pbottleRPA.setDefaultDelay(0);                // 设置默认操作延时为0，手动管理所有操作延时

let dir = __dirname + '/input/';              // 定义图片文件所在目录路径，__dirname表示当前脚本所在的目录
let path1 = dir + 'RPAlogo128.png';           // 定义第一张图片的完整路径
let path2 = dir + 'RPAlogo128.png';           // 定义第二张图片的完整路径（这里是同一张图片）

// 使用imgSimilar函数比较两张图片的相似度
let rs = pbottleRPA.imgSimilar(path1,path2);  // 调用图片相似度检测API，传入两张图片的路径进行比较
console.log('图片相似度检测结果：',rs);         // 在控制台输出图片相似度检测结果，值越接近1表示越相似

pbottleRPA.showMsg('图片相似度检测结果：',JSON.stringify(rs));  //系统消息提示