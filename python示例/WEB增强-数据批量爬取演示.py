"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import time
import json

print("=== Web Enhancement Plugin - Browser Data Batch Scraping Demo ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)

print("=== NOTE ===")
print("=== The PBottle RPA browser extension must be installed ===")
print("=== ===")

pbottleRPA.showMsg("Tip:", "You must install the browser enhancement extension first.")

# Open the web page to scrape data from
pbottleRPA.sleep(5 * 1000)
pbottleRPA.openURL("https://rpa.pbottle.com/")
pbottleRPA.sleep(5 * 1000)
pbottleRPA.keyTap("page down")
pbottleRPA.keyTap("page down")
pbottleRPA.keyTap("page down")


# Start scraping data from the page
rs = pbottleRPA.browserCMD.text("a.list-group-item")
if rs == "20s timeout":
    pbottleRPA.showMsg(
        "Error:",
        "You must install the browser enhancement extension and have an internet connection.",
    )
    pbottleRPA.exit()

datas = json.loads(rs)

print("Amount of scraped data:", len(datas))
pbottleRPA.tts("Scraped " + str(len(datas)) + " items. Please check the log.")
pbottleRPA.sleep(1000 * 4)

print("Data list:")
for element in datas:
    element = element.strip().replace("\r", "").replace("\n", "")
    print(element)


pbottleRPA.tts("Demo finished.")
