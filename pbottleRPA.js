/**
 *  小瓶 RPA 标准库API  NodeJS版本
 *  官网：https://rpa.pbottle.com/
 *  作者：leo@pbottle.com
 *  
 *  欢迎各路高手将本代码转换成 python、lua、C# 等其他语言封装
 * 
 */

const path = require("node:path");
const fs = require("node:fs");
const os = require('os');
const tls = require('node:tls');
const childProcess = require('node:child_process');

/**
 * 当前脚本的路径，结尾无/  如 'D:/pbottleRPAdemo'
 */
const jsPath = path.resolve('./');
const CppUrl = `http://127.0.0.1:49888/`
let basePath = process.env.RPAbaseDir; //基座路径
let homePath = process.env.RPAhomeDir;
let curlCommand = 'curl';  //优先使用系统的，如果系统不存在curl命令，使用小瓶RPA自带的

console.log("基座服务地址：（NodeJS）", CppUrl);
exports.jsPath = jsPath
exports.basePath = basePath
exports.__dirname = jsPath
exports.目录路径 = jsPath

//node:fs
exports.fs = fs
//node:path
exports.path = path

let defaultDelay = 1000;  //默认值一秒
/**
 * 设置RPA模拟操作的延时  包含鼠标、键盘、粘贴、打开网页操作
 * 设置为 0  可以用 sleep() 手动管理操作延时
 * @param {number} millisecond   毫秒单位的数字，系统默认 1000 毫秒 即1秒
 */
let setDefaultDelay = (millisecond) => {
    defaultDelay = millisecond
}
exports.setDefaultDelay = setDefaultDelay
exports.设置默认操作延时 = setDefaultDelay




/**
 * 发出系统警告声音
 * @returns 
 */
let beep = () => {
    let url = `${CppUrl}?action=beep`
    // console.log(url)
    let res = getHtml(url)
}
exports.beep = beep
exports.蜂鸣声 = beep


/**
 * 日志输出，同时生成文件日志
 */
exports.log = console.log
exports.日志输出 = console.log


/**
 * 系统原生消息提示
 * @param {string} title  标题
 * @param {string} content  内容
 * @returns 
 */
let showMsg = (title, content) => {
    title = encodeURIComponent(title)
    content = encodeURIComponent(content)
    let url = `${CppUrl}?action=showMsg&title=${title}&content=${content}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.showMsg = showMsg
exports.显示系统消息 = showMsg


/**
 * （强行）关闭指定软件
 * @param {string} processName 进程名称，如：'WINWORD.EXE' 任务管理器 ‘进程名称’ 栏目 。注意不是 名称，如不显示，右键勾选显示这一栏目即可
 * @param {boolean} force 是否强制，相当于模拟任务管理器的结束任务操作。默认普通关闭，可能跟随保存确认框
 */
let kill = (processName, force = false) => {
    let forceCMD = ''
    if (force) {
        forceCMD = '/F'
    }
    try {
        childProcess.execSync(`taskkill ${forceCMD} /IM ${processName}`, { stdio: 'ignore', encoding: 'utf8' })
    } catch (error) {
        console.error(`关闭进程（${processName}）失败，可能软件未运行`);
        return;
    }
    console.log('关闭进程成功：' + processName);
}
exports.kill = kill
exports.关闭软件 = kill


/**
 * 有效屏幕内显示一个彩色方框，直观提示流程操作范围和目标的当前的定位
 * V2024.6以上版本有效
 * @param {number} fromX  起始位置xy坐标，屏幕左上角为零点
 * @param {number} fromY 
 * @param {number} width  宽度
 * @param {number} height 高度
 * @param {string} color  颜色 红绿蓝黄4色可选：red|green|blue|yellow 
 * @param {number} msec  显示持续时间 单位毫秒
 * @returns 
 */
let showRect = (fromX = 0, fromY = 0, width = 500, height = 500, color = 'red', msec = 500) => {
    fromX = Math.round(fromX)
    fromY = Math.round(fromY)
    width = Math.round(width)
    height = Math.round(height)

    color = encodeURIComponent(color)
    let url = `${CppUrl}?action=showRect&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}&color=${color}&msec=${msec}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.showRect = showRect
exports.显示标记框 = showRect


/**
 * 强制退出当前脚本
 * @param {string} msg 退出时候输出的信息
 */
let exit = (msg = '') => {
    if (msg) {
        console.log(msg)
    }
    beep()
    process.exit(1)
}
exports.exit = exit
exports.退出流程 = exit


/**
 * 脚本暂停等待操作响应 (毫秒)
 * 注意：一次等待上限时长两分钟内
 * @param {number} milliseconds  毫秒
 * @returns 
 */
