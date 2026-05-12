"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import time

print("=== Web Enhancement Plugin - Browser Element Operation Demo ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)

print("=== NOTE ===")
print("=== The PBottle RPA browser extension must be installed ===")
print("=== ===")


pbottleRPA.tts(
    "You must install the PBottle RPA browser enhancement extension. Click OK to continue."
)
pbottleRPA.showMsg("Tip:", "You must install the browser enhancement extension first.")
pbottleRPA.openURL("https://www.baidu.com")


ret = pbottleRPA.browserCMD.alert(
    "Greetings from PBottle RPA. Click OK to start. 20-second timeout."
)
print("Operation result:", ret)
if ret != "ok":
    print("PBottle RPA browser extension not detected.", ret)
    pbottleRPA.exit(1)


# Wait 1 second
pbottleRPA.sleep(1000 * 1)


ret = pbottleRPA.browserCMD.text("span.title-content-title")
print("Operation result [multiple elements]:", ret)


ret = pbottleRPA.browserCMD.cookie("BAIDUID")
print("Operation result (cookie get):", ret)
ret = pbottleRPA.browserCMD.cookie("pbottleID", "good", 3)
print("Operation result (cookie set):", ret)


pbottleRPA.tts("Change background color")
ret = pbottleRPA.browserCMD.css("body", "background-color", "blue")
print("Operation result (css set):", ret)
ret = pbottleRPA.browserCMD.css("body", "background-color")
print("Operation result [color value]:", ret)
ret = pbottleRPA.browserCMD.css("body", "background-color", "white")
print("Operation result (css set):", ret)


ret = pbottleRPA.browserCMD.text("title")
print("Operation result (text get):", ret)
pbottleRPA.tts("Getting title")
pbottleRPA.sleep(1000 * 3)


pbottleRPA.tts("Setting page title")
ret = pbottleRPA.browserCMD.text("title", "[PBottle RPA]-" + ret)
print("Operation result (text set):", ret)
ret = pbottleRPA.browserCMD.text("title")
print("Current page title:", ret)
pbottleRPA.sleep(1000 * 3)


pbottleRPA.tts("Enter search term and click the search button")
ret = pbottleRPA.browserCMD.val("#kw", "PBottle RPA")
print("Operation result (val set):", ret)


ret = pbottleRPA.browserCMD.click("#su")
print("Operation result (click):", ret)


pbottleRPA.sleep(1000 * 3)


pbottleRPA.tts("Start removing ads")
ret = pbottleRPA.browserCMD.remove("#content_left div:first")
print("Operation result (remove):", ret)
pbottleRPA.sleep(3000)


pbottleRPA.tts("Open website")
pbottleRPA.browserCMD.click("div#content_left a:first")
pbottleRPA.sleep(1500)


pbottleRPA.tts("Read logo path, display in log")
ret = pbottleRPA.browserCMD.attr("img:first", "src")
print("Website logo image URL:", ret)
pbottleRPA.sleep(1500)


pbottleRPA.tts("Demo completed, ready to exit")
print("Preparing to end the script")
ret = pbottleRPA.browserCMD.alert("Demo finished.")
# Force exit script
pbottleRPA.exit()
print("Already exited, this line is unreachable")
