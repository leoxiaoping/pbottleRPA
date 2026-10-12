# 鼠标操作模拟

调用方式：`pbottleRPA.xxx()`

## getMousePos 获取鼠标位置

获取当前鼠标指针在屏幕上的坐标位置

@returns {Object} 鼠标坐标对象，形如 `{x:314,y:483}`；x 为横坐标，y 为纵坐标（屏幕左上角为原点）

## moveMouse 鼠标移动

平滑移动鼠标到指定位置，起点为屏幕左上角

别名：`moveMouseSmooth`（`鼠标移动`）

@param {number} x 横坐标

@param {number} y 纵坐标

@param {number} interval 像素间隔时间，越大移动越慢 毫秒单位，默认：0

## moveAndClick 鼠标移动并点击

移动鼠标到指定位置并点击

@param {number} x 横坐标

@param {number} y 纵坐标

## mouseClick 鼠标点击

当前位置点击鼠标 默认左键

@param {'left'|'right'} [leftRight='left'] 鼠标按键，默认左键

@param {number} [time=30] 点按长按时间，单位毫秒

## mouseDoubleClick 鼠标双击

双击鼠标 默认左键

## mouseWheel 鼠标滚轮

鼠标滚轮

@param {number} [data=-720] 滚动的量 默认 -720 向下滚动720度

## mouseLeftDragTo 鼠标左键拖动

鼠标左键拖到指定位置

@param {number} x 拖拽目标横坐标

@param {number} y 拖拽目标纵坐标

## mouseRightDragTo 鼠标右键拖动

鼠标右键拖到指定位置

@param {number} x 拖拽目标横坐标

@param {number} y 拖拽目标纵坐标

## mouseKeyToggle 鼠标基础触发

模拟鼠标按键触发基础事件

@param {'left'|'right'|'middle'} [key='left'] 鼠标按键，默认 left

@param {'down'|'up'} [upDown='down'] 默认 'down'（按下），'up' 松开按键
