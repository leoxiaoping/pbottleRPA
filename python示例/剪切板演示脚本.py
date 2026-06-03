"""

PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example

"""

import pbottleRPA  # Import the PBottle RPA module
import time

print("=== Clipboard Demo Script ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)


pbottleRPA.tts("Clipboard demonstration")
pbottleRPA.showMsg(
    "Super Clipboard",
    "The new clipboard now supports retrieving image and web page formatted content",
)
print(
    "✅ Super Clipboard",
    "The new clipboard now supports retrieving image and web page formatted content",
)
# Delay 5 seconds
pbottleRPA.sleep(1000 * 5)

pbottleRPA.tts("Text has been copied to your clipboard. Try pasting it now!")
print("Text has been copied to your clipboard. Try pasting it now!")

pbottleRPA.paste("PBottle RPA Official website: https://officetool.online/pbottle-rpa/")


pbottleRPA.sleep(1000 * 5)  # Delay 5 seconds
text = pbottleRPA.getClipboard()
print("Current clipboard text:", text)


print("Preparing to end the script")
# Force exit the script
pbottleRPA.exit()
