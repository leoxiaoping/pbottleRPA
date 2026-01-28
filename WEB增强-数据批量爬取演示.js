/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了使用Web增强功能批量爬取网页数据
 * 需要安装小瓶RPA浏览器插件来操作网页元素，实现网页数据的自动化抓取
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log(pbottleRPA.getTime());            // 在控制台输出当前格式化时间

console.log("=== ※※※※※※※※※ ===");
console.log("=== 需要安装 小瓶RPA 浏览器插件 ==="); // 提示用户需要安装浏览器插件
console.log("=== ※※※※※※※※※ ===");

// 使用文字转语音功能提示用户必须安装浏览器插件
pbottleRPA.tts('必须安装小瓶RPA浏览器增强插件，5秒后开始爬取网页数据')
// 显示系统消息框再次提醒用户
pbottleRPA.showMsg('提示：','必须先安装浏览器增强插件')

// 等待5秒钟给用户准备时间
pbottleRPA.wait(5)

// 打开小瓶RPA官网用于演示数据爬取
pbottleRPA.openURL('https://rpa.pbottle.com/')
pbottleRPA.browserCMD_waitPageReady('https://rpa.pbottle.com/');  // 等待页面加载完成

// 判断页面是否成功打开，通过检查页面中包含"小瓶RPA"的元素数量
let n_rpa = pbottleRPA.browserCMD_count('span:contains(小瓶RPA)')
console.log('包含 小瓶RPA 元素数量：',n_rpa);  // 输出元素数量到控制台
// 模拟滚动页面，加载更多内容
pbottleRPA.keyTap('page down')               // 向下翻页
pbottleRPA.keyTap('page down')               // 再次向下翻页
pbottleRPA.keyTap('page down')               // 第三次向下翻页

// 开始获取网页上的数据
// 使用CSS选择器获取所有class为'list-group-item'的a标签的文本内容
let rs = pbottleRPA.browserCMD_text('a.list-group-item')
// 检查是否超时（说明插件未安装或网络问题）
if (rs == '20s超时') {
    // 显示错误消息并退出脚本
    pbottleRPA.showMsg('出现错误：','必须先安装浏览器增强插件和联网')
    pbottleRPA.exit()
}
// 将获取到的JSON字符串数据解析为JavaScript对象数组
datas = JSON.parse(rs)

console.log('爬取数据数量：',datas.length);     // 输出爬取到的数据条数
// 使用文字转语音功能播报爬取到的数据数量
pbottleRPA.tts('爬取数据'+ datas.length +'条，请查看日志')
pbottleRPA.wait(4)                           // 等待4秒钟

console.log('=====');                        // 输出分隔线
console.log('数据列表：');                    // 输出提示信息
// 遍历数据数组，处理并输出每条数据
datas.forEach(element => {
    // 去除首尾空格并移除换行符
    element = element.trim().replace(/[\r\n]/g, '');
    console.log(element);                    // 输出处理后的数据
});

// 获取网页元素的href属性值（链接地址）
rs = pbottleRPA.browserCMD_attr('a.list-group-item','href')
// 将获取到的JSON字符串解析为链接数组
datas = JSON.parse(rs)
console.log('====');                         // 输出分隔线
console.log('链接列表：');                    // 输出提示信息
// 遍历链接数组并输出每个链接
datas.forEach(element => {
    console.log(element);                    // 输出链接地址
});

// 使用文字转语音功能播报演示结束
pbottleRPA.tts('演示结束')

pbottleRPA.browserCMD.alert('演示结束，数据已经批量输出到日志中，请查看控制台');