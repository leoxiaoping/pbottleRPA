
const { exec } = require('child_process');
const request = require('sync-request');  //默认同步请求
const keycode = require('keycode');
const path = require("path");


const jsPath = path.resolve('./')+'/';
const CppUrl = `http://127.0.0.1:49888/`


console.log("基座服务地址：",CppUrl);


/**
 * "系统警告声音"
 * @returns 
 */
 let beep = ()=>{
    let url = `${CppUrl}?action=beep`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.beep = beep

/**
 * 暂停一会
 * @returns 
 */
 let sleep = (milliseconds)=>{
    let url = `${CppUrl}?action=httpSleep&milliseconds=${milliseconds}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.sleep = sleep

/**
 * 移动鼠标
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
let moveMouseSmooth = (x,y)=>{
    let url = `${CppUrl}?action=moveMouse&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);

    sleep(500);
    return res;
}
exports.moveMouseSmooth = moveMouseSmooth

/**
 * 点击鼠标
 * @returns 
 */
let mouseClick = (leftRight = 'left')=>{
    let url = `${CppUrl}?action=mouseLeftClick`
    if (leftRight == 'right') {
        url = `${CppUrl}?action=mouseRightClick`
    }

    // console.log(url)
    let res = request('GET', url);

    sleep(1500);
    return res;
}
exports.mouseClick = mouseClick




/**
 * 鼠标左键拖到指定位置
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
let mouseLeftDragTo = (x,y)=>{
    let url = `${CppUrl}?action=mouseLeftDragTo&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.mouseLeftDragTo = mouseLeftDragTo



/**
 * 鼠标右键拖到指定位置
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
let mouseRightDragTo = (x,y)=>{
    let url = `${CppUrl}?action=mouseRightDragTo&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.mouseRightDragTo = mouseRightDragTo



/**
 * 屏幕一个点取色
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
let getScreenColor = (x,y)=>{
    let url = `${CppUrl}?action=getScreenColor&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);
    let jsonRes = JSON.parse(res.getBody())
    return jsonRes.rs;
}
exports.getScreenColor = getScreenColor

/**
 * @param {}  key 为按键名字
 * @returns 
 */
let keyToggle = (key,upDown)=>{
    
    let upDown_n = 0;
    if (upDown == 'up') {
        upDown_n = 2;
    }

    let key_n = keycode(key)


    let url = `${CppUrl}?action=keyToggle&key_n=${key_n}&upDown_n=${upDown_n}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.keyToggle = keyToggle


/**
 * 按一下键盘
 * @param {*} key 
 */
let keyTap = (key)=>{

    keyToggle(key,"down")
    keyToggle(key,"up")

    sleep(1500);
}
exports.keyTap = keyTap


/**
 * 
 * @param {*} tpPath 
 * @returns 
 */
var findScreen = (tpPath) =>{

    tpPath = jsPath+tpPath;
    let url = `${CppUrl}?action=findScreen&imgPath=${tpPath}`
    // console.log(url)
    let res = request('GET', url);

    // console.log(res.getBody('utf8'));
    jsonRes = JSON.parse(res.getBody('utf8'));

    if (jsonRes.error) {
        return false;
    }
    if (jsonRes.value<0.9) {
        return false;
    }

    console.log(jsonRes);
    return jsonRes;
}
exports.findScreen = findScreen

/**
 * 
 * @param {*} text 
 */
// var paste = (txt)=>{

//     txt =  encodeURIComponent(txt)
    
//     url = `${CppUrl}?action=paste&txt=${txt}}`
//     console.log(url)
//     request('GET', url);

//     // keyToggle('control',"down")
//     // keyTap('v')
//     // keyToggle('control',"up")
// }
var paste = (text)=>{
    
    exec('echo off | clip')
    let cmd = `echo ${text}| clip`
    exec(cmd,{encoding:'utf8'}, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
    });

    keyToggle('control',"down")
    keyToggle('v',"down")
    keyToggle('v',"up")
    keyToggle('control',"up")
}
exports.paste = paste

/**
 *  百度验证码破解
 */
var baiduSafeCheck = ()=>{
    let rs =  findScreen('./input/baidusafe.png')
    if (rs !== false) {

        moveMouseSmooth(rs.x,rs.y,0);
        mouseLeftDragTo(rs.x + 250,rs.y);
        console.log('※※※ 破解百度安全验证 ※※※');
    }
}
exports.baiduSafeCheck = baiduSafeCheck



/**
 * 通过小瓶云发送微信通知   详情：http://yun.pbottle.com/
 * @param {*} name 
 * @param {*} content 
 */
var wxMessage= (name,content)=>{
    http.get(`http://yun.pbottle.com/manage/yun/?msg=${decodeURIComponent(content)}&name=${decodeURIComponent(name)}&key=key599a9e4136010`,(res)=>{
        let html = '';
        // 绑定data事件 回调函数 累加html片段
        res.on('data', function (data) {
            html += data;
        });

        res.on('end', function () {
            console.log(html);
        });
    })
}
exports.wxMessage = wxMessage




/**
 * 从文本到语音(TextToSpeech)
 * @param {*} text 
 */
var tts= (text)=>{
    text = encodeURIComponent(text)
    let url = `${CppUrl}?action=tts&txt=${text}`
    // console.log(url)
    let res = request('GET', url);
}
exports.tts = tts






/**
 * 
 */
var checkBrowserReady = ()=>{
    let rs =  pbottleRPA.findScreen('./input/1.png')
}


// baiduSafeCheck()

// wxMessage('小瓶RPA机器人',`你好，主人，我的任务已经完成了！~`)

// cv.waitKey();


