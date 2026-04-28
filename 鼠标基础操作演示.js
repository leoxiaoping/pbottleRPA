/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: This script demonstrates various mouse operations in RPA, including moving, clicking,
 * double-clicking, scrolling, and dragging. Through these examples, you can learn how
 * to precisely control mouse behavior in an RPA workflow.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionalities

console.log("=== Mouse Basic Operations Test ==="); // Output test title to the console
console.log(Date());                              // Output the current date and time to the console
pbottleRPA.setDefaultDelay(0);                    // Set the default operation delay to 0 to manage all delays manually

pbottleRPA.tts('Starting the PBottle RPA mouse operations demo script. ... Shortcut: Ctrl+Shift+Q to manually exit') // Announce the start via text-to-speech
pbottleRPA.wait(12)                               // Wait 12 seconds to give the user time to prepare

let resolution = pbottleRPA.getResolution()       // Get the current screen resolution
console.log('Current screen resolution:', resolution) // Output the screen resolution to the console
pbottleRPA.keyTap('windows+d')                    // Simulate the Win+D shortcut to show the desktop

pbottleRPA.tts(`Current screen resolution: ${resolution.w} by ${resolution.h}`) // Announce the resolution via speech
pbottleRPA.wait(6)                                // Wait 6 seconds

pbottleRPA.tts('Moving the pointer to the center of the screen')   // Announce the upcoming operation
pbottleRPA.log('Moving the pointer to the center of the screen')   // Record the operation in the log file
pbottleRPA.moveMouse(resolution.w / 2, resolution.h / 2)           // Move the mouse to the center of the screen
pbottleRPA.wait(3)                                // Wait 3 seconds to observe the effect

pbottleRPA.tts('Long-pressing the left button')   // Announce the upcoming operation
pbottleRPA.log('Long-pressing the left button')   // Record the operation in the log file
pbottleRPA.mouseClick('left', 1500);              // Long-press the left mouse button for 1500ms (1.5 seconds)
pbottleRPA.wait(2)                                // Wait 2 seconds

pbottleRPA.tts('Mouse double-click')              // Announce the upcoming operation
pbottleRPA.log('Mouse double-click')              // Record the operation in the log file
pbottleRPA.moveMouse(38, 38)                      // Move the mouse to the upper-left corner (38,38)
pbottleRPA.mouseDoubleClick()                     // Perform a mouse double-click
pbottleRPA.wait(3)                                // Wait 3 seconds

pbottleRPA.tts('Preparing to open a web page and scroll the mouse, starting in 5 seconds') // Announce the upcoming operation
pbottleRPA.wait(10)                               // Wait 10 seconds

pbottleRPA.openURL('https://rpa.pbottle.com?from=demo') // Open the PBottle RPA website with the default browser
pbottleRPA.wait(3)                                // Wait 3 seconds for the page to load
pbottleRPA.keyTap('f11')                          // Simulate the F11 key to enter full-screen mode
pbottleRPA.wait(1)                                // Wait 1 second

pbottleRPA.tts('Scrolling the mouse')             // Announce the upcoming operation
pbottleRPA.mouseWheel()                           // Scroll the mouse wheel down
pbottleRPA.wait(4)                                // Wait 4 seconds to observe the effect
pbottleRPA.tts('Scrolling the mouse in reverse')  // Announce the upcoming operation
pbottleRPA.mouseWheel(360)                        // Scroll the mouse wheel up by 360 units
pbottleRPA.wait(4)                                // Wait 4 seconds to observe the effect

pbottleRPA.tts('Right-click on the page')         // Announce the upcoming operation
pbottleRPA.log('Right-click on the page')         // Record the operation in the log file
pbottleRPA.moveMouse(200, 250)                    // Move the mouse to (200,250)
pbottleRPA.mouseClick('right')                    // Perform a right-click
pbottleRPA.wait(3)                                // Wait 3 seconds
pbottleRPA.moveMouse(150, 250)                    // Move the mouse to (150,250)
pbottleRPA.tts('Left-click')                      // Announce the upcoming operation
pbottleRPA.log('Left-click')                      // Record the operation in the log file
pbottleRPA.mouseClick()                           // Perform a left-click (default)
pbottleRPA.wait(3)                                // Wait 3 seconds

// Test mouse drag operations
pbottleRPA.tts('Drag or selection')               // Announce the upcoming operation
pbottleRPA.log('Drag or selection')               // Record the operation in the log file
pbottleRPA.wait(4)                                // Wait 4 seconds
pbottleRPA.moveMouse(resolution.w * 0.7, resolution.h * 0.5) // Move the mouse to the right-center area of the screen
pbottleRPA.wait(1)                                // Wait 1 second
pbottleRPA.mouseLeftDragTo(resolution.w * 0.3, resolution.h * 0.2) // Drag from the current position to the upper-left area

pbottleRPA.tts('Slow drag')                       // Announce the upcoming operation
pbottleRPA.log('Slow drag')                       // Record the operation in the log file
pbottleRPA.wait(4)                                // Wait 4 seconds
pbottleRPA.mouseClick()                           // Perform a mouse click
pbottleRPA.wait(1)                                // Wait 1 second
pbottleRPA.mouseKeyToggle('left', 'down')         // Press and hold the left mouse button
pbottleRPA.moveMouse(resolution.w * 0.7, resolution.h * 0.5, 3) // Move the mouse slowly to the target position (3 seconds)
pbottleRPA.mouseKeyToggle('left', 'up')           // Release the left mouse button

pbottleRPA.wait(5)

pbottleRPA.mouseClick()
pbottleRPA.keyTap('f11')
pbottleRPA.tts('Demo finished')
console.log("Preparing to end the script");
pbottleRPA.wait(3)
// Force exit
process.exit(1)
console.log("Already exited, this line is unreachable");