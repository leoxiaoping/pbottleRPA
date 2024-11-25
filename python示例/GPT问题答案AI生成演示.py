"""

小瓶RPA python版本（Beta）
https://gitee.com/pbottle/pbottle-rpa
示例

"""

import pbottleRPA  #引入小瓶RPA模块

asks = [
    '鲁迅为什么要打周树人？',
    '给我随便作一首诗吧',
    '你是谁？',
]

for index,ask in enumerate(asks):
    
    print(f'问题 {index+1}：',ask);
    pbottleRPA.tts(ask)

    rs = pbottleRPA.cloud_GPT(ask)
    pbottleRPA.log('云端 AI 生成答案:',rs['content'])
    pbottleRPA.log('------------')
    pbottleRPA.log()


# end