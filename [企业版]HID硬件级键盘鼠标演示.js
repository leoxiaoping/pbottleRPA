/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了企业版的HID硬件级键盘鼠标操作功能
 * 通过硬件级别的输入模拟，可以绕过一些软件层的限制，实现更稳定的自动化操作
 * 注意：此功能仅在企业版中可用，且需要额外的硬件外设支持
 * 
 * HID 注意：
 * ①此模块不是必须模块 
 * ②此模块功能需要添加电脑硬件外设，购买装配请咨询小瓶RPA客服
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限

// 监测是否开通企业版
let bufferRS = pbottleRPA.bufferSet('pbottle');
// 检查是否为个人版（个人版不支持此功能）
if (bufferRS == '个人版不可用') {
    // 显示系统消息框提示用户
    pbottleRPA.showMsg('个人版不可用','请先开通企业版')
    // 使用文字转语音功能播报提示信息
    pbottleRPA.tts('个人版不可用，请先开通企业版')
    // 退出脚本并输出错误信息
    pbottleRPA.exit('⚠ 个人版不可用，请先开通企业版')
}

console.log("=== HID 键盘模拟测试 ===");                 // 在控制台输出测试开始信息
console.log(Date());                         // 在控制台输出当前日期时间
// 显示系统消息框提示用户需要硬件外设
pbottleRPA.showMsg('需要硬件外设','测试需要硬件外设')
// 使用文字转语音功能播报提示信息
pbottleRPA.tts('正在打开键盘测试网站，需要开启RPA硬件模拟功能')
// 打开键盘测试网站用于演示硬件级输入
pbottleRPA.openURL('https://key-test.com/cn/')
pbottleRPA.wait(3)                           // 等待3秒钟让网页加载完成
// 使用HID接口模拟按下F11键，进入全屏模式
pbottleRPA.hid.keyTap('f11')

// 获取当前屏幕分辨率信息
let resolution = pbottleRPA.getResolution()
console.log('当前分辨率：',resolution);        // 输出分辨率信息到控制台
// 使用HID接口移动鼠标到屏幕中心位置
pbottleRPA.hid.moveMouse(resolution.w/2,resolution.h/2)
// 使用HID接口执行鼠标点击操作
pbottleRPA.hid.mouseClick();

// 使用HID接口控制鼠标滚轮操作
pbottleRPA.hid.mouseWheel(-2)                // 向下滚动2个单位
pbottleRPA.wait()                            // 等待默认时间
pbottleRPA.hid.mouseWheel(1)                 // 向上滚动1个单位
pbottleRPA.wait()                            // 等待默认时间
pbottleRPA.hid.mouseWheel()                  // 默认向下滚动

// 使用HID接口执行不同按键的鼠标点击操作
pbottleRPA.hid.mouseClick('middle');         // 中键点击
pbottleRPA.hid.mouseClick('left',3000);      // 左键长按3秒
pbottleRPA.hid.mouseClick('right');          // 右键点击
pbottleRPA.wait()                            // 等待默认时间
// 移动鼠标到屏幕指定位置
pbottleRPA.hid.moveMouse(resolution.w/3,resolution.h/2)
pbottleRPA.hid.mouseDoubleClick()            // 执行鼠标双击操作
pbottleRPA.hid.mouseClick();                 // 执行鼠标单击操作

// 内容按键演示 - 逐个按下英文字母和符号键
let str = "abcdefghijklmnopqrstuvwxyz`1234567890-=[]\\;',./";  
// 遍历字符串中的每个字符并模拟按键
for (let char of str) {
    console.log(' 按键：',char);              // 输出当前按键字符到控制台
    pbottleRPA.hid.keyTap(char)              // 使用HID接口模拟按键
}

// 控制输入按键演示
pbottleRPA.hid.keyTap('up')                  // 按下方向键上
pbottleRPA.hid.keyTap('down')                // 按下方向键下
pbottleRPA.hid.keyTap('left')                // 按下方向键左
pbottleRPA.hid.keyTap('right')               // 按下方向键右
pbottleRPA.hid.keyTap('space')               // 按下空格键
pbottleRPA.hid.keyTap('page up')             // 按下Page Up键
pbottleRPA.hid.keyTap('page down')           // 按下Page Down键
pbottleRPA.hid.keyTap('end')                 // 按下End键
pbottleRPA.hid.keyTap('home')                // 按下Home键
pbottleRPA.hid.keyTap('tab')                 // 按下Tab键
pbottleRPA.hid.keyTap('shift')               // 按下Shift键
pbottleRPA.hid.keyTap('backspace')           // 按下退格键
pbottleRPA.hid.keyTap('enter')               // 按下回车键

// 使用HID接口再次按下F11键，退出全屏模式
pbottleRPA.hid.keyTap('f11')

pbottleRPA.wait(1)                           // 等待1秒钟
// 使用HID接口模拟按下Ctrl+Alt+Del组合键（系统级操作）
pbottleRPA.hid.keyTap('ctrl + alt + del')

pbottleRPA.wait(1)                           // 等待1秒钟
// 使用HID接口模拟按下Esc键
pbottleRPA.hid.keyTap('esc')