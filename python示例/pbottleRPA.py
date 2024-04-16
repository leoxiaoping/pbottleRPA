"""
小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
官网：https://rpa.pbottle.com/

Nodejs 移植兼容版 beta
注：目前尚未完全移植nodejs版本中所有API，正在持续更新中

js -> python 对照表：

console.log ->  print  日志
json ->  {}   json 字典 
`` ->  f""   字符串模板
encodeURIComponent -> urlencode

"""

import time
import json
import sys
import os
import inspect
import urllib.request #发送请求
import urllib.parse

# 当前脚本的路径
jsPath = os.getcwd()
CppUrl = 'http://127.0.0.1:49888/'
print("基座服务地址：（Python）",CppUrl)
defaultDelay = 1000;  #默认值一秒


def urlencode(input):
    """
    js兼容版的 urlencode
    """
    rsString = urllib.parse.urlencode({'myrs':input})
    return rsString.replace('myrs=','')

def setDefaultDelay(millisecond):
    """
    #  * 设置RPA模拟操作的延时  包含鼠标、键盘、粘贴、打开网页操作
    #  * 设置为 0  可以用 sleep() 手动管理操作延时
    """
    global defaultDelay
    defaultDelay=millisecond


def sleep(milliseconds):
    """
    脚本暂停等待 毫秒单位
    """
    if(milliseconds<1):
        return
    time.sleep(milliseconds/1000)


def openURL(myurl):
    """
    #浏览器打开网址
    """
    myurl = urlencode(myurl)
    url = f'{CppUrl}?action=openURL&url={myurl}'
    urllib.request.urlopen(url)
    sleep(defaultDelay+1000);


def beep():
    """
    #  * 发出系统警告声音
    #  * @returns 
    """
    url = f'{CppUrl}?action=beep'
    urllib.request.urlopen(url)


def paste(txt):
    """
    * 当前位置 粘贴（输入）文字  
    * @param {string} text  复制到电脑剪切板的文本
    """
    txt =  urlencode(txt)
    url = f'{CppUrl}?action=paste&txt={txt}'
    urllib.request.urlopen(url);
    sleep(defaultDelay);



def keyToggle(key,upDown='down'):
    """
    #  * 模拟按键触发事件
    #  * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
    #  * @param {string} upDown  默认按下down，up松开按键
    """
    key = key.strip()
    replacement_dict = {
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
    }

    upDown_n = 0;
    if upDown == 'up':
        upDown_n = 2;

    key_n = 0;
    if len(key)==1:
        key_n = ord(key.upper()) 
    else:
        for item_key, item_asc2 in replacement_dict.items():
            if key == item_key:
                key_n = item_asc2
    if(key_n == 0):
        print('输入键名不存在！',key)
        return

    url = f'{CppUrl}?action=keyToggle&key_n={key_n}&upDown_n={upDown_n}'
    # print(url)
    urllib.request.urlopen(url)


def keyTap (key):
    """
    * 按一下键盘   支持组合按键 加号连接 如：  keyTap('ctrl + a')
    * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
    """
    if '+' in key:
        subkeys = [];
        subkeys = key.split('+')
        subkeys = [item.strip() for item in subkeys]

        for element in subkeys:
            keyToggle(element,"down")

        subkeys.reverse()
        for element in subkeys:
            keyToggle(element,"up")
                
    else:
        keyToggle(key,"down")
        keyToggle(key,"up")
    
    sleep(defaultDelay);


def tts(text):
    """
    * 从文本到语音(TextToSpeech)  语音播报
    * 非阻塞
    * @param {string} text 朗读内容
    """
    text = urlencode(text)
    url = f'{CppUrl}?action=tts&txt={text}'
    urllib.request.urlopen(url);
    sleep(defaultDelay);



def getResolution():
    """
    * 获取当前屏幕分辨率和缩放 
    * @returns JSON内容格式 {w:1920,h:1080,ratio:1.5} ratio 为桌面缩放比例
    """
    url = f"{CppUrl}?action=getResolution"
    response = urllib.request.urlopen(url)
    return json.loads(response.read().decode("utf-8"))


def exit(msg=''):
    """
    * 强制退出当前脚本
    * @param {string} msg 退出时候输出的信息
    """
    if (msg):
        print(msg)
    beep()
    sys.exit(0)


