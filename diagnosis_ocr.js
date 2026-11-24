/* Local text OCR stays on-device; the explicit school-image button sends the image to the school gateway. */
(() => {
  'use strict';
  const base = new URL('lib/ocr/', document.currentScript.src);
  const libraryPromises = new Map();
  let current = null;
  let previewURL = null;
  let blocksSubmit = false;
  const el = id => document.getElementById(id);
  const notify = () => window.handleInputChange(el('promptInput').value);
  const status = text => { el('ocrStatus').textContent = text; };

  function loadLibrary(source) {
    if (window.Tesseract) return Promise.resolve(window.Tesseract);
    const address = source.href;
    if (!libraryPromises.has(address)) {
      const promise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = new URL('tesseract.min.js', source).href;
        const fail = () => { clearTimeout(timer); script.remove(); libraryPromises.delete(address); reject(new Error('识别组件下载失败，请检查网络后重试。')); };
        const timer = setTimeout(fail, 20000);
        script.onload = () => { clearTimeout(timer); resolve(window.Tesseract); };
        script.onerror = fail;
        document.head.append(script);
      });
      libraryPromises.set(address,promise);
    }
    return libraryPromises.get(address);
  }

  function stop() {
    if (!current) return;
    const task = current;
    current = null;
    task.closed = true;
    clearTimeout(task.timer);
    task.cancel?.(new Error('已取消识别'));
    task.worker?.terminate().catch(() => {});
  }

  function reset() {
    stop();
    if (previewURL) URL.revokeObjectURL(previewURL);
    previewURL = null;
    el('ocrPreview').removeAttribute('src');
    el('ocrFilename').textContent = '';
    el('ocrPanel').hidden = true;
    el('ocrVision').hidden = true;
    el('ocrText').value = '';
    el('fileUpload').value = '';
    blocksSubmit = false;
    notify();
  }

  const sources = location.hostname.endsWith('.github.io')
    ? [new URL('https://ahau-hfnk.netlify.app/ocr/v1/'), base]
    : [base, new URL('https://ahau-hfnk.netlify.app/ocr/v1/')];
  const cancelled = () => Object.assign(new Error('已取消识别'), { cancelled: true });
  const visibleTask = task => current === task && !task.closed;

  async function initializeWorker(task, source, freshCache) {
    let abandoned = false;
    let rejectInit;
    let lastActivity = Date.now();
    let lastStatus = '';
    let lastProgress = -1;
    const interrupted = new Promise((_, reject) => { rejectInit = reject; });
    task.cancel = () => { abandoned = true; rejectInit(cancelled()); };
    const absoluteTimer = setTimeout(() => rejectInit(new Error('识别资源初始化超时，请检查网络后重新下载。')), 180000);
    const stalledTimer = setInterval(() => {
      if (Date.now() - lastActivity > 90000) rejectInit(new Error('识别资源下载长时间没有进展，请检查网络后重新下载。'));
    }, 3000);
    const creation = (async () => {
      const library = await loadLibrary(source);
      if (!visibleTask(task) || abandoned) throw cancelled();
      const worker = await library.createWorker('chi_sim+eng', 1, {
        workerPath: new URL('worker.min.js', source).href,
        corePath: new URL('core/', source).href,
        langPath: new URL('lang', source).href,
        cachePath: 'anau-ocr-v1',
        cacheMethod: freshCache ? 'refresh' : 'write',
        logger(message) {
          if (!visibleTask(task) || abandoned) return;
          if (message.status !== lastStatus || message.progress !== lastProgress) {
            lastActivity = Date.now(); lastStatus = message.status; lastProgress = message.progress;
          }
          const labels = {
            'loading tesseract core': '正在下载识别引擎',
            'initializing tesseract': '正在启动识别引擎',
            'loading language traineddata': '正在加载中英文识别包（首次使用需要下载）',
            'initializing api': '识别包已就绪，正在初始化'
          };
          if (message.status === 'recognizing text') {
            el('ocrProgress').value = message.progress;
            status(`正在识别题目文字 ${Math.round(message.progress * 100)}%`);
          } else if (labels[message.status]) {
            const percent = Number.isFinite(message.progress) ? ` ${Math.round(message.progress * 100)}%` : '';
            el('ocrProgress').value = Number.isFinite(message.progress) ? message.progress : 0;
            status(labels[message.status] + percent);
          }
        },
        errorHandler: () => rejectInit(new Error('识别引擎或语言包加载失败，请重新下载后重试。'))
      });
      // createWorker only resolves after initialization. A cancelled/expired attempt
      // must never start image recognition or leave a late worker running.
      if (abandoned || !visibleTask(task)) { await worker.terminate(); throw cancelled(); }
      return worker;
    })();
    try { return await Promise.race([creation, interrupted]); }
    catch (error) { abandoned = true; throw error; }
    finally { clearTimeout(absoluteTimer); clearInterval(stalledTimer); }
  }

  async function recognize(file, freshCache = false) {
    stop();
    blocksSubmit = true;
    el('ocrPanel').hidden = false;
    el('ocrApply').disabled = true;
    el('ocrRetry').hidden = true;
    el('ocrReview').hidden = true;
    el('ocrProgress').hidden = false;
    el('ocrProgress').removeAttribute('value');
    notify();
    const task = { worker: null, file, closed: false };
    current = task;
    try {
      let error;
      for (let index = 0; index < sources.length; index++) {
        status(index === 0 ? '正在连接识别资源，准备加载引擎…' : '主资源连接未完成，正在切换备用来源…');
        el('ocrProgress').removeAttribute('value');
        try {
          task.worker = await initializeWorker(task, sources[index], freshCache || index > 0);
          error = null; break;
        } catch (cause) {
          if (!visibleTask(task) || cause.cancelled) throw cause;
          error = cause;
        }
      }
      if (error) throw error;
      if (!visibleTask(task)) return;
      status('识别资源已就绪，正在读取题目图片…');
      let rejectRecognition;
      const interrupted = new Promise((_, reject) => { rejectRecognition = reject; });
      task.cancel = () => rejectRecognition(cancelled());
      task.timer = setTimeout(() => rejectRecognition(new Error('图片识别超时。识别包已加载，请裁剪成一道题后重试。')), 90000);
      const recognition = (async () => {
        const bitmap = await createImageBitmap(file);
        try {
          if (bitmap.width * bitmap.height > 48000000) throw new Error('图片像素过大，请裁剪成一道题后重试。');
          if (!visibleTask(task)) throw cancelled();
          const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(bitmap.width * scale));
          canvas.height = Math.max(1, Math.round(bitmap.height * scale));
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          return await task.worker.recognize(canvas);
        } finally { bitmap.close(); }
      })();
      const result = await Promise.race([recognition, interrupted]);
      if (!visibleTask(task)) return;
      const text = result.data.text.trim();
      if (!text) throw new Error('没有识别到文字。请拍清楚题干，避免反光，或手动输入。');
      el('ocrText').value = text;
      el('ocrReview').hidden = false;
      el('ocrApply').disabled = false;
      const mathematical = /函数|无穷小|方程|极限|积分|导数|矩阵|sin|cos|[=^]/.test(text);
      status(mathematical ? '这是本机OCR的文字草稿：数学指数、上下标和图形可能丢失。请用下方学校图片识题，或逐项对照原图校正后再使用。' : '已提取文字草稿，请对照原图校对后再填入题目。');
    } catch (error) {
      if (!visibleTask(task)) return;
      status(/像素|超时|没有识别|资源|下载|语言包|引擎|组件/.test(error.message)
        ? error.message : '图片无法识别。请使用清晰的 JPG、PNG 或 WebP 图片，或手动输入。');
    } finally {
      if (current === task) {
        task.closed = true;
        clearTimeout(task.timer);
        task.worker?.terminate().catch(() => {});
        task.worker = null;
        el('ocrProgress').hidden = true;
        el('ocrRetry').hidden = false;
        el('ocrRetry').textContent = '重新下载识别包并重试';
        notify();
      }
    }
  }

  async function recognizeVision() {
    const file = current?.file;
    if (!file) return;
    stop();
    const task = {file,closed:false,worker:null}; current = task;
    const controller = new AbortController(); task.cancel = () => controller.abort();
    blocksSubmit = true; notify();
    el('ocrReview').hidden = true; el('ocrApply').disabled = true;
    el('ocrProgress').hidden = false; el('ocrProgress').removeAttribute('value');
    el('ocrVision').disabled = true; el('ocrRetry').hidden = true;
    status('正在读取原图。此次图片将直接发送到学校AI网关识别公式…');
    try {
      const bitmap = await createImageBitmap(file);
      let dataURL;
      try {
        if (bitmap.width * bitmap.height > 48000000) throw new Error('图片像素过大，请裁剪成一道题。');
        const scale = Math.min(1,2200 / Math.max(bitmap.width,bitmap.height));
        const canvas = document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
        const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
        dataURL=canvas.toDataURL(file.type==='image/png'?'image/png':'image/jpeg',.94);
        if(dataURL.length>8*1024*1024)dataURL=canvas.toDataURL('image/jpeg',.9);
      } finally {bitmap.close();}
      if(!visibleTask(task))return;
      status('正在请求学校网关读取原图中的题干和公式…');
      const text = await window.CampusModel.recognizeImage(dataURL,{signal:controller.signal});
      if(!visibleTask(task))return;
      el('ocrText').value=text;el('ocrReview').hidden=false;
      el('ocrApply').disabled=/\[无法辨认\]/.test(text);
      status(/\[无法辨认\]/.test(text) ? '学校图片识题返回了无法辨认的内容，请对照原图补全后再使用。' : '学校图片识题已返回，请重点核对指数、函数名和选项，再填入题目。');
    } catch(error) {
      if(!visibleTask(task))return;
      status(error.modelConnection ? error.message : '图片未能完成学校识别，请检查校园网并重试；不会替换为样题。');
    } finally {
      if(current===task){task.closed=true;el('ocrProgress').hidden=true;el('ocrVision').disabled=false;el('ocrRetry').hidden=false;notify();}
    }
  }

  async function select(file) {
    if (!file) return;
    reset();
    el('ocrPanel').hidden = false;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
      status('请选择 JPG、PNG 或 WebP 图片；HEIC 请先转换或截图。');
      el('ocrPreview').hidden = true;
      el('ocrReview').hidden = true;
      el('ocrRetry').hidden = true;
      el('ocrProgress').hidden = true;
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      status('图片超过15MB，请裁剪或压缩后重试。');
      el('ocrPreview').hidden = true;
      el('ocrReview').hidden = true;
      el('ocrRetry').hidden = true;
      el('ocrProgress').hidden = true;
      return;
    }
    el('ocrVision').hidden = false;
    el('ocrVision').disabled = false;
    previewURL = URL.createObjectURL(file);
    el('ocrPreview').src = previewURL;
    el('ocrPreview').hidden = false;
    el('ocrFilename').textContent = file.name;
    await recognize(file);
  }

  window.DiagnosisOCR = { select, reset, get blocksSubmit() { return blocksSubmit; } };
  window.addEventListener('DOMContentLoaded', () => {
    el('ocrRemove').addEventListener('click', reset);
    el('ocrVision').addEventListener('click', recognizeVision);
    el('ocrRetry').addEventListener('click', () => { if (current?.file) recognize(current.file, true); });
    el('ocrApply').addEventListener('click', () => {
      const text = el('ocrText').value.trim();
      if (!text) { status('识别文字为空，请补充或重新识别。'); return; }
      if (/\[无法辨认\]/.test(text)) { status('请先补全无法辨认的内容，再填入题目。'); return; }
      el('promptInput').value = text;
      blocksSubmit = false;
      status('已将校对后的文字填入题目。可以补充条件，再查看解析。');
      notify();
      el('promptInput').focus({ preventScroll: true });
    });
    el('ocrText').addEventListener('input', () => {
      blocksSubmit = true;
      el('ocrApply').disabled = !el('ocrText').value.trim() || /\[无法辨认\]/.test(el('ocrText').value);
      notify();
    });
  });
})();
