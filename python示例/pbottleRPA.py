"""
小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
官网：https://rpa.pbottle.com/

"""
import time
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
    }

    upDown_n = 0;
    if upDown == 'up':
        upDown_n = 2;

    key_n = 0;
    if len(key)==1:
        key_n = ord(key)
    else:
        for item_key, item_asc2 in replacement_dict.items():
            if key == item_key:
                key_n = item_asc2


    url = f'{CppUrl}?action=keyToggle&key_n={key_n}&upDown_n={upDown_n}'
    print(url)
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
        subkeys = subkeys.reverse()
        for element in subkeys:
            keyToggle(element,"up")
                
    else:
        keyToggle(key,"down")
        keyToggle(key,"up")
    
    sleep(defaultDelay);

