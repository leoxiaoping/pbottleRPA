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
pbottleRPA.setDefaultDelay(0)  # Ignore automatic key press interval


pbottleRPA.tts(
    "Starting the PBottle RPA keyboard operation demo script... Shortcut: Ctrl+Shift+Q to manually exit"
)
# Delay 5 seconds
pbottleRPA.sleep(1000 * 12)

resolution = pbottleRPA.getResolution()
print("Current screen resolution", resolution)

pbottleRPA.tts(f'Current screen resolution: {resolution["w"]} by {resolution["h"]}')
pbottleRPA.sleep(1000 * 6)

pbottleRPA.tts(
    "Preparing to open a web page and enter fullscreen with a shortcut. Starting in 5 seconds."
)
pbottleRPA.sleep(1000 * 10)

# Open a URL with the browser
pbottleRPA.openURL("https://rpa.pbottle.com?from=demo")
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap("f11")
pbottleRPA.sleep(1000 * 2)


pbottleRPA.tts("Scrolling down to view")
pbottleRPA.keyTap("page down")
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap("page down")
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap("page down")
pbottleRPA.sleep(1000 * 1)
pbottleRPA.tts("Scrolling back up")
pbottleRPA.keyTap("page up")
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap("page up")
pbottleRPA.sleep(1000 * 1)
pbottleRPA.keyTap("page up")
pbottleRPA.sleep(1000 * 2)


pbottleRPA.tts("Bookmark us, thank you very much")
pbottleRPA.keyTap("ctrl + d")

pbottleRPA.sleep(1000 * 2)
pbottleRPA.keyTap("enter")
pbottleRPA.sleep(1000 * 2)


pbottleRPA.keyTap("f11")
pbottleRPA.tts("Demo finished")
print("Preparing to end the script")

pbottleRPA.exit("Script ended", True)
