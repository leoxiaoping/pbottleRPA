/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: This script demonstrates basic programming control structures in RPA,
 * including waiting, loops, and conditional statements.
 * Through these examples, you can learn how to implement repetitive tasks and branching logic in an RPA workflow.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

pbottleRPA.tts('Waiting 3 seconds to start')    // Announce the prompt via text-to-speech
pbottleRPA.log('Waiting 3 seconds to start');   // Write the text to the log file (logs are kept permanently)
pbottleRPA.wait(3)                              // Pause execution for 3 seconds to allow related operations to complete

// for loop example: repeat an action 10 times, opening a different web page each time
for (let index = 0; index < 10; index++) {      // Initialize counter, loop condition (run 10 times)
    let counter = index + 1                     // Counter variable showing the current iteration (starting from 1)
    pbottleRPA.log('Operation #' + counter);    // Output the current operation number to the log file
    pbottleRPA.openURL('https://www.baidu.com/s?wd=' + counter) // Open a URL with the default browser, searching a different keyword each time
    pbottleRPA.wait(0.5)                        // Wait 0.5 seconds after each operation to avoid overwhelming the system
}

// Conditional statement example: use a random number to demonstrate branching
let randomNum = Math.random()                   // Generate a random number between 0 and 1
if (randomNum < 0.5) {                          // Check if the random number is less than 0.5
    pbottleRPA.log('Less than 0.5.', randomNum) // If true, log the relevant information
    pbottleRPA.tts('Less than 0.5')             // Also announce the result via speech
} else {                                        // If the random number is 0.5 or greater
    pbottleRPA.log('0.5 or greater.', randomNum) // Log the information
    pbottleRPA.tts('0.5 or greater')            // Announce the result
}
pbottleRPA.wait(3)                              // Wait 3 seconds so the user can see the results

// End-of-flow notification
pbottleRPA.tts('Flow completed!')               // Announce the end of the flow via TTS
pbottleRPA.showMsg('PBottle RPA Tip', 'Flow completed!') // Show a system-level popup to notify the user that the flow has finished