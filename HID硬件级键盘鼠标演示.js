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
const pbottleHID = require('./pbottleRPA-HID')


    console.log("=== 测试 ===");
    console.log(Date());
    pbottleRPA.showMsg('需要硬件外设','测试需要硬件外设')
    pbottleRPA.openURL('https://key-test.com/cn/')
    pbottleRPA.sleep(3*1000)

    // pbottleRPA.exit()


    let resolution = pbottleRPA.getResolution()
    pbottleHID.moveMouse(resolution.w/2,resolution.h/2)
    pbottleHID.mouseClick();

    pbottleHID.mouseWheel(-2)
    pbottleRPA.sleep(1000)
    pbottleHID.mouseWheel(1)
    pbottleRPA.sleep(1000)
    pbottleHID.mouseWheel()

    pbottleHID.mouseClick('middle');
    pbottleHID.mouseClick('left',3000);
    pbottleHID.mouseClick('right');
    pbottleRPA.sleep(1000)
    pbottleHID.moveMouse(resolution.w/3,resolution.h/2)
    pbottleHID.mouseDoubleClick()
    pbottleHID.mouseClick();


    //内容按键
    let str = "abcdefghijklmnopqrstuvwxyz`1234567890-=[]\\;',./";  
    for (let char of str) {
        console.log(char);
        pbottleHID.keyTap(char)
    }


    //控制输入
    pbottleHID.keyTap('up')
    pbottleHID.keyTap('down')
    pbottleHID.keyTap('left')
    pbottleHID.keyTap('right')
    pbottleHID.keyTap('space')
    pbottleHID.keyTap('page up')
    pbottleHID.keyTap('page down')
    pbottleHID.keyTap('end')
    pbottleHID.keyTap('home')
    pbottleHID.keyTap('tab')
    pbottleHID.keyTap('shift')
    pbottleHID.keyTap('backspace')
    pbottleHID.keyTap('enter')


    // pbottleHID.mouseLeftDrag(12000,800)

    pbottleRPA.sleep(1000)
    pbottleHID.keyTap('ctrl + alt + del')

    pbottleRPA.sleep(1*1000)
    pbottleHID.keyTap('esc')