let sleep = (milliseconds) => {
    // childProcess.execSync(` node -e "setTimeout(() => console.log('sleep ${milliseconds} 结束'), ${milliseconds})" `, { stdio: ['ignore', 'ignore', 'ignore'], encoding: 'utf8' })
    if (milliseconds < 1) {
        // console.log('milliseconds input error');
        return;
    }
    milliseconds = Math.floor(milliseconds) //毫秒取整
    if (milliseconds >= 120000) {
        console.log('警告：一次等待上限时长两分钟内');
    }

    milliseconds -= 20  //减小毫秒误差，接口请求导致，大小受电脑运行速度影响
    if (milliseconds < 1) {
        milliseconds = 1
    }
    let url = `${CppUrl}?action=httpSleep&milliseconds=${milliseconds}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.sleep = sleep
exports.睡眠毫秒 = sleep


/**
 * 脚本暂停等待操作响应 (秒)
 * 注意：一次等待超过100s, 会有日志提示
 * @param {number} seconds  秒,  缺省值为 1 秒。支持小数。
 */
let wait = (seconds = 1) => {
    if (seconds <= 0 || !isNumeric(seconds)) {
        console.log('pbottleRPA.wait：seconds input error');
        return;
    }
    if (seconds > 100) {  //100秒
        let quotient = Math.floor(seconds / 100)
        for (let i = 0; i < quotient; i++) { //每100秒
            sleep(100 * 1000)
            console.log(`提示：已等待100s...`);
        }
        seconds = seconds % 100;
    } else {
        sleep(seconds * 1000)
    }
}
exports.wait = wait
exports.等待 = wait

/**
 * 移动鼠标到指定位置并点击  起点为屏幕左上角
 * @param {number} x   横坐标
 * @param {number} y   纵坐标
 * @param {number} interval  像素间隔时间，越大移动越慢  毫秒单位，默认：0
 * @returns 
 */
let moveMouseSmooth = (x, y, interval = 0) => {
    x = Math.round(x)
    y = Math.round(y)
    let url = `${CppUrl}?action=moveMouse&x=${x}&y=${y}&interval=${interval}`
    // console.log(url)
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.moveMouseSmooth = moveMouseSmooth
exports.moveMouse = moveMouseSmooth  //增加别名
exports.鼠标移动 = moveMouseSmooth


/**
 * 移动鼠标到指定位置并点击
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 */
let moveAndClick = (x, y) => {
    // call local functions directly instead of using `this` which may not refer to module exports
    moveMouseSmooth(x, y)
    mouseClick()
}
exports.moveAndClick = moveAndClick
exports.鼠标移动并点击 = moveAndClick


/**
 * 当前位置点击鼠标 默认左键  可选 'right'
 * @param {string} leftRight    可选
 * @param {number} time 点按时间 单位毫秒  可选
 * @returns 
 */
let mouseClick = (leftRight = 'left', time = 30) => {

    let url = `${CppUrl}?action=mouseLeftClick&time=${time}`
    if (leftRight == 'right') {
        url = `${CppUrl}?action=mouseRightClick&time=${time}`
    }
    // console.log(url)
    let res = getHtml(url)

    sleep(defaultDelay);
    return res;
}
exports.mouseClick = mouseClick
exports.鼠标点击 = mouseClick


/**
 * 双击鼠标  默认左键
 * @returns 
 */
let mouseDoubleClick = () => {

    let url = `${CppUrl}?action=mouseDoubleClick`

    // console.log(url)
    let res = getHtml(url)

    sleep(defaultDelay);
    return res;
}
exports.mouseDoubleClick = mouseDoubleClick
exports.鼠标双击 = mouseDoubleClick


/**
 * 鼠标滚轮
 * @param {number} data 滚动的量  默认为-720   向下滚动720度
 * @returns 
 */
let mouseWheel = (data = -720) => {
    let url = `${CppUrl}?action=mouseWheel&data=${data}`
    // console.log(url)
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.mouseWheel = mouseWheel
exports.鼠标滚轮 = mouseWheel


/**
 * 鼠标左键拖到指定位置
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let mouseLeftDragTo = (x, y) => {
    x = Math.round(x)
    y = Math.round(y)
    let url = `${CppUrl}?action=mouseLeftDragTo&x=${x}&y=${y}`
    // console.log(url)
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.mouseLeftDragTo = mouseLeftDragTo
exports.鼠标左键拖动 = mouseLeftDragTo


/**
 * 鼠标右键拖到指定位置
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let mouseRightDragTo = (x, y) => {
    x = Math.round(x)
    y = Math.round(y)
    let url = `${CppUrl}?action=mouseRightDragTo&x=${x}&y=${y}`
    // console.log(url)
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.mouseRightDragTo = mouseRightDragTo
exports.鼠标右键拖动 = mouseRightDragTo



/**
 * 屏幕一个点取色
 * @param {number} x 
 * @param {number} y 
 * @returns 返回颜色值 
 */
let getScreenColor = (x, y) => {
    let url = `${CppUrl}?action=getScreenColor&x=${x}&y=${y}`
    // console.log(url)
    let res = getHtml(url)
    let jsonRes = JSON.parse(res)
    return jsonRes.rs;
}
exports.getScreenColor = getScreenColor
exports.获取屏幕颜色 = getScreenColor


/**
 * 屏幕截图
 * @param {string} savePath  保存路径默认 我的图片，图片格式为PNG；如果使用自定义路径请以 '.png' 结尾; 
 * @param {number} x  截图开始位置
 * @param {number} y 
 * @param {number} w  可选 截图宽度
 * @param {number} h  可选 截图长度
 * @returns 
 */
let screenShot = (savePath = '', x = 0, y = 0, w = -1, h = -1) => {

    if (savePath) { //整理路径
        savePath = path.resolve(savePath)
        savePath = encodeURIComponent(savePath)
    }

    x = parseInt(x)
    y = parseInt(y)
    w = parseInt(w)
    h = parseInt(h)

    if (x != 0 || y != 0 || w != -1 || h != -1) {
        showRect(x, y, w, h);
    }

    let url = `${CppUrl}?action=screenShot&savePath=${savePath}&x=${x}&y=${y}&w=${w}&h=${h}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.screenShot = screenShot
exports.屏幕截图 = screenShot

/**
 * 按键名称 转成 键值
 * @param {string} name 
 * @returns {number}
 */
function keycode(name) {
    name = name.trim().toLowerCase();
    const replacement_dict = {
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'shift': 16,
        'ctrl': 17,
        'alt': 18,
        'pause/break': 19,
        'caps lock': 20,
        'esc': 27,
        'space': 32,
        'page up': 33,
        'page down': 34,
        'end': 35,
        'home': 36,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        'insert': 45,
        'delete': 46,
        'command': 91,
        'left command': 91,
        'right command': 93,
        'numpad *': 106,
        'numpad +': 107,
        'numpad -': 109,
        'numpad .': 110,
        'numpad /': 111,
        'num lock': 144,
        'scroll lock': 145,
        'my computer': 182,
        'my calculator': 183,
        'windows': 91,
        '⇧': 16,
        '⌥': 18,
        '⌃': 17,
        '⌘': 91,
        'ctl': 17,
        'control': 17,
        'option': 18,
        'pause': 19,
        'break': 19,
        'caps': 20,
        'return': 13,
        'escape': 27,
        'spc': 32,
        'spacebar': 32,
        'pgup': 33,
        'pgdn': 34,
        'ins': 45,
        'del': 46,
        'cmd': 91,
        'f1': 112,
        'f2': 113,
        'f3': 114,
        'f4': 115,
        'f5': 116,
        'f6': 117,
        'f7': 118,
        'f8': 119,
        'f9': 120,
        'f10': 121,
        'f11': 122,
        'f12': 123,

        ';': 186,
        '=': 187,
        ',': 188,
        '-': 189,
        '.': 190,
        '/': 191,
        '`': 192,
        '[': 219,
        '\\': 220,
        ']': 221,
        "'": 222,

        "0": 48,
        "1": 49,
        "2": 50,
        "3": 51,
        "4": 52,
        "5": 53,
        "6": 54,
        "7": 55,
        "8": 56,
        "9": 57,
        "a": 65,
        "b": 66,
        "c": 67,
        "d": 68,
        "e": 69,
        "f": 70,
        "g": 71,
        "h": 72,
        "i": 73,
        "j": 74,
        "k": 75,
        "l": 76,
        "m": 77,
        "n": 78,
        "o": 79,
        "p": 80,
        "q": 81,
        "r": 82,
        "s": 83,
        "t": 84,
        "u": 85,
        "v": 86,
        "w": 87,
        "x": 88,
        "y": 89,
        "z": 90,
    }
    return replacement_dict[name]
}

/**
 * 模拟键盘按键触发基础事件
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 * @param {string} "up" 或 "down"  默认按下down。up松开按键
 * @returns 
 */
let keyToggle = (key, upDown = 'down') => {
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = keycode(key)
    if (key_n === undefined) {
        console.log(`⚠ 按键 ${key} 不存在！~`);
        return
    }
    let url = `${CppUrl}?action=keyToggle&key_n=${key_n}&upDown_n=${upDown_n}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.keyToggle = keyToggle
exports.键盘基础触发 = keyToggle


/**
 * 模拟鼠标按键触发基础事件
 * @param {string} key   鼠标 left | right | middle  
 * @param {string} "up" 或 "down"  默认按下down。up松开按键
 * @returns 
 */
let mouseKeyToggle = (key = 'left', upDown = 'down') => {
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = 0
    switch (key) {
        case 'right':
            key_n = 1
            break;
        case 'middle':
            key_n = 2
            break;
        default:
            key_n = 0
            break;
    }
    let url = `${CppUrl}?action=mouseKeyToggle&key_n=${key_n}&upDown_n=${upDown_n}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.mouseKeyToggle = mouseKeyToggle
exports.鼠标基础触发 = mouseKeyToggle


/**
 * 按一下键盘   支持组合按键 加号连接 如：  keyTap('ctrl + a')
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 */
let keyTap = (key) => {

    if (key.includes('+')) {
        let subkeys = new Array();
        subkeys = key.split('+')
        subkeys = subkeys.map((value) => {
            return value.trim()
        })
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            // keyToggle(element,"up")  //净化复位
            keyToggle(element, "down")
        }

        subkeys = subkeys.reverse()
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            keyToggle(element, "up")
        }
    } else {
        // keyToggle(key,"up")  //净化复位
        keyToggle(key, "down")
        keyToggle(key, "up")
    }

    sleep(defaultDelay);
}
exports.keyTap = keyTap
exports.键盘按键 = keyTap


/**
 * 屏幕查找图象定位
 * @param {string} tpPath 搜索的小图片，建议png格式  相对路径:./image/123.png
 * @param {number} miniSimilarity 可选，指定最低相似度，默认0.85。取值0-1，1为找到完全相同的。
 * @param {number} fromX=0 可选，查找开始的开始横坐标
 * @param {number} fromY=0 可选，查找开始的开始纵坐标
 * @param {number} width=-1 可选，搜索宽度
 * @param {number} height=-1 可选，搜索高度
 * @returns {{x:number,y:number}|false} 返回找到的结果json 格式：{x,y} 相对于左上角原点
 */
var findScreen = (tpPath, miniSimilarity = 0.85, fromX = 0, fromY = 0, width = -1, height = -1) => {

    if (fromX < 0 || fromY < 0) {
        exit(`错误：找图起始点不能为负，x:${fromX} y:${fromY} `);
    }

    if (fromX != 0 || fromY != 0 || width != -1 || height != -1) {
        showRect(fromX, fromY, width, height);
    }

    tpPath = path.resolve(tpPath)
    tpPath = encodeURIComponent(tpPath)
    let url = `${CppUrl}?action=findScreen&imgPath=${tpPath}&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}`
    // console.log(url)
    let res = getHtml(url)

    // console.log(res.getBody('utf8'));
    let jsonRes = JSON.parse(res);
    // console.log(jsonRes);

    if (jsonRes.error) {
        console.log(jsonRes.error);
        return false;
    }
    if (jsonRes.value < miniSimilarity) {
        return false;
    }

    showRect(jsonRes.x - 25, jsonRes.y - 25, 50, 50, 'green');
    return jsonRes;
}
exports.findScreen = findScreen
exports.寻找图像 = findScreen


/**
 * 查找文字，注：此功能受电脑性能影响，低配电脑可能速度较慢。 需要小瓶RPA客户端版本 > V2024.5
 * @param {string} inputTxt 
 * @param {number} fromX=0 可选，查找开始的开始横坐标
 * @param {number} fromY=0 可选，查找开始的开始纵坐标
 * @param {number} width=-1 可选，搜索宽度
 * @param {number} height=-1 可选，搜索高度
 * @returns {{x:number,y:number,text:string}}  返回json结果：{x,y,text} x,y坐标相对于左上角的原点
 */
