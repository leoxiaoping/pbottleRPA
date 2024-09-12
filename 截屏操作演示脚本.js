/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */


const pbottleRPA = require('./pbottleRPA')


pbottleRPA.日志输出(pbottleRPA.获取格式化时间())
pbottleRPA.文字转语音('开始运行小瓶RPA截屏操作演示脚本。...  快捷键 ：Ctrl+shift+Q 可手动退出')
//延迟5秒
pbottleRPA.等待(12)



let 分辨率 = pbottleRPA.获取屏幕分辨率()
pbottleRPA.日志输出('当前电脑屏幕分辨率',分辨率)
pbottleRPA.文字转语音(`当前电脑屏幕分辨率: ${分辨率.w} 乘以 ${分辨率.h}`)
pbottleRPA.等待(6)



pbottleRPA.文字转语音('正在截屏（全屏）...')
pbottleRPA.等待(3)

// pbottleRPA.屏幕截图('d:/abssds图片.png'); 

pbottleRPA.屏幕截图();

pbottleRPA.文字转语音('正在截屏（区域）...')
let 结果 = pbottleRPA.屏幕截图('',分辨率.w/4,分辨率.h/4,分辨率.w/2,分辨率.h/2)
pbottleRPA.日志输出('截屏结果：',结果)
pbottleRPA.等待(3)


pbottleRPA.文字转语音('图片保存在我的电脑 我的图片...')
pbottleRPA.日志输出('图片保存在:我的电脑 我的图片')
pbottleRPA.等待(5)


pbottleRPA.文字转语音('演示结束')
pbottleRPA.日志输出("准备结束脚本");