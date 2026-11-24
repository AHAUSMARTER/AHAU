import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { protectMath } = require('../diagnosis_render.js');
const katex = require('../lib/katex/katex.min.js');
const marked = require('../lib/marked.min.js');
test('all four delimiters survive Markdown with the exact TeX intact', () => {
  const result = protectMath(String.raw`行内 \(\alpha_i^2\) 与 $\beta$，独立 \[\frac{1}{x}\] 和 $$\int_0^1 x\,dx$$`);
  assert.deepEqual(result.formulas.map(item=>item.tex), [String.raw`\alpha_i^2`,String.raw`\beta`,String.raw`\frac{1}{x}`,String.raw`\int_0^1 x\,dx`]);
  assert.deepEqual(result.formulas.map(item=>item.display), [false,false,true,true]);
  const html = marked.parse(result.markdown);
  for(let i=0;i<4;i++) assert.ok(html.includes(result.prefix+i+'END'));
  for(const formula of result.formulas) assert.ok(katex.renderToString(formula.tex,{trust:false}).includes('katex'));
});
test('matrix row separators, underscores and alignment are not consumed as Markdown', () => {
  const tex = String.raw`A=\begin{pmatrix}a_1 & b_1\\a_2 & b_2\end{pmatrix}`;
  const result = protectMath('\\['+tex+'\\]');
  assert.equal(result.formulas[0].tex, tex);
  assert.ok(katex.renderToString(tex).includes('mtable'));
});
test('bare Greek commands recover without altering code, URLs or division', () => {
  // A literal inline code span is constructed separately to avoid JS template escaping ambiguity.
  const result = protectMath(String.raw`\alpha 和 /beta，访问 https://example.com/alpha，计算 x/alpha。代码：`+'`\\alpha`');
  assert.match(result.markdown,/α 和 β/);
  assert.ok(result.markdown.includes('https://example.com/alpha'));
  assert.ok(result.markdown.includes('x/alpha'));
  assert.ok(result.markdown.includes('`\\alpha`'));
});
test('fenced code stays literal, never becomes a mathematical expression', () => {
  const input = '```text\n\\(\\alpha\\) $x$\n```\n\\(\\beta\\)';
  const result = protectMath(input);
  assert.equal(result.formulas.length,1);
  assert.equal(result.formulas[0].tex,'\\beta');
  assert.ok(result.markdown.startsWith('```text\n\\(\\alpha\\) $x$'));
});
test('invalid formulas remain detectable, not silently rewritten', () => {
  const result = protectMath(String.raw`\(\frac{1}{\)`);
  assert.equal(result.formulas[0].source, String.raw`\(\frac{1}{\)`);
  assert.throws(()=>katex.renderToString(result.formulas[0].tex,{throwOnError:true}));
});
test('unsafe TeX HTML extensions are not trusted', () => {
  const html = katex.renderToString(String.raw`\href{javascript:alert(1)}{x}`,{trust:false,throwOnError:false});
  assert.equal(html.includes('href="javascript:'),false);
});
