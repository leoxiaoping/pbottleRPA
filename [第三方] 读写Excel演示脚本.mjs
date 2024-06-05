/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

import pbottleRPA from "./pbottleRPA.js";  //必须含 .js 后缀
import os from "os";
import ExcelJS  from "exceljs";  // 中文文档： https://gitee.com/mirrors/exceljs ；所有序号从1开始和excel序号保持一致 👍



console.log("=== Excel 读写测试 ===");
console.log(Date());
pbottleRPA.tts('Excel 读写测试')



pbottleRPA.tts(`将当前电脑配置信息生成EXCEL文件`)
pbottleRPA.sleep(1000*5)


//生成excel文档
const workbook = new ExcelJS.Workbook()
const sheet = workbook.addWorksheet('pbottleRPA')
sheet.addRow(['项', '值'])
sheet.getRow(1).font = {bold:true}  //第一行粗体
sheet.getColumn(1).width = 30;  //列宽
sheet.getColumn(2).width = 60;
sheet.addRows([
    [
        '时间',
        pbottleRPA.getTime(),
    ],
    [
        '显示器分辨率',
        JSON.stringify(pbottleRPA.getResolution()),
    ],
    [
        'CPU',
        os.cpus()[0].model,
    ],
])
await workbook.xlsx.writeFile(`./Excel测试表格.xlsx`)
pbottleRPA.tts(`已经生成EXCEL测试表格...请查看 `)
pbottleRPA.openDir(pbottleRPA.__dirname)
pbottleRPA.sleep(1000*5)




//读取excel
const workbook2 = new ExcelJS.Workbook();
await workbook2.xlsx.readFile(`./Excel测试表格.xlsx`);
let sheet2 = workbook2.getWorksheet(1)
console.log(sheet2.getSheetValues());
pbottleRPA.tts(`已经读取EXCEL测试表格到日志 `)
pbottleRPA.sleep(1000*5)


//excel 重新追加一行记录到已有的excel文件末尾
sheet2.addRow(['项名','重新追加值'])
sheet2.addRow(['项名','重新追加值2'])
workbook2.addWorksheet('追加新表单')
await workbook2.xlsx.writeFile(`./Excel测试表格.xlsx`) //保存
console.log('--文件重新追加数据完成--');
pbottleRPA.tts('文件重新追加数据完成')
