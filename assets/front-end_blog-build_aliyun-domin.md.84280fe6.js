import{o as e,c as a,b as t}from"./app.b9b9da67.js";const i='{"title":"阿里云域名","description":"阿里云域名购买、解析、使用详细教程","frontmatter":{"title":"阿里云域名","head":[["meta",{"name":"description","content":"阿里云域名购买、解析、使用详细教程"}],["meta",{"name":"keywords","content":"阿里云 域名 解析 备案 CNAME"}]]},"headers":[{"level":2,"title":"为什么用域名？","slug":"为什么用域名？"},{"level":2,"title":"阿里云域名流程","slug":"阿里云域名流程"},{"level":3,"title":"购买域名","slug":"购买域名"},{"level":3,"title":"备案","slug":"备案"},{"level":3,"title":"创建CNAME文件","slug":"创建cname文件"},{"level":3,"title":"github pages","slug":"github-pages"},{"level":3,"title":"域名解析","slug":"域名解析"}],"relativePath":"front-end/blog-build/aliyun-domin.md","lastUpdated":1628663299614}',d={},h=[t('<h2 id="为什么用域名？"><a class="header-anchor" href="#为什么用域名？" aria-hidden="true">#</a> 为什么用域名？</h2><p>哈，当然是为了日后可以搭建后端框架啊。先学习学习😄</p><h2 id="阿里云域名流程"><a class="header-anchor" href="#阿里云域名流程" aria-hidden="true">#</a> 阿里云域名流程</h2><h3 id="购买域名"><a class="header-anchor" href="#购买域名" aria-hidden="true">#</a> 购买域名</h3><p>没啥好说，先来个套餐（域名+ECS云服务器）</p><h3 id="备案"><a class="header-anchor" href="#备案" aria-hidden="true">#</a> 备案</h3><p>阿里云控制台上有备案选项。我的域名记得备案了一周😔</p><h3 id="创建cname文件"><a class="header-anchor" href="#创建cname文件" aria-hidden="true">#</a> 创建CNAME文件</h3><p>项目根目录下创建CNAME文件，文件内容为你的域名，比如我的就是<code>qiyoe.cn</code></p><h3 id="github-pages"><a class="header-anchor" href="#github-pages" aria-hidden="true">#</a> github pages</h3><p>如果上面步骤成功，pages则会出现以下内容</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>√ Your site is published at <code>https://qiyoe.cn/</code></p></div><h3 id="域名解析"><a class="header-anchor" href="#域名解析" aria-hidden="true">#</a> 域名解析</h3><p>打开<code>域名控制台</code>，选择域名<code>解析</code>，添加记录值</p><p>1、设置主机记录www，记录类型为A，记录值是IP。其中IP是Github Pages服务器指定的IP地址，访问该IP地址即表示访问Github Pages。</p><p>2、设置主机记录www，记录类型为A，记录值是IP。同上。</p><p>3、设置主机记录@，记录类型为CNAME，记录值是<code>Github-Name.github.io.</code>。表示将<code>https://xxx.com</code>这个主域名映射<code>xxx.github.io</code>。<br> 注意在这里千万不要忘记记录值中.io后面还有一个点.！</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>域名解析得花个一两天吧（反正我的是）</p></div>',18)];d.render=function(t,i,d,s,l,c){return e(),a("div",null,h)};export{i as __pageData,d as default};
