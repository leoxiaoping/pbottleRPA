/**
 * PBottle RPA demo – please refer to the *process development documentation* for API details.
 * Official website: https://rpa.pbottle.com/
 * Process development documentation: https://rpa.pbottle.com/docs/
 * 
 * Feature description: This script demonstrates how to use RPA to automatically like WeChat Moments posts.
 * It uses image recognition technology to locate UI elements, enabling automated social interactions.
 */

const pbottleRPA = require('./pbottleRPA')     // Import the core PBottle RPA library to access RPA functionality

pbottleRPA.showMsg('The process has started', 'Please turn on your computer sound and pay attention to the running log information.')

pbottleRPA.tts('Preparing to run the batch like script for WeChat Moments. Please log in to WeChat first.')
pbottleRPA.wait(7)

let screenRes = pbottleRPA.getResolution()
pbottleRPA.log('Current screen resolution:', screenRes)

if (screenRes.ratio !== 1) {
    pbottleRPA.tts('Warning: This demo only supports non‑scaled screens.')
    pbottleRPA.showMsg('Warning: This demo only supports non‑scaled screens.')
    pbottleRPA.log('⚠ Warning: This demo only supports non‑scaled screens.')
    pbottleRPA.wait(6)
    pbottleRPA.exit()
}

let color1 = pbottleRPA.getScreenColor(1, screenRes.h - 1);
pbottleRPA.log('System taskbar color:', color1);

pbottleRPA.keyTap('ctrl+alt+w')

// Wait for the target image to appear; timeout is 120 seconds, during which the user is prompted to open the WeChat main window
let position = pbottleRPA.waitImage(['./input/pengYouQuanDianZan/0.png', './input/pengYouQuanDianZan/01.png'], () => {
    pbottleRPA.log('Waiting... Please open the PC version of WeChat first.');
}, 120)

// Open WeChat Moments
pbottleRPA.moveAndClick(position.x, position.y);
pbottleRPA.moveMouse(screenRes.w / 2, screenRes.h / 2);

let counter = 0;
function repeat() {
    pbottleRPA.log('Entering the loop...')
    let result = pbottleRPA.findScreen(['./input/pengYouQuanDianZan/1.png', './input/pengYouQuanDianZan/11.png'], 0.99, 100, 100)

    if (result === false) {
        pbottleRPA.log('Next page')
        pbottleRPA.mouseWheel()
        pbottleRPA.wait(0.5)
        repeat()
    } else {
        pbottleRPA.moveAndClick(result.x, result.y);
        pbottleRPA.wait(0.1)
        
        pbottleRPA.moveAndClick(result.x - 167, result.y);
        counter += 1

        if (counter >= 1000) {
            pbottleRPA.exit('1000 likes are enough, don\'t overdo it! ~')
        }
        pbottleRPA.wait(0.1)
        repeat()
    }
}

repeat()