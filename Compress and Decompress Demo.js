/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates the compression and decompression features of RPA.
 * Through this example, you can learn how to handle file compression and extraction in an automation workflow.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality
const fs = require("fs");                     // Import the Node.js file system module to check if a file exists

pbottleRPA.log('Compression test')             // Log the current operation

// Use the zipDir function to compress a directory into a ZIP file
// Parameter 1: source directory to compress (the input directory)
// Parameter 2: path and name of the resulting ZIP file
pbottleRPA.zipDir(pbottleRPA.__dirname + '/input', pbottleRPA.__dirname + '/target_archive.zip')
pbottleRPA.wait(2)                            // Wait 2 seconds to ensure the compression completes

console.log('Checking compression result');   // Output info about checking the compression result

// Check if the compressed ZIP file exists
if (!fs.existsSync(pbottleRPA.__dirname + '/target_archive.zip')) {
    pbottleRPA.exit('Not detected, exiting!') // If the file does not exist, exit the script with a message
}

console.log('Decompression test')             // Output info about the decompression test

// Use the unZip function to extract a ZIP file to a specified directory
// Parameter 1: path of the ZIP file to extract
// Parameter 2: target directory for extraction
pbottleRPA.unZip(pbottleRPA.__dirname + '/target_archive.zip', pbottleRPA.__dirname + '/extracted/')

console.log('Compression test complete: opening the directory'); // Output completion message

// Open the directory where the current script is located so the user can check the results
pbottleRPA.openDir(pbottleRPA.__dirname)