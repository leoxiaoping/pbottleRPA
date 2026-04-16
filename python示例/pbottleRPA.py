"""
小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
官网：https://rpa.pbottle.com/

Nodejs 移植兼容版 beta
注：目前已完成 NodeJS 版本 API 同步

js -> python 对照表：

console.log ->  print  日志
json ->  {}   json 字典
`` ->  f""   字符串模板
encodeURIComponent -> urlencode

"""

import time
import json
import sys
import io
import zipfile
import os
import inspect
import urllib.request
import urllib.parse
import subprocess
import base64
import tempfile
import smtplib
import ssl
import random
from email.header import Header
from email.mime.text import MIMEText
from email.utils import formataddr

# ========== 全局配置 ==========
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")
pyPath = os.path.dirname(os.path.abspath(__file__))
basePath = os.environ.get("RPAbaseDir", "")
homePath = os.environ.get("RPAhomeDir", "")
CppUrl = "http://127.0.0.1:49888/"
defaultDelay = 1000

print("基座服务地址：（Python）", CppUrl, "Python版本已同步NodeJS API")


# ========== 自定义异常 ==========
class RPAError(Exception):
    """RPA 操作异常基类"""

    pass


class TimeoutError(RPAError):
    """等待超时异常"""

    pass


# ========== 工具函数 ==========
def urlencode(input_str):
    """JS兼容的URL编码，等价于 encodeURIComponent"""
    return urllib.parse.quote(input_str, safe="")


def isNumeric(value):
    """
    判断是否为数字（包含数字字符串）
    @param value: 任意类型变量
    @return: bool
    """
    try:
        float(value)
        return True
    except (ValueError, TypeError):
        return False


def hasData(value):
    """
    判断变量是否包含有效数据（非零数字、非空字符串/列表/字典/对象等）
    @param value: 任意类型变量
    @return: bool
    """
    if value is None:
        return False
    if isinstance(value, str) and value.strip() == "":
        return False
    if isinstance(value, (list, tuple, dict)) and len(value) == 0:
        return False
    if isinstance(value, (int, float)) and (value == 0 or value != value):  # NaN check
        return False
    if isinstance(value, bool):
        return value
    return True


def getTime(format_str="Y-m-d H:i:s", timestamp=None):
    """
    格式化时间，支持 Y/y/m/d/H/i/s/n/j
    @param format_str: 格式字符串，如 'Y-m-d H:i:s'
    @param timestamp: 可选，Unix时间戳（秒）
    @return: 格式化后的时间字符串
    """
    if timestamp:
        date = time.localtime(timestamp)
    else:
        date = time.localtime()
    mapping = {
        "Y": date.tm_year,
        "y": str(date.tm_year)[-2:],
        "m": f"{date.tm_mon:02d}",
        "d": f"{date.tm_mday:02d}",
        "H": f"{date.tm_hour:02d}",
        "i": f"{date.tm_min:02d}",
        "s": f"{date.tm_sec:02d}",
        "n": date.tm_mon,
        "j": date.tm_mday,
    }
    result = format_str
    for k, v in mapping.items():
        result = result.replace(k, str(v))
    return result


def searchFile(directory, words="", recursive=False):
    """
    根据关键字搜索文件（递归可选）
    @param directory: 目录绝对路径
    @param words: 文件名包含的关键字（忽略大小写）
    @param recursive: 是否递归子目录
    @return: 匹配的文件路径列表
    """
    directory = os.path.abspath(directory)
    result = []
    words = words.lower()
    try:
        for root, dirs, files in os.walk(directory):
            if not recursive and root != directory:
                break
            for f in files:
                full_path = os.path.join(root, f)
                if words in full_path.lower():
                    result.append(full_path)
    except Exception:
        pass
    return result


def uniqid(prefix="", moreEntropy=False):
    """
    生成唯一ID（毫秒级）
    @param prefix: 前缀字符串
    @param moreEntropy: 是否增加随机熵
    @return: 唯一ID字符串
    """
    timestamp = format(int(time.time() * 1000), "x")
    rand = ""
    if moreEntropy:
        rand = format(random.randint(0, 0xFFFFFFFF), "x")
    return prefix + timestamp + rand


def substringFromTo(s, from_str="", to_str=""):
    """
    根据起始关键词截取字符串（不包含关键词本身）
    @param s: 原字符串
    @param from_str: 开始关键词，空表示从头部开始
    @param to_str: 结束关键词，空表示到结尾结束
    @return: 截取后的子串
    """
    start = s.find(from_str) + len(from_str) if from_str else 0
    end = s.rfind(to_str) if to_str else len(s)
    if (from_str and start == -1 + len(from_str)) or (to_str and end == -1):
        print(f"⚠substringFromTo 没有关键词: {from_str} -> {to_str}")
        return ""
    return s[start:end]


# ========== 基础操作 ==========
def setDefaultDelay(millisecond):
    """
    设置RPA模拟操作的全局延时（鼠标、键盘、粘贴、打开网页等）
    @param millisecond: 毫秒数，默认1000
    """
    global defaultDelay
    defaultDelay = millisecond


def sleep(milliseconds):
    """
    脚本暂停等待（毫秒），一次等待上限2分钟
    @param milliseconds: 毫秒数
    """
    if milliseconds < 1:
        return
    if milliseconds >= 120000:
        print("警告：一次等待上限时长两分钟内")
    milliseconds = int(milliseconds) - 20  # 减去接口请求误差
    if milliseconds < 1:
        milliseconds = 1
    urllib.request.urlopen(f"{CppUrl}?action=httpSleep&milliseconds={milliseconds}")


