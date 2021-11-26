const pbottleRPA = require('./pbottleRPA')


pbottleRPA.tts('准备开始运行 朋友圈批量点赞脚本')
pbottleRPA.sleep(1000*6)


//输入路径中不要有自定义中文  
let rs =  pbottleRPA.findScreen('./input/pengYouQuanDianZan/0.png')
if (rs === false) {
    pbottleRPA.tts('没有检测到微信界面，请先打开电脑版微信')
    pbottleRPA.sleep(1000*6)
    process.exit(1)
}


//打开微信朋友圈
pbottleRPA.moveMouseSmooth(rs.x,rs.y,0);
pbottleRPA.mouseClick()


//开始任务

loop()
function loop() {
    console.log('进入')

    let rs =  pbottleRPA.findScreen('./input/pengYouQuanDianZan/1.png',0.99)
    if (rs === false) {
        console.log('下一页')
        pbottleRPA.keyTap('page down')
        loop()
        
    }else{
        pbottleRPA.moveMouseSmooth(rs.x,rs.y,0);
        pbottleRPA.mouseClick()

        pbottleRPA.sleep(500)

        pbottleRPA.moveMouseSmooth(rs.x-167,rs.y,0);
        pbottleRPA.mouseClick()


        pbottleRPA.sleep(500)
        loop()
    }


}