var findText = (inputTxt, fromX = 0, fromY = 0, width = -1, height = -1) => {
    let jsonDatas = aiOcr('screen', fromX, fromY, width, height);
    let result = false;
    jsonDatas.forEach(element => {
        // console.log(element.text);
        if (element.text.includes(inputTxt)) {
            result = element
            return;
        }
    });
    if (result !== false) {
        showRect(result.x - 25, result.y - 25, 50, 50, 'green');
    }
    return result;
}
exports.findText = findText
exports.寻找文字 = findText


/**
 * 屏幕查找物体或者窗口轮廓
 * 调试：软件根目录会生成 debug/findContours.png
 * 
 * @param {number} minimumArea 轮廓最小面积  默认过滤掉 10x10 以下的元素
 * @param {number} fromX  查找起点
 * @param {number} fromY 
 * @param {number} width  查找范围
 * @param {number} height 
 * @returns {[]} 所有查找到的轮廓信息，包含闭合区域的起始坐标，中点坐标，面积，id。 格式：[{ x: 250, y: 10, cx: 265.5, cy: 30.5, area: 2401, id: 42 },...]  xy相对于原点
 */
var findContours = (minimumArea = 1000, fromX = 0, fromY = 0, width = -1, height = -1) => {

    if (fromX < 0 || fromY < 0) {
        exit(`错误：轮廓查找起始点不能为负，x:${fromX} y:${fromY} `);
    }

    if (fromX != 0 || fromY != 0 || width != -1 || height != -1) {
        showRect(fromX, fromY, width, height);
    }

    let url = `${CppUrl}?action=findContours&minimumArea=${minimumArea}&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}`
    // console.log(url)
    let res = getHtml(url)

    // parse the response string directly (getHtml returns stdout string)
    let jsonRes = JSON.parse(res);

    for (const json of jsonRes) {
        json.x += fromX
        json.y += fromY
    }
    // console.log(jsonRes);
    return jsonRes;
}
exports.findContours = findContours
exports.寻找轮廓 = findContours

/**
 * 当前位置 粘贴（输入）文字  
 * @param {string} txt  复制到电脑剪切板的文本
 */
var paste = (txt) => {
    copyText(txt)
    // sleep(200)
    keyTap('ctrl+v')

    sleep(defaultDelay);
}
exports.paste = paste
exports.粘贴输入 = paste


/**
 * 图片相似度对比  需要小瓶RPA客户端版本 > V2025.3
 * @param {string} path1  图片1路径
 * @param {string} path2  图片2路径
 * @param {'SIFT' | 'ORB' | 'SSIM'} checkType  对比算法  默认 'ORB'
 * @returns {{score:number, time:number}}  score相似度分数 0-1 ; time耗时秒
 */
var imgSimilar = (path1, path2, checkType = 'ORB') => {
    path1 = encodeURIComponent(path1)
    path2 = encodeURIComponent(path2)
    let url = `${CppUrl}?action=imgSimilar&path1=${path1}&path2=${path2}&checkType=${checkType}`
    let res = getHtml(url)
    return JSON.parse(res);
}
exports.imgSimilar = imgSimilar
exports.图片相似度对比 = imgSimilar




/**
 * 模拟复制文字，相当于选择并复制文本内容  v2025.0以上生效
 * @param {string} txt 复制的文本内容
 */
var copyText = (txt) => {
    txt = encodeURIComponent(txt)
    let url = `${CppUrl}?action=copyText&txt=${txt}`
    // console.log(url)
    let res = getHtml(url)
    return res
}
exports.copyText = copyText
exports.复制文字 = copyText

/**
 * 模拟复制操作，支持文件路径和文件夹路径，复制后在目标文件夹ctrl+V 即可粘贴  V2024.7开始生效
 * 复制文件后，在微信发送窗口粘贴，即可发送文件 
 * @param {string} filepath  绝对路径
 */
var copyFile = (filepath) => {
    filepath = path.resolve(filepath)
    if (!fs.existsSync(filepath)) {
        console.log('copyFile警告:文件路径不存在', filepath);
    }
    filepath = filepath.replace(/\\/g, '/')
    filepath = encodeURIComponent(filepath)
    let url = `${CppUrl}?action=copyFile&path=${filepath}`
    // console.log(url)
    let res = getHtml(url)
    return res
}
exports.copyFile = copyFile
exports.复制文件 = copyFile

/**
 * 获取当前电脑的剪切板内容，系统剪切板支持多种格式   版本 V2024.2 开始生效
 * ①纯文本格式：普通复制  如'小瓶RPA'
 * ②图片格式 base64形式：浏览器复制图片    'data:image/png;base64,' 开头
 * ③html格式：浏览器或者钉钉复制富文本综合内容    '<html>'开头
 * @returns 结果文本
 */
