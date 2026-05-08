"""
PBottle RPA Standard Library API (Python Version)
Homepage: https://rpa.pbottle.com/
Repository: https://gitee.com/pbottle/pbottle-rpa
Author: leo@pbottle.com

Node.js compatible port (Beta)
Fully synchronized with the Node.js API
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

# ========== Global Configuration ==========
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", line_buffering=True)
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", line_buffering=True)

pyPath = os.path.dirname(os.path.abspath(__file__))
basePath = os.environ.get("RPAbaseDir", "")
homePath = os.environ.get("RPAhomeDir", "")
CppUrl = "http://127.0.0.1:49888/"
defaultDelay = 1000

print(
    "Base service address: (Python)", CppUrl, "Python version synced with Node.js API"
)


# ========== Custom Exceptions ==========
class RPAError(Exception):
    """RPA operation base exception"""

    pass


class TimeoutError(RPAError):
    """Wait timeout exception"""

    pass


# ========== Utility Functions ==========
def urlencode(input_str):
    """JS-compatible URL encoding (equivalent to encodeURIComponent)"""
    return urllib.parse.quote(input_str, safe="")


def isNumeric(value):
    """
    Check if a value is numeric (including numeric strings)
    @param value: any variable
    @return: bool
    """
    try:
        float(value)
        return True
    except (ValueError, TypeError):
        return False


def hasData(value):
    """
    Check if a variable contains meaningful data (non-zero number, non-empty string/list/dict/object, etc.)
    @param value: any variable
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
    Format date/time (supports Y/y/m/d/H/i/s/n/j placeholders)
    @param format_str: format string, e.g. 'Y-m-d H:i:s'
    @param timestamp: optional Unix timestamp in seconds
    @return: formatted time string
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
    Search for files by keyword in a directory
    @param directory: absolute directory path
    @param words: keyword (case-insensitive)
    @param recursive: whether to search subdirectories
    @return: list of matching file paths
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
    Generate a unique ID (millisecond precision)
    @param prefix: optional prefix
    @param moreEntropy: add extra randomness
    @return: unique ID string
    """
    timestamp = format(int(time.time() * 1000), "x")
    rand = ""
    if moreEntropy:
        rand = format(random.randint(0, 0xFFFFFFFF), "x")
    return prefix + timestamp + rand


def substringFromTo(s, from_str="", to_str=""):
    """
    Extract substring between two markers (markers not included)
    @param s: original string
    @param from_str: start marker (empty = from beginning)
    @param to_str: end marker (empty = to the end)
    @return: extracted substring
    """
    start = s.find(from_str) + len(from_str) if from_str else 0
    end = s.rfind(to_str) if to_str else len(s)
    if (from_str and start == -1 + len(from_str)) or (to_str and end == -1):
        print(f"⚠ substringFromTo: marker not found: {from_str} -> {to_str}")
        return ""
    return s[start:end]


# ========== Core Operations ==========
def setDefaultDelay(millisecond):
    """
    Set the global delay for simulation operations (mouse, keyboard, paste, open URL, etc.)
    @param millisecond: delay in milliseconds, default 1000
    """
    global defaultDelay
    defaultDelay = millisecond


def sleep(milliseconds):
    """
    Pause script execution (milliseconds) using native Python delay.
    Maximum single wait is 2 minutes.
    @param milliseconds: milliseconds
    """
    if milliseconds < 1:
        return
    if milliseconds >= 120000:
        print("Warning: maximum wait is 2 minutes")
    seconds = milliseconds / 1000.0
    time.sleep(seconds)


def wait(seconds=1):
    """
    Pause script execution (seconds). Supports fractions. Waits longer than 100s are split.
    @param seconds: seconds, default 1
    """
    if seconds <= 0 or not isNumeric(seconds):
        print("pbottleRPA.wait: seconds input error")
        return
    if seconds > 100:
        quotient = int(seconds // 100)
        for _ in range(quotient):
            sleep(100 * 1000)
            print("Tip: waited 100s...")
        seconds = seconds % 100
    sleep(seconds * 1000)


def beep():
    """Play system warning sound"""
    urllib.request.urlopen(f"{CppUrl}?action=beep")


def showMsg(title, content):
    """
    Show a system notification popup
    @param title: title
    @param content: content
    """
    title = urlencode(title)
    content = urlencode(content)
    urllib.request.urlopen(f"{CppUrl}?action=showMsg&title={title}&content={content}")


def showRect(fromX=0, fromY=0, width=500, height=500, color="red", msec=500):
    """
    Draw a colored rectangle on screen (for debugging / highlighting)
    @param fromX: top-left x
    @param fromY: top-left y
    @param width: width
    @param height: height
    @param color: red/green/blue/yellow
    @param msec: display duration in milliseconds
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
    Force exit the current script
    @param *args: optional exit messages
    """
    if args:
        print(*args)
    beep()
    sys.exit(1)


# Alias to avoid conflict with built-in exit
def exit(*args):
    """
    Force exit the current script
    @param *args: optional exit messages
    """
    exit_script(*args)


def kill(processName, force=False):
    """
    Terminate a process (Windows taskkill)
    @param processName: process name, e.g. 'WINWORD.EXE'
    @param force: force termination
    """
    force_flag = "/F" if force else ""
    try:
        subprocess.run(
            f"taskkill {force_flag} /IM {processName}",
            shell=True,
            check=True,
            capture_output=True,
        )
        print(f"Process killed: {processName}")
    except subprocess.CalledProcessError:
        print(f"Failed to kill process ({processName}), maybe not running")


def moveMouseSmooth(x, y, interval=0):
    """
    Move mouse smoothly to absolute screen coordinates (top-left origin)
    @param x: x coordinate
    @param y: y coordinate
    @param interval: per-pixel delay (ms), larger = slower movement, default 0
    """
    x = int(round(x))
    y = int(round(y))
    urllib.request.urlopen(f"{CppUrl}?action=moveMouse&x={x}&y={y}&interval={interval}")
    sleep(defaultDelay)


# Alias
moveMouse = moveMouseSmooth


def moveAndClick(x, y):
    """
    Move mouse to position and left click
    @param x: x coordinate
    @param y: y coordinate
    """
    moveMouseSmooth(x, y)
    mouseClick()


def mouseClick(leftRight="left", time_ms=30):
    """
    Click at current position
    @param leftRight: 'left' or 'right'
    @param time_ms: press duration in ms
    """
    action = "mouseLeftClick" if leftRight != "right" else "mouseRightClick"
    urllib.request.urlopen(f"{CppUrl}?action={action}&time={time_ms}")
    sleep(defaultDelay)


def mouseDoubleClick():
    """Double-click left mouse button"""
    urllib.request.urlopen(f"{CppUrl}?action=mouseDoubleClick")
    sleep(defaultDelay)


def mouseWheel(data=-720):
    """
    Mouse wheel scroll
    @param data: scroll amount, negative = down, positive = up, default -720
    """
    urllib.request.urlopen(f"{CppUrl}?action=mouseWheel&data={data}")
    sleep(defaultDelay)


def mouseLeftDragTo(x, y):
    """
    Left-button drag to a position
    @param x: target x coordinate
    @param y: target y coordinate
    """
    x = int(round(x))
    y = int(round(y))
    urllib.request.urlopen(f"{CppUrl}?action=mouseLeftDragTo&x={x}&y={y}")
    sleep(defaultDelay)


def mouseRightDragTo(x, y):
    """
    Right-button drag to a position
    @param x: target x coordinate
    @param y: target y coordinate
    """
    x = int(round(x))
    y = int(round(y))
    urllib.request.urlopen(f"{CppUrl}?action=mouseRightDragTo&x={x}&y={y}")
    sleep(defaultDelay)


def getScreenColor(x, y):
    """
    Get the color of a screen pixel
    @param x: x coordinate
    @param y: y coordinate
    @return: color value, e.g. '#000000'
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=getScreenColor&x={x}&y={y}")
    return json.loads(resp.read().decode())["rs"]


