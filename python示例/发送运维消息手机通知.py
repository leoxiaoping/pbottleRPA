"""
PBottle RPA demo. Please refer to the *process documentation* for specific APIs.
Official website: https://officetool.online/pbottle-rpa/
Process documentation: https://officetool.online/pbottle-rpa/docs/

Feature description: This script demonstrates the mobile message notification feature of RPA,
including sending messages via Webhook to WeCom/DingTalk and personal notifications via WeChat Official Account.
Through this example, you can learn how to integrate mobile notification in automation flows for remote monitoring and alerts.
"""

import pbottleRPA  # Import the core PBottle RPA library to access RPA functionalities

pbottleRPA.log("=== Operations Message Notification Test ===")
# Output the test title to the console
pbottleRPA.log("Current time:", pbottleRPA.getTime())
# Output the current date and time to the console

pbottleRPA.tts(
    "Preparing to run the mobile message notification script"
)  # Announce the upcoming operation via TTS
pbottleRPA.wait(5)  # Wait 5 seconds to give the user time to prepare

pbottleRPA.tts(
    "Using webhook method - both WeCom and DingTalk are supported"
)  # Announce the first notification method via speech
pbottleRPA.log("Using webhook method - both WeCom and DingTalk are supported")
pbottleRPA.wait(5)  # Wait 5 seconds

# Send a message via webhook, which is supported by both WeCom and DingTalk
msgJson = {  # Define the message content object
    "msgtype": "text",  # Message type is text
    "text": {
        "content": "PBottle RPA test script is running..."
    },  # Text message content
}

# Modify the receiving address below to receive messages on your own phone
# Reference: https://open.work.weixin.qq.com/help2/pc/14931#%E4%BA%94%E3%80%81%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BAWebhook%E5%9C%B0%E5%9D%80
apiUrl = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67bc3b43-85d1-4e0b-b7a2-d8c22d415a80"
# WeCom bot Webhook address

# Send the JSON message to the specified API using a POST request
rs = pbottleRPA.postJson(apiUrl, msgJson)
pbottleRPA.log("Server response:", rs)

pbottleRPA.openURL(
    "https://open.work.weixin.qq.com/help2/pc/14931#%E4%BA%94%E3%80%81%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BAWebhook%E5%9C%B0%E5%9D%80"
)
# Open the relevant help page

pbottleRPA.tts("Run finished.")  # Announce the end of the run via TTS
pbottleRPA.log("Run finished.")
