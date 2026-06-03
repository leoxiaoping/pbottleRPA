/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates basic file operations in RPA, including opening a folder,
 * opening a file, copying a file, and deleting a file. Through this example, you can learn how to
 * perform common file management tasks in an automation workflow.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality
const fs = require('fs')                      // Import the Node.js file system module for file operations

pbottleRPA.tts('Opening folder')              // Announce the upcoming operation via text-to-speech
console.log('Opening folder');                // Output the same message to the console
pbottleRPA.wait(3)                            // Wait 3 seconds

console.log('./input/');                      // Output the folder path to be opened to the console
pbottleRPA.openDir('./input/')                // Open the specified folder using RPA
pbottleRPA.wait(2)                            // Wait 2 seconds to observe the effect

pbottleRPA.tts('Opening image')               // Announce the upcoming operation via text-to-speech
console.log('Opening image');                 // Output the same message to the console

// Use RPA to open the specified image file (with the system's default image viewer)
pbottleRPA.openfile('./input/RPAlogo128.png') 
pbottleRPA.wait(2)                            // Wait 2 seconds to observe the effect

pbottleRPA.tts('Closing')                     // Announce the upcoming operation via text-to-speech
pbottleRPA.keyTap('alt+f4')                   // Simulate Alt+F4 to close the current window
pbottleRPA.wait()                             // Wait for the default delay

pbottleRPA.tts('Copying file')                // Announce the upcoming operation via text-to-speech
console.log('Copying file')                   // Output the same message to the console

// Use the Node.js file system API to copy a file (from source to a new destination)
fs.copyFileSync('./input/RPAlogo128.png', './input/RPAlogo128-copy.png')
pbottleRPA.wait(3)                            // Wait 3 seconds

pbottleRPA.tts('Deleting file')               // Announce the upcoming operation via text-to-speech
console.log('Deleting file')                  // Output the same message to the console

// Use the Node.js file system API to delete the specified file
fs.unlinkSync('./input/RPAlogo128-copy.png') 

pbottleRPA.tts('Demo finished')               // Announce the end of the demo via text-to-speech
console.log('Demo finished')                  // Output the same message to the console

// Show a system message box indicating the demo is over, and suggest checking the log
pbottleRPA.showMsg('Demo finished', 'Please check the running log')