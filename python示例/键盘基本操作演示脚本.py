"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""
import pbottleRPA  #引入小瓶RPA模块
import time

print("=== 键盘操作测试 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)
pbottleRPA.setDefaultDelay(0)  #忽略自动按键间隔


pbottleRPA.tts('开始运行小瓶RPA键盘操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出')
#延迟5秒
pbottleRPA.sleep(1000 * 12)

resolution = pbottleRPA.getResolution()
print('当前电脑屏幕分辨率', resolution)

pbottleRPA.tts(f'当前电脑屏幕分辨率: {resolution["w"]} 乘以 {resolution["h"]}')
pbottleRPA.sleep(1000 * 6)

pbottleRPA.tts('准备打开网页浏览并用快捷键进入全屏，5秒后开始')
pbottleRPA.sleep(1000 * 10)

#用浏览器打开网址
pbottleRPA.openURL('https://rpa.pbottle.com?from=demo')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('f11')
pbottleRPA.sleep(1000 * 2)


pbottleRPA.tts('翻页查看')
pbottleRPA.keyTap('page down')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page down')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page down')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.tts('翻页回来')
pbottleRPA.keyTap('page up')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page up')
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap('page up')
pbottleRPA.sleep(1000 * 2)


pbottleRPA.tts('收藏我们吧，十分感谢')
pbottleRPA.keyTap('ctrl + d')

pbottleRPA.sleep(1000 * 2)
pbottleRPA.keyTap('enter')
pbottleRPA.sleep(1000 * 2)


pbottleRPA.keyTap('f11')
pbottleRPA.tts('演示结束')
print("准备结束脚本")

pbottleRPA.exit("脚本结束")