def screenShot(savePath="", x=0, y=0, w=-1, h=-1):
    """
    Take a screenshot
    @param savePath: save path (should end with .png), default saves to Pictures folder
    @param x: start x
    @param y: start y
    @param w: width (-1 = full screen)
    @param h: height (-1 = full screen)
    @return: result string
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
    Convert key name to virtual key code (aligned with JS version)
    @param name: key name (see https://www.pbottle.com/a-13862.html)
    @return: integer key code
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
    Simulate key down/up event
    @param key: key name
    @param upDown: 'down' for press, 'up' for release
    """
    key_n = keycode(key)
    if key_n == 0:
        print(f"⚠ Key {key} does not exist!")
        return
    upDown_n = 0 if upDown != "up" else 2
    urllib.request.urlopen(
        f"{CppUrl}?action=keyToggle&key_n={key_n}&upDown_n={upDown_n}"
    )


def keyTap(key):
    """
    Press a key (press and release). Supports combos like 'ctrl+a'
    @param key: key name or combo (joined by '+')
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
    Simulate mouse button down/up event
    @param key: 'left' / 'right' / 'middle'
    @param upDown: 'down' for press, 'up' for release
    """
    key_map = {"left": 0, "right": 1, "middle": 2}
    key_n = key_map.get(key, 0)
    upDown_n = 0 if upDown != "up" else 2
    urllib.request.urlopen(
        f"{CppUrl}?action=mouseKeyToggle&key_n={key_n}&upDown_n={upDown_n}"
    )


