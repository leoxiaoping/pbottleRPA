import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "PbottleRPA Documentation",
    description: "Pbottle RPA - Professional RPA software for professional users. Lightweight, simple, and versatile RPA software with enhanced browser automation, significantly reducing costs & improving efficiency with 100% accuracy & non-intrusive integration. Supports automation of both browser web applications and client applications, with both JS and Python scripting.",
    lang: 'en',
    lastUpdated: true,
    base: '/docs/',
    // outDir: './html',
    locales: {
        root: {
            label: 'English',
            lang: 'en'
        },
        en: {
            label: '中文',
            lang: 'zh-hans', // Optional, will be added as `lang` attribute to `html` tag
            link: 'https://rpa.pbottle.com/docs/' // Default /en/ -- shown in the nav translation menu, can be external
        }
    },

    sitemap: {
        hostname: 'https://officetool.online/pbottle-rpa/docs/'
    },
    head: [
        ['link', { rel: 'shortcut icon', href: '/rpa.ico', type: 'image/x-icon' }],
        ['meta', { name: 'keywords', content: 'Pbottle RPA, Professional RPA, Documentation, Process Documentation, Official Docs, RPA Docs, Robotic Process Automation Documentation' }],
    //     ['script', { type: 'text/javascript' }, `
    //     var _hmt = _hmt || [];
    //       (function() {
    //           var hm = document.createElement("script");
    //           hm.src = "https://hm.baidu.com/hm.js?4f28c271b56a4be165f2b8200a58c47c";
    //           var s = document.getElementsByTagName("script")[0];
    //           s.parentNode.insertBefore(hm, s);
    //       })();
    //   `
    //     ],
        ['script', {
            async:'async',
            crossorigin:"anonymous",
            src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8054907953581959",
          }
        ],
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        docFooter: {
            prev: 'Previous page',
            next: 'Next page'
        },
        darkModeSwitchLabel: 'Appearance',
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Menu',
        outline: { label: 'On this page', level: [2, 6] },

        nav: [
            { text: 'User Guide', link: '/' },
            { text: 'API Reference', link: '/API鼠标操作' },
            { text: 'Download', link: 'https://officetool.online/pbottle-rpa/' },
        ],


        sidebar: [
            {
                text: 'User Guide',
                items: [
                    { text: 'Getting Started', link: '/index' },
                    { text: 'Demos 🔥', link: '/Demo示例' },
                    // { text: 'Video Tutorials', link: '/视频教程' },
                    { text: 'JS Script Development', link: '/用 js 脚本开发自动化流程' },
                    { text: 'Python Script Development', link: '/用 python 脚本开发自动化流程' },
                    // { text: 'Chinese API', link: '/中文调用' },
                    // { text: 'AI Script Generation 🔥', link: '/AI生成流程脚本' },
                    { text: 'Flow Running Logs', link: '/流程运行日志' },
                    { text: 'Scheduled Start', link: '/定时启动' },
                    { text: 'Auto-start on Boot', link: '/开机启动' },
                    { text: 'Process Recording', link: '/流程录制' },
                    { text: 'Hotkeys & Shortcuts', link: '/热键和快捷方式' },
                    { text: 'Mobile Automation', link: '/手机应用的自动化' },
                    { text: 'Windows 7 OS', link: '/win7操作系统' },
                    // { text: 'Xinchuang OS 🔥', link: '/信创操作系统' },
                    { text: 'Q&A', link: '/‌Q&A' },
                ]
            },

            {
                text: 'API Reference',
                items: [
                    { text: 'API Specification', link: '/API统一规范' },
                    { text: 'Mouse Simulation', link: '/API鼠标操作' },
                    { text: 'Keyboard Simulation', link: '/API键盘操作' },
                    { text: 'System & File', link: '/API系统相关' },
                    { text: 'Screen', link: '/API屏幕' },
                    { text: 'Audio', link: '/API声音' },
                    { text: 'Network', link: '/API网络' },
                    { text: 'Compression', link: '/API压缩解压' },
                    { text: 'User Input', link: '/API用户输入' },
                    { text: 'Utils', link: '/API通用工具' },
                    { text: 'AI Vision (Local)', link: '/APIAI图像' },
                    { text: 'AI LLM (Cloud)', link: '/APIAI大模型' },
                    { text: 'Browser Enhancement 🔥', link: '/API浏览器增强' },
                    { text: 'Office Documents', link: '/API办公文档' },
                    { text: 'External Control', link: '/API外部控制' },
                    { text: 'HID Hardware Simulation', link: '/API键鼠硬模拟' },
                    { text: 'Others (Database, Excel, etc.)', link: '/其他功能模块' },

                ]
            },

            {
                text: 'Advanced Guide',
                items: [
                    { text: 'Process Configuration', link: '/流程配置项' },
                    { text: 'CAPTCHA Automation', link: '/验证码自动化' },
                    { text: 'Low-end PCs', link: '/老旧低配电脑' },
                    { text: 'Desktop Shortcuts', link: '/桌面快捷方式' },
                    { text: 'HTTP Static Server', link: '/HTTP静态服务' },
                    { text: 'Endless Mode', link: '/无尽模式' },
                    { text: 'Hardware Input Simulation', link: '/硬件键鼠模拟' },
                    { text: 'Cluster Control Center 🔥', link: '/集群控制中心' },
                    { text: 'SaaS System Automation', link: '/SaaS系统自动化任务' },

                ]
            },

            // {
            //     text: 'Other Services',
            //     items: [
            //         { text: 'ERP System', link: '/业务管理系统' },
            //         { text: 'Custom Software Development', link: '/专用自动化独立软件' },
            //     ]
            // }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/leoxiaoping/pbottleRPA' },
            { icon: 'gitee', link: 'https://gitee.com/pbottle/pbottle-rpa' },
        ],


        editLink: {
            pattern: 'https://github.com/leoxiaoping/pbottleRPA/tree/English/docs/:path',
            text: 'Edit this page'
        },


        footer: {
            message: `⭐⭐⭐⭐⭐`,
            copyright: 'Copyright © 2019-present pbottle'
        }

    }
})
