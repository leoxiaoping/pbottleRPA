"""
PBottle RPA demo. Please refer to the *process documentation* for specific APIs.
Official website: https://rpa.pbottle.com/
Process documentation: https://rpa.pbottle.com/docs/

Feature description: This script demonstrates the GPT image analysis feature in RPA, enabling you to ask the cloud AI questions about image content.
Through this example, you can learn how to combine AI capabilities to analyze and understand image content.
"""

import time
import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality

# Start RPA operations

ask = "Describe what is in the image?"  # Define the question to ask the AI
print(
    ask, "./input/RPAlogo128.png"
)  # Output the question and the image path to the console

start = time.time()  # Record the start time to calculate processing duration

pbottleRPA.log("Cloud AI generated answer:")  # Output a prompt to the log file
# Call the cloud GPT image analysis API, passing in the question and image path, and output the result content
print(pbottleRPA.cloud.GPTV(ask, "./input/RPAlogo128.png")["content"])
print(
    "Image analysis time: (milliseconds)", (time.time() - start) * 1000
)  # Calculate and output the image analysis time (milliseconds)