def findScreen(tpPaths, miniSimilarity=0.85, fromX=0, fromY=0, width=-1, height=-1):
    """
    Find an image on screen (template matching)
    @param tpPaths: image template path(s), can be a string or a list (relative like ./image/123.png)
    @param miniSimilarity: minimum similarity (0-1), default 0.85
    @param fromX: search start x
    @param fromY: search start y
    @param width: search width (-1 = full screen)
    @param height: search height (-1 = full screen)
    @return: dict {'x': int, 'y': int, 'value': float} if found, otherwise False
    """
    if fromX < 0 or fromY < 0:
        raise ValueError(f"Error: search start cannot be negative, x:{fromX} y:{fromY}")
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
    Find text on screen (using OCR)
    @param inputTxt: text to search (partial match)
    @param fromX: start x
    @param fromY: start y
    @param width: search width
    @param height: search height
    @return: dict {'text': str, 'x': int, 'y': int, 'score': float} if found, else False
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
    Wait for a text to appear on screen
    @param inputTxt: text to wait for
    @param fromX, fromY, width, height: search region
    @param intervalFun: callback, return 'stopWait' to abort
    @param timeOut: timeout in seconds
    @return: position dict, raises TimeoutError on timeout
    """
    print("Waiting for text:", inputTxt)
    for _ in range(timeOut):
        sleep(1000)
        pos = findText(inputTxt, fromX, fromY, width, height)
        if pos:
            return pos
        if intervalFun and intervalFun() == "stopWait":
            print("stopWait from intervalFun")
            return False
    print("Timeout screenshot saved to Pictures")
    screenShot()
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"Wait text timeout: {inputTxt} at line {frame.f_lineno}")


def findContours(minimumArea=1000, fromX=0, fromY=0, width=-1, height=-1):
    """
    Find contours (object/window edges) on screen
    @param minimumArea: minimum area, default 1000 (approx 31x31 pixels)
    @param fromX: start x
    @param fromY: start y
    @param width: search width
    @param height: search height
    @return: list of contour dicts with keys: x, y, cx, cy, area, id
    """
    if fromX < 0 or fromY < 0:
        raise ValueError(
            f"Error: contour search start cannot be negative, x:{fromX} y:{fromY}"
        )
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
    Compare two images for similarity
    @param path1: first image path
    @param path2: second image path
    @param checkType: algorithm 'SIFT', 'ORB', or 'SSIM' (default 'ORB')
    @return: dict {'score': float, 'time': float}
    """
    path1 = urlencode(os.path.abspath(path1))
    path2 = urlencode(os.path.abspath(path2))
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=imgSimilar&path1={path1}&path2={path2}&checkType={checkType}"
    )
    return json.loads(resp.read().decode())


def paste(txt):
    """
    Paste text at current focus (simulates Ctrl+V)
    @param txt: text to paste
    """
    copyText(txt)
    keyTap("ctrl+v")
    sleep(defaultDelay)


