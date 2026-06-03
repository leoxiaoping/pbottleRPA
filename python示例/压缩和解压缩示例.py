"""
PBottle RPA demo – please refer to the *process documentation* for specific APIs.
Official website: https://officetool.online/pbottle-rpa/
Process documentation: https://officetool.online/pbottle-rpa/docs/

Feature description: This script demonstrates the compression and decompression features of RPA.
Through this example, you can learn how to handle file compression and extraction in an automation workflow.
"""

import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality
import os  # Import the Python standard library os module to check file existence and paths

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

pbottleRPA.log(
    "Compression test"
)  # Output the current operation description to the log

# Use the zipDir function to compress a specified directory into a ZIP file
# Param 1: source directory path to compress (the input directory)
# Param 2: path and name of the resulting ZIP file
pbottleRPA.zipDir(current_dir + "/input", current_dir + "/target_archive.zip")
pbottleRPA.wait(2)  # Wait 2 seconds to ensure the compression completes

pbottleRPA.log("Checking compression result")
# Output info about checking the compression result to the console

# Check if the compressed ZIP file exists
if not os.path.exists(current_dir + "/target_archive.zip"):
    pbottleRPA.exit(
        "Not detected, exiting! ~"
    )  # If the file does not exist, exit the script with a message

pbottleRPA.log("Decompression test")  # Output decompression test info to the console

# Use the unZip function to extract a ZIP file to a specified directory
# Param 1: path of the ZIP file to extract
# Param 2: target directory for extraction
pbottleRPA.unZip(current_dir + "/target_archive.zip", current_dir + "/extracted/")

pbottleRPA.log("Compression test complete: opening the directory")
# Output test completion message to the console

# Open the directory of the current script so the user can check the compression and extraction results
pbottleRPA.openDir(current_dir)
