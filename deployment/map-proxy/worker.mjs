const ORIGINS = new Set(['https://ahausmarter.github.io', 'http://localhost:8088', 'http://127.0.0.1:8088', 'http://127.0.0.1:8093']);
const ROUTES = new Set(['/v3/log/init','/v3/place/text','/v3/place/detail','/v3/direction/walking','/v5/direction/walking','/v3/geocode/regeo','/v3/geocode/geo','/v3/config/district','/v3/assistant/coordinate/convert']);
const buckets = new Map();
function allowed(request, url) {
  const origin = request.headers.get('Origin');
  const ref = request.headers.get('Referer');
  if (origin) return ORIGINS.has(origin) || origin === url.origin;
  try { return ref && (ORIGINS.has(new URL(ref).origin) || new URL(ref).origin === url.origin); } catch { return false; }
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const headers = new Headers({'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
    if (ORIGINS.has(origin) || origin === url.origin) {
      headers.set('Access-Control-Allow-Origin',origin); headers.set('Vary','Origin');
      headers.set('Access-Control-Allow-Methods','GET, OPTIONS');
    }
    const reply = (body, status=200, type='application/json; charset=utf-8') => {
      headers.set('Content-Type',type);return new Response(typeof body==='string'?body:JSON.stringify(body),{status,headers});
    };
    if (url.pathname === '/health') return reply({service:'anau-campus-map',configured:!!(env.AMAP_JS_KEY && env.AMAP_SECURITY_CODE)});
    if (!allowed(request,url)) return reply({error:'此来源未获授权'},403);
    if (request.method==='OPTIONS') return new Response(null,{status:204,headers});
    if (request.method!=='GET') return reply({error:'仅支持查询'},405);
    const ip=request.headers.get('CF-Connecting-IP') || 'unknown';
    const minute=Math.floor(Date.now()/60000); const bucket=buckets.get(ip);
    if (bucket?.minute===minute && bucket.count>=90) return reply({error:'请求频繁，请稍后再试'},429);
    if (buckets.size>3000) buckets.clear();
    buckets.set(ip,{minute,count:bucket?.minute===minute?bucket.count+1:1});
    if (!env.AMAP_JS_KEY || !env.AMAP_SECURITY_CODE) return reply({error:'地图尚未配置'},503);
    // The browser JS key is a public SDK identifier; the security code is server-only.
    if (url.pathname==='/config') return reply({key:env.AMAP_JS_KEY,serviceHost:url.origin+'/_AMapService'});
    if (!url.pathname.startsWith('/_AMapService/')) return reply({error:'未知接口'},404);
    const path=url.pathname.slice('/_AMapService'.length);
    if (!ROUTES.has(path) && path!=='/v4/map/styles') return reply({error:'此接口未开放'},403);
    if (url.search.length>6000) return reply({error:'参数过长'},400);
    const target=new URL(path,path==='/v4/map/styles'?'https://webapi.amap.com':'https://restapi.amap.com');
    target.search=url.search;target.searchParams.set('key',env.AMAP_JS_KEY);target.searchParams.set('jscode',env.AMAP_SECURITY_CODE);
    try {
      const result=await fetch(target.href,{redirect:'manual',signal:AbortSignal.timeout(15000)});
      if (!result.ok) return reply({error:'地图服务暂时不可用'},502);
      let body=await result.text();
      if(body.length>1500000) return reply({error:'地图响应过大'},502);
      body=body.replaceAll(env.AMAP_SECURITY_CODE,'[redacted]');
      const type=(url.searchParams.has('callback') || (result.headers.get('Content-Type')||'').includes('javascript'))?'application/javascript; charset=utf-8':'application/json; charset=utf-8';
      return reply(body,200,type);
    } catch (e) {console.error('AMap upstream',e.name,String(e.message).replaceAll(env.AMAP_SECURITY_CODE,'[redacted]').replaceAll(env.AMAP_JS_KEY,'[redacted]'));return reply({error:'地图查询超时或连接失败'},502);}
  }
};
