/* Browser-only printed-text OCR. Images never leave this device. */
(() => {
  'use strict';
  const base = new URL('lib/ocr/', document.currentScript.src);
  let libraryPromise;
  let current = null;
  let previewURL = null;
  let blocksSubmit = false;
  const el = id => document.getElementById(id);
  const notify = () => window.handleInputChange(el('promptInput').value);
  const status = text => { el('ocrStatus').textContent = text; };

  function loadLibrary() {
    if (window.Tesseract) return Promise.resolve(window.Tesseract);
    if (!libraryPromise) libraryPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('tesseract.min.js', base).href;
      const fail = () => { clearTimeout(timer); script.remove(); libraryPromise = null; reject(new Error('识别组件加载失败，请检查网络后重试。')); };
      const timer = setTimeout(fail, 30000);
      script.onload = () => { clearTimeout(timer); resolve(window.Tesseract); };
      script.onerror = fail;
      document.head.append(script);
    });
    return libraryPromise;
  }

  function stop() {
    if (!current) return;
    const task = current;
    current = null;
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
    el('ocrText').value = '';
    el('fileUpload').value = '';
    blocksSubmit = false;
    notify();
  }

  async function recognize(file) {
    stop();
    blocksSubmit = true;
    el('ocrPanel').hidden = false;
    el('ocrApply').disabled = true;
    el('ocrRetry').hidden = true;
    el('ocrReview').hidden = true;
    el('ocrProgress').hidden = false;
    el('ocrProgress').removeAttribute('value');
    notify();
    status('正在加载识别组件，首次使用需要下载中文识别包…');
    const task = { worker: null, file };
    current = task;
    const deadline = new Promise((_, reject) => {
      task.cancel = reject;
      task.timer = setTimeout(() => reject(new Error('识别超时。请裁剪成一道题后重试，或手动输入。')), 90000);
    });
    try {
      const result = await Promise.race([deadline, (async () => {
        const library = await loadLibrary();
        if (current !== task) throw new Error('已取消识别');
        const worker = await library.createWorker('chi_sim+eng', 1, {
          workerPath: new URL('worker.min.js', base).href,
          corePath: new URL('core/', base).href,
          langPath: new URL('lang', base).href,
          logger(message) {
            if (current !== task) return;
            if (message.status === 'recognizing text') {
              el('ocrProgress').value = message.progress;
              status(`正在识别题目文字 ${Math.round(message.progress * 100)}%`);
            }
          },
          errorHandler: error => task.cancel(new Error('识别失败，请换一张清晰照片后重试。'))
        });
        if (current !== task) { await worker.terminate(); throw new Error('已取消识别'); }
        task.worker = worker;
        // Keep memory bounded on mobile while preserving printed text detail.
        const bitmap = await createImageBitmap(file);
        try {
          if (bitmap.width * bitmap.height > 48000000) throw new Error('图片像素过大，请裁剪成一道题后重试。');
          const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(bitmap.width * scale));
          canvas.height = Math.max(1, Math.round(bitmap.height * scale));
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          return await worker.recognize(canvas);
        } finally { bitmap.close(); }
      })()]);
      if (current !== task) return;
      const text = result.data.text.trim();
      if (!text) throw new Error('没有识别到文字。请拍清楚题干，避免反光，或手动输入。');
      el('ocrText').value = text;
      el('ocrReview').hidden = false;
      el('ocrApply').disabled = false;
      status('识别完成，请对照原图校对文字、数字和符号，再填入题目。');
    } catch (error) {
      if (current !== task) return;
      status(error.message?.includes('像素') || error.message?.includes('超时') || error.message?.includes('没有识别') || error.message?.includes('组件')
        ? error.message : '图片无法识别。请使用清晰的 JPG、PNG 或 WebP 图片，或手动输入。');
    } finally {
      if (current === task) {
        clearTimeout(task.timer);
        task.worker?.terminate().catch(() => {});
        task.worker = null;
        el('ocrProgress').hidden = true;
        el('ocrRetry').hidden = false;
        notify();
      }
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
    previewURL = URL.createObjectURL(file);
    el('ocrPreview').src = previewURL;
    el('ocrPreview').hidden = false;
    el('ocrFilename').textContent = file.name;
    await recognize(file);
  }

  window.DiagnosisOCR = { select, reset, get blocksSubmit() { return blocksSubmit; } };
  window.addEventListener('DOMContentLoaded', () => {
    el('ocrRemove').addEventListener('click', reset);
    el('ocrRetry').addEventListener('click', () => { if (current?.file) recognize(current.file); });
    el('ocrApply').addEventListener('click', () => {
      const text = el('ocrText').value.trim();
      if (!text) { status('识别文字为空，请补充或重新识别。'); return; }
      el('promptInput').value = text;
      blocksSubmit = false;
      status('已将校对后的文字填入题目。可以补充条件，再查看解析。');
      notify();
      el('promptInput').focus({ preventScroll: true });
    });
    el('ocrText').addEventListener('input', () => {
      blocksSubmit = true;
      el('ocrApply').disabled = !el('ocrText').value.trim();
      notify();
    });
  });
})();
