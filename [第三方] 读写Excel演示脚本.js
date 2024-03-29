/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://gitee.com/pbottle/pbottle-rpa/wikis/pages
 */

const pbottleRPA = require('./pbottleRPA')
const fs = require('fs')
const os = require('os')
if (!fs.existsSync('./node_modules/node-xlsx')) {
    pbottleRPA.showMsg('Excel模块未安装',"请先运行 “[第三方模块安装].bat” 安装模块 ")
    pbottleRPA.tts("请先双击运行 [第三方模块安装]  安装所需模块 ")
    pbottleRPA.exit('错误：excel模块未安装' + "请先运行 “[第三方] 模块安装.bat” 安装模块 ")
}
const xlsx = require("node-xlsx");

console.log("=== Excel 读写测试 ===");
console.log(Date());

pbottleRPA.tts('Excel 读写测试')
//延迟5秒
pbottleRPA.sleep(1000*5)



pbottleRPA.tts(`将当前电脑配置信息生成EXCEL文件`)
pbottleRPA.sleep(1000*5)


//写入excel
const data = [
    ['项', '值'],
];

//加一行
data.push([
    '时间',
    Date().toString(),
])


//加一行
// console.log(pbottleRPA.getResolution())
data.push([
    '显示器分辨率',
    JSON.stringify(pbottleRPA.getResolution()),
])

//加一行
data.push([
    'CPU',
    os.cpus()[0].model,
])

const sheetOptions = {'!cols': [{wch: 15}, {wch: 50}]};  //自定义格式列宽
let buffer = xlsx.build([{name: '系统信息表', data: data}],{sheetOptions}); // Returns a buffer
fs.writeFileSync(`${__dirname}\\Excel测试表格.xlsx`,buffer);


pbottleRPA.tts(`已经生成EXCEL测试表格...请查看 `)
pbottleRPA.openDir(__dirname)
pbottleRPA.sleep(1000*5)


//读取excel
const workSheetsFromFile = xlsx.parse(`${__dirname}\\Excel测试表格.xlsx`);
const sheet = workSheetsFromFile[0].data;
console.log(sheet);

pbottleRPA.tts(`读取生成EXCEL文件内容，并写入运行日志... `)
pbottleRPA.sleep(1000*5)


pbottleRPA.tts('演示结束')
console.log('演示结束');
pbottleRPA.showMsg('演示结束','请查看运行日志')