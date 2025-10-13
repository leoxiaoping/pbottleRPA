import{_ as n,c as a,a0 as p,o as e}from"./chunks/framework.P9qPzDnn.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"更多三方功能和拓展.md","filePath":"更多三方功能和拓展.md","lastUpdated":1742369216000}'),t={name:"更多三方功能和拓展.md"};function l(o,s,r,i,c,d){return e(),a("div",null,s[0]||(s[0]=[p(`<p>--小瓶RPA兼容所有 nodejs生态</p><p>nodejs 文档：<a href="https://nodejs.org/docs/latest-v16.x/api/" target="_blank" rel="noreferrer">https://nodejs.org/docs/latest-v16.x/api/</a></p><p>npm 第三方功能库：<a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">https://www.npmjs.com/</a></p><p><strong>任何传统编程能够实现的功能模块，都能整合进入我们的小瓶RPA自动化流程。</strong> 比如：文件处理、数据库操作、邮件发送等</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//引入小瓶RPA功能</span></span>
<span class="line"><span>const pbottleRPA = require(&#39;./pbottleRPA&#39;)</span></span>
<span class="line"><span>//引入第三方mysql连接功能   事先执行命令：npm install mysql</span></span>
<span class="line"><span>const mysql      = require(&#39;mysql&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var connection = mysql.createConnection({</span></span>
<span class="line"><span>  host     : &#39;localhost&#39;,</span></span>
<span class="line"><span>  user     : &#39;root&#39;,</span></span>
<span class="line"><span>  password : &#39;123456&#39;,</span></span>
<span class="line"><span>  database : &#39;test&#39;</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>connection.connect();</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>connection.query(&#39;SELECT 1 + 1 AS solution&#39;, function (error, results, fields) {</span></span>
<span class="line"><span>  if (error) throw error;</span></span>
<span class="line"><span>  console.log(&#39;The solution is: &#39;, results[0].solution);</span></span>
<span class="line"><span>  //使用小瓶RPA api接口</span></span>
<span class="line"><span>  pbottleRPA.tts(&quot;mysql 获取数量为：&quot; + results[0].solution)</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>--联系小瓶RPA客服</p><p><img src="https://foruda.gitee.com/images/1673232317114810920/31188334_799608.png" alt="输入图片说明" title="小瓶RPA客服"></p>`,7)]))}const _=n(t,[["render",l]]);export{u as __pageData,_ as default};
