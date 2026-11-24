// Portable Node.js HTTP adapter. AMAP_SECURITY_CODE remains server-only.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import worker from './worker.mjs';

const port = Number(process.env.PORT || 9000);
const host = process.env.HOST || '0.0.0.0';
const env = {
  AMAP_JS_KEY: process.env.AMAP_JS_KEY,
  AMAP_SECURITY_CODE: process.env.AMAP_SECURITY_CODE
};
if (process.env.AMAP_CONFIG_FILE) {
  const local = JSON.parse(readFileSync(process.env.AMAP_CONFIG_FILE, 'utf8'));
  env.AMAP_JS_KEY ||= local.js_api_key;
  env.AMAP_SECURITY_CODE ||= local.security_js_code;
}
if (!env.AMAP_JS_KEY || !env.AMAP_SECURITY_CODE) {
  console.error('Missing AMAP_JS_KEY or AMAP_SECURITY_CODE.');
  process.exit(1);
}
const publicBase = process.env.PUBLIC_BASE_URL && new URL(process.env.PUBLIC_BASE_URL);
if (publicBase && (publicBase.protocol !== 'https:' || publicBase.username || publicBase.password)) {
  throw new Error('PUBLIC_BASE_URL must be an HTTPS URL without credentials.');
}
createServer(async (req, res) => {
  try {
    if (!['GET', 'OPTIONS'].includes(req.method)) {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end('{"error":"仅支持查询"}');
      return;
    }
    const base = publicBase?.origin || `http://${req.headers.host}`;
    const url = new URL(req.url, base);
    // Never allow absolute request targets to change the configured public origin.
    if (url.origin !== new URL(base).origin) {
      res.writeHead(400); res.end(); return;
    }
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(',') : value);
    }
    // Do not trust visitor-supplied CF IP headers on a non-Cloudflare server.
    headers.set('CF-Connecting-IP', req.socket.remoteAddress || 'unknown');
    const response = await worker.fetch(new Request(url, {method: req.method, headers}), env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    res.writeHead(502, {'Content-Type':'application/json; charset=utf-8'});
    res.end('{"error":"地图服务暂时不可用"}');
  }
}).listen(port, host, () => console.log(`Campus map proxy listening on port ${port}`));
