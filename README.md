# Pbottle RPA

Professional RPA+AI software for power users.

### Introduction
Pbottle RPA specializes in complex business process automation. A lightweight, versatile RPA software that significantly reduces costs, improves efficiency, ensures 100% work accuracy, and enables non-intrusive integration. It supports automation of both browser web applications and desktop client applications. Also supports both JavaScript and Python scripting.

 **If this tool is useful to you, please give it a star.** 

Product Website: [https://rpa.pbottle.com/](https://rpa.pbottle.com/)

![Pbottle RPA Logo](input/RPAlogo128.png)




### Getting Started

```javascript
pbottleRPA.openURL('https://www.baidu.com/')
pbottleRPA.paste('pbottle RPA official website')
pbottleRPA.keyTap('enter')
```


### Documentation Portal 【New】

[https://rpa.pbottle.com/docs/](https://rpa.pbottle.com/docs/)


### Pbottle RPA Advantages

1. Automation, AI, and LLM capabilities can be quickly applied to workflows with fine-grained control.
2. Lightweight + open API integration seamlessly integrates with existing work systems, rather than high-cost replacement.
3. Pure visual simulation driving, compatible with all applications.
4. Developer-friendly with mainstream scripting languages and high scalability.


### Product Design FAQ

❓︎ Why doesn't Pbottle have a graphical drag-and-drop "designer" and instead uses JavaScript scripting?

- Graphical programming has been around for a while. While the learning curve is lower, the ceiling is also lower, often failing to meet the needs and incurring higher costs for complex business process development. (Business-value automation projects are usually complex.)

- JavaScript scripts can integrate with the complete Node.js (Python) ecosystem, seamlessly introducing countless third-party packages, while also being able to use git and other code engineering management tools for natural integration with traditional IT projects.

- V2023.3 adds mouse operation recording with automatic script generation for simple tasks.
  
- 🔥 AI Chat LLM to generate Pbottle RPA flow scripts   [View](https://rpa.pbottle.com/docs/AI%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E8%84%9A%E6%9C%AC.html)


❓︎ Why does Pbottle use JavaScript as the scripting language? Can I use Python, Java, C#, etc.?

- Yes, Pbottle RPA's core and script layer use HTTP communication interfaces. Although the official demo scripts use JavaScript (with Python compatibility), experienced developers in other languages can access Pbottle RPA through standard HTTP interfaces at any time.

- JavaScript is currently the mainstream scripting language for frontend development with a large user base. The openness of JavaScript also makes it easier for AI tools like GPT to generate accurate results.


❓︎ Can I use Pbottle RPA offline or in an internal network?

- Enterprise version supports offline use. Personal version requires internet connection for free authorization.


### Software Architecture

![Pbottle RPA Architecture](https://images.gitee.com/uploads/images/2021/1126/130823_ef4a3e3b_799608.png "Pbottle RPA Architecture")


### Company Support

Beijing Xiaopeng Technology Co., Ltd., providing technical support and value-added services for commercial version customers.

Website: [https://www.pbottle.com/](https://www.pbottle.com/)


### Terms of Use

1. Personal permanent free use of this project is allowed, including for personal learning, gaming, graduation projects, teaching examples, public welfare, and other non-commercial purposes; does not include work-related purposes during working hours;

2. Copyright information must be retained, please comply voluntarily;

3. Unauthorized sale of this software, code, and other resources in any form is prohibited (including free parts bundled with paid projects);


# Installation Guide

### Steps

1. Download and run the portable exe base  pbottleRPA.zip  [Base exe portable version](https://rpa.pbottle.com/)
2. Install NodeJS script engine .msi, and install [Download link](https://rpa.pbottle.com/a-13943.html)   Please restart the base after installation
3. Download [Test scripts](https://gitee.com/pbottle/pbottle-rpa/repository/archive/master.zip), run the base and select a demo script to start

### Common Issues

1. If the system prompts missing vcruntime140XX.dll   Download and install from Microsoft official website: [https://docs.microsoft.com/zh-CN/cpp/windows/latest-supported-vc-redist?view=msvc-140](https://docs.microsoft.com/zh-CN/cpp/windows/latest-supported-vc-redist?view=msvc-140)  (New version is compatible)

1. The exe startup directory path cannot contain Chinese characters. Copy to another directory or copy the folder to the disk root directory. (New version is compatible)

1. Service port (49888) monitoring failure, troubleshooting: [https://rpa.pbottle.com/a-13924.html](https://rpa.pbottle.com/a-13924.html)

1. Software no longer supports 32-bit legacy operating systems


### Computer Requirements

New! V2023 version further improves AI algorithm library compatibility. Please download the latest version.

Win7 system notes: https://rpa.pbottle.com/a-13941.html


### Mobile App RPA

1. Mobile apps can use Android emulator solution or real device screen mirroring. Thanks to Pbottle RPA's pure image recognition driving method, it is fully compatible with various mobile app emulators and phone manufacturers' screen mirroring.
You can use any API interface capability except the web enhancement plugin.

1. Emulator solution:
Recommended after testing:  BlueStacks
Known issues: LDPlayer, clipboard sync delay, input problems

1. Real device screen mirroring solution:
vivo Suite
Huawei Smart Connectivity


### Web Application Browser Enhancement

Web enhancement allows Pbottle RPA scripts to directly manipulate browser DOM elements, making it more convenient and efficient.

Also supports using DOM selectors to select elements and return results.

 _Note: This feature requires installing the Pbottle RPA browser plugin, version requirement: V2023.5 and later_ 

Plugin download: [https://rpa.pbottle.com/a-13942.html](https://rpa.pbottle.com/a-13942.html)


### Demo Examples

Built-in Demo examples: (Chinese titles are demo scripts, more will be added later)


Notes:

1. 【Web Enhancement】 requires installing Pbottle RPA browser plugin first
2. 【Third-party】 requires double-clicking  _Third-party Module Installation.bat_  to install required modules.


### Global Hotkeys


 **Ctrl + Shift + Q** 

- Stop current script execution   End current mouse operation recording

 **Ctrl + Shift + R** 

- Restart current script execution



# AI Model Usage

### Local Models
1. OCR text recognition  Example: [文字提取查找OCR演示.js](文字提取查找OCR演示.js)
2. Object recognition model  Example: [GPT图像解析示例](GPT图像解析示例.js)
   
### Cloud Large Models
1. Large language model  Example: [文字提取查找OCR演示.js](文字提取查找OCR演示.js)
2. Object recognition model Example: [GPT图像解析示例.js](GPT图像解析示例.js)



# Developing Flow Scripts

### RPA Script Development Documentation

Documentation portal:

[https://rpa.pbottle.com/docs/](https://rpa.pbottle.com/docs/)

### Supported Scripting Languages

1. NodeJS
2. Python (Beta)

### Other References

1. Keyboard reference  [https://rpa.pbottle.com/a-13862.html](https://rpa.pbottle.com/a-13862.html)
2. Scheduled tasks  [https://rpa.pbottle.com/a-13868.html](https://rpa.pbottle.com/a-13868.html)
3. Free mobile notification [https://rpa.pbottle.com/a-12586.html](https://rpa.pbottle.com/a-12586.html)

### Technical Discussion WeChat Group

Feel free to join the group chat via WeChat QR code (never expires):

![Pbottle RPA Technical Discussion Group QR Code](input/discuss.jpg)

### Official RPA Value-Added Services

 [Contact Us](https://rpa.pbottle.com/value-added.php) 

### Pbottle RPA Recruitment

Talent is valued regardless of background, send your resume:

Open Pbottle RPA official website, view in browser console.
