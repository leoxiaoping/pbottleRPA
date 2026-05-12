"""
PBottle RPA demo – please refer to the *process documentation* for specific APIs.
Official website: https://rpa.pbottle.com/
Process documentation: https://rpa.pbottle.com/docs/

Feature description: A minimal PBottle RPA Python example that demonstrates dynamic input.
Requires PBottle RPA base version V2026.0.0 or above.
"""

import pbottleRPA  # Import the core PBottle RPA library to access RPA functionality

content1 = pbottleRPA.waitInput("Please enter the first number:")
content2 = pbottleRPA.waitInput("Please enter the second number:")

pbottleRPA.log("The numbers entered are:", content1, content2)
pbottleRPA.log("Input complete ✅️, sum equals:", float(content1) + float(content2))
