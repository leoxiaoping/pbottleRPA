# Keyboard Simulation Operations

## keyToggle | Keyboard Basic Event

Simulate key event.

@param {string} key key name reference: https://officetool.online/a-321.html

@param {string} upDown default down (press), up releases the key


## keyTap | Keyboard Key Press

Press a key on the keyboard. Supports key combinations with plus sign, e.g.: keyTap('ctrl + a').

@param {string} key key name reference: https://officetool.online/a-321.html


## paste | Paste Input

Paste (input) text at current position.

@param {string} text


## getClipboard | Get Clipboard Content

Get current system clipboard content. System clipboard supports multiple formats. Effective from V2024.2.
- Plain text format: normal copy, e.g. `pbottleRPA`
- Image format in base64: browser copy image, starts with `data:image/png;base64,`
- HTML format: browser or DingTalk copy rich text content, starts with `<html>`

@returns result text
