/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: This script demonstrates the screenshot capabilities of RPA,
 * including full‑screen and region‑based screenshots.
 * Through these examples, you can learn how to capture screen images and save them in an RPA workflow.
 */

const pbottleRPA = require('./pbottleRPA')             // Import the core PBottle RPA library to access RPA functionalities

pbottleRPA.log(pbottleRPA.getTime())                    // Write the current formatted time to the log file
pbottleRPA.tts('Starting the PBottle RPA screenshot demo script. ... Shortcut: Ctrl+Shift+Q to manually exit') // Announce the start via text-to-speech
pbottleRPA.wait(12)                                     // Wait 12 seconds to give the user time to prepare

let resolution = pbottleRPA.getResolution()             // Get the current screen resolution (width w and height h)
pbottleRPA.log('Current screen resolution:', resolution) // Output the screen resolution to the log file
pbottleRPA.tts(`Current screen resolution: ${resolution.w} by ${resolution.h}`) // Announce the resolution via speech
pbottleRPA.wait(6)                                      // Wait 6 seconds

pbottleRPA.tts('Taking screenshot (full screen)...')    // Announce the upcoming operation
pbottleRPA.wait(3)                                      // Wait 3 seconds

// Take a full‑screen screenshot and save it to a specific file
pbottleRPA.screenShot('./PBottleRPA_screenshot_test.png') // Capture the entire screen and save it as a PNG file
pbottleRPA.tts('Image saved to: current directory')     // Announce the save location
pbottleRPA.log('Image saved to: current directory')     // Write the save location to the log file
pbottleRPA.wait(3)                                      // Wait 3 seconds

// Take a full‑screen screenshot without specifying a path (uses the default location)
pbottleRPA.screenShot();                                // Capture the entire screen using the system default save path

pbottleRPA.tts('Taking screenshot (region)...')         // Announce the upcoming operation
// Take a region screenshot (specify the screen region)
let result = pbottleRPA.screenShot('', resolution.w / 4, resolution.h / 4, resolution.w / 2, resolution.h / 2) // Capture a region: save path (empty = default), start X, start Y, width, height
pbottleRPA.log('Screenshot result:', result)            // Output the screenshot operation result to the log file
pbottleRPA.wait(3)                                      // Wait 3 seconds

pbottleRPA.tts('Image saved to: My Pictures folder')    // Announce the save location
pbottleRPA.log('Image saved to: My Pictures folder')    // Write the save location to the log file
pbottleRPA.wait(5)                                      // Wait 5 seconds

pbottleRPA.tts('Demo finished.')                        // Announce the end of the demo
pbottleRPA.log("Preparing to end the script.");         // Log that the script is about to finish