def wait(seconds=1):
    """
    脚本暂停等待（秒），支持小数，超过100秒会自动分段等待
    @param seconds: 秒数，默认1
    """
    if seconds <= 0 or not isNumeric(seconds):
        print("pbottleRPA.wait：seconds input error")
        return
    if seconds > 100:
        quotient = int(seconds // 100)
        for _ in range(quotient):
            sleep(100 * 1000)
            print("提示：已等待100s...")
        seconds = seconds % 100
    sleep(seconds * 1000)


def beep():
    """发出系统警告声音"""
    urllib.request.urlopen(f"{CppUrl}?action=beep")


def showMsg(title, content):
    """
    系统原生消息提示（右下角弹窗）
    @param title: 标题
    @param content: 内容
    """
    title = urlencode(title)
    content = urlencode(content)
    urllib.request.urlopen(f"{CppUrl}?action=showMsg&title={title}&content={content}")


def showRect(fromX=0, fromY=0, width=500, height=500, color="red", msec=500):
    """
    在屏幕上显示彩色方框（用于调试定位）
    @param fromX: 起始X坐标
    @param fromY: 起始Y坐标
    @param width: 宽度
    @param height: 高度
    @param color: 颜色 red/green/blue/yellow
    @param msec: 显示毫秒数
    """
    fromX = int(round(fromX))
    fromY = int(round(fromY))
    width = int(round(width))
    height = int(round(height))
    color = urlencode(color)
    urllib.request.urlopen(
        f"{CppUrl}?action=showRect&fromX={fromX}&fromY={fromY}&width={width}&height={height}&color={color}&msec={msec}"
    )


def exit_script(*args):
    """
    强制退出当前脚本
    @param *args: 退出时输出的信息
    """
    if args:
        print(*args)
    beep()
    sys.exit(1)


# 避免与内置 exit 冲突，同时保留原名
def exit(*args):
    """
    强制退出当前脚本
    @param *args: 退出时输出的信息
    """
    exit_script(*args)


def kill(processName, force=False):
    """
    关闭指定进程（Windows taskkill）
    @param processName: 进程名称，如 'WINWORD.EXE'
    @param force: 是否强制结束
    """
    force_flag = "/F" if force else ""
    try:
        subprocess.run(
            f"taskkill {force_flag} /IM {processName}",
            shell=True,
            check=True,
            capture_output=True,
        )
        print(f"关闭进程成功：{processName}")
    except subprocess.CalledProcessError:
        print(f"关闭进程（{processName}）失败，可能软件未运行")


def moveMouseSmooth(x, y, interval=0):
    """
    平滑移动鼠标到指定位置（屏幕左上角为原点）
    @param x: 横坐标
    @param y: 纵坐标
    @param interval: 像素间隔时间（毫秒），越大移动越慢，默认0
    """
    x = int(round(x))
    y = int(round(y))
    urllib.request.urlopen(f"{CppUrl}?action=moveMouse&x={x}&y={y}&interval={interval}")
    sleep(defaultDelay)


# 别名
moveMouse = moveMouseSmooth


def moveAndClick(x, y):
    """
    移动鼠标到指定位置并点击左键
    @param x: 横坐标
    @param y: 纵坐标
    """
    moveMouseSmooth(x, y)
    mouseClick()


def mouseClick(leftRight="left", time_ms=30):
    """
    当前位置点击鼠标
    @param leftRight: 'left' 或 'right'
    @param time_ms: 点按时间（毫秒）
    """
    action = "mouseLeftClick" if leftRight != "right" else "mouseRightClick"
    urllib.request.urlopen(f"{CppUrl}?action={action}&time={time_ms}")
    sleep(defaultDelay)


def mouseDoubleClick():
    """双击鼠标左键"""
    urllib.request.urlopen(f"{CppUrl}?action=mouseDoubleClick")
    sleep(defaultDelay)


def mouseWheel(data=-720):
    """
    鼠标滚轮
    @param data: 滚动量，负数向下，正数向上，默认-720
    """
    urllib.request.urlopen(f"{CppUrl}?action=mouseWheel&data={data}")
    sleep(defaultDelay)


def mouseLeftDragTo(x, y):
    """
    鼠标左键拖拽到指定位置
    @param x: 目标X坐标
    @param y: 目标Y坐标
    """
    x = int(round(x))
    y = int(round(y))
    urllib.request.urlopen(f"{CppUrl}?action=mouseLeftDragTo&x={x}&y={y}")
    sleep(defaultDelay)


def mouseRightDragTo(x, y):
    """
    鼠标右键拖拽到指定位置
    @param x: 目标X坐标
    @param y: 目标Y坐标
    """
    x = int(round(x))
    y = int(round(y))
    urllib.request.urlopen(f"{CppUrl}?action=mouseRightDragTo&x={x}&y={y}")
    sleep(defaultDelay)


def getScreenColor(x, y):
    """
    获取屏幕某点颜色
    @param x: 横坐标
    @param y: 纵坐标
    @return: 颜色值，如 '#000000'
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=getScreenColor&x={x}&y={y}")
    return json.loads(resp.read().decode())["rs"]


def screenShot(savePath="", x=0, y=0, w=-1, h=-1):
    """
    屏幕截图
    @param savePath: 保存路径（应以.png结尾），默认保存到“我的图片”
    @param x: 截图起始X
    @param y: 截图起始Y
    @param w: 宽度，-1表示全屏
    @param h: 高度，-1表示全屏
    @return: 返回结果字符串
    """
    if savePath:
        savePath = os.path.abspath(savePath)
        savePath = urlencode(savePath)
    x, y, w, h = int(x), int(y), int(w), int(h)
    if x != 0 or y != 0 or w != -1 or h != -1:
        showRect(x, y, w, h)
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=screenShot&savePath={savePath}&x={x}&y={y}&w={w}&h={h}"
    )
    return resp.read().decode()


def keycode(name):
    """
    按键名称转虚拟键码（与 JS 版本完全对齐）
    @param name: 按键名称（参考 https://www.pbottle.com/a-13862.html）
    @return: 键码整数
    """
    name = name.strip().lower()
    mapping = {
        "backspace": 8,
        "tab": 9,
        "enter": 13,
        "shift": 16,
        "ctrl": 17,
        "alt": 18,
        "pause/break": 19,
        "caps lock": 20,
        "esc": 27,
        "space": 32,
        "page up": 33,
        "page down": 34,
        "end": 35,
        "home": 36,
        "left": 37,
        "up": 38,
        "right": 39,
        "down": 40,
        "insert": 45,
        "delete": 46,
        "command": 91,
        "left command": 91,
        "right command": 93,
        "numpad *": 106,
        "numpad +": 107,
        "numpad -": 109,
        "numpad .": 110,
        "numpad /": 111,
        "num lock": 144,
        "scroll lock": 145,
        "my computer": 182,
        "my calculator": 183,
        "windows": 91,
        "⇧": 16,
        "⌥": 18,
        "⌃": 17,
        "⌘": 91,
        "ctl": 17,
        "control": 17,
        "option": 18,
        "pause": 19,
        "break": 19,
        "caps": 20,
        "return": 13,
        "escape": 27,
        "spc": 32,
        "spacebar": 32,
        "pgup": 33,
        "pgdn": 34,
        "ins": 45,
        "del": 46,
        "cmd": 91,
        "f1": 112,
        "f2": 113,
        "f3": 114,
        "f4": 115,
        "f5": 116,
        "f6": 117,
        "f7": 118,
        "f8": 119,
        "f9": 120,
        "f10": 121,
        "f11": 122,
        "f12": 123,
        ";": 186,
        "=": 187,
        ",": 188,
        "-": 189,
        ".": 190,
        "/": 191,
        "`": 192,
        "[": 219,
        "\\": 220,
        "]": 221,
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
    return mapping.get(name, 0)


def keyToggle(key, upDown="down"):
    """
    模拟键盘按键基础事件（按下或松开）
    @param key: 按键名称
    @param upDown: 'down' 按下 / 'up' 松开
    """
    key_n = keycode(key)
    if key_n == 0:
        print(f"⚠ 按键 {key} 不存在！~")
        return
    upDown_n = 0 if upDown != "up" else 2
    urllib.request.urlopen(
        f"{CppUrl}?action=keyToggle&key_n={key_n}&upDown_n={upDown_n}"
    )


def keyTap(key):
    """
    模拟键盘按键（按下并松开），支持组合键，如 'ctrl+a'
    @param key: 按键名称或组合键（加号连接）
    """
    if "+" in key:
        parts = [p.strip() for p in key.split("+")]
        for p in parts:
            keyToggle(p, "down")
        for p in reversed(parts):
            keyToggle(p, "up")
    else:
        keyToggle(key, "down")
        keyToggle(key, "up")
    sleep(defaultDelay)


def mouseKeyToggle(key="left", upDown="down"):
    """
    模拟鼠标按键基础事件
    @param key: 'left' / 'right' / 'middle'
    @param upDown: 'down' 按下 / 'up' 松开
    """
    key_map = {"left": 0, "right": 1, "middle": 2}
    key_n = key_map.get(key, 0)
    upDown_n = 0 if upDown != "up" else 2
    urllib.request.urlopen(
        f"{CppUrl}?action=mouseKeyToggle&key_n={key_n}&upDown_n={upDown_n}"
    )


def findScreen(tpPaths, miniSimilarity=0.85, fromX=0, fromY=0, width=-1, height=-1):
    """
    屏幕查找图像定位
    @param tpPaths: 小图片路径（建议png），或图片路径列表
    @param miniSimilarity: 最低相似度，0-1，默认0.85
    @param fromX: 查找起始X
    @param fromY: 查找起始Y
    @param width: 搜索宽度，-1表示全屏
    @param height: 搜索高度，-1表示全屏
    @return: 找到返回 {'x':int, 'y':int, 'value':float}，否则返回 False
    """
    if fromX < 0 or fromY < 0:
        raise ValueError(f"错误：找图起始点不能为负，x:{fromX} y:{fromY}")
    if fromX != 0 or fromY != 0 or width != -1 or height != -1:
        showRect(fromX, fromY, width, height)
    if not isinstance(tpPaths, list):
        tpPaths = [tpPaths]

    for tpPath in tpPaths:
        tpPath = os.path.abspath(tpPath)
        tpPath = urlencode(tpPath)
        resp = urllib.request.urlopen(
            f"{CppUrl}?action=findScreen&imgPath={tpPath}&fromX={fromX}&fromY={fromY}&width={width}&height={height}"
        )
        data = json.loads(resp.read().decode())
        if "error" not in data and data.get("value", 0) >= miniSimilarity:
            showRect(data["x"] - 25, data["y"] - 25, 50, 50, "green")
            return {"x": data["x"], "y": data["y"], "value": data["value"]}
    return False


def findText(inputTxt, fromX=0, fromY=0, width=-1, height=-1):
    """
    查找屏幕上的文字（基于OCR）
    @param inputTxt: 要查找的文字（部分匹配）
    @param fromX: 查找起始X
    @param fromY: 查找起始Y
    @param width: 搜索宽度
    @param height: 搜索高度
    @return: 找到返回 {'text':str, 'x':int, 'y':int, 'score':float}，否则返回 False
    """
    ocr_res = aiOcr("screen", fromX, fromY, width, height)
    for item in ocr_res:
        if inputTxt in item["text"]:
            showRect(item["x"] - 25, item["y"] - 25, 50, 50, "green")
            return item
    return False


def waitText(
    inputTxt, fromX=0, fromY=0, width=-1, height=-1, intervalFun=None, timeOut=20
):
    """
    等待屏幕指定文字出现
    @param inputTxt: 搜索文字
    @param fromX,fromY,width,height: 搜索范围
    @param intervalFun: 回调函数，返回 'stopWait' 时停止等待
    @param timeOut: 超时秒数
    @return: 找到返回位置字典，超时抛出 TimeoutError
    """
    print("waiting Text：", inputTxt)
    for _ in range(timeOut):
        sleep(1000)
        pos = findText(inputTxt, fromX, fromY, width, height)
        if pos:
            return pos
        if intervalFun and intervalFun() == "stopWait":
            print("stopWait from intervalFun")
            return False
    print("已经保存超时截图到：我的图片")
    screenShot()
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"等待文字超时 {inputTxt} 位置（行）:{frame.f_lineno}")


def findContours(minimumArea=1000, fromX=0, fromY=0, width=-1, height=-1):
    """
    查找屏幕上的轮廓（物体/窗口边缘）
    @param minimumArea: 最小面积，默认1000（约31x31像素）
    @param fromX: 查找起始X
    @param fromY: 查找起始Y
    @param width: 搜索宽度
    @param height: 搜索高度
    @return: 轮廓列表，每个元素包含 x,y,cx,cy,area,id
    """
    if fromX < 0 or fromY < 0:
        raise ValueError(f"错误：轮廓查找起始点不能为负，x:{fromX} y:{fromY}")
    if fromX != 0 or fromY != 0 or width != -1 or height != -1:
        showRect(fromX, fromY, width, height)
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=findContours&minimumArea={minimumArea}&fromX={fromX}&fromY={fromY}&width={width}&height={height}"
    )
    contours = json.loads(resp.read().decode())
    for c in contours:
        c["x"] += fromX
        c["y"] += fromY
    return contours


def imgSimilar(path1, path2, checkType="ORB"):
    """
    图片相似度对比
    @param path1: 图片1路径
    @param path2: 图片2路径
    @param checkType: 算法 'SIFT'/'ORB'/'SSIM'，默认 'ORB'
    @return: {'score':float, 'time':float}
    """
    path1 = urlencode(os.path.abspath(path1))
    path2 = urlencode(os.path.abspath(path2))
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=imgSimilar&path1={path1}&path2={path2}&checkType={checkType}"
    )
    return json.loads(resp.read().decode())


def paste(txt):
    """
    在当前焦点位置粘贴输入文本（模拟 Ctrl+V）
    @param txt: 要输入的文本
    """
    copyText(txt)
    keyTap("ctrl+v")
    sleep(defaultDelay)


def copyText(txt):
    """
    复制文本到剪贴板
    @param txt: 文本内容
    """
    txt = urlencode(txt)
    urllib.request.urlopen(f"{CppUrl}?action=copyText&txt={txt}")


def copyFile(filepath):
    """
    复制文件/文件夹到剪贴板，之后可在目标位置粘贴（如微信发送文件）
    @param filepath: 绝对路径
    """
    filepath = os.path.abspath(filepath)
    if not os.path.exists(filepath):
        print(f"copyFile警告:文件路径不存在 {filepath}")
    filepath = filepath.replace("\\", "/")
    filepath = urlencode(filepath)
    urllib.request.urlopen(f"{CppUrl}?action=copyFile&path={filepath}")


def getClipboard():
    """
    获取剪贴板内容（支持文本、图片base64、HTML）
    @return: 剪贴板内容字符串
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=getClipboard")
    return resp.read().decode()


def wxMessage(title, content, key):
    """
    通过小瓶云发送微信通知（免费）
    @param title: 消息标题
    @param content: 消息内容
    @param key: 获取key详情 https://www.pbottle.com/a-12586.html
    """
    url = f"https://yun.pbottle.com/manage/yun/?msg={urlencode(content)}&name={urlencode(title)}&key={key}"
    resp = urllib.request.urlopen(url)
    print("发送微信消息：", resp.read().decode())


def postJson(url, msgJson, headersJson=None, method="POST"):
    """
    向API发送JSON数据
    @param url: API地址
    @param msgJson: 要发送的字典对象
    @param headersJson: 额外请求头字典
    @param method: HTTP方法，默认POST
    @return: 响应文本
    """
    if headersJson is None:
        headersJson = {}
    data = json.dumps(msgJson).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json", **headersJson},
        method=method,
    )
    with urllib.request.urlopen(req) as f:
        return f.read().decode()


