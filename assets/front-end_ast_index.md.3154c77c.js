import{o as n,c as s,b as a}from"./app.eba5ed30.js";const t='{"title":"AST详解","description":"AST详解","frontmatter":{"title":"AST详解","head":[["meta",{"name":"description","content":"AST详解"}],["meta",{"name":"keywords","content":"AST AST详解"}]]},"headers":[{"level":2,"title":"前言","slug":"前言"},{"level":2,"title":"为什么要谈AST（抽象语法树）?","slug":"为什么要谈ast（抽象语法树）"},{"level":2,"title":"什么是AST（抽象语法树）？","slug":"什么是ast（抽象语法树）？"},{"level":2,"title":"想要学习更多关于编译器的知识？","slug":"想要学习更多关于编译器的知识？"},{"level":3,"title":"想要自己创建门编程语言？","slug":"想要自己创建门编程语言？"},{"level":2,"title":"我能直接用三方库来生成AST吗？","slug":"我能直接用三方库来生成ast吗？"}],"relativePath":"front-end/ast/index.md","lastUpdated":1628499996684}',p={},o=a('<h2 id="前言"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><ul><li><a href="https://github.com/CodeLittlePrince/blog/issues/19" target="_blank" rel="noopener noreferrer">AST中文译文</a></li><li><a href="https://itnext.io/ast-for-javascript-developers-3e79aeb08343" target="_blank" rel="noopener noreferrer">AST英文原文</a></li></ul><h2 id="为什么要谈ast（抽象语法树）"><a class="header-anchor" href="#为什么要谈ast（抽象语法树）" aria-hidden="true">#</a> 为什么要谈AST（抽象语法树）?</h2><p>如果你查看目前任何主流的项目中的<code>devDependencie</code>，会发现前些年的不计其数的插件诞生。我们归纳一下有：javascript转译、代码压缩、css预处理器、elint、pretiier，等。有很多js模块我们不会在生产环境用到，但是它们在我们的开发过程中充当着重要的角色。所有的上述工具，不管怎样，都建立在了AST这个巨人的肩膀上。</p><p>我们定一个小目标，从解释什么是AST开始，然后到怎么从一般代码开始去构建它。我们将简单地接触在AST处理基础上，一些最流行的使用例子和工具。并且，我计划谈下我的js2flowchart项目，它是一个不错的利用AST的demo。OK，让我们开始吧。</p><h2 id="什么是ast（抽象语法树）？"><a class="header-anchor" href="#什么是ast（抽象语法树）？" aria-hidden="true">#</a> 什么是AST（抽象语法树）？</h2><blockquote><p>它是一种分层的程序表示形式，根据编程语言的语法来表示源代码结构，每个AST节点对应于源代码的一个项。</p></blockquote><p>估计很多同学，看完这段官方的定义一脸懵逼。OK，我们来看例子：</p><p>实际上，正真AST每个节点会有更多的信息。但是，这是大体思想。从纯文本中，我们将得到树形结构的数据。每个条目和树中的节点一一对应。</p><p>那怎么从纯文本中得到AST呢？哇哦，我们知道当下的编译器都做了这件事情。那我们就看看一般的编译器怎么做的就可以了。</p><p>想做一款编译器是个比较消耗发量的事情，但幸运的是，我们无需贯穿编译器的所有知识点，最后将高级语言转译为二进制代码。我们只需要关注词法分析和语法分析。这两步是从代码中生成AST的关键所在。</p><p>第一步，词法分析，也叫做扫描scanner。它读取我们的代码，然后把它们按照预定的规则合并成一个个的标识tokens。同时，它会移除空白符，注释，等。最后，整个代码将被分割进一个tokens列表（或者说一维数组）。</p><div class="language-js"><pre><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class="token comment">// [{value: &#39;const&#39;, type: &#39;keyword&#39;}, {value: &#39;a&#39;, type: &#39;identifier&#39;}, ...]</span>\n</code></pre></div><p>当词法分析源代码的时候，它会一个一个字母地读取代码，所以很形象地称之为扫描-scans；当它遇到空格，操作符，或者特殊符号的时候，它会认为一个话已经完成了。</p><p>第二步，语法分析，也叫解析器。它会将词法分析出来的数组转化成树形的表达形式。同时，验证语法，语法如果有错的话，抛出语法错误。</p><div class="language-js"><pre><code><span class="token comment">// [{value: &#39;const&#39;, type: &#39;keyword&#39;}, {value: &#39;a&#39;, type: &#39;identifier&#39;}, ...]</span>\n\n<span class="token comment">// {&quot;type&quot;: &quot;VariableDeclarator&quot;, &quot;id&quot;: {&quot;type&quot;: &quot;Identifier&quot;, &quot;name&quot;: &quot;a&quot;...}}</span>\n</code></pre></div><p>当生成树的时候，解析器会删除一些没必要的标识tokens（比如不完整的括号），因此AST不是100%与源码匹配的，但是已经能让我们知道如何处理了。说个题外话，解析器100%覆盖所有代码结构生成树叫做CST（具体语法树）</p><div class="language-js"><pre><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>  <span class="token comment">// -&gt; Lexical analyzer -&gt; Syntax analyzer -&gt;</span>\n\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;VariableDeclarator&quot;</span><span class="token punctuation">,</span>\n  <span class="token string">&quot;declarations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n    <span class="token string">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;VariableDeclarator&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;kind&quot;</span><span class="token operator">:</span> <span class="token string">&quot;const&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Identifier&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;a&quot;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;init&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Literal&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">5</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="想要学习更多关于编译器的知识？"><a class="header-anchor" href="#想要学习更多关于编译器的知识？" aria-hidden="true">#</a> 想要学习更多关于编译器的知识？</h2><p><a href="./the-super-tiny-compiler.html">the-super-tiny-compiler</a>，一个贼好的项目。大概200来行代码，几乎每行都有注释。</p><h3 id="想要自己创建门编程语言？"><a class="header-anchor" href="#想要自己创建门编程语言？" aria-hidden="true">#</a> 想要自己创建门编程语言？</h3><p><a href="https://github.com/ftomassetti/LangSandbox" target="_blank" rel="noopener noreferrer">LangSandbox</a>，一个更好的项目。它演示了如何创造一门编程语言。当然，设计编程语言这样的书市面上也一坨坨。所以，这项目上一个相比更加深入，与<a href="https://github.com/jamiebuilds/the-super-tiny-compiler" target="_blank" rel="noopener noreferrer">the-super-tiny-compiler</a>的项目将Lisp转为C语言不同，这个项目你可以写一个你自己的语言，并且将它编译成C语言或者机器语言，最后运行它。</p><h2 id="我能直接用三方库来生成ast吗？"><a class="header-anchor" href="#我能直接用三方库来生成ast吗？" aria-hidden="true">#</a> 我能直接用三方库来生成AST吗？</h2><p>当然可以！有一坨坨的三方库可以用。你可以访问<a href="https://astexplorer.net/" target="_blank" rel="noopener noreferrer">astexplorer</a>，然后挑你喜欢的库。<a href="https://astexplorer.net/" target="_blank" rel="noopener noreferrer">astexplorer</a>是一个很棒的网站，你可以在线玩转AST，而且除了js，还有很多其它语言的AST库。</p><p>我不得不强调一款我觉得很棒的三方库，叫做babylon。</p><p>它被用在大名鼎鼎的babel中，也许这也是它之所以这么火的原因。因为有babel项目的支持，我们可以意料到它将与时俱进，一直支持最新的JS特性，因此可以放心大胆地用，不怕以后JS又出新版导致代码的大规模重构。另外，它的API也非常的简单，容易使用。</p><p>Ok，现在你知道怎么将代码生成AST了，让我们继续，来看看现实中的用例。</p><p>第一个用例，我想谈谈代码转化，没错，就是那个货，babel。</p><blockquote><p>Babel is not a ‘tool for having ES6 support’. Well, it is, but it is far not only what it is about.</p></blockquote><p>经常把beble和支持es6/7/8联系起来，实际上，这也是我们经常用它的原因。但是，它仅仅是一组插件。我们也可以使用它来压缩代码，react相关语法转译（如jsx），flow插件等。</p><p>babel是一个javascript编译器。宏观来说，它分3个阶段运行代码：解析（parsing），转译（transforming），生成（generation）。我们可以给babel 一些javascript代码，它修改代码然后生成新的代码返回。那它是怎样修改代码的呢？没错！它创建了AST，遍历树，修改tokens，最后从AST中生成新的代码。</p><p>我们来从下面的demo中看下这个过程：</p><table><thead><tr><th>解析</th><th>AST转译</th><th>生成</th><th>end</th></tr></thead><tbody><tr><td><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> babylon <span class="token keyword">from</span> <span class="token string">&quot;babylon&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token string">&quot;const abc = 5;&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> ast <span class="token operator">=</span> babylon<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span>\n\n\n</code></pre></div></td><td><div class="language-js"><pre><code><span class="token keyword">import</span> traverse <span class="token keyword">from</span> <span class="token string">&quot;babel-traverse&quot;</span><span class="token punctuation">;</span>\n<span class="token function">traverse</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token function">enter</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span>node<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&quot;Identifier&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      path<span class="token punctuation">.</span>node<span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div></td><td><div class="language-js"><pre><code><span class="token keyword">import</span> generate <span class="token keyword">from</span> <span class="token string">&quot;babel-generator&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> newCode <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>ast<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//console.log(newCode)</span>\n\n\n</code></pre></div></td><td><div class="language-js"><pre><code><span class="token keyword">const</span> cba <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>\n\n\n\n\n\n\n</code></pre></div></td></tr></tbody></table><p>像我之前提到的，babel使用babylon，所以，首先，我们解析代码成AST，然后遍历AST，再反转所有的变量名，最后生成代码。完成！正如我们看到的，第一步（解析）和第三步（生成）看起来很常规，我们每次都会做这两步。所以，babel接管处理了它俩。最后，我们最为关心的，那就是AST转译这一步了。</p><p>当我们开发babel-plugin的时候，我们只需要描述转化你AST的节点“visitors”就可以了。</p><div class="language-js"><pre><code><span class="token comment">// your-plugin.js</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    vistor<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token function">Identifiter</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> name <span class="token operator">=</span> path<span class="token punctuation">.</span>node<span class="token punctuation">.</span>name<span class="token punctuation">;</span>\n        path<span class="token punctuation">.</span>node<span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>如果你想要学习怎么创建你的第一个babel-plugin，可以查看<a href="https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md" target="_blank" rel="noopener noreferrer">Babel-handbook</a></p><p>让我们继续，下一个用例，我想提到的是自动代码重构工具，以及神器JSCodeshift。</p><p>比如说你想要替换掉所有的老掉牙的匿名函数，把他们变成Lambda表达式（箭头函数）。</p><table><tbody><tr><td><div class="language-js"><pre><code><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> response<span class="token punctuation">.</span>data<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div></td><td><div class="language-js"><pre><code><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=&gt;</span> response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n</code></pre></div></td></tr></tbody></table><p>你的代码编辑器很可能没法这么做，因为这并不是简单地查找替换操作。这时候jscodeshift就登场了。</p><p>如果你听过<code>jscodeshift</code>，你很可能也听过<code>codemods</code>，一开始听这两个词可能很困惑，不过没关系，接下来就解释。<code>jscodeshift</code>是一个跑<code>codemods</code>的工具。<code>codemod</code>是一段描述AST要转化成什么样的代码，这思想和babel的插件如出一辙。</p><div class="language-js"><pre><code><span class="token comment">// myTransforms.js</span>\n\n<span class="token comment">/**\n * This replaces every occurrence of variable &quot;foo&quot;\n */</span>\nmodule<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">fileOnfo<span class="token punctuation">,</span> api</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> api<span class="token punctuation">.</span><span class="token function">jscodeshift</span><span class="token punctuation">(</span>fileInfo<span class="token punctuation">,</span>source<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">findVariableDeclarators</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">renameTo</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">toSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">//&gt;</span>\n$ jscodeshift <span class="token operator">-</span>t myTransforms fileA\n</code></pre></div><p>所以，如果你想创建自动把你的代码从旧的框架迁移到新的框架，这就是一种很nice的方式。举个例子，react 16的prop-types重构。</p><p>有很多不同的codemodes已经创建了，你可以保存你需要的，以免手动的修改一坨坨代码，拿去挥霍吧：</p><p><a href="https://github.com/facebook/jscodeshift" target="_blank" rel="noopener noreferrer">https://github.com/facebook/jscodeshift</a></p><p><a href="https://github.com/reactjs/react-codemod" target="_blank" rel="noopener noreferrer">https://github.com/reactjs/react-codemod</a></p><p>最后一个用例，我想要提到Prettier，因为可能每个码农都在日常工作中用到它。</p><table><tbody><tr><td><div class="language-js"><pre><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token function">reallyLongArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">omgSoManyParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token function">IShouldRefactorThis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">isThereseriouslyAnotherOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n\n\n</code></pre></div></td><td><div class="language-js"><pre><code><span class="token function">foo</span><span class="token punctuation">(</span>\n  <span class="token function">reallyLongArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">omgSoManyParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">IShouldRefactorThis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token function">isThereseriouslyAnotherOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div></td></tr></tbody></table><p>Prettier 格式化我们的代码。它调整长句，整理空格，括号等。所以它将代码作为输入，修改后的代码作为输出。听起来很熟悉是吗？当然！</p><p>思路还是一样。首先，将代码生成AST。之后依然是处理AST，最后生成代码。但是，中间过程其实并不像它看起来那么简单。</p><p>文章迎来尾声，我们继续，今天最后一件事，我想提及的就是我的库，叫做<code>js2flowchart</code>(4.5 k stars 在 Github)。</p><p>这是一个很好的例子，因为它向你展现了你，当你拥有AST时，可以做任何你想要做的事。把AST转回成字符串代码并不是必要的，你可以通过它画一个流程图，或者其它你想要的东西。</p><p>js2flowchart使用场景是什么呢？通过流程图，你可以解释你的代码，或者给你代码写文档；通过可视化的解释学习其他人的代码；通过简单的js语法，为每个处理过程简单的描述创建流程图。</p><p>马上用最简单的方式尝试一下吧，去线上编辑看看 <a href="https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html" target="_blank" rel="noopener noreferrer">js-code-to-svg-flowchart</a></p><p>你也可以在代码中使用它，或者通过CLI，你只需要指向你想生成SVG的文件就行。而且，还有VS Code插件（链接在项目readme中）</p><p>那么，它还能做什么呢？哇哦，我这里就不废话了，大家有兴趣直接看这个项目的文档吧。</p><p>OK，那它是如何工作的呢？</p><p>首先，解析代码成AST，然后，我们遍历AST并且生成另一颗树，我称之为工作流树。它删除很多不重要的额tokens，但是将关键块放在一起，如函数、循环、条件等。再之后，我们遍历工作流树并且创建形状树。每个形状树的节点包含可视化类型、位置、在树中的连接等信息。最后一步，我们遍历所有的形状，生成对应的SVG，合并所有的SVG到一个文件中。</p>',59);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export{t as __pageData,p as default};
