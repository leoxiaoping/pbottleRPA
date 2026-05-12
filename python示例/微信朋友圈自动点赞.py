"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import time

print("=== WeChat Moments Auto-Like ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)

pbottleRPA.showMsg(
    "The process has started",
    "Please turn on your computer sound and pay attention to the running log information.",
)
pbottleRPA.tts(
    "Preparing to run the batch like script for WeChat Moments, adapted for screens without scaling."
)
pbottleRPA.sleep(1000 * 7)


resolution = pbottleRPA.getResolution()
print("Current screen resolution", resolution)
if resolution["ratio"] != 1:
    pbottleRPA.tts("Error: This demo only supports screens with no scaling.")
    print("Error: This demo only supports non‑scaled screens.")
    pbottleRPA.sleep(1000 * 6)
    pbottleRPA.exit()


color = pbottleRPA.getScreenColor(1, resolution["h"] - 1)
print("System taskbar color:", color)


# Note: The image path should not contain custom Chinese characters
rs = pbottleRPA.waitImage(
    ["./input/pengYouQuanDianZan/0.png", "./input/pengYouQuanDianZan/01.png"],
    lambda: print("Waiting... Please open the PC version of WeChat first."),
    120,
)


# Open WeChat Moments
pbottleRPA.moveMouseSmooth(rs["x"], rs["y"])
pbottleRPA.mouseClick()
pbottleRPA.moveMouseSmooth(resolution["w"] / 2, resolution["h"] / 2)

# Like counter
n = 0


# Start the task
def loop():
    print("Entering")
    global n

    rs = pbottleRPA.findScreen(
        ["./input/pengYouQuanDianZan/1.png", "./input/pengYouQuanDianZan/11.png"],
        0.99,
        100,
        100,
    )
    if rs == False:
        print("Next page")
        # pbottleRPA.keyTap('page down')    # WeChat bug – key press often fails to load
        pbottleRPA.mouseWheel()
        pbottleRPA.sleep(500)
        loop()

    else:
        pbottleRPA.moveMouseSmooth(rs["x"], rs["y"])
        pbottleRPA.mouseClick()

        pbottleRPA.sleep(100)

        pbottleRPA.moveMouseSmooth(rs["x"] - 167, rs["y"])
        pbottleRPA.mouseClick()

        # 1000 likes are enough – don’t overdo it
        n += 1
        if n >= 1000:
            pbottleRPA.exit("")

        pbottleRPA.sleep(100)
        loop()  # Repeat


loop()
