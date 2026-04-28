/**
 * PBottle RPA demo, please refer to the *process development documentation* for API details
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 */

import pbottleRPA from "./pbottleRPA.js";  // must include .js extension
import fs from 'node:fs'
let mammoth
let docx
try {
    mammoth = await import('mammoth')  // import mammoth from "mammoth"
    docx = await import('docx')   // import docx from "docx"
} catch {
    pbottleRPA.showMsg('Please install third-party modules first', 'Double-click [Install modules.bat]')
    pbottleRPA.tts('Please install third-party modules first. Double-click [Install modules.bat]')
    pbottleRPA.exit('Please install third-party modules first. Double-click [Install modules.bat]')
}



console.log("=== Word Background Read/Write Test ===");
console.log(Date());
pbottleRPA.tts('Word Background Read/Write Test')
pbottleRPA.wait(3)
pbottleRPA.tts('Generating a Word document in the background')
pbottleRPA.wait(5)

// Generate a Word document. More examples: https://gitee.com/mirrors_dolanmiu/docx/tree/master/demo
const doc = new docx.Document({
    sections: [
        {
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: "Title Text",
                            bold: true,
                            size: 40,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: "PBottle RPA official website: ",
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
fs.writeFileSync("Word_test_document.docx", buffer);
pbottleRPA.openDir(pbottleRPA.__dirname)



// Read Word document
pbottleRPA.tts('Reading the Word document in the background and displaying content in the log')
pbottleRPA.wait(3)
let rs = await mammoth.extractRawText({ path: "./Word_test_document.docx" })
console.log('Word document content:', rs.value);