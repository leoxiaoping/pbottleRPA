"""

PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example

"""

import pbottleRPA  # Import the PBottle RPA module
import time


pbottleRPA.delaySet(__file__)  # Chain to itself (relaunch itself after finishing)

pbottleRPA.log('Waiting for 3 seconds')
pbottleRPA.wait(3)
pbottleRPA.log('Done')