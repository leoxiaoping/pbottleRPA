/**
 * PBottle RPA demo, please refer to the *process development documentation* for API details
 * Official website: https://officetool.online/pbottle-rpa/
 * Process development documentation: https://officetool.online/pbottle-rpa/docs/
 */

import pbottleRPA from "./pbottleRPA.js";  // must include .js extension
import os from 'node:os'
let ExcelJS   // import ExcelJS from "exceljs"
try {
    const { default: myExcelJS } = await import('exceljs') // Chinese documentation: https://gitee.com/mirrors/exceljs ; All indices start from 1, consistent with Excel numbering 👍
    ExcelJS = myExcelJS
} catch {
    pbottleRPA.showMsg('Please install third-party modules first', 'Double-click [Install modules.bat]')
    pbottleRPA.tts('Please install third-party modules first. Double-click [Install modules.bat]')
    pbottleRPA.exit('Please install third-party modules first. Double-click [Install modules.bat]')
}


console.log("=== Excel Read/Write Test ===");
console.log(Date());
pbottleRPA.tts('Excel Read/Write Test')
pbottleRPA.wait(3)
pbottleRPA.tts('Generate an Excel file with current computer configuration information')
pbottleRPA.wait(5)

// Generate Excel document
const workbook = new ExcelJS.Workbook()
const sheet = workbook.addWorksheet('pbottleRPA')
sheet.addRow(['Item', 'Value'])
sheet.getRow(1).font = { bold: true }  // Bold first row
sheet.getColumn(1).width = 30;  // Column width
sheet.getColumn(2).width = 60;
sheet.addRows([
    [
        'Time',
        pbottleRPA.getTime(),
    ],
    [
        'Display Resolution',
        JSON.stringify(pbottleRPA.getResolution()),
    ],
    [
        'CPU',
        os.cpus()[0].model,
    ],
])
await workbook.xlsx.writeFile(`./Excel_test_spreadsheet.xlsx`)
pbottleRPA.tts('Excel test spreadsheet generated. Please check.')
pbottleRPA.openDir(pbottleRPA.__dirname)





// Append a row of data
await excelAppend(pbottleRPA.__dirname + `/Excel_test_spreadsheet.xlsx`, ['Item name', 'New appended value'])   // All async methods (returning promise) should use await to execute sequentially
pbottleRPA.wait(5)




// Read Excel
const workbook2 = new ExcelJS.Workbook();
await workbook2.xlsx.readFile(`./Excel_test_spreadsheet.xlsx`);
let sheet2 = workbook2.getWorksheet(1)
console.log(sheet2.getSheetValues());
pbottleRPA.tts('Excel test spreadsheet has been read and logged.')




/**
 * Append a row of data to an Excel file
 * @param {string} filename Absolute file path
 * @param {[]} line Row data
 */
async function excelAppend(filename, line = []) {
    console.log('Append row to Excel', filename, line);
    // Read Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filename);
    let sheet2 = workbook.getWorksheet(1)
    // Append a new row to the end of the existing Excel file
    sheet2.addRow(line)
    await workbook.xlsx.writeFile(filename) // Save
}