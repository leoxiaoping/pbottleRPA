/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This is a minimal PBottle RPA JavaScript script example,
 * showing how to use RPA to perform a simple Baidu search.
 * The script opens Baidu, types "PBottle RPA official website" into the search box, and presses Enter to search.
 */
const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

pbottleRPA.openURL('https://www.baidu.com/')
pbottleRPA.paste('PBottle RPA official website')
pbottleRPA.keyTap('enter')