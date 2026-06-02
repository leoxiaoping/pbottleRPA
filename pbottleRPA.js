/**
 *  pbottle RPA Standard Library API  NodeJS Version
 *  Official site: https://officetool.online/pbottle-rpa/
 *  Author: leo@pbottle.com
 *  
 *  Welcome to port this code to python, lua, C# and other languages
 * 
 */

const path = require("node:path");
const fs = require("node:fs");
const os = require('os');
const tls = require('node:tls');
const childProcess = require('node:child_process');

/**
 * Current script path, no trailing /  e.g. 'D:/pbottleRPAdemo'
 */
const jsPath = path.resolve('./');
const CppUrl = `http://127.0.0.1:49888/`
let basePath = process.env.RPAbaseDir; // base service path
let homePath = process.env.RPAhomeDir;
let curlCommand = 'curl';  // prefer system curl, fallback to bundled curl if not found

console.log("Base service address: (NodeJS)", CppUrl);
exports.jsPath = jsPath
exports.basePath = basePath
exports.__dirname = jsPath
exports.目录路径 = jsPath

//node:fs
exports.fs = fs
//node:path
exports.path = path

let defaultDelay = 1000;  // default 1 second
/**
 * Set the delay for RPA simulation operations  includes mouse, keyboard, paste, and open URL actions
 * Set to 0 to manually manage operation delays with sleep()
 * @param {number} millisecond   delay in milliseconds, system default 1000 ms (1 second)
 */
let setDefaultDelay = (millisecond) => {
    defaultDelay = millisecond
}
exports.setDefaultDelay = setDefaultDelay
exports.设置默认操作延时 = setDefaultDelay




/**
 * Emit a system beep sound
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
 * Log output, also generates a file log
 */
exports.log = console.log
exports.日志输出 = console.log


/**
 * System native message prompt
 * @param {string} title  title
 * @param {string} content  content
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
 * (Force) close a specified application
 * @param {string} processName process name, e.g.: 'WINWORD.EXE' as shown in Task Manager 'Process Name' column. Note: not the display name; if not visible, right-click and enable this column
 * @param {boolean} force whether to force close, equivalent to simulating Task Manager's End Task. Default is normal close, which may prompt a save confirmation dialog
 */
let kill = (processName, force = false) => {
    let forceCMD = ''
    if (force) {
        forceCMD = '/F'
    }
    try {
        childProcess.execSync(`taskkill ${forceCMD} /IM ${processName}`, { stdio: 'ignore', encoding: 'utf8' })
    } catch (error) {
        console.error(`Failed to close process (${processName}), the application may not be running`);
        return;
    }
    console.log('Process closed successfully: ' + processName);
}
exports.kill = kill
exports.关闭软件 = kill


/**
 * Display a colored rectangle on the visible screen for intuitive visual feedback of the operation range and current target position
 * Effective for versions >= V2024.6
 * @param {number} fromX  starting X coordinate, origin at top-left of screen
 * @param {number} fromY 
 * @param {number} width  width
 * @param {number} height height
 * @param {string} color  color: red|green|blue|yellow 
 * @param {number} msec  display duration in milliseconds
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
 * Force exit the current script
 * @param {...any} msg message to output on exit
 */
let exit = (...args) => {
    console.log(...args)
    beep()
    process.exit(1)
}
exports.exit = exit
exports.退出流程 = exit


/**
 * Pause script and wait for operation response (milliseconds)
 * Note: maximum single wait is capped at 2 minutes
 * @param {number} milliseconds  milliseconds
 * @returns 
 */
