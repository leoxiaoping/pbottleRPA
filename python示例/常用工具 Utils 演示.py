"""
小瓶RPA演示demo，具体api请查看*流程开发文档*
官网：https://rpa.pbottle.com/
流程开发文档：https://rpa.pbottle.com/docs/

功能说明：此脚本演示了RPA中的常用工具函数（utils）
通过这个示例，您可以学习如何使用pbottleRPA提供的各种实用工具函数
"""

import sys
import os

# 添加父目录到路径以导入pbottleRPA
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pbottleRPA


def main():
    print("=== 常用工具 pbottleRPA.utils ===")

    # 语音播报演示
    pbottleRPA.tts("常用工具 utils 演示")
    # 显示系统消息框提示用户
    pbottleRPA.showMsg("小瓶RPA提示", "常用工具 utils 演示")
    pbottleRPA.wait(2)

    # 标准格式时间演示
    print("--- 时间格式化 getTime ---")
    # 使用工具箱中的获取格式化时间函数获取当前时间
    time_str = pbottleRPA.getTime()
    print("标准格式时间:", time_str)
    # 获取自定义格式的日期（年/月/日格式）
    print("任意格式日期:", pbottleRPA.getTime("Y/m/d"))
    pbottleRPA.wait(1)

    # 随机数生成演示
    print("--- 随机数 uniqid ---")
    # 生成默认格式的唯一ID（基于时间戳）
    print(pbottleRPA.uniqid())
    # 生成带自定义前缀的唯一ID
    print(pbottleRPA.uniqid("myPrefix_"))
    # 生成带额外随机性的唯一ID
    print(pbottleRPA.uniqid("", True))
    pbottleRPA.wait(1)

    # 数字字符串检测演示
    print("--- 检测变量是否为数字化 isNumeric ---")
    # 检测各种类型数据是否为数字
    print("isNumeric(10):       ", pbottleRPA.isNumeric(10))         # 检测整数: True
    print('isNumeric("10"):     ', pbottleRPA.isNumeric("10"))       # 检测数字字符串: True
    print('isNumeric("10.5"):   ', pbottleRPA.isNumeric("10.5"))     # 检测小数字符串: True
    print('isNumeric("abc"):    ', pbottleRPA.isNumeric("abc"))      # 检测非数字字符串: False
    print("isNumeric(None):     ", pbottleRPA.isNumeric(None))        # 检测None: False (JS为null)
    pbottleRPA.wait(1)

        # 变量是否包含数据检测演示
    print("--- 变量是否包含数据测试 hasData ---")
    # 检测各种类型数据是否包含有效数据
    print("hasData(None):              ", pbottleRPA.hasData(None))           # None等价于JS的undefined: False
    print("hasData([]):                ", pbottleRPA.hasData([]))             # 检测空列表: False
    print("hasData({}):                ", pbottleRPA.hasData({}))             # 检测空字典: False (JS为空对象)
    print("hasData(0):                 ", pbottleRPA.hasData(0))              # 检测数字0: False
    print('hasData(""):                ', pbottleRPA.hasData(""))             # 检测空字符串: False
    print('hasData("   "):             ', pbottleRPA.hasData("   "))          # 检测空格字符串: False
    print("hasData(False):             ", pbottleRPA.hasData(False))          # 检测布尔值False: False
    print("---------------------------")
    print("hasData(3.14):              ", pbottleRPA.hasData(3.14))           # 检测非零小数: True
    print('hasData("小瓶RPA "):        ', pbottleRPA.hasData("小瓶RPA "))      # 检测非空字符串: True
    print("hasData([12,5]):            ", pbottleRPA.hasData([12, 5]))        # 检测非空列表: True
    print('hasData({"pbottle":666}):   ', pbottleRPA.hasData({"pbottle": 666}))  # 检测非空字典: True
    pbottleRPA.wait(1)

    # 文本截取演示
    # 定义要处理的字符串
    str_val = "小瓶RPA官网是 https://www.pbottle.com 输入浏览器即可访问官网"
    print("--- 文本截取测试 ---", str_val)
    # 从字符串中截取指定标记之间的内容（从"官网是"到"输入"之间的内容）
    sub_str = pbottleRPA.substringFromTo(str_val, "官网是", "输入")
    print("截取结果:", sub_str)
    pbottleRPA.wait(1)

    # 模拟资源管理器的文件搜索演示
    print("--- 模拟资源管理器的文件搜索 searchFile ---")
    # 在指定目录中搜索指定扩展名的文件
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    rs = pbottleRPA.searchFile(base_dir, ".png", True)  # 在项目根目录搜索.png文件，包含子目录
    print("当前目录搜索.png文件:", rs)


if __name__ == "__main__":
    main()
