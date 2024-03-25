"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import time

print("=== 剪切板演示脚本 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)


pbottleRPA.tts('电脑剪切板演示')
pbottleRPA.showMsg('超级剪切板','新版剪切板已经支持获取图片、网页格式内容')
print('超级剪切板','新版剪切板已经支持获取图片、网页格式内容')
#延迟5秒
pbottleRPA.sleep(1000*5)

pbottleRPA.tts('已经将文字复制到您的剪切板，赶紧粘贴试试吧')
print('已经将文字复制到您的剪切板，赶紧粘贴试试吧');

pbottleRPA.paste("小瓶RPA官网：https://rpa.pbottle.com/")


pbottleRPA.sleep(1000*5) #延迟5秒
text = pbottleRPA.getClipboard();
print("获取当前剪切板文本：",text);


print("准备结束脚本");
#脚本强制退出
pbottleRPA.exit();
