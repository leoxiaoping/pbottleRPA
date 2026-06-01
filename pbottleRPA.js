/**
 *  PBottle RPA Standard Library API  NodeJS Version
 *  Official website: https://github.com/leoxiaoping/pbottleRPA/
 *  Author: leo@pbottle.com
 *  
 *  Welcome to convert this code into Python, Lua, C# and other languages
 * 
 */

const path = require("node:path");
const fs = require("node:fs");
const os = require('os');
const tls = require('node:tls');
const childProcess = require('node:child_process');

/**
 * Current script path, no trailing slash, e.g. 'D:/pbottleRPAdemo'
 */
const jsPath = path.resolve('./');
const CppUrl = `http://127.0.0.1:49888/`
let basePath = process.env.RPAbaseDir; // base path
let homePath = process.env.RPAhomeDir;
let curlCommand = 'curl';  // prefer system curl; use built-in if not available

console.log("Base service address: (NodeJS)", CppUrl);
exports.jsPath = jsPath
exports.basePath = basePath
exports.__dirname = jsPath

//node:fs
exports.fs = fs
//node:path
exports.path = path

let defaultDelay = 1000;  // default delay: 1 second
/**
 * Set the delay for RPA simulation (mouse, keyboard, paste, open URL).
 * Set to 0 to manage delays manually with sleep().
 * @param {number} millisecond   milliseconds, default 1000 (1 second)
 */
let setDefaultDelay = (millisecond) => {
    defaultDelay = millisecond
}
exports.setDefaultDelay = setDefaultDelay


/**
 * Emit a system beep
 * @returns 
 */
let beep = () => {
    let url = `${CppUrl}?action=beep`
    getHtml(url)
}
exports.beep = beep


/**
 * Log output, also writes to log file
 */
exports.log = console.log


/**
 * System native message box
 * @param {string} title  
 * @param {string} content  
 * @returns 
 */
let showMsg = (title, content) => {
    title = encodeURIComponent(title)
    content = encodeURIComponent(content)
    let url = `${CppUrl}?action=showMsg&title=${title}&content=${content}`
    let res = getHtml(url)
    return res;
}
exports.showMsg = showMsg


/**
 * Force close a program
 * @param {string} processName process name as shown in Task Manager, e.g. 'WINWORD.EXE'
 * @param {boolean} force if true, force end (like "End Task"), otherwise normal close
 */
let kill = (processName, force = false) => {
    let forceCMD = ''
    if (force) {
        forceCMD = '/F'
    }
    try {
        childProcess.execSync(`taskkill ${forceCMD} /IM ${processName}`, { stdio: 'ignore', encoding: 'utf8' })
    } catch (error) {
        console.error(`Failed to kill process (${processName}), maybe not running`);
        return;
    }
    console.log('Process killed: ' + processName);
}
exports.kill = kill


/**
 * Draw a colored rectangle on screen to highlight a region (V2024.6+)
 * @param {number} fromX  top-left x coordinate (0 is left edge)
 * @param {number} fromY 
 * @param {number} width  
 * @param {number} height 
 * @param {string} color   one of: red|green|blue|yellow 
 * @param {number} msec   duration in milliseconds
 * @returns 
 */
let showRect = (fromX = 0, fromY = 0, width = 500, height = 500, color = 'red', msec = 500) => {
    fromX = Math.round(fromX)
    fromY = Math.round(fromY)
    width = Math.round(width)
    height = Math.round(height)

    color = encodeURIComponent(color)
    let url = `${CppUrl}?action=showRect&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}&color=${color}&msec=${msec}`
    let res = getHtml(url)
    return res;
}
exports.showRect = showRect


/**
 * Force exit current script
 * @param {...any} msg optional exit message
 */
let exit = (...args) => {
    console.log(...args)
    beep()
    process.exit(1)
}
exports.exit = exit


/**
 * Pause script execution (milliseconds)
 * Note: maximum wait is 2 minutes per call
 * @param {number} milliseconds  
 * @returns 
 */
let sleep = (milliseconds) => {
    if (milliseconds < 1) {
        return;
    }
    milliseconds = Math.floor(milliseconds)
    if (milliseconds >= 120000) {
        console.log('Warning: maximum wait is 2 minutes');
    }

    milliseconds -= 20  // compensate request overhead
    if (milliseconds < 1) {
        milliseconds = 1
    }
    let url = `${CppUrl}?action=httpSleep&milliseconds=${milliseconds}`
    let res = getHtml(url)
    return res;
}
exports.sleep = sleep


/**
 * Pause script execution (seconds)
 * Note: a warning will be logged if wait exceeds 100s
 * @param {number} seconds   seconds, default 1. Decimal allowed.
 */
