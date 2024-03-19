"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import random 



#for 循环 重复操作 10 次 打开网页
for index in range(10):
    number = index+1
    print('第' +  str(number) + '次操作'); #输出到日志，文件日志永久保存
    pbottleRPA.openURL('https://www.baidu.com/s?wd='+ str(number)) #操作：用默认浏览器打开网页
    pbottleRPA.sleep(500) #等待500毫秒



#判断
number = random.random()  #生成一个 0-1 的随机数  用于判断
if (number < 0.5) :       #用 if 判断数值是否小于 0.5
    print('小于 0.5。', number)
    pbottleRPA.tts('小于 0.5')
else:
    print('大于或等于 0.5。', number)
    pbottleRPA.tts('大于等于 0.5。')


pbottleRPA.sleep(1000)

#语音播报
pbottleRPA.tts('流程结束！~')
pbottleRPA.showMsg('小瓶RPA提示','流程结束！~')