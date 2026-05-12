"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module

asks = [
    "Why did Lu Xun hit Zhou Shuren?",
    "Please compose a poem for me",
    "Who are you?",
]

for index, ask in enumerate(asks):

    print(f"Question {index+1}:", ask)
    pbottleRPA.tts(ask)

    rs = pbottleRPA.cloud.GPT(ask)
    pbottleRPA.log("Cloud AI generated answer:", rs["content"])
    pbottleRPA.log("------------")
    pbottleRPA.log()


# end
