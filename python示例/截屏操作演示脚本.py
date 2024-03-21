"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import time

print("=== 截屏操作演示脚本 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)
pbottleRPA.setDefaultDelay(0)  #忽略自动按键间隔


pbottleRPA.tts('开始运行小瓶RPA截屏操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出')
#延迟5秒
pbottleRPA.sleep(1000 * 12)

resolution = pbottleRPA.getResolution()
print('当前电脑屏幕分辨率', resolution)

pbottleRPA.tts(f'当前电脑屏幕分辨率: {resolution["w"]} 乘以 {resolution["h"]}')
pbottleRPA.sleep(1000 * 6)


pbottleRPA.tts('正在截屏（全屏）...')
pbottleRPA.sleep(1000*3)
pbottleRPA.screenShot();


pbottleRPA.tts('正在截屏（区域）...')
print(resolution["w"]/4,resolution["h"]/4,resolution["w"]/2,resolution["h"]/2)
rs = pbottleRPA.screenShot('',resolution["w"]/4,resolution["h"]/4,resolution["w"]/2,resolution["h"]/2);
print('截屏结果：',rs)
pbottleRPA.sleep(1000*3)


pbottleRPA.tts('图片保存在我的电脑 我的图片...')
pbottleRPA.sleep(1000*5)



pbottleRPA.tts('演示结束')
print("准备结束脚本")