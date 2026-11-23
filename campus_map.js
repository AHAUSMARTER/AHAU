import { inCampus, classifyLocation, campusRoute } from './campus_map_geometry.mjs';

const PROXY = 'https://anau-campus-map-proxy.jaderook8.chatgpt.site';
const CENTER = [117.256799, 31.862445];
const $ = id => document.getElementById(id);
let map, walker, campusBounds, rings;
let markers = [], start = null, end = null, locationMarker, accuracyCircle;
let imageScale = 1, searchSequence = 0, planning = false, locating = false;
let locationState = 'idle', routeSequence = 0, navigationReady = false;

function status(id, text) { $(id).textContent = text; }
function withTimeout(promise, ms = 15000) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('请求超时，请稍后重试。')), ms);
  })]).finally(() => clearTimeout(timer));
}
function view(type) {
  $('map-view').value = type;
  $('live-view').hidden = type !== 'live';
  $('image-view').hidden = type === 'live';
  if (type === 'live') {
    map?.resize();
    if (map) status('map-status', '仅展示校园范围，校外地图已隐藏。');
    return;
  }
  if (map) status('map-status', '校园原图仅供方位参考，更新时间未标注。');
  const src = type === 'north' ? 'campus_map/anau_north_dorm.jpg' : 'campus_map/anau_main_campus.webp';
  $('campus-image').src = src;
  $('campus-image').alt = type === 'north' ? '安徽农业大学北区宿舍方位图' : '安徽农业大学主校区方位图';
  $('original').href = src;
  imageScale = 1;
  $('campus-image').style.width = '100%';
}
$('map-view').onchange = e => view(e.target.value);
function zoom(delta) {
  imageScale = Math.max(.5, Math.min(3, imageScale + delta));
  $('campus-image').style.width = `${imageScale * 100}%`;
}
$('map-zoom-in').onclick = () => map?.zoomIn();
$('map-zoom-out').onclick = () => map?.zoomOut();
$('zoom-in').onclick = () => zoom(.25);
$('zoom-out').onclick = () => zoom(-.25);
$('zoom-reset').onclick = () => { imageScale = 1; zoom(0); };