def moveMouseSmooth(x,y):
    """
    * 移动鼠标到指定位置  起点为屏幕左上角
    * @param {number} x   横坐标
    * @param {number} y   纵坐标
    """
    x=round(x)
    y=round(y)
    url = f'{CppUrl}?action=moveMouse&x={x}&y={y}'
    response = urllib.request.urlopen(url)
    sleep(defaultDelay)
moveMouse = moveMouseSmooth  #增加别名


def moveAndClick (x,y):
    """
    * 移动鼠标到指定位置并点击
    * @param {number} x 横坐标
    * @param {number} y 纵坐标
    """
    moveMouse(x,y)
    mouseClick()


def mouseClick(leftRight = 'left',time=30):
    """
    * 当前位置点击鼠标 默认左键  可选 'right'
    * @param {string} leftRight    可选
    * @param {number} time 点按时间 单位毫秒  可选
    """
    url = f"{CppUrl}?action=mouseLeftClick&time={time}"
    if (leftRight == 'right') :
        url = f"{CppUrl}?action=mouseRightClick&time={time}"
    response = urllib.request.urlopen(url)
    sleep(defaultDelay);


def mouseDoubleClick():
    """
    * 双击鼠标  默认左键
    """
    url = f'{CppUrl}?action=mouseDoubleClick'
    response = urllib.request.urlopen(url)
    sleep(defaultDelay)



def mouseWheel(data = -720):
    """
    * 鼠标滚轮
    * @param {number} data 滚动的量  默认为-720   向下滚动720度
    * @returns 
    """
    url = f"{CppUrl}?action=mouseWheel&data={data}"
    response = urllib.request.urlopen(url)
    sleep(defaultDelay);



def mouseLeftDragTo(x,y):
    """
    * 鼠标左键拖到指定位置
    * @param {number} x 
    * @param {number} y 
    """
    url = f'{CppUrl}?action=mouseLeftDragTo&x={x}&y={y}'
    response = urllib.request.urlopen(url)
    sleep(defaultDelay);


def mouseRightDragTo(x,y):
    """
    * 鼠标右键拖到指定位置
    * @param {number} x 
    * @param {number} y 
    * @returns 
    """
    url = f'{CppUrl}?action=mouseRightDragTo&x={x}&y={y}'
    response = urllib.request.urlopen(url)
    sleep(defaultDelay);



def showMsg(title,content):
    """
    * 系统原生消息提示
    * @param {string} title  标题
    * @param {string} content  内容
    * @returns
    """
    title = urlencode(title)
    content = urlencode(content)
    url = f'{CppUrl}?action=showMsg&title={title}&content={content}'
    response = urllib.request.urlopen(url)



def showRect(fromX=0,fromY=0,width=500,height=500,color='red',msec=500):
    """
    * 有效屏幕内显示一个彩色方框，直观提示流程操作范围和目标的当前的定位
    * V2024.6以上版本有效
    * @param {number} fromX  起始位置xy坐标，屏幕左上角为零点
    * @param {number} fromY 
    * @param {number} width  宽度
    * @param {number} height 高度
    * @param {string} color  颜色 红绿蓝黄4色可选：red|green|blue|yellow 
    * @param {number} msec  显示持续时间 单位毫秒
    * @returns 
    """
    color = urlencode(color)
    fromX=int(fromX)
    fromY=int(fromY)
    width=int(width)
    height=int(height)
    url = f'{CppUrl}?action=showRect&fromX={fromX}&fromY={fromY}&width={width}&height={height}&color={color}&msec={msec}'
    response = urllib.request.urlopen(url)



def screenShot(savePath='',x=0,y=0,w=-1,h=-1):
    """
    * 屏幕截图
    * @param {string} savePath  保存路径默认 我的图片，图片格式为PNG；如果使用自定义路径请以 '.png' 结尾; 
    * @param {number} x  截图开始位置
    * @param {number} y 
    * @param {number} w  可选 截图宽度
    * @param {number} h  可选 截图长度
    * @returns 
    """
    savePath = urlencode(savePath)
    if x!=0 or y!=0 or w!=-1 or h!=-1 :
        showRect(x,y,w,h);

    x=int(x)
    y=int(y)
    w=int(w)
    h=int(h)
    url = f'{CppUrl}?action=screenShot&savePath={savePath}&x={x}&y={y}&w={w}&h={h}'
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")  #返回string


