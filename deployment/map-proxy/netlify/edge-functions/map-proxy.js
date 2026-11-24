import worker from '../../worker.mjs';

export default async (request, context) => {
  if (!['GET', 'OPTIONS'].includes(request.method)) {
    return new Response(JSON.stringify({error: '仅支持查询'}), {
      status: 405, headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
  }
  const headers = new Headers(request.headers);
  // Use the trusted platform client IP only; do not use IP to locate the student.
  headers.set('CF-Connecting-IP', context.ip || 'unknown');
  return worker.fetch(new Request(request, {headers}), {
    AMAP_JS_KEY: Netlify.env.get('AMAP_JS_KEY'),
    AMAP_SECURITY_CODE: Netlify.env.get('AMAP_SECURITY_CODE')
  });
};