def postJsonFile(url, msgJsonFile, headersJson=None, method="POST"):
    """
    从文件读取JSON并发送到API（适合大JSON）
    @param url: API地址
    @param msgJsonFile: JSON文件路径
    @param headersJson: 额外请求头字典
    @param method: HTTP方法
    @return: 响应文本
    """
    if headersJson is None:
        headersJson = {}
    msgJsonFile = os.path.abspath(msgJsonFile)
    with open(msgJsonFile, "rb") as f:
        data = f.read()
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json", **headersJson},
        method=method,
    )
    with urllib.request.urlopen(req) as f:
        return f.read().decode()


def getHtml(url, headersJson=None, method="GET"):
    """
    普通HTTP请求，返回响应文本
    @param url: 网址
    @param headersJson: 请求头字典
    @param method: HTTP方法
    @return: 响应文本
    """
    if headersJson is None:
        headersJson = {}
    req = urllib.request.Request(url, headers=headersJson, method=method)
    with urllib.request.urlopen(req) as f:
        return f.read().decode()


def downloadFile(fileUrl, filename, headersJson=None):
    """
    下载文件到本地
    @param fileUrl: 文件URL
    @param filename: 本地保存路径
    @param headersJson: 请求头字典
    """
    if headersJson is None:
        headersJson = {}
    filename = os.path.abspath(filename)
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    print("下载文件到:", filename)
    req = urllib.request.Request(fileUrl, headers=headersJson)
    with urllib.request.urlopen(req) as resp, open(filename, "wb") as out:
        out.write(resp.read())


