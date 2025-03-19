# 键盘模拟操作

## keyToggle 键盘基础触发

模拟按键触发事件

@param {*} key 按键名称参考：https://www.pbottle.com/a-13862.html

@param {*} upDown 默认按下down，up松开按键


## keyTap 键盘按键

按一下键盘 支持组合按键 加号连接 如： keyTap('ctrl + a')

@param {*} key 按键名称参考：https://www.pbottle.com/a-13862.html


## paste 粘贴输入

当前位置 粘贴（输入）文字

@param {*} text


##  getClipboard 获取剪切板内容

获取当前电脑的剪切板内容，系统剪切板支持多种格式 版本 V2024.2 开始生效
- 纯文本格式：普通复制 如'小瓶RPA'
- 图片格式 base64形式：浏览器复制图片 'data:image/png;base64,' 开头
- html格式：浏览器或者钉钉复制富文本综合内容 ''开头

@returns 结果文本