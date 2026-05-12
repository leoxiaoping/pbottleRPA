"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import time

print("=== Keyboard Operation Test ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)


pbottleRPA.tts("Preparing to run the mobile message notification script")
pbottleRPA.sleep(1000 * 5)


pbottleRPA.tts("Method 1: Using webhook - both WeCom and DingTalk are supported")
pbottleRPA.sleep(1000 * 5)


# Webhook method - supported by both WeCom and DingTalk
msgJson = {
    "msgtype": "text",
    "text": {"content": "PBottle RPA test script is running... (Python script)"},
}

# Modify the receiving address below to receive messages on your own phone.
# Reference: https://open.work.weixin.qq.com/help2/pc/14931#%E4%BA%94%E3%80%81%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BAWebhook%E5%9C%B0%E5%9D%80
apiUrl = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67bc3b43-85d1-4e0b-b7a2-d8c22d415a80"
pbottleRPA.postJson(apiUrl, msgJson)


pbottleRPA.tts(
    "Method 2: Personal WeChat notification, requires following the PBottle Technology official account"
)
pbottleRPA.sleep(1000 * 5)

# WeChat message test, nearly zero delay, 100% delivery rate. Details: https://www.pbottle.com/a-12586.html
pbottleRPA.wxMessage(
    "PBottle RPA robot message (python script)",
    "Master, my task is complete, I'm always at your command.",
    "key599a9e4136010",
)

pbottleRPA.tts("Run finished")
print("Preparing to end the script")
