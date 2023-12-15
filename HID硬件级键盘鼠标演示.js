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
pbottleRPA.sleep(2000)



    // pbottleHID.keyTap('0')
    // pbottleHID.keyTap('9')
    // pbottleHID.keyTap('a')
    // pbottleHID.keyTap('z')

    pbottleHID.moveMouse(600,600)
    pbottleHID.mouseClick();

    // pbottleRPA.sleep(1000)
    // pbottleHID.mouseClick('left',3000);
    // pbottleHID.mouseClick('right');

    // pbottleHID.moveMouse(500,500)
    // pbottleHID.mouseDoubleClick()

    // pbottleHID.mouseLeftDrag(12000,800)

    pbottleRPA.sleep(1000)
    pbottleHID.keyTap('ctrl + alt + del')

    pbottleRPA.sleep(2*1000)
    pbottleHID.keyTap('esc')




