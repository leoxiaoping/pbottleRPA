/**
 * 小瓶RPA演示demo，具体api请查看*流程开发文档*
 * 官网：https://rpa.pbottle.com/
 * 流程开发文档：https://rpa.pbottle.com/docs/
 * 
 * 功能说明：此脚本演示了RPA中的电子邮件Email消息通知功能
 * 通过这个示例，您可以学习如何在自动化流程中集成电子邮件Email通知功能，实现远程监控和告警
 */

const pbottleRPA = require('./pbottleRPA')

console.log("=== 电子邮件Email消息通知测试 ===")
console.log(Date())

let to = pbottleRPA.waitInput('输入接收邮箱（测试邮件）')

// 发送邮件 - 异步执行
pbottleRPA.sendMail(to, '小瓶RPA测试邮件', '测试邮件内容\n小瓶RPA官网：https://rpa.pbottle.com/ \n'+ Date())
    .then(console.log)
    .catch(console.error)
