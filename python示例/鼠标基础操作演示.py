"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""
import pbottleRPA  #引入小瓶RPA模块
import time

print("=== 鼠标操作测试 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)
pbottleRPA.setDefaultDelay(0)  #忽略自动按键间隔


pbottleRPA.tts('开始运行小瓶RPA鼠标操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出')
#延迟5秒
pbottleRPA.sleep(1000 * 12)

resolution = pbottleRPA.getResolution()
print('当前电脑屏幕分辨率', resolution)
pbottleRPA.keyTap('windows+d')

pbottleRPA.tts(f'当前电脑屏幕分辨率: {resolution["w"]} 乘以 {resolution["h"]}')
pbottleRPA.sleep(1000 * 6)


pbottleRPA.tts('移动指针到屏幕中点')
pbottleRPA.moveMouseSmooth(resolution["w"]/2,resolution["h"]/2)
pbottleRPA.sleep(1000*3)

pbottleRPA.tts('长按左键')
pbottleRPA.mouseClick('left',1500);
pbottleRPA.sleep(1000*2)

pbottleRPA.tts('鼠标双击')
pbottleRPA.moveMouseSmooth(38,38)
pbottleRPA.mouseDoubleClick()
pbottleRPA.sleep(1000*3)


pbottleRPA.tts('准备打开网页并滚动鼠标，5秒后开始')
pbottleRPA.sleep(1000*10)

#用浏览器打开网址
pbottleRPA.openURL('https://rpa.pbottle.com?from=demo')
pbottleRPA.sleep(1000*2)
pbottleRPA.keyTap('f11')
pbottleRPA.sleep(1000*1)


pbottleRPA.tts('滚动鼠标')
pbottleRPA.mouseWheel()
pbottleRPA.sleep(1000*4)
pbottleRPA.tts('反向滚动鼠标')
pbottleRPA.mouseWheel(360)
pbottleRPA.sleep(1000*4)



pbottleRPA.tts('右键页面')
pbottleRPA.moveMouseSmooth(100,100)
pbottleRPA.mouseClick('right')
pbottleRPA.sleep(1000*3)
pbottleRPA.moveMouseSmooth(35,35)
pbottleRPA.tts('左键单击')
pbottleRPA.mouseClick()
pbottleRPA.sleep(1000*3)




#测试鼠标拖拽
pbottleRPA.tts('拖拽或选区')
pbottleRPA.sleep(1000*4)
pbottleRPA.moveMouseSmooth(1634,143)
pbottleRPA.mouseLeftDragTo(500,500)



pbottleRPA.sleep(1000*5)

pbottleRPA.mouseClick()
pbottleRPA.keyTap('f11')
pbottleRPA.tts('演示结束')
print("准备结束脚本");
pbottleRPA.sleep(1000*3)
#脚本强制退出
pbottleRPA.exit()
print("已经退出了，无效");