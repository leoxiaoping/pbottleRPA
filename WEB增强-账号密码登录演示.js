/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了使用Web增强功能实现网站自动登录
 * 需要安装小瓶RPA浏览器插件来操作网页元素，实现完整的登录流程自动化
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

console.log(Date());                          // 在控制台输出当前日期时间

console.log("=== ※※※※※※※※※ ===");
console.log("=== 需要安装 小瓶RPA 浏览器插件 ==="); // 提示用户需要安装浏览器插件
console.log("=== ※※※※※※※※※ ===");

// 使用文字转语音功能提示用户必须安装浏览器插件
pbottleRPA.tts('必须安装小瓶RPA浏览器增强插件，手动点击确定继续')
// 显示系统消息框再次提醒用户
pbottleRPA.showMsg('提示：','必须先安装浏览器增强插件')
// 打开指定网址用于演示登录操作
pbottleRPA.openURL('https://yun.pbottle.com/?from=rpademo')

// 使用浏览器命令显示弹窗，等待用户手动确认（20秒超时）
let ret = pbottleRPA.browserCMD_alert('来自小瓶RPA的问候，手动点击确定开始，20秒超时')
console.log('返回操作结果',ret);              // 输出操作结果到控制台

// 检查浏览器插件是否正常工作
if (ret !== 'ok') {
    console.log('没有检测到小瓶RPA浏览器插件',ret); // 如果未检测到插件，输出错误信息
    process.exit(1)                           // 退出脚本
}

// 点击页面上的"登录或注册"链接
pbottleRPA.browserCMD_click(`a[role='button']:contains(登录或注册)`)
pbottleRPA.wait(2)                            // 等待2秒钟

// 点击"登录"按钮
pbottleRPA.browserCMD_click(`a[role='button']:contains(登录)`)
pbottleRPA.wait()                             // 等待默认时间

// 输入账号密码
// 点击用户名输入框
pbottleRPA.browserCMD_click(`input[name='uname']`)
// 在用户名输入框中输入用户名'test'
pbottleRPA.browserCMD_val(`input[name='uname']`,'test')

// 点击密码输入框
pbottleRPA.browserCMD_click(`input[name='pwd']`)
// 在密码输入框中输入密码'123456'
pbottleRPA.browserCMD_val(`input[name='pwd']`,'123456')
pbottleRPA.wait()                             // 等待默认时间

// 点击登录按钮
pbottleRPA.browserCMD_click(`button:contains(登录帐号)`)
pbottleRPA.wait(3)                            // 等待3秒钟

// 模拟按下回车键确认登录
pbottleRPA.keyTap('enter')
// 使用文字转语音功能播报演示结束
pbottleRPA.tts('演示结束')