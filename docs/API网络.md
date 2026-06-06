# Network

Synchronous network methods for flows.

## openURL | Open URL

Open a URL in the default browser.

@param {string} myurl URL

Example: Quick Start Script

## getHtml | Request URL (Synchronous Method)

  Simple HTTP request, returns the HTML text response.

  @param {string} url URL, GET method

  @param {object} headersJson  request headers JSON object

  @returns {string} response text


## postJson | Submit JSON

  POST a JSON to the specified API URL, the most common network interface method.
  
  @param {string} url API URL 
  
  @param {object} msgJson JSON object 
  
  @param {object} headersJson request headers JSON object

  @param {string} method e.g. GET, POST, PUT, DELETE or HEAD

  @returns {string}

Example: Ops Message Phone Notification.js

## postJsonFile | Submit JSON File

  POST a JSON file to the specified API URL, suitable for large JSON content.

  @param {string} url API URL 

  @param {string} msgJsonFile JSON file path 

  @param {object} headersJson request headers JSON object

  @param {string} method e.g. GET, POST, PUT, DELETE or HEAD

  @returns {string}

Example: GPT Image Analysis Example.js



## downloadFile | Download File

  Download a file from the network to a local path.

  @param {string} fileUrl URL

  @param {string} filename local file path
  
  @param {object} headersJson  request headers JSON object


## sendMail | Send Email

 * Send email. Note: this method is asynchronous, please refer to the demo.
 * @param {string} to  recipient address
 * @param {string} subject email subject
 * @param {string} content email content; plain text, use '\n' for line breaks
 * @param {string} host SMTP server address (e.g.: smtp.qq.com)
 * @param {number} port server port, default 465
 * @param {string} user authentication info (username), usually the sender email address
 * @param {string} pass authentication info (password)
 * @returns 

Example: Send Email.js
