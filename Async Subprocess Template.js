/**
 * PBottle RPA Asynchronous Sub‑process Template
 * 
 * Feature description: This script demonstrates how to use asynchronous sub‑processes in RPA.
 * Through this example, you can learn how to call synchronous and asynchronous sub‑processes
 * from the main flow and handle their return values.
 */

// Import the PBottle RPA core library to access RPA functionality
const pbottleRPA = require('./pbottleRPA.js')

// Register global variables – no need to prefix with 'global' when using them elsewhere
global.global_processName = 'PBottle RPA — XXXX Process Template'   // Global process name
global.global_startTime = pbottleRPA.utils.getTime()                // Global start time

// Main process function – uses async to support asynchronous operations and serialise all sub‑processes
async function main() {

    // Log the main process start information, including start time and process name
    pbottleRPA.log("Main process started 📍", global_startTime, global_processName)

    await subProcess2('input parameter 2');

    console.log('Launching synchronous sub‑process');
    // Execute a synchronous sub‑process directly with require (script that contains only top‑level code)
    require('./QuickStart_demo_(3_lines).js')   // The original Chinese filename is preserved; feel free to rename

    console.log('Launching asynchronous sub‑process: test.js');
    // Call an asynchronous sub‑process, wait for it to finish and get the return value
    // Use await to wait for the asynchronous operation to complete
    let rs = await require('./test.js')('https://rpa.pbottle.com')   // Pass a parameter to the sub‑process
    console.log('Sub‑process returned:', rs);  // Output the result from the sub‑process

    // await process1() // error (commented‑out example)
    pbottleRPA.log("Main process completed ✅️")  // Log the completion of the main process
}

// Execute the main process function and catch any errors that may occur
main().catch((e) => {   // Main process error handling
    console.log('❌ Not completed, error', e);   // Output error message
    console.log('Preparing to send a message to the administrator 👉');  // Output follow‑up action
})

// test.js content explanation (sub‑process):
// module.exports = async (url) => {  
//     console.log('Sub‑process started')  
//     const res = await fetch(url) 
//     pbottleRPA.log('Network request completed!~', res.ok, res.url)
//     console.log('Sub‑process ended')  
//     return true 
// }


async function subProcess2(params) {  // Define an inline asynchronous function as a sub‑process (recommend using descriptive names)
    console.log('Sub‑process 2 started', params);
}