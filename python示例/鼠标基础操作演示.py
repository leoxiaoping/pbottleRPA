"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import time

print("=== Mouse Operation Test ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)
pbottleRPA.setDefaultDelay(0)  # Ignore automatic key interval


pbottleRPA.tts(
    "Starting the PBottle RPA mouse operation demo script... Shortcut: Ctrl+Shift+Q to manually exit"
)
# Delay 12 seconds
pbottleRPA.sleep(1000 * 12)

resolution = pbottleRPA.getResolution()
print("Current screen resolution", resolution)
pbottleRPA.keyTap("windows+d")

pbottleRPA.tts(f'Current screen resolution: {resolution["w"]} by {resolution["h"]}')
pbottleRPA.sleep(1000 * 6)


pbottleRPA.tts("Moving the pointer to the center of the screen")
pbottleRPA.moveMouseSmooth(resolution["w"] / 2, resolution["h"] / 2)
pbottleRPA.sleep(1000 * 3)

pbottleRPA.tts("Long-pressing the left button")
pbottleRPA.mouseClick("left", 1500)
pbottleRPA.sleep(1000 * 2)

pbottleRPA.tts("Mouse double-click")
pbottleRPA.moveMouseSmooth(38, 38)
pbottleRPA.mouseDoubleClick()
pbottleRPA.sleep(1000 * 3)


pbottleRPA.tts(
    "Preparing to open a web page and scroll the mouse. Starting in 5 seconds."
)
pbottleRPA.sleep(1000 * 10)

# Open a URL with the browser
pbottleRPA.openURL("https://rpa.pbottle.com?from=demo")
pbottleRPA.sleep(1000 * 2)
pbottleRPA.keyTap("f11")
pbottleRPA.sleep(1000 * 1)


pbottleRPA.tts("Scrolling the mouse")
pbottleRPA.mouseWheel()
pbottleRPA.sleep(1000 * 4)
pbottleRPA.tts("Scrolling the mouse in reverse")
pbottleRPA.mouseWheel(360)
pbottleRPA.sleep(1000 * 4)


pbottleRPA.tts("Right-click on the page")
pbottleRPA.moveMouseSmooth(100, 100)
pbottleRPA.mouseClick("right")
pbottleRPA.sleep(1000 * 3)
pbottleRPA.moveMouseSmooth(35, 35)
pbottleRPA.tts("Left-click")
pbottleRPA.mouseClick()
pbottleRPA.sleep(1000 * 3)


# Test mouse drag
pbottleRPA.tts("Drag or selection")
pbottleRPA.sleep(1000 * 4)
pbottleRPA.moveMouseSmooth(1634, 143)
pbottleRPA.mouseLeftDragTo(500, 500)


pbottleRPA.sleep(1000 * 5)

pbottleRPA.mouseClick()
pbottleRPA.keyTap("f11")
pbottleRPA.tts("Demo finished")
print("Preparing to end the script")
pbottleRPA.sleep(1000 * 3)
# Force exit the script
pbottleRPA.exit()
print("Already exited, this line is unreachable")