def copyText(txt):
    """
    Copy text to clipboard
    @param txt: text content
    """
    txt = urlencode(txt)
    urllib.request.urlopen(f"{CppUrl}?action=copyText&txt={txt}")


def copyFile(filepath):
    """
    Copy file/folder to clipboard (can then paste elsewhere, e.g. WeChat)
    @param filepath: absolute path
    """
    filepath = os.path.abspath(filepath)
    if not os.path.exists(filepath):
        print(f"copyFile warning: path does not exist {filepath}")
    filepath = filepath.replace("\\", "/")
    filepath = urlencode(filepath)
    urllib.request.urlopen(f"{CppUrl}?action=copyFile&path={filepath}")


def getClipboard():
    """
    Get clipboard content (supports text, image base64, HTML)
    @return: clipboard content string
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=getClipboard")
    return resp.read().decode()


def wxMessage(title, content, key):
    """
    Send a WeChat notification via PBottle cloud (free)
    @param title: message title
    @param content: message content
    @param key: get key at https://www.pbottle.com/a-12586.html
    """
    url = f"https://yun.pbottle.com/manage/yun/?msg={urlencode(content)}&name={urlencode(title)}&key={key}"
    resp = urllib.request.urlopen(url)
    print("WeChat message sent:", resp.read().decode())


def postJson(url, msgJson, headersJson=None, method="POST"):
    """
    Send JSON data to an API
    @param url: API endpoint
    @param msgJson: dict to send
    @param headersJson: extra headers dict
    @param method: HTTP method, default POST
    @return: response text
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
    Send a JSON file to an API (suitable for large payloads)
    @param url: API endpoint
    @param msgJsonFile: path to JSON file
    @param headersJson: extra headers dict
    @param method: HTTP method
    @return: response text
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
    Simple HTTP request returning response text
    @param url: URL
    @param headersJson: request headers dict
    @param method: HTTP method
    @return: response body string
    """
    if headersJson is None:
        headersJson = {}
    req = urllib.request.Request(url, headers=headersJson, method=method)
    with urllib.request.urlopen(req) as f:
        return f.read().decode()


def downloadFile(fileUrl, filename, headersJson=None):
    """
    Download a file and save locally
    @param fileUrl: file URL
    @param filename: local save path
    @param headersJson: request headers dict
    """
    if headersJson is None:
        headersJson = {}
    filename = os.path.abspath(filename)
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    print("Download file to:", filename)
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
    Send an email (synchronous)
    @param to: recipient email
    @param subject: email subject
    @param content: plain text body
    @param host: SMTP server
    @param port: SMTP port
    @param user: authentication user
    @param passwd: authentication password
    @return: success message string
    """
    if user == "leo191@foxmail.com":
        content += "\n\n Please do not use the demo email for production; see https://rpa.pbottle.com/a-14106.html"
    msg = MIMEText(content, "plain", "utf-8")
    msg["From"] = formataddr(("PBottle RPA", user))
    msg["To"] = formataddr(("", to)) if "@" in str(to) else to
    msg["Subject"] = Header(subject, "utf-8")

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(host, port, context=context) as server:
        server.login(user, passwd)
        server.sendmail(user, [to], msg.as_string())
    return "✅ Email sent successfully"


def tts(text):
    """
    Text-to-speech (non-blocking)
    @param text: text to speak
    """
    text = urlencode(text)
    urllib.request.urlopen(f"{CppUrl}?action=tts&txt={text}")
    sleep(defaultDelay)


def openURL(myurl):
    """
    Open a URL with the default browser
    @param myurl: URL string
    """
    urllib.request.urlopen(f"{CppUrl}?action=setWebReadyPage")
    myurl = urlencode(myurl)
    urllib.request.urlopen(f"{CppUrl}?action=openURL&url={myurl}")
    sleep(defaultDelay + 1000)


def openDir(filePath):
    """
    Open a folder in Explorer or a file with its default program
    @param filePath: absolute path
    """
    filePath = os.path.abspath(filePath)
    filePath = urlencode(filePath)
    urllib.request.urlopen(f"{CppUrl}?action=openDir&path={filePath}")
    sleep(defaultDelay)


openfile = openDir


