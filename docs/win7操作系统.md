# Using pbottleRPA on Windows 7

There are still a large number of Win 7 computers in domestic government and enterprise units.

pbottleRPA still invests development resources to maintain full functional module compatibility with Win 7 systems.



## Win 7 pbottleRPA Platform Base

Win 7 systems have many pirated lite versions. Keep the system updated to the latest version whenever possible.

Common Win 7 lite versions may lack the TTS engine, causing the pbottleRPA TTS module to be unavailable.


## Win 7 Script Engine Special Installation

Win 7 has been abandoned by many new versions. Only the latest zip version of Node.js can be downloaded to use the latest features like .mjs, fetch, etc.

https://mirrors.cloud.tencent.com/nodejs-release/v18.20.4/node-v18.20.4-win-x64.zip



1. Download the zip version of Node.js, extract it, and add the folder path to the environment variable `path`. Reference: https://www.pbottle.com/a-14057.html

2. If prompted: "The procedure entry point EventSetInformation could not be located in the dynamic link library ADVAPI32.dll"

   Ensure Win 7 has the latest update, patch number KB3080149. Download URL: https://www.microsoft.com/en-us/download/confirmation.aspx?id=48636

3. If Node.js prompts OS incompatibility, set the environment variable NODE_SKIP_PLATFORM_CHECK=1