def sendMail(
    to,
    subject,
    content,
    host="smtp.qq.com",
    port=465,
    user="leo191@foxmail.com",
    passwd="fxfqtsxmwcohbcbc",
):
    """
    发送邮件（同步阻塞）
    @param to: 收件人地址
    @param subject: 主题
    @param content: 正文（纯文本）
    @param host: SMTP服务器
    @param port: 端口
    @param user: 用户名
    @param passwd: 密码
    @return: 成功提示字符串
    """
    if user == "leo191@foxmail.com":
        content += "\n\n 请不要将演示测试邮箱用作实际业务，详细查看：https://rpa.pbottle.com/a-14106.html"
    msg = MIMEText(content, "plain", "utf-8")
    msg["From"] = formataddr(("小瓶RPA", user))
    msg["To"] = formataddr(("", to)) if "@" in str(to) else to
    msg["Subject"] = Header(subject, "utf-8")

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(host, port, context=context) as server:
        server.login(user, passwd)
        server.sendmail(user, [to], msg.as_string())
    return "✅ 邮件发送成功"


def tts(text):
    """
    文字转语音播报（非阻塞）
    @param text: 要朗读的文本
    """
    text = urlencode(text)
    urllib.request.urlopen(f"{CppUrl}?action=tts&txt={text}")
    sleep(defaultDelay)


