"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块
import time


print("=== WEB增强插件-浏览器元素操作演示 ===")
current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
print(current_time)

print("=== ※※※※※※※※※ ===")
print("=== 需要安装 小瓶RPA 浏览器插件 ===")
print("=== ※※※※※※※※※ ===")


pbottleRPA.tts('必须安装小瓶RPA浏览器增强插件，手动点击确定继续')
pbottleRPA.showMsg('提示：','必须先安装浏览器增强插件')
pbottleRPA.openURL('https://www.baidu.com')


ret = pbottleRPA.browserCMD_alert('来自小瓶RPA的问候，手动点击确定开始，20秒超时')
print('返回操作结果',ret)
if (ret != 'ok'):
    print('没有检测到小瓶RPA浏览器插件',ret)
    pbottleRPA.exit(1)


#延迟1秒
pbottleRPA.sleep(1000*1)



ret = pbottleRPA.browserCMD_text('span.title-content-title')
print('返回操作结果【一次多个】',ret)


ret = pbottleRPA.browserCMD_cookie('BAIDUID')
print('返回操作结果 cookieGet',ret)
ret = pbottleRPA.browserCMD_cookie('pbottleID',"good",3)
print('返回操作结果 cookieSet',ret)


pbottleRPA.tts('变换背景色')
ret = pbottleRPA.browserCMD_css('body',"background-color",'blue')
print('返回操作结果 cssSet',ret)
ret = pbottleRPA.browserCMD_css('body',"background-color")
print('返回操作结果【颜色值】',ret)
ret = pbottleRPA.browserCMD_css('body',"background-color",'white')
print('返回操作结果 cssSet',ret)


ret = pbottleRPA.browserCMD_text('title')
print('返回操作结果 textGet',ret)
pbottleRPA.tts('获取标题 ')
pbottleRPA.sleep(1000*3)


pbottleRPA.tts('设置页面标题 ')
ret = pbottleRPA.browserCMD_text('title','[小瓶RPA]-'+ret)
print('返回操作结果 textSet',ret)
ret = pbottleRPA.browserCMD_text('title')
print('当前页面标题：',ret)
pbottleRPA.sleep(1000*3)


pbottleRPA.tts('输入搜索词 点击搜索按钮 ')
ret = pbottleRPA.browserCMD_val('#kw','小瓶RPA')
print('返回点击操作结果 valSet',ret)


ret = pbottleRPA.browserCMD_click('#su')
print('返回点击操作结果 click',ret)


pbottleRPA.sleep(1000*3)


pbottleRPA.tts('开始去广告')
ret = pbottleRPA.browserCMD_remove('#content_left div:first')
print('返回点击操作结果 remove',ret)
pbottleRPA.sleep(3000)



pbottleRPA.tts('打开网站')
pbottleRPA.browserCMD_click('div#content_left a:first')
pbottleRPA.sleep(1500)


pbottleRPA.tts('读取 logo 路径，显示到日志')
ret = pbottleRPA.browserCMD_attr('img:first','src')
print('网站logo图片地址',ret)
pbottleRPA.sleep(1500)


pbottleRPA.tts('演示完成准备退出')
print("准备结束脚本")
ret = pbottleRPA.browserCMD_alert('演示结束')
#脚本强制退出
pbottleRPA.exit()
print("已经退出了，无效")