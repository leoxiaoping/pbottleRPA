/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: This script demonstrates batch web scraping using the Web Enhanced functions.
 * The PBottle RPA browser extension is required to operate web elements and automate data extraction.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log(pbottleRPA.getTime());              // Output the current formatted time to the console

console.log("=== NOTE ===");
console.log("=== The PBottle RPA browser extension must be installed ===");
console.log("=== ===");

// Use text-to-speech to inform the user that the browser extension is required
pbottleRPA.tts('You must install the PBottle RPA browser enhancement extension. Starting web scraping in 5 seconds.')
// Show a system message box as an additional reminder
pbottleRPA.showMsg('Tip:', 'You must install the browser enhancement extension first.')

// Wait 5 seconds to give the user time to prepare
pbottleRPA.wait(5)

// Open the PBottle RPA official website for demonstrating data scraping
pbottleRPA.openURL('https://rpa.pbottle.com/')
pbottleRPA.browserCMD_waitPageReady('https://rpa.pbottle.com/');  // Wait for the page to finish loading

// Check whether the page opened successfully by counting elements containing "PBottle RPA"
let n_rpa = pbottleRPA.browserCMD_count('span:contains(PBottle RPA)')
console.log('Number of elements containing "PBottle RPA":', n_rpa);
// Simulate scrolling the page to load more content
pbottleRPA.keyTap('page down')               // Scroll down one page
pbottleRPA.keyTap('page down')               // Scroll down again
pbottleRPA.keyTap('page down')               // Scroll down a third time

// Start extracting data from the web page
// Get the text content of all <a> tags with the class 'list-group-item' using a CSS selector
let rs = pbottleRPA.browserCMD_text('a.list-group-item')
// Check for a timeout (which indicates the extension is not installed or a network issue)
if (rs == '20s timeout') {
    // Show an error message and exit the script
    pbottleRPA.showMsg('Error:', 'The browser enhancement extension must be installed and an internet connection is required.')
    pbottleRPA.exit()
}
// Parse the obtained JSON string into a JavaScript array of objects
datas = JSON.parse(rs)

console.log('Amount of scraped data:', datas.length);
// Use text-to-speech to announce the amount of scraped data
pbottleRPA.tts('Scraped ' + datas.length + ' items. Please check the log.')
pbottleRPA.wait(4)                           // Wait 4 seconds

console.log('=====');                        // Output a separator
console.log('Data list:');                   // Output a hint
// Iterate through the data array, process and output each item
datas.forEach(element => {
    // Trim whitespace and remove line breaks
    element = element.trim().replace(/[\r\n]/g, '');
    console.log(element);                    // Output the processed data
});

// Get the href attribute values (link addresses) of the web elements
rs = pbottleRPA.browserCMD_attr('a.list-group-item', 'href')
// Parse the obtained JSON string into an array of links
datas = JSON.parse(rs)
console.log('====');                         // Output a separator
console.log('Link list:');                   // Output a hint
// Iterate through the links array and output each link
datas.forEach(element => {
    console.log(element);                    // Output the link address
});

// Use text-to-speech to announce the end of the demo
pbottleRPA.tts('Demo finished.')

pbottleRPA.browserCMD.alert('Demo finished. Data has been output to the log in batches. Please check the console.');
