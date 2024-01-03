/**
 *  小瓶RPA 脚本API  nodeJS版本
 *  官网：https://rpa.pbottle.com/
 *  作者：leo@pbottle.com
 *  
 *  欢迎各路高手将本代码转换成 python、lua、C# 等其他语言封装
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



let defaultDelay = 1000;  //默认值一秒
/**
 * 设置RPA模拟操作的延时  包含鼠标、键盘、粘贴、打开网页操作
 * 设置为 0  可以用 sleep() 手动管理操作延时
 * @param {number} millisecond   毫秒单位的数字，系统默认 1000 毫秒 即1秒
 */
let setDefaultDelay = (millisecond)=>{
    defaultDelay = millisecond
}
exports.setDefaultDelay = setDefaultDelay



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
 * 系统原生消息提示
 * @param {string} title  标题
 * @param {string} content  内容
 * @returns 
 */
let showMsg = (title,content)=>{
    title = encodeURIComponent(title)
    content = encodeURIComponent(content)
    let url = `${CppUrl}?action=showMsg&title=${title}&content=${content}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.showMsg = showMsg



/**
 * 强制退出当前脚本
 * @param {string} msg 退出时候输出的信息
 */
 let exit = (msg='')=>{
    if (msg) {
        console.log(msg)
    }
    beep()
    process.exit(1)
}
exports.exit = exit


/**
 * 脚本暂停等待
 * @param {number} milliseconds  毫秒
 * @returns 
 */
 let sleep = (milliseconds)=>{
    if(milliseconds<1){
        return;
    }
    let url = `${CppUrl}?action=httpSleep&milliseconds=${milliseconds}`
    // console.log(url)
    let res = request('GET', url);
    return res;
}
exports.sleep = sleep

/**
 * 移动鼠标到指定位置  起点为屏幕左上角
 * @param {number} x   横坐标
 * @param {number} y   纵坐标
 * @returns 
 */
let moveMouseSmooth = (x,y)=>{
    x=Math.round(x)
    y=Math.round(y)
    let url = `${CppUrl}?action=moveMouse&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);

    sleep(defaultDelay);
    return res;
}
exports.moveMouseSmooth = moveMouseSmooth
exports.moveMouse = moveMouseSmooth  //增加别名


/**
 * 移动鼠标到指定位置并点击
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 */
let moveAndClick = (x,y)=>{
    this.moveMouse(x,y)
    this.mouseClick()
}
exports.moveAndClick = moveAndClick


/**
 * 当前位置点击鼠标 默认左键  可选 'right'
 * @param {string} leftRight    可选
 * @param {number} 点按时间 单位毫秒  可选
 * @returns 
 */
let mouseClick = (leftRight = 'left',time=30)=>{

    let url = `${CppUrl}?action=mouseLeftClick&time=${time}`
    if (leftRight == 'right') {
        url = `${CppUrl}?action=mouseRightClick&time=${time}`
    }

    // console.log(url)
    let res = request('GET', url);

    sleep(defaultDelay);
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

    sleep(defaultDelay);
    return res;
}
exports.mouseDoubleClick = mouseDoubleClick


/**
 * 鼠标滚轮
 * @param {number} data 滚动的量  默认为-720   向下滚动720度
 * @returns 
 */
let mouseWheel = (data = -720)=>{
    let url = `${CppUrl}?action=mouseWheel&data=${data}`
    // console.log(url)
    let res = request('GET', url);
    sleep(defaultDelay);
    return res;
}
exports.mouseWheel = mouseWheel


/**
 * 鼠标左键拖到指定位置
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let mouseLeftDragTo = (x,y)=>{
    let url = `${CppUrl}?action=mouseLeftDragTo&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);
    sleep(defaultDelay);
    return res;
}
exports.mouseLeftDragTo = mouseLeftDragTo


/**
 * 鼠标右键拖到指定位置
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
let mouseRightDragTo = (x,y)=>{
    let url = `${CppUrl}?action=mouseRightDragTo&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);
    sleep(defaultDelay);
    return res;
}
exports.mouseRightDragTo = mouseRightDragTo



/**
 * 屏幕一个点取色
 * @param {number} x 
 * @param {number} y 
 * @returns 返回颜色值 
 */
