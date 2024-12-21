/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 * 
 *  * HID 注意：
 *  ①此模块不是必须模块 
 *  ②此模块功能需要添加电脑硬件外设，购买装配请咨询小瓶RPA客服
 * 
 */


const pbottleRPA = require('./pbottleRPA')

//监测是否开通企业版
let bufferRS = pbottleRPA.bufferSet('pbottle');
if (bufferRS == '个人版不可用') {
    pbottleRPA.showMsg('个人版不可用','请先开通企业版')
    pbottleRPA.tts('个人版不可用，请先开通企业版')
    pbottleRPA.exit('⚠ 个人版不可用，请先开通企业版')
}



    console.log("=== 测试 ===");
    console.log(Date());
    pbottleRPA.showMsg('需要硬件外设','测试需要硬件外设')
    pbottleRPA.tts('正在打开键盘测试网站，需要开启RPA硬件模拟功能')
    pbottleRPA.openURL('https://key-test.com/cn/')
    pbottleRPA.sleep(3*1000)
    pbottleRPA.hid.keyTap('f11')

    // pbottleRPA.exit()


    let resolution = pbottleRPA.getResolution()
    console.log('当前分辨率：',resolution);
    pbottleRPA.hid.moveMouse(resolution.w/2,resolution.h/2)
    pbottleRPA.hid.mouseClick();

    pbottleRPA.hid.mouseWheel(-2)
    pbottleRPA.sleep(1000)
    pbottleRPA.hid.mouseWheel(1)
    pbottleRPA.sleep(1000)
    pbottleRPA.hid.mouseWheel()

    pbottleRPA.hid.mouseClick('middle');
    pbottleRPA.hid.mouseClick('left',3000);
    pbottleRPA.hid.mouseClick('right');
    pbottleRPA.sleep(1000)
    pbottleRPA.hid.moveMouse(resolution.w/3,resolution.h/2)
    pbottleRPA.hid.mouseDoubleClick()
    pbottleRPA.hid.mouseClick();


    //内容按键
    let str = "abcdefghijklmnopqrstuvwxyz`1234567890-=[]\\;',./";  
    for (let char of str) {
        console.log(' 按键：',char);
        pbottleRPA.hid.keyTap(char)
    }


    //控制输入
    pbottleRPA.hid.keyTap('up')
    pbottleRPA.hid.keyTap('down')
    pbottleRPA.hid.keyTap('left')
    pbottleRPA.hid.keyTap('right')
    pbottleRPA.hid.keyTap('space')
    pbottleRPA.hid.keyTap('page up')
    pbottleRPA.hid.keyTap('page down')
    pbottleRPA.hid.keyTap('end')
    pbottleRPA.hid.keyTap('home')
    pbottleRPA.hid.keyTap('tab')
    pbottleRPA.hid.keyTap('shift')
    pbottleRPA.hid.keyTap('backspace')
    pbottleRPA.hid.keyTap('enter')

    pbottleRPA.hid.keyTap('f11')


    // pbottleRPA.hid.mouseLeftDrag(12000,800)

    pbottleRPA.wait(1)
    pbottleRPA.hid.keyTap('ctrl + alt + del')

    pbottleRPA.wait(1)
    pbottleRPA.hid.keyTap('esc')