function updateControls() {
  const blocked = locationState === 'outside' || locating || planning;
  $('plan').disabled = blocked || !start || !end;
  $('locate').disabled = !map || planning || locating;
  $('locate').lastChild.textContent = locating ? ' 定位中…' : ' 我的位置';
  // A destination alone would let AMap route from an unverified off-campus origin.
  $('navigate').hidden = blocked || !navigationReady || !start || !end;
  if (start && end) {
    const url = new URL('https://uri.amap.com/navigation');
    url.searchParams.set('from', `${start.position.lng},${start.position.lat},${start.name}`);
    url.searchParams.set('to', `${end.position.lng},${end.position.lat},${end.name}`);
    url.searchParams.set('mode', 'walk');
    url.searchParams.set('coordinate', 'gaode');
    url.searchParams.set('src', '安农智办');
    $('navigate').href = url.href;
  }
}
function clearRoute() {
  navigationReady = false;
  routeSequence++;
  walker?.clear();
  $('route-details').hidden = true;
  $('route-details').open = false;
}
function choose(poi, which) {
  if (planning || locating || !poi.location || !inCampus(poi.location, rings)) return;
  const selected = { name: poi.name, position: poi.location };
  if (which === 'start') start = selected; else end = selected;
  $(which === 'start' ? 'origin' : 'destination').value = poi.name.replace(/^.*?安徽农业大学[-－]?/, '') || poi.name;
  clearRoute();
  status('route-status', locationState === 'outside' ? '您并不在农大校园中，当前可浏览校内地点。' :
    start && end ? '起终点已就绪。' : `请选择${start ? '终点' : '起点'}，或点击“我的位置”。`);
  updateControls();
  view('live');
  map.setZoomAndCenter(18, poi.location);
}
function showResults(pois) {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  $('results').replaceChildren();
  for (const poi of pois) {
    const item = document.createElement('article');
    item.className = 'result';
    const title = document.createElement('h3');
    title.textContent = poi.name.replace(/^.*?安徽农业大学[-－]?/, '') || poi.name;
    const address = document.createElement('p');
    address.textContent = typeof poi.address === 'string' ? poi.address : '高德校内地点';
    const actions = document.createElement('div');
    actions.className = 'actions';
    for (const [which, label] of [['start', '设为起点'], ['end', '去这里']]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      if (which === 'start') button.className = 'secondary';
      button.onclick = () => choose(poi, which);
      actions.append(button);
    }
    item.append(title, address, actions);
    $('results').append(item);
    const marker = new AMap.Marker({ position: poi.location, title: poi.name, map });
    marker.on('click', () => {
      item.scrollIntoView({ block: 'nearest' });
      status('search-status', `已选择${poi.name}，请在地点卡片中设置起点或终点。`);
    });
    markers.push(marker);
  }
  if (markers.length) map.setFitView(markers, false, [32, 32, 32, 32], 18);
}
async function runSearch(value) {
  if (!map) { status('search-status', '在线地图尚未就绪，可先查看校园原图。'); return; }
  const clean = value.trim().slice(0, 60);
  if (!clean) return;
  const sequence = ++searchSequence;
  $('keyword').value = clean;
  status('search-status', '正在查询…');
  const query = clean.includes('安徽农业大学') ? clean.replace(/\s+/g, '') : `安徽农业大学${clean.replace(/在哪里|在哪儿|在哪|怎么走|怎么去|请问|我要去|我想去|[？?。]/g, '').replace(/\s+/g, '')}`;
  try {
    const params = new URLSearchParams({keywords: query, city: '340100', citylimit: 'true',
      offset: '20', page: '1', output: 'json', s: 'rsv3', platform: 'JS'});
    const response = await fetch(PROXY + '/_AMapService/v3/place/text?' + params, {
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error('地点查询暂时不可用，请稍后重试。');
    const data = await response.json();
    if (data.status !== '1') throw new Error('地点查询失败，请稍后重试。');
    const candidates = (data.pois || []).flatMap(poi => {
      const coordinates = String(poi.location || '').split(',').map(Number);
      if (coordinates.length !== 2 || !coordinates.every(Number.isFinite)) return [];
      return [{...poi, location: new AMap.LngLat(...coordinates)}];
    });
    if (sequence !== searchSequence) return;
    const pois = candidates.filter(p => p.location && inCampus(p.location, rings));
    showResults(pois);
    status('search-status', pois.length ? `${pois.length} 个校内地点 · 高德地图` : '未找到校内地点，请换一个名称或查看原图。');
    view('live');
  } catch (error) {
    if (sequence !== searchSequence) return;
    showResults([]);
    status('search-status', error.message);
  }
}
$('search-form').onsubmit = event => { event.preventDefault(); runSearch($('keyword').value); };
document.querySelectorAll('[data-query]').forEach(button => {
  button.onclick = () => runSearch(button.dataset.query);
});

function removeUserPosition() {
  locationMarker?.setMap(null);
  accuracyCircle?.setMap(null);
  locationMarker = accuracyCircle = null;
  if (start?.name === '我的位置') { start = null; $('origin').value = ''; }
  clearRoute();
}
function locateError(error) {
  if (error.code === 1) return '定位权限未开启，请在浏览器的网站设置中允许位置访问，然后重试。';
  if (error.code === 2) return '设备暂时无法获取位置，请检查系统定位服务。';
  if (error.code === 3) return '定位超时，请在信号较好的位置重试。';
  return error.message || '定位失败，请稍后重试。';
}
async function locate() {
  if (!map || planning || locating) return;
  locating = true;
  removeUserPosition();
  updateControls();
  status('location-status', '正在获取设备位置，请允许浏览器的位置请求…');
  $('location-status').dataset.state = 'loading';
  try {
    if (!window.isSecureContext) throw new Error('定位需要 HTTPS，请使用线上校园地图网址。');
    if (!navigator.geolocation) throw new Error('当前浏览器不支持定位，请换用手机系统浏览器。');
    // Device coordinates only: do not use IP/VPN exit location as a user position.
    const result = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true, timeout: 15000, maximumAge: 0
    }));
    const coordinates = [result.coords.longitude, result.coords.latitude];
    const position = await withTimeout(new Promise((resolve, reject) => {
      AMap.convertFrom(coordinates, 'gps', (s, data) => {
        if (s === 'complete' && data.locations?.[0]) resolve(data.locations[0]);
        else reject(new Error('定位坐标转换失败，请稍后重试。'));
      });
    }));
    const accuracy = result.coords.accuracy;
    locationState = classifyLocation(position, accuracy, rings);
    $('location-status').dataset.state = locationState;
    if (locationState === 'outside') {
      status('location-status', '您并不在农大校园中');
      status('route-status', '当前可浏览校内地点，校外位置不作为导航起点。');
      return;
    }
    if (locationState === 'uncertain') {
      status('location-status', '定位精度不足或位置接近校园边界，暂时无法确认是否在校内，请重试。');
      return;
    }
    locationMarker = new AMap.Marker({ map, position, title: '我的位置', zIndex: 200,
      content: '<span class="my-location" role="img" aria-label="我的位置"></span>',
      anchor: 'center'
    });
    accuracyCircle = new AMap.Circle({ map, center: position, radius: accuracy,
      strokeColor: '#2474e5', strokeOpacity: .25, fillColor: '#2474e5', fillOpacity: .1
    });
    start = { name: '我的位置', position };
    $('origin').value = '我的位置';
    status('location-status', `已定位到校内 · 精度约 ${Math.round(accuracy)} 米`);
    status('route-status', end ? '起终点已就绪。' : '选择目的地即可规划步行路线。');
    view('live');
    map.setZoomAndCenter(18, position);
  } catch (error) {
    locationState = 'error';
    $('location-status').dataset.state = 'error';
    status('location-status', locateError(error));
  } finally {
    locating = false;
    updateControls();
  }
}
$('locate').onclick = locate;

