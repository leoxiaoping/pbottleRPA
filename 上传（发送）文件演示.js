/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: This script demonstrates the file upload (send) function in RPA.
 * It requires the browser enhancement extension to manipulate web elements for an automated file upload workflow.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to gain access to RPA functionality

// Announce the start via speech
pbottleRPA.tts('File upload demonstration')             // Use text-to-speech to announce the demo start
// Show a system message box to remind the user that the browser extension is needed
pbottleRPA.showMsg('This demo requires the browser enhancement extension', 'File upload demonstration')
pbottleRPA.wait(2)                            // Wait 2 seconds

console.log('Starting demonstration');        // Output the start of the demo to the console

// Open Sogou image search for the file upload demo
pbottleRPA.openURL('https://pic.sogou.com/')
pbottleRPA.wait()                             // Wait for the page to load

// Use the browser enhancement extension to click the upload icon element
// Match the span element whose class starts with "img-upload-icon_" via CSS selector
pbottleRPA.browserCMD_click('#cameraIco')
pbottleRPA.wait(2)

// Find the text "Local upload" on the page
let pos = pbottleRPA.findText('Local upload')

if (pos === false) {
    pbottleRPA.exit('Upload button not found');
}
// Move the mouse to the found position and click to open the file selection dialog
pbottleRPA.moveAndClick(pos.x, pos.y)

pbottleRPA.wait(2)                             // Wait for the dialog to open

// Copy the file to be uploaded to the clipboard
pbottleRPA.copyText(pbottleRPA.path.resolve('./input/RPAlogo128.png'))
pbottleRPA.keyTap('ctrl+v')                   // Press Ctrl+V to paste the file path

pbottleRPA.wait()                             // Wait for the file to be pasted
pbottleRPA.keyTap('enter')                    // Press Enter to confirm the file selection

// Confirm the upload
pbottleRPA.keyTap('enter')                    // Press Enter again to start the upload