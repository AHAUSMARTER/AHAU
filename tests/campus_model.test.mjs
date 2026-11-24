import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const source = readFileSync(new URL('../campus_model.js', import.meta.url), 'utf8');
function client(hostname, fetch, stored = 'test-key-not-real') {
  const events = [];
  const storage = { getItem: () => stored, removeItem() {}, setItem() {} };
  const window = { dispatchEvent(event) { events.push(event.detail); }, addEventListener() {} };
  vm.runInNewContext(source, { window, location: { hostname }, sessionStorage: storage,
    localStorage: storage, fetch, AbortController, setTimeout, clearTimeout,
    CustomEvent: class { constructor(name, { detail }) { this.detail = detail; } } });
  return { client: window.CampusModel, events };
}
const answer = text => ({ ok: true, json: async () => ({ choices: [{ message: { content: text } }] }) });
test('GitHub uses school directly with authorization and complete chat context', async () => {
  let calls = 0;
  const { client: api } = client('ahausmarter.github.io', async (url, options) => {
    calls++;
    assert.equal(url, 'https://llmv1.ahau.edu.cn/v1/chat/completions');
    assert.equal(options.headers.Authorization, 'Bearer test-key-not-real');
    assert.equal(options.redirect, 'error');
    assert.equal(options.credentials, 'omit');
    const payload = JSON.parse(options.body);
    assert.equal(payload.model, 'Deepseek-V4.1-Flash-SS');
    assert.equal(payload.stream, false);
    assert.equal(payload.messages.length, 3);
    return answer('real model response');
  });
  assert.equal(await api.request([{ role: 'system', content: 'system' }, { role: 'assistant', content: 'prior' }, { role: 'user', content: 'new' }]), 'real model response');
  assert.equal(calls, 1); assert.equal(api.status.connected, true);
});
test('diagnosis sends corrected OCR text and diagnosis limits to school', async () => {
  const { client: api } = client('ahausmarter.github.io', async (_, options) => {
    const payload = JSON.parse(options.body);
    assert.equal(payload.messages.at(-1).content, 'f(x) = 2x + 3');
    assert.equal(payload.max_tokens, 3500);
    return answer('solution');
  });
  assert.equal(await api.request([{ role: 'user', content: 'f(x) = 2x + 3' }], { purpose: 'diagnosis', maxTokens: 3500 }), 'solution');
});
test('local backend remains usable without a browser key', async () => {
  const { client: api } = client('localhost', async (url, options) => {
    assert.equal(url, 'api/anau/deepseek_diagnose');
    assert.equal(options.headers.Authorization, undefined);
    return { ok: true, json: async () => ({ success: true, markdown: 'backend solution' }) };
  }, '');
  assert.equal(await api.request([{ role: 'user', content: 'question' }], { purpose: 'diagnosis' }), 'backend solution');
});
test('failed local backend falls back to school direct', async () => {
  const calls = [];
  const { client: api } = client('localhost', async url => {
    calls.push(url);
    return calls.length === 1 ? { ok: false } : answer('fallback success');
  });
  assert.equal(await api.request([{ role: 'user', content: 'question' }]), 'fallback success');
  assert.equal(calls.length, 2);
});
for (const code of [401, 403, 429, 503]) test(`HTTP ${code} is visible without exposing keys or raw upstream errors`, async () => {
  const { client: api } = client('ahausmarter.github.io', async () => ({ ok: false, status: code }));
  await assert.rejects(api.request([{ role: 'user', content: 'question' }]), error => error.message.includes(String(code)) && !error.message.includes('test-key'));
  assert.equal(api.status.connected, false);
});
test('browser/CORS failure is not misreported as proven absence of campus network', async () => {
  const { client: api } = client('ahausmarter.github.io', async () => { throw new TypeError('Failed to fetch'); });
  await assert.rejects(api.request([]), /不一定表示未连校园网/);
});
test('empty completion is not model success', async () => {
  const { client: api } = client('ahausmarter.github.io', async () => answer('  '));
  await assert.rejects(api.request([]), /没有返回解析正文/);
  assert.equal(api.status.connected, false);
});
test('direct requests abort at deadline and report timeout', async () => {
  const { client: api } = client('ahausmarter.github.io', (_, options) => new Promise((resolve, reject) => {
    options.signal.addEventListener('abort', () => { const error = new Error('aborted'); error.name = 'AbortError'; reject(error); });
  }));
  await assert.rejects(api.request([], { timeoutMs: 5 }), /响应超时/);
});