let sleep = (milliseconds) => {
    // childProcess.execSync(` node -e "setTimeout(() => console.log('sleep ${milliseconds} 结束'), ${milliseconds})" `, { stdio: ['ignore', 'ignore', 'ignore'], encoding: 'utf8' })
    if (milliseconds < 1) {
        // console.log('milliseconds input error');
        return;
    }
    milliseconds = Math.floor(milliseconds) // round down to integer
    if (milliseconds >= 120000) {
        console.log('Warning: maximum single wait is capped at 2 minutes');
    }

    milliseconds -= 20  // compensate for millisecond error caused by HTTP request overhead, varies with computer speed
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
 * Pause script and wait for operation response (seconds)
 * Note: waiting over 100s will log a reminder
 * @param {number} seconds  seconds, default 1 second. Supports decimals.
 */
let wait = (seconds = 1) => {
    if (seconds <= 0 || !isNumeric(seconds)) {
        console.log('pbottleRPA.wait：seconds input error');
        return;
    }
    if (seconds > 100) {  // 100 seconds
        let quotient = Math.floor(seconds / 100)
        for (let i = 0; i < quotient; i++) { // every 100 seconds
            sleep(100 * 1000)
            console.log(`Hint: already waited 100s...`);
        }
        seconds = seconds % 100;
        sleep(seconds * 1000)
    } else {
        sleep(seconds * 1000)
    }
}
exports.wait = wait
exports.等待 = wait

/**
 * Move the mouse smoothly to the specified position  origin at top-left of screen
 * @param {number} x   horizontal coordinate
 * @param {number} y   vertical coordinate
 * @param {number} interval  pixel interval time in ms, larger = slower movement, default: 0
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
exports.moveMouse = moveMouseSmooth  // add alias
exports.鼠标移动 = moveMouseSmooth


/**
 * Move mouse to the specified position and click
 * @param {number} x horizontal coordinate
 * @param {number} y vertical coordinate
 */
let moveAndClick = (x, y) => {
    // call local functions directly instead of using `this` which may not refer to module exports
    moveMouseSmooth(x, y)
    mouseClick()
}
exports.moveAndClick = moveAndClick
exports.鼠标移动并点击 = moveAndClick


/**
 * Click mouse at current position  default left button, optional 'right'
 * @param {string} leftRight    optional
 * @param {number} time press duration in milliseconds  optional
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
 * Double-click mouse  default left button
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
 * Mouse scroll wheel
 * @param {number} data scroll amount  default -720 (scroll down 720 degrees)
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
 * Left mouse button drag to specified position
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
 * Right mouse button drag to specified position
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
 * Get the color of a pixel on the screen
 * @param {number} x 
 * @param {number} y 
 * @returns {string} returns color value e.g.: '#000000'
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
 * Take a screenshot
 * @param {string} savePath  default save path: My Pictures, format is PNG; if using a custom path, end with '.png'
 * @param {number} x   screenshot start X
 * @param {number} y 
 * @param {number} w   optional screenshot width
 * @param {number} h   optional screenshot height
 * @returns 
 */
let screenShot = (savePath = '', x = 0, y = 0, w = -1, h = -1) => {

    if (savePath) { // normalize path
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
 * Convert key name to key code
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
 * Simulate keyboard key basic event
 * @param {string} key  key name reference: https://officetool.online/a-321.html
 * @param {string} "up" or "down"  default down (press). up releases the key
 * @returns 
 */
let keyToggle = (key, upDown = 'down') => {
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = keycode(key)
    if (key_n === undefined) {
        console.log(`⚠ Key ${key} does not exist!~`);
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
 * Simulate mouse button basic event
 * @param {string} key   mouse left | right | middle  
 * @param {string} "up" or "down"  default down (press). up releases the button
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
 * Press a key on the keyboard   supports key combinations with plus sign, e.g.: keyTap('ctrl + a')
 * @param {string} key  key name reference: https://officetool.online/a-321.html
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
            // keyToggle(element,"up")  // cleanup reset
            keyToggle(element, "down")
        }

        subkeys = subkeys.reverse()
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            keyToggle(element, "up")
        }
    } else {
        // keyToggle(key,"up")  // cleanup reset
        keyToggle(key, "down")
        keyToggle(key, "up")
    }

    sleep(defaultDelay);
}
exports.keyTap = keyTap
exports.键盘按键 = keyTap


/**
 * Find an image on the screen and locate it
 * @param {string|Array} tpPaths search image(s), PNG format recommended  relative path: ./image/123.png
 * @param {number} miniSimilarity optional, minimum similarity threshold, default 0.85. Range 0-1, 1 = exact match.
 * @param {number} fromX=0 optional, search start X coordinate
 * @param {number} fromY=0 optional, search start Y coordinate
 * @param {number} width=-1 optional, search width
 * @param {number} height=-1 optional, search height
 * @returns {{x:number,y:number}|false} returns found result in JSON format: {x,y} relative to top-left origin
 */
var findScreen = (tpPaths, miniSimilarity = 0.85, fromX = 0, fromY = 0, width = -1, height = -1) => {

    if (fromX < 0 || fromY < 0) {
        throw new Error(`Error: search start point cannot be negative, x:${fromX} y:${fromY} `);
    }

    if (fromX != 0 || fromY != 0 || width != -1 || height != -1) {
        showRect(fromX, fromY, width, height);
    }

    tpPaths = Array.isArray(tpPaths) ? tpPaths : [tpPaths]
    console.log(tpPaths);
    
    
    for (let index = 0; index < tpPaths.length; index++) {
        let tpPath = tpPaths[index];
        tpPath = path.resolve(tpPath)
        tpPath = encodeURIComponent(tpPath)
        let url = `${CppUrl}?action=findScreen&imgPath=${tpPath}&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}`
        // console.log(url)
        let res = getHtml(url)

        // console.log(res.getBody('utf8'));
        let jsonRes = JSON.parse(res);

        // console.log(tpPath);
        // console.log(jsonRes);

        if (jsonRes.error) {
            console.log(jsonRes.error);
            return false;
        }
        if (jsonRes.value >= miniSimilarity) {
            showRect(jsonRes.x - 25, jsonRes.y - 25, 50, 50, 'green');
            return jsonRes;
        }
    }
    return false;
}
exports.findScreen = findScreen
exports.寻找图像 = findScreen


/**
 * Find text on screen. Note: performance depends on computer specs; may be slow on low-end machines. Requires pbottle RPA client version > V2024.5
 * @param {string} inputTxt 
 * @param {number} fromX=0 optional, search start X coordinate
 * @param {number} fromY=0 optional, search start Y coordinate
 * @param {number} width=-1 optional, search width
 * @param {number} height=-1 optional, search height
 * @returns {{x:number,y:number,text:string}|false}  returns JSON result: {x,y,text} x,y coordinates relative to top-left origin of screen
 */
var findText = (inputTxt, fromX = 0, fromY = 0, width = -1, height = -1) => {
    let jsonDatas = aiOcr('screen', fromX, fromY, width, height);
    // console.log(jsonDatas);
    let result = false;  
    jsonDatas.forEach(element => {
        // console.log(element.text);
        if (element.text.includes(inputTxt)) {
            result = element
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
 * Wait for specified text to appear on screen
 * @param {string} inputTxt text to search for
 * @param {number} fromX optional, search start X coordinate
 * @param {number} fromY optional, search start Y coordinate
 * @param {number} width optional, search width
 * @param {number} height optional, search height
 * @param {function} intervalFun callback function for mid-wait check; returns 'stopWait' to stop waiting
 * @param {number} timeOut timeout in seconds
 * @returns 
 */
var waitText = (inputTxt, fromX = 0, fromY = 0, width = -1, height = -1,intervalFun = () => {}, timeOut = 20) => {
    console.log('waiting Text：', inputTxt);
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let position = findText(inputTxt, fromX, fromY, width, height)
        if (position !== false) {
            return position;
        }
        if (typeof intervalFun === 'function' && intervalFun() == 'stopWait') {
            console.log('stopWait from intervalFun');
            return false
        }
    }
    // debug: save current screen
    console.log('Timeout screenshot saved to: My Pictures');
    screenShot();
    // error
    throw new Error(`Wait text timeout: ${inputTxt}`);
}

exports.waitText = waitText
exports.等待文字 = waitText


/**
 * Find objects or window contours on screen
 * Debug: a debug/findContours.png file will be generated in the software root directory
 * 
 * @param {number} minimumArea minimum contour area, default filters out elements below 10x10
 * @param {number} fromX  search start point
 * @param {number} fromY 
 * @param {number} width  search range
 * @param {number} height 
 * @returns {[]} all found contour info, including start coordinate, center coordinate, area, id of each closed region. Format: [{ x: 250, y: 10, cx: 265.5, cy: 30.5, area: 2401, id: 42 },...]  xy relative to origin
 */
var findContours = (minimumArea = 1000, fromX = 0, fromY = 0, width = -1, height = -1) => {

    if (fromX < 0 || fromY < 0) {
        throw new Error(`Error: contour search start point cannot be negative, x:${fromX} y:${fromY} `);
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
 * Paste (input) text at current position
 * @param {string} txt  text to copy to clipboard
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
 * Image similarity comparison  requires pbottle RPA client version > V2025.3
 * @param {string} path1  path to image 1
 * @param {string} path2  path to image 2
 * @param {'SIFT' | 'ORB' | 'SSIM'} checkType  comparison algorithm  default 'ORB'
 * @returns {{score:number, time:number}}  score similarity score 0-1; time elapsed seconds
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
 * Simulate copying text, equivalent to selecting and copying text content  effective for v2025.0+
 * @param {string} txt text content to copy
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
 * Simulate copy file operation, supports file paths and folder paths. After copying, Ctrl+V in target folder to paste. Effective from V2024.7
 * After copying a file, you can paste it in WeChat send window to send the file
 * @param {string} filepath  absolute path
 */
var copyFile = (filepath) => {
    filepath = path.resolve(filepath)
    if (!fs.existsSync(filepath)) {
        console.log('copyFile warning: file path does not exist', filepath);
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
 * Get current system clipboard content. System clipboard supports multiple formats. Effective from V2024.2
 * ①Plain text format: normal copy  e.g. 'pbottleRPA'
 * ②Image format in base64: browser copy image  starts with 'data:image/png;base64,'
 * ③HTML format: browser or DingTalk copy rich text content  starts with '<html>'
 * @returns result text
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
 * POST a JSON to the specified API URL, the most common network interface method
 * @param {string} url API URL 
 * @param {object} msgJson JSON object 
 * @param {object} headersJson request headers JSON object 
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
        throw new Error('postJson curl command error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('postJson curl command failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.postJson = postJson
exports.提交json = postJson

/**
 * POST a JSON file to the specified API URL, suitable for large JSON content
 * @param {string} url API URL 
 * @param {string} msgJsonFile JSON file path 
 * @param {object} headersJson request headers JSON object 
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
        throw new Error('postJsonFile curl command error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('postJsonFile curl command failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.postJsonFile = postJsonFile
exports.提交json文件 = postJsonFile

/**
 * Simple HTTP request, returns the HTML text response
 * @param {string} url URL, GET method
 * @param {object} headersJson  request headers JSON object 
 * @param {string} method  request method: GET, POST, PUT, DELETE or HEAD 
 * @returns {string} response text
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
        throw new Error('getHtml curl command error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('getHtml curl command failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.getHtml = getHtml
exports.请求网址 = getHtml

/**
 * Send email. Note: this method is asynchronous, please refer to the demo
 * @param {string} to  recipient address
 * @param {string} subject email subject
 * @param {string} content email content; plain text, use '\n' for line breaks
 * @param {string} host SMTP server address (e.g.: smtp.qq.com)
 * @param {number} port server port, default 465
 * @param {string} user authentication info (username), usually the sender email address
 * @param {string} pass authentication info (password)
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
            console.log('✅ Connected to SMTP server');
        });
        client.setEncoding('utf8');
        if (user == 'leo191@foxmail.com') {
            content += '\n\n\ Do not use the demo test email for actual business, see: https://developers.google.com/workspace/gmail/imap/imap-smtp'
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
                `From: "pbottleRPA" ${user}`,
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
                    reject(new Error(`SMTP error: ${data.trim()}`));
                    return;
                }
                if (step < commands.length) {
                    const cmd = commands[step++];
                    console.log('➡️ Send:', cmd.split('\r\n')[0]);
                    client.write(cmd + '\r\n');
                } else {
                    client.end();
                    resolve('✅ Email sent successfully');
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
 * Download a file from the network to a local path
 * @param {string} fileUrl URL
 * @param {string} filename local file path
 * @param {object} headersJson  request headers JSON object 
 */
function downloadFile(fileUrl, filename, headersJson = {}) {

    const dirPath = path.dirname(filename);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    filename = path.resolve(filename)
    console.log('Downloading file to:', filename)
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
        throw new Error('downloadFile curl command error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('downloadFile curl command failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.downloadFile = downloadFile
exports.下载文件 = downloadFile

/**
 * Text to Speech (TTS)  voice broadcast
 * Non-blocking
 * @param {string} text content to read aloud
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
 * Open a URL in the default browser
 * @param {string} myurl URL
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
 * Open a file (with default application) or show a folder in File Explorer
 * @param {string} filePath absolute folder path  e.g.: 'c:/input/RPAlogo128.png'  Windows disk path separators must be double '/'
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
 * Get current screen resolution and scaling
 * @returns {{w:number,h:number,ratio:number}} JSON format {w:1920,h:1080,ratio:1.5} ratio is desktop scaling ratio
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
 * OCR text recognition has been upgraded from classic algorithms to AI model prediction, permanently free and works offline
 * 
 * @param {string} imagePath empty or "screen" for the computer screen; or absolute path to a local image
 * @param {number} x optional search start X
 * @param {number} y optional search start Y
 * @param {number} width  optional search width
 * @param {number} height optional search height
 * @returns {{text:string,score:number,x:number,y:number}}  AI OCR recognition JSON results with confidence score and center position  Format: [{text:'A',score:'0.319415',x:100,y:200},...]  xy relative to origin
 */
var aiOcr = (imagePath = "screen", x = 0, y = 0, width = -1, height = -1) => {

    if (!imagePath) {
        imagePath = "screen"
    }

    if (x < 0 || y < 0) {
        throw new Error(`Error: OCR start point cannot be negative, x:${x} y:${y} `);
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
        console.log('⚠', res, 'Please enable it in the software settings');
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
 * AI object detection has been upgraded from classic algorithms to AI model prediction, Enterprise Edition can work offline. Effective for versions >= V2024.8
 * Debug: a debug/Ai_ObjectDetect.png file will be generated in the software root directory
 * 
 * @param {number} minimumScore similarity threshold
 * @param {number} x optional search range
 * @param {number} y optional search range
 * @param {number} width  optional search width
 * @param {number} height optional search height
 * @returns {array}  AI object detection JSON results with confidence score  Format: [{x:100,y:100,width:150,height:150,score:0.86,class:'class name'},...]  xy relative to origin
 */
var aiObject = (minimumScore = 0.5, x = 0, y = 0, width = -1, height = -1) => {

    if (x < 0 || y < 0) {
        throw new Error(`Error: OCR start point cannot be negative, x:${x} y:${y} `);
    }

    if (x != 0 || y != 0 || width != -1 || height != -1) {
        showRect(x, y, width, height);
    }

    let url = `${CppUrl}?action=aiObject&minimumScore=${minimumScore}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    // console.log(url)
    let res = getHtml(url)

    if (res == '物体识别引擎未启动') {
        console.log('⚠', res, 'Please enable it in the software settings');
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
 * Compress folder contents into a zip file   effective for versions >= v2025.0
 * @param {string} directory folder path, absolute path
 * @param {string} zipFilePath zip file path
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
            console.error(`Compression failed`, error);
        }
    }
}
exports.zipDir = zipDir
exports.压缩 = zipDir


/**
 * Extract zip file contents to a specified folder   effective for versions >= v2025.0
 * @param {string} zipFilePath zip file path
 * @param {string} directory folder path, absolute path  default extracts to the zip file's current directory
 */
function unZip(zipFilePath, directory = "") {
    if (!directory) {
        directory = path.dirname(zipFilePath)
    }
    try {
        let filePath = path.resolve(zipFilePath)
        directory = path.resolve(directory)
        let exe = path.resolve(`${basePath}/bin/7za`)
        const os = process.platform;
        if (os === 'linux') {
            exe = '7za'
        }
        childProcess.execSync(`"${exe}" x "${filePath}" -o"${directory}" -aoa`, { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8' })
    } catch (error) {
        console.error(`Decompression failed`, error);
    }
}
exports.unZip = unZip
exports.解压缩 = unZip

/**
 * Get buffer stored content
 * This buffer can be accessed across scripts, only resets on RPA restart, thread-safe for read/write
 * External HTTP access: http://ip:49888/action=bufferGet&n=0 
 * @param {number} n buffer index, 0-9 (10 total)  default: 0 first buffer
 * @returns  {string} returns string
 */
var bufferGet = (n = 0) => {
    let url = `${CppUrl}?action=bufferGet&n=${n}`
    let res = getHtml(url)
    return res;
}
exports.bufferGet = bufferGet


/**
 * Set buffer stored content
 * This buffer can be accessed across scripts, only resets on RPA restart, thread-safe for read/write
 * External HTTP set (POST method): http://ip:49888/action=bufferSet&n=0, content set in POST body
 * @param {string} content content to store, typically JSON, can also be a string
 * @param {number} n buffer index, 0-9 (10 total)  default: 0 first buffer
 * @returns {string} "ok" indicates success
 */
var bufferSet = (content, n = 0) => {
    let url = `${CppUrl}?action=bufferSet&n=${n}`
    let res = postJson(url, content);
    return res;

}
exports.bufferSet = bufferSet


/**
 * Set a chained execution script
 * When the current script ends (whether normally or with an error), this script will be launched automatically.
 * External HTTP set (GET method): http://ip:49888/action=pbottleRPA_delay&path=MyPATH
 * @param {string} scriptPath path to the chained script  e.g.: 'D:/test.mjs'  If empty, clears the currently set chained task.
 * @returns {string} "ok" indicates success
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
 * Get the current device unique ID
 * @returns {string} returns string
 */
function deviceID() {
    let url = `${CppUrl}?action=pbottleRPA_deviceID`
    let res = getHtml(url)
    return res
}
exports.deviceID = deviceID



/**
 * Get
 * @returns {string} returns string
 */
function clusterCenter() {
    let url = `${CppUrl}?action=pbottleRPA_clusterCenter`
    let res = getHtml(url)
    return res
}
exports.clusterCenter = clusterCenter



/**
 *  pbottle RPA Cloud Module, AI Online Large Model
 *  Note:
 *  ①This module is not required. Cloud module does not affect the independent operation of local modules.
 *  ②This module requires login and activation of the cloud module. Due to cost factors, some features require payment/recharge to use.
 */
exports.cloud = {}

/**
 * @typedef {Object} Answerinfo  AI answer result
 * @property {string} content - answer result
 * @property {number} usage - tokens consumed
 */
/**
 * @typedef {Object} AiOptions  AI input options
 * @property {string} response_format cloud model output format, default: "text", optional "json_object" JSON format
 * @property {number} temperature  model temperature, default: 0.75, range [0-2).
 * @property {boolean} enable_search   false|true  web search toggle, default off, enabling increases token consumption. When enabled, the model will determine whether to search based on the question. You can add search keywords in the question, e.g.: "search web: xxxx"
 */
/**
 * pbottle RPA integrated cloud large language model for answer generation
 * @param {string} question question, e.g.: 'Today is xx, can you write me a poem?'
 * @param {number} modelLevel model tier, different sizes have different pricing, default 0 for standard model. 0 = budget model; 1 = value model; 2 = flagship high-intelligence model;
 * @param {AiOptions} options AI input options
 * @returns {Answerinfo} JSON format {content:'result',tokens:tokens consumed}
 */
function cloud_GPT(question, modelLevel = 0, options = {
    response_format: 'text',
    temperature: 0.75,
    enable_search: false,
}) {
    let deviceToken = deviceID()
    if (question.length < 3) {
        throw new Error('❌ Error: question too short, please enter at least 2 characters')
    }
    let rs = postJson('https://rpa.pbottle.com/API/', { question, deviceToken, modelLevel, options })
    // console.log(rs);
    let json = JSON.parse(rs)
    if (json.error) {
        throw new Error('❌ Error: ' + json.error)
    }
    return json
}
exports.cloud_GPT = cloud_GPT
exports.cloud.GPT = cloud_GPT


/**
 * pbottle RPA integrated cloud image analysis large model
 * @param {string} question question, e.g.: 'Analyze the content of this image'
 * @param {string} imagePath path to upload image, e.g.: 'c:/test.jpg'
 * @param {number} modelLevel model tier, different sizes have different pricing, default 0 for standard model.
 * @returns {Answerinfo} JSON format {content:'result',tokens:tokens consumed}
 */
function cloud_GPTV(question, imagePath, modelLevel = 0) {
    let deviceToken = deviceID()
    imagePath = path.resolve(imagePath)

    if (!fs.existsSync(imagePath)) {
        throw new Error('❌ Input analysis image does not exist: cloud_GPTV')
    }

    let tempJsonFile = homePath + '/cloud_GPTV.json'

    let image_base64 = fs.readFileSync(imagePath).toString('base64')
    fs.writeFileSync(tempJsonFile, JSON.stringify({ question, deviceToken, modelLevel, image_base64 }))

    let rs = postJsonFile('https://rpa.pbottle.com/API/gptv', tempJsonFile);
    let json = JSON.parse(rs)
    if (json.error) {
        console.log('❌ Error cloud_GPTV', json.error, rs)
        throw new Error(json.error)
    }
    return json
}
exports.cloud_GPTV = cloud_GPTV
exports.cloud.GPTV = cloud_GPTV


/**
 * pbottle RPA integrated cloud image analysis large model, operates directly on screen
 * @param {string} action  'click'|'double click'|'right click'
 * @param {string} question question, e.g.: 'Analyze the content of this image'
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
        console.log('❌ Error cloud_GPTA', json.error, rs)
        throw new Error(json.error)
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
        console.log(question + ' position', x, y);
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
 *  pbottle RPA Browser Enhanced Commands
 *  Note:
 *  ①This module is not required.
 *  ②This module requires installing the pbottle RPA browser extension: https://officetool.online/a-313.html
 */
exports.browserCMD = {}

/**
 * Browser enhanced command  requires pbottle RPA browser extension
 * Alert dialog
 * @param {string} msg text content to display
 * @returns {string} normally returns 'ok'
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Close browser tab. Use pbottleRPA.openURL() to open new tabs.
 * @param {string} close type  'current': default close current tab; 'other': close other tabs
 * @returns {string} normally returns 'ok'
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Fetch request, initiates an AJAX request from the current page and returns the response  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * Default 20 seconds timeout
 * @param {string} fetch_url URL
 * @param {object} options request parameters
 * @returns {string} response result
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Wait for page to finish loading, returns the page URL
 * Default 20 seconds timeout
 * @param {string} readyURL  the URL expected after page loading completes
 * @param {number} timeout timeout in seconds
 * @returns {string}  returns current browser URL or error exit
 */
var browserCMD_waitPageReady = function (readyURL,timeout = 20) {

    let url = `${CppUrl}?action=getWebReadyPage`
    for (let index = 0; index < timeout; index++) {
        let res = getHtml(url)
        // console.log("Result:",res);
        if (res == readyURL) {
            return res
        }else{
            sleep(1000);
            console.log(`Waiting for page to finish loading...`);
        }
    }
    throw new Error('waitPageReady: waiting for page load timed out')
}
exports.browserCMD_waitPageReady = browserCMD_waitPageReady
exports.browserCMD.waitPageReady = browserCMD_waitPageReady

/**
 * Browser enhanced command  requires pbottle RPA browser extension
 * @param {string} urlStr redirect current page to a new URL, default empty to get current URL   【Effective for pbottle RPA browser extension V2023.8+】
 * @returns {string}  returns current browser URL or ok
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Element count   refer to jQuery selector
 * @param {string} selector   element selector
 * @returns {number}  returns the count of selected elements, the optimal result is 1
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Simulate click   refer to jQuery click() method, changed to browser native click() with auto-focus
 * @param {string} selector   element selector. If multiple elements match, only the first element's click event is triggered.
 * @param {object} options click options  optional  e.g.: { bubbles: false, ctrlKey: true} https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Simulate double click   refer to jQuery dblclick() method, changed to browser native click() with auto-focus
 * @param {string} selector   element selector. If multiple elements match, only the first element's click event is triggered.
 * @param {object} options click options  optional  e.g.: { bubbles: false, ctrlKey: true} https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Show element   refer to jQuery show() method
 * @param {string} selector   element selector
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Hide element   refer to jQuery hide() method
 * @param {string} selector   element selector
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
 * Browser enhanced command  requires pbottle RPA browser extension   effective for versions >= 2024.0
 * Get element position relative to browser document top-left   refer to jQuery offset() method
 * @param {string} selector   element selector
 * @returns {{left:number,top:number}}  returns JSON: {"left":100,"top":100} coordinates of the element's top-left vertex
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Remove element   refer to jQuery remove() method
 * @param {string} selector   element selector
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Get or set text   refer to jQuery text() method
 * @param {string} selector  element selector
 * @param {string} content optional
 * @returns {string} returns an array if multiple elements are selected
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Get or set HTML   refer to jQuery html() method
 * @param {string} selector  element selector
 * @param {string} content  optional
 * @returns {string} returns an array if multiple elements are selected
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Get or set value for input, select, etc.   refer to jQuery val() method
 * @param {string} selector  element selector
 * @param {string} content  optional, value
 * @returns {string} returns an array if multiple elements are selected
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Get or set the current site's cookie
 * @param {string} cName  cookie name
 * @param {string} cValue cookie value  leave empty to get the cookie value
 * @param {number} expDays cookie expiration time in days, leave empty for session cookie
 * @returns {string} returns the cookie value
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Get or set CSS style   refer to jQuery css() method
 * @param {string} selector  element selector
 * @param {string} propertyname name
 * @param {string} value value
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Get or set attr attribute   refer to jQuery attr() method
 * @param {string} selector element selector
 * @param {string} propertyname attribute name
 * @param {string} value value
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
 * Browser enhanced command  requires pbottle RPA browser extension
 * Get or set prop attribute   refer to jQuery prop() method
 * @param {string} selector element selector
 * @param {string} propertyname attribute name
 * @param {string} value value
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
 * Wait for an image to appear on screen
 * @param {string|Array} tpPath template image path  relative path: ./image/123.png  | array to wait for multiple images
 * @param {Function} intervalFun operation to run between checks, function format
 * @param {number} timeOut optional, wait timeout in seconds, default 30 seconds
 * @param {number} miniSimilarity  optional, minimum similarity threshold, default 0.85. Range 0-1, 1 = exact match.
 * @returns {position|boolean} position info in JSON format: {x,y}  relative to top-left origin of screen
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
    // debug: save current screen
    console.log('Timeout screenshot saved to: My Pictures');
    screenShot();
    // error
    throw new Error(`waitImage: waiting for image timed out ${tpPath}`)
}
exports.waitImage = waitImage;
exports.等待图像出现 = waitImage;

/**
 * Wait for an image to disappear from screen
 * @param {string} tpPath template image path  relative path: ./image/123.png
 * @param {function} intervalFun operation to run between checks, function format
 * @param {number} timeOut optional, wait timeout in seconds, default 30 seconds
 * @param {number} miniSimilarity  optional, minimum similarity threshold, default 0.85. Range 0-1, 1 = exact match.
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
    // debug: save current screen
    console.log('Timeout screenshot saved to: My Pictures');
    screenShot();
    // error
    throw new Error(`waitImageDisappear: waiting for image to disappear timed out ${tpPath}`)
}
exports.waitImageDisappear = waitImageDisappear;
exports.等待图像消失 = waitImageDisappear;

/**
 * Wait for a file to be downloaded or generated
 * @param {string} dirPath monitored directory  e.g.: 'c:/User/pbottle/download'
 * @param {string} keyWords filter keywords  e.g.: '.zip'
 * @param {function} intervalFun operation to run between checks, function format
 * @param {number} timeOut wait timeout in seconds
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
    // error
    throw new Error(`waitFile: waiting for file timed out: ${dirPath}`)
}
exports.waitFile = waitFile;
exports.等待文件 = waitFile;


/**
 * Wait for a file to disappear or be deleted
 * @param {string} dirPath monitored directory  e.g.: 'c:/User/pbottle/download'
 * @param {string} keyWords filter keywords  e.g.: '.crdownload'
 * @param {function} intervalFun operation to run between checks, function format
 * @param {number} timeOut wait timeout in seconds
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
    // error
    let frame = new Error().stack.split("\n")[2]; // change to 3 for grandparent func
    throw new Error(`waitFileDisappear: waiting for file to disappear error: ${dirPath} ${frame}`)
}
exports.waitFileDisappear = waitFileDisappear;
exports.等待文件消失 = waitFileDisappear;



/**
 * Wait for input  Added in V2026.0.0
 * @param {string} inputPrompt input prompt text
 * @param {number} timeOut optional, wait timeout in seconds, default 600 seconds
 * @returns {string}  input content  default returns empty string
 */
function waitInput(inputPrompt = '输入提示词', timeOut = 600) {
    console.log('waitInput waiting for user input:', inputPrompt);
    inputPrompt = encodeURIComponent(inputPrompt)
    let url = `${CppUrl}?action=waitInput&inputPrompt=${inputPrompt}`
    let res = getHtml(url)
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let rs = getHtml(`${CppUrl}?action=waitInputResult`)
        if (hasData(rs)) {
            showMsg('User input:', rs)
            return rs;
        } else {
            continue;
        }
    }
}
exports.waitInput = waitInput;
exports.等待输入 = waitInput;

/**
 *  pbottle RPA Hardware Keyboard/Mouse Simulation Interface
 *  Note:
 *  ①This module is not required.
 *  ②This module requires adding computer hardware peripherals. For purchase and assembly, please consult pbottle RPA support.
 */
exports.hid = {}
/**
 * Simulate key event (hardware level)
 * @param {string} key  key name reference: https://officetool.online/a-321.html
 * @param {string} upDown  default down (press), up releases the key
 * @returns 
 */
let hid_keyToggle = (key, upDown) => {
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = keycode(key)
    if (key_n === undefined) {
        console.log(`⚠ Key ${key} does not exist!~`);
        return
    }
    let url = `${CppUrl}?action=keyToggleHardWare&key_n=${key_n}&upDown_n=${upDown_n}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}
exports.hid.keyToggle = hid_keyToggle

/**
 * Press a key (hardware level)   supports key combinations with plus sign, e.g.: keyTap('ctrl + alt + del')
 * @param {string} key  key name reference: https://officetool.online/a-321.html
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
 * Basic mouse command  all zeros to release
 * @param {number} button button  1, 2, 4 representing left, right, middle mouse buttons respectively.
 * @param {number} x movement position when button is pressed, absolute position  x=100: move right 100 pixels, negative = left
 * @param {number} y movement position when button is pressed, relative drag position  y=100: move down 100 pixels, negative = up
 * @param {number} mouseWheel scroll wheel ticks  positive = down, negative = up
 * @param {number} time press-to-release duration
 * @returns 
 */
let hid_mouseCMD = (button = 1, x = 0, y = 0, mouseWheel = 0, time = 10) => {
    let url = `${CppUrl}?action=mouseDataHardWare&bt=${button}&x=${x}&y=${y}&wheel=${mouseWheel}&time=${time}`
    // console.log(url)
    let res = getHtml(url)
    return res;
}

/**
 * Move mouse to specified position  origin at top-left of screen  absolute screen position (hardware resolution)
 * @param {number} x   horizontal coordinate
 * @param {number} y   vertical coordinate
 * @returns 
 */
let hid_moveMouse = (x, y) => {
    hid_mouseCMD(0, x, y, 0, 10)
}
exports.hid.moveMouse = hid_moveMouse


/**
 * Click mouse at current position  default left button
 * @param {string} button choice: left right middle  optional, default left button
 * @param {number} time press duration in milliseconds  optional
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
 * Move mouse to specified position and click
 * @param {number} x horizontal coordinate
 * @param {number} y vertical coordinate
 */
let hid_moveAndClick = (x, y) => {
    hid_moveMouse(x, y)
    hid_mouseClick()
}
exports.hid.moveAndClick = hid_moveAndClick

/**
 * Double click mouse  left button
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
 * Left mouse button drag to a position
 * @param {number} x  position
 * @param {number} y  position
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
 * Right mouse button drag to a position
 * @param {number} x  position
 * @param {number} y  position
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
 * Mouse scroll wheel
 * @param {number} data scroll amount  default -1  scroll down one tick; positive = scroll up
 * @returns 
 */
let hid_mouseWheel = (data = -1) => {
    hid_mouseCMD(0, 0, 0, data, 0)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseWheel = hid_mouseWheel


/**
 * Common utility class, methods generally not directly related to simulation operations.  Usage: pbottleRPA.utils.function(parameters) or pbottleRPA.function(parameters)
 * Continuously adding common tools to provide convenient methods for workflows.
 */
exports.utils = {}
exports.工具箱 = {}

/**
 * Common utility
 * Check if a value is numeric (including numeric strings)
 *
 * @param {*} value any type variable
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
 * Common utility
 * Check if a variable has data, usable directly in if().
 * Non-zero numbers or non-empty strings, arrays, objects return true, everything else returns false
 * @param {*} value any type variable
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
 * Common utility
 * Formatted time  getTime('Y-m-d H:i:s') outputs a datetime string like "2023-09-17 14:30:45"
 * @param {string} format format reference: https://www.php.net/manual/en/datetime.format.php  only supports Y|y|m|d|H|i|s|n|j
 * @param {number} timestamp timestamp in seconds
 * @returns {string}
 */
function getTime(format = 'Y-m-d H:i:s', timestamp = null) {

    // If no timestamp is provided, use the current time
    const date = timestamp ? new Date(timestamp * 1000) : new Date();

    // Map PHP date format to JavaScript date methods
    const formatMap = {
        'Y': date.getFullYear(),         // 4-digit year
        'y': (date.getFullYear() % 100).toString().padStart(2, '0').slice(-2), // 2-digit year
        'm': ('0' + (date.getMonth() + 1)).slice(-2), // month, 01-12
        'd': ('0' + date.getDate()).slice(-2),        // day, 01-31
        'H': ('0' + date.getHours()).slice(-2),       // 24-hour format, 00-23
        'i': ('0' + date.getMinutes()).slice(-2),     // minutes, 00-59
        's': ('0' + date.getSeconds()).slice(-2),     // seconds, 00-59
        'n': date.getMonth() + 1,           // month, 1-12, no leading zero
        'j': date.getDate(),                // day, 1-31, no leading zero
    };
    // Replace placeholders in the format string
    return format.replace(/Y|y|m|d|H|i|s|n|j/g, (matched) => formatMap[matched]);
}
exports.getTime = getTime;
exports.获取格式化时间 = getTime;
exports.utils.getTime = getTime;
exports.工具箱.获取格式化时间 = getTime;


/**
 * Common utility
 * Locate specific files by keyword
 * @param {string} directory  absolute directory path
 * @param {string} words  keywords to match in filename, filter term, case-insensitive by default
 * @param {boolean} recursive  whether to search recursively into subdirectories, default false
 * @returns {string[]}  file paths || [] if not found
 */
function searchFile(directory, words = '', recursive = false) {
    let rs = []  // global result
    // Read directory contents
    directory = path.resolve(directory)
    let files = fs.readdirSync(directory)
    // console.log('files',files);
    // Iterate over each file
    words = words.toLowerCase()
    files.forEach((file) => {
        let filePath = path.resolve(directory, file);
        if (recursive) {  // check subdirectories
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
 * Common utility
 * Generate a unique string  Note: default is millisecond-level precision
 * @param {string} prefix prefix
 * @param {boolean} moreEntropy  whether to enable finer randomness, use uuid if this is not sufficient
 * @returns {string}
 */
function uniqid(prefix = '', moreEntropy = false) {
    let timestamp = Date.now().toString(36); // Convert timestamp to base36
    let randomStr = '';
    if (moreEntropy) {
        // If more entropy is needed, add some random characters
        randomStr = Math.random().toString(36).substring(2);
    }
    return prefix + timestamp + randomStr;
}
exports.uniqid = uniqid;
exports.唯一数 = uniqid;
exports.utils.uniqid = uniqid;
exports.工具箱.唯一数 = uniqid;



/**
 * Common utility
 * Extract a substring between start and end keywords
 * @param {string} str target string to search
 * @param {string} from start keyword (not included in result)  empty means start from beginning
 * @param {string} to end keyword (not included in result)  empty means go to end
 * @returns  {string}
 */
function substringFromTo(str, from = '', to = '') {
    let fromIndex = str.indexOf(from) + from.length
    let toIndex = str.lastIndexOf(to)
    if (fromIndex == -1 || toIndex == -1) {
        console.log('⚠substringFromTo no keyword found:', from, to);
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




// Check entry file
if (process.argv[1] === __filename) {
    console.log('This file cannot be executed directly', "Please run the script file with the Chinese name instead");
    showMsg('This file cannot be executed directly', "Please run the script file with the Chinese name instead");
    process.exit(1);
}

// Check if system curl command exists (Win10 and below)
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
    console.log('⚠️ System curl command not found, using integrated curl');
    curlCommand = basePath + '/bin/curl.exe';
    // process.exit(1);
}


