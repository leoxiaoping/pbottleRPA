/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

import pbottleRPA from "./pbottleRPA.js";  //必须含 .js 后缀
import fs from 'node:fs'
let mammoth
let docx
try {
	mammoth = await import('mammoth')  // import mammoth  from "mammoth"
    docx = await import('docx')   // import docx  from "docx"
} catch {
    pbottleRPA.showMsg('请先安装第三方模块','双击【第三方 模块安装.bat】')
    pbottleRPA.tts('请先安装第三方模块' + '双击【第三方 模块安装.bat】')
	pbottleRPA.exit('请先安装第三方模块' + '双击【第三方 模块安装.bat】')
}



console.log("=== word 后台读写测试 ===");
console.log(Date());
pbottleRPA.tts('word 后台读写测试')
pbottleRPA.sleep(1000*3)
pbottleRPA.tts(`将后台生成 word 文件`)
pbottleRPA.sleep(1000*5)

//生成 word 文档  更多例子：https://gitee.com/mirrors_dolanmiu/docx/tree/master/demo
const doc = new docx.Document({
    sections: [
        {
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: "标题文字",
                            bold: true,
                            size: 40,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: "小瓶RPA官网：",
                        }),
                        new docx.ExternalHyperlink({
                            children: [
                                new docx.TextRun({
                                    text: "https://rpa.pbottle.com",
                                    style: "Hyperlink",
                                }),
                            ],
                            link: "https://rpa.pbottle.com",
                        }),
                    ],
                }),
            ],
        },
    ],
});

let buffer = await docx.Packer.toBuffer(doc);
fs.writeFileSync("word测试文档.docx", buffer);
pbottleRPA.openDir(pbottleRPA.__dirname)



//读取word文档
pbottleRPA.tts(`将后台读取 word 文件 显示到日志`)
pbottleRPA.sleep(1000*3)
let rs = await mammoth.extractRawText({path:"./word测试文档.docx"})
console.log('读取word文档内容：',rs.value);



