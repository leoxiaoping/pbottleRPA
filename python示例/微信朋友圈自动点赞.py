"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import time


print("=== 微信朋友圈自动点赞 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)

pbottleRPA.showMsg('流程已开始运行','请打开电脑声音，关注运行日志信息')
pbottleRPA.tts('准备开始运行朋友圈批量点赞脚本，适配分辨率无缩放屏幕')
pbottleRPA.sleep(1000*7)


resolution = pbottleRPA.getResolution()
print('当前电脑屏幕分辨率',resolution)
if (resolution["ratio"] !=1) :
    pbottleRPA.tts('错误：此demo只适配分辨率无缩放屏幕')
    print('错误：此demo只适配无缩放屏幕')
    pbottleRPA.sleep(1000*6)
    pbottleRPA.exit()



color = pbottleRPA.getScreenColor(1,resolution["h"] - 1);
print('系统任务栏色：',color);



#输入路径中不要有自定义中文  
rs =  pbottleRPA.waitImage('./input/pengYouQuanDianZan/0.png',lambda:print('等待中，请先打开电脑版微信界面'),120)



#打开微信朋友圈
pbottleRPA.moveMouseSmooth(rs["x"],rs["y"]);
pbottleRPA.mouseClick()
pbottleRPA.moveMouseSmooth(1920/2,1080/2);

#点赞计数
n = 0

#开始任务
def loop() :
    print('进入')
    global n

    rs =  pbottleRPA.findScreen('./input/pengYouQuanDianZan/1.png',0.99,100,100)
    if (rs == False) :
        print('下一页')
        # pbottleRPA.keyTap('page down')    #微信bug，按键容易加载不成功
        pbottleRPA.mouseWheel()
        pbottleRPA.sleep(500)
        loop()

    else:

        pbottleRPA.moveMouseSmooth(rs["x"],rs["y"]);
        pbottleRPA.mouseClick()

        pbottleRPA.sleep(100)

        pbottleRPA.moveMouseSmooth(rs["x"]-167,rs["y"]);
        pbottleRPA.mouseClick()

        #点1000个赞就行了，不要贪杯
        n += 1
        if (n>=1000) :
            pbottleRPA.exit("")
        
        pbottleRPA.sleep(100)
        loop()  #重复

loop()

