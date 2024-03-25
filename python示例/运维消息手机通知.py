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


pbottleRPA.tts('准备运行手机消息通知脚本')
pbottleRPA.sleep(1000*5)


pbottleRPA.tts('方式一：采用webhook 方式  企业微信、钉钉都支持')
pbottleRPA.sleep(1000*5)


#webhook 方式  企业微信、钉钉都支持
msgJson={
    "msgtype": "text",
    "text": {
        "content": "小瓶Rpa测试脚本运行中...（Python脚本）"
    }
};

#修改下方接收地址，可以用自己手机接收信息  参考：https://open.work.weixin.qq.com/help2/pc/14931#%E4%BA%94%E3%80%81%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BAWebhook%E5%9C%B0%E5%9D%80
apiUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67bc3b43-85d1-4e0b-b7a2-d8c22d415a80';
pbottleRPA.postJson(apiUrl,msgJson);


pbottleRPA.tts('方式二：个人微信通知，需要关注小瓶科技公众号')
pbottleRPA.sleep(1000*5)

#微信消息测试，几乎零延迟，100%到达率   详情： https://www.pbottle.com/a-12586.html
pbottleRPA.wxMessage('小瓶RPA机器人消息（python脚本）',"主人，我的任务已经完成了,随时等您的吩咐",'key599a9e4136010');

pbottleRPA.tts("运行结束")
print("准备结束脚本")
