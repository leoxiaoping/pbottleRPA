# 鼠标操作模拟


## moveMouse 鼠标移动

移动鼠标到指定位置并点击 起点为屏幕左上角

@param {number} x 横坐标

@param {number} y 纵坐标

@param {number} interval 像素间隔时间，越大移动越慢 毫秒单位，默认：0

## moveAndClick 鼠标移动并点击

移动鼠标到指定位置并点击 起点为屏幕左上角

@param {number} x 横坐标

@param {number} y 纵坐标



## mouseClick 鼠标点击

当前位置点击鼠标 默认左键 可选 'right'

@param {*} leftRight 可选

@param {*} 点按时间 单位毫秒 可选


## mouseDoubleClick 鼠标双击

双击鼠标 默认左键

## mouseWheel 鼠标滚轮

鼠标滚轮

@param {*} data 滚动的量 默认为-720 向下滚动720度


## mouseLeftDragTo 鼠标左键拖动

鼠标左键拖到指定位置

@param {*} x

@param {*} y


## mouseRightDragTo 鼠标右键拖动

鼠标右键拖到指定位置

@param {*} x

@param {*} y