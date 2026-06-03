"""
PBottle RPA demo – please refer to the *process documentation* for specific APIs.
Official website: https://officetool.online/pbottle-rpa/
Process documentation: https://officetool.online/pbottle-rpa/docs/

Feature description: This script demonstrates the image similarity detection feature of RPA.
Through this example, you can learn how to compare the similarity of two images,
which is very useful in automated testing and image verification scenarios.
"""

import os
import json
import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

pbottleRPA.log("=== Image Similarity Detection ===")  # Output test title to the console
pbottleRPA.log(pbottleRPA.getTime())  # Output the current date and time to the console
pbottleRPA.setDefaultDelay(0)
# Set the default operation delay to 0 to manage all delays manually

dir_path = (
    SCRIPT_DIR + "/input/"
)  # Define the directory path where the image files are located
path1 = dir_path + "RPAlogo128.png"  # Define the full path of the first image
path2 = (
    dir_path + "RPAlogo128.png"
)  # Define the full path of the second image (same image in this case)

# Use the imgSimilar function to compare the similarity of two images
rs = pbottleRPA.imgSimilar(
    path1, path2
)  # Call the image similarity detection API, passing in the paths of both images
pbottleRPA.log("Image similarity detection result:", rs)
# Output the image similarity result to the console; a value closer to 1 indicates higher similarity

pbottleRPA.showMsg("Image similarity detection result:", json.dumps(rs))
# Show a system message box with the result
