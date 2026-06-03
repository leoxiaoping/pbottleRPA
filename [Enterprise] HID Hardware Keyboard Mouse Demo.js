/**
 * PBottle RPA demo, please refer to the *process development documentation* for API details
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates the enterprise version's HID hardware-level keyboard and mouse operations.
 * Through hardware-level input simulation, it can bypass certain software-level restrictions and achieve more stable automation.
 * Note: This feature is only available in the enterprise version and requires additional hardware peripherals.
 * 
 * HID notes:
 * ① This module is not a required module.
 * ② This module requires additional hardware peripherals; for purchase and installation, please consult PBottle RPA support.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core library of PBottle RPA to access RPA functionalities

// Check whether the enterprise version is activated
let bufferRS = pbottleRPA.bufferSet('pbottle');
// Check if it is the personal version (which does not support this feature)
if (bufferRS == '个人版不可用') {
    // Show a system message box to prompt the user
    pbottleRPA.showMsg('Personal version unavailable', 'Please activate the enterprise version first')
    // Use text-to-speech to announce the prompt
    pbottleRPA.tts('Personal version unavailable, please activate the enterprise version first')
    // Exit the script and output an error message
    pbottleRPA.exit('⚠ Personal version unavailable, please activate the enterprise version first')
}

console.log("=== HID Keyboard Simulation Test ===");                 // Output the test start message to the console
console.log(Date());                         // Output the current date and time to the console
// Show a system message box prompt indicating that hardware peripherals are required
pbottleRPA.showMsg('Hardware peripherals required', 'This test requires hardware peripherals')
// Use text-to-speech to announce the prompt
pbottleRPA.tts('Opening the keyboard test website; RPA hardware simulation needs to be enabled')
// Open the keyboard test website for demonstrating hardware-level input
pbottleRPA.openURL('https://www.keyboardtest.cn/')
pbottleRPA.wait(3)                           // Wait 3 seconds for the web page to load
// Use HID interface to simulate pressing F11 to enter full-screen mode
pbottleRPA.hid.keyTap('f11')

// Get the current screen resolution
let resolution = pbottleRPA.getResolution()
console.log('Current resolution:', resolution);        // Output the resolution information to the console
// Use HID interface to move the mouse to the center of the screen
pbottleRPA.hid.moveMouse(resolution.w / 2, resolution.h / 2)
// Use HID interface to perform a mouse click
pbottleRPA.hid.mouseClick();

// Use HID interface to control the mouse wheel
pbottleRPA.hid.mouseWheel(-2)                // Scroll down 2 notches
pbottleRPA.wait()                            // Wait for the default time
pbottleRPA.hid.mouseWheel(1)                 // Scroll up 1 notch
pbottleRPA.wait()                            // Wait for the default time
pbottleRPA.hid.mouseWheel()                  // Default scroll down

// Use HID interface to perform mouse clicks with different buttons
pbottleRPA.hid.mouseClick('middle');         // Middle button click
pbottleRPA.hid.mouseClick('left', 3000);     // Left button held for 3 seconds
pbottleRPA.hid.mouseClick('right');          // Right button click
pbottleRPA.wait()                            // Wait for the default time
// Move the mouse to a specified screen position
pbottleRPA.hid.moveMouse(resolution.w / 3, resolution.h / 2)
pbottleRPA.hid.mouseDoubleClick()            // Perform a mouse double-click
pbottleRPA.hid.mouseClick();                 // Perform a mouse click

// Key content demonstration — simulate pressing English letters and symbol keys one by one
let str = "abcdefghijklmnopqrstuvwxyz`1234567890-=[]\\;',./";
// Iterate over each character in the string and simulate a key press
for (let char of str) {
    console.log('Key:', char);              // Output the current key character to the console
    pbottleRPA.hid.keyTap(char)              // Use HID interface to simulate a key press
}

// Control key demonstration
pbottleRPA.hid.keyTap('up')                  // Press the Up arrow key
pbottleRPA.hid.keyTap('down')                // Press the Down arrow key
pbottleRPA.hid.keyTap('left')                // Press the Left arrow key
pbottleRPA.hid.keyTap('right')               // Press the Right arrow key
pbottleRPA.hid.keyTap('space')               // Press the Spacebar
pbottleRPA.hid.keyTap('page up')             // Press the Page Up key
pbottleRPA.hid.keyTap('page down')           // Press the Page Down key
pbottleRPA.hid.keyTap('end')                 // Press the End key
pbottleRPA.hid.keyTap('home')                // Press the Home key
pbottleRPA.hid.keyTap('tab')                 // Press the Tab key
pbottleRPA.hid.keyTap('shift')               // Press the Shift key
pbottleRPA.hid.keyTap('backspace')           // Press the Backspace key
pbottleRPA.hid.keyTap('enter')               // Press the Enter key

// Use HID interface to press F11 again to exit full-screen mode
pbottleRPA.hid.keyTap('f11')

pbottleRPA.wait(1)                           // Wait 1 second
// Use HID interface to simulate pressing Ctrl+Alt+Del (system-level operation)
pbottleRPA.hid.keyTap('ctrl + alt + del')

pbottleRPA.wait(1)                           // Wait 1 second
// Use HID interface to simulate pressing the Esc key
pbottleRPA.hid.keyTap('esc')
pbottleRPA.showMsg('Test complete', 'HID keyboard simulation test completed');