"""
小瓶RPA演示demo，具体api请查看*流程开发文档*
官网：https://rpa.pbottle.com/
流程开发文档：https://rpa.pbottle.com/docs/
"""

import sys
import os
import platform
import json
import time

# 添加父目录到路径以导入pbottleRPA
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pbottleRPA as rpa

# 尝试导入openpyxl库
try:
    import openpyxl
    from openpyxl.styles import Font
except ImportError:
    rpa.showMsg("请先安装第三方模块", "运行: pip install openpyxl")
    rpa.tts("请先安装第三方模块" + "运行: pip install openpyxl")
    rpa.exit("请先安装第三方模块" + "运行: pip install openpyxl")


def excel_append(filename, line=None):
    """
    Excel 文件追加一行数据

    Args:
        filename (str): 文件绝对路径
        line (list): 行数据
    """
    if line is None:
        line = []
    print("excel追加行", filename, line)

    # 读取excel
    workbook = openpyxl.load_workbook(filename)
    sheet = workbook.active

    # excel 重新追加一行记录到已有的excel文件末尾
    sheet.append(line)

    # 保存
    workbook.save(filename)


print("=== Excel 读写测试 ===")
print(rpa.getTime())
rpa.tts("Excel 读写测试")
rpa.wait(3)
rpa.tts("将当前电脑配置信息生成EXCEL文件")
rpa.wait(5)

# 生成excel文档
workbook = openpyxl.Workbook()
sheet = workbook.active
sheet.title = "pbottleRPA"

# 添加表头
sheet.append(["项", "值"])

# 设置第一行粗体
for cell in sheet[1]:
    cell.font = Font(bold=True)

# 设置列宽
sheet.column_dimensions["A"].width = 30
sheet.column_dimensions["B"].width = 60

# 添加数据行
sheet.append(
    [
        "时间",
        rpa.getTime(),
    ]
)
sheet.append(
    [
        "显示器分辨率",
        json.dumps(rpa.getResolution()),
    ]
)
sheet.append(
    [
        "CPU",
        platform.processor() or "Unknown",
    ]
)

# 保存文件
excel_path = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Excel测试表格.xlsx"
)
workbook.save(excel_path)
rpa.tts("已经生成EXCEL测试表格...请查看")
rpa.openDir(os.path.dirname(excel_path))

# 追加一条数据
excel_append(excel_path, ["项名", "重新追加值"])
rpa.wait(5)

# 读取excel
workbook2 = openpyxl.load_workbook(excel_path)
sheet2 = workbook2.active

# 获取所有数据
values = []
for row in sheet2.iter_rows(values_only=True):
    values.append(row)
print(values)
rpa.tts("已经读取EXCEL测试表格到日志")


if __name__ == "__main__":
    pass
