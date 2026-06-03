/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates common utility functions (utils) in RPA.
 * Through this example, you can learn how to use various utility functions provided by pbottleRPA.utils.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log('Common utilities: pbottleRPA.utils');

// pbottleRPA.utils

// TTS demonstration
pbottleRPA.tts('Common utility (utils) demonstration')         // Use text-to-speech to announce the start of the demo
// Show a system message box to prompt the user
pbottleRPA.showMsg('PBottle RPA tip', 'Common utility (utils) demonstration')
pbottleRPA.wait(2)                            // Wait 2 seconds

// Standard formatted time demonstration
console.log('Time formatting: getTime');
// Use the getFormattedTime function from the toolbox to get the current time
let timeStr = pbottleRPA.getTime()
console.log('Standard formatted time:', timeStr);
// Get a custom formatted date (Year/Month/Day format)
console.log('Custom formatted date:', pbottleRPA.getTime('Y/m/d'));
pbottleRPA.wait(1)                            // Wait 1 second

// Unique ID generation demonstration
console.log('Unique ID: uniqid');
// Generate a default unique ID (based on timestamp)
console.log(pbottleRPA.utils.uniqid());
// Generate a unique ID with a custom prefix
console.log(pbottleRPA.utils.uniqid('myPrefix_'));
// Generate a unique ID with extra randomness
console.log(pbottleRPA.utils.uniqid('', true));
pbottleRPA.wait(1)                            // Wait 1 second

// Numeric string detection demonstration
console.log('Check if a variable is numeric: isNumeric');
// Test various data types to see if they are numeric
console.log(pbottleRPA.utils.isNumeric(10));       // Integer: true
console.log(pbottleRPA.utils.isNumeric("10"));     // Numeric string: true
console.log(pbottleRPA.utils.isNumeric("10.5"));   // Decimal string: true
console.log(pbottleRPA.utils.isNumeric("abc"));    // Non-numeric string: false
console.log(pbottleRPA.utils.isNumeric(null));     // null: false
console.log(pbottleRPA.utils.isNumeric(NaN));      // NaN: false
pbottleRPA.wait(1)                            // Wait 1 second

// hasData demonstration: check if a variable contains meaningful data
console.log('Check if variable contains data: hasData');
// Test various data types
console.log(pbottleRPA.hasData());             // No argument: false
console.log(pbottleRPA.hasData([]));           // Empty array: false
console.log(pbottleRPA.hasData({}));           // Empty object: false
console.log(pbottleRPA.hasData(0));            // Number 0: false
console.log(pbottleRPA.hasData(Number("abc"))); // NaN: false
console.log(pbottleRPA.hasData(""));           // Empty string: false
console.log(pbottleRPA.hasData('   '));        // Whitespace string: false
console.log(pbottleRPA.hasData(false));        // Boolean false: false
console.log(pbottleRPA.hasData(null));         // null: false
console.log(pbottleRPA.hasData(undefined));    // undefined: false
console.log(pbottleRPA.hasData(0n));           // BigInt 0: false
console.log('--------------------------');     // Separator
console.log(pbottleRPA.hasData(800n));         // Non-zero BigInt: true
console.log(pbottleRPA.hasData(3.14));         // Non-zero decimal: true
console.log(pbottleRPA.hasData('PBottle RPA ')); // Non-empty string: true
console.log(pbottleRPA.hasData([12, 5]));      // Non-empty array: true
console.log(pbottleRPA.hasData({ "pbottleRPA": 666 })); // Non-empty object: true
pbottleRPA.wait(1)                            // Wait 1 second

// Substring extraction demonstration
// Define the string to process
let str = "The PBottle RPA official website is https://www.pbottle.com. Enter it in your browser to visit."
pbottleRPA.log('Substring extraction test:', str)
// Extract content between two markers ("website is" and "Enter")
let sub_str = pbottleRPA.utils.substringFromTo(str, 'website is ', 'Enter')
pbottleRPA.log(sub_str)

// Simulate file search in File Explorer: searchFile
console.log('Simulate file search: searchFile');
// Search for files with a specified extension in a given directory
let rs = pbottleRPA.utils.searchFile('./', '.png', true) // Search for .png files in the current directory, including subdirectories
console.log('Search for .png files in the current directory:', rs);