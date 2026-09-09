"""
小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

功能说明：此脚本演示了RPA中的剪切板操作功能，包括复制文本、获取剪切板内容（支持多格式枚举）和复制文件
"""
import pbottleRPA  #引入小瓶RPA模块
import time
import os

print("=== 剪切板演示脚本 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)


pbottleRPA.tts('电脑剪切板演示')
pbottleRPA.showMsg('超级剪切板','新版剪切板已经支持获取图片、网页格式内容')
print('✅ 超级剪切板','新版剪切板已经支持获取图片、网页格式内容')
#延迟5秒
pbottleRPA.sleep(1000*5)


pbottleRPA.tts('已经复制文字，赶紧找个地方粘贴试试吧')
print('已经复制文字，赶紧找个地方粘贴试试吧')
# 将指定文本内容复制到系统剪切板中
pbottleRPA.paste("小瓶RPA官网：https://rpa.pbottle.com/")
pbottleRPA.sleep(1000*5)


# getClipboard(type) 支持四种内容类型枚举，默认 'plain'（纯文本）：
#   'plain' 纯文本 | 'html' HTML源码 | 'urls' 文件链接列表 | 'image' 图片base64
text = pbottleRPA.getClipboard()                     # 等同 getClipboard('plain')
print("获取当前剪切板纯文本：",text)


# 复制文件到系统剪切板（模拟文件复制操作），再按 'urls' 类型读取文件路径
print("复制文件模拟操作：")
pbottleRPA.copyFile(os.path.join(os.path.dirname(__file__), 'input', 'RPAlogo128.png'))
filepath = pbottleRPA.getClipboard('urls')           # 返回 'file:///C:..' 多个以换行分隔
print("剪切板文件路径：",filepath)


pbottleRPA.tts('已经复制文件，赶紧桌面粘贴试试吧')
print('已经复制文件，赶紧桌面粘贴试试吧')
pbottleRPA.sleep(1000*5)

# 可选演示（需先在相应程序中复制内容再取消注释运行）：
#   'html'  富文本源码：在网页/钉钉中复制带格式内容
#   'image' 图片base64：用截图工具复制一张图片（QQ截图 / 浏览器复制图片）
# html_text = pbottleRPA.getClipboard('html')
# image_b64 = pbottleRPA.getClipboard('image')


print("准备结束脚本")
#脚本强制退出
pbottleRPA.exit()
