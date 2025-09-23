/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */


const pbottleRPA = require('./pbottleRPA')


console.log("=== 图片相似度检测 ===");
console.log(Date());
pbottleRPA.setDefaultDelay(0); //手动管理操作延时

let dir = __dirname + '/input/';
let path1= dir + 'RPAlogo128.png';
let path2 = dir + 'RPAlogo128.png';

let rs = pbottleRPA.imgSimilar(path1,path2);
console.log('图片相似度检测结果：',rs);