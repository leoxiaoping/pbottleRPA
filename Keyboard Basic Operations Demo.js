/**
 * Pbottle RPA Demo Script
 * For detailed API documentation, please refer to the Process Development Documentation
 * Official Website: https://rpa.pbottle.com/
 * Process Development Documentation: https://rpa.pbottle.com/docs/
 * 
 * Function Description: This script demonstrates various keyboard operations in RPA, including key presses, 
 * combination keys, page navigation, and more. Through these examples, you can learn how to precisely 
 * control keyboard behavior in RPA processes.
 */

const pbottleRPA = require('./pbottleRPA')    // Import Pbottle RPA core library to access RPA functionality
console.log("=== Keyboard Operations Test ===");          // Output test title to console
console.log(Date());                         // Output current date and time to console
pbottleRPA.setDefaultDelay(0);               // Set default operation delay to 0, manually manage all operation delays

pbottleRPA.tts('Starting Pbottle RPA keyboard operations demo script... Shortcut: Ctrl+Shift+Q to exit manually') // Use text-to-speech to announce start information
pbottleRPA.wait(12)                          // Wait 12 seconds to give users time to prepare

let resolution = pbottleRPA.getResolution()  // Get current computer screen resolution information
console.log('Current screen resolution:', resolution)  // Output screen resolution information to console
pbottleRPA.tts(`Current screen resolution: ${resolution.w} by ${resolution.h}`) // Voice announcement of current screen resolution
pbottleRPA.wait(6)                           // Wait 6 seconds

pbottleRPA.tts('Preparing to open webpage and use shortcut keys to enter fullscreen mode, starting in 5 seconds') // Voice announcement of upcoming operation
pbottleRPA.wait(10)                          // Wait 10 seconds

pbottleRPA.openURL('https://rpa.pbottle.com?from=demo') // Open Pbottle RPA official website using default browser
pbottleRPA.wait(3)                           // Wait 3 seconds for webpage to load
pbottleRPA.moveAndClick(50, 500)              // Move mouse to specified coordinates and click to ensure page gets focus
pbottleRPA.tts('Zooming page')                    // Voice announcement of upcoming operation

// Use combination keys to control page zoom
pbottleRPA.keyTap('ctrl + -')                // Simulate pressing Ctrl+- combination key to zoom out page
pbottleRPA.keyTap('ctrl + -')                // Zoom out page again
pbottleRPA.keyTap('ctrl + -')                // Zoom out page third time
pbottleRPA.keyTap('ctrl + =')                // Simulate pressing Ctrl+= combination key to zoom in page
pbottleRPA.keyTap('ctrl + =')                // Zoom in page again
pbottleRPA.keyTap('ctrl + =')                // Zoom in page third time

pbottleRPA.wait(1)                           // Wait 1 second
pbottleRPA.keyTap('f11')                     // Simulate pressing F11 key to enter browser fullscreen mode
pbottleRPA.wait(2)                           // Wait 2 seconds

pbottleRPA.tts('Scrolling through pages')                    // Voice announcement of upcoming operation

// Use Page Down key to scroll down and browse page content
pbottleRPA.keyTap('page down')               // Simulate pressing Page Down key to scroll down
pbottleRPA.wait()                            // Wait for default time (using default delay)
pbottleRPA.keyTap('page down')               // Scroll down again
pbottleRPA.wait()                            // Wait for default time
pbottleRPA.keyTap('page down')               // Scroll down third time
pbottleRPA.wait()                            // Wait for default time

pbottleRPA.tts('Scrolling back up')                    // Voice announcement of upcoming operation

// Use Page Up key to scroll back to the top of the page
pbottleRPA.keyTap('page up')                 // Simulate pressing Page Up key to scroll up
pbottleRPA.wait()                            // Wait for default time
pbottleRPA.keyTap('page up')                 // Scroll up again
pbottleRPA.wait()                            // Wait for default time
pbottleRPA.keyTap('page up')                 // Scroll up third time
pbottleRPA.wait(2)                           // Wait 2 seconds

pbottleRPA.tts('Please bookmark us, thank you very much')         // Voice announcement of upcoming operation
pbottleRPA.keyTap('ctrl + d')                // Simulate pressing Ctrl+D combination key to open browser bookmark dialog

pbottleRPA.wait(1)                           // Wait 1 second
pbottleRPA.keyTap('enter')                   // Simulate pressing Enter key to confirm bookmark operation
pbottleRPA.wait(2)                           // Wait 2 seconds

pbottleRPA.keyTap('f11')                     // Simulate pressing F11 key to exit browser fullscreen mode
pbottleRPA.tts('Demo completed')                    // Voice announcement that demo is complete
console.log("Preparing to end script");                 // Output script ending information to console

pbottleRPA.exit("Script ended", true)                   // Exit RPA script execution and output ending information