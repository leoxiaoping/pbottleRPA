"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module

pbottleRPA.openURL("https://www.baidu.com/")  # Open Baidu with the browser
pbottleRPA.paste("PBottle RPA official website")  # Enter the search term
pbottleRPA.keyTap("enter")  # Confirm the search
