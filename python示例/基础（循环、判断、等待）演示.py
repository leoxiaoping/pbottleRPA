"""

PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example

"""

import pbottleRPA  # Import the PBottle RPA module
import random


# for loop – repeat an operation 10 times, opening a web page each time
for index in range(10):
    number = index + 1
    print("Operation #" + str(number))
    # Output to log, permanently saved in the log file
    pbottleRPA.openURL(
        "https://www.baidu.com/s?wd=" + str(number)
    )  # Action: open a URL with the default browser
    pbottleRPA.sleep(500)  # Wait 500 milliseconds


# Conditional judgment
number = random.random()  # Generate a random number between 0 and 1 for the condition
if number < 0.5:  # Check if the number is less than 0.5
    print("Less than 0.5.", number)
    pbottleRPA.tts("Less than 0.5")
else:
    print("0.5 or greater.", number)
    pbottleRPA.tts("0.5 or greater")


pbottleRPA.wait(1)

# Text-to-speech
pbottleRPA.tts("Flow completed! ~")
pbottleRPA.showMsg("PBottle RPA Tip", "Flow completed! ~")