def getResolution():
    """
    Get screen resolution and scaling factor
    @return: dict {'w': int, 'h': int, 'ratio': float}
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=getResolution")
    return json.loads(resp.read().decode())


def aiOcr(imagePath="screen", x=0, y=0, width=-1, height=-1):
    """
    AI OCR (text recognition). Supports screen capture or image file.
    @param imagePath: 'screen' or absolute image path
    @param x: start x
    @param y: start y
    @param width: region width
    @param height: region height
    @return: list of dicts with keys: text, score, x, y
    """
    if not imagePath:
        imagePath = "screen"
    if x < 0 or y < 0:
        raise ValueError(f"Error: OCR start cannot be negative, x:{x} y:{y}")
    if x != 0 or y != 0 or width != -1 or height != -1:
        showRect(x, y, width, height)
    if imagePath != "screen":
        imagePath = os.path.abspath(imagePath)
        imagePath = urlencode(imagePath)
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=aiOcr&path={imagePath}&x={x}&y={y}&width={width}&height={height}&onlyEn=0"
    )
    res = resp.read().decode()
    if res == "文字识别引擎未启动":  # Keep original server message
        print("⚠ OCR engine not started, please enable it in software settings")
        exit_script()
    items = json.loads(res)
    for it in items:
        it["x"] += x
        it["y"] += y
    return items


def aiObject(minimumScore=0.5, x=0, y=0, width=-1, height=-1):
    """
    AI object detection. Debug output saved to debug/Ai_ObjectDetect.png.
    @param minimumScore: confidence threshold (0-1)
    @param x: start x
    @param y: start y
    @param width: region width
    @param height: region height
    @return: list of dicts with keys: x, y, width, height, score, class
    """
    if x < 0 or y < 0:
        raise ValueError(
            f"Error: object detection start cannot be negative, x:{x} y:{y}"
        )
    if x != 0 or y != 0 or width != -1 or height != -1:
        showRect(x, y, width, height)
    resp = urllib.request.urlopen(
        f"{CppUrl}?action=aiObject&minimumScore={minimumScore}&x={x}&y={y}&width={width}&height={height}&onlyEn=0"
    )
    res = resp.read().decode()
    if res == "物体识别引擎未启动":  # Keep original server message
        print(
            "⚠ Object detection engine not started, please enable it in software settings"
        )
        exit_script()
    items = json.loads(res)
    for it in items:
        it["x"] += x
        it["y"] += y
        showRect(it["x"], it["y"], it["width"], it["height"], "green")
    return items


def zipDir(directory, zipFilePath=""):
    """
    Zip a folder using the Python standard library
    @param directory: folder path
    @param zipFilePath: output zip file path (defaults to 'RPA_ZipPackage.zip' inside the folder)
    """
    if not zipFilePath:
        zipFilePath = os.path.join(directory, "RPA_ZipPackage.zip")
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
    Unzip a file to a directory
    @param zipFilePath: zip file path
    @param directory: destination folder (defaults to same location as zip)
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
    Retrieve content from a cross‑script shared buffer (0‑9)
    @param n: buffer index (0‑9)
    @return: stored string
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=bufferGet&n={n}")
    return resp.read().decode()


def bufferSet(content, n=0):
    """
    Store content in a cross‑script shared buffer
    @param content: content string
    @param n: buffer index (0‑9)
    @return: 'ok' on success
    """
    return postJson(f"{CppUrl}?action=bufferSet&n={n}", content)


def delaySet(scriptPath=""):
    """
    Set a script to run automatically after the current script ends (regardless of error)
    @param scriptPath: absolute path to the follow‑up script; empty to clear
    @return: 'ok'
    """
    if scriptPath:
        scriptPath = os.path.abspath(scriptPath)
    scriptPath = urlencode(scriptPath)
    resp = urllib.request.urlopen(f"{CppUrl}?action=pbottleRPA_delay&path={scriptPath}")
    return resp.read().decode()


def deviceID():
    """
    Get the unique device ID (used for cloud services)
    @return: device ID string
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=pbottleRPA_deviceID")
    return resp.read().decode()


