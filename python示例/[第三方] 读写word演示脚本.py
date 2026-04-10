"""
小瓶 RPA 演示 demo，具体 api 请查看*流程开发文档*
官网：https://rpa.pbottle.com/
流程开发文档：https://rpa.pbottle.com/docs/
"""

import sys
import os
import time

# 添加父目录到路径以导入 pbottleRPA
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pbottleRPA as rpa

# 尝试导入 python-docx 和 mammoth 库
try:
    from docx import Document
    from docx.shared import Pt
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    import mammoth
except ImportError:
    rpa.showMsg("请先安装第三方模块", "运行：pip install python-docx mammoth")
    rpa.tts("请先安装第三方模块" + "运行：pip install python-docx mammoth")
    rpa.exit("请先安装第三方模块" + "运行：pip install python-docx mammoth")


print("=== Word 后台读写测试 ===")
print(rpa.getTime())
rpa.tts("Word 后台读写测试")
rpa.wait(3)
rpa.tts("将后台生成 Word 文件")
rpa.wait(5)

# 生成 Word 文档
doc = Document()

# 添加标题段落
heading = doc.add_heading("标题文字", level=1)
heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = heading.runs[0]
run.bold = True
run.font.size = Pt(20)

# 添加普通段落
p = doc.add_paragraph()
run1 = p.add_run("小瓶 RPA 官网：")
run1.font.size = Pt(12)

# 添加链接样式的文本
hyperlink_run = p.add_run("https://rpa.pbottle.com")
hyperlink_run.font.size = Pt(12)
hyperlink_run.font.underline = True

# 添加更多示例内容
doc.add_paragraph()
doc.add_paragraph("这是一个 Python 版本的 Word 读写演示。")
doc.add_paragraph("小瓶 RPA 支持多种自动化操作，包括：")
doc.add_paragraph("• 鼠标键盘操作", style="List Bullet")
doc.add_paragraph("• 图像识别", style="List Bullet")
doc.add_paragraph("• AI 能力集成", style="List Bullet")
doc.add_paragraph("• 文件操作", style="List Bullet")

# 保存文件
word_path = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Word测试文档.docx"
)
doc.save(word_path)
rpa.openDir(os.path.dirname(word_path))
rpa.tts("已经生成 Word测试文档...请查看")
rpa.wait(3)

# 读取 Word 文档
rpa.tts("将后台读取 Word 文件 显示到日志")
rpa.wait(3)

# 使用 mammoth 读取文本内容
with open(word_path, "rb") as f:
    result = mammoth.extract_raw_text(f)
    print("读取 Word 文档内容：", result.value)

rpa.tts("已经读取 Word测试文档到日志")
rpa.wait(2)


if __name__ == "__main__":
    pass
