/**
 *  小瓶RPA 脚本API  Node版本
 *  官网：https://rpa.pbottle.com/
 */

const request = require('sync-request');  //默认同步请求
const keycode = require('keycode');
const path = require("path");


/**
 * 当前脚本的路径
 */
const jsPath = path.resolve('./')+'/';
const CppUrl = `http://127.0.0.1:49888/`

console.log("基座服务地址：",CppUrl);


exports.jsPath = jsPath;


/**
 * 发出系统警告声音
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
 * 脚本暂停等待
 * @param {*} milliseconds  毫秒
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
 * 移动鼠标到指定位置  起点为屏幕左上角
 * @param {*} x   横坐标
 * @param {*} y   纵坐标
 * @returns 
 */
let moveMouseSmooth = (x,y)=>{
    let url = `${CppUrl}?action=moveMouse&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);

    sleep(100);
    return res;
}
exports.moveMouseSmooth = moveMouseSmooth
exports.moveMouse = moveMouseSmooth  //增加别名

/**
 * 当前位置点击鼠标 默认左键  可选 'right'
 * @param {*} leftRight 
 * @returns 
 */
let mouseClick = (leftRight = 'left')=>{

    let url = `${CppUrl}?action=mouseLeftClick`
    if (leftRight == 'right') {
        url = `${CppUrl}?action=mouseRightClick`
    }

    // console.log(url)
    let res = request('GET', url);

    sleep(200);
    return res;
}
exports.mouseClick = mouseClick


/**
 * 双击鼠标  默认左键
 * @returns 
 */
 let mouseDoubleClick = ()=>{

    let url = `${CppUrl}?action=mouseDoubleClick`

    // console.log(url)
    let res = request('GET', url);

    sleep(200);
    return res;
}
exports.mouseDoubleClick = mouseDoubleClick


/**
 * 鼠标滚轮
 * @param {*} data 滚动的量  默认为-720   向下滚动720度
 * @returns 
 */
let mouseWheel = (data = -720)=>{
    let url = `${CppUrl}?action=mouseWheel&data=${data}`
    // console.log(url)
    let res = request('GET', url);
    sleep(200);
    return res;
}
exports.mouseWheel = mouseWheel


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
 * @returns 返回颜色值 
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
 * 屏幕截图
 * @param {*} savePath  保存路径默认 我的图片，图片格式为PNG；如果使用自定义路径请以 '.png' 结尾; 
 * @param {*} x  截图开始位置
 * @param {*} y 
 * @param {*} w  截图宽度
 * @param {*} h  截图长度
 * @returns 
 */
let screenShot = (savePath='',x=0,y=0,w=0,h=0)=>{
    savePath = encodeURIComponent(savePath)
    let url = `${CppUrl}?action=screenShot&savePath=${savePath}&x=${x}&y=${y}&w=${w}&h=${h}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.screenShot = screenShot


/**
 * 模拟按键触发事件
 * @param {*} key  按键名称参考：https://www.pbottle.com/a-13862.html
 * @param {*} upDown  默认按下down，up松开按键
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
 * 按一下键盘   支持组合按键 加号连接 如：  keyTap('ctrl + a')
 * @param {*} key  按键名称参考：https://www.pbottle.com/a-13862.html
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

    sleep(100);
}
exports.keyTap = keyTap


/**
 * 屏幕查找图象定位
 * @param {*} tpPath 要选择对象的图片  相对路径
 * @param {*} miniSimilarity 可选，指定最低相似度，默认0.9。取值0-1，1为找到完全相同的。
 * @returns 返回找到的结果
 */
var findScreen = (tpPath,miniSimilarity=0.9) =>{

    tpPath = jsPath+tpPath;
    tpPath = encodeURIComponent(tpPath)
    let url = `${CppUrl}?action=findScreen&imgPath=${tpPath}`
    // console.log(url)
    let res = request('GET', url);

    // console.log(res.getBody('utf8'));
    jsonRes = JSON.parse(res.getBody('utf8'));

    console.log(jsonRes);

    if (jsonRes.error) {
        return false;
    }
    if (jsonRes.value<miniSimilarity) {
        return false;
    }

    
    return jsonRes;
}
exports.findScreen = findScreen

/**
 * 当前位置 粘贴（输入）文字
 * @param {*} text 
 */
var paste = (txt)=>{
    txt =  encodeURIComponent(txt)
    url = `${CppUrl}?action=paste&txt=${txt}`
    // console.log(url)
    request('GET', url);
    sleep(100)
    // keyToggle('control',"down")
    // keyTap('v')
    // keyToggle('control',"up")
}
// var paste = (text)=>{
//     exec('echo off | clip')
//     let cmd = `echo ${text}| clip`
//     exec(cmd,{encoding:'utf8'}, (err, stdout, stderr) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         console.log(stdout);
//     });

//     keyToggle('control',"down")
//     keyToggle('v',"down")
//     keyToggle('v',"up")
//     keyToggle('control',"up")
// }
exports.paste = paste




/**
 * 通知到手机
 * 通过小瓶云发送微信通知 (微信到达率高，并且免费)
 * @param {*} name 消息标题
 * @param {*} content  消息详细内容
 * @param {*} key  获取key详情方法：https://www.pbottle.com/a-12586.html

 */
var wxMessage= (title,content,key)=>{
    
    let url =  `https://yun.pbottle.com/manage/yun/?msg=${encodeURIComponent(content)}&name=${encodeURIComponent(title)}&key=${key}`;

    let res = request('GET', url);
    console.log('发送微信消息：',res.getBody('utf8') );

}
exports.wxMessage = wxMessage




/**
 * 向指定网址post一个json，常用网络接口方式， 如 webhook 企业微信群机器人通知
 * @param {*} url 目标网址
 * @param {*} msgJson  jsson内容字符串
 */
var postJson= (url,msgJson)=>{
    
    let res = request('POST',url,{json:msgJson});
    console.log('发送webhook消息：',res.getBody('utf8') );

}
exports.postJson = postJson



/**
 * 从文本到语音(TextToSpeech)  语音播报
 * 非阻塞
 * @param {*} text 朗读内容
 */
var tts= (text)=>{
    text = encodeURIComponent(text)
    let url = `${CppUrl}?action=tts&txt=${text}`
    // console.log(url)
    let res = request('GET', url);
}
exports.tts = tts


/**
 * 用电脑默认浏览器打开网址
 * @param {*} myurl 网址
 */
var openURL= (myurl)=>{
    myurl = encodeURIComponent(myurl)
    let url = `${CppUrl}?action=openURL&url=${myurl}`
    // console.log(url)
    let res = request('GET', url);
}
exports.openURL = openURL



/**
 * 用资源管理器打开展示文件夹
 * @param {*} path 文件夹路径
 */
var openDir= (path)=>{
    path = encodeURIComponent(path)
    let url = `${CppUrl}?action=openDir&path=${path}`
    // console.log(url)
    let res = request('GET', url);
}
exports.openDir = openDir



/**
 * 获取当前屏幕分辨率  
 * @returns JSON  内容格式 {w:1920,h:1080}
 */
var getResolution= ()=>{
    
    let url = `${CppUrl}?action=getResolution`
    // console.log(url)
    let res = request('GET', url);
    return JSON.parse(res.getBody('utf8'));
}
exports.getResolution = getResolution



/**
 * 文字识别 OCR已经从经典算法升级为AI模型预测
 * 
 * @param {*} imagePath 空或者screen 为电脑屏幕;  路径位绝对路径
 * 
 * @param {*} x 剪裁起始点  左上角开始
 * @param {*} y 剪裁起始点
 * @param {*} width  剪裁 宽度
 * @param {*} height 剪裁 高度
 * 
 * @returns   ai OCR识别的json结果 包含准确率的评分    格式： [{text:'A',score:'0.319415'},...]

 */
var aiOcr= (imagePath="screen",  x=0, y=0, width=0, height=0)=>{
    

    imagePath = encodeURIComponent(imagePath);

    let url = `${CppUrl}?action=aiOcr&path=${imagePath}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    // console.log(url)
    let res = request('GET', url);
    return JSON.parse(res.getBody('utf8'));
}
exports.aiOcr = aiOcr