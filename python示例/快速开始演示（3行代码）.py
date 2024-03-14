"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块

pbottleRPA.openURL('https://www.baidu.com/') #用浏览器打开百度
pbottleRPA.paste('小瓶RPA官网')  #输入搜索词
pbottleRPA.keyTap('enter')  #确认搜索