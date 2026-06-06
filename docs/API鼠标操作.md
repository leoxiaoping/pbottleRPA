# Mouse Operation Simulation


## moveMouse | Mouse Move

Move the mouse to the specified position. Origin at top-left of screen.

@param {number} x horizontal coordinate

@param {number} y vertical coordinate

@param {number} interval pixel interval time in ms, larger = slower movement, default: 0

## moveAndClick | Mouse Move and Click

Move mouse to the specified position and click. Origin at top-left of screen.

@param {number} x horizontal coordinate

@param {number} y vertical coordinate



## mouseClick | Mouse Click

Click mouse at current position. Default left button, optional 'right'.

@param {*} leftRight optional

@param {*} press duration in milliseconds  optional


## mouseDoubleClick | Mouse Double Click

Double-click mouse. Default left button.

## mouseWheel | Mouse Scroll Wheel

Mouse scroll wheel.

@param {*} data scroll amount, default -720 (scroll down 720 degrees)


## mouseLeftDragTo | Mouse Left Drag

Left mouse button drag to specified position.

@param {*} x

@param {*} y


## mouseRightDragTo | Mouse Right Drag

Right mouse button drag to specified position.

@param {*} x

@param {*} y
