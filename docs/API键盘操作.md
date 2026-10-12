# 键盘模拟操作

## keyToggle 键盘基础触发

模拟键盘按键触发基础事件

@param {string} key 按键名称参考：https://www.pbottle.com/a-13862.html

@param {'down'|'up'} [upDown='down'] 默认 'down'（按下），'up' 松开按键


## keyTap 键盘按键

按一下键盘 支持组合按键 加号连接 如： keyTap('ctrl + a')

@param {string} key 按键名称参考：https://www.pbottle.com/a-13862.html


## paste 粘贴输入

当前位置 粘贴（输入）文字

@param {string} txt 复制到电脑剪切板的文本


##  getClipboard 获取剪切板内容

获取当前电脑的剪切板内容，系统剪切板支持多种格式 版本 V2024.2 开始生效

@param {'plain'|'html'|'urls'|'image'} [type='plain'] 剪切板内容类型枚举：
- 'plain'  纯文本 （默认）
- 'html'   HTML 源码（富文本综合内容，如浏览器、钉钉复制） '<html>' 开头
- 'urls'   文件链接列表（资源管理器复制文件） 'file:///C:..' 开头，多个以换行分隔
- 'image'  图片 base64（截图工具复制图片） 'data:image/png;base64,' 开头

@returns 结果文本