let wait = (seconds = 1) => {
    if (seconds <= 0 || !isNumeric(seconds)) {
        console.log('pbottleRPA.wait: seconds input error');
        return;
    }
    if (seconds > 100) {
        let quotient = Math.floor(seconds / 100)
        for (let i = 0; i < quotient; i++) {
            sleep(100 * 1000)
            console.log(`Tip: waited 100s...`);
        }
        seconds = seconds % 100;
        sleep(seconds * 1000)
    } else {
        sleep(seconds * 1000)
    }
}
exports.wait = wait

/**
 * Move mouse smoothly to a position (pixel coordinates from top-left)
 * @param {number} x   
 * @param {number} y   
 * @param {number} interval   ms per pixel movement, larger = slower, default 0
 * @returns 
 */
let moveMouseSmooth = (x, y, interval = 0) => {
    x = Math.round(x)
    y = Math.round(y)
    let url = `${CppUrl}?action=moveMouse&x=${x}&y=${y}&interval=${interval}`
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.moveMouseSmooth = moveMouseSmooth
exports.moveMouse = moveMouseSmooth


/**
 * Move mouse and click
 * @param {number} x 
 * @param {number} y 
 */
let moveAndClick = (x, y) => {
    moveMouseSmooth(x, y)
    mouseClick()
}
exports.moveAndClick = moveAndClick


/**
 * Mouse click at current position (default left)
 * @param {string} leftRight   'right' for right button
 * @param {number} time  hold time in ms, optional
 * @returns 
 */
let mouseClick = (leftRight = 'left', time = 30) => {

    let url = `${CppUrl}?action=mouseLeftClick&time=${time}`
    if (leftRight == 'right') {
        url = `${CppUrl}?action=mouseRightClick&time=${time}`
    }
    let res = getHtml(url)

    sleep(defaultDelay);
    return res;
}
exports.mouseClick = mouseClick


/**
 * Double-click at current position (left button)
 * @returns 
 */
let mouseDoubleClick = () => {
    let url = `${CppUrl}?action=mouseDoubleClick`
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.mouseDoubleClick = mouseDoubleClick


/**
 * Mouse wheel scroll
 * @param {number} data  scroll amount, default -720 (down)
 * @returns 
 */
let mouseWheel = (data = -720) => {
    let url = `${CppUrl}?action=mouseWheel&data=${data}`
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.mouseWheel = mouseWheel


/**
 * Left button drag to position
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let mouseLeftDragTo = (x, y) => {
    x = Math.round(x)
    y = Math.round(y)
    let url = `${CppUrl}?action=mouseLeftDragTo&x=${x}&y=${y}`
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.mouseLeftDragTo = mouseLeftDragTo


/**
 * Right button drag to position
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let mouseRightDragTo = (x, y) => {
    x = Math.round(x)
    y = Math.round(y)
    let url = `${CppUrl}?action=mouseRightDragTo&x=${x}&y=${y}`
    let res = getHtml(url)
    sleep(defaultDelay);
    return res;
}
exports.mouseRightDragTo = mouseRightDragTo



/**
 * Get color of a screen pixel
 * @param {number} x 
 * @param {number} y 
 * @returns {string} color value, e.g. '#000000'
 */
let getScreenColor = (x, y) => {
    let url = `${CppUrl}?action=getScreenColor&x=${x}&y=${y}`
    let res = getHtml(url)
    let jsonRes = JSON.parse(res)
    return jsonRes.rs;
}
exports.getScreenColor = getScreenColor


/**
 * Take a screenshot
 * @param {string} savePath   save path, default to Pictures folder; custom path must end with '.png'
 * @param {number} x   region start x
 * @param {number} y 
 * @param {number} w   optional width
 * @param {number} h   optional height
 * @returns 
 */
let screenShot = (savePath = '', x = 0, y = 0, w = -1, h = -1) => {

    if (savePath) {
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
    let res = getHtml(url)
    return res;
}
exports.screenShot = screenShot

/**
 * Convert key name to virtual key code
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
 * Simulate a key down or up event
 * @param {string} key   key name, see https://www.pbottle.com/a-13862.html
 * @param {string} "up" or "down"   default "down"
 * @returns 
 */
let keyToggle = (key, upDown = 'down') => {
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = keycode(key)
    if (key_n === undefined) {
        console.log(`⚠ Key ${key} does not exist!`);
        return
    }
    let url = `${CppUrl}?action=keyToggle&key_n=${key_n}&upDown_n=${upDown_n}`
    let res = getHtml(url)
    return res;
}
exports.keyToggle = keyToggle


/**
 * Simulate a mouse button down/up event
 * @param {string} key    left | right | middle  
 * @param {string} "up" or "down"   default "down"
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
    let res = getHtml(url)
    return res;
}
exports.mouseKeyToggle = mouseKeyToggle


/**
 * Press a key (supports combos like 'ctrl + a')
 * @param {string} key   key name, see https://www.pbottle.com/a-13862.html
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
            keyToggle(element, "down")
        }

        subkeys = subkeys.reverse()
        for (let index = 0; index < subkeys.length; index++) {
            const element = subkeys[index];
            keyToggle(element, "up")
        }
    } else {
        keyToggle(key, "down")
        keyToggle(key, "up")
    }

    sleep(defaultDelay);
}
exports.keyTap = keyTap


/**
 * Find an image on screen (template matching)
 * @param {string|Array} tpPaths  image template path(s), relative like './image/123.png'
 * @param {number} miniSimilarity  minimum similarity (0-1), default 0.85
 * @param {number} fromX=0  search start x
 * @param {number} fromY=0  search start y
 * @param {number} width=-1 search width
 * @param {number} height=-1 search height
 * @returns {{x:number,y:number}|false} found position or false
 */
var findScreen = (tpPaths, miniSimilarity = 0.85, fromX = 0, fromY = 0, width = -1, height = -1) => {

    if (fromX < 0 || fromY < 0) {
        throw new Error(`Error: search start cannot be negative, x:${fromX} y:${fromY}`);
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
        let res = getHtml(url)

        let jsonRes = JSON.parse(res);

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


/**
 * Find text on screen (V2024.5+)
 * @param {string} inputTxt 
 * @param {number} fromX=0 search start x
 * @param {number} fromY=0 search start y
 * @param {number} width=-1 search width
 * @param {number} height=-1 search height
 * @returns {{x:number,y:number,text:string}|false} found position and text
 */
var findText = (inputTxt, fromX = 0, fromY = 0, width = -1, height = -1) => {
    let jsonDatas = aiOcr('screen', fromX, fromY, width, height);
    let result = false;
    jsonDatas.forEach(element => {
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

/**
 * Wait for a text to appear on screen
 * @param {string} inputTxt 
 * @param {number} fromX optional
 * @param {number} fromY optional
 * @param {number} width optional
 * @param {number} height optional
 * @param {function} intervalFun callback, return 'stopWait' to abort
 * @param {number} timeOut timeout in seconds
 * @returns 
 */
var waitText = (inputTxt, fromX = 0, fromY = 0, width = -1, height = -1, intervalFun = () => { }, timeOut = 20) => {
    console.log('Waiting for text:', inputTxt);
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
    console.log('Timeout screenshot saved to Pictures');
    screenShot();
    throw new Error(`Wait text timeout: ${inputTxt}`);
}
exports.waitText = waitText


/**
 * Find contours (objects/windows) on screen. Debug output: debug/findContours.png
 * @param {number} minimumArea minimum contour area, default filters out <10x10
 * @param {number} fromX  
 * @param {number} fromY 
 * @param {number} width  
 * @param {number} height 
 * @returns {[]} Array of contour objects: { x, y, cx, cy, area, id }
 */
var findContours = (minimumArea = 1000, fromX = 0, fromY = 0, width = -1, height = -1) => {

    if (fromX < 0 || fromY < 0) {
        throw new Error(`Error: search start cannot be negative, x:${fromX} y:${fromY}`);
    }

    if (fromX != 0 || fromY != 0 || width != -1 || height != -1) {
        showRect(fromX, fromY, width, height);
    }

    let url = `${CppUrl}?action=findContours&minimumArea=${minimumArea}&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}`
    let res = getHtml(url)

    let jsonRes = JSON.parse(res);

    for (const json of jsonRes) {
        json.x += fromX
        json.y += fromY
    }
    return jsonRes;
}
exports.findContours = findContours

/**
 * Paste text (simulates Ctrl+V)
 * @param {string} txt  
 */
var paste = (txt) => {
    copyText(txt)
    keyTap('ctrl+v')
    sleep(defaultDelay);
}
exports.paste = paste


/**
 * Image similarity comparison (V2025.3+)
 * @param {string} path1  image 1 path
 * @param {string} path2  image 2 path
 * @param {'SIFT' | 'ORB' | 'SSIM'} checkType  algorithm, default 'ORB'
 * @returns {{score:number, time:number}}  score 0-1, time in seconds
 */
var imgSimilar = (path1, path2, checkType = 'ORB') => {
    path1 = encodeURIComponent(path1)
    path2 = encodeURIComponent(path2)
    let url = `${CppUrl}?action=imgSimilar&path1=${path1}&path2=${path2}&checkType=${checkType}`
    let res = getHtml(url)
    return JSON.parse(res);
}
exports.imgSimilar = imgSimilar


/**
 * Copy text to clipboard (V2025.0+)
 * @param {string} txt 
 */
var copyText = (txt) => {
    txt = encodeURIComponent(txt)
    let url = `${CppUrl}?action=copyText&txt=${txt}`
    let res = getHtml(url)
    return res
}
exports.copyText = copyText

/**
 * Copy a file/folder to clipboard (V2024.7+). After copy, Ctrl+V to paste.
 * @param {string} filepath absolute path
 */
var copyFile = (filepath) => {
    filepath = path.resolve(filepath)
    if (!fs.existsSync(filepath)) {
        console.log('copyFile warning: path does not exist', filepath);
    }
    filepath = filepath.replace(/\\/g, '/')
    filepath = encodeURIComponent(filepath)
    let url = `${CppUrl}?action=copyFile&path=${filepath}`
    let res = getHtml(url)
    return res
}
exports.copyFile = copyFile

/**
 * Get clipboard content (V2024.2+)
 * Supports text, base64 image, html.
 * @returns string
 */
var getClipboard = () => {
    let url = `${CppUrl}?action=getClipboard`
    let res = getHtml(url)
    return res;
}
exports.getClipboard = getClipboard


/**
 * Send WeChat notification via PBottle cloud (free)
 * @param {string} title 
 * @param {string} content 
 * @param {string} key  get key from https://www.pbottle.com/a-12586.html
 */
var wxMessage = (title, content, key) => {

    let url = `https://yun.pbottle.com/manage/yun/?msg=${encodeURIComponent(content)}&name=${encodeURIComponent(title)}&key=${key}`;
    let res = getHtml(url)
    console.log('WeChat message sent:', res);
}
exports.wxMessage = wxMessage


/**
 * POST a JSON object to an API
 * @param {string} url 
 * @param {object} msgJson 
 * @param {object} headersJson 
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
        throw new Error('postJson curl error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('postJson curl failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.postJson = postJson

/**
 * POST a JSON file to an API
 * @param {string} url 
 * @param {string} msgJsonFile JSON file path
 * @param {object} headersJson 
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
        throw new Error('postJsonFile curl error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('postJsonFile curl failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.postJsonFile = postJsonFile

/**
 * Simple GET (or other method) request, returns response body
 * @param {string} url 
 * @param {object} headersJson 
 * @param {string} method   GET, POST, PUT, DELETE or HEAD
 * @returns {string}
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
        throw new Error('getHtml curl error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('getHtml curl failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.getHtml = getHtml

/**
 * Send an email (asynchronous)
 * @param {string} to 
 * @param {string} subject 
 * @param {string} content 
 * @param {string} host  SMTP server, default smtp.qq.com
 * @param {number} port  default 465
 * @param {string} user  authentication user (usually email)
 * @param {string} pass  authentication password
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
            content += '\n\n\ Please do not use the demo email for production; see https://rpa.pbottle.com/a-14106.html'
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
                `From: "PBottle RPA" ${user}`,
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
                    console.log('➡️ Sending:', cmd.split('\r\n')[0]);
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

/**
 * Download a file from URL to local path
 * @param {string} fileUrl 
 * @param {string} filename local path
 * @param {object} headersJson 
 */
function downloadFile(fileUrl, filename, headersJson = {}) {

    const dirPath = path.dirname(filename);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    filename = path.resolve(filename)
    console.log('Download file to:', filename)
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
        throw new Error('downloadFile curl error: ' + result.error.message);
    }
    if (result.status !== 0) {
        throw new Error('downloadFile curl failed: ' + result.stderr);
    }
    return result.stdout;
}
exports.downloadFile = downloadFile

/**
 * Text-to-speech (non-blocking)
 * @param {string} text 
 */
var tts = (text) => {
    text = encodeURIComponent(text)
    let url = `${CppUrl}?action=tts&txt=${text}`
    let res = getHtml(url)
    sleep(defaultDelay);
}
exports.tts = tts


/**
 * Open URL with default browser
 * @param {string} myurl 
 */
var openURL = (myurl) => {

    let clearurl = `${CppUrl}?action=setWebReadyPage`
    getHtml(clearurl)

    myurl = encodeURIComponent(myurl)
    let url = `${CppUrl}?action=openURL&url=${myurl}`
    let res = getHtml(url)
    sleep(defaultDelay + 1000);
}
exports.openURL = openURL


/**
 * Open file or folder with default program / explorer
 * @param {string} filePath absolute path, e.g. 'c:/input/RPAlogo128.png'
 */
var openDir = (filePath) => {
    filePath = path.resolve(filePath)
    filePath = encodeURIComponent(filePath)
    let url = `${CppUrl}?action=openDir&path=${filePath}`
    let res = getHtml(url)
    sleep(defaultDelay);
}
exports.openDir = openDir
exports.openfile = openDir



/**
 * Get screen resolution and scaling
 * @returns {{w:number,h:number,ratio:number}} e.g. {w:1920,h:1080,ratio:1.5}
 */
var getResolution = () => {
    let url = `${CppUrl}?action=getResolution`
    let res = getHtml(url)
    return JSON.parse(res);
}
exports.getResolution = getResolution


/**
 * AI OCR (text recognition) - free & offline
 * @param {string} imagePath "screen" for live screen, or absolute image path
 * @param {number} x optional start x
 * @param {number} y optional start y
 * @param {number} width optional
 * @param {number} height optional
 * @returns {{text:string,score:number,x:number,y:number}[]}
 */
var aiOcr = (imagePath = "screen", x = 0, y = 0, width = -1, height = -1) => {

    if (!imagePath) {
        imagePath = "screen"
    }

    if (x < 0 || y < 0) {
        throw new Error(`Error: OCR start cannot be negative, x:${x} y:${y}`);
    }

    if (x != 0 || y != 0 || width != -1 || height != -1) {
        showRect(x, y, width, height);
    }

    if (imagePath != 'screen') {
        imagePath = path.resolve(imagePath)
        imagePath = encodeURIComponent(imagePath)
    }

    let url = `${CppUrl}?action=aiOcr&path=${imagePath}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    let res = getHtml(url)

    // Server returns Chinese message, keep original
    if (res == '文字识别引擎未启动') {
        console.log('⚠', res, 'Please enable OCR in software settings');
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


/**
 * AI Object Detection (V2024.8+). Debug output: debug/Ai_ObjectDetect.png
 * @param {number} minimumScore confidence threshold
 * @param {number} x optional search region
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @returns {array} [{x,y,width,height,score,class}, ...]
 */
var aiObject = (minimumScore = 0.5, x = 0, y = 0, width = -1, height = -1) => {

    if (x < 0 || y < 0) {
        throw new Error(`Error: Object detection start cannot be negative, x:${x} y:${y}`);
    }

    if (x != 0 || y != 0 || width != -1 || height != -1) {
        showRect(x, y, width, height);
    }

    let url = `${CppUrl}?action=aiObject&minimumScore=${minimumScore}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    let res = getHtml(url)

    // Server returns Chinese message, keep original
    if (res == '物体识别引擎未启动') {
        console.log('⚠', res, 'Please enable object detection in software settings');
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


/**
 * Zip a folder (V2025.0+)
 * @param {string} directory folder path
 * @param {string} zipFilePath output zip file path, default 'RPA生成的压缩包.zip' inside folder
 */
function zipDir(directory, zipFilePath = "") {
    if (!zipFilePath) {
        zipFilePath = path.resolve(directory, 'RPA_ZipPackage.zip')
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
        if (!error.stderr.includes('Headers Error')) {
            console.error(`Zip failed`, error);
        }
    }
}
exports.zipDir = zipDir


/**
 * Unzip a file (V2025.0+)
 * @param {string} zipFilePath 
 * @param {string} directory output folder, default same as zip location
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
        console.error(`Unzip failed`, error);
    }
}
exports.unZip = unZip

/**
 * Get buffer content (shared across scripts, resets on RPA restart)
 * @param {number} n buffer index 0-9 (default 0)
 * @returns {string}
 */
var bufferGet = (n = 0) => {
    let url = `${CppUrl}?action=bufferGet&n=${n}`
    let res = getHtml(url)
    return res;
}
exports.bufferGet = bufferGet


/**
 * Set buffer content
 * @param {string} content 
 * @param {number} n buffer index 0-9 (default 0)
 * @returns {string} "ok" on success
 */
var bufferSet = (content, n = 0) => {
    let url = `${CppUrl}?action=bufferSet&n=${n}`
    let res = postJson(url, content);
    return res;
}
exports.bufferSet = bufferSet


/**
 * Set a script to run after current script ends (regardless of success or error)
 * @param {string} scriptPath absolute path, empty to clear
 * @returns {string} "ok" on success
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
 * Get unique device ID
 * @returns {string}
 */
function deviceID() {
    let url = `${CppUrl}?action=pbottleRPA_deviceID`
    let res = getHtml(url)
    return res
}
exports.deviceID = deviceID


/**
 * Get cluster center info
 * @returns {string}
 */
function clusterCenter() {
    let url = `${CppUrl}?action=pbottleRPA_clusterCenter`
    let res = getHtml(url)
    return res
}
exports.clusterCenter = clusterCenter


/**
 *  PBottle RPA Cloud Modules (AI, etc.)
 *  Note:
 *  ① Optional, local modules work independently
 *  ② Requires login and activation; some features may involve cost
 */
exports.cloud = {}

/**
 * @typedef {Object} Answerinfo
 * @property {string} content - answer text
 * @property {number} usage - tokens used
 */
/**
 * @typedef {Object} AiOptions
 * @property {string} response_format default "text", also "json_object"
 * @property {number} temperature   default 0.75, range [0-2)
 * @property {boolean} enable_search false|true, enable web search (adds token cost)
 */
/**
 * Cloud GPT text generation
 * @param {string} question 
 * @param {number} modelLevel 0=budget, 1=balanced, 2=flagship
 * @param {AiOptions} options 
 * @returns {Answerinfo}
 */
function cloud_GPT(question, modelLevel = 0, options = {
    response_format: 'text',
    temperature: 0.75,
    enable_search: false,
}) {
    let deviceToken = deviceID()
    if (question.length < 3) {
        throw new Error('❌ Error: question too short (min 2 characters)')
    }
    let rs = postJson('https://rpa.pbottle.com/API/', { question, deviceToken, modelLevel, options })
    let json = JSON.parse(rs)
    if (json.error) {
        throw new Error('❌ Error: ' + json.error)
    }
    return json
}
exports.cloud_GPT = cloud_GPT
exports.cloud.GPT = cloud_GPT


/**
 * Cloud GPT Vision (image analysis)
 * @param {string} question 
 * @param {string} imagePath local image path
 * @param {number} modelLevel 
 * @returns {Answerinfo}
 */
function cloud_GPTV(question, imagePath, modelLevel = 0) {
    let deviceToken = deviceID()
    imagePath = path.resolve(imagePath)

    if (!fs.existsSync(imagePath)) {
        throw new Error('❌ Input image does not exist: cloud_GPTV')
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
 * Cloud GPT Action: analyze screen and perform click/double-click/right-click
 * @param {string} action  'click'|'double-click'|'right-click'
 * @param {string} question target description, e.g. "Desktop WeChat icon"
 * @returns
 */
function cloud_GPTA(action = 'click', question = "Desktop WeChat icon") {
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

        if (action == 'click') {
            mouseClick('left')
        } else if (action == 'double-click') {
            mouseDoubleClick()
        } else if (action == 'right-click') {
            mouseClick('right')
        }
    }
}
exports.cloud_GPTA = cloud_GPTA
exports.cloud.GPTA = cloud_GPTA


/**
 *  PBottle RPA Browser Enhanced Commands
 *  Note:
 *  ① Optional
 *  ② Requires browser extension: https://rpa.pbottle.com/a-13942.html
 */
exports.browserCMD = {}

/**
 * Alert in browser
 * @param {string} msg 
 * @returns {string} 'ok'
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
 * Close browser tab(s)
 * @param {string} type 'current' (default) or 'other'
 * @returns {string} 'ok'
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
 * Browser fetch (ajax from current page), default 20s timeout
 * @param {string} fetch_url 
 * @param {object} options fetch options
 * @returns {string} response
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
 * Wait for page to load (ready URL matches), default 20s timeout
 * @param {string} readyURL  expected URL
 * @param {number} timeout seconds
 * @returns {string} current URL
 */
var browserCMD_waitPageReady = function (readyURL, timeout = 20) {

    let url = `${CppUrl}?action=getWebReadyPage`
    for (let index = 0; index < timeout; index++) {
        let res = getHtml(url)
        if (res == readyURL) {
            return res
        } else {
            sleep(1000);
            console.log(`Waiting for page to load...`);
        }
    }
    throw new Error('waitPageReady timeout')
}
exports.browserCMD_waitPageReady = browserCMD_waitPageReady
exports.browserCMD.waitPageReady = browserCMD_waitPageReady

/**
 * Get or set current page URL
 * @param {string} urlStr if provided, navigate to URL; otherwise return current URL
 * @returns {string}
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
 * Count elements matching a selector (jQuery style)
 * @param {string} selector 
 * @returns {number}
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
 * Click element (native click, auto-focus)
 * @param {string} selector if multiple, only first is clicked
 * @param {object} options e.g. { bubbles: false, ctrlKey: true }
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
 * Double-click element
 * @param {string} selector 
 * @param {object} options 
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
 * Show element (jQuery show)
 * @param {string} selector 
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
 * Hide element
 * @param {string} selector 
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
 * Get element offset (relative to document)
 * @param {string} selector 
 * @returns {{left:number,top:number}}
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
 * Remove element
 * @param {string} selector 
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
 * Get or set text content
 * @param {string} selector 
 * @param {string} content optional
 * @returns {string}
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
 * Get or set HTML content
 * @param {string} selector 
 * @param {string} content optional
 * @returns {string}
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
 * Get or set input value
 * @param {string} selector 
 * @param {string} content optional
 * @returns {string}
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
 * Get or set cookie
 * @param {string} cName 
 * @param {string} cValue if omitted, get cookie value
 * @param {number} expDays expiration days, omit for session cookie
 * @returns {string}
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
 * Get or set CSS property
 * @param {string} selector 
 * @param {string} propertyname 
 * @param {string} value optional
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
 * Get or set attribute
 * @param {string} selector 
 * @param {string} propertyname 
 * @param {string} value optional
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
 * Get or set property
 * @param {string} selector 
 * @param {string} propertyname 
 * @param {string} value optional
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
 * @param {string|Array} tpPath image template path(s)
 * @param {Function} intervalFun callback
 * @param {number} timeOut timeout seconds (default 30)
 * @param {number} miniSimilarity default 0.85
 * @returns {position|boolean} {x,y} or false
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
    console.log('Timeout screenshot saved to Pictures');
    screenShot();
    throw new Error(`waitImage timeout ${tpPath}`)
}
exports.waitImage = waitImage;

/**
 * Wait for an image to disappear
 * @param {string} tpPath 
 * @param {function} intervalFun 
 * @param {number} timeOut seconds (default 30)
 * @param {number} miniSimilarity default 0.85
 * @returns {string|boolean}
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
    console.log('Timeout screenshot saved to Pictures');
    screenShot();
    throw new Error(`waitImageDisappear timeout ${tpPath}`)
}
exports.waitImageDisappear = waitImageDisappear;

/**
 * Wait for a file to appear in a directory
 * @param {string} dirPath 
 * @param {string} keyWords filter keyword, e.g. '.zip'
 * @param {function} intervalFun 
 * @param {number} timeOut seconds
 * @returns {string[]}
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
    throw new Error(`waitFile timeout: ${dirPath}`)
}
exports.waitFile = waitFile;

/**
 * Wait for a file to disappear
 * @param {string} dirPath 
 * @param {string} keyWords 
 * @param {function} intervalFun 
 * @param {number} timeOut seconds
 * @returns {string[]}
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
    let frame = new Error().stack.split("\n")[2];
    throw new Error(`waitFileDisappear error: ${dirPath} ${frame}`)
}
exports.waitFileDisappear = waitFileDisappear;


/**
 * Wait for user input (V2026.0.0+)
 * @param {string} inputPrompt prompt text
 * @param {number} timeOut seconds (default 600)
 * @returns {string} input content
 */
function waitInput(inputPrompt = 'Input prompt', timeOut = 600) {
    console.log('waitInput:', inputPrompt);
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


/**
 *  PBottle RPA Hardware HID Keyboard/Mouse Simulation
 *  Note:
 *  ① Optional module
 *  ② Requires hardware add-on, contact support
 */
exports.hid = {}

/**
 * Simulate key toggle (hardware level)
 * @param {string} key see https://www.pbottle.com/a-13862.html
 * @param {string} upDown "down" or "up"
 * @returns 
 */
let hid_keyToggle = (key, upDown) => {
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }
    let key_n = keycode(key)
    if (key_n === undefined) {
        console.log(`⚠ Key ${key} does not exist!`);
        return
    }
    let url = `${CppUrl}?action=keyToggleHardWare&key_n=${key_n}&upDown_n=${upDown_n}`
    let res = getHtml(url)
    return res;
}
exports.hid.keyToggle = hid_keyToggle

/**
 * Press a key (hardware level), supports combos
 * @param {string} key 
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
 * Base hardware mouse command (all zeros release)
 * @param {number} button 1=left,2=right,4=middle
 * @param {number} x relative x movement
 * @param {number} y relative y movement
 * @param {number} mouseWheel wheel delta (+up,-down)
 * @param {number} time press duration ms
 * @returns 
 */
let hid_mouseCMD = (button = 1, x = 0, y = 0, mouseWheel = 0, time = 10) => {
    let url = `${CppUrl}?action=mouseDataHardWare&bt=${button}&x=${x}&y=${y}&wheel=${mouseWheel}&time=${time}`
    let res = getHtml(url)
    return res;
}

/**
 * Move mouse to absolute screen position (hardware resolution)
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let hid_moveMouse = (x, y) => {
    hid_mouseCMD(0, x, y, 0, 10)
}
exports.hid.moveMouse = hid_moveMouse


/**
 * Mouse click (hardware level)
 * @param {string} button 'left'|'right'|'middle' default left
 * @param {number} time press duration ms
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
 * Move and click (hardware)
 * @param {number} x 
 * @param {number} y 
 */
let hid_moveAndClick = (x, y) => {
    hid_moveMouse(x, y)
    hid_mouseClick()
}
exports.hid.moveAndClick = hid_moveAndClick

/**
 * Double-click (hardware, left button)
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
 * Left drag (hardware)
 * @param {number} x 
 * @param {number} y 
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
 * Right drag (hardware)
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let hid_mouseRightDragTo = (x, y) => {
    hid_mouseCMD(2, 0, 0, 0, 10)
    hid_mouseCMD(2, x, y, 0, 10)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseRightDragTo = hid_mouseRightDragTo


/**
 * Mouse wheel (hardware)
 * @param {number} data default -1 (down), positive up
 * @returns 
 */
let hid_mouseWheel = (data = -1) => {
    hid_mouseCMD(0, 0, 0, data, 0)
    hid_mouseCMD(0, 0, 0, 0, 0)
    sleep(defaultDelay);
}
exports.hid.mouseWheel = hid_mouseWheel


/**
 * Utility functions. Usage: pbottleRPA.utils.func(...) or pbottleRPA.func(...)
 */
exports.utils = {}

/**
 * Check if value is numeric
 * @param {*} value 
 * @returns {boolean}
 */
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
exports.isNumeric = isNumeric;
exports.utils.isNumeric = isNumeric;

/**
 * Check if value has data (non-empty string, array, object, non-zero number, etc.)
 * @param {*} value 
 * @returns {boolean}
 */
function hasData(value) {
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
exports.utils.hasData = hasData;

/**
 * Format date/time similar to PHP date()
 * @param {string} format supports Y|y|m|d|H|i|s|n|j
 * @param {number} timestamp seconds, default now
 * @returns {string}
 */
function getTime(format = 'Y-m-d H:i:s', timestamp = null) {

    const date = timestamp ? new Date(timestamp * 1000) : new Date();

    const formatMap = {
        'Y': date.getFullYear(),
        'y': (date.getFullYear() % 100).toString().padStart(2, '0').slice(-2),
        'm': ('0' + (date.getMonth() + 1)).slice(-2),
        'd': ('0' + date.getDate()).slice(-2),
        'H': ('0' + date.getHours()).slice(-2),
        'i': ('0' + date.getMinutes()).slice(-2),
        's': ('0' + date.getSeconds()).slice(-2),
        'n': date.getMonth() + 1,
        'j': date.getDate(),
    };
    return format.replace(/Y|y|m|d|H|i|s|n|j/g, (matched) => formatMap[matched]);
}
exports.getTime = getTime;
exports.utils.getTime = getTime;


/**
 * Search for files by keyword in a directory
 * @param {string} directory absolute path
 * @param {string} words keyword (case-insensitive), default ''
 * @param {boolean} recursive default false
 * @returns {string[]} matching file paths
 */
function searchFile(directory, words = '', recursive = false) {
    let rs = []
    directory = path.resolve(directory)
    let files = fs.readdirSync(directory)
    words = words.toLowerCase()
    files.forEach((file) => {
        let filePath = path.resolve(directory, file);
        if (recursive) {
            let stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                let rsTemp = searchFile(filePath, words, recursive)
                rs.push(...rsTemp)
            }
        }
        if (filePath.toLowerCase().includes(words)) {
            rs.push(filePath)
        }
    });
    return rs;
}
exports.searchFile = searchFile;
exports.utils.searchFile = searchFile;


/**
 * Generate a unique ID (millisecond precision)
 * @param {string} prefix 
 * @param {boolean} moreEntropy add random suffix
 * @returns {string}
 */
function uniqid(prefix = '', moreEntropy = false) {
    let timestamp = Date.now().toString(36);
    let randomStr = '';
    if (moreEntropy) {
        randomStr = Math.random().toString(36).substring(2);
    }
    return prefix + timestamp + randomStr;
}
exports.uniqid = uniqid;
exports.utils.uniqid = uniqid;


/**
 * Extract substring between two markers
 * @param {string} str 
 * @param {string} from start marker (not included); empty for beginning
 * @param {string} to end marker (not included); empty for end
 * @returns {string}
 */
function substringFromTo(str, from = '', to = '') {
    let fromIndex = str.indexOf(from) + from.length
    let toIndex = str.lastIndexOf(to)
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
exports.utils.substringFromTo = substringFromTo


// Check if executed directly
if (process.argv[1] === __filename) {
    console.log('This file cannot be executed directly. Please run the script with a Chinese filename.');
    showMsg('Cannot execute directly', 'Please run the script with a Chinese filename.');
    process.exit(1);
}

// Check for curl on older Windows systems
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
    console.log('⚠️ System curl not found, using built-in curl');
    curlCommand = basePath + '/bin/curl.exe';
}