def openURL(myurl):
    """
    用默认浏览器打开网址
    @param myurl: 网址
    """
    urllib.request.urlopen(f"{CppUrl}?action=setWebReadyPage")
    myurl = urlencode(myurl)
    urllib.request.urlopen(f"{CppUrl}?action=openURL&url={myurl}")
    sleep(defaultDelay + 1000)


def openDir(filePath):
    """
    用资源管理器打开文件夹或默认程序打开文件
    @param filePath: 绝对路径
    """
    filePath = os.path.abspath(filePath)
    filePath = urlencode(filePath)
    urllib.request.urlopen(f"{CppUrl}?action=openDir&path={filePath}")
    sleep(defaultDelay)


# 别名
openfile = openDir


def getResolution():
    """
    获取屏幕分辨率及缩放比例
    @return: {'w':int, 'h':int, 'ratio':float}
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=getResolution")
    return json.loads(resp.read().decode())


def aiOcr(imagePath="screen", x=0, y=0, width=-1, height=-1):
    """
    AI文字识别（OCR），支持屏幕或图片文件
    @param imagePath: 'screen' 或图片绝对路径
    @param x: 起始X
    @param y: 起始Y
    @param width: 宽度
    @param height: 高度
    @return: 识别结果列表，每项含 text,score,x,y
    """
    if not imagePath:
        imagePath = "screen"
    if x < 0 or y < 0:
        raise ValueError(f"错误：OCR 起始点不能为负，x:{x} y:{y}")
    if x != 0 or y != 0 or width != -1 or height != -1:
        showRect(x, y, width, height)
    if imagePath != "screen":
        imagePath = os.path.abspath(imagePath)
        imagePath = urlencode(imagePath)
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=aiOcr&path={imagePath}&x={x}&y={y}&width={width}&height={height}&onlyEn=0"
    )
    res = resp.read().decode()
    if res == "文字识别引擎未启动":
        print("⚠ 文字识别引擎未启动，请在软件设置中开启")
        exit_script()
    items = json.loads(res)
    for it in items:
        it["x"] += x
        it["y"] += y
    return items


def aiObject(minimumScore=0.5, x=0, y=0, width=-1, height=-1):
    """
    AI物体识别（检测常见物体）
    @param minimumScore: 置信度阈值，默认0.5
    @param x: 起始X
    @param y: 起始Y
    @param width: 宽度
    @param height: 高度
    @return: 检测结果列表，每项含 x,y,width,height,score,class
    """
    if x < 0 or y < 0:
        raise ValueError(f"错误：物体识别起始点不能为负，x:{x} y:{y}")
    if x != 0 or y != 0 or width != -1 or height != -1:
        showRect(x, y, width, height)
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=aiObject&minimumScore={minimumScore}&x={x}&y={y}&width={width}&height={height}&onlyEn=0"
    )
    res = resp.read().decode()
    if res == "物体识别引擎未启动":
        print("⚠ 物体识别引擎未启动，请在软件设置中开启")
        exit_script()
    items = json.loads(res)
    for it in items:
        it["x"] += x
        it["y"] += y
        showRect(it["x"], it["y"], it["width"], it["height"], "green")
    return items


def zipDir(directory, zipFilePath=""):
    """
    压缩文件夹为ZIP文件（使用Python标准库zipfile）
    @param directory: 要压缩的文件夹路径
    @param zipFilePath: 输出ZIP路径，默认在目录下生成
    """
    if not zipFilePath:
        zipFilePath = os.path.join(directory, "RPA生成的压缩包.zip")
    directory = os.path.abspath(directory)
    zipFilePath = os.path.abspath(zipFilePath)
    with zipfile.ZipFile(zipFilePath, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, directory)
                zipf.write(file_path, arcname)


def unZip(zipFilePath, directory=""):
    """
    解压ZIP文件到指定目录
    @param zipFilePath: ZIP文件路径
    @param directory: 解压目标目录，默认与ZIP同级
    """
    if not directory:
        directory = os.path.dirname(zipFilePath)
    zipFilePath = os.path.abspath(zipFilePath)
    directory = os.path.abspath(directory)
    os.makedirs(directory, exist_ok=True)
    with zipfile.ZipFile(zipFilePath, "r") as zipf:
        zipf.extractall(directory)


def bufferGet(n=0):
    """
    获取跨脚本共享缓冲区内容（0-9共10个）
    @param n: 缓冲区编号
    @return: 存储的字符串
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=bufferGet&n={n}")
    return resp.read().decode()


def bufferSet(content, n=0):
    """
    设置跨脚本共享缓冲区内容
    @param content: 要存储的内容（字符串）
    @param n: 缓冲区编号
    @return: 'ok' 表示成功
    """
    return postJson(f"{CppUrl}?action=bufferSet&n={n}", content)


def delaySet(scriptPath=""):
    """
    设置当前脚本结束后自动接力的脚本
    @param scriptPath: 接力脚本绝对路径，为空则清除接力任务
    @return: 'ok'
    """
    if scriptPath:
        scriptPath = os.path.abspath(scriptPath)
    scriptPath = urlencode(scriptPath)
    resp = urllib.request.urlopen(f"{CppUrl}?action=pbottleRPA_delay&path={scriptPath}")
    return resp.read().decode()


def deviceID():
    """
    获取当前设备的唯一ID（用于云端接口）
    @return: 设备ID字符串
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=pbottleRPA_deviceID")
    return resp.read().decode()


def clusterCenter():
    """
    获取集群中心信息（企业版功能）
    @return: 字符串
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=pbottleRPA_clusterCenter")
    return resp.read().decode()


