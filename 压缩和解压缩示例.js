/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的压缩和解压缩功能
 * 通过这个示例，您可以学习如何在自动化流程中处理文件压缩和解压操作
 */

const pbottleRPA = require('./pbottleRPA')     // 引入小瓶RPA的核心库，获得对RPA功能的访问权限
const fs = require("fs");                     // 引入Node.js文件系统模块，用于检测文件是否存在

pbottleRPA.log('压缩文件测试')                 // 在日志中输出当前操作说明

// 使用zipDir函数将指定目录压缩为ZIP文件
// 参数1：要压缩的源目录路径（input目录）
// 参数2：压缩后生成的ZIP文件路径和名称
pbottleRPA.zipDir(pbottleRPA.__dirname+'/input', pbottleRPA.__dirname+'/目标压缩包.zip')
pbottleRPA.wait(2)                            // 等待2秒钟确保压缩完成

console.log('监测压缩结果');                  // 在控制台输出检测压缩结果的信息

// 检查压缩后的ZIP文件是否存在
if (!fs.existsSync(pbottleRPA.__dirname+'/目标压缩包.zip')) {
    pbottleRPA.exit('未检测到，退出！~')      // 如果文件不存在，则退出脚本并输出提示信息
}

console.log('解压文件测试')                   // 在控制台输出解压测试的信息

// 使用unZip函数解压ZIP文件到指定目录
// 参数1：要解压的ZIP文件路径
// 参数2：解压后的目标目录路径
pbottleRPA.unZip(pbottleRPA.__dirname+'/目标压缩包.zip', pbottleRPA.__dirname+'/解压目录/')

console.log('压缩测试完成：正在打开目录');     // 在控制台输出测试完成信息

// 打开当前脚本所在目录，方便用户查看压缩和解压结果
pbottleRPA.openDir(pbottleRPA.__dirname)