def clusterCenter():
    """
    Get cluster center information (Enterprise feature)
    @return: string
    """
    resp = urllib.request.urlopen(f"{CppUrl}?action=pbottleRPA_clusterCenter")
    return resp.read().decode()


# ========== Cloud Module ==========
class cloud:
    @staticmethod
    def GPT(question, modelLevel=0, options=None):
        """
        Cloud-based large language model Q&A
        @param question: question string
        @param modelLevel: 0 = budget model, 1 = balanced, 2 = flagship
        @param options: optional dict, e.g. {'response_format': 'json_object', 'temperature': 0.75, 'enable_search': False}
        @return: dict {'content': str, 'tokens': int}
        """
        if options is None:
            options = {
                "response_format": "text",
                "temperature": 0.75,
                "enable_search": False,
            }
        if len(question) < 3:
            raise ValueError("Question too short (min 2 characters)")
        data = {
            "question": question,
            "deviceToken": deviceID(),
            "modelLevel": modelLevel,
            "options": options,
        }
        resp = postJson("https://rpa.pbottle.com/API/", data)
        result = json.loads(resp)
        if result.get("error"):
            raise RPAError(f"Error: {result['error']}")
        return result

    @staticmethod
    def GPTV(question, imagePath, modelLevel=0):
        """
        Cloud-based image analysis model (image + question)
        @param question: question about the image
        @param imagePath: local image path
        @param modelLevel: model level
        @return: dict {'content': str, 'tokens': int}
        """
        imagePath = os.path.abspath(imagePath)
        if not os.path.exists(imagePath):
            raise FileNotFoundError("Input image does not exist: cloud_GPTV")
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
            raise RPAError(f"Error cloud_GPTV: {result['error']}")
        return result

    @staticmethod
    def GPTA(action="click", question="Desktop WeChat icon"):
        """
        Cloud-based screen analysis with automatic action (click, double_click, right_click).
        @param action: 'click' | 'double_click' | 'right_click'
        @param question: target description, e.g. 'Desktop WeChat icon'
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
            raise RPAError(f"Error cloud_GPTA: {result['error']}")
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
            print(f"{question} position: ({cx}, {cy})")
            moveMouseSmooth(cx, cy)
            if action == "click":
                mouseClick("left")
            elif action == "double_click":
                mouseDoubleClick()
            elif action == "right_click":
                mouseClick("right")


# ========== Browser Enhanced Module ==========
class browserCMD:
    @staticmethod
    def alert(msg):
        """Show an alert dialog in the browser"""
        code = json.dumps({"action": "alert", "args": [msg]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def closeTab(type="current"):
        """
        Close browser tab(s)
        @param type: 'current' (close current tab) or 'other' (close other tabs)
        """
        code = json.dumps({"action": "closeTab", "args": [type]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def fetch(fetch_url, options=None):
        """
        Perform a fetch request from the current page
        @param fetch_url: target URL
        @param options: request options dict
        """
        if options is None:
            options = {}
        code = json.dumps({"action": "fetch", "args": [fetch_url, options]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def waitPageReady(readyURL, timeout=20):
        """
        Wait until the browser navigates to a specific URL
        @param readyURL: expected URL (exact match)
        @param timeout: timeout in seconds
        @return: the current URL
        """
        url = f"{CppUrl}?action=getWebReadyPage"
        for _ in range(timeout):
            res = getHtml(url)
            if res == readyURL:
                return res
            sleep(1000)
            print("Waiting for page to load...")
        raise TimeoutError("waitPageReady timeout")

    @staticmethod
    def url(urlStr=None):
        """
        Get or set the current page URL
        @param urlStr: if provided, navigate to this URL; otherwise return current URL
        @return: URL string
        """
        args = [urlStr] if urlStr is not None else []
        code = json.dumps({"action": "url", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def count(selector):
        """
        Count elements matching a CSS selector
        @param selector: CSS selector
        @return: number of matching elements
        """
        code = json.dumps({"action": "count", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return int(resp) if isNumeric(resp) else 0

    @staticmethod
    def dblclick(selector, options=None):
        """
        Double-click the first matched element
        @param selector: CSS selector
        @param options: mouse event options
        """
        if options is None:
            options = {}
        code = json.dumps({"action": "dblclick", "args": [selector, options]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def offset(selector):
        """
        Get the offset of the first matched element relative to the document
        @param selector: CSS selector
        @return: dict {'left': int, 'top': int}
        """
        code = json.dumps({"action": "offset", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return json.loads(resp)

    @staticmethod
    def click(selector, options=None):
        """
        Click the first matched element
        @param selector: CSS selector
        @param options: mouse event options
        """
        if options is None:
            options = {}
        code = json.dumps({"action": "click", "args": [selector, options]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def show(selector):
        """Make matched elements visible (modify display style)"""
        code = json.dumps({"action": "show", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def hide(selector):
        """Hide matched elements"""
        code = json.dumps({"action": "hide", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def remove(selector):
        """Remove matched elements from the DOM"""
        code = json.dumps({"action": "remove", "args": [selector]})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def text(selector, content=None):
        """
        Get or set the text content of matched elements
        @param selector: CSS selector
        @param content: if provided, set text; otherwise return current text
        """
        args = [selector] if content is None else [selector, content]
        code = json.dumps({"action": "text", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def html(selector, content=None):
        """
        Get or set the inner HTML of matched elements
        @param selector: CSS selector
        @param content: if provided, set HTML; otherwise return current HTML
        """
        args = [selector] if content is None else [selector, content]
        code = json.dumps({"action": "html", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def val(selector, content=None):
        """
        Get or set the value of form elements
        @param selector: CSS selector
        @param content: if provided, set value; otherwise return current value
        """
        args = [selector] if content is None else [selector, content]
        code = json.dumps({"action": "val", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp

    @staticmethod
    def cookie(cName, cValue=None, expDays=None):
        """
        Get or set a cookie
        @param cName: cookie name
        @param cValue: if provided, set cookie value; otherwise return value
        @param expDays: expiration in days, omit for session cookie
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
        Get or set a CSS property
        @param selector: CSS selector
        @param propertyname: CSS property name
        @param value: if provided, set value; otherwise return current value
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
        Get or set an HTML attribute
        @param selector: CSS selector
        @param propertyname: attribute name
        @param value: if provided, set attribute; otherwise return current value
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
        Get or set a DOM property (e.g., checked, disabled)
        @param selector: CSS selector
        @param propertyname: property name
        @param value: if provided, set property; otherwise return current value
        """
        args = (
            [selector, propertyname]
            if value is None
            else [selector, propertyname, value]
        )
        code = json.dumps({"action": "prop", "args": args})
        resp = getHtml(f"{CppUrl}?action=webInject&jscode={urlencode(code)}")
        return resp


# ========== Hardware HID Module ==========
class hid:
    @staticmethod
    def keyToggle(key, upDown="down"):
        """Hardware-level key down/up event"""
        key_n = keycode(key)
        if key_n == 0:
            print(f"⚠ Key {key} does not exist!")
            return
        upDown_n = 0 if upDown != "up" else 2
        urllib.request.urlopen(
            f"{CppUrl}?action=keyToggleHardWare&key_n={key_n}&upDown_n={upDown_n}"
        )

    @staticmethod
    def keyTap(key):
        """Hardware-level key press (press and release), supports combos"""
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
        """Low‑level hardware mouse command"""
        urllib.request.urlopen(
            f"{CppUrl}?action=mouseDataHardWare&bt={button}&x={x}&y={y}&wheel={wheel}&time={time_ms}"
        )

    @staticmethod
    def moveMouse(x, y):
        """Hardware-level move mouse to absolute position"""
        hid._mouseCMD(0, int(round(x)), int(round(y)), 0, 10)

    @staticmethod
    def mouseClick(button="left", time_ms=10):
        """Hardware-level mouse click"""
        bt = {"left": 1, "right": 2, "middle": 4}.get(button, 1)
        hid._mouseCMD(bt, 0, 0, 0, time_ms)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)

    @staticmethod
    def moveAndClick(x, y):
        """Hardware-level move and click"""
        hid.moveMouse(x, y)
        hid.mouseClick()

    @staticmethod
    def mouseDoubleClick():
        """Hardware-level left double-click"""
        hid.mouseClick("left", 10)
        hid.mouseClick("left", 10)
        sleep(defaultDelay)

    @staticmethod
    def mouseLeftDragTo(x, y):
        """Hardware-level left drag"""
        hid._mouseCMD(1, 0, 0, 0, 10)
        hid._mouseCMD(1, int(round(x)), int(round(y)), 0, 10)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)

    @staticmethod
    def mouseRightDragTo(x, y):
        """Hardware-level right drag"""
        hid._mouseCMD(2, 0, 0, 0, 10)
        hid._mouseCMD(2, int(round(x)), int(round(y)), 0, 10)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)

    @staticmethod
    def mouseWheel(data=-1):
        """Hardware-level wheel scroll, -1 = one notch down"""
        hid._mouseCMD(0, 0, 0, data, 0)
        hid._mouseCMD(0, 0, 0, 0, 0)
        sleep(defaultDelay)


# ========== Wait Functions ==========
def waitImage(tpPath, intervalFun=None, timeOut=30, miniSimilarity=0.85):
    """
    Wait for an image to appear on screen (checks every second)
    @param tpPath: image template path or list of paths
    @param intervalFun: callback called each interval; return 'stopWait' to abort
    @param timeOut: timeout in seconds
    @param miniSimilarity: minimum similarity
    @return: position dict or False, raises TimeoutError on timeout
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
    print("Timeout screenshot saved to Pictures")
    screenShot()
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"waitImage timeout: {tpPath} at line {frame.f_lineno}")


