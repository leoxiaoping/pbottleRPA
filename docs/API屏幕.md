# 屏幕画面


## getResolution 获取屏幕分辨率

获取当前屏幕分辨率， ratio 为桌面缩放比例

@returns JSON 内容格式  `{ w:1920,h:1080,ratio:1.5 }`

## screenShot 屏幕截图

@param {*} savePath 保存路径默认 我的图片，图片格式为PNG；如果使用自定义路径请以 '.png' 结尾;

@param {*} x 截图开始位置

@param {*} y

@param {*} w 截图宽度

@param {*} h 截图长度


##  getScreenColor 获取屏幕颜色

屏幕一个点取色

@param {*} x

@param {*} y

@returns 返回颜色值

## findScreen 寻找图像

屏幕查找图象定位

@param {string} tpPath 搜索的小图片，建议png格式 相对路径

@param {number} miniSimilarity 可选，指定最低相似度，默认0.9。取值0-1，1为找到完全相同的。

@param {number} fromX=0 可选，查找开始的开始横坐标

@param {number} fromY=0 可选，查找开始的开始纵坐标

@param {number} width=-1 可选，搜索宽度

@param {number} height=-1 可选，搜索高度

@returns 返回找到的结果json 格式：`{x,y}`

##  waitImage 等待图像出现

等待屏幕上的图片出现

@param {string} tpPath 图片模板路径 相对路径：./image/123.png

@param {Function} intervalFun 检测间隔的操作，function格式

@param {number} timeOut 等待超时时间 单位秒

@returns {position|boolean} 结果的位置信息，json格式：`{x,y}`


## findContours 寻找轮廓

@param {number} minimumArea 轮廓最小面积 默认过滤掉 10x10 以下的元素

@param {number} fromX 开始坐标

@param {number} fromY

@param {number} width 作用范围

@param {number} height

@returns {array} 所有查找到的轮廓信息，包含闭合区域的起始坐标，中点坐标，面积，id。 格式：`[{ x: 250, y: 10, cx: 265.5, cy: 30.5, area: 2401, id: 42 },...]`

屏幕查找物体或者窗口轮廓

#### 调试

软件根目录会生成 debug/findContours.png

