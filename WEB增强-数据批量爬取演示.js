/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')

console.log(pbottleRPA.getTime());

console.log("=== ※※※※※※※※※ ===");
console.log("=== 需要安装 小瓶RPA 浏览器插件 ===");
console.log("=== ※※※※※※※※※ ===");


pbottleRPA.tts('必须安装小瓶RPA浏览器增强插件，5秒后开始爬取网页数据')
pbottleRPA.showMsg('提示：','必须先安装浏览器增强插件')


//打开被获取数据的网页
pbottleRPA.sleep(5*1000)
pbottleRPA.openURL('https://rpa.pbottle.com/')



//判断打开页面
let n_rpa = pbottleRPA.browserCMD_count('span:contains(小瓶RPA)')
console.log('元素数量：',n_rpa);
pbottleRPA.keyTap('page down')
pbottleRPA.keyTap('page down')
pbottleRPA.keyTap('page down')




//开始获取网页上的数据
let rs = pbottleRPA.browserCMD_text('a.list-group-item')
if (rs == '20s超时') {
    pbottleRPA.showMsg('出现错误：','必须先安装浏览器增强插件和联网')
    pbottleRPA.exit()
}
datas =  JSON.parse(rs)

console.log('爬取数据数量：',datas.length);
pbottleRPA.tts('爬取数据'+ datas.length +'条，请查看日志')
pbottleRPA.sleep(1000*4)

console.log('数据列表：');
datas.forEach(element => {
    element = element.trim().replace(/[\r\n]/g, '');
    console.log(element);
});


pbottleRPA.tts('演示结束')