const pbottleRPA = require('./pbottleRPA')



pbottleRPA.tts('准备开始运行朋友圈批量点赞脚本，适配1920分辨率屏幕')
pbottleRPA.sleep(1000*7)



//输入路径中不要有自定义中文  
let rs =  pbottleRPA.findScreen('./input/pengYouQuanDianZan/0.png')
if (rs === false) {
    pbottleRPA.tts('没有检测到微信界面，请先打开电脑版微信')
    pbottleRPA.sleep(1000*6)
    process.exit(1)
}


//打开微信朋友圈
pbottleRPA.moveMouseSmooth(rs.x,rs.y);
pbottleRPA.mouseClick()
pbottleRPA.moveMouseSmooth(1920/2,1080/2);

//点赞计数
let n = 0;

//开始任务
loop()
function loop() {
    console.log('进入')

    let rs =  pbottleRPA.findScreen('./input/pengYouQuanDianZan/1.png',0.99)
    if (rs === false) {
        console.log('下一页')
        // pbottleRPA.keyTap('page down')    //微信bug，按键容易加载不成功
        pbottleRPA.mouseWheel()
        pbottleRPA.sleep(500)
        loop()

    }else{

        pbottleRPA.moveMouseSmooth(rs.x,rs.y,0);
        pbottleRPA.mouseClick()

        pbottleRPA.sleep(100)

        pbottleRPA.moveMouseSmooth(rs.x-167,rs.y,0);
        pbottleRPA.mouseClick()

        //点1000个赞就行了，不要贪杯
        n++;
        if (n>=1000) {
            process.exit(0)
        }

        pbottleRPA.sleep(100)
        loop()
    }


}
