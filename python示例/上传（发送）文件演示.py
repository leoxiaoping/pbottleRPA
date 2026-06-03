"""
PBottle RPA demo. Please refer to the *process documentation* for specific APIs.
Official website: https://officetool.online/pbottle-rpa/
Process documentation: https://officetool.online/pbottle-rpa/docs/

Feature description: This script demonstrates the file upload (send) function in RPA.
It requires the browser enhancement extension to manipulate web elements for an automated file upload workflow.
"""

import os
import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality

# Get the directory of the current script for building file paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Announce the start via speech
pbottleRPA.tts(
    "File upload demonstration"
)  # Use text-to-speech to announce the demo start
# Show a system message box to remind the user that the browser extension is needed
pbottleRPA.showMsg(
    "This demo requires the browser enhancement extension", "File upload demonstration"
)
pbottleRPA.wait(2)  # Wait 2 seconds

pbottleRPA.log("Starting demonstration")  # Output the start message to the console

# Open Baidu Images for the file upload demo
pbottleRPA.openURL("https://image.baidu.com/")
pbottleRPA.wait()  # Wait for the page to load

# Use the browser enhancement extension to click the upload icon element
# Match a span element whose class starts with "img-upload-icon_" via CSS selector
pbottleRPA.browserCMD.click('span[class^="img-upload-icon_"]')

# Find the text "Upload image" on the page
pos = pbottleRPA.findText("Upload image")
# Move the mouse to the found position and click to open the file selection dialog
pbottleRPA.moveAndClick(pos.x, pos.y)

pbottleRPA.wait()  # Wait for the dialog to open

# Copy the file to be uploaded to the clipboard
pbottleRPA.copyFile(SCRIPT_DIR + "/input/RPAlogo128.png")

# Use shortcut keys to paste the file path
pbottleRPA.keyTap("shift+tab")  # Press Shift+Tab
pbottleRPA.keyTap("ctrl+v")  # Press Ctrl+V to paste the file

pbottleRPA.wait()  # Wait for the file to be pasted
pbottleRPA.keyTap("enter")  # Press Enter to confirm the file selection

# Confirm the upload
pbottleRPA.keyTap("enter")  # Press Enter again to start the upload
