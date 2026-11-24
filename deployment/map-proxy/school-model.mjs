// Fixed school-only relay. Browser config may disclose the Key only under the explicit competition-sharing flag; never log it.
const TARGET = 'https://llmv1.ahau.edu.cn/v1/chat/completions';
const MODEL = 'Deepseek-V4.1-Flash-SS';
const ORIGINS = new Set(['https://ahausmarter.github.io', 'http://localhost:8088', 'http://localhost:8093']);
const counts = new Map();
let active = 0;
export default async function schoolModel(request, env, clientIP = 'unknown', upstream = fetch) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  const accepted = ORIGINS.has(origin) || origin === url.origin;
  if (accepted) {
    headers.set('Access-Control-Allow-Origin', origin); headers.set('Vary', 'Origin');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }
  const reply = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });
  if (url.pathname === '/model/health') {
    if (request.method !== 'GET') return reply({ error: '仅支持GET' }, 405);
    // A deployment diagnostic, not an authentication or successful inference claim.
    try {
      const result = await upstream(TARGET, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(5000) });
      const status = result.status;
      await result.body?.cancel();
      return reply({ configured: Boolean(env.SCHOOL_MODEL_KEY), upstream_status: status,
        reachability: [200, 401, 405].includes(status) ? 'responded' : 'unconfirmed',
        note: '网关HTTP响应不等于有效Key或模型调用成功' });
    } catch { return reply({ configured: Boolean(env.SCHOOL_MODEL_KEY), reachability: 'failed' }); }
  }
  if (!accepted) return reply({ error: '来源未获授权' }, 403);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (url.pathname === '/model/browser-config') {
    if (request.method !== 'GET') return reply({ error: '仅支持GET' }, 405);
    if (env.ALLOW_BROWSER_SHARED_KEY !== 'true' || !env.SCHOOL_MODEL_KEY) {
      return reply({ error: '比赛共享配置尚未启用' }, 503);
    }
    // Explicitly approved temporary competition sharing: this Key is browser-visible.
    // Revocation must happen at the school provider, not just by deleting this route.
    return reply({ key: env.SCHOOL_MODEL_KEY, model: MODEL, endpoint: TARGET });
  }
  if (url.pathname !== '/model/chat') return reply({ error: '未知接口' }, 404);
  if (request.method !== 'POST') return reply({ error: '仅支持POST' }, 405);
  if (!env.SCHOOL_MODEL_KEY) return reply({ error: '共享模型代理尚未配置' }, 503);
  const minute = Math.floor(Date.now() / 60000);
  if (counts.size > 5000) counts.clear();
  const previous = counts.get(clientIP);
  const count = previous?.minute === minute ? previous.count + 1 : 1;
  counts.set(clientIP, { minute, count });
  if (count > 6 || active >= 3) return reply({ error: '请求较多，请稍后再试' }, 429);
  if (Number(request.headers.get('Content-Length')) > 131072) return reply({ error: '题目或对话过长' }, 413);
  let payload;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: '请求为空' }, 400);
    let size = 0; const chunks = [];
    try {
      while (true) {
        const { value, done } = await reader.read(); if (done) break;
        size += value.byteLength;
        if (size > 131072) { await reader.cancel(); return reply({ error: '题目或对话过长' }, 413); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    payload = JSON.parse(new TextDecoder().decode(bytes));
  } catch { return reply({ error: '请求格式错误' }, 400); }
  const messages = payload?.messages;
  if (!Array.isArray(messages) || !messages.length || messages.length > 12 ||
      messages.some(m => !m || !['system', 'user', 'assistant'].includes(m.role) || typeof m.content !== 'string') ||
      messages.reduce((sum, m) => sum + m.content.length, 0) > 64000 || messages.at(-1).role !== 'user') {
    return reply({ error: '消息参数不合法或过长' }, 400);
  }
  const tokens = payload.purpose === 'diagnosis' ? 3500 : 1500;
  active++;
  try {
    const result = await upstream(TARGET, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(55000),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.SCHOOL_MODEL_KEY}` },
      body: JSON.stringify({ model: MODEL, messages: messages.map(({ role, content }) => ({ role, content })),
        temperature: payload.purpose === 'diagnosis' ? 0.2 : 0.7, max_tokens: tokens, stream: false })
    });
    if (!result.ok) {
      await result.body?.cancel();
      return reply({ error: '学校网关拒绝或暂未完成请求', upstream_status: result.status }, 502);
    }
    const data = await result.json(); const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) return reply({ error: '模型未返回正文' }, 502);
    // Redact even if a gateway unexpectedly echoes its authorization value.
    return reply({ content: content.replaceAll(env.SCHOOL_MODEL_KEY, '[redacted]').slice(0, 80000) });
  } catch { return reply({ error: '代理无法连接学校网关或响应超时' }, 502); }
  finally { active--; }
}