def getClipboard():
    """
    * 获取当前电脑的剪切板内容，系统剪切板支持多种格式   版本 V2024.2 开始生效
    * ①纯文本格式：普通复制  如'小瓶RPA'
    * ②图片格式 base64形式：浏览器复制图片    'data:image/png;base64,' 开头
    * ③html格式：浏览器或者钉钉复制富文本综合内容    '<html>'开头
    * @returns 结果文本
    """
    url = f'{CppUrl}?action=getClipboard'
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")



def wxMessage(title,content,key):
    """
    * 通知到手机
    * 通过小瓶云发送微信通知 (微信到达率高，并且免费)
    * @param {string} title 消息标题
    * @param {string} content  消息详细内容
    * @param {string} key  获取key详情方法：https://www.pbottle.com/a-12586.html
    """
    url =  f'https://yun.pbottle.com/manage/yun/?msg={urlencode(content)}&name={urlencode(title)}&key={key}';
    response = urllib.request.urlopen(url)
    print('发送微信消息：',response.read().decode("utf-8") );




def postJson(url,msgJson):
    """
    * 向指定API网址post一个json，最常用网络接口方式
    * @param {string} url API网络地址 
    * @param {object} msgJson Json对象  -- python 中为字典对象
    * @returns 
    """
    # 将Python字典转换为JSON格式的字符串
    json_data = json.dumps(msgJson).encode('utf-8')
    # 创建请求对象
    req = urllib.request.Request(url, data=json_data, headers={'Content-Type': 'application/json'}, method='POST')
    # 发送POST请求
    with urllib.request.urlopen(req) as f:
        response = f.read().decode('utf-8')
    return response



def openDir(path):
    """
    * 用资源管理器打开展示文件夹
    * @param {string} path 文件夹路径  如：'./input/RPAlogo128.png'  Windows磁盘路径分隔符要双 '\\'
    """
    path = urlencode(path)
    url = f'{CppUrl}?action=openDir&path={path}'
    response = urllib.request.urlopen(url)
    sleep(defaultDelay);



def getScreenColor(x,y):
    """
    * 屏幕一个点取色
    * @param {number} x 
    * @param {number} y 
    * @returns 返回颜色值
    """
    url = f'{CppUrl}?action=getScreenColor&x={x}&y={y}'
    response = urllib.request.urlopen(url)
    jsonRes = json.loads(response.read().decode("utf-8"))
    return jsonRes["rs"];


def findScreen(tpPath,miniSimilarity=0.9,fromX=0,fromY=0,width=-1,height=-1):
    """
    * 屏幕查找图象定位
    * @param {string} tpPath 搜索的小图片，建议png格式  相对路径
    * @param {number} miniSimilarity 可选，指定最低相似度，默认0.9。取值0-1，1为找到完全相同的。
    * @param {number} fromX=0 可选，查找开始的开始横坐标
    * @param {number} fromY=0 可选，查找开始的开始纵坐标
    * @param {number} width=-1 可选，搜索宽度
    * @param {number} height=-1 可选，搜索高度
    * @returns 返回找到的结果json 格式：{x,y}  python 为字典格式
    """

    if (fromX<0 or fromY<0) :
        exit('错误：找图起始点不能为负，x:{fromX} y:{fromY}')
    
    if (fromX!=0 or fromY!=0 or width!=-1 or height!=-1) :
        showRect(fromX,fromY,width,height);

    tpPath = jsPath+tpPath;
    tpPath = urlencode(tpPath)
    url = f'{CppUrl}?action=findScreen&imgPath={tpPath}&fromX={fromX}&fromY={fromY}&width={width}&height={height}'

    response = urllib.request.urlopen(url)
    jsonRes = json.loads(response.read().decode("utf-8"))

    if "error" in jsonRes:
        return False
    if (jsonRes["value"]<miniSimilarity) :
        return False
    showRect(jsonRes["x"]-25,jsonRes["y"]-25,50,50,'green')
    return jsonRes



def waitImage(tpPath, intervalFun = None, timeOut = 30):
    """
    * 常用工具
    * 等待屏幕上的图片出现
    * @param {string} tpPath 图片模板路径
    * @param {Function} intervalFun 检测间隔的操作，function格式
    * @param {number} timeOut 等待超时时间 单位秒
    * @returns 结果的位置信息，json格式：{x,y}
    """
    print('waitImage',tpPath)
    for index in range(timeOut):
        sleep(1000)
        position = findScreen(tpPath)
        if (position != False) :
            return position
        if (intervalFun() == 'stopWait') :
            print('stopWait from intervalFun');
            return False
    #error
    lineNumber = inspect.currentframe().f_back.f_lineno
    exit(f'等待图片超时 ${tpPath} 位置（行）:{lineNumber}')



