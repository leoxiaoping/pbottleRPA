# Q & A Frequently Asked Questions

- Collect and discuss common questions and official answers about pbottleRPA.
- For more questions, contact online customer service.

## What kind of flows can pbottleRPA automate? Can it crack a system or software?

pbottleRPA does not have cracking or privilege escalation capabilities. RPA can replace and optimize human computer operations with high-speed data processing capabilities.

A way to judge the capability boundary:

Anything you can do manually on a workflow, pbottleRPA can automate.

If you can't do something manually (including using tools and software), pbottleRPA probably can't either.


## How to use pbottleRPA? Which industries is it suitable for?

pbottleRPA is a general-purpose automation platform software for all industries. All existing workflows can be quickly automated.

pbottleRPA software is more like office PPT software. Just installing PPT doesn't give you PPT documents — it's not useful by itself. Flow scripts are like creating PPT documents. Not everyone can make good PPT documents; it depends on the user's skill level.

pbottleRPA comes with some basic demo example scripts for reference. Users can download and run them from the official website.



## Can multiple flows run simultaneously?

- RPA flows can be roughly divided into two types: simulation operations and data processing. Data processing can run concurrently. Simulation operations cannot run simultaneously because a computer has only one set of mouse and keyboard.
- One computer can run multiple virtual machines, and each virtual machine can run its own flow simultaneously.



## Why doesn't pbottle have a drag-and-drop 'designer'? Why must flows be expressed in scripting language?

- pbottleRPA's main positioning is a professional RPA software for professional users. It requires basic scripting skills from flow implementers and is not suitable for users without any scripting foundation directly. Application scenarios are mostly automation projects, workstation RPA applications, etc.

- Graphical programming (designer) was once popular, but as scripting languages become easier to use, the disadvantage of graphical syntax expression has become increasingly apparent. Managing development of long and complex flows often fails to meet requirements and has higher overall costs. (Commercially valuable automation projects are often long and complex flows.)
  
- JS scripts can integrate into the complete Node.js (Python) ecosystem, seamlessly introducing trillions of third-party packages, naturally connecting with traditional IT projects, and more friendly to technical operations personnel.
  
- V2023.3 added mouse operation recording functionality to automatically generate simple scripts.

- pbottleRPA can use AI programming assistants to automate the generation and writing of flow scripts. 

## Is pbottleRPA free?

- pbottleRPA Personal Edition: Permanently free!

- pbottleRPA Enterprise Edition: One-time permanent software license + flow implementation (optional). Flow implementation includes: flow creation + testing + stability optimization.
  
- pbottleRPA Cloud Module: Various AI large models are billed based on cloud token consumption, automatically deducted from the recharged account. No usage, no cost.

For details, consult our sales consultant.


## Can pbottleRPA be used offline or on an intranet?

Yes, requires an Enterprise Edition license. Personal users need to be online to obtain a free license.



## With AI large models or AI agent, is pbottleRPA still needed?

  Yes, currently AI cannot practically replace pbottleRPA.

- pbottleRPA prioritizes accuracy, AI prioritizes intelligence. If all workflows were handled by AI, you would need double the manpower to correct its errors, which would be economically unfeasible.
- Currently, pbottleRPA automation flows have integrated multiple local AI models and online large model AI modules to intelligently handle necessary steps in the flow.

## What is the difference between a technical specialist and flow implementation?

- Flow implementation service is all-inclusive. All related development, testing, optimization, and deployment are done by us.
- Technical specialist service is technical support, only providing consulting services on specific technical points in the project. The overall implementation work is primarily done by the client.

## What is the difference between pbottleRPA applications and traditional software applications?

All functional modules in traditional applications must be developed from scratch. RPA applications can reference all off-the-shelf software applications as their own functional modules. Therefore, RPA applications can also be called **software of software**.

For example, if a traditional application needs to add a communication module, you have to develop it yourself, at most you can use libraries to improve development quality and speed. RPA applications can directly connect to WeChat Work — not only do you get messaging features, but you also connect to WeChat Work's user ecosystem.
