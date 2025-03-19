# pbottleRPA.utils 工具箱

提供基础常用便利工具

调用方式：
pbottleRPA.utils.xxx()

demo示例：
常用工具 Utils 演示.js

## 获取格式化时间 getTime

utils.getTime()


格式化的时间 getTime('Y-m-d H:i:s') 输出类似 "2023-09-17 14:30:45" 的日期时间字符串

@param {string} format 格式参考 https://www.runoob.com/php/php-date.html 仅支持 Y|y|m|d|H|i|s|n|j

@param {number} timestamp 时间戳秒

@returns {string}

##  唯一数 uniqid

utils.uniqid()

生成唯一符串 注意：默认只是毫秒级的

@param {string} prefix 前缀

@param {boolean} moreEntropy 是否开启更精细的随机，如果还不能满足请使用uuid

@returns {string}


## 是否数字 isNumeric

utils.isNumeric()


判断是否为数字化变量（包含数字化的字符串）

@param {*} value 任意类型变量

@returns {boolean}

## 是否有内容 hasData

utils.hasData()

判断变量中是否有数据，直接if()可用。
非零数字 或 非空字符串、数组、对象 返回 true，其他都返回 false

@param {*} value 任意类型变量

@returns {boolean}

##  搜索文件 searchFile

utils.searchFile()

根据关键字搜索定位具体文件

@param {string} directory 绝对路径

@param {string} words 文件名包含的关键字，过滤词，默认忽略大小写

@returns {string[]} 文件路径 || [] 未找到
