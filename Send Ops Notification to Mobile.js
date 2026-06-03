/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates the mobile message notification feature of RPA,
 * including sending messages via Webhook to WeCom/DingTalk and sending personal notifications via WeChat Official Account.
 * Through this example, you can learn how to integrate mobile notification functions into automation flows
 * for remote monitoring and alerts.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log("=== Operations Message Notification Test ===");   // Output the test title to the console
console.log(Date());                            // Output the current date and time to the console

pbottleRPA.tts('Preparing to run the mobile message notification script')  // Announce the upcoming operation via TTS
pbottleRPA.wait(5)                              // Wait 5 seconds to give the user time to prepare

pbottleRPA.tts('Using webhook method – both WeCom and DingTalk are supported') // Announce the first notification method
pbottleRPA.log("Using webhook method – both WeCom and DingTalk are supported")
pbottleRPA.wait(5)                              // Wait 5 seconds

// Send a message via webhook, which is supported by both WeCom and DingTalk
let msgJson = {                                 // Define the message content object
    "msgtype": "text",                          // Message type is text
    "text": {                                   // Text message content
        "content": "PBottle RPA test script is running..." // The actual text content
    }
};

// Modify the receiving address below to receive messages on your own phone
// Reference: https://open.work.weixin.qq.com/help2/pc/14931#%E4%BA%94%E3%80%81%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BAWebhook%E5%9C%B0%E5%9D%80
let apiUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67bc3b43-85d1-4e0b-b7a2-d8c22d415a80'; // Webhook address of a WeCom bot

// Send the JSON message to the specified API using a POST request
const rs = pbottleRPA.postJson(apiUrl, msgJson);
console.log('Server response:', rs);

pbottleRPA.openURL("https://open.work.weixin.qq.com/help2/pc/14931#%E4%BA%94%E3%80%81%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BAWebhook%E5%9C%B0%E5%9D%80"); // Open the relevant help page

pbottleRPA.tts("Run finished.")                // Announce the end of the run via TTS
pbottleRPA.log("Run finished.")