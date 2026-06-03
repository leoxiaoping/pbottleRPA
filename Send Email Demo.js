/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 * 
 * Feature description: This script demonstrates the email notification feature of RPA.
 * Through this example, you can learn how to integrate email notifications into automation flows 
 * for remote monitoring and alerts.
 */

const pbottleRPA = require('./pbottleRPA')

console.log("=== Email Notification Test ===")
console.log(Date())

let to = pbottleRPA.waitInput('Enter the recipient email (test email)')

// Send email - asynchronous execution
pbottleRPA.sendMail(to, 'PBottle RPA Test Email', 'Test email content\nPBottle RPA Official website: https://officetool.online/pbottle-rpa/ \n' + Date())
    .then(console.log)
    .catch(console.error)