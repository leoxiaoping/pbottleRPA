import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "小瓶 RPA 官方文档",
    description: "小瓶RPA，专业用户的专业RPA软件。轻量级简单全能的RPA软件，浏览器自动化增强，显著降本增效 & 工作100%准确 & 非侵入式集成。同时支持浏览器web应用和客户端应用的操作流程自动化。同时支持 Js 和 Python 两种脚本制作流程。",
    lang: 'zh-Hans',
    lastUpdated: true,
    base: '/docs/',
    // outDir: './html',
    locales: {
        root: {
            label: '中文',
            lang: 'zh-Hans'
        },
        en: {
            label: 'English',
            lang: 'en', // 可选，将作为 `lang` 属性添加到 `html` 标签中
            link: 'https://officetool.online/pbottle-rpa/docs' // 默认 /en/ -- 显示在导航栏翻译菜单上，可以是外部的
        }
    },

    sitemap: {
        hostname: 'https://rpa.pbottle.com/docs/'
    },
    head: [
        ['link', { rel: 'shortcut icon', href: '/rpa.ico', type: 'image/x-icon' }],
        ['meta', { name: 'keywords', content: '小瓶RPA, 专业RPA, 文档, 流程文档, 官方文档, RPA文档 ,机器人流程自动化文档' }],
        ['script', { type: 'text/javascript' }, `
        var _hmt = _hmt || [];
          (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?4f28c271b56a4be165f2b8200a58c47c";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
          })();
      `
        ],
        // ['script', {
        //     async:'async',
        //     crossorigin:"anonymous",
        //     src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8054907953581959",
        //   }
        // ],
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        docFooter: {// 文章翻页
            prev: '上一篇',
            next: '下一篇'
        },
        darkModeSwitchLabel: '外观',    // 移动端 - 外观
        returnToTopLabel: '返回顶部',    // 移动端 - 返回顶部
        sidebarMenuLabel: '菜单',    // 移动端 - menu
        outline: { label: '本页大纲', level: [2, 6] },

        nav: [
            { text: '使用指南', link: '/' },
            { text: '功能模块API', link: '/API鼠标操作' },
            { text: '官网下载', link: 'https://rpa.pbottle.com/' },
            { text: '在线客服', link: 'https://yun.pbottle.com/kefu.php' },
            { text: '技术交流群', link: 'https://gitee.com/pbottle/pbottle-rpa/raw/master/input/discuss.jpg' },
        ],


        sidebar: [
            {
                text: '使用指南',
                items: [
                    { text: '开始', link: '/index' },
                    { text: 'Demo示例', link: '/Demo示例' },
                    { text: '视频教程', link: '/视频教程' },
                    { text: '用 js 脚本开发自动化流程', link: '/用 js 脚本开发自动化流程' },
                    { text: '用 python 脚本开发自动化流程', link: '/用 python 脚本开发自动化流程' },
                    { text: '中文调用', link: '/中文调用' },
                    { text: 'AI生成流程脚本 🔥', link: '/AI生成流程脚本' },
                    { text: '流程运行日志', link: '/流程运行日志' },
                    { text: '定时启动', link: '/定时启动' },
                    { text: '开机启动', link: '/开机启动' },
                    { text: '流程录制', link: '/流程录制' },
                    { text: '热键和快捷方式', link: '/热键和快捷方式' },
                    { text: '手机应用的自动化', link: '/手机应用的自动化' },
                    { text: 'win7 操作系统', link: '/win7操作系统' },
                    { text: '信创操作系统 🔥', link: '/信创操作系统' },
                    { text: '‌Q&A 常见问答', link: '/‌Q&A' },
                ]
            },

            {
                text: '功能模块API',
                items: [
                    { text: '统一规范', link: '/API统一规范' },
                    { text: '鼠标操作模拟', link: '/API鼠标操作' },
                    { text: '键盘操作模拟', link: '/API键盘操作' },
                    { text: '系统 & 文件', link: '/API系统相关' },
                    { text: '屏幕画面', link: '/API屏幕' },
                    { text: '声音', link: '/API声音' },
                    { text: '网络', link: '/API网络' },
                    { text: '压缩解压', link: '/API压缩解压' },
                    { text: '用户输入', link: '/API用户输入' },
                    { text: '通用工具 Utils', link: '/API通用工具' },
                    { text: 'AI图像（本地）', link: '/APIAI图像' },
                    { text: 'AI大模型（云模块）', link: '/APIAI大模型' },
                    { text: '浏览器增强 🔥', link: '/API浏览器增强' },
                    { text: '办公文档', link: '/API办公文档' },
                    { text: '外部控制', link: '/API外部控制' },
                    { text: '键鼠硬模拟 hid', link: '/API键鼠硬模拟' },
                    { text: '其他（数据库、Excel等）', link: '/其他功能模块' },

                ]
            },

            {
                text: '高级指南',
                items: [
                    { text: '流程配置项', link: '/流程配置项' },
                    { text: '验证码自动化', link: '/验证码自动化' },
                    { text: '老旧低配电脑', link: '/老旧低配电脑' },
                    { text: '桌面快捷方式', link: '/桌面快捷方式' },
                    { text: 'HTTP静态服务', link: '/HTTP静态服务' },
                    { text: '无尽模式', link: '/无尽模式' },
                    { text: '硬件级键鼠模拟', link: '/硬件键鼠模拟' },
                    { text: '集群控制中心 🔥', link: '/集群控制中心' },
                    { text: 'SaaS系统自动化能力', link: '/SaaS系统自动化任务' },
                    { text: '小瓶OCR独立增强版 🔥', link: '/OCRplus' },

                ]
            },

            {
                text: '其他开发服务',
                items: [
                    { text: '业务管理系统（ERP）', link: '/业务管理系统' },
                    { text: '独立软件定制', link: '/专用自动化独立软件' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'gitee', link: 'https://gitee.com/pbottle/pbottle-rpa' },
            { icon: 'github', link: 'https://github.com/leoxiaoping/pbottleRPA' }
        ],


        editLink: {
            pattern: 'https://gitee.com/pbottle/pbottle-rpa/tree/master/docs/:path',
            text: '编辑本页内容'
        },


        footer: {
            message: `⭐⭐⭐⭐⭐`,
            copyright: 'Copyright © 2019-present 小瓶科技'
        }

    }
})
