# Hardware Keyboard/Mouse Simulation API

The pbottleRPA hardware enhancement is optional and requires purchasing additional hardware. It is recommended to enable it only when system-level simulation operations are needed.

Enabling hardware keyboard/mouse simulation does not affect the default software keyboard/mouse simulation.

Initial version: V2024.3

This feature is only available for the Enterprise Edition. See pbottleRPA software license for details: https://officetool.online/pbottle-rpa/


## pbottle.hid.XXX Interface Set

Usage: pbottle.hid.XXX()


## hid.keyToggle

* Simulate key event (hardware level).
 * @param {string} key  key name reference: https://officetool.online/a-321.html
 * @param {string} upDown  default down (press), up releases the key

## hid.keyTap

* Press a key (hardware level). Supports key combinations with plus sign, e.g.: keyTap('ctrl + alt + del').
* @param {string} key  key name reference: https://officetool.online/a-321.html

## hid.mouseCMD

* Basic mouse command. All zeros to release.
 * @param {number} button button  1, 2, 4 representing left, right, middle mouse buttons respectively.
 * @param {number} x movement position when button is pressed, absolute position  x=100: move right 100 pixels, negative = left
 * @param {number} y movement position when button is pressed, relative drag position  y=100: move down 100 pixels, negative = up
 * @param {number} mouseWheel scroll wheel ticks  positive = down, negative = up
 * @param {number} time press-to-release duration

## hid.moveMouse

 * Move mouse to specified position. Origin at top-left of screen. Absolute screen position (hardware resolution).
 * @param {number} x   horizontal coordinate
 * @param {number} y   vertical coordinate
  
## hid.mouseClick

 * Click mouse at current position. Default left button.
 * @param {string} button choice: left right middle  optional, default left button
 * @param {number} time press duration in milliseconds  optional
  
## hid.moveAndClick

 * Move mouse to specified position and click.
 * @param {number} x horizontal coordinate
 * @param {number} y vertical coordinate

## hid.mouseDoubleClick

Double click mouse. Left button.


## hid.mouseLeftDragTo

* Left mouse button drag to a position.
 * @param {number} x  position
 * @param {number} y  position

## hid.mouseRightDragTo

* Right mouse button drag to a position.
 * @param {number} x  position
 * @param {number} y  position


## hid_mouseWheel

* Mouse scroll wheel.
* @param {number} data scroll amount  default -1  scroll down one tick; positive = scroll up



## Reference Demo

HID Hardware-Level Keyboard and Mouse Demo.js