let getScreenColor = (x,y)=>{
    let url = `${CppUrl}?action=getScreenColor&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);
    let jsonRes = JSON.parse(res.getBody('utf8'))
    return jsonRes.rs;
}
exports.getScreenColor = getScreenColor


/**
 * 屏幕截图
 * @param {string} savePath  保存路径默认 我的图片，图片格式为PNG；如果使用自定义路径请以 '.png' 结尾; 
 * @param {number} x  截图开始位置
 * @param {number} y 
 * @param {number} w  可选 截图宽度
 * @param {number} h  可选 截图长度
 * @returns 
 */
let screenShot = (savePath='',x=0,y=0,w=-1,h=-1)=>{
    savePath = encodeURIComponent(savePath)
    let url = `${CppUrl}?action=screenShot&savePath=${savePath}&x=${x}&y=${y}&w=${w}&h=${h}`
    // console.log(url)
    let res = request('GET', url);
    res = res.getBody('utf8')
    return res;
}
exports.screenShot = screenShot


/**
 * 模拟按键触发事件
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 * @param {string} upDown  默认按下down，up松开按键
 * @returns 
 */
let keyToggle = (key,upDown='down')=>{
    
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

    sleep(defaultDelay);
}
exports.keyTap = keyTap


/**
 * 屏幕查找图象定位
 * @param {string} tpPath 搜索的小图片，建议png格式  相对路径
 * @param {number} miniSimilarity 可选，指定最低相似度，默认0.9。取值0-1，1为找到完全相同的。
 * @param {number} fromX=0 可选，查找开始的开始横坐标
 * @param {number} fromY=0 可选，查找开始的开始纵坐标
 * @param {number} width=-1 可选，搜索宽度
 * @param {number} height=-1 可选，搜索高度
 * @returns 返回找到的结果json 格式：{x,y}
 */
var findScreen = (tpPath,miniSimilarity=0.9,fromX=0,fromY=0,width=-1,height=-1) =>{

    if (fromX<0 || fromY<0) {
        exit(`错误：找图起始点不能为负，x:${fromX} y:${fromY} `);
    }
    tpPath = jsPath+tpPath;
    tpPath = encodeURIComponent(tpPath)
    let url = `${CppUrl}?action=findScreen&imgPath=${tpPath}&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}`
    // console.log(url)
    let res = request('GET', url);

    // console.log(res.getBody('utf8'));
    jsonRes = JSON.parse(res.getBody('utf8'));
    // console.log(jsonRes);

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
 * 屏幕查找物体或者窗口轮廓
 * @param {number} minimumArea 轮廓最小面积  默认过滤掉 10x10 以下的元素
 * @param {number} fromX  开始坐标
 * @param {number} fromY 
 * @param {number} width  作用范围
 * @param {number} height 
 * @returns 所有查找到的轮廓信息  
 */
var findContours = (minimumArea=1000,fromX=0,fromY=0,width=-1,height=-1) =>{

    if (fromX<0 || fromY<0) {
        exit(`错误：轮廓查找起始点不能为负，x:${fromX} y:${fromY} `);
    }
    let url = `${CppUrl}?action=findContours&minimumArea=${minimumArea}&fromX=${fromX}&fromY=${fromY}&width=${width}&height=${height}`
    // console.log(url)
    let res = request('GET', url);

    // console.log(res.getBody('utf8'));
    jsonRes = JSON.parse(res.getBody('utf8'));

    // console.log(jsonRes);

    return jsonRes;
}
exports.findContours = findContours

/**
 * 当前位置 粘贴（输入）文字  
 * @param {string} text  复制到电脑剪切板的文本
 */
var paste = (txt)=>{
    txt =  encodeURIComponent(txt)
    url = `${CppUrl}?action=paste&txt=${txt}`
    // console.log(url)
    request('GET', url);
    sleep(defaultDelay);
}
exports.paste = paste

/**
 * 获取当前电脑的剪切板内容，系统剪切板支持多种格式   版本 V2024.2 开始生效
 * ①纯文本格式：普通复制  如'小瓶RPA'
 * ②图片格式 base64形式：浏览器复制图片    'data:image/png;base64,' 开头
 * ③html格式：浏览器或者钉钉复制富文本综合内容    '<html>'开头
 * @returns 结果文本
 */
var getClipboard= ()=>{
    let url = `${CppUrl}?action=getClipboard`
    // console.log(url)
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.getClipboard = getClipboard



/**
 * 通知到手机
 * 通过小瓶云发送微信通知 (微信到达率高，并且免费)
 * @param {string} title 消息标题
 * @param {string} content  消息详细内容
 * @param {string} key  获取key详情方法：https://www.pbottle.com/a-12586.html
 */
var wxMessage= (title,content,key)=>{
    
    let url =  `https://yun.pbottle.com/manage/yun/?msg=${encodeURIComponent(content)}&name=${encodeURIComponent(title)}&key=${key}`;
    let res = request('GET', url);
    console.log('发送微信消息：',res.getBody('utf8') );

}
exports.wxMessage = wxMessage


