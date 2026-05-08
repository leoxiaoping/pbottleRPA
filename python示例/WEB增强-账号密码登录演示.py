"""
PBottle RPA Python version (Beta)
https://gitee.com/pbottle/pbottle-rpa
Example
"""

import pbottleRPA  # Import the PBottle RPA module
import time

print("=== Web Enhancement Plugin - Account Password Login Demo ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)

print("=== NOTE ===")
print("=== The PBottle RPA browser extension must be installed ===")
print("=== ===")


pbottleRPA.tts(
    "You must install the PBottle RPA browser enhancement extension. Click OK to continue."
)
pbottleRPA.showMsg("Tip:", "You must install the browser enhancement extension first.")
pbottleRPA.openURL("https://yun.pbottle.com/?from=rpademo")


ret = pbottleRPA.browserCMD.alert(
    "Greetings from PBottle RPA. Click OK to start. 20-second timeout."
)
print("Operation result:", ret)
if ret != "ok":
    print("PBottle RPA browser extension not detected.", ret)
    pbottleRPA.exit(1)

# Click login/register button
pbottleRPA.browserCMD.click("a[role='button']:contains(Login or Register)")
pbottleRPA.sleep(2000)

pbottleRPA.browserCMD.click("a[role='button']:contains(Login with account password)")
pbottleRPA.sleep(1000)


# Enter username and password
pbottleRPA.browserCMD.click("input[name='uname']")
pbottleRPA.browserCMD.val("input[name='uname']", "test")

pbottleRPA.browserCMD.click("input[name='pwd']")
pbottleRPA.browserCMD.val("input[name='pwd']", "123456")
pbottleRPA.sleep(1000)


# Login button
pbottleRPA.browserCMD.click("button:contains(Login)")
pbottleRPA.sleep(3000)

pbottleRPA.keyTap("enter")
pbottleRPA.tts("Demo finished.")
