# 键鼠硬模拟 API

小瓶RPA硬件增强不是必选项，需要购买额外的硬件，建议只有需要系统级模拟操作时候才启用。

开启硬件键盘鼠标模拟，不影响默认的软件键盘鼠标模拟。

功能起始版本：V2024.3

本功能只对企业版开放 ，详细查看小瓶RPA软件授权：https://rpa.pbottle.com/License.php


## pbottle.hid.XXX 接口集

调用方式：pbottle.hid.XXX()


## hid_keyToggle

* 模拟按键触发事件 (硬件级)
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html
 * @param {string} upDown  默认按下down，up松开按键


## hid_keyTap 


* 按一下键盘（硬件级）   支持组合按键 加号连接 如：  keyTap('ctrl + alt + del')
 * @param {string} key  按键名称参考：https://www.pbottle.com/a-13862.html

## hid_mouseCMD

* 基础鼠标命令  全部为零释放
 * @param {number} button 按键  1，2，4 代表鼠标的 左键，右键，中键。
 * @param {number} x 按键时候移动的位置，绝对位置  x=100：向右移动 100像素，负数向左
 * @param {number} y 按键时候移动的位置，拖拽相对位置  y=100：向下移动 100像素，负数向上
 * @param {number} mouseWheel 滚动齿轮数  正数向下，负数向下
 * @param {number} time 按下到释放时间

## hid_moveMouse 

 * 移动鼠标到指定位置  起点为屏幕左上角  屏幕绝对位置（硬件分辨率）
 * @param {number} x   横坐标
 * @param {number} y   纵坐标
  
## hid_mouseClick

 * 当前位置点击鼠标 默认左键  
 * @param {string} 鼠标的按键选择 left right middle 可选  ，默认左键
 * @param {number} 点按时间 单位毫秒 可选

## hid_mouseDoubleClick 

双击鼠标  左键


## hid_mouseLeftDragTo 

* 鼠标左键拖到一段位置
 * @param {number} x  位置
 * @param {number} y  位置

## hid_mouseRightDragTo 

 * 鼠标左键拖到一段位置
 * @param {number} x  位置
 * @param {number} y  位置


##  hid_mouseWheel 

* 鼠标滚轮
* @param {number} data 滚动的量  默认为-1   向下滚动一个齿轮;  正数向上滚动；



## 参考示例

HID硬件级键盘鼠标演示.js