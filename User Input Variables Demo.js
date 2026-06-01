/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: A minimal PBottle RPA JavaScript example that demonstrates dynamic input.
 * Requires PBottle RPA base version V2026.0.0 or above.
 */
const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to gain access to RPA functions

const content1 = pbottleRPA.waitInput('Please enter the first number:')
const content2 = pbottleRPA.waitInput('Please enter the second number:')

console.log('The numbers entered are:', content1, content2);
pbottleRPA.log('Input complete ✅️, sum equals:', parseFloat(content1) + parseFloat(content2))