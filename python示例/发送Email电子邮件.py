"""
PBottle RPA demo. Please refer to the *process documentation* for specific APIs.
Official website: https://rpa.pbottle.com/
Process documentation: https://rpa.pbottle.com/docs/

Feature description: This script demonstrates the email notification feature of RPA.
Through this example, you can learn how to integrate email notifications into automation flows for remote monitoring and alerts.
"""

import pbottleRPA

pbottleRPA.log("=== Email Notification Test ===")
pbottleRPA.log(pbottleRPA.getTime())

to = pbottleRPA.waitInput("Enter recipient email (test email)")

# Send email - synchronous execution (returns result string)
pbottleRPA.log(
    pbottleRPA.sendMail(
        to,
        "PBottle RPA Test Email",
        "Test email content\nPBottle RPA official website: https://rpa.pbottle.com/ \n"
        + pbottleRPA.getTime(),
    )
)
