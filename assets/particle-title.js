document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-particle-title]');
  if (!root) return;

  const label = root.querySelector('[data-particle-label]');
  const canvas = root.querySelector('canvas');
  const context = canvas.getContext('2d');
  const mask = document.createElement('canvas');
  const maskContext = mask.getContext('2d', { willReadFrequently: true });
  if (!context || !maskContext) return;

  const titles = [label.textContent, label.dataset.particleLabel];
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const modes = ['smoke', 'vortex', 'sand', 'burst', 'sweep', 'absorb'];
  const timing = { firstHold: 1400, hold: 5200, dissolve: 1650, field: 280, gather: 1650 };
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  let width = 0;
  let height = 0;
  let scale = 1;
  let fontSize = 0;
  let ink = '';
  let centered = false;
  let greens = [];
  let parts = [];
  let field = [];
  let visible = false;
  let active = false;
  let currentTitle = 0;
  let phase = 'hold';
  let started = 0;
  let frame = 0;
  let timer = 0;
  let bag = [];
  let mode;

  function nextMode() {
    if (!bag.length) {
      bag = [...modes];
      for (let index = bag.length - 1; index > 0; index--) {
        const swap = Math.floor(Math.random() * (index + 1));
        [bag[index], bag[swap]] = [bag[swap], bag[index]];
      }
      if (bag.at(-1) === mode) [bag[0], bag[bag.length - 1]] = [bag.at(-1), bag[0]];
    }
    return bag.pop();
  }

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return false;
    width = bounds.width;
    height = bounds.height;
    scale = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = mask.width = Math.round(width * scale);
    canvas.height = mask.height = Math.round(height * scale);

    const style = getComputedStyle(label);
    fontSize = parseFloat(style.fontSize);
    centered = getComputedStyle(label.parentElement).textAlign === 'center';
    ink = style.color;
    const green = style.getPropertyValue('--lobby-green').trim() || '#20543a';
    greens = [green, '#507963', '#708b7a'];
    maskContext.setTransform(scale, 0, 0, scale, 0, 0);
    maskContext.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    if ('letterSpacing' in maskContext) maskContext.letterSpacing = style.letterSpacing;
    return true;
  }

  function makeField() {
    const radiusX = Math.min(width * .5, fontSize * 3.9);
    const radiusY = height * .43;
    const centerX = centered ? width / 2 : radiusX;
    return Array.from({ length: 1550 }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.sqrt(Math.random());
      return {
        x: centerX + Math.cos(angle) * radiusX * radius,
        y: height / 2 + Math.sin(angle) * radiusY * radius
      };
    });
  }

  function motionAt(particle, random, left) {
    const x = (particle.x - left) * 1.5 / Math.min(width, 5 * fontSize);
    const y = (particle.y - height / 2) / fontSize + .5;
    const spread = Math.min(1, width / 450);
    switch (mode) {
      case 'smoke': return [(1 - clamp(y)) * .3 + random * .2, (random - .5) * 62 * spread];
      case 'vortex': return [clamp(x) * .25 + random * .12, (random > .5 ? 1 : -1) * (35 + 24 * random) * spread];
      case 'sand': return [clamp(x) * .48 + random * .12, (random - .5) * 32 * spread];
      case 'burst': return [random * .15, (random - .5) * 16 * spread];
      case 'sweep': return [(1 - clamp(x)) * .45 + random * .14, -(18 + 23 * random) * spread];
      default: return [random * .44, (random - .5) * 48 * spread];
    }
  }

  function sampleTitle(title) {
    maskContext.clearRect(0, 0, width, height);
    const text = maskContext.measureText(title);
    const ascent = text.fontBoundingBoxAscent ?? fontSize * .85;
    const descent = text.fontBoundingBoxDescent ?? fontSize * .15;
    const baseline = (height + ascent - descent) / 2;
    maskContext.fillStyle = ink;
    const textLeft = centered ? (width - text.width) / 2 : 0;
    maskContext.fillText(title, textLeft, baseline);
    const { data } = maskContext.getImageData(0, 0, mask.width, mask.height);
    const step = Math.ceil((width < 390 ? 3 : 2.6) * scale);
    const startX = Math.max(0, Math.floor((textLeft - 4) * scale));
    const limitX = Math.min(mask.width, Math.ceil((textLeft + text.width + 4) * scale));
    const cells = [];
    for (let y = 0; y < mask.height; y += step) {
      const h = Math.min(step, mask.height - y);
      for (let x = startX; x < limitX; x += step) {
        const w = Math.min(step, mask.width - x);
        let hasInk = false;
        for (let dy = 0; dy < h && !hasInk; dy++) {
          for (let dx = 0; dx < w; dx++) {
            if (data[((y + dy) * mask.width + x + dx) * 4 + 3] > 35) {
              hasInk = true;
              break;
            }
          }
        }
        if (!hasInk) continue;
        const particle = { left: x, top: y, w, h, x: (x + w / 2) / scale, y: (y + h / 2) / scale };
        const random = Math.random();
        const [delay, bend] = motionAt(particle, random, textLeft);
        cells.push({
          ...particle, delay, bend,
          target: field[cells.length % field.length],
          radius: .65 + random * .85,
          color: greens[Math.floor(Math.random() * greens.length)]
        });
      }
    }
    return cells;
  }

  function draw(now) {
    if (!active) return;
    const outgoing = phase === 'dissolve';
    const progress = clamp((now - started) / timing[phase]);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of parts) {
      const t = clamp((progress - particle.delay) / (1 - particle.delay));
      particle.travel = outgoing ? t : 1 - t;
      context.globalAlpha = 1 - smooth(particle.travel / .2);
      if (context.globalAlpha < .01) continue;
      const { left, top, w, h } = particle;
      context.drawImage(mask, left, top, w, h, left, top, w, h);
    }

    context.setTransform(scale, 0, 0, scale, 0, 0);
    for (const particle of parts) {
      const t = particle.travel;
      const distance = smooth(t);
      const opacity = smooth(t / .18) * (1 - smooth((t - .62) / .38));
      if (opacity < .01) continue;
      const dx = particle.target.x - particle.x;
      const dy = particle.target.y - particle.y;
      const length = Math.hypot(dx, dy) || 1;
      const bend = Math.sin(distance * Math.PI) * particle.bend;
      context.globalAlpha = opacity * .92;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(
        particle.x + dx * distance - dy / length * bend,
        particle.y + dy * distance + dx / length * bend,
        particle.radius * (1 + distance * .35), 0, 2 * Math.PI
      );
      context.fill();
    }
    context.globalAlpha = 1;
    if (progress < 1) {
      frame = requestAnimationFrame(draw);
    } else if (outgoing) {
      phase = 'field';
      timer = setTimeout(() => {
        currentTitle = (currentTitle + 1) % titles.length;
        animate('gather');
      }, timing.field);
    } else {
      holdTitle();
    }
  }

  function animate(next) {
    if (!active) return;
    if (next === 'dissolve') {
      if (!resizeCanvas()) return;
      mode = nextMode();
      field = makeField();
    }
    parts = sampleTitle(titles[currentTitle]);
    root.classList.add('is-particle-transition');
    phase = next;
    started = performance.now();
    draw(started);
  }

  function holdTitle(delay = timing.hold) {
    label.textContent = titles[currentTitle];
    root.classList.remove('is-particle-transition');
    phase = 'hold';
    timer = setTimeout(() => animate('dissolve'), delay);
  }

  function clearWork() {
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    root.classList.remove('is-particle-transition');
    parts = [];
    field = [];
  }

  function sync() {
    const shouldAnimate = visible && !document.hidden && !motionPreference.matches;
    if (shouldAnimate === active) return;
    active = shouldAnimate;
    clearWork();
    if (active) {
      holdTitle(timing.firstHold);
    } else {
      currentTitle = 0;
      label.textContent = titles[0];
    }
  }

  let observedWidth = root.clientWidth;
  let observedHeight = root.clientHeight;
  new ResizeObserver(() => {
    const { clientWidth, clientHeight } = root;
    if (clientWidth === observedWidth && clientHeight === observedHeight) return;
    observedWidth = clientWidth;
    observedHeight = clientHeight;
    if (active && clientWidth && clientHeight && phase !== 'hold') {
      clearWork();
      holdTitle();
    }
  }).observe(root);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio > 0;
    sync();
  }).observe(root);
  document.addEventListener('visibilitychange', sync);
  motionPreference.addEventListener('change', sync);
}, { once: true });