/**
 * 向指定API网址post一个json，最常用网络接口方式
 * @param {string} API 网络地址 
 * @param {object} Json对象 
 * @returns 
 */
var postJson= (url,msgJson)=>{
    let res = request('POST',url,{json:msgJson});
    console.log('Post反馈：',res.getBody('utf8') );
    return res.getBody('utf8')
}
exports.postJson = postJson

/**
 * 从文本到语音(TextToSpeech)  语音播报
 * 非阻塞
 * @param {string} text 朗读内容
 */
var tts= (text)=>{
    text = encodeURIComponent(text)
    let url = `${CppUrl}?action=tts&txt=${text}`
    // console.log(url)
    let res = request('GET', url);
    sleep(defaultDelay);
}
exports.tts = tts


/**
 * 用电脑默认浏览器打开网址
 * @param {string} myurl 网址
 */
var openURL= (myurl)=>{
    myurl = encodeURIComponent(myurl)
    let url = `${CppUrl}?action=openURL&url=${myurl}`
    // console.log(url)
    let res = request('GET', url);
    sleep(defaultDelay+1000);
}
exports.openURL = openURL



/**
 * 用资源管理器打开展示文件夹
 * @param {string} path 文件夹路径  如：'./input/RPAlogo128.png'  Windows磁盘路径分隔符要双 '\\'
 */
var openDir= (path)=>{
    path = encodeURIComponent(path)
    let url = `${CppUrl}?action=openDir&path=${path}`
    // console.log(url)
    let res = request('GET', url);
    sleep(defaultDelay);
}
exports.openDir = openDir



/**
 * 获取当前屏幕分辨率和缩放 
 * @returns JSON内容格式 {w:1920,h:1080,ratio:1.5} ratio 为桌面缩放比例
 */
var getResolution= ()=>{
    let url = `${CppUrl}?action=getResolution`
    // console.log(url)
    let res = request('GET', url);
    return JSON.parse(res.getBody('utf8'));
}
exports.getResolution = getResolution



/**
 * 文字识别 OCR已经从经典算法升级为AI模型预测，永久免费可脱网使用
 * 
 * @param {string} imagePath 空或者screen 为电脑屏幕;  或者本地图片的绝对路径;
 * @param {number} x 可选 剪裁起始点  左上角开始
 * @param {number} y 可选 剪裁起始点
 * @param {number} width  可选 剪裁宽度
 * @param {number} height 可选 剪裁高度
 * 
 * @returns  AI OCR识别的json结果 包含准确率的评分    格式： [{text:'A',score:'0.319415'},...]
 */
