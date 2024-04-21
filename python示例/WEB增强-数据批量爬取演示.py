"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import time
import json


print("=== WEB增强插件-浏览器数据库批量爬取演示 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)

print("=== ※※※※※※※※※ ===");
print("=== 需要安装 小瓶RPA 浏览器插件 ===");
print("=== ※※※※※※※※※ ===");

pbottleRPA.showMsg('提示：','必须先安装浏览器增强插件')

#打开被获取数据的网页
pbottleRPA.sleep(5*1000)
pbottleRPA.openURL('https://rpa.pbottle.com/')
pbottleRPA.sleep(5*1000)
pbottleRPA.keyTap('page down')
pbottleRPA.keyTap('page down')
pbottleRPA.keyTap('page down')


#开始获取网页上的数据
rs = pbottleRPA.browserCMD_text('a.list-group-item')
if rs == '20s超时':
    pbottleRPA.showMsg('出现错误：','必须先安装浏览器增强插件和联网')
    pbottleRPA.exit()

datas =  json.loads(rs)

print('爬取数据数量：',len(datas))
pbottleRPA.tts('爬取数据'+ str(len(datas)) +'条，请查看日志')
pbottleRPA.sleep(1000*4)

print('数据列表：')
for element in datas:
    element = element.strip().replace('\r', '').replace('\n', '')
    print(element);


pbottleRPA.tts('演示结束')