"""
小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
官网：https://rpa.pbottle.com/

Nodejs 移植兼容版

js -> python 对照表：

console.log ->  print  日志
json ->  {}   json 字典 
`` ->  f""   字符串模板
encodeURIComponent -> urlencode

"""

import time
import json
import sys
import urllib.request #发送请求
import urllib.parse

# 当前脚本的路径
# jsPath = path.resolve('./')+'/';
CppUrl = 'http://127.0.0.1:49888/'
print("基座服务地址：（python）",CppUrl)
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
    respose = urllib.request.urlopen(url)
    return json.loads(respose.read().decode("utf-8"))


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
    respose = urllib.request.urlopen(url)
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
    respose = urllib.request.urlopen(url)
    sleep(defaultDelay);


def mouseDoubleClick():
    """
    * 双击鼠标  默认左键
    """
    url = f'{CppUrl}?action=mouseDoubleClick'
    respose = urllib.request.urlopen(url)
    sleep(defaultDelay)



def mouseWheel(data = -720):
    """
    * 鼠标滚轮
    * @param {number} data 滚动的量  默认为-720   向下滚动720度
    * @returns 
    """
    url = f"{CppUrl}?action=mouseWheel&data={data}"
    respose = urllib.request.urlopen(url)
    sleep(defaultDelay);



def mouseLeftDragTo(x,y):
    """
    * 鼠标左键拖到指定位置
    * @param {number} x 
    * @param {number} y 
    """
    url = f'{CppUrl}?action=mouseLeftDragTo&x={x}&y={y}'
    respose = urllib.request.urlopen(url)
    sleep(defaultDelay);


def mouseRightDragTo(x,y):
    """
    * 鼠标右键拖到指定位置
    * @param {number} x 
    * @param {number} y 
    * @returns 
    """
    url = f'{CppUrl}?action=mouseRightDragTo&x={x}&y={y}'
    respose = urllib.request.urlopen(url)
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
    respose = urllib.request.urlopen(url)
