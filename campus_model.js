/* Fixed school gateway transport shared by the lobby and diagnosis workshop. */
(() => {
  'use strict';
  const endpoint = 'https://llmv1.ahau.edu.cn/v1/chat/completions';
  const model = 'Deepseek-V4.1-Flash-SS';
  const storageKey = 'anau_school_key_session';
  let key = '';
  let settingsPromise;
  let state = { connected: false, configured: false, message: '尚未验证模型连接' };
  try { key = sessionStorage.getItem(storageKey) || localStorage.getItem('anau_custom_api_key') || ''; } catch {}
  const configured = () => Boolean(key.trim());
  const publish = patch => {
    state = { ...state, configured: configured(), ...patch };
    window.dispatchEvent(new CustomEvent('campus-model-status', { detail: { ...state } }));
  };
  function failure(message) { const error = new Error(message); error.modelConnection = true; return error; }

  function configure() {
    if (settingsPromise) return settingsPromise;
    const previousFocus = document.activeElement;
    const dialog = document.createElement('dialog');
    dialog.className = 'campus-model-dialog';
    dialog.setAttribute('aria-labelledby', 'campus-model-title');
    dialog.innerHTML = `<form><h2 id="campus-model-title">模型连接</h2>
      <p>使用学校提供的 DeepSeek API。设备需能访问学校网关；连接校园网后仍可能受浏览器跨域或证书限制。</p>
      <label for="campus-model-key">学校 API Key</label>
      <input id="campus-model-key" type="password" autocomplete="off" spellcheck="false" placeholder="填写学校提供的 Key">
      <label class="campus-model-remember"><input type="checkbox" id="campus-model-remember">在此标签页保存，方便刷新及切换页面</label>
      <p class="campus-model-note">默认仅留在当前页面内存。勾选后保存在本设备此标签页的会话存储中。Key 仅发送给学校网关，不提交 GitHub 或地图代理。</p>
      <p class="campus-model-error" role="status" aria-live="polite"></p>
      <div class="campus-model-actions"><button type="button" data-forget>清除配置</button><button type="button" data-cancel>取消</button><button type="submit">使用此配置</button></div></form>`;
    const input = dialog.querySelector('input[type=password]');
    const remember = dialog.querySelector('input[type=checkbox]');
    input.value = key;
    try { remember.checked = Boolean(sessionStorage.getItem(storageKey)); } catch {}
    document.body.append(dialog);
    settingsPromise = new Promise(resolve => {
      function close(result) {
        input.value = '';
        dialog.close(); dialog.remove(); settingsPromise = null;
        previousFocus?.focus(); resolve(result);
      }
      dialog.addEventListener('cancel', event => { event.preventDefault(); close(false); });
      dialog.querySelector('[data-cancel]').onclick = () => close(false);
      dialog.querySelector('[data-forget]').onclick = () => {
        key = ''; input.value = '';
        try { sessionStorage.removeItem(storageKey); localStorage.removeItem('anau_custom_api_key'); } catch {}
        publish({ connected: false, message: '模型配置已清除' }); close(false);
      };
      dialog.querySelector('form').onsubmit = event => {
        event.preventDefault();
        const value = input.value.trim();
        if (!value || value.length > 4096 || /\s/.test(value)) {
          dialog.querySelector('[role=status]').textContent = '请填写有效的学校 API Key，不要带空格。'; return;
        }
        key = value;
        try {
          // Never keep an obsolete persistent key after an explicit config save.
          localStorage.removeItem('anau_custom_api_key');
          if (remember.checked) sessionStorage.setItem(storageKey, key);
          else sessionStorage.removeItem(storageKey);
        } catch {}
        publish({ connected: false, message: '学校直连已配置，发送题目后验证' }); close(true);
      };
    });
    dialog.showModal();
    return settingsPromise;
  }

  async function direct(payload, timeoutMs) {
    if (!configured() && !await configure()) throw failure('尚未配置学校 Key。请点击“模型连接”配置后重试。');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', redirect: 'error', credentials: 'omit',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({ ...payload, model, stream: false }), signal: controller.signal
      });
      if (!response.ok) {
        const descriptions = {
          401: '学校网关拒绝了 Key（401），请检查模型连接配置。',
          403: '学校网关拒绝访问（403），请确认校园网及账号权限。',
          429: '学校模型请求过多（429），请稍后重试。'
        };
        throw failure(descriptions[response.status] || `学校网关返回 HTTP ${response.status}，请稍后重试。`);
      }
      let data;
      try { data = await response.json(); } catch { throw failure('学校网关未返回有效 JSON，请稍后重试。'); }
      const content = data?.choices?.[0]?.message?.content;
      if (typeof content !== 'string' || !content.trim()) throw failure('学校模型没有返回解析正文，请重试。');
      publish({ connected: true, message: '校级 DeepSeek 直连成功' });
      return content.trim();
    } catch (error) {
      const safe = error.modelConnection ? error : failure(error.name === 'AbortError'
        ? '学校模型响应超时，请稍后重试。'
        : '浏览器无法连接学校网关。请检查校园网、证书及跨域许可；这不一定表示未连校园网。');
      publish({ connected: false, message: safe.message });
      throw safe;
    } finally { clearTimeout(timer); }
  }

  async function request(messages, { purpose = 'chat', temperature = 0.7, maxTokens = 1500, timeoutMs = 45000 } = {}) {
    // Static GitHub hosting has no API; go directly to the school gateway.
    if (!location.hostname.endsWith('.github.io')) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(purpose === 'diagnosis' ? 'api/anau/deepseek_diagnose' : 'api/anau/chat_completions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(purpose === 'diagnosis' ? { prompt: messages.at(-1).content }
            : { model, messages, temperature, max_tokens: maxTokens }), signal: controller.signal
        });
        const data = response.ok ? await response.json() : null;
        const content = purpose === 'diagnosis' ? data?.markdown : data?.data?.choices?.[0]?.message?.content;
        if (data?.success === true && typeof content === 'string' && content.trim()) {
          publish({ connected: true, message: '校级 DeepSeek 后端调用成功' }); return content.trim();
        }
      } catch { /* Preserve the original direct fallback if the local API fails. */ }
      finally { clearTimeout(timer); }
    }
    return direct({ messages, temperature, max_tokens: maxTokens }, timeoutMs);
  }
  window.CampusModel = { request, configure, get status() { return { ...state, configured: configured() }; } };
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-model-config]').forEach(button => button.addEventListener('click', configure));
  });
})();
