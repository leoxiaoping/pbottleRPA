/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了使用Web增强功能操作浏览器元素的各种方法
 * 包括网址跳转、文本获取、Cookie操作、CSS样式修改、元素值设置、点击操作等
 * 需要安装小瓶RPA浏览器插件来实现这些功能
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
// 打开百度网站用于演示浏览器操作
pbottleRPA.openURL('https://www.baidu.com/')

// 定义变量用于接收浏览器命令的返回值
let ret = ""
// 使用浏览器命令显示弹窗，等待用户手动确认（20秒超时）
ret = pbottleRPA.browserCMD_alert('来自小瓶RPA的问候，手动点击确定开始，20秒超时')
console.log('返回操作结果 alert',ret);        // 输出操作结果到控制台

// 检查浏览器插件是否正常工作
if (ret !== 'ok') {
    console.log('没有检测到小瓶RPA浏览器插件',ret); // 如果未检测到插件，输出错误信息
    process.exit(1)                           // 退出脚本
}

pbottleRPA.wait(1)                            // 等待1秒钟
pbottleRPA.tts("跳转新网址：")                 // 语音播报即将执行的操作
// 使用浏览器命令跳转到新的网址
pbottleRPA.browserCMD_url('https://www.baidu.com/?from=pbottleRPA')
pbottleRPA.wait(2)                            // 等待2秒钟

// 获取指定元素的文本内容（页面标题）
ret = pbottleRPA.browserCMD_text('span.title-content-title')
console.log('返回操作结果【一次多个】',ret);    // 输出获取到的文本内容

// Cookie操作演示
ret = pbottleRPA.browserCMD_cookie('BAIDUID') // 获取指定名称的Cookie值
console.log('返回操作结果 cookieGet',ret);     // 输出获取到的Cookie值
// 设置Cookie值
ret = pbottleRPA.browserCMD_cookie('pbottleID',"good",3) 
console.log('返回操作结果 cookieSet',ret);     // 输出设置Cookie的结果

// CSS样式操作演示 - 变换背景色
pbottleRPA.tts('变换背景色')                  // 语音播报即将执行的操作
// 设置body元素的背景色为蓝色
ret = pbottleRPA.browserCMD_css('body',"background-color",'blue')
console.log('返回操作结果 cssSet',ret);       // 输出设置结果
// 获取body元素的背景色值
ret = pbottleRPA.browserCMD_css('body',"background-color")
console.log('返回操作结果【颜色值】',ret);      // 输出获取到的颜色值
// 将body元素的背景色重新设置为白色
ret = pbottleRPA.browserCMD_css('body',"background-color",'white')
console.log('返回操作结果 cssSet',ret);       // 输出设置结果

// 文本内容操作演示
ret = pbottleRPA.browserCMD_text('title')     // 获取页面标题文本
console.log('返回操作结果 textGet',ret);      // 输出获取到的标题文本
pbottleRPA.tts('获取标题 ')                   // 语音播报操作内容
pbottleRPA.wait(3)                            // 等待3秒钟

// 设置页面标题演示
pbottleRPA.tts('设置页面标题 ')               // 语音播报即将执行的操作
// 设置新的页面标题，加上前缀"[小瓶RPA]-"
ret = pbottleRPA.browserCMD_text('title','[小瓶RPA]-'+ret)
console.log('返回操作结果 textSet',ret);      // 输出设置结果
ret = pbottleRPA.browserCMD_text('title')     // 重新获取页面标题
console.log('当前页面标题：',ret);             // 输出当前页面标题
pbottleRPA.wait(3)                            // 等待3秒钟

// 搜索操作演示
pbottleRPA.tts('输入搜索词 点击搜索按钮 ')     // 语音播报即将执行的操作
// 在搜索框中输入搜索词"小瓶RPA"
pbottleRPA.paste('小瓶RPA官网')   // 输出输入操作结果

// 点击搜索按钮
ret = pbottleRPA.browserCMD_click('#su')      // 点击百度搜索按钮
console.log('返回点击操作结果 click',ret);     // 输出点击操作结果
pbottleRPA.wait(3)                            // 等待3秒钟

// 获取当前网址演示
pbottleRPA.tts('获取当前网址：')              // 语音播报即将执行的操作
ret = pbottleRPA.browserCMD_url()             // 获取当前页面URL
console.log('获取当前网址：',ret);             // 输出当前网址
pbottleRPA.wait(2)                            // 等待2秒钟

// 去广告操作演示
pbottleRPA.tts('开始去广告')                  // 语音播报即将执行的操作
// 循环执行去广告操作（示例中只执行1次）
for (let index = 0; index < 1; index++) {
    // 移除指定的广告元素
    ret = pbottleRPA.browserCMD_remove('#content_left div:first')
    console.log('返回点击操作结果 remove',ret); // 输出移除操作结果
    pbottleRPA.wait(3)                        // 等待3秒钟
}

// 打开网站链接演示
pbottleRPA.tts('打开网站')                    // 语音播报即将执行的操作
// 点击第一个搜索结果链接
pbottleRPA.browserCMD_click('div#content_left a:first')
pbottleRPA.wait()                             // 等待默认时间

// 获取网站Logo路径演示
pbottleRPA.tts('读取 logo 路径，显示到日志')  // 语音播报即将执行的操作
// 获取第一个img元素的src属性值（即图片地址）
ret = pbottleRPA.browserCMD_attr('img:first','src')
console.log('网站logo图片地址',ret);           // 输出Logo图片地址
pbottleRPA.wait()                             // 等待默认时间

// 获取元素位置信息演示
let ret2 = pbottleRPA.browserCMD_offset('div.result:contains(小瓶RPA)') // 获取第一个img元素的位置信息
console.log('搜索结果的位置',ret2);                  // 输出元素位置信息
pbottleRPA.wait()                             // 等待默认时间

// 演示完成提示
pbottleRPA.tts('演示完成准备退出')             // 语音播报演示结束
console.log("准备结束脚本");                  // 在控制台输出结束信息
// 浏览器内显示演示结束的弹窗
ret = pbottleRPA.browserCMD_alert('演示结束')