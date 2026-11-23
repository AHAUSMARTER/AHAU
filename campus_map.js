/* Public SDK identifier is delivered at runtime; the security code stays in the proxy. */
(() => {
  'use strict';
  const PROXY = 'https://anau-campus-map-proxy.jaderook8.chatgpt.site';
  const $ = id => document.getElementById(id);
  let map, search, walker, geolocation, markers=[], start=null, end=null, imageScale=1, searchSequence=0, planning=false;
  const status = (id,text) => {$(id).textContent=text;};
  const timeout = (promise, ms=15000) => Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error('请求超时，请稍后重试')),ms))]);
  function view(type) {
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===type)));
    $('live-view').hidden=type!=='live';$('image-view').hidden=type==='live';
    if(type==='live'){if(map)map.resize();return;}
    const src=type==='north'?'campus_map/anau_north_dorm.jpg':'campus_map/anau_main_campus.webp';
    $('campus-image').src=src;$('campus-image').alt=type==='north'?'安徽农业大学北区宿舍方位图':'安徽农业大学主校区方位图';$('original').href=src;imageScale=1;$('campus-image').style.width='100%';
  }
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));
  function zoom(delta){imageScale=Math.max(.5,Math.min(3,imageScale+delta));$('campus-image').style.width=`${imageScale*100}%`;}
  $('zoom-in').onclick=()=>zoom(.25);$('zoom-out').onclick=()=>zoom(-.25);$('zoom-reset').onclick=()=>{imageScale=1;zoom(0);};
  function choose(poi,which){
    if(planning){status('route-status','正在规划，请稍候再更换起终点。');return;}
    if(!poi.location)return;
    const selected={name:poi.name,position:poi.location};if(which==='start')start=selected;else end=selected;
    $(which==='start'?'origin':'destination').value=poi.name;
    $('plan').disabled=!(start&&end)||planning;
    $('navigate').hidden=!end;
    if(end){const p=end.position;const u=new URL('https://uri.amap.com/navigation');u.searchParams.set('to',`${p.lng},${p.lat},${end.name}`);u.searchParams.set('mode','walk');u.searchParams.set('coordinate','gaode');u.searchParams.set('src','安农智办');if(start)u.searchParams.set('from',`${start.position.lng},${start.position.lat},${start.name}`);$('navigate').href=u.href;}
    if(walker)walker.clear();status('route-status',start&&end?'起终点已更新，点击“规划步行路线”。':'请选择另一个地点作为'+(start?'终点。':'起点。'));
    view('live');map.setZoomAndCenter(17,poi.location);
  }
  function showResults(pois){
    markers.forEach(m=>m.setMap(null));markers=[];$('results').replaceChildren();
    pois.forEach(p=>{
      if(!p.location)return;
      const item=document.createElement('article');item.className='result';
      const h=document.createElement('h3');h.textContent=p.name;const addr=document.createElement('p');addr.textContent=[p.pname,p.cityname,p.adname,typeof p.address==='string'?p.address:''].filter(Boolean).join(' ');
      const provenance=document.createElement('p');provenance.textContent='来源：高德地点查询 · 请核对是否为目标校区';
      const actions=document.createElement('div');actions.className='actions';
      for(const [which,label]of [['start','设为起点'],['end','去这里']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.className=which==='start'?'secondary':'';b.onclick=()=>choose(p,which);actions.append(b);}
      item.append(h,addr,provenance,actions);$('results').append(item);
      const m=new AMap.Marker({position:p.location,title:p.name,map});m.on('click',()=>{item.scrollIntoView({block:'nearest'});h.focus?.();status('search-status',`已选择：${p.name}。可在地点卡片设置起点或终点。`);});markers.push(m);
    });
    if(markers.length)map.setFitView(markers,false,[40,40,40,40],17);
  }
  async function runSearch(value){
    if(!search){status('search-status','高德地图尚未就绪，请先查看校园方位图。');return;}
    const seq=++searchSequence;const clean=value.trim().slice(0,60);if(!clean)return;
    $('keyword').value=clean;status('search-status','正在查询真实地点…');
    const query=clean.includes('安徽农业大学')?clean:`安徽农业大学 ${clean.replace(/在哪里|在哪儿|在哪|怎么走|怎么去|请问|我要去|我想去|[？?。]/g,'').trim()}`;
    try{
      const rawPois=await timeout(new Promise((resolve,reject)=>search.search(query,(s,r)=>s==='complete'?resolve(r.poiList?.pois||[]):s==='no_data'?resolve([]):reject(new Error('地点查询失败，请稍后重试'+(r?.info?'（'+r.info+'）':''))))));
      if(seq!==searchSequence)return;
      const pois=rawPois.filter(p=>{if(!p.location)return false;const {lng,lat}=p.location;const nearby=Math.hypot((lng-117.256799)*94500,(lat-31.862445)*111320)<2500;return nearby && /安徽农业大学|安农大/.test(p.name+' '+(p.address||''));});
      showResults(pois);status('search-status',pois.length?`找到 ${pois.length} 个校区周边高德候选地点，请核对名称与地址。`:'未查到长江西路校区周边的匹配地点，请尝试正式名称或查看校园方位图。');view('live');
    }catch(e){if(seq!==searchSequence)return;showResults([]);status('search-status',e.message);}
  }
  $('search-form').onsubmit=e=>{e.preventDefault();runSearch($('keyword').value);};
  document.querySelectorAll('[data-query]').forEach(b=>b.onclick=()=>runSearch(b.dataset.query));
  $('locate').onclick=async()=>{
    if(planning)return;
    if(!geolocation){status('route-status','地图尚未就绪，暂时不能定位。');return;}
    $('locate').disabled=true;status('route-status','正在请求定位授权…');
    try{
      const result=await timeout(new Promise((resolve,reject)=>geolocation.getCurrentPosition((s,r)=>s==='complete'&&r.position?resolve(r):reject(new Error('定位失败或未授权。可搜索地点并设为起点。')))),18000);
      choose({name:'我的位置',location:result.position},'start');status('route-status',`定位完成${result.accuracy?`，精度约 ${Math.round(result.accuracy)} 米`:''}。请确认起点后规划路线。`);
    }catch(e){status('route-status',e.message);}finally{$('locate').disabled=false;}
  };
  $('plan').onclick=async()=>{
    if(!start||!end||!walker||planning)return;
    planning=true;$('plan').disabled=true;status('route-status','正在规划步行路线…');walker.clear();
    try{
      const r=await timeout(new Promise((resolve,reject)=>walker.search(start.position,end.position,(s,r)=>s==='complete'&&r.routes?.length?resolve(r):reject(new Error('高德未返回可用步行路线，请打开高德核对或查看校园方位图。')))));
      const route=r.routes[0];status('route-status',`约 ${route.distance>=1000?(route.distance/1000).toFixed(1)+' 公里':Math.round(route.distance)+' 米'} · 预计 ${Math.max(1,Math.ceil(route.time/60))} 分钟。校门开放及实际通行以现场为准。`);view('live');
    }catch(e){walker.clear();status('route-status',e.message);}finally{planning=false;$('plan').disabled=!(start&&end);}
  };
  async function boot(){
    try{
      const res=await fetch(PROXY+'/config',{signal:AbortSignal.timeout(12000)});if(!res.ok)throw new Error('地图代理暂时不可用');const config=await res.json();
      window._AMapSecurityConfig={serviceHost:config.serviceHost};
      await timeout(new Promise((resolve,reject)=>{window.anauMapReady=resolve;const s=document.createElement('script');s.src=`https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(config.key)}&callback=anauMapReady&plugin=AMap.PlaceSearch,AMap.Walking,AMap.Geolocation,AMap.Scale,AMap.ToolBar`;s.onerror=()=>reject(new Error('地图脚本加载失败'));document.head.append(s);}));
      map=new AMap.Map('map',{center:[117.256799,31.862445],zoom:16,viewMode:'2D'});map.addControl(new AMap.Scale());map.addControl(new AMap.ToolBar());
      search=new AMap.PlaceSearch({city:'合肥',citylimit:true,pageSize:8,extensions:'base'});
      walker=new AMap.Walking({map,panel:'route-panel',hideMarkers:false});
      geolocation=new AMap.Geolocation({enableHighAccuracy:true,timeout:12000,convert:true});
      status('map-status','高德地图已连接。搜索并核对地点后，可设置起点和终点。');
      runSearch(new URLSearchParams(location.search).get('q')||'安徽农业大学');
    }catch(e){status('map-status',`${e.message}。可切换校园方位图；稍后刷新重试。`);status('search-status','在线地点搜索暂不可用，校园原图仍可查看。');view('main');}
  }
  boot();
})();
