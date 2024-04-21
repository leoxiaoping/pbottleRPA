"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import os
import shutil

# 获取当前工作目录
__dirname = os.getcwd()


pbottleRPA.tts('打开文件夹')
print('打开文件夹');
#延迟5秒
pbottleRPA.sleep(1000*3)
print(__dirname + '\\input\\');
pbottleRPA.openDir(__dirname + '\\input\\')
pbottleRPA.sleep(1000*2)

pbottleRPA.tts('打开图片')
print('打开图片');
pbottleRPA.openDir(__dirname + '/input/RPAlogo128.png')
pbottleRPA.sleep(1000*2)
pbottleRPA.tts('关闭')
pbottleRPA.keyTap('alt+f4')
pbottleRPA.sleep(1000)


pbottleRPA.tts('复制文件')
print('复制文件');
shutil.copy(__dirname + '/input/RPAlogo128.png',__dirname + '/input/RPAlogo128-新复制.png')
pbottleRPA.sleep(1000*3)

pbottleRPA.tts('删除文件')
print('删除文件')
os.remove(__dirname + '/input/RPAlogo128-新复制.png')

pbottleRPA.tts('演示结束')
print('演示结束');
pbottleRPA.showMsg('演示结束','请查看运行日志')