$('plan').onclick = async () => {
  if (!start || !end || !walker || planning || locating || locationState === 'outside') return;
  clearRoute();
  const sequence = routeSequence;
  planning = true;
  updateControls();
  status('route-status', '正在规划…');
  try {
    const result = await withTimeout(new Promise((resolve, reject) => {
      walker.search(start.position, end.position, (s, data) => {
        if (sequence !== routeSequence) { walker.clear(); return; }
        if (s === 'complete' && data.routes?.length) resolve(data);
        else reject(new Error('暂未查到可用路线，请查看校园原图。'));
      });
    }));
    if (sequence !== routeSequence) return;
    const route = result.routes[0];
    const points = route.steps.flatMap(step => step.path || []);
    if (!campusRoute(points, rings)) {
      walker.clear();
      throw new Error('这条路线经过校外，暂不提供。请查看校园原图或更换起终点。');
    }
    navigationReady = true;
    const distance = route.distance >= 1000 ? `${(route.distance/1000).toFixed(1)} 公里` : `${Math.round(route.distance)} 米`;
    status('route-status', `${distance} · 约 ${Math.max(1, Math.ceil(route.time/60))} 分钟`);
    $('route-details').hidden = false;
    view('live');
  } catch (error) {
    walker.clear();
    status('route-status', error.message);
  } finally {
    planning = false;
    routeSequence++;
    updateControls();
  }
};

async function boot() {
  try {
    const [configResponse, boundaryResponse] = await Promise.all([
      fetch(PROXY + '/config', { signal: AbortSignal.timeout(12000) }),
      fetch('campus_map/campus_boundary.json', { signal: AbortSignal.timeout(12000) })
    ]);
    if (!configResponse.ok || !boundaryResponse.ok) throw new Error('校园地图暂时不可用');
    const config = await configResponse.json();
    const boundary = await boundaryResponse.json();
    rings = boundary.rings;
    if (!Array.isArray(rings) || !rings.length) throw new Error('校园范围加载失败');
    window._AMapSecurityConfig = { serviceHost: config.serviceHost };
    await withTimeout(new Promise((resolve, reject) => {
      window.anauMapReady = resolve;
      const script = document.createElement('script');
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(config.key)}&callback=anauMapReady&plugin=AMap.Walking,AMap.Scale`;
      script.onerror = () => reject(new Error('地图加载失败'));
      document.head.append(script);
    }));
    map = new AMap.Map('map', { center: CENTER, zoom: 16.5, zooms: [16, 20],
      viewMode: '2D', mask: rings, showLabel: true, labelzIndex: 100,
      features: ['bg', 'road', 'building', 'point']
    });
    map.setLabelRejectMask(false);
    const vertices = rings.flat();
    campusBounds = new AMap.Bounds(
      [Math.min(...vertices.map(p => p[0])), Math.min(...vertices.map(p => p[1]))],
      [Math.max(...vertices.map(p => p[0])), Math.max(...vertices.map(p => p[1]))]
    );
    map.setLimitBounds(campusBounds);
    rings.forEach(path => new AMap.Polygon({ map, path, strokeColor: '#368463',
      strokeWeight: 2, fillOpacity: 0, strokeOpacity: .65, bubble: true
    }));
    map.addControl(new AMap.Scale());
    walker = new AMap.Walking({ map, panel: 'route-panel', hideMarkers: false, autoFitView: false });
    updateControls();
    status('map-status', '仅展示校园范围，校外地图已隐藏。');
    const initialQuery = new URLSearchParams(location.search).get('q');
    if (initialQuery) runSearch(initialQuery);
  } catch (error) {
    status('map-status', `${error.message}，可先查看校园原图。`);
    status('location-status', '在线地图未就绪，暂不能定位。');
    view('main');
  }
}
boot();
