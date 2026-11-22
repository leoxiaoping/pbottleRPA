/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 */

import pbottleRPA from "./pbottleRPA.js";  //必须含 .js 后缀
import os from 'node:os'
let ExcelJS   // import ExcelJS  from "exceljs"
try {
	const {default:myExcelJS} = await import('exceljs') // 中文文档： https://gitee.com/mirrors/exceljs ；所有序号从1开始和excel序号保持一致 👍
    ExcelJS=myExcelJS
} catch {
    pbottleRPA.showMsg('请先安装第三方模块','双击【第三方 模块安装.bat】')
    pbottleRPA.tts('请先安装第三方模块' + '双击【第三方 模块安装.bat】')
	pbottleRPA.exit('请先安装第三方模块' + '双击【第三方 模块安装.bat】')
}


console.log("=== Excel 读写测试 ===");
console.log(Date());
pbottleRPA.tts('Excel 读写测试')
pbottleRPA.wait(3)
pbottleRPA.tts(`将当前电脑配置信息生成EXCEL文件`)
pbottleRPA.wait(5)

//生成excel文档，写excel推荐 ExcelJS ，支持大文件流，不支持xls旧格式
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





//追加一条数据
await excelAppend(pbottleRPA.__dirname + `/Excel测试表格.xlsx`, ['项名','重新追加值'])   //所有异步方法（async 返回 promise），都用 await 以形成顺序执行的流程
pbottleRPA.wait(5)




//读取excel 推荐用 xlsx 可以同时支持 xls 和 xlsx 格式，json 格式更友好
// const xlsx = require('xlsx')  //commonjs 
const { default: xlsx } = await import('xlsx')
const workbook0 = xlsx.readFile(pbottleRPA.__dirname + `/Excel测试表格.xlsx`)
const sheet0 = workbook0.Sheets[workbook0.SheetNames[0]]
const data = xlsx.utils.sheet_to_json(sheet0,{range:0,raw:false})  //header:1 表示二维数组
console.log('读取Excel:',data)

/**
 * Excel 文件追加一行数据
 * @param {string} filename 文件绝对路径
 * @param {[]} line 行数据
 */
async function excelAppend(filename,line=[]) {
    console.log('excel追加行',filename,line);
    //读取excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filename);
    let sheet2 = workbook.getWorksheet(1)
    //excel 重新追加一行记录到已有的excel文件末尾
    sheet2.addRow(line)
    await workbook.xlsx.writeFile(filename) //保存
}