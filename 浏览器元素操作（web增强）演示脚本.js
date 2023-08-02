const pbottleRPA = require('./pbottleRPA')

console.log(Date());

console.log("=== ※※※※※※※※※ ===");
console.log("=== 需要安装 小瓶RPA 浏览器插件 ===");
console.log("=== ※※※※※※※※※ ===");

pbottleRPA.tts('浏览器元素操作演示，请打开百度首页网页')
pbottleRPA.tts('必须安装小瓶RPA浏览器增强插件，手动点击确定继续')
pbottleRPA.openURL('https://www.baidu.com/')


let ret = "" //接受返回值
ret = pbottleRPA.browserCMD_alert('来自小瓶RPA的问候，手动点击确定开始，20秒超时')
console.log('返回操作结果',ret);
if (ret !== 'ok') {
    console.log('没有检测到小瓶RPA浏览器插件',ret);
    process.exit(1)
}


//延迟1秒
pbottleRPA.sleep(1000*1)




ret = pbottleRPA.browserCMD_cookie('BAIDUID')
console.log('返回操作结果',ret);
ret = pbottleRPA.browserCMD_cookie('pbottleID',"good",3)
console.log('返回操作结果',ret);

ret = pbottleRPA.browserCMD_css('body',"background-color",'gray')
console.log('返回操作结果',ret);
ret = pbottleRPA.browserCMD_css('body',"background-color")
console.log('返回操作结果',ret);
ret = pbottleRPA.browserCMD_css('body',"background-color",'white')
console.log('返回操作结果',ret);


ret = pbottleRPA.browserCMD_text('title')
console.log('返回操作结果',ret);
pbottleRPA.tts('获取标题 ')
pbottleRPA.sleep(1000*3)


pbottleRPA.tts('设置页面标题 ')
ret = pbottleRPA.browserCMD_text('title','[小瓶RPA]-'+ret)
console.log('返回操作结果',ret);
ret = pbottleRPA.browserCMD_text('title')
console.log('当前页面标题：',ret);
pbottleRPA.sleep(1000*3)


pbottleRPA.tts('输入搜索词 点击搜索按钮 ')
ret = pbottleRPA.browserCMD_val('#kw','小瓶RPA')
console.log('返回点击操作结果',ret);


ret = pbottleRPA.browserCMD_click('#su')
console.log('返回点击操作结果',ret);


pbottleRPA.sleep(1000*3)


pbottleRPA.tts('开始去广告')
for (let index = 0; index < 1; index++) {
    ret = pbottleRPA.browserCMD_remove('#content_left div:first')
    console.log('返回点击操作结果',ret);
    pbottleRPA.sleep(3000)
}


pbottleRPA.tts('打开网站')
pbottleRPA.browserCMD_click('div#content_left a:first')
pbottleRPA.sleep(1500)


pbottleRPA.tts('读取 logo 路径')
ret = pbottleRPA.browserCMD_attr('img:first','src')
console.log('网站logo图片地址',ret);
pbottleRPA.sleep(1500)


pbottleRPA.tts('演示完成准备退出')
pbottleRPA.sleep(10)
console.log("准备结束脚本");
//脚本强制退出
process.exit(1)
console.log("已经退出了，无效");