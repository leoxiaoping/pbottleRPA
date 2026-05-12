"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import os
import shutil

# Get the current working directory
__dirname = os.getcwd()


pbottleRPA.tts("Opening folder")
print("Opening folder")
# Delay 3 seconds
pbottleRPA.sleep(1000 * 3)
print(__dirname + "\\input\\")
pbottleRPA.openDir(__dirname + "\\input\\")
pbottleRPA.sleep(1000 * 2)

pbottleRPA.tts("Opening image")
print("Opening image")
pbottleRPA.openDir(__dirname + "/input/RPAlogo128.png")
pbottleRPA.sleep(1000 * 2)
pbottleRPA.tts("Closing")
pbottleRPA.keyTap("alt+f4")
pbottleRPA.sleep(1000)


pbottleRPA.tts("Copying file")
print("Copying file")
shutil.copy(
    __dirname + "/input/RPAlogo128.png", __dirname + "/input/RPAlogo128-copy.png"
)
pbottleRPA.sleep(1000 * 3)

pbottleRPA.tts("Deleting file")
print("Deleting file")
os.remove(__dirname + "/input/RPAlogo128-copy.png")

pbottleRPA.tts("Demo finished")
print("Demo finished")
pbottleRPA.showMsg("Demo finished", "Please check the running log")
