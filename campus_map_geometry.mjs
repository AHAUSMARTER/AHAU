// All coordinates are GCJ-02, matching the AMap SDK and the boundary data.
const METRES_PER_DEGREE = 111320;
export function pair(point) {
  return Array.isArray(point) ? point : [Number(point.lng), Number(point.lat)];
}
export function inRing(point, ring) {
  const [x, y] = pair(point);
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
export function inCampus(point, rings) {
  return rings.some(ring => inRing(point, ring));
}
export function boundaryDistance(point, rings) {
  const [lng, lat] = pair(point);
  const scaleX = METRES_PER_DEGREE * Math.cos(lat * Math.PI / 180);
  let minimum = Infinity;
  for (const ring of rings) {
    for (let i = 1; i < ring.length; i++) {
      const a = [(ring[i-1][0] - lng) * scaleX, (ring[i-1][1] - lat) * METRES_PER_DEGREE];
      const b = [(ring[i][0] - lng) * scaleX, (ring[i][1] - lat) * METRES_PER_DEGREE];
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const t = Math.max(0, Math.min(1, -(a[0] * dx + a[1] * dy) / (dx * dx + dy * dy || 1)));
      minimum = Math.min(minimum, Math.hypot(a[0] + t * dx, a[1] + t * dy));
    }
  }
  return minimum;
}
export function classifyLocation(point, accuracy, rings) {
  if (!Number.isFinite(accuracy) || accuracy <= 0) return 'uncertain';
  if (boundaryDistance(point, rings) <= Math.max(accuracy, 15)) return 'uncertain';
  if (!inCampus(point, rings)) return 'outside';
  return accuracy > 150 ? 'uncertain' : 'inside';
}
export function campusRoute(points, rings) {
  if (points.length < 2) return false;
  // Check segments as well as vertices to catch lines crossing a concave boundary.
  for (let i = 1; i < points.length; i++) {
    const a = pair(points[i-1]), b = pair(points[i]);
    const distance = Math.hypot((b[0]-a[0]) * 94500, (b[1]-a[1]) * METRES_PER_DEGREE);
    const samples = Math.max(1, Math.ceil(distance / 15));
    for (let t = 0; t <= samples; t++) {
      if (!inCampus([a[0]+(b[0]-a[0])*t/samples, a[1]+(b[1]-a[1])*t/samples], rings)) return false;
    }
  }
  return true;
}
