"""
小瓶RPA演示demo，具体api请查看*流程开发文档*
官网：https://rpa.pbottle.com/
流程开发文档：https://rpa.pbottle.com/docs/

功能说明：这是一个最基础的小瓶RPA JavaScript脚本示例，展示小瓶RPA动态输入内容的方法
小瓶RPA基座 V2026.0.0 以上版本可用
"""

import pbottleRPA  # 引入小瓶RPA的核心库，获得对RPA功能的访问权限


content1 = pbottleRPA.waitInput("请输入第一个数字：")
content2 = pbottleRPA.waitInput("请输入第二个数字：")

pbottleRPA.log("输入的数字是：", content1, content2)
pbottleRPA.log("输入完成 ✅️, 相加等于：", float(content1) + float(content2))