var aiOcr= (imagePath="screen", x=0, y=0, width=-1, height=-1)=>{
    
    if (x<0 || y<0) {
        exit(`错误：OCR 起始点不能为负，x:${x} y:${y} `);
    }
    
    imagePath = encodeURIComponent(imagePath);
    let url = `${CppUrl}?action=aiOcr&path=${imagePath}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    // console.log(url)
    let res = request('GET', url);
    return JSON.parse(res.getBody('utf8'));
}
exports.aiOcr = aiOcr

/**
 * 获取buffer存储内容
 * 此buffer可以跨脚本存取，RPA重启时才重置，存取多线程下安全
 * http外部获取方式：http://ip:49888/action=bufferGet&n=0 
 * @param {number} n buffer编号，从0-9共10个  默认：0 第一个buffer
 * @returns  字符串
 */
var bufferGet = (n=0)=>{
    let url = `${CppUrl}?action=bufferGet&n=${n}`
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.bufferGet = bufferGet


/**
 * 设置buffer存储内容
 * 此buffer可以跨脚本存取，RPA重启时才重置，存取多线程下安全
 * http外部设置方式（POST方法）：http://ip:49888/action=bufferSet&n=0 ，content设置到Post的body中
 * @param {string} content 存储的内容，通常为一个json，也可以字符串
 * @param {number} n buffer编号，从0-9共10个  默认：0 第一个buffer
 * @returns  ok 表示成功
 */
var bufferSet = (content,n=0)=>{
    
    let url = `${CppUrl}?action=bufferSet&n=${n}`
    let res = postJson(url,content);
    return res;

}
exports.bufferSet = bufferSet


/**
 * 获取当前的设备唯一号
 * @returns String
 */
var deviceID = ()=>{
    let url = `${CppUrl}?action=pbottleRPA_deviceID`
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.deviceID = deviceID


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 警告框
 * @param {string} msg 显示文本内容
 * @returns 
 */
var browserCMD_alert = function(msg){

    let action = 'alert';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');

}
exports.browserCMD_alert = browserCMD_alert;



/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 模拟点击   参考 jQuery click() 方法，改为浏览器 native 的 click()
 * @param {string} selector   元素选择器
 * @returns 
 */
 var browserCMD_click = function(selector){

    let action = 'click';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.browserCMD_click = browserCMD_click;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 显示   参考 jQuery show() 方法 
 * @param {string} selector   元素选择器
 * @returns 
 */
var browserCMD_show = function(selector){

    let action = 'show';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.browserCMD_show = browserCMD_show;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 隐藏   参考 jQuery hide() 方法 
 * @param {string} selector   元素选择器
 * @returns 
 */
var browserCMD_hide = function(selector){

    let action = 'hide';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.browserCMD_hide = browserCMD_hide;



/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 移除元素   参考 jQuery remove() 方法 
 * @param {string} selector   元素选择器
 * @returns 
 */
 var browserCMD_remove = function(selector){

    let action = 'remove';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.browserCMD_remove = browserCMD_remove;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或者设置文本   参考 jQuery text() 方法
 * @param {string} selector  元素选择器
 * @param {string} content
 * @returns 选择多个元素时会返回一个数组
 */
var browserCMD_text = function(selector,content=undefined){

    let action = 'text';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');

}
exports.browserCMD_text = browserCMD_text;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或者设置html   参考 jQuery html() 方法
 * @param {string} selector  元素选择器
 * @param {string} content
 * @returns 选择多个元素时会返回一个数组
 */
var browserCMD_html = function(selector,content=undefined){

    let action = 'html';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');

}
exports.browserCMD_html = browserCMD_html;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置值 input select等   参考 jQuery val() 方法
 * @param {string} selector  元素选择器
 * @param {string} content
 * @returns 选择多个元素时会返回一个数组
 */
 var browserCMD_val = function(selector,content=undefined){

    let action = 'val';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');

}
exports.browserCMD_val = browserCMD_val;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置当前站点的 cookie
 * @param {string} cName  cookie 名称 
 * @param {string} cValue cookie 值  留空为获取cookie的值
 * @param {number} expDays cookie 过期时间，单位：天, 留空为会话cookie
 * @returns  返回 cookie的值
 */
 var browserCMD_cookie = function(cName,cValue=undefined,expDays=undefined){

    let action = 'cookie';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');
}
exports.browserCMD_cookie = browserCMD_cookie;


/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置css样式   参考 jQuery css() 方法
 * @param {string} selector  元素选择器
 * @param {string} 名
 * @param {string} 值
 * @returns 
 */
 var browserCMD_css = function(selector,propertyname,value=undefined){

    let action = 'css';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');

}
exports.browserCMD_css = browserCMD_css;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置attr样式   参考 jQuery attr() 方法
 * @param {string} selector 元素选择器
 * @param {string} 属性名
 * @param {string} 值
 * @returns 
 */
var browserCMD_attr = function(selector,propertyname,value=undefined){

    let action = 'attr';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');

}
exports.browserCMD_attr = browserCMD_attr;

/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 获取或设置prop样式   参考 jQuery prop() 方法
 * @param {string} selector 元素选择器
 * @param {string} 属性名
 * @param {string} value
 * @returns 
 */
 var browserCMD_prop = function(selector,propertyname,value=undefined){

    let action = 'prop';

    let [...args] = arguments;
    let url = `${CppUrl}?action=webInject&jscode=` + encodeURIComponent(JSON.stringify({action,args}))
    let res = request('GET', url);
    return res.getBody('utf8');

}
exports.browserCMD_prop = browserCMD_prop;


/**
 * 常用工具
 * 等待屏幕上的图片出现
 * @param {string} tpPath 图片模板路径
 * @param {Function} intervalFun 间隔的收入，function格式
 * @param {number} timeOut 等待超时时间 单位秒
 * @returns 结果的位置信息，json格式：{x,y}
 */
function waitImage(tpPath, intervalFun = () => { }, timeOut = 30) {
    console.log('waitImage',tpPath);
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let position = findScreen(tpPath)
        if (position !== false) {
            return position;
        }

        if (intervalFun() == 'stopWait') {
            console.log('stopWait from intervalFun');
            return false
        }
    }
    //error
    let frame = new Error().stack.split("\n")[2]; // change to 3 for grandparent func
    let lineNumber = frame.split(":").reverse()[1];
    let functionName = frame.split(" ")[5];
    exit(`等待图片超时 ${tpPath} line:${lineNumber} function:${functionName}`)
}
exports.waitImage =  waitImage;

/**
 * 常用工具
 * 等待屏幕上的图片消失
 * @param {string} tpPath 图片模板路径
 * @param {function} intervalFun 间隔的收入，function格式
 * @param {number} timeOut 等待超时时间 单位秒
 * @returns  
 */
function waitImageDisappear(tpPath, intervalFun = () => { }, timeOut = 30) {
    console.log('waitImageDisappear',tpPath);
    for (let index = 0; index < timeOut; index++) {
        sleep(1000)
        let position = findScreen(tpPath)
        if (position === false) {
            return 'ok';
        }
        if (intervalFun() == 'stopWait') {
            console.log('stopWait from intervalFun');
            return false
        }
    }
    //error
    let frame = new Error().stack.split("\n")[2]; // change to 3 for grandparent func
    let lineNumber = frame.split(":").reverse()[1];
    let functionName = frame.split(" ")[5];
    exit(`等待图片消失超时 ${tpPath} line:${lineNumber} function:${functionName}`)
}
exports.waitImageDisappear =  waitImageDisappear;