# ========== Cloud 模块 ==========
class cloud:
    @staticmethod
    def GPT(question, modelLevel=0, options=None):
        """
        云端大语言模型问答
        @param question: 问题字符串
        @param modelLevel: 0=低价模型,1=性价比,2=旗舰
        @param options: 可选字典，如 {'response_format':'json_object', 'temperature':0.75, 'enable_search':False}
        @return: {'content':str, 'tokens':int}
        """
        if options is None:
            options = {
                "response_format": "text",
                "temperature": 0.75,
                "enable_search": False,
            }
        if len(question) < 3:
            raise ValueError("问题过短，请输入至少2个字符")
        data = {
            "question": question,
            "deviceToken": deviceID(),
            "modelLevel": modelLevel,
            "options": options,
        }
        resp = postJson("https://rpa.pbottle.com/API/", data)
        result = json.loads(resp)
        if result.get("error"):
            raise RPAError(f"错误: {result['error']}")
        return result

    @staticmethod
    def GPTV(question, imagePath, modelLevel=0):
        """
        云端图像分析大模型（图片+问题）
        @param question: 关于图片的问题
        @param imagePath: 图片本地路径
        @param modelLevel: 模型等级
        @return: {'content':str, 'tokens':int}
        """
        imagePath = os.path.abspath(imagePath)
        if not os.path.exists(imagePath):
            raise FileNotFoundError("输入分析图片不存在：cloud_GPTV")
        with open(imagePath, "rb") as f:
            img_b64 = base64.b64encode(f.read()).decode()
        temp_json = os.path.join(tempfile.gettempdir(), "cloud_GPTV.json")
        with open(temp_json, "w") as f:
            json.dump(
                {
                    "question": question,
                    "deviceToken": deviceID(),
                    "modelLevel": modelLevel,
                    "image_base64": img_b64,
                },
                f,
            )
        resp = postJsonFile("https://rpa.pbottle.com/API/gptv", temp_json)
        result = json.loads(resp)
        if result.get("error"):
            raise RPAError(f"错误 cloud_GPTV: {result['error']}")
        return result

    @staticmethod
    def GPTA(action="点击", question="桌面微信图标"):
        """
        云端屏幕分析并自动执行动作（点击/双击/右键）
        @param action: '点击' / '双击' / '右键'
        @param question: 要操作的目标描述，如“桌面微信图标”
        """
        device_token = deviceID()
        tmp_img = os.path.join(
            homePath if homePath else tempfile.gettempdir(), "cloud_GPT_do.png"
        )
        tmp_json = os.path.join(
            homePath if homePath else tempfile.gettempdir(), "cloud_GPTV.json"
        )
        screenShot(tmp_img)
        with open(tmp_img, "rb") as f:
            img_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode()
        with open(tmp_json, "w") as f:
            json.dump(
                {
                    "question": question,
                    "deviceToken": device_token,
                    "image_base64": img_b64,
                },
                f,
            )
        resp = postJsonFile("https://rpa.pbottle.com/API/gpta", tmp_json)
        result = json.loads(resp)
        if result.get("error"):
            raise RPAError(f"错误 cloud_GPTA: {result['error']}")
        print(result)
        boxes = result["content"].split("\n")
        resolution = getResolution()
        for box_str in boxes:
            if not box_str.strip():
                continue
            box = json.loads(box_str)
            x1 = box[0] / 1000.0 * resolution["w"]
            y1 = box[1] / 1000.0 * resolution["h"]
            x2 = box[2] / 1000.0 * resolution["w"]
            y2 = box[3] / 1000.0 * resolution["h"]
            showRect(x1, y1, x2 - x1, y2 - y1, "green")
            cx = int(round((x1 + x2) / 2))
            cy = int(round((y1 + y2) / 2))
            print(f"{question} 的位置: ({cx}, {cy})")
            moveMouseSmooth(cx, cy)
            if action == "点击":
                mouseClick("left")
            elif action == "双击":
                mouseDoubleClick()
            elif action == "右键":
                mouseClick("right")