var getClipboard = () => {
    let url = `${CppUrl}?action=getClipboard`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.getClipboard = getClipboard
exports.获取剪切板内容 = getClipboard



/**
 * 通知到手机
 * 通过小瓶云发送微信通知 (微信到达率高，并且免费)
 * @param {string} title 消息标题
 * @param {string} content  消息详细内容
 * @param {string} key  获取key详情方法：https://www.pbottle.com/a-12586.html
 */
var wxMessage = (title, content, key) => {

    let url = `https://yun.pbottle.com/manage/yun/?msg=${encodeURIComponent(content)}&name=${encodeURIComponent(title)}&key=${key}`;
    let res = getHtml(url)
    console.log('发送微信消息：', res);

}
exports.wxMessage = wxMessage
exports.微信消息发送 = wxMessage


/**
 * 向指定API网址post一个json，最常用网络接口方式
 * @param {string} url API网络地址 
 * @param {object} msgJson Json对象 
 * @param {object} headersJson 请求头 Json对象 
 * @param {string} method e.g. GET, POST, PUT, DELETE or HEAD
 * @returns {string}
 */
var postJson = (url, msgJson, headersJson = {}, method = 'POST') => {

    const jsonData = JSON.stringify(msgJson);
    const commandArgs = [
        '-X', method,
        '-H', 'Content-Type: application/json',
        "--silent", "--show-error",
        '-d', jsonData,
        url
    ];
    if (Object.keys(headersJson).length !== 0) {
        for (const [key, value] of Object.entries(headersJson)) {
            commandArgs.push('-H', `${key}: ${value}`);
        }
    }
    const result = childProcess.spawnSync(curlCommand, commandArgs, { encoding: 'utf8' });
    if (result.error) {
        console.error('postJson 执行 curl 命令时出错:', result.error.message);
        exit()
    }
    if (result.status !== 0) {
        console.error('postJson curl 命令执行失败:', result.stderr);
        exit()
    }
    return result.stdout;
}
exports.postJson = postJson
exports.提交json = postJson

/**
 * 向指定API网址post一个json文件，适合大型json内容
 * @param {string} url API网络地址 
 * @param {string} msgJsonFile Json文件路径 
 * @param {object} headersJson 请求头Json对象 
 * @param {string} method e.g. GET, POST, PUT, DELETE or HEAD
 * @returns {string}
 */
var postJsonFile = (url, msgJsonFile, headersJson = {}, method = 'POST') => {

    msgJsonFile = path.resolve(msgJsonFile);
    const commandArgs = [
        '-X', method,
        '-H', 'Content-Type: application/json',
        '-d', `@${msgJsonFile}`,
        url
    ];
    if (Object.keys(headersJson).length !== 0) {
        for (const [key, value] of Object.entries(headersJson)) {
            commandArgs.push('-H', `${key}: ${value}`);
        }
    }
    const result = childProcess.spawnSync(curlCommand, commandArgs, { encoding: 'utf8' });
    if (result.error) {
        console.error('postJsonFile 执行 curl 命令时出错:', result.error.message);
        exit()
    }
    if (result.status !== 0) {
        console.error('postJsonFile curl 命令执行失败:', result.stderr);
        exit()
    }
    return result.stdout;
}
exports.postJsonFile = postJsonFile
exports.提交json文件 = postJsonFile

/**
 * 普通请求网址，获取返回的html文本
 * @param {string} url 网络地址 get方法
 * @param {object} headersJson  请求头 Json对象 
 * @param {string} method  请求方法 ：GET, POST, PUT, DELETE or HEAD 
 * @returns {string} 返回的文本
 */
function getHtml(url, headersJson = {}, method = 'GET') {
    let commandArgs = ['-X', method, url];
    if (Object.keys(headersJson).length !== 0) {
        for (const [key, value] of Object.entries(headersJson)) {
            commandArgs.push('-H', `${key}: ${value}`);
        }
    }
    const result = childProcess.spawnSync(curlCommand, commandArgs, { encoding: 'utf8' });
    if (result.error) {
        console.error('getHtml 执行 curl 命令时出错:', result.error.message);
        exit()
    }
    if (result.status !== 0) {
        console.error('getHtml curl 命令执行失败:', result.stderr);
        exit()
    }
    return result.stdout;
}
exports.getHtml = getHtml
exports.请求网址 = getHtml

/**
 * 发送邮件；注意这个方法是个异步方法，请参考示例;
 * @param {string} to  收件人地址
 * @param {string} subject 邮件主题
 * @param {string} content 邮件内容;文本文件，换行用 '\n'
 * @param {string} host 服务器地址（如：smtp.qq.com）
 * @param {number} port 服务器端口 默认是465
 * @param {string} user 认证信息（用户名）一般也是发送邮件地址
 * @param {string} pass 认证信息（密码）
 * @returns 
 */
function sendMail(
    to,
    subject,
    content,
    host = 'smtp.qq.com',
    port = 465,
    user = 'leo191@foxmail.com',
    pass = 'fxfqtsxmwcohbcbc',
) {
    return new Promise((resolve, reject) => {
        const client = tls.connect(port, host, { rejectUnauthorized: false }, () => {
            console.log('✅ 已连接到 SMTP 服务器');
        });
        client.setEncoding('utf8');
        if (user == 'leo191@foxmail.com') {
            content += '\n\n\ 请不要将演示测试邮箱用作实际业务，详细查看：https://rpa.pbottle.com/a-14106.html'
        }
        const commands = [
            `EHLO ${host}`,
            `AUTH LOGIN`,
            Buffer.from(user).toString('base64'),
            Buffer.from(pass).toString('base64'),
            `MAIL FROM:<${user}>`,
            `RCPT TO:<${to}>`,
            `DATA`,
            [
                `From: "小瓶RPA" ${user}`,
                `To: ${to}`,
                `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
                `Content-Type: text/plain; charset=utf-8`,
                ``,
                `${content}`,
                `.`
            ].join('\r\n'),
            `QUIT`
        ];

        let step = 0;
        let responseBuffer = '';

        client.on('data', (data) => {
            responseBuffer += data;

            if (/(\n|\r\n)\d{3}\s/.test(data) || data.endsWith('\n')) {
                const code = parseInt(data.substring(0, 3));
                console.log('📩 SMTP:', data.trim());
                if (code >= 400) {
                    client.end();
                    reject(new Error(`SMTP 错误: ${data.trim()}`));
                    return;
                }
                if (step < commands.length) {
                    const cmd = commands[step++];
                    console.log('➡️ 发送:', cmd.split('\r\n')[0]);
                    client.write(cmd + '\r\n');
                } else {
                    client.end();
                    resolve('✅ 邮件发送成功');
                }
            }
        });

        client.on('error', (err) => {
            reject(err);
        });
    });
}
exports.sendMail = sendMail
exports.发送邮件 = sendMail

/**
 * 从网络下载一个文件到本地路径
 * @param {string} fileUrl 网址
 * @param {string} filename 本地路径文件名
 * @param {object} headersJson  请求头 Json对象 
 */
function downloadFile(fileUrl, filename, headersJson = {}) {

    const dirPath = path.dirname(filename);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    filename = path.resolve(filename)
    console.log('下载文件到:', filename)
    const commandArgs = [
        '-o', filename,
        fileUrl
    ];
    if (Object.keys(headersJson).length !== 0) {
        for (const [key, value] of Object.entries(headersJson)) {
            commandArgs.push('-H', `${key}: ${value}`);
        }
    }
    const result = childProcess.spawnSync(curlCommand, commandArgs, { encoding: 'utf8' });
    if (result.error) {
        console.error('downloadFile 执行 curl 命令时出错:', result.error.message);
        exit()
    }
    if (result.status !== 0) {
        console.error('downloadFile curl 命令执行失败:', result.stderr);
        exit()
    }
    return result.stdout;
}
exports.downloadFile = downloadFile
exports.下载文件 = downloadFile

/**
 * 从文本到语音(TextToSpeech)  语音播报
 * 非阻塞
 * @param {string} text 朗读内容
 */
var tts = (text) => {
    text = encodeURIComponent(text)
    let url = `${CppUrl}?action=tts&txt=${text}`
    // console.log(url)
    let res = getHtml(url)
    sleep(defaultDelay);
}
exports.tts = tts
exports.文字转语音 = tts


/**
 * 用电脑默认浏览器打开网址
 * @param {string} myurl 网址
 */
var openURL = (myurl) => {

    let clearurl = `${CppUrl}?action=setWebReadyPage`
    getHtml(clearurl)

    myurl = encodeURIComponent(myurl)
    let url = `${CppUrl}?action=openURL&url=${myurl}`
    // console.log(url)
    let res = getHtml(url)
    sleep(defaultDelay + 1000);
}
exports.openURL = openURL
exports.打开网址 = openURL


/**
 * 打开文件（用默认软件）或者 用资源管理器打开展示文件夹，
 * @param {string} filePath 文件夹绝对路径  如：'c:/input/RPAlogo128.png'  Windows磁盘路径分隔符要双 '/'
 */
var openDir = (filePath) => {
    filePath = path.resolve(filePath)
    filePath = encodeURIComponent(filePath)
    let url = `${CppUrl}?action=openDir&path=${filePath}`
    // console.log(url)
    let res = getHtml(url)
    sleep(defaultDelay);
}
exports.openDir = openDir
exports.openfile = openDir
exports.打开目录 = openDir
exports.打开文件 = openDir



/**
 * 获取当前屏幕分辨率和缩放 
 * @returns {{w:number,h:number,ratio:number}} JSON内容格式 {w:1920,h:1080,ratio:1.5} ratio 为桌面缩放比例
 */
var getResolution = () => {
    let url = `${CppUrl}?action=getResolution`
    // console.log(url)
    let res = getHtml(url)
    return JSON.parse(res);
}
exports.getResolution = getResolution
exports.获取屏幕分辨率 = getResolution


/**
 * 文字识别 OCR已经从经典算法升级为AI模型预测，永久免费可脱网使用
 * 
 * @param {string} imagePath 空或者screen 为电脑屏幕;  或者本地图片的绝对路径;
 * @param {number} x 可选 查找起始点
 * @param {number} y 可选 查找起始点
 * @param {number} width  可选 宽度范围
 * @param {number} height 可选 高度范围
 * @returns {array}  AI OCR识别的json结果 包含准确率的评分和中点位置   格式： [{text:'A',score:'0.319415',x:100,y:200},...]  xy相对于原点
 */
var aiOcr = (imagePath = "screen", x = 0, y = 0, width = -1, height = -1) => {

    if (!imagePath) {
        imagePath = "screen"
    }

    if (x < 0 || y < 0) {
        exit(`错误：OCR 起始点不能为负，x:${x} y:${y} `);
    }

    if (x != 0 || y != 0 || width != -1 || height != -1) {
        showRect(x, y, width, height);
    }

    if (imagePath != 'screen') {
        // use absolute path for local image files
        imagePath = path.resolve(imagePath)
        imagePath = encodeURIComponent(imagePath)
    }

    let url = `${CppUrl}?action=aiOcr&path=${imagePath}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    // console.log(url)
    let res = getHtml(url)

    if (res == '文字识别引擎未启动') {
        console.log('⚠', res, '请在软件设置中开启');
        exit()
    }

    let jsons = JSON.parse(res);
    for (const json of jsons) {
        json.x += x
        json.y += y
    }
    return jsons;
}
exports.aiOcr = aiOcr
exports.文字识别 = aiOcr


/**
 * AI 物体识别 已经从经典算法升级为AI模型预测，企业版可脱网使用  V2024.8 以上版本有效
 * 调试：软件根目录会生成 debug/Ai_ObjectDetect.png 文件
 * 
 * @param {number} minimumScore 相似度阈值
 * @param {number} x 可选 查找范围
 * @param {number} y 可选 查找范围
 * @param {number} width  可选 查找宽度
 * @param {number} height 可选 查找高度
 * @returns {array}  AI 物体识别的 json 结果 包含准确率的评分    格式： [{x:100,y:100,width:150,height:150,score:0.86,class:'分类名'},...]  xy相对于原点
 */
var aiObject = (minimumScore = 0.5, x = 0, y = 0, width = -1, height = -1) => {

    if (x < 0 || y < 0) {
        exit(`错误：OCR 起始点不能为负，x:${x} y:${y} `);
    }

    if (x != 0 || y != 0 || width != -1 || height != -1) {
        showRect(x, y, width, height);
    }

    let url = `${CppUrl}?action=aiObject&minimumScore=${minimumScore}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    // console.log(url)
    let res = getHtml(url)

    if (res == '物体识别引擎未启动') {
        console.log('⚠', res, '请在软件设置中开启');
        exit()
    }

    let jsons = JSON.parse(res);
    for (const json of jsons) {
        json.x += x
        json.y += y
        showRect(json.x, json.y, json.width, json.height, 'green');
    }
    return jsons;
}
exports.aiObject = aiObject
exports.物体识别 = aiObject


/**
 * 压缩文件夹内容成一个zip文件包    v2025.0 以后版本生效
 * @param {string} directory 文件夹路径，输入绝对路径
 * @param {string} zipFilePath zip文件包
 */
function zipDir(directory, zipFilePath = "") {
    if (!zipFilePath) {
        zipFilePath = path.resolve(directory, 'RPA生成的压缩包.zip')
    }
    try {
        zipFilePath = path.resolve(zipFilePath)
        directory = path.resolve(directory)
        let exe = path.resolve(`${basePath}/bin/7za`)
        const os = process.platform;
        if (os === 'linux') {
            exe = '7za'
        }
        childProcess.execSync(`"${exe}" a "${zipFilePath}" "${directory}"`, { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8' })
    } catch (error) {
        if (!error.stderr.includes('Headers Error')) {  //warning
            console.error(`压缩失败`, error);
        }
    }
}
exports.zipDir = zipDir
exports.压缩 = zipDir


/**
 * 解压缩zip文件内容到指定文件夹内    v2025.0 以后版本生效
 * @param {string} zipFilePath zip文件包
 * @param {string} directory 文件夹路径，输入绝对路径  默认解压到zip文件当前目录
 */
function unZip(zipFilePath, directory = "") {
    if (!directory) {
        directory = path.dirname(zipFilePath)
    }
    try {
        filePath = path.resolve(zipFilePath)
        directory = path.resolve(directory)
        let exe = path.resolve(`${basePath}/bin/7za`)
        const os = process.platform;
        if (os === 'linux') {
            exe = '7za'
        }
        childProcess.execSync(`"${exe}" x "${filePath}" -o"${directory}" -aoa`, { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8' })
    } catch (error) {
        console.error(`解压缩失败`, error);
    }
}
exports.unZip = unZip
exports.解压缩 = unZip

/**
 * 获取buffer存储内容
 * 此buffer可以跨脚本存取，RPA重启时才重置，存取多线程下安全
 * http外部获取方式：http://ip:49888/action=bufferGet&n=0 
 * @param {number} n buffer编号，从0-9共10个  默认：0 第一个buffer
 * @returns  {string} 返回字符串
 */
var bufferGet = (n = 0) => {
    let url = `${CppUrl}?action=bufferGet&n=${n}`
    let res = getHtml(url)
    return res;
}
exports.bufferGet = bufferGet


/**
 * 设置buffer存储内容
 * 此buffer可以跨脚本存取，RPA重启时才重置，存取多线程下安全
 * http外部设置方式（POST方法）：http://ip:49888/action=bufferSet&n=0 ，content设置到Post的body中
 * @param {string} content 存储的内容，通常为一个json，也可以字符串
 * @param {number} n buffer编号，从0-9共10个  默认：0 第一个buffer
 * @returns {string} ok 表示成功
 */
var bufferSet = (content, n = 0) => {
    let url = `${CppUrl}?action=bufferSet&n=${n}`
    let res = postJson(url, content);
    return res;

}
exports.bufferSet = bufferSet


/**
 * 设置接力执行的脚本
 * 当前脚本结束后（无论正常结束还是错误退出），立刻启动的自动脚本。
 * http外部设置方式（GET方法）：http://ip:49888/action=pbottleRPA_delay&path=MyPATH
 * @param {string} scriptPath 接力脚本的路径 如：'D:/test.mjs'    如果路径为空，默认清除当前已经设置的接力任务。
 * @returns {string} ok 表示成功
 */
var delaySet = (scriptPath = '') => {
    scriptPath = path.resolve(scriptPath)
    scriptPath = encodeURIComponent(scriptPath)
    let url = `${CppUrl}?action=pbottleRPA_delay&path=${scriptPath}`
    let res = getHtml(url)
    return res
}
exports.delaySet = delaySet


/**
 * 获取当前的设备唯一号
 * @returns {string} 返回字符串
 */
function deviceID() {
    let url = `${CppUrl}?action=pbottleRPA_deviceID`
    let res = getHtml(url)
    return res
}
exports.deviceID = deviceID



/**
 * 获取
 * @returns {string} 返回字符串
 */
function clusterCenter() {
    let url = `${CppUrl}?action=pbottleRPA_clusterCenter`
    let res = getHtml(url)
    return res
}
exports.clusterCenter = clusterCenter



/**
 *  小瓶RPA 云端模块，AI在线大模型
 *  注意：
 *  ①此模块不是必须模块 ，云端模块不影响本地模块的独立运行
 *  ②此模块功能需要登录并激活云端模块。碍于成本因素，部分功能需要充值计费才能使用
 */
exports.cloud = {}

/**
 * @typedef {Object} Answerinfo  AI回答结果
 * @property {string} content - 回答结果
 * @property {number} usage - 消耗token数量
 */
/**
 * @typedef {Object} AiOptions  AI输入选项
 * @property {string} response_format 云端模型输出格式，默认："text"，可选 "json_object" JSON格式
 * @property {number} temperature  模型温度，默认：0.75，取值范围 [0-2).
 * @property {boolean} enable_search   false|true  联网搜素开关，默认关闭，开启增加token消耗。开启后，只会根据问题自动判断是否联网，可以在问题中添加联网搜素关键词，如："联网搜素：xxxx"
 */
/**
 * 小瓶RPA整合的云端大语言答案生成模型
 * @param {string} question 提问问题，如：'今天是xx日，你能给我写首诗吗？'
 * @param {number} modelLevel 模型等级，不同参数大小不同定价，默认 0 为标准模型。0为低价模型；1为性价比模型；2为旗舰高智能模型；
 * @param {AiOptions} options AI输入选项
 * @returns {Answerinfo} JSON内容格式 {content:'结果',tokens:消耗token的数量}
 */
function cloud_GPT(question, modelLevel = 0, options = {
    response_format: 'text',
    temperature: 0.75,
    enable_search: false,
}) {
    let deviceToken = deviceID()
    if (question.length < 3) {
        console.log('❌ 错误', '问题过短，请输入至少2个字符')
        exit()
    }
    let rs = postJson('https://rpa.pbottle.com/API/', { question, deviceToken, modelLevel, options })
    // console.log(rs);
    let json = JSON.parse(rs)
    if (json.error) {
        console.log('❌ 错误', json.error)
        exit()
    }
    return json
}
exports.cloud_GPT = cloud_GPT
exports.cloud.GPT = cloud_GPT


/**
 * 小瓶RPA整合的云端图像分析大模型
 * @param {string} question 提问问题，如：'分析这个图片的内容'
 * @param {string} imagePath 上传图片的路径，如：'c:/test.jpg'
 * @param {number} modelLevel 模型等级，不同参数大小不同定价，默认 0 为标准模型。
 * @returns {Answerinfo} JSON内容格式 {content:'结果',tokens:消耗token的数量}
 */
function cloud_GPTV(question, imagePath, modelLevel = 0) {
    let deviceToken = deviceID()
    imagePath = path.resolve(imagePath)

    if (!fs.existsSync(imagePath)) {
        console.log('❌ 输入分析图片不存在：cloud_GPTV')
        exit()
    }

    let tempJsonFile = homePath + '/cloud_GPTV.json'

    let image_base64 = fs.readFileSync(imagePath).toString('base64')
    fs.writeFileSync(tempJsonFile, JSON.stringify({ question, deviceToken, modelLevel, image_base64 }))

    let rs = postJsonFile('https://rpa.pbottle.com/API/gptv', tempJsonFile);
    let json = JSON.parse(rs)
    if (json.error) {
        console.log('❌ 错误 cloud_GPTV', json.error, rs)
        exit()
    }
    return json
}
exports.cloud_GPTV = cloud_GPTV
exports.cloud.GPTV = cloud_GPTV


/**
 * 小瓶RPA整合的云端图像分析大模型，直接操作屏幕
 * @param {string} action  '点击'|'双击'|'右键'
 * @param {string} question 提问问题，如：'分析这个图片的内容'
 * @returns
 */
function cloud_GPTA(action = '点击', question = "桌面微信图标") {
    let deviceToken = deviceID()

    let tempScreenShoot = homePath + '/cloud_GPT_do.png'
    let tempJsonFile = homePath + '/cloud_GPTV.json'

    screenShot(tempScreenShoot)

    let image_base64 = 'data:image/png;base64,' + fs.readFileSync(tempScreenShoot).toString('base64')

    fs.writeFileSync(tempJsonFile, JSON.stringify({ question, deviceToken, image_base64 }))

    let rs = postJsonFile('https://rpa.pbottle.com/API/gpta', tempJsonFile);
    let json = JSON.parse(rs)
    if (json.error) {
        console.log('❌ 错误 cloud_GPTA', json.error, rs)
        exit()
    }
    console.log(json);
    let boxs = json.content.split('\n')
    for (let index = 0; index < boxs.length; index++) {
        const box = boxs[index];
        if (!box) {
            continue
        }
        let box4 = JSON.parse(box)
        let resolution = getResolution()
        box4[0] = box4[0] / 1000 * resolution.w
        box4[1] = box4[1] / 1000 * resolution.h
        box4[2] = box4[2] / 1000 * resolution.w
        box4[3] = box4[3] / 1000 * resolution.h

        showRect(box4[0], box4[1], box4[2] - box4[0], box4[3] - box4[1], 'green')


        let x = Math.round((box4[0] + box4[2]) / 2)
        let y = Math.round((box4[1] + box4[3]) / 2)
        console.log(question + '的位置', x, y);
        moveMouseSmooth(x, y)

        if (action == '点击') {
            mouseClick('left')
        } else if (action == '双击') {
            mouseDoubleClick()
        } else if (action == '右键') {
            mouseClick('right')
        }

    }


}
exports.cloud_GPTA = cloud_GPTA
exports.cloud.GPTA = cloud_GPTA


/**
 *  小瓶RPA 浏览器增强命令
 *  注意：
 *  ①此模块不是必须模块 
 *  ②此模块功能需要安装小瓶RPA浏览器增强插件：https://rpa.pbottle.com/a-13942.html
 */
exports.browserCMD = {}

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 警告框
 * @param {string} msg 显示文本内容
 * @returns {string} 正常返回 'ok'
 */
var browserCMD_alert = function (msg) {
    let action = 'alert';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_alert = browserCMD_alert;
exports.browserCMD.alert = browserCMD_alert


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 关闭浏览器标签页。打开新标签页用 pbottleRPA.openURL()
 * @param {string} 关闭类型  'current':默认关闭当前标签页; 'other':关闭其他标签页
 * @returns {string} 正常返回 'ok'
 */
var browserCMD_closeTab = function (type = 'current') {
    let action = 'closeTab';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_closeTab = browserCMD_closeTab
exports.browserCMD.closeTab = browserCMD_closeTab


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * fetch请求网址，返回响应结果  https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 * 默认 20 秒超时
 * @param {string} fetch_url 网址
 * @param {object} options 请求参数
 * @returns {string} 响应结果
 */
var browserCMD_fetch = function (fetch_url, options = {}) {
    let action = 'fetch';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_fetch = browserCMD_fetch
exports.browserCMD.fetch = browserCMD_fetch

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 等待页面加载完成，返回页面网址
 * 默认 20 秒超时
 * @param {string} readyURL  页面加载完成后的网址
 * @param {number} timeout 超时时间，单位秒
 * @returns {string}  返回当前浏览器的url网址 或者错误退出
 */
var browserCMD_waitPageReady = function (readyURL,timeout = 20) {

    let url = `${CppUrl}?action=getWebReadyPage`
    for (let index = 0; index < timeout; index++) {
        let res = getHtml(url)
        // console.log("结果：",res);
        if (res == readyURL) {
            return res
        }else{
            sleep(1000);
            console.log(`等待页面加载完成...`);
        }
    }
    exit('❌ waitPageReady 错误', '等待页面加载超时')
}
exports.browserCMD_waitPageReady = browserCMD_waitPageReady
exports.browserCMD.waitPageReady = browserCMD_waitPageReady

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * @param {string} urlStr 当前网页转向新网址，默认为空获取当前网址   【小瓶RPA浏览器增强插件V2023.8以上生效】
 * @returns {string}  返回当前浏览器的url网址 或者 ok
 */
var browserCMD_url = function (urlStr = undefined) {
    let action = 'url';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_url = browserCMD_url;
exports.browserCMD.url = browserCMD_url


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 元素数量   参考 jQuery 选择器 
 * @param {string} selector   元素选择器
 * @returns {number}  返回选择元素的数量，最优的选择结果是1
 */
var browserCMD_count = function (selector) {
    let action = 'count';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    let resStr = res
    if (isNumeric(resStr)) {
        return parseInt(resStr)
    } else {
        return 0
    }
}
exports.browserCMD_count = browserCMD_count;
exports.browserCMD.count = browserCMD_count


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 模拟点击   参考 jQuery click() 方法，改为浏览器 native 的 click() 并自动获取焦点
 * @param {string} selector   元素选择器。如果选择多个元素，只触发第一个元素的click事件
 * @param {object} options 点击选项  可选  如：{ bubbles: false, ctrlKey: true} https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent
 * @returns {string}
 */
var browserCMD_click = function (selector) {

    let action = 'click';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_click = browserCMD_click;
exports.browserCMD.click = browserCMD_click;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 模拟双击   参考 jQuery dblclick() 方法，改为浏览器 native 的 click() 并自动获取焦点
 * @param {string} selector   元素选择器。如果选择多个元素，只触发第一个元素的click事件
 * @param {object} options 点击选项  可选  如：{ bubbles: false,  ctrlKey: true} https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent
 * @returns {string}
 */
var browserCMD_dblclick = function (key) {

    let action = 'dblclick';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_dblclick = browserCMD_dblclick;
exports.browserCMD.dblclick = browserCMD_dblclick;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 显示元素   参考 jQuery show() 方法 
 * @param {string} selector   元素选择器
 * @returns {string}
 */
var browserCMD_show = function (selector) {

    let action = 'show';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_show = browserCMD_show;
exports.browserCMD.show = browserCMD_show;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 隐藏元素   参考 jQuery hide() 方法 
 * @param {string} selector   元素选择器
 * @returns {string}
 */
var browserCMD_hide = function (selector) {

    let action = 'hide';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_hide = browserCMD_hide;
exports.browserCMD.hide = browserCMD_hide;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展   2024.0 以上版本生效
 * 获取元素定位，相对浏览器文档左上角   参考 jQuery offset() 方法 
 * @param {string} selector   元素选择器
 * @returns {{left:number,top:number}}  返回 json:{"left":100,"top":100} 位置位元素的左上角顶点坐标
 */
var browserCMD_offset = function (selector) {

    let action = 'offset';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return JSON.parse(res)
}
exports.browserCMD_offset = browserCMD_offset;
exports.browserCMD.offset = browserCMD_offset;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 移除元素   参考 jQuery remove() 方法 
 * @param {string} selector   元素选择器
 * @returns {string}
 */
var browserCMD_remove = function (selector) {

    let action = 'remove';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_remove = browserCMD_remove;
exports.browserCMD.remove = browserCMD_remove;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或者设置文本   参考 jQuery text() 方法
 * @param {string} selector  元素选择器
 * @param {string} content 可选
 * @returns {string} 选择多个元素时会返回一个数组
 */
var browserCMD_text = function (selector, content = undefined) {

    let action = 'text';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res

}
exports.browserCMD_text = browserCMD_text;
exports.browserCMD.text = browserCMD_text;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或者设置html   参考 jQuery html() 方法
 * @param {string} selector  元素选择器
 * @param {string} content  可选
 * @returns {string} 选择多个元素时会返回一个数组
 */
var browserCMD_html = function (selector, content = undefined) {

    let action = 'html';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res

}
exports.browserCMD_html = browserCMD_html;
exports.browserCMD.html = browserCMD_html;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置值 input select等   参考 jQuery val() 方法
 * @param {string} selector  元素选择器
 * @param {string} content  可选，值
 * @returns {string} 选择多个元素时会返回一个数组
 */
var browserCMD_val = function (selector, content = undefined) {

    let action = 'val';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res

}
exports.browserCMD_val = browserCMD_val;
exports.browserCMD.val = browserCMD_val;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置当前站点的 cookie
 * @param {string} cName  cookie 名称 
 * @param {string} cValue cookie 值  留空为获取cookie的值
 * @param {number} expDays cookie 过期时间，单位：天, 留空为会话cookie
 * @returns {string} 返回 cookie的值
 */
var browserCMD_cookie = function (cName, cValue = undefined, expDays = undefined) {

    let action = 'cookie';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res
}
exports.browserCMD_cookie = browserCMD_cookie;
exports.browserCMD.cookie = browserCMD_cookie

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置css样式   参考 jQuery css() 方法
 * @param {string} selector  元素选择器
 * @param {string} propertyname 名
 * @param {string} value 值
 * @returns 
 */
var browserCMD_css = function (selector, propertyname, value = undefined) {

    let action = 'css';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res

}
exports.browserCMD_css = browserCMD_css;
exports.browserCMD.css = browserCMD_css

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置attr属性   参考 jQuery attr() 方法
 * @param {string} selector 元素选择器
 * @param {string} propertyname 属性名
 * @param {string} value 值
 * @returns {string}
 */
var browserCMD_attr = function (selector, propertyname, value = undefined) {

    let action = 'attr';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res

}
exports.browserCMD_attr = browserCMD_attr;
exports.browserCMD.attr = browserCMD_attr

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置prop属性   参考 jQuery prop() 方法
 * @param {string} selector 元素选择器
 * @param {string} propertyname 属性名
 * @param {string} value 值
 * @returns {string}
 */
var browserCMD_prop = function (selector, propertyname, value = undefined) {

    let action = 'prop';
    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({ action, args }))
    let res = getHtml(url)
    return res

}
exports.browserCMD_prop = browserCMD_prop;
exports.browserCMD.prop = browserCMD_prop


/**
 * 等待屏幕上的图片出现
 * @param {string} tpPath 图片模板路径 相对路径：./image/123.png
 * @param {Function} intervalFun 检测间隔的操作，function格式
 * @param {number} timeOut 可选，等待超时时间 单位秒 默认30秒
 * @param {number} miniSimilarity  可选，指定最低相似度，默认0.85。取值0-1，1为找到完全相同的。
 * @returns {position|boolean} 结果的位置信息，json格式：{x,y}  相对于屏幕左上角原点
 */
function waitImage(tpPath, intervalFun = () => { }, timeOut = 30, miniSimilarity = 0.85) {
    console.log('waitImage', tpPath);
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let position = findScreen(tpPath, miniSimilarity)
        if (position !== false) {
            return position;
        }
        if (typeof intervalFun === 'function' && intervalFun() == 'stopWait') {
            console.log('stopWait from intervalFun');
            return false
        }
    }
    //debug 保存当前屏幕
    console.log('已经保存超时截图到：我的图片');
    screenShot();
    //error
    let frame = new Error().stack.split("\n")[2]; // change to 3 for grandparent func
    exit(`等待图片超时 ${tpPath}  ${frame}`)
}
exports.waitImage = waitImage;
exports.等待图像出现 = waitImage;

/**
 * 等待屏幕上的图片消失
 * @param {string} tpPath 图片模板路径  相对路径：./image/123.png
 * @param {function} intervalFun 检测间隔的操作，function格式
 * @param {number} timeOut 可选，等待超时时间 单位秒 默认30秒
 * @param {number} miniSimilarity  可选，指定最低相似度，默认0.85。取值0-1，1为找到完全相同的。
 * @returns  {string|boolean}
 */
function waitImageDisappear(tpPath, intervalFun = () => { }, timeOut = 30, miniSimilarity = 0.85) {
    console.log('waitImageDisappear', tpPath);
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let position = findScreen(tpPath, miniSimilarity)
        if (position === false) {
            return 'ok';
        }
        if (typeof intervalFun === 'function' && intervalFun() == 'stopWait') {
            console.log('stopWait from intervalFun');
            return false
        }
    }
    //debug 保存当前屏幕
    console.log('已经保存超时截图到：我的图片');
    screenShot();
    //error
    let frame = new Error().stack.split("\n")[2]; // change to 3 for grandparent func
    exit(`等待图片消失超时 ${tpPath} ${frame}`)
}
exports.waitImageDisappear = waitImageDisappear;
exports.等待图像消失 = waitImageDisappear;

/**
 * 等待文件下载成功或者生成
 * @param {string} dirPath 监控文件夹目录  如：'c:/User/pbottle/download'
 * @param {string} keyWords 过滤关键词  如：'.zip'
 * @param {function} intervalFun 检测间隔的操作，function格式
 * @param {number} timeOut 等待超时时间 单位秒
 * @returns  {string[]}
 */
function waitFile(dirPath, keyWords = '', intervalFun = () => { }, timeOut = 30) {
    console.log('waitFile', dirPath, keyWords);
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let rs = searchFile(dirPath, keyWords)
        if (hasData(rs)) {
            return rs;
        }
        if (typeof intervalFun === 'function' && intervalFun() == 'stopWait') {
            console.log('stopWait from intervalFun');
            return false
        }
    }
    //error
    let frame = new Error().stack.split("\n")[2]; // change to 3 for grandparent func
    exit(`等待文件超时： ${dirPath} ${frame}`)
}
exports.waitFile = waitFile;
exports.等待文件 = waitFile;


/**
 * 等待文件消失或者被删除
 * @param {string} dirPath 监控文件夹目录  如：'c:/User/pbottle/download'
 * @param {string} keyWords 过滤关键词  如：'.crdownload'
 * @param {function} intervalFun 检测间隔的操作，function格式
 * @param {number} timeOut 等待超时时间 单位秒
 * @returns  {string[]}
 */
function waitFileDisappear(dirPath, keyWords = '', intervalFun = () => { }, timeOut = 30) {
    console.log('waitFileDisappear', dirPath, keyWords);
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let rs = searchFile(dirPath, keyWords)
        if (!hasData(rs)) {
            return true;
        }
        if (typeof intervalFun === 'function' && intervalFun() == 'stopWait') {
            console.log('stopWait from intervalFun');
            return false
        }
    }
    //error
    let frame = new Error().stack.split("\n")[2]; // change to 3 for grandparent func
    exit(`等待文件错误： ${dirPath} ${frame}`)
}
exports.waitFileDisappear = waitFileDisappear;
exports.等待文件消失 = waitFileDisappear;



/**
 * 等待输入 V2026.0.0 新增
 * @param {string} inputPrompt 输入提示词
 * @param {number} timeOut 可选，等待超时时间 单位秒 默认600秒
 * @returns {string}  输入内容  默认返回空字符串
 */
function waitInput(inputPrompt = '输入提示词', timeOut = 600) {
    console.log('waitInput 等待用户输入：', inputPrompt);
    inputPrompt = encodeURIComponent(inputPrompt)
    let url = `${CppUrl}?action=waitInput&inputPrompt=${inputPrompt}`
    let res = getHtml(url)
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let rs = getHtml(`${CppUrl}?action=waitInputResult`)
        if (hasData(rs)) {
            showMsg('用户输入了：', rs)
            return rs;
        } else {
            continue;
        }
    }
}
exports.waitInput = waitInput;
exports.等待输入 = waitInput;

/**
 *  小瓶RPA 硬件键鼠模拟接口
 *  注意：
 *  ①此模块不是必须模块 
 *  ②此模块功能需要添加电脑硬件外设，购买装配请咨询小瓶RPA客服
 */
exports.hid = {}
/**
 * 模拟按键触发事件 (硬件级)
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 * @param {string} upDown  默认按下down，up松开按键
 * @returns 
 */
let hid_keyToggle = (key, upDown) => {
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = keycode(key)
    if (key_n === undefined) {
        console.log(`⚠ 按键 ${key} 不存在！~`);
        return
    }
    let url = `${CppUrl}?action=keyToggleHardWare&key_n=${key_n}&upDown_n=${upDown_n}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.hid.keyToggle = hid_keyToggle

/**
 * 按一下键盘（硬件级）   支持组合按键 加号连接 如：  keyTap('ctrl + alt + del')
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 */
let hid_keyTap = (key) => {
    if (key.includes('+')) {
        let subkeys = new Array();
        subkeys = key.split('+')
        subkeys = subkeys.map((value) => {
            return value.trim()
        })
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            hid_keyToggle(element, "down")
        }

        subkeys = subkeys.reverse()
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            hid_keyToggle(element, "up")
        }

    } else {
        hid_keyToggle(key, "down")
        hid_keyToggle(key, "up")
    }
    sleep(defaultDelay);
}
exports.hid.keyTap = hid_keyTap


/**
 * 基础鼠标命令  全部为零释放
 * @param {number} button 按键  1，2，4 代表鼠标的 左键，右键，中键。
 * @param {number} x 按键时候移动的位置，绝对位置  x=100：向右移动 100像素，负数向左
 * @param {number} y 按键时候移动的位置，拖拽相对位置  y=100：向下移动 100像素，负数向上
 * @param {number} mouseWheel 滚动齿轮数  正数向下，负数向下
 * @param {number} time 按下到释放时间
 * @returns 
 */
let hid_mouseCMD = (button = 1, x = 0, y = 0, mouseWheel = 0, time = 10) => {
    let url = `${CppUrl}?action=mouseDataHardWare&bt=${button}&x=${x}&y=${y}&wheel=${mouseWheel}&time=${time}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}

/**
 * 移动鼠标到指定位置  起点为屏幕左上角  屏幕绝对位置（硬件分辨率）
 * @param {number} x   横坐标
 * @param {number} y   纵坐标
 * @returns 
 */
let hid_moveMouse = (x, y) => {
    hid_mouseCMD(0, x, y, 0, 10)
}
exports.hid.moveMouse = hid_moveMouse


/**
 * 当前位置点击鼠标 默认左键  
 * @param {string} 鼠标的按键选择 left right middle 可选  ，默认左键
 * @param {number} 点按时间 单位毫秒 可选
 * @returns 
 */
let hid_mouseClick = (button = 'left', time = 10) => {
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
    hid_mouseCMD(bt, 0, 0, 0, time)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseClick = hid_mouseClick


/**
 * 移动鼠标到指定位置并点击
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 */
let hid_moveAndClick = (x, y) => {
    hid_moveMouse(x, y)
    hid_mouseClick()
}
exports.hid.moveAndClick = hid_moveAndClick

/**
 * 双击鼠标  左键
 * @returns 
 */
let hid_mouseDoubleClick = () => {
    hid_mouseCMD(1, 0, 0, 0, 10)
    hid_mouseCMD(0, 0, 0, 0, 0)
    hid_mouseCMD(1, 0, 0, 0, 10)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseDoubleClick = hid_mouseDoubleClick

/**
 * 鼠标左键拖到一段位置
 * @param {number} x  位置
 * @param {number} y  位置
 * @returns 
 */
let hid_mouseLeftDragTo = (x, y) => {
    hid_mouseCMD(1, 0, 0, 0, 10)
    hid_mouseCMD(1, x, y, 0, 10)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseLeftDragTo = hid_mouseLeftDragTo

/**
 * 鼠标左键拖到一段位置
 * @param {number} x  位置
 * @param {number} y  位置
 * @returns 
 */
let hid_mouseRightDragTo = (x, y) => {
    // use hid_mouseCMD (hardware mouse command) instead of undefined mouseCMD
    hid_mouseCMD(2, 0, 0, 0, 10)
    hid_mouseCMD(2, x, y, 0, 10)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseRightDragTo = hid_mouseRightDragTo


/**
 * 鼠标滚轮
 * @param {number} data 滚动的量  默认为-1   向下滚动一个齿轮;  正数向上滚动；
 * @returns 
 */
let hid_mouseWheel = (data = -1) => {
    hid_mouseCMD(0, 0, 0, data, 0)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseWheel = hid_mouseWheel


/**
 * 公共工具类，一般和模拟操作没有直接关系的方法。  用法：pbottleRPA.utils.function(parameters) or pbottleRPA.function(parameters)
 * 持续添加常用工具，为流程提供快捷方法。
 */
exports.utils = {}
exports.工具箱 = {}

/**
 * 常用工具
 * 判断是否为数字化变量（包含数字化的字符串）

 * @param {*} value 任意类型变量
 * @returns {boolean}
 */
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
exports.isNumeric = isNumeric;
exports.是否数字 = isNumeric;
exports.utils.isNumeric = isNumeric;
exports.工具箱.是否数字 = isNumeric;

/**
 * 常用工具
 * 判断变量中是否有数据，直接if()可用。
 * 非零数字 或 非空字符串、数组、对象 返回 true，其他都返回 false
 * @param {*} value 任意类型变量
 * @returns {boolean}
 */
function hasData(value) {
    // console.log(value);
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string' && value.trim().length === 0) {
        return false;
    }
    if (Array.isArray(value) && value.length === 0) {
        return false;
    }
    if (typeof value === 'number' && (value === 0 || isNaN(value))) {
        return false;
    }
    if (typeof value === 'bigint' && value === 0n) {
        return false;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'symbol' || typeof value === 'function') {
        return false;
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return false;
    }
    return true;
}
exports.hasData = hasData;
exports.是否有内容 = hasData;
exports.utils.hasData = hasData;
exports.工具箱.是否有内容 = hasData;

/**
 * 常用工具
 * 格式化的时间  getTime('Y-m-d H:i:s') 输出类似 "2023-09-17 14:30:45" 的日期时间字符串
 * @param {string} format 格式参考 https://www.runoob.com/php/php-date.html  仅支持 Y|y|m|d|H|i|s|n|j
 * @param {number} timestamp 时间戳秒
 * @returns {string}
 */
function getTime(format = 'Y-m-d H:i:s', timestamp = null) {

    // 如果没有提供 timestamp，使用当前时间  
    const date = timestamp ? new Date(timestamp * 1000) : new Date();

    // 映射 PHP 的日期格式到 JavaScript 的日期方法  
    const formatMap = {
        'Y': date.getFullYear(),         // 4位数的年份  
        'y': (date.getFullYear() % 100).toString().padStart(2, '0').slice(-2), // 2位数的年份 
        'm': ('0' + (date.getMonth() + 1)).slice(-2), // 月份，01-12  
        'd': ('0' + date.getDate()).slice(-2),        // 日期，01-31  
        'H': ('0' + date.getHours()).slice(-2),       // 24小时制的小时，00-23  
        'i': ('0' + date.getMinutes()).slice(-2),     // 分钟，00-59  
        's': ('0' + date.getSeconds()).slice(-2),     // 秒，00-59  
        'n': date.getMonth() + 1,           // 月份，1-12，没有前导零  
        'j': date.getDate(),                // 日期，1-31，没有前导零
    };
    // 替换格式字符串中的占位符  
    return format.replace(/Y|y|m|d|H|i|s|n|j/g, (matched) => formatMap[matched]);
}
exports.getTime = getTime;
exports.获取格式化时间 = getTime;
exports.utils.getTime = getTime;
exports.工具箱.获取格式化时间 = getTime;


/**
 * 常用工具
 * 根据关键字定位具体文件
 * @param {string} directory  目录绝对路径
 * @param {string} words  文件名包含的关键字，过滤词，默认忽略大小写
 * @param {boolean} recursive  是否递归深入目录子目录查找 ，默认false
 * @returns {string[]}  文件路径 || [] 未找到
 */
function searchFile(directory, words = '', recursive = false) {
    let rs = []  //全局结果
    // 读取目录内容
    directory = path.resolve(directory)
    let files = fs.readdirSync(directory)
    // console.log('files',files);
    // 遍历每个文件
    words = words.toLowerCase()
    files.forEach((file) => {
        let filePath = path.resolve(directory, file);
        if (recursive) {  //判断子目录
            let stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                rsTemp = searchFile(filePath, words, recursive)
                rs.push(...rsTemp)
            }
        }
        // console.log(filePath);
        if (filePath.toLowerCase().includes(words)) {
            rs.push(filePath)
        }
    });
    return rs;
}
exports.searchFile = searchFile;
exports.搜索文件 = searchFile;
exports.utils.searchFile = searchFile;
exports.工具箱.搜索文件 = searchFile;



/**
 * 常用工具
 * 生成唯一符串 注意：默认只是毫秒级的
 * @param {string} prefix 前缀
 * @param {boolean} moreEntropy  是否开启更精细的随机，如果还不能满足请使用uuid
 * @returns {string}
 */
function uniqid(prefix = '', moreEntropy = false) {
    let timestamp = Date.now().toString(36); // 将时间戳转换为36进制  
    let randomStr = '';
    if (moreEntropy) {
        // 如果需要更多的熵，则添加一些随机字符  
        randomStr = Math.random().toString(36).substring(2);
    }
    return prefix + timestamp + randomStr;
}
exports.uniqid = uniqid;
exports.唯一数 = uniqid;
exports.utils.uniqid = uniqid;
exports.工具箱.唯一数 = uniqid;



/**
 * 常用工具
 * 根据起始关键词，截取一部分字符串
 * @param {string} str 检索目标
 * @param {string} from 开始关键词 不包含本身  空表示从头部开始
 * @param {string} to 结束关键词  不包含本身   空表示到结尾结束
 * @returns  {string}
 */
function substringFromTo(str, from = '', to = '') {
    let fromIndex = str.indexOf(from) + from.length
    let toIndex = str.lastIndexOf(to)
    if (fromIndex == -1 || toIndex == -1) {
        console.log('⚠substringFromTo 没有关键词:', from, to);
        return ''
    }
    if (!from) {
        fromIndex = 0
    }
    if (!to) {
        toIndex = str.length
    }
    let rs = str.substring(fromIndex, toIndex);
    return rs
}
exports.substringFromTo = substringFromTo
exports.截取文本 = substringFromTo
exports.utils.substringFromTo = substringFromTo
exports.工具箱.截取文本 = substringFromTo




//检测入口文件
if (process.argv[1] === __filename) {
    console.log('当前文件不能执行', "请直接执行中文名的脚本文件");
    showMsg('当前文件不能执行', "请直接执行中文名的脚本文件");
    process.exit(1);
}

//检测 win10  以下系统 curl 命令是否存在
const isWindows = process.platform === 'win32';
let command;
if (isWindows) {
    command = 'where curl';
} else {
    command = 'which curl';
}

try {
    childProcess.execSync(command, { encoding: 'utf8' });
} catch (error) {
    console.log('⚠️ 系统 curl 命令不存在，使用集成 curl');
    curlCommand = basePath + '/bin/curl.exe';
    // process.exit(1);
}


