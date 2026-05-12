"""
PBottle RPA demo. Please refer to the *process documentation* for specific APIs.
Official website: https://rpa.pbottle.com/
Process documentation: https://rpa.pbottle.com/docs/

Feature description: This script demonstrates the screen object contour finding function in RPA.
Through this example, you can learn how to use AI visual recognition technology to find object contours on the screen.
"""

import time
import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality

pbottleRPA.log("=== Test ===")
# Output test title to the console
pbottleRPA.log(
    "Screen resolution:", pbottleRPA.getResolution()
)  # Output current screen resolution

pbottleRPA.wait(3)  # Wait 3 seconds

start = time.time()  # Record the start time to calculate processing duration

# Use findContours to find object contours within a specified area of the screen
# Param 1: area width (2000 pixels)
# Param 2: area height (500 pixels)
# Param 3: minimum contour area threshold (200 pixels)
pbottleRPA.log(
    "Screen object contour finding result:", pbottleRPA.findContours(2000, 500, 200)
)

end = time.time()  # Record the end time
pbottleRPA.log(
    "Search time: (seconds)", (end - start) / 1000
)  # Calculate and output the search duration (converted to seconds)

pbottleRPA.tts(
    "The result in JSON format has been output to the running log"
)  # Use TTS to announce that the result has been output
pbottleRPA.wait(3)
# Wait 3 seconds

pbottleRPA.tts(
    "A debug reference image has been generated in the 'debug' folder under the RPA root directory"
)  # Announce the debug image location
pbottleRPA.wait(3)
# Wait 3 seconds

pbottleRPA.log("Preparing to end the script")
# Output a message to the console that the script is about to end
pbottleRPA.tts("Preparing to end the script")
# Announce via TTS that the script is about to end

pbottleRPA.exit("End")  # Exit the RPA script and output the end message