# ========== 浏览器增强模块 ==========
class browserCMD:
    @staticmethod
    def alert(msg):
        """浏览器弹出警告框"""
        code = json.dumps({"action": "alert", "args": [msg]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def closeTab(type="current"):
        """
        关闭浏览器标签页
        @param type: 'current' 关闭当前页, 'other' 关闭其他页
        """
        code = json.dumps({"action": "closeTab", "args": [type]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def fetch(fetch_url, options=None):
        """
        从当前页面发起fetch请求
        @param fetch_url: 目标URL
        @param options: 请求选项字典
        """
        if options is None:
            options = {}
        code = json.dumps({"action": "fetch", "args": [fetch_url, options]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def waitPageReady(readyURL, timeout=20):
        """
        等待浏览器页面加载到指定URL
        @param readyURL: 期望的URL（完全匹配）
        @param timeout: 超时秒数
        @return: 当前URL
        """
        url = f"{CppUrl}?action=getWebReadyPage"
        for _ in range(timeout):
            res = getHtml(url)
            if res == readyURL:
                return res
            sleep(1000)
            print("等待页面加载完成...")
        raise TimeoutError("waitPageReady 等待页面加载超时")

    @staticmethod
    def url(urlStr=None):
        """
        获取或设置当前页面URL
        @param urlStr: 设置新URL时传入，不传则获取当前URL
        @return: 当前URL字符串
        """
        args = [urlStr] if urlStr is not None else []
        code = json.dumps({"action": "url", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def count(selector):
        """
        统计符合选择器的元素数量
        @param selector: CSS选择器
        @return: 元素个数
        """
        code = json.dumps({"action": "count", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return int(resp) if isNumeric(resp) else 0

    @staticmethod
    def dblclick(selector, options=None):
        """
        双击匹配的第一个元素
        @param selector: CSS选择器
        @param options: 鼠标事件选项
        """
        if options is None:
            options = {}
        code = json.dumps({"action": "dblclick", "args": [selector, options]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def offset(selector):
        """
        获取元素相对于文档左上角的位置
        @param selector: CSS选择器
        @return: {'left':int, 'top':int}
        """
        code = json.dumps({"action": "offset", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return json.loads(resp)

    @staticmethod
    def click(selector, options=None):
        """
        点击匹配的第一个元素
        @param selector: CSS选择器
        @param options: 鼠标事件选项
        """
        if options is None:
            options = {}
        code = json.dumps({"action": "click", "args": [selector, options]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def show(selector):
        """显示匹配的元素（修改display样式）"""
        code = json.dumps({"action": "show", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def hide(selector):
        """隐藏匹配的元素"""
        code = json.dumps({"action": "hide", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def remove(selector):
        """从DOM中移除匹配的元素"""
        code = json.dumps({"action": "remove", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def text(selector, content=None):
        """
        获取或设置元素的纯文本内容
        @param selector: CSS选择器
        @param content: 设置文本时传入，不传则获取文本
        @return: 文本内容（多个元素返回数组）
        """
        args = [selector] if content is None else [selector, content]
        code = json.dumps({"action": "text", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def html(selector, content=None):
        """
        获取或设置元素的HTML内容
        @param selector: CSS选择器
        @param content: 设置HTML时传入
        """
        args = [selector] if content is None else [selector, content]
        code = json.dumps({"action": "html", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def val(selector, content=None):
        """
        获取或设置表单元素的值
        @param selector: CSS选择器
        @param content: 设置值时传入
        """
        args = [selector] if content is None else [selector, content]
        code = json.dumps({"action": "val", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def cookie(cName, cValue=None, expDays=None):
        """
        获取或设置cookie
        @param cName: cookie名称
        @param cValue: 设置时传入值，不传则获取
        @param expDays: 过期天数，不传则为会话cookie
        """
        args = [cName]
        if cValue is not None:
            args.append(cValue)
        if expDays is not None:
            args.append(expDays)
        code = json.dumps({"action": "cookie", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def css(selector, propertyname, value=None):
        """
        获取或设置CSS样式
        @param selector: CSS选择器
        @param propertyname: 样式属性名
        @param value: 设置时传入值
        """
        args = (
            [selector, propertyname]
            if value is None
            else [selector, propertyname, value]
        )
        code = json.dumps({"action": "css", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def attr(selector, propertyname, value=None):
        """
        获取或设置元素属性
        @param selector: CSS选择器
        @param propertyname: 属性名
        @param value: 设置时传入值
        """
        args = (
            [selector, propertyname]
            if value is None
            else [selector, propertyname, value]
        )
        code = json.dumps({"action": "attr", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def prop(selector, propertyname, value=None):
        """
        获取或设置DOM属性（如checked, disabled）
        @param selector: CSS选择器
        @param propertyname: 属性名
        @param value: 设置时传入值
        """
        args = (
            [selector, propertyname]
            if value is None
            else [selector, propertyname, value]
        )
        code = json.dumps({"action": "prop", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp


# ========== 硬件级 hid 模块 ==========
class hid:
    @staticmethod
    def keyToggle(key, upDown="down"):
        """硬件级按键按下/松开"""
        key_n = keycode(key)
        if key_n == 0:
            print(f"⚠ 按键 {key} 不存在！~")
            return
        upDown_n = 0 if upDown != "up" else 2
        urllib.request.urlopen(
            f"{CppUrl}?action=keyToggleHardWare&key_n={key_n}&upDown_n={upDown_n}"
        )

    @staticmethod
    def keyTap(key):
        """硬件级按键（按下并松开），支持组合键"""
        if "+" in key:
            parts = [p.strip() for p in key.split("+")]
            for p in parts:
                hid.keyToggle(p, "down")
            for p in reversed(parts):
                hid.keyToggle(p, "up")
        else:
            hid.keyToggle(key, "down")
            hid.keyToggle(key, "up")
        sleep(defaultDelay)

    @staticmethod
    def _mouseCMD(button=1, x=0, y=0, wheel=0, time_ms=10):
        """硬件级鼠标底层命令"""
        urllib.request.urlopen(
            f"{CppUrl}?action=mouseDataHardWare&bt={button}&x={x}&y={y}&wheel={wheel}&time={time_ms}"
        )

    @staticmethod
    def moveMouse(x, y):
        """硬件级移动鼠标到绝对坐标"""
        hid._mouseCMD(0, int(round(x)), int(round(y)), 0, 10)

    @staticmethod
    def mouseClick(button="left", time_ms=10):
        """硬件级鼠标点击"""
        bt = {"left": 1, "right": 2, "middle": 4}.get(button, 1)
        hid._mouseCMD(bt, 0, 0, 0, time_ms)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)

    @staticmethod
    def moveAndClick(x, y):
        """硬件级移动并点击"""
        hid.moveMouse(x, y)
        hid.mouseClick()

    @staticmethod
    def mouseDoubleClick():
        """硬件级双击左键"""
        hid.mouseClick("left", 10)
        hid.mouseClick("left", 10)
        sleep(defaultDelay)

    @staticmethod
    def mouseLeftDragTo(x, y):
        """硬件级左键拖拽"""
        hid._mouseCMD(1, 0, 0, 0, 10)
        hid._mouseCMD(1, int(round(x)), int(round(y)), 0, 10)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)

    @staticmethod
    def mouseRightDragTo(x, y):
        """硬件级右键拖拽"""
        hid._mouseCMD(2, 0, 0, 0, 10)
        hid._mouseCMD(2, int(round(x)), int(round(y)), 0, 10)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)

    @staticmethod
    def mouseWheel(data=-1):
        """硬件级滚轮，-1向下滚动一格"""
        hid._mouseCMD(0, 0, 0, data, 0)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)


# ========== 等待函数 ==========
def waitImage(tpPath, intervalFun=None, timeOut=30, miniSimilarity=0.85):
    """
    等待屏幕上的图片出现（每1秒检测一次）
    @param tpPath: 图片模板路径 相对路径：./image/123.png  | 列表等待多个图片
    @param intervalFun: 每次检测间隔调用的函数，若返回 'stopWait' 则提前结束
    @param timeOut: 超时秒数
    @param miniSimilarity: 最低相似度
    @return: 找到返回位置字典，超时抛出 TimeoutError
    """
    print("waitImage", tpPath)
    for _ in range(timeOut):
        sleep(1000)
        pos = findScreen(tpPath, miniSimilarity)
        if pos:
            return pos
        if intervalFun and intervalFun() == "stopWait":
            print("stopWait from intervalFun")
            return False
    print("已经保存超时截图到：我的图片")
    screenShot()
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"等待图片超时 {tpPath} 位置（行）:{frame.f_lineno}")


def waitImageDisappear(tpPath, intervalFun=None, timeOut=30, miniSimilarity=0.85):
    """
    等待屏幕上的图片消失
    @param tpPath: 图片模板路径
    @param intervalFun: 检测间隔回调
    @param timeOut: 超时秒数
    @param miniSimilarity: 相似度阈值
    @return: 'ok' 表示消失，超时抛出 TimeoutError
    """
    print("waitImageDisappear", tpPath)
    for _ in range(timeOut):
        sleep(1000)
        pos = findScreen(tpPath, miniSimilarity)
        if not pos:
            return "ok"
        if intervalFun and intervalFun() == "stopWait":
            print("stopWait from intervalFun")
            return False
    print("已经保存超时截图到：我的图片")
    screenShot()
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"等待图片消失超时 {tpPath} 位置（行）:{frame.f_lineno}")


def waitFile(dirPath, keyWords="", intervalFun=None, timeOut=30):
    """
    等待指定目录下出现包含关键词的文件
    @param dirPath: 监控目录
    @param keyWords: 文件名包含的关键词
    @param intervalFun: 检测间隔回调
    @param timeOut: 超时秒数
    @return: 文件路径列表，超时抛出 TimeoutError
    """
    print("waitFile", dirPath, keyWords)
    for _ in range(timeOut):
        sleep(1000)
        files = searchFile(dirPath, keyWords)
        if hasData(files):
            return files
        if intervalFun and intervalFun() == "stopWait":
            print("stopWait from intervalFun")
            return False
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"等待文件超时：{dirPath} 位置（行）:{frame.f_lineno}")


def waitFileDisappear(dirPath, keyWords="", intervalFun=None, timeOut=30):
    """
    等待指定目录下包含关键词的文件消失
    @param dirPath: 监控目录
    @param keyWords: 文件名关键词
    @param intervalFun: 检测间隔回调
    @param timeOut: 超时秒数
    @return: True 表示消失，超时抛出 TimeoutError
    """
    print("waitFileDisappear", dirPath, keyWords)
    for _ in range(timeOut):
        sleep(1000)
        files = searchFile(dirPath, keyWords)
        if not hasData(files):
            return True
        if intervalFun and intervalFun() == "stopWait":
            print("stopWait from intervalFun")
            return False
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"等待文件消失错误：{dirPath} 位置（行）:{frame.f_lineno}")


def waitInput(inputPrompt="输入提示词", timeOut=600):
    """
    等待用户输入（弹出输入框）
    @param inputPrompt: 提示文字
    @param timeOut: 超时秒数，默认600秒
    @return: 用户输入的字符串，超时返回空字符串
    """
    print("waitInput 等待用户输入：", inputPrompt)
    inputPrompt = urlencode(inputPrompt)
    getHtml(f"{CppUrl}?action=waitInput&inputPrompt={inputPrompt}")
    for _ in range(timeOut):
        sleep(1000)
        res = getHtml(f"{CppUrl}?action=waitInputResult")
        if hasData(res):
            showMsg("用户输入了：", res)
            return res
    return ""


# ========== 工具箱（utils）命名空间 ==========
class utils:
    isNumeric = isNumeric
    hasData = hasData
    getTime = getTime
    searchFile = searchFile
    uniqid = uniqid
    substringFromTo = substringFromTo


工具箱 = utils

# ========== 中文别名 ==========
设置默认操作延时 = setDefaultDelay
蜂鸣声 = beep
显示系统消息 = showMsg
关闭软件 = kill
显示标记框 = showRect
退出流程 = exit_script  # 使用退出函数别名
睡眠毫秒 = sleep
等待 = wait
鼠标移动 = moveMouseSmooth
鼠标移动并点击 = moveAndClick
鼠标点击 = mouseClick
鼠标双击 = mouseDoubleClick
鼠标滚轮 = mouseWheel
鼠标左键拖动 = mouseLeftDragTo
鼠标右键拖动 = mouseRightDragTo
获取屏幕颜色 = getScreenColor
屏幕截图 = screenShot
键盘基础触发 = keyToggle
鼠标基础触发 = mouseKeyToggle
键盘按键 = keyTap
寻找图像 = findScreen
寻找文字 = findText
等待文字 = waitText
寻找轮廓 = findContours
粘贴输入 = paste
图片相似度对比 = imgSimilar
复制文字 = copyText
复制文件 = copyFile
获取剪切板内容 = getClipboard
微信消息发送 = wxMessage
提交json = postJson
提交json文件 = postJsonFile
请求网址 = getHtml
发送邮件 = sendMail
下载文件 = downloadFile
文字转语音 = tts
打开网址 = openURL
打开目录 = openDir
打开文件 = openfile
获取屏幕分辨率 = getResolution
文字识别 = aiOcr
物体识别 = aiObject
压缩 = zipDir
解压缩 = unZip
是否数字 = isNumeric
是否有内容 = hasData
获取格式化时间 = getTime
搜索文件 = searchFile
唯一数 = uniqid
截取文本 = substringFromTo
等待图像出现 = waitImage
等待图像消失 = waitImageDisappear
等待文件 = waitFile
等待文件消失 = waitFileDisappear
等待输入 = waitInput
日志输出 = log = print
目录路径 = pyPath
文件系统 = os
路径处理 = os.path

# ========== 入口检测 ==========
if __name__ == "__main__":
    print("当前文件不能执行", "请直接执行中文名的脚本文件")
    showMsg("当前文件不能执行", "请直接执行中文名的脚本文件")
    sys.exit(1)