def waitImageDisappear(tpPath, intervalFun=None, timeOut=30, miniSimilarity=0.85):
    """
    Wait for an image to disappear from screen
    @param tpPath: image template path
    @param intervalFun: callback; return 'stopWait' to abort
    @param timeOut: timeout in seconds
    @param miniSimilarity: similarity threshold
    @return: 'ok' if disappeared, else raises TimeoutError
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
    print("Timeout screenshot saved to Pictures")
    screenShot()
    frame = inspect.currentframe().f_back
    raise TimeoutError(f"waitImageDisappear timeout: {tpPath} at line {frame.f_lineno}")


def waitFile(dirPath, keyWords="", intervalFun=None, timeOut=30):
    """
    Wait for a file containing a keyword to appear in a directory
    @param dirPath: directory to monitor
    @param keyWords: filename substring (case‑insensitive)
    @param intervalFun: callback; return 'stopWait' to abort
    @param timeOut: timeout in seconds
    @return: list of matching file paths, raises TimeoutError on timeout
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
    raise TimeoutError(f"waitFile timeout: {dirPath} at line {frame.f_lineno}")


def waitFileDisappear(dirPath, keyWords="", intervalFun=None, timeOut=30):
    """
    Wait for files containing a keyword to disappear from a directory
    @param dirPath: directory to monitor
    @param keyWords: filename substring
    @param intervalFun: callback; return 'stopWait' to abort
    @param timeOut: timeout in seconds
    @return: True if disappeared, else raises TimeoutError
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
    raise TimeoutError(f"waitFileDisappear error: {dirPath} at line {frame.f_lineno}")


def waitInput(inputPrompt="Input prompt", timeOut=600):
    """
    Wait for user input (popup input box)
    @param inputPrompt: prompt text
    @param timeOut: timeout in seconds (default 600)
    @return: user input string, or empty string on timeout
    """
    print("waitInput:", inputPrompt)
    inputPrompt = urlencode(inputPrompt)
    getHtml(f"{CppUrl}?action=waitInput&inputPrompt={inputPrompt}")
    for _ in range(timeOut):
        sleep(1000)
        res = getHtml(f"{CppUrl}?action=waitInputResult")
        if hasData(res):
            showMsg("User input:", res)
            return res
    return ""


# ========== Utilities Namespace ==========
class utils:
    isNumeric = isNumeric
    hasData = hasData
    getTime = getTime
    searchFile = searchFile
    uniqid = uniqid
    substringFromTo = substringFromTo


log = print


# ========== Entry Check ==========
if __name__ == "__main__":
    print(
        "This file cannot be executed directly. Please run the script with a Chinese filename."
    )
    showMsg("Cannot execute directly", "Please run the script with a Chinese filename.")
    sys.exit(1)
