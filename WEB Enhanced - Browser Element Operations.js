/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates various methods for operating browser elements 
 * using the Web Enhanced features, including URL navigation, text retrieval, cookie operations, 
 * CSS style modification, element value setting, click operations, etc.
 * The PBottle RPA browser extension must be installed to use these features.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log(Date());                           // Output the current date and time to the console

console.log("=== NOTE ===");
console.log("=== The PBottle RPA browser extension must be installed ===");
console.log("=== ===");

// Use text-to-speech to inform the user that the browser extension is required
pbottleRPA.tts('You must install the PBottle RPA browser enhancement extension. Click OK to continue.')
// Show a system message box as an additional reminder
pbottleRPA.showMsg('Tip:', 'You must install the browser enhancement extension first.')
// Open Baidu for demonstrating browser operations
pbottleRPA.openURL('https://www.baidu.com/')

// Variable to store the result of browser commands
let ret = ""
// Use a browser command to show an alert and wait for manual confirmation (20-second timeout)
ret = pbottleRPA.browserCMD_alert('Greetings from PBottle RPA. Click OK to start. 20-second timeout.')
console.log('Operation result (alert):', ret);   // Output the operation result to the console

// Check whether the browser extension is working properly
if (ret !== 'ok') {
    console.log('PBottle RPA browser extension not detected.', ret); // Output an error if the extension is not detected
    process.exit(1)                              // Exit the script
}

pbottleRPA.wait(1)                                // Wait 1 second
pbottleRPA.tts("Navigating to a new URL...")      // Announce the upcoming operation via TTS
// Use a browser command to navigate to a new URL
pbottleRPA.browserCMD_url('https://www.baidu.com/?from=pbottleRPA')
pbottleRPA.wait(2)                                // Wait 2 seconds

// Retrieve the text content of a specific element (page title)
ret = pbottleRPA.browserCMD_text('span.title-content-title')
console.log('Operation result [multiple elements]:', ret); // Output the retrieved text content

// Cookie operation demonstration
ret = pbottleRPA.browserCMD_cookie('BAIDUID')      // Get the value of a cookie named 'BAIDUID'
console.log('Operation result (cookie get):', ret); // Output the retrieved cookie value
// Set a cookie
ret = pbottleRPA.browserCMD_cookie('pbottleID', "good", 3) 
console.log('Operation result (cookie set):', ret); // Output the result of setting the cookie

// CSS style operation demonstration – changing the background color
pbottleRPA.tts('Change background color')           // Announce the upcoming operation
// Set the background color of the body element to blue
ret = pbottleRPA.browserCMD_css('body', "background-color", 'blue')
console.log('Operation result (css set):', ret);    // Output the result
// Get the background color value of the body element
ret = pbottleRPA.browserCMD_css('body', "background-color")
console.log('Operation result [color value]:', ret); // Output the retrieved color value
// Reset the background color of the body element to white
ret = pbottleRPA.browserCMD_css('body', "background-color", 'white')
console.log('Operation result (css set):', ret);    // Output the result

// Text content operation demonstration
ret = pbottleRPA.browserCMD_text('title')            // Get the page title text
console.log('Operation result (text get):', ret);    // Output the retrieved title text
pbottleRPA.tts('Getting title')                      // Announce the action using TTS
pbottleRPA.wait(3)                                   // Wait 3 seconds

// Demonstrating setting the page title
pbottleRPA.tts('Setting page title')                  // Announce the upcoming operation
// Set the new page title with a prefix "[PBottle RPA]-"
ret = pbottleRPA.browserCMD_text('title', '[PBottle RPA]-' + ret)
console.log('Operation result (text set):', ret);     // Output the result
ret = pbottleRPA.browserCMD_text('title')             // Retrieve the current page title again
console.log('Current page title:', ret);               // Output the current page title
pbottleRPA.wait(3)                                    // Wait 3 seconds

// Search operation demonstration
pbottleRPA.tts('Entering search term and clicking the search button') // Announce the operation
// Enter the search term "PBottle RPA Official Website" into the search box
pbottleRPA.paste('PBottle RPA Official Website') 
console.log('Paste operation completed.')

// Click the search button
ret = pbottleRPA.browserCMD_click('#su')              // Click Baidu's search button
console.log('Operation result (click):', ret);        // Output the click result
pbottleRPA.wait(3)                                    // Wait 3 seconds

// Demonstrate retrieving the current URL
pbottleRPA.tts('Getting current URL')                 // Announce the operation
ret = pbottleRPA.browserCMD_url()                     // Get the current page URL
console.log('Current URL:', ret);                      // Output the current URL
pbottleRPA.wait(2)                                    // Wait 2 seconds

// Ad removal demonstration
pbottleRPA.tts('Start removing ads')                  // Announce the operation
// Loop to remove ad elements (only one iteration in this example)
for (let index = 0; index < 1; index++) {
    // Remove the specified ad element
    ret = pbottleRPA.browserCMD_remove('#content_left div:first')
    console.log('Operation result (remove):', ret);    // Output the remove operation result
    pbottleRPA.wait(3)                                 // Wait 3 seconds
}

// Demonstrate opening a website link
pbottleRPA.tts('Open website')                         // Announce the operation
// Click the first search result link containing "PBottle RPA"
pbottleRPA.browserCMD_click('div#content_left a:contains(PBottle RPA)')
pbottleRPA.wait(3)                                     // Wait 3 seconds

// Demonstrate retrieving the website logo path
pbottleRPA.tts('Reading logo path, displaying in log') // Announce the operation
// Get the src attribute of the first img element (the image URL)
ret = pbottleRPA.browserCMD_attr('img:first', 'src')
console.log('Website logo image URL:', ret);           // Output the logo image URL
pbottleRPA.wait()                                      // Wait for the default delay

// Demonstrate getting the position of an element
let ret2 = pbottleRPA.browserCMD_offset('div:contains(PBottle RPA):first')
console.log('Position of search result:', ret2);       // Output the element position
pbottleRPA.wait()                                      // Wait for the default delay

// Demo completion notification
pbottleRPA.tts('Demo completed, ready to exit.')       // Announce that the demo is finished
console.log("Preparing to end the script.");            // Output an end-of-script message to the console
// Show an alert inside the browser indicating that the demo has ended
ret = pbottleRPA.browserCMD_alert('Demo finished.')