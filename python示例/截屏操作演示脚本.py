"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import time

print("=== Screenshot Demo Script ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)
pbottleRPA.setDefaultDelay(0)  # Ignore automatic key interval


pbottleRPA.tts(
    "Starting the PBottle RPA screenshot demo script... Shortcut: Ctrl+Shift+Q to manually exit"
)
# Delay 5 seconds
pbottleRPA.sleep(1000 * 12)

resolution = pbottleRPA.getResolution()
print("Current screen resolution", resolution)

pbottleRPA.tts(f'Current screen resolution: {resolution["w"]} by {resolution["h"]}')
pbottleRPA.sleep(1000 * 6)


pbottleRPA.tts("Taking screenshot (full screen)...")
pbottleRPA.sleep(1000 * 3)
pbottleRPA.screenShot()


pbottleRPA.tts("Taking screenshot (region)...")
rs = pbottleRPA.screenShot(
    "",
    resolution["w"] / 4,
    resolution["h"] / 4,
    resolution["w"] / 2,
    resolution["h"] / 2,
)
print("Screenshot result:", rs)
pbottleRPA.sleep(1000 * 3)


pbottleRPA.tts("Image saved to My Pictures folder...")
pbottleRPA.sleep(1000 * 5)


pbottleRPA.tts("Demo finished")
print("Preparing to end the script")
