/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates the screen object contour finding function in RPA.
 * Through this example, you can learn how to use AI visual recognition technology to find object contours on the screen.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log("=== Test ===");                  // Output test title to the console
console.log('Screen resolution:', pbottleRPA.getResolution()) // Output the current screen resolution

pbottleRPA.wait(3)                            // Wait 3 seconds

let start = Date.now()                        // Record the start time to calculate processing duration

// Use the findContours function to find object contours in a specified area of the screen
// Parameter 1: area width (2000 pixels)
// Parameter 2: area height (500 pixels)
// Parameter 3: minimum contour area threshold (200 pixels)
console.log('Screen object contour finding result:', pbottleRPA.findContours(2000, 500, 200))

let end = Date.now();                         // Record the end time
console.log('Search time: (seconds)', (end - start) / 1000); // Calculate and output the search duration (converted to seconds)

pbottleRPA.tts("The result in JSON format has been output to the running log")  // Use text-to-speech to announce the result has been output
pbottleRPA.wait(3);                           // Wait 3 seconds

pbottleRPA.tts("A debug reference image has been generated in the 'debug' folder under the RPA root directory") // Announce the debug image location via speech
pbottleRPA.wait(3);                           // Wait 3 seconds

console.log("Preparing to end the script");   // Output script ending message to the console
pbottleRPA.tts("Preparing to end the script"); // Announce script ending via text-to-speech

pbottleRPA.exit("End")                        // Exit the RPA script and output the end message