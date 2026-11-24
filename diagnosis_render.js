/* Protect TeX before Markdown consumes its backslashes, then render a safe document. */
(function (root) {
  'use strict';
  const greek = { alpha:'α',beta:'β',gamma:'γ',delta:'δ',epsilon:'ε',varepsilon:'ε',theta:'θ',vartheta:'ϑ',lambda:'λ',mu:'μ',nu:'ν',xi:'ξ',pi:'π',rho:'ρ',sigma:'σ',tau:'τ',phi:'φ',varphi:'φ',chi:'χ',psi:'ψ',omega:'ω',Gamma:'Γ',Delta:'Δ',Theta:'Θ',Lambda:'Λ',Xi:'Ξ',Pi:'Π',Sigma:'Σ',Phi:'Φ',Psi:'Ψ',Omega:'Ω' };
  function protectMath(markdown) {
    const prefix = 'ANAUMATH' + Math.random().toString(36).slice(2).toUpperCase() + 'TOKEN';
    const formulas = [];
    const patterns = /```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`|\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|(?<!\\)\$(?!\s|\$)(?:\\.|[^$\\\n])+?\$/g;
    const greekPattern = new RegExp('(^|[\\s（(，,：:])(?:\\\\|/)(' + Object.keys(greek).sort((a,b)=>b.length-a.length).join('|') + ')(?![A-Za-z])','g');
    const text = String(markdown).replace(patterns, value => {
      if (value.startsWith('`') || value.startsWith('~~~')) return value;
      const display = value.startsWith('$$') || value.startsWith('\\[');
      const length = value.startsWith('$') && !display ? 1 : 2;
      const formula = { tex: value.slice(length,-length), display, source: value };
      const token = prefix + formulas.length + 'END';
      formulas.push(formula); return token;
    });
    // Recover isolated Greek commands only; never rewrite divisions or URLs.
    // Apply outside code spans/fences so code examples remain literal.
    const normalized = text.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g)
      .map((part,index) => index % 2 ? part : part.replace(greekPattern, (_,lead,name) => lead + greek[name])).join('');
    return { markdown: normalized, prefix, formulas };
  }
  function safeMarkdown(text, document, marked) {
    const content = document.createElement('div');
    if (!marked?.parse) { content.textContent = text; content.style.whiteSpace = 'pre-wrap'; return content; }
    const template = document.createElement('template'); template.innerHTML = marked.parse(text);
    const allowed = new Set('P H1 H2 H3 H4 H5 H6 BR OL UL LI BLOCKQUOTE CODE PRE B STRONG I EM TABLE THEAD TBODY TR TD TH HR DEL'.split(' '));
    function append(target, source) {
      for (const child of source.childNodes) {
        if (child.nodeType === 3) target.append(document.createTextNode(child.textContent));
        else if (child.nodeType === 1 && allowed.has(child.tagName)) {
          const node = document.createElement(child.tagName); append(node,child); target.append(node);
        } else if (child.nodeType === 1 && child.tagName === 'A') append(target,child);
      }
    }
    append(content,template.content); return content;
  }
  function renderContent(markdown, { document, marked, katex }) {
    const protectedText = protectMath(markdown);
    const content = safeMarkdown(protectedText.markdown,document,marked);
    const walker = document.createTreeWalker(content,4);
    const texts = []; while (walker.nextNode()) texts.push(walker.currentNode);
    const matcher = new RegExp(protectedText.prefix + '(\\d+)END','g');
    for (const node of texts) {
      if (!node.textContent.includes(protectedText.prefix)) continue;
      const fragment = document.createDocumentFragment(); let end = 0;
      for (const match of node.textContent.matchAll(matcher)) {
        fragment.append(document.createTextNode(node.textContent.slice(end,match.index)));
        const formula = protectedText.formulas[Number(match[1])];
        const span = document.createElement('span'); span.className = formula.display ? 'solution-math-block' : 'solution-math-inline';
        if (formula.display) { span.tabIndex = 0; span.setAttribute('role','group'); span.setAttribute('aria-label','公式，可左右滚动'); }
        try {
          if (!katex?.render) throw new Error('math component missing');
          katex.render(formula.tex,span,{ displayMode:formula.display,throwOnError:true,trust:false,strict:'ignore',maxExpand:1000,maxSize:20 });
        } catch {
          span.className += ' formula-fallback'; span.textContent = formula.source;
          span.setAttribute('title','这段公式暂时无法排版，保留原文');
        }
        fragment.append(span); end = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(node.textContent.slice(end))); node.replaceWith(fragment);
    }
    content.querySelectorAll('table').forEach(table => {
      const wrapper = document.createElement('div'); wrapper.className = 'solution-table'; wrapper.tabIndex = 0;
      wrapper.setAttribute('aria-label','表格，可左右滚动'); table.replaceWith(wrapper); wrapper.append(table);
    });
    return content;
  }
  function buildReport(markdown, options) {
    const { document } = options;
    const content = renderContent(markdown,options);
    const article = document.createElement('article'); article.className = 'solution-document';
    const headings = [...content.children].filter(node => /^H[1-6]$/.test(node.tagName));
    const rank = headings.length ? Math.min(...headings.map(node => Number(node.tagName[1]))) : 2;
    let section;
    function addSection(heading) {
      section = document.createElement('section'); section.className = 'solution-section';
      const title = document.createElement('h2');
      if (heading) {
        while (heading.firstChild) title.append(heading.firstChild);
        // Remove only decorative emoji from heading text, preserving formula nodes.
        for (const child of title.childNodes) if (child.nodeType === 3) child.textContent = child.textContent.replace(/\p{Extended_Pictographic}\uFE0F?/gu,'').trimStart();
      } else title.textContent = '解题过程';
      if (/最终答案|标准答案|严谨结论/.test(title.textContent)) section.classList.add('solution-section-final');
      section.append(title); article.append(section);
    }
    for (const node of [...content.childNodes]) {
      if (node.nodeType === 3 && !node.textContent.trim()) continue;
      if (node.nodeType === 1 && node.tagName === 'HR') continue;
      if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName) && Number(node.tagName[1]) === rank) addSection(node);
      else {
        if (!section) addSection();
        if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName)) {
          const heading = document.createElement('h3'); while(node.firstChild) heading.append(node.firstChild); section.append(heading);
        } else section.append(node);
      }
    }
    return article;
  }
  const api = { protectMath, renderContent, buildReport };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DiagnosisRender = api;
})(typeof window === 'undefined' ? globalThis : window);
