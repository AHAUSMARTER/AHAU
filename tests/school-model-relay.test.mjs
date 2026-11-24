import test from 'node:test';
import assert from 'node:assert/strict';
import relay from '../deployment/map-proxy/school-model.mjs';
const env = { SCHOOL_MODEL_KEY: 'private-test-key' };
function request(body, origin = 'https://ahausmarter.github.io') {
  return new Request('https://example.netlify.app/model/chat', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}
test('missing key fails closed', async () => {
  assert.equal((await relay(request({}), {}, 'a')).status, 503);
});
test('other origins cannot use relay', async () => {
  assert.equal((await relay(request({}, 'https://unrelated.example'), env, 'b')).status, 403);
});
test('unbounded/malformed messages do not call school', async () => {
  const resp = await relay(request({ messages: [{ role: 'tool', content: 'x' }] }), env, 'c', () => assert.fail('invalid message sent upstream'));
  assert.equal(resp.status, 400);
});
test('fixed destination, model and output cap; no secret leaks', async () => {
  const response = await relay(request({ messages: [{ role: 'user', content: 'question' }], model: 'untrusted-model', max_tokens: 100000 }), env, 'd', async (url, options) => {
    assert.equal(url, 'https://llmv1.ahau.edu.cn/v1/chat/completions');
    assert.equal(options.headers.Authorization, 'Bearer private-test-key');
    const data = JSON.parse(options.body);
    assert.equal(data.model, 'Deepseek-V4.1-Flash-SS'); assert.equal(data.max_tokens, 1500);
    return Response.json({ choices: [{ message: { content: 'answer private-test-key' } }] });
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).content, 'answer [redacted]');
});
test('network health never sends credentials or claims authenticated inference', async () => {
  const response = await relay(new Request('https://example.netlify.app/model/health'), env, 'e', async (_, options) => {
    assert.equal(options.headers, undefined); return new Response('blocked', { status: 503 });
  });
  const data = await response.json(); assert.equal(data.upstream_status, 503); assert.equal(data.reachability, 'unconfirmed');
  assert.equal(JSON.stringify(data).includes(env.SCHOOL_MODEL_KEY), false);
});
