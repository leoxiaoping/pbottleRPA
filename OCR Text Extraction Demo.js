/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates the OCR text recognition and search features of RPA.
 * Through these examples, you can learn how to use AI technology to recognize text on the screen and locate specific content.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log("=== OCR Recognition Test ===");    // Output test title to the console
console.log('Screen resolution:', pbottleRPA.getResolution()) // Output the current screen resolution to the console

pbottleRPA.tts('Recognizing text in the top‑left area of your screen') // Announce the upcoming operation via text-to-speech
pbottleRPA.wait(5)                             // Wait 5 seconds

let start = Date.now()                         // Record the start time of OCR recognition (to calculate elapsed time)

console.log('Screen OCR result:', pbottleRPA.aiOcr('screen', 10, 10, 500, 500)) // Perform OCR on the top‑left area of the screen (10,10,500,500) and output the result
let end = Date.now();                          // Record the end time of OCR recognition
console.log('OCR time: (seconds)', (end - start) / 1000); // Calculate and output the OCR duration in seconds

pbottleRPA.tts("The result in JSON format has been output to the running log") // Announce that the OCR result has been output
pbottleRPA.wait(5);                            // Wait 5 seconds


console.log("Searching for and clicking WeChat") // Output the operation info to the console
pbottleRPA.tts("Searching for and clicking WeChat") // Announce the upcoming operation

let position = pbottleRPA.findText('WeChat', 100, 100, 500, 1080) // Search for the text "WeChat" within the screen area, returning the position
console.log('Text search result:', position);  // Output the found text position to the console


if (position) {                                // If the specified text is found
    pbottleRPA.moveAndClick(position.x, position.y) // Move the mouse to the text position and click
} else {                                       // If the specified text is not found
    console.log("Text 'WeChat' not found in the specified area."); // Output a hint that the text was not found
}


pbottleRPA.wait(2)


pbottleRPA.openURL("https://rpa.pbottle.com/")
console.log("Waiting for text");               // Output a message indicating the script is waiting for text
pbottleRPA.tts("Waiting for text");            // Announce via TTS that the script is waiting for text

position = pbottleRPA.waitText('Professional RPA Software', 300, 500)  // Wait for the text to appear
console.log(position);
pbottleRPA.moveMouse(position.x, position.y) // Move the mouse to the text position