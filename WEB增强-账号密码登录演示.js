/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')

console.log(Date());

console.log("=== ※※※※※※※※※ ===");
console.log("=== 需要安装 小瓶RPA 浏览器插件 ===");
console.log("=== ※※※※※※※※※ ===");


pbottleRPA.tts('必须安装小瓶RPA浏览器增强插件，手动点击确定继续')
pbottleRPA.showMsg('提示：','必须先安装浏览器增强插件')
pbottleRPA.openURL('https://yun.pbottle.com/?from=rpademo')


let ret = pbottleRPA.browserCMD_alert('来自小瓶RPA的问候，手动点击确定开始，20秒超时')
console.log('返回操作结果',ret);
if (ret !== 'ok') {
    console.log('没有检测到小瓶RPA浏览器插件',ret);
    process.exit(1)
}

//点击登录按钮
pbottleRPA.browserCMD_click(`a[role='button']:contains(登录或注册)`)
pbottleRPA.sleep(2000)

pbottleRPA.browserCMD_click(`a[role='button']:contains(用帐号密码登录)`)
pbottleRPA.sleep(1000)


//输入账号密码
pbottleRPA.browserCMD_val(`input[name='uname']`,'test')
pbottleRPA.browserCMD_val(`input[name='pwd']`,'123456')
pbottleRPA.sleep(1000)


//登录按钮
pbottleRPA.browserCMD_click(`button:contains(登录帐号)`)
pbottleRPA.sleep(3000)

pbottleRPA.keyTap('enter')
pbottleRPA.tts('演示结束')