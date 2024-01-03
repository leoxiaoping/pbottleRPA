/**
 *  小瓶RPA 脚本API（硬件级鼠标键盘增强）  nodeJS版本
 * 
 *  注意：
 *  ①此模块不是必须模块 
 *  ②此模块功能需要添加电脑硬件外设，购买装配请咨询小瓶RPA客服
 * 
 *  官网：https://rpa.pbottle.com/
 *  作者：leo@pbottle.com
 *  
 *  欢迎各路高手将本代码转换成 python、lua、C# 等其他语言封装
 */

const request = require('sync-request');  //默认同步请求
const keycode = require('keycode');

const CppUrl = `http://127.0.0.1:49888/`


/**
 * 模拟按键触发事件 (硬件级)
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 * @param {string} upDown  默认按下down，up松开按键
 * @returns 
 */
let keyToggle = (key,upDown)=>{
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = keycode(key)
    let url = `${CppUrl}?action=keyToggleHardWare&key_n=${key_n}&upDown_n=${upDown_n}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.keyToggle = keyToggle


/**
 * 按一下键盘（硬件级）   支持组合按键 加号连接 如：  keyTap('ctrl + alt + del')
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 */
let keyTap = (key)=>{

    if (key.includes('+')) {
        let subkeys = new Array();
        subkeys = key.split('+')
        subkeys = subkeys.map((value)=>{
            return value.trim()
        })
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            keyToggle(element,"down")
        }
        
        subkeys = subkeys.reverse()
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            keyToggle(element,"up")
        }
        
    }else{
        keyToggle(key,"down")
        keyToggle(key,"up")
    }
}
exports.keyTap = keyTap


/**
 * 基础鼠标命令  全部为零释放
 * @param {number} button 按键  1，2，4 代表鼠标的 左键，右键，中键。
 * @param {number} x 按键时候移动的位置，绝对位置  x=100：向右移动 100像素，负数向左
 * @param {number} y 按键时候移动的位置，拖拽相对位置  y=100：向下移动 100像素，负数向上
 * @param {number} mouseWheel 滚动齿轮数  正数向下，负数向下
 * @param {number} time 按下到释放时间
 * @returns 
 */
let mouseCMD = (button=1,x=0,y=0,mouseWheel=0,time=10)=>{
    let url = `${CppUrl}?action=mouseDataHardWare&bt=${button}&x=${x}&y=${y}&wheel=${mouseWheel}&time=${time}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}

/**
 * 移动鼠标到指定位置  起点为屏幕左上角  屏幕绝对位置（硬件分辨率）
 * @param {number} x   横坐标
 * @param {number} y   纵坐标
 * @returns 
 */
let moveMouse = (x,y)=>{
    mouseCMD(0,x,y,0,10)
}
exports.moveMouse = moveMouse


/**
 * 当前位置点击鼠标 默认左键  
 * @param {string} 鼠标的按键选择 left right middle 可选  ，默认左键
 * @param {number} 点按时间 单位毫秒 可选
 * @returns 
 */
let mouseClick = (button='left',time=10)=>{
    let bt = 1
    switch (button) {
        case 'right':
            bt = 2
            break;
        case 'middle':
            bt = 4
            break
        default:
            bt = 1
            break;
    }
    mouseCMD(bt,0,0,0,time)
    mouseCMD(0,0,0,0,0)
}
exports.mouseClick = mouseClick


/**
 * 双击鼠标  左键
 * @returns 
 */
let mouseDoubleClick = ()=>{
    mouseCMD(1,0,0,0,10)
    mouseCMD(0,0,0,0,0)
    mouseCMD(1,0,0,0,10)
    mouseCMD(0,0,0,0,0)
}
exports.mouseDoubleClick = mouseDoubleClick



/**
 * 鼠标左键拖到一段位置
 * @param {number} x  位置
 * @param {number} y  位置
 * @returns 
 */
let mouseLeftDragTo = (x,y)=>{
    mouseCMD(1,0,0,0,10)
    mouseCMD(1,x,y,0,10)
    mouseCMD(0,0,0,0,0)
}
exports.mouseLeftDragTo = mouseLeftDragTo



/**
 * 鼠标左键拖到一段位置
 * @param {number} x  位置
 * @param {number} y  位置
 * @returns 
 */
let mouseRightDragTo = (x,y)=>{
    mouseCMD(2,0,0,0,10)
    mouseCMD(2,x,y,0,10)
    mouseCMD(0,0,0,0,0)
}
exports.mouseRightDragTo = mouseRightDragTo


/**
 * 鼠标滚轮
 * @param {number} data 滚动的量  默认为-1   向下滚动一个齿轮;  正数向上滚动；
 * @returns 
 */
let mouseWheel = (data = -1)=>{
    mouseCMD(0,0,0,data,0)
    mouseCMD(0,0,0,0,0)
}
exports.mouseWheel = mouseWheel