"""
以下是浏览器增强插件接口 🌐
以下是浏览器增强插件接口 🌐
以下是浏览器增强插件接口 🌐
"""

def browserCMD_alert(msg):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 警告框
    * @param {string} msg 显示文本内容
    * @returns  正常返回ok
    """
    action = 'alert'
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":[msg]}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")



def browserCMD_click(selector):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 模拟点击   参考 jQuery click() 方法，改为浏览器 native 的 click() 并获取焦点
    * @param {string} selector   元素选择器
    * @returns 
    """
    action = 'click'
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":[selector]}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_show(selector):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 显示   参考 jQuery show() 方法 
    * @param {string} selector   元素选择器
    * @returns 
    """
    action = 'show'
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":[selector]}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")



def browserCMD_hide(selector):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 隐藏   参考 jQuery hide() 方法 
    * @param {string} selector   元素选择器
    * @returns 
    """
    action = 'hide'
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":[selector]}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_remove(selector):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 移除元素   参考 jQuery remove() 方法 
    * @param {string} selector   元素选择器
    * @returns 
    """
    action = 'remove'
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":[selector]}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")



def browserCMD_val(selector,content=None):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 获取或设置值 input select等   参考 jQuery val() 方法
    * @param {string} selector  元素选择器
    * @param {string} content  可选，值
    * @returns 选择多个元素时会返回一个数组
    """
    action = 'val'
    args = [selector]
    if content is not None:
        args.append(content)
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":args}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_text(selector,content=None):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 获取或者设置文本   参考 jQuery text() 方法
    * @param {string} selector  元素选择器
    * @param {string} content 可选
    * @returns 选择多个元素时会返回一个数组
    """
    action = 'text'
    args = [selector]
    if content is not None:
        args.append(content)
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":args}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_html(selector,content=None):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 获取或者设置html   参考 jQuery html() 方法
    * @param {string} selector  元素选择器
    * @param {string} content  可选
    * @returns 选择多个元素时会返回一个数组
    """
    action = 'html'
    args = [selector]
    if content is not None:
        args.append(content)
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":args}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_cookie(cName,cValue=None,expDays=None):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 获取或设置当前站点的 cookie
    * @param {string} cName  cookie 名称 
    * @param {string} cValue cookie 值  留空为获取cookie的值
    * @param {number} expDays cookie 过期时间，单位：天, 留空为会话cookie
    * @returns  返回 cookie的值
    """
    action = 'cookie'
    args = [cName]
    if cValue is not None:
        args.append(cValue)
    if expDays is not None:
        args.append(expDays)
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":args}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_css(selector,propertyname,value=None):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 获取或设置css样式   参考 jQuery css() 方法
    * @param {string} selector  元素选择器
    * @param {string} propertyname 名
    * @param {string} value 值
    * @returns 
    """
    action = 'css'
    args = [selector,propertyname]
    if value is not None:
        args.append(value)
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":args}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_attr(selector,propertyname,value=None):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 获取或设置attr属性   参考 jQuery attr() 方法
    * @param {string} selector 元素选择器
    * @param {string} propertyname 属性名
    * @param {string} value 值
    * @returns 
    """
    action = 'attr'
    args = [selector,propertyname]
    if value is not None:
        args.append(value)
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":args}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")


def browserCMD_prop(selector,propertyname,value=None):
    """
    * 浏览器增强命令  需要安装小瓶RPA的浏览器拓展
    * 获取或设置prop属性   参考 jQuery prop() 方法
    * @param {string} selector 元素选择器
    * @param {string} propertyname 属性名
    * @param {string} value 值
    """
    action = 'prop'
    args = [selector,propertyname]
    if value is not None:
        args.append(value)
    url = f"{CppUrl}?action=webInject&jscode=" + urlencode(json.dumps({"action":action,"args":args}))
    response = urllib.request.urlopen(url)
    return response.read().decode("utf-8")



"""
入口检测
"""

if __name__ == '__main__':
    """
    入口检测提示
    """
    print('当前文件不能执行',"请直接执行中文名的脚本文件");
    showMsg('当前文件不能执行',"请直接执行中文名的脚本文件");
    exit()