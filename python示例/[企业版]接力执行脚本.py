"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import time


pbottleRPA.delaySet(__file__)  #自己接力自己

pbottleRPA.log('等待3秒')
pbottleRPA.wait(3)
pbottleRPA.log('完成')
