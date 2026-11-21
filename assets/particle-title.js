document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-particle-title]');
  if (!root) return;

  const heading = root.querySelector('h2');
  const frames = Array.from(heading.querySelectorAll('[data-particle-frame]'));
  const logo = heading.querySelector('.particle-title-logo');
  const canvas = root.querySelector('canvas');
  const context = canvas.getContext('2d');
  const mask = document.createElement('canvas');
  const maskContext = mask.getContext('2d', { willReadFrequently: true });
  if (!context || !maskContext || !window.Path2D) return;

  const logoShape = new Path2D();
  logo.querySelectorAll('path').forEach(path => logoShape.addPath(new Path2D(path.getAttribute('d'))));
  const { cx, cy, r } = logo.querySelector('circle');
  logoShape.moveTo(cx.baseVal.value + r.baseVal.value, cy.baseVal.value);
  logoShape.arc(cx.baseVal.value, cy.baseVal.value, r.baseVal.value, 0, 2 * Math.PI);

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const timing = { firstHold: 1100, hold: 1900, morph: 1700 };
  const palette = ['#20543a', '#507963', '#829b8a'];
  const sways = [-.28, .17, -.09, .29, -.18, .07];
  const turn = 2 * Math.PI;
  const smooth = value => {
    const t = Math.max(0, Math.min(1, value));
    return t * t * (3 - 2 * t);
  };

  let width = 0;
  let height = 0;
  let scale = 1;
  let fontSize = 0;
  let shapes = [];
  let movement = 0;
  let current = 0;
  let visible = false;
  let active = false;
  let timer = 0;
  let animation = 0;
  let fontsReady = !document.fonts;

  function titleFont(style) {
    return `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  }

  function sampleShape(element, budget) {
    maskContext.clearRect(0, 0, width, height);
    const style = getComputedStyle(element);
    maskContext.fillStyle = style.color;
    if (element === logo) {
      const view = logo.viewBox.baseVal;
      const iconHeight = fontSize * .84;
      const ratio = iconHeight / view.height;
      maskContext.save();
      maskContext.translate((width - view.width * ratio) / 2, (height - iconHeight) / 2);
      maskContext.scale(ratio, ratio);
      maskContext.translate(-view.x, -view.y);
      maskContext.fill(logoShape);
      maskContext.restore();
    } else {
      maskContext.font = titleFont(style);
      if ('letterSpacing' in maskContext) maskContext.letterSpacing = style.letterSpacing;
      maskContext.textAlign = 'center';
      const text = maskContext.measureText(element.textContent);
      const ascent = text.fontBoundingBoxAscent ?? fontSize * .85;
      const descent = text.fontBoundingBoxDescent ?? fontSize * .15;
      maskContext.fillText(element.textContent, width / 2, (height + ascent - descent) / 2);
    }

    const { data } = maskContext.getImageData(0, 0, mask.width, mask.height);
    const step = Math.max(1, Math.round(scale));
    const candidates = [];
    for (let y = 0; y < mask.height; y += step) {
      for (let x = 0; x < mask.width; x += step) {
        if (data[(y * mask.width + x) * 4 + 3] > 120) {
          candidates.push({ x: x / scale, y: y / scale });
        }
      }
    }
    if (!candidates.length) return [];

    // Sample the same number of points from each silhouette, including the smaller mark.
    const points = Array.from({ length: budget }, (_, index) => {
      const start = index * candidates.length / budget;
      const span = candidates.length / budget;
      return candidates[Math.floor(start + Math.random() * span)];
    });
    return points.sort((a, b) => a.x - b.x || a.y - b.y);
  }

  function prepare() {
    const bounds = canvas.getBoundingClientRect();
    const nextScale = Math.min(1.75, window.devicePixelRatio || 1);
    if (!bounds.width || !bounds.height) return false;
    if (shapes.length && width === bounds.width && height === bounds.height && scale === nextScale) return true;

    ({ width, height } = bounds);
    scale = nextScale;
    fontSize = parseFloat(getComputedStyle(heading).fontSize);
    canvas.width = mask.width = Math.round(width * scale);
    canvas.height = mask.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    maskContext.setTransform(scale, 0, 0, scale, 0, 0);
    const budget = width < 380 ? 390 : 560;
    const sampled = frames.map(element => sampleShape(element, budget));
    if (sampled.some(points => !points.length)) return false;
    shapes = sampled;
    return true;
  }

  function showFrame(index) {
    frames.forEach((element, frameIndex) => {
      element.toggleAttribute('hidden', index !== frameIndex);
    });
  }

  function makeTrajectories(target) {
    const sway = sways[movement++ % sways.length];
    const groups = palette.map(() => []);
    const cloudWidth = Math.min(width * .66, fontSize * 5.6);
    const cloudHeight = Math.min(height * .72, fontSize * 1.8);
    shapes[current].forEach((from, index) => {
      const to = shapes[target][index];
      const angle = Math.random() * turn;
      const radius = Math.sqrt(Math.random());
      const controlX = width / 2 + (Math.cos(angle) * radius + sway) * cloudWidth;
      const controlY = height / 2 + Math.sin(angle) * radius * cloudHeight;
      groups[index % groups.length].push({
        x: from.x, y: from.y,
        vx: 2 * (controlX - from.x), vy: 2 * (controlY - from.y),
        ax: from.x - 2 * controlX + to.x, ay: from.y - 2 * controlY + to.y,
        lag: Math.random() * .16, size: .6 + Math.random() * .72
      });
    });
    return groups;
  }

  function morph() {
    if (!active || !prepare()) return;
    const target = (current + 1) % frames.length;
    const groups = makeTrajectories(target);
    let started;
    let incoming = false;
    root.classList.add('is-particle-transition');

    function draw(now) {
      started ??= now;
      const progress = Math.min(1, (now - started) / timing.morph);
      if (progress >= .5 && !incoming) {
        showFrame(target);
        incoming = true;
      }
      const textOpacity = progress < .5 ? 1 - smooth(progress / .28) : smooth((progress - .7) / .3);
      heading.style.opacity = textOpacity;
      context.clearRect(0, 0, width, height);
      context.globalAlpha = .92 * smooth(progress / .24) * (1 - smooth((progress - .74) / .26));
      groups.forEach((group, index) => {
        context.fillStyle = palette[index];
        context.beginPath();
        for (const point of group) {
          const t = smooth((progress - point.lag) / .84);
          const x = point.x + t * (point.vx + t * point.ax);
          const y = point.y + t * (point.vy + t * point.ay);
          context.moveTo(x + point.size, y);
          context.arc(x, y, point.size, 0, turn);
        }
        context.fill();
      });

      if (progress < 1) {
        animation = requestAnimationFrame(draw);
      } else {
        current = target;
        finishTransition();
        timer = setTimeout(morph, timing.hold);
      }
    }

    animation = requestAnimationFrame(draw);
  }

  function finishTransition() {
    cancelAnimationFrame(animation);
    context.clearRect(0, 0, width, height);
    heading.style.removeProperty('opacity');
    root.classList.remove('is-particle-transition');
    showFrame(current);
  }

  function scheduleFirstMorph() {
    if (fontsReady && prepare()) timer = setTimeout(morph, timing.firstHold);
  }

  if (document.fonts) {
    const fontLoads = frames.filter(element => element !== logo).map(element =>
      document.fonts.load(titleFont(getComputedStyle(element)), element.textContent)
    );
    Promise.allSettled(fontLoads).then(() => {
      fontsReady = true;
      if (active) scheduleFirstMorph();
    });
  }

  function sync() {
    const shouldAnimate = visible && !document.hidden && !motion.matches;
    if (shouldAnimate === active) return;
    active = shouldAnimate;
    clearTimeout(timer);
    current = 0;
    finishTransition();
    if (active) scheduleFirstMorph();
  }

  let previousWidth = root.clientWidth;
  let previousHeight = root.clientHeight;
  new ResizeObserver(() => {
    const { clientWidth, clientHeight } = root;
    if (clientWidth === previousWidth && clientHeight === previousHeight) return;
    previousWidth = clientWidth;
    previousHeight = clientHeight;
    shapes = [];
    if (!active || !clientWidth || !clientHeight) return;
    clearTimeout(timer);
    finishTransition();
    scheduleFirstMorph();
  }).observe(root);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio > 0;
    sync();
  }).observe(root);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
}, { once: true });
