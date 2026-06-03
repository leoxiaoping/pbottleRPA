/**
 * Pbottle RPA Demo Script
 * For detailed API documentation, please refer to the Process Development Documentation
 * Official website: https://officetool.online/pbottle-rpa/
 * Process Development Documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Function Description: This script demonstrates clipboard operations in RPA, including copying text, 
 * getting clipboard content, and copying files. Through this example, you can learn how to use 
 * the clipboard for data transfer in automation processes.
 */

const pbottleRPA = require('./pbottleRPA')     // Import Pbottle RPA core library to access RPA functionality

console.log("=== Clipboard Test ===");                  // Output test title to console
console.log(Date());                          // Output current date and time to console

pbottleRPA.tts('Computer Clipboard Demonstration')               // Use text-to-speech to announce current demo content
// Display system message box to inform users that the new clipboard supports images and web format content
pbottleRPA.showMsg('Super Clipboard', 'The new clipboard now supports retrieving images and web format content')
console.log('✅ Super Clipboard', 'The new clipboard now supports retrieving images and web format content') // Output same information to console
pbottleRPA.wait(5)                            // Wait 5 seconds to give users time to read the information

pbottleRPA.tts('Text has been copied, try pasting it somewhere') // Voice announcement that text has been copied
console.log('Text has been copied, try pasting it somewhere');   // Output same information to console

// Copy specified text content to system clipboard
pbottleRPA.paste("Pbottle RPA Official website: https://officetool.online/pbottle-rpa/")

pbottleRPA.wait(10)                           // Wait 10 seconds to give users time to test pasting

// Get current text content from system clipboard
let text = pbottleRPA.getClipboard();
console.log("Current clipboard text:", text);        // Output retrieved clipboard text content to console

console.log("File copy simulation operation:");               // Output upcoming operation description to console
// Copy file to system clipboard (simulate file copy operation)
pbottleRPA.copyFile(__dirname + '/input/RPAlogo128.png') // Copy specified image file to clipboard
let filepath = pbottleRPA.getClipboard();     // Get file path information from clipboard
console.log("Clipboard file path:", filepath);       // Output retrieved file path to console

pbottleRPA.tts('File has been copied, try pasting it on your desktop') // Voice announcement that file has been copied
console.log('File has been copied, try pasting it on your desktop');   // Output same information to console