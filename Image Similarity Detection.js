/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates the image similarity detection feature of RPA.
 * Through this example, you can learn how to compare the similarity of two images,
 * which is very useful in automated testing and image verification scenarios.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

console.log("=== Image Similarity Detection ==="); // Output test title to the console
console.log(Date());                              // Output the current date and time to the console
pbottleRPA.setDefaultDelay(0);                    // Set the default operation delay to 0 to manage all delays manually

let dir = __dirname + '/input/';                  // Define the directory path where the image files are located; __dirname refers to the directory of the current script
let path1 = dir + 'RPAlogo128.png';               // Define the full path of the first image
let path2 = dir + 'RPAlogo128.png';               // Define the full path of the second image (same image in this case)

// Use the imgSimilar function to compare the similarity of two images
let rs = pbottleRPA.imgSimilar(path1, path2);     // Call the image similarity detection API, passing in the paths of the two images for comparison
console.log('Image similarity detection result:', rs); // Output the image similarity result to the console; a value closer to 1 indicates higher similarity

pbottleRPA.showMsg('Image similarity detection result:', JSON.stringify(rs));  // Show a system message box with the result