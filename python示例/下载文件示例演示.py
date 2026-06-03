"""
PBottle RPA demo – please refer to the *process documentation* for specific APIs.
Official website: https://officetool.online/pbottle-rpa/
Process documentation: https://officetool.online/pbottle-rpa/docs/

Feature description: This script demonstrates the file download function in RPA.
By automatically triggering a file download and monitoring its completion, it automates the entire download process.
"""

import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality
import os  # Import the OS module to get system information

# Get the system default download path (the Downloads folder under the user's home directory)
download_path = os.path.join(os.path.expanduser("~"), "Downloads")
# download_path = 'D:\\Users\\Leo\\Downloads'   # Optional: change to your own browser's default download path
# Output the download path to the log, reminding the user to adjust if necessary
pbottleRPA.log(
    "Default browser download path, adjust according to your situation:", download_path
)

# Open the WeChat official website (preparing to download the WeChat installer)
pbottleRPA.openURL("https://pc.weixin.qq.com/")
# Directly open the download link for the WeChat Windows client installer
pbottleRPA.openURL("https://dldir1v6.qq.com/weixin/Windows/WeChatSetup.exe")
# Simulate pressing the Enter key to confirm the download
pbottleRPA.keyTap("enter")

# Wait for the specified file to finish downloading, with a timeout of 120 seconds
# During the wait, it will repeatedly output "Downloading..." prompts
pbottleRPA.waitFile(
    download_path, "WeChatSetup.exe", lambda: pbottleRPA.log("Downloading..."), 120
)
# After the file download is complete, output a success message to the log
pbottleRPA.log("File downloaded successfully")
# Show a system message box to inform the user that the download is complete
pbottleRPA.showMsg("Download monitoring complete", "File downloaded successfully")
