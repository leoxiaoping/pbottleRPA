"""
PBottle RPA demo – please refer to the *process documentation* for specific APIs.
Official website: https://officetool.online/pbottle-rpa/
Process documentation: https://officetool.online/pbottle-rpa/docs/

Feature description: This script demonstrates the OCR text recognition and search features of RPA.
Through these examples, you can learn how to use AI technology to recognize text on the screen and locate specific content.
"""

import time
import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality

pbottleRPA.log("=== OCR Recognition Test ===")
# Output test title to the console
pbottleRPA.log(
    "Screen resolution:", pbottleRPA.getResolution()
)  # Output the current screen resolution

pbottleRPA.tts(
    "Recognizing text in the top‑left area of your screen"
)  # Announce the upcoming operation via TTS
pbottleRPA.wait(5)  # Wait 5 seconds

start = (
    time.time()
)  # Record the start time of OCR recognition (for calculating elapsed time)

pbottleRPA.log(
    "Screen OCR result:", pbottleRPA.aiOcr("screen", 10, 10, 500, 500)
)  # Perform OCR on the top‑left area (10,10,500,500) and output the result
end = time.time()
# Record the end time of OCR recognition
pbottleRPA.log("OCR time: (seconds)", (end - start) / 1000)
# Calculate and output the OCR duration (converted to seconds)

pbottleRPA.tts(
    "The result in JSON format has been output to the running log"
)  # Announce that the OCR result has been output
pbottleRPA.wait(5)
# Wait 5 seconds


pbottleRPA.log(
    "Search for and click WeChat"
)  # Output the operation info to the console
pbottleRPA.tts("Search for and click WeChat")  # Announce the upcoming operation

position = pbottleRPA.findText(
    "WeChat", 10, 10, 1000, 500
)  # Search for the text "WeChat" within the screen area (10,10,1000,500), returning the position
pbottleRPA.log("Text search result:", position)
# Output the found text position to the console

if position:  # If the specified text is found
    pbottleRPA.moveAndClick(
        position.x, position.y
    )  # Move the mouse to the text position and click
else:  # If the specified text is not found
    pbottleRPA.log("Text 'WeChat' not found in the specified area.")
    # Output a hint that the text was not found

pbottleRPA.log("Preparing to end the script")
# Output a message that the script is about to end
pbottleRPA.tts("Preparing to end the script")
# Announce via TTS that the script is about to end


pbottleRPA.showMsg(
    "Demo finished", "Please check the running log"
)  # Show a system message box indicating the demo is over
pbottleRPA.exit("End")  # Exit the RPA script execution
