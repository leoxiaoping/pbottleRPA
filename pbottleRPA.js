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
 * 获得基座版本号
 * @returns 返回格式：{}
 */
let getBaseVersion = ()=>{
    let url = `${CppUrl}?action=getBaseVersion`
    // console.log(url)
    let res = request('GET', url);
    let jsonRes = JSON.parse(res.getBody())
    return jsonRes.rs;
}
exports.beep = getBaseVersion


/**
 * 强制退出当前脚本
 * @param {*} msg 退出时候输出的信息
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
    x=Math.round(x)
    y=Math.round(y)
    let url = `${CppUrl}?action=moveMouse&x=${x}&y=${y}`
    // console.log(url)
    let res = request('GET', url);

    sleep(100);
    return res;
}
exports.moveMouseSmooth = moveMouseSmooth
exports.moveMouse = moveMouseSmooth  //增加别名


/**
 * 移动鼠标到指定位置并点击
 * @param {*} x 横坐标
 * @param {*} y 纵坐标
 */
let moveAndClick = (x,y)=>{
    this.moveMouse(x,y)
    this.mouseClick()
}
exports.moveAndClick = moveAndClick


/**
 * 当前位置点击鼠标 默认左键  可选 'right'
 * @param {*} leftRight    可选
 * @param {*} 点按时间 单位毫秒  可选
 * @returns 
 */
let mouseClick = (leftRight = 'left',time=30)=>{

    let url = `${CppUrl}?action=mouseLeftClick&time=${time}`
    if (leftRight == 'right') {
        url = `${CppUrl}?action=mouseRightClick&time=${time}`
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
 * @param {*} w  可选 截图宽度
 * @param {*} h  可选 截图长度
 * @returns 
 */
let screenShot = (savePath='',x=0,y=0,w=-1,h=-1)=>{
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
 * @param {*} tpPath 搜索的小图片，建议png格式  相对路径
 * @param {*} miniSimilarity 可选，指定最低相似度，默认0.9。取值0-1，1为找到完全相同的。
 * @param {*} fromX=0 可选，查找开始的开始横坐标
 * @param {*} fromY=0 可选，查找开始的开始纵坐标
 * @param {*} width=-1 可选，搜索宽度
 * @param {*} height=-1 可选，搜索高度
 * @returns 返回找到的结果
 */
var findScreen = (tpPath,miniSimilarity=0.9,fromX=0,fromY=0,width=-1,height=-1) =>{

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
 * 当前位置 粘贴（输入）文字  
 * @param {*} text  复制到电脑剪切板的文本
 */
var paste = (txt)=>{
    txt =  encodeURIComponent(txt)
    url = `${CppUrl}?action=paste&txt=${txt}`
    // console.log(url)
    request('GET', url);
    sleep(100)
    
}

exports.paste = paste

/**
 * 获取当前电脑的剪切板内容   版本 V2023.5 开始生效
 * @returns 文本
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
 * 文字识别 OCR已经从经典算法升级为AI模型预测，永久免费可脱网使用
 * 
 * @param {*} imagePath 空或者screen 为电脑屏幕;  路径位绝对路径
 * 
 * @param {*} x 可选 剪裁起始点  左上角开始
 * @param {*} y 可选 剪裁起始点
 * @param {*} width  可选 剪裁宽度
 * @param {*} height 可选 剪裁高度
 * 
 * @returns   ai OCR识别的json结果 包含准确率的评分    格式： [{text:'A',score:'0.319415'},...]

 */
var aiOcr= (imagePath="screen", x=0, y=0, width=-1, height=-1)=>{
    

    imagePath = encodeURIComponent(imagePath);

    let url = `${CppUrl}?action=aiOcr&path=${imagePath}&x=${x}&y=${y}&width=${width}&height=${height}&onlyEn=0`
    // console.log(url)
    let res = request('GET', url);
    return JSON.parse(res.getBody('utf8'));
}
exports.aiOcr = aiOcr




/**
 * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
 * 警告框
 * @param {*} msg 显示文本内容
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
 * @param {*} selector   元素选择器
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
 * @param {*} selector   元素选择器
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
 * @param {*} selector   元素选择器
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
 * @param {*} selector   元素选择器
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
 * @param {*} selector  元素选择器
 * @param {*} content
 * @returns 
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
 * @param {*} selector  元素选择器
 * @param {*} content
 * @returns 
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
 * @param {*} selector  元素选择器
 * @param {*} content
 * @returns 
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
 * @param {*} cName  cookie 名称 
 * @param {*} cValue cookie 值  留空为获取cookie的值
 * @param {*} expDays cookie 过期时间，单位：天, 留空为会话cookie
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
 * @param {*} selector  元素选择器
 * @param {*} propertyname
 * @param {*} value
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
 * @param {*} selector 元素选择器
 * @param {*} 属性名
 * @param {*} value
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
 * @param {*} selector 元素选择器
 * @param {*} 属性名
 * @param {*} value
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