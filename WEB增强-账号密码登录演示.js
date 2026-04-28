/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: This script demonstrates automatic website login using Web Enhanced functions.
 * The PBottle RPA browser extension is required to operate web elements and automate the complete login flow.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log(Date());                            // Output the current date and time to the console

console.log("=== NOTE ===");
console.log("=== The PBottle RPA browser extension must be installed ===");
console.log("=== ===");

// Use text-to-speech to inform the user that the browser extension is required
pbottleRPA.tts('You must install the PBottle RPA browser enhancement extension. Click OK to continue.')
// Show a system message box as an additional reminder
pbottleRPA.showMsg('Tip:', 'You must install the browser enhancement extension first.')
// Open the target URL for the login demonstration
pbottleRPA.openURL('https://yun.pbottle.com/?from=rpademo')

// Use a browser command to show an alert and wait for manual confirmation (20-second timeout)
let ret = pbottleRPA.browserCMD_alert('Greetings from PBottle RPA. Click OK to start. 20-second timeout.')
console.log('Operation result:', ret);          // Output the operation result to the console

// Check whether the browser extension is working properly
if (ret !== 'ok') {
    console.log('PBottle RPA browser extension not detected.', ret);
    process.exit(1)                             // Exit the script
}

// Click the "Login or Register" link on the page
pbottleRPA.browserCMD_click(`a[role='button']:contains(Login or Register)`)
pbottleRPA.wait(2)                              // Wait 2 seconds

// Click the "Login" button
pbottleRPA.browserCMD_click(`a[role='button']:contains(Login)`)
pbottleRPA.wait()                               // Wait for the default delay

// Enter username and password
// Click the username input field
pbottleRPA.browserCMD_click(`input[name='uname']`)
// Enter the username 'test' into the username field
pbottleRPA.browserCMD_val(`input[name='uname']`, 'test')

// Click the password input field
pbottleRPA.browserCMD_click(`input[name='pwd']`)
// Enter the password '123456' into the password field
pbottleRPA.browserCMD_val(`input[name='pwd']`, '123456')
pbottleRPA.wait()

// Disable the login button to test property setting
pbottleRPA.browserCMD_prop(`button:contains(Login)`, 'disabled', true);
pbottleRPA.wait()

// Re-enable the login button to ensure it is clickable
pbottleRPA.browserCMD_prop(`button:contains(Login)`, 'disabled', false);

// Click the login button
pbottleRPA.browserCMD_click(`button:contains(Login)`)
pbottleRPA.wait(3)                              // Wait 3 seconds

// Simulate pressing the Enter key to confirm login
pbottleRPA.keyTap('enter')
// Use text-to-speech to announce the end of the demo
pbottleRPA.tts('Demo finished.')