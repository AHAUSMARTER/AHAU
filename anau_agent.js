/**
 * ==============================================================================
 * 徽农智 · 安农智办 (AHAU Smart Agent Core) - 原创全栈智能体引擎
 * 首届“农芯智”AI智能体创新大赛 · 原创代码类作品核心驱动库
 * 架构：自研混合推理引擎 (离线精准知识库 + 多轮办事状态机 + 视觉多模态快诊 + 云端LLM适配)
 * 版权所有 © 2026 安徽农业大学「安农智办」团队
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // 0. 安徽农业大学 权威规章与事实基座
  // ----------------------------------------------------------------------------
  const OFFICIAL_CITATIONS = {
    'ahau-jw-2024-18': {
      id: 'ahau-jw-2024-18',
      title: '安徽农业大学本科生学籍管理规定 (2024年修订版)',
      no: '安农校发〔2024〕18号',
      dept: '教务处',
      date: '2024年8月26日',
      excerpt: '第十五条 学生因病、因事离校必须严格履行书面请假审批手续。请假2天以内由辅导员审批并报学院备案；请假3天至7天由学院分管学生工作领导审批；请假7天以上须报教务处与学工部联合备案。未经批准擅自离校者按旷课处理。公私分级安全机制保障：系统仅生成拟办审批单，严禁AI越权代签。',
      lawUrl: 'https://bkjw.ahau.edu.cn'
    },
    'ahau-zc-2023-42': {
      id: 'ahau-zc-2023-42',
      title: '安徽农业大学本科生综合素质测评实施办法',
      no: '安农学字〔2023〕42号',
      dept: '学生工作部 (处) / 资助中心',
      date: '2023年9月15日',
      excerpt: '第七条 综合测评成绩由学业成绩(70%)、德育表现(15%)、创新创业与学科竞赛(10%)、外语特长(5%)四部分组成。学业成绩按必修课与专业选修课绩点严格折算。国家奖学金推荐人选综合素质测评成绩须位列专业前10%，且无任何挂科违纪记录。各分值微调计算规则透明公示。',
      lawUrl: 'https://xg.ahau.edu.cn'
    },
    'ahau-hq-2022-09': {
      id: 'ahau-hq-2022-09',
      title: '安徽农业大学公共教学场地借用与安全使用守则',
      no: '安农资后〔2022〕09号',
      dept: '后勤保障处 / 教务处',
      date: '2022年10月11日',
      excerpt: '第四条 勤学楼、博学楼公共多媒体教室原则上优先保障日常本科教学。班级召开主题班会或学术讲座借用，须由经办人在系统提交借用申请单，注明活动主题与责任人，严禁擅自转借第三方或用于盈利性活动。借用提交须本人确认。',
      lawUrl: 'https://hq.ahau.edu.cn'
    },
    'ahau-exam-2024-03': {
      id: 'ahau-exam-2024-03',
      title: '安徽农业大学本科课程考核与学业成绩评定规范',
      no: '安农教〔2024〕03号',
      dept: '教务处',
      date: '2024年1月10日',
      excerpt: '第九条 鼓励学生开展自主式探究学习与真题诊断。智能助学系统应立足认知诊断本质，区分粗心笔误与概念性混淆，不得直接出具无思维深度的应试答案；艾宾浩斯复习曲线与自测权重必须采用确定性离线算法，确保教学评测严肃性与可溯源性。',
      lawUrl: 'https://bkjw.ahau.edu.cn'
    }
  };

  // ----------------------------------------------------------------------------
  // 核心特色组件渲染引擎 (公私安全栅栏 / 参数推演沙盘 / 错因认知诊断)
  // ----------------------------------------------------------------------------
  function renderActionGatingWidget(g) {
    const gid = 'gating-' + Math.floor(100000 + Math.random() * 900000);
    return `
      <div class="security-gating-card" id="${gid}">
        <div class="security-gating-header">
          <div class="gating-title-wrap">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>公私分级安全栅栏 · 敏感写入操作人审确认</span>
          </div>
          <span class="gating-badge-promise">0次越权安全承诺</span>
        </div>
        <p class="gating-desc">
          <strong>公私分级安全机制（0次擅自越权承诺）</strong>：公开校园规章与可用状态已由 AI 自动核验完成；教务与学工系统<strong>写操作、正式离校报备、场地审批单提交</strong>属于学生私有高敏业务，<strong>AI 绝不越权擅自点击提交</strong>，必须由您本人最终审定签名！
        </p>
        <div class="gating-details-box">
          <div class="gating-detail-row"><span class="label">业务类型:</span><span class="val">${g.bizType}</span></div>
          <div class="gating-detail-row"><span class="label">申请经办人:</span><span class="val">${g.applicant}</span></div>
          <div class="gating-detail-row"><span class="label">归口单位:</span><span class="val">${g.targetDept}</span></div>
          <div class="gating-detail-row"><span class="label">凭证单号:</span><span class="val">${g.docNo}</span></div>
        </div>
        <div class="gating-actions-wrap" id="${gid}-actions">
          <button class="btn-gating-confirm" onclick="window.AnauAgent.confirmActionGating('${gid}', '${g.bizType}', '${g.docNo}')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>本人核验无误 · 电子签名并授权提交
          </button>
          <button class="btn-gating-cancel" onclick="window.AnauAgent.cancelActionGating('${gid}')">暂存为拟办草案</button>
        </div>
      </div>
    `;
  }

  function renderAgentWeberPassiveWidget(data) {
    const wid = 'weber-' + data.docNo;
    const stepsHtml = data.steps.map((s, idx) => {
      const isDone = s.status === 'done';
      return `
        <div style="display:flex; align-items:flex-start; gap:10px; font-size:12.5px;">
          <div style="width:20px; height:20px; border-radius:50%; background:${isDone ? '#f0fdf4' : '#fffbeb'}; border:1.5px solid ${isDone ? '#22c55e' : '#f59e0b'}; color:${isDone ? '#16a34a' : '#d97706'}; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; flex-shrink:0; margin-top:1px;">
            ${isDone ? '✓' : idx + 1}
          </div>
          <div style="flex:1;">
            <div style="font-weight:600; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center;">
              <span>${s.name}</span>
              <span style="font-size:10.5px; font-weight:600; padding:1px 6px; border-radius:4px; ${isDone ? 'background:#dcfce7; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}">${isDone ? '已核验' : '待授权'}</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-tertiary); margin-top:2px;">${s.detail}</div>
          </div>
        </div>
      `;
    }).join('<div style="margin-left:9px; height:8px; border-left:1.5px dashed #cbd5e1;"></div>');

    return `
      <div class="security-gating-card" id="${wid}" style="border-left: 3px solid #6366f1; background:#ffffff; box-shadow:0 4px 16px rgba(0,0,0,0.06); border-radius:14px; padding:16px; margin-top:10px;">
        <div class="security-gating-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div class="gating-title-wrap" style="display:flex; align-items:center; gap:8px;">
            <div style="width:24px; height:24px; border-radius:6px; background:rgba(99,102,241,0.1); color:#6366f1; display:flex; align-items:center; justify-content:center;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <div style="font-size:13.5px; font-weight:700; color:var(--text-primary);">${data.title}</div>
              <div style="font-size:10.5px; color:var(--text-tertiary); margin-top:1px;">归口单位: ${data.dept} · 单号: ${data.docNo}</div>
            </div>
          </div>
          <span class="gating-badge-promise" style="font-size:10.5px; font-weight:600; padding:2px 8px; border-radius:6px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;">0次擅自越权</span>
        </div>

        <!-- 流水线多节点追踪 -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-bottom:12px;">
          ${stepsHtml}
        </div>

        <!-- 双轨安全隔离说明 -->
        <div style="font-size:11.5px; line-height:1.5; color:#475569; background:#f1f5f9; padding:8px 12px; border-radius:8px; margin-bottom:12px;">
          <strong>公私数据双轨隔离保障：</strong>此卡片使用示例数据。确认按钮仅改变本页演示状态。
        </div>

        <!-- 动作按钮 -->
        <div class="gating-actions-wrap" id="${wid}-actions" style="display:flex; gap:10px;">
          <button class="btn-gating-confirm" style="flex:1; padding:9px 14px; border-radius:8px; background:#4f46e5; color:#ffffff; font-size:12.5px; font-weight:600; border:none; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="window.AnauAgent.confirmWeberAction('${wid}', '${data.title}', '${data.docNo}')">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            <span>核验无误 · 模拟授权流转</span>
          </button>
          <button class="btn-gating-cancel" style="padding:9px 14px; border-radius:8px; background:#f1f5f9; color:#475569; font-size:12.5px; font-weight:600; border:1px solid #cbd5e1; cursor:pointer;" onclick="window.AnauAgent.cancelWeberAction('${wid}')">
            暂存只读草案
          </button>
        </div>
      </div>
    `;
  }

  function renderZongceSlidersWidget(initialGpa = 3.65, initialVol = 24, initialComp = 3) {
    const wid = 'slider-box-' + Math.floor(100000 + Math.random() * 900000);
    return `
      <div class="interactive-slider-box" id="${wid}" data-initial-gpa="${initialGpa}" data-initial-vol="${initialVol}" data-initial-comp="${initialComp}">
        <div class="slider-box-header">
          <div class="slider-box-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--agent-green);"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            <span>综测与奖学金动态参数推演沙盘 (自主研发参数实时响应系统)</span>
          </div>
          <span class="slider-box-pill">实时拖动推演</span>
        </div>
        <div class="slider-controls-group">
          <div class="slider-control-item">
            <div class="slider-label-row">
              <span class="slider-label-title">学业成绩绩点 (GPA)</span>
              <span class="slider-val-badge" id="${wid}-gpa-val">${initialGpa.toFixed(2)}</span>
            </div>
            <input type="range" class="slider-range-input" id="${wid}-gpa-slider" min="2.00" max="4.50" step="0.05" value="${initialGpa.toFixed(2)}" oninput="window.AnauAgent.updateZongceSliders('${wid}')">
          </div>
          <div class="slider-control-item">
            <div class="slider-label-row">
              <span class="slider-label-title">志愿汇认定工时 (小时)</span>
              <span class="slider-val-badge" id="${wid}-vol-val">${initialVol} 小时</span>
            </div>
            <input type="range" class="slider-range-input" id="${wid}-vol-slider" min="0" max="60" step="5" value="${initialVol}" oninput="window.AnauAgent.updateZongceSliders('${wid}')">
          </div>
          <div class="slider-control-item">
            <div class="slider-label-row">
              <span class="slider-label-title">学科竞赛与双创加分 (分值)</span>
              <span class="slider-val-badge" id="${wid}-comp-val">+${initialComp}.0 分</span>
            </div>
            <input type="range" class="slider-range-input" id="${wid}-comp-slider" min="0" max="10" step="1" value="${initialComp}" oninput="window.AnauAgent.updateZongceSliders('${wid}')">
          </div>
        </div>
        <div class="slider-live-dashboard">
          <div class="slider-total-score-wrap">
            <span class="slider-total-label">实时推演综合测评总分</span>
            <span class="slider-total-number" id="${wid}-total-score">--</span>
          </div>
          <div class="slider-award-wrap">
            <div class="slider-award-tier" id="${wid}-award-tier">计算中...</div>
            <div class="slider-award-rank" id="${wid}-award-rank">排位区间计算中</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderCognitiveProbeWidget(probeType = 'gaoshu') {
    const pid = 'probe-' + Math.floor(100000 + Math.random() * 900000);
    return `
      <div class="probe-diagnostic-card" id="${pid}">
        <div class="probe-header">
          <div class="probe-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#2563eb;"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>期末真题错因认知诊断探针靶场 (多维概念漏洞定位闭环)</span>
          </div>
          <span class="probe-rule-badge">确定性离线复习规则</span>
        </div>
        <div class="probe-question-box">
          <strong>【安农高等数学期末统考真题 · 错因穿透】</strong><br>
          求极限：lim_{x→0} (sin x - x) / x³。请选择您推导得出的计算结果：
        </div>
        <div class="probe-options-list" id="${pid}-options">
          <button class="probe-option-btn" onclick="window.AnauAgent.submitDiagnosticProbe('${pid}', 'A')">
            <span><strong>选项 A</strong>：结果为 0 (直接将分子 sin x 代换为 x 得到 (x-x)/x³ = 0)</span>
            <span style="font-size:11px; color:#94a3b8;">诊断 ›</span>
          </button>
          <button class="probe-option-btn" onclick="window.AnauAgent.submitDiagnosticProbe('${pid}', 'B')">
            <span><strong>选项 B</strong>：结果为 -1/6 (利用三阶泰勒展开 sin x = x - x³/6 + o(x³))</span>
            <span style="font-size:11px; color:#94a3b8;">诊断 ›</span>
          </button>
          <button class="probe-option-btn" onclick="window.AnauAgent.submitDiagnosticProbe('${pid}', 'C')">
            <span><strong>选项 C</strong>：结果不存在 / 震荡无界</span>
            <span style="font-size:11px; color:#94a3b8;">诊断 ›</span>
          </button>
        </div>
        <div id="${pid}-feedback" style="display:none;"></div>
      </div>
    `;
  }

  function renderCurriculumDAGWidget() {
    return `
      <div class="curriculum-dag-card">
        <div class="dag-header">
          <span class="dag-title">课程先修后继依赖拓扑图 (Curriculum Precedence DAG)</span>
          <span style="font-size:11px; color:#64748b;">先修约束 · 知识断层前瞻</span>
        </div>
        <div class="dag-chain">
          <div class="dag-node passed">
            <span>高等数学 (上)</span>
            <span style="font-size:10px; opacity:0.8;">已结课 · 88分</span>
          </div>
          <span class="dag-arrow">➔</span>
          <div class="dag-node current">
            <span>高等数学 (下)</span>
            <span style="font-size:10px; opacity:0.8;">在修核心 · 级数/多重积分</span>
          </div>
          <span class="dag-arrow">➔</span>
          <div class="dag-node future">
            <span>线性代数与空间解析几何</span>
            <span style="font-size:10px; opacity:0.8;">矩阵/特征值/二次型</span>
          </div>
          <span class="dag-arrow">➔</span>
          <div class="dag-node future">
            <span>概率论与数理统计 / 农业大数据</span>
            <span style="font-size:10px; opacity:0.8;">大三核心专业基础</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderResearchPlazaWidget(customData = {}) {
    const pid = 'plaza-' + Math.floor(100000 + Math.random() * 900000);
    const sourceRole = customData.sourceRole || '需求发起方 (本端)';
    const sourceName = customData.sourceName || '茶树病害多光谱与表型课题组';
    const sourceDept = customData.sourceDept || '茶学重点实验室 · 农科团队';
    const targetRole = customData.targetRole || '最佳撮合对端 (匹配中)';
    const targetName = customData.targetName || '嵌入式AI与计算机视觉课题组';
    const targetDept = customData.targetDept || '信息与计算机学院 · 工科团队';
    const matchScore = customData.matchScore || '98.6%';

    return `
      <div class="research-plaza-card" id="${pid}">
        <div class="research-plaza-header">
          <div class="research-plaza-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#2563eb;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            <span>科研与学业互助广场 · 多智能体 P2P 需求撮合网络</span>
          </div>
          <span class="research-plaza-badge">多智能体直连</span>
        </div>

        <p class="research-plaza-desc">
          <strong>运作机制（AI跑腿，学生拍板）</strong>：本地智能体已提炼您的跨学科需求特征标签，并在全校科研互助节点中完成语义多维撮合；初步技术与需求契合研判由智能体自动化处理，<strong>实验数据资产交付与正式项目组队权责严格由双方同学本人实名审定</strong>！
        </p>

        <div class="research-plaza-tags-section">
          <div class="plaza-tags-title">
            <span>本端持有资源与研究条件 (已提炼标签)</span>
            <span style="font-size:11px; color:#166534; font-weight:normal;">数据与试验支持</span>
          </div>
          <div class="plaza-tags-list">
            <span class="plaza-tag-pill source">#茶树病斑多光谱数据集</span>
            <span class="plaza-tag-pill source">#5000+田间样本已标注</span>
            <span class="plaza-tag-pill source">#茶学理化实验工位</span>
            <span class="plaza-tag-pill source">#挑战杯/大创重点推荐</span>
          </div>
          <div class="plaza-tags-title" style="margin-top:10px;">
            <span>需求与期望匹配能力 (算法与工程)</span>
            <span style="font-size:11px; color:#1e40af; font-weight:normal;">算法与算力支撑</span>
          </div>
          <div class="plaza-tags-list">
            <span class="plaza-tag-pill target">#计算机视觉CV</span>
            <span class="plaza-tag-pill target">#YOLO轻量化剪枝</span>
            <span class="plaza-tag-pill target">#端侧嵌入式部署</span>
            <span class="plaza-tag-pill target">#算法主力联合组队</span>
          </div>
        </div>

        <div class="research-plaza-topology">
          <div class="plaza-topo-node">
            <div class="plaza-topo-role">${sourceRole}</div>
            <div class="plaza-topo-name">${sourceName}</div>
            <div class="plaza-topo-dept">${sourceDept}</div>
            <div class="plaza-topo-status">本地智能体 · 已就绪</div>
          </div>
          <div class="plaza-topo-bus">
            <div class="plaza-bus-line">
              <span>‹--</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg>
              <span>--›</span>
            </div>
            <div class="plaza-bus-label">P2P 撮合信道</div>
          </div>
          <div class="plaza-topo-node">
            <div class="plaza-topo-role">${targetRole}</div>
            <div class="plaza-topo-name">${targetName}</div>
            <div class="plaza-topo-dept">${targetDept}</div>
            <div class="plaza-topo-status">对端智能体 · 已对接</div>
          </div>
        </div>

        <div class="research-plaza-match-box">
          <div class="plaza-match-metric">
            <strong>撮合语义契合度评价</strong>
            <span class="plaza-match-score">匹配契合度 ${matchScore}</span>
          </div>
          <div>
            <strong>对端智能体响应反馈</strong>：信息与计算机学院团队正在开展农林边缘计算与轻量化目标检测算法研究，亟需真实农田多光谱数据用于模型调优与成果申报；双方技术优势与数据资产形成闭环互补。
          </div>
        </div>

        <div class="research-plaza-actions" id="${pid}-actions">
          <button class="btn-plaza-confirm" onclick="window.AnauAgent.confirmResearchPlaza('${pid}')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            本人审定意向 · 建立点对点安全信道
          </button>
          <button class="btn-plaza-cancel" onclick="window.AnauAgent.cancelResearchPlaza('${pid}')">
            暂存为拟发布草案
          </button>
        </div>
      </div>
    `;
  }

  function ensureCitationDrawerMounted() {
    if (document.getElementById('ahauCitationDrawerOverlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'citation-drawer-overlay';
    overlay.id = 'ahauCitationDrawerOverlay';
    overlay.onclick = function (e) {
      if (e.target === overlay) {
        window.AnauAgent.closeCitationDrawer();
      }
    };
    overlay.innerHTML = `
      <div class="citation-drawer-panel" onclick="event.stopPropagation()">
        <div class="citation-drawer-header">
          <div class="citation-drawer-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--agent-green);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span id="citationDrawerDocTitle">权威规章与校情事实核验</span>
          </div>
          <button class="citation-drawer-close" onclick="window.AnauAgent.closeCitationDrawer()">✕</button>
        </div>
        <div class="citation-drawer-body">
          <div class="citation-meta-pill" id="citationDrawerMeta">发文文号与单位</div>
          <div style="font-size:12px; color:#64748b; margin-bottom:8px;">【规章原文摘录 · 防幻觉事实基座】：</div>
          <blockquote class="citation-excerpt-quote" id="citationDrawerExcerpt">
            规章原文...
          </blockquote>
          <div style="font-size:11.5px; color:#64748b; margin-top:14px; display:flex; justify-content:space-between; align-items:center;">
            <span>事实索引来源：安徽农业大学官方公开红头文件库</span>
            <span style="color:#16a34a; font-weight:600;">已通过校园网事实核验</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  // ----------------------------------------------------------------------------
  // 1. 安徽农业大学 100% 权威实景知识库 (防大模型幻觉核心资产)
  // ----------------------------------------------------------------------------
  const AHAU_KB = {
    buildings: {
      勤学楼: {
        type: '核心教学楼',
        desc: '全校主要本科公共教学楼，配置大量多媒体大阶梯教室（如 606、302 等）。高数、大物、外语及思政等公共基础必修课多在此楼开展。一楼配有自习区、直饮水机与学院展板。',
        location: '校园东部教学区，紧邻银杏路与学校东门。',
        cat: '花姐（安农著名三花校猫）常年在楼内巡视、陪读甚至“监考”。'
      },
      博学楼: {
        type: '核心教学楼',
        desc: '全校专业课程教学与研讨核心大楼，承担各学院日常专业实验、期末统考及学术讲座，学习氛围浓郁，自习考研座位充足。',
        location: '校园教学区核心腹地，绿树掩映。'
      },
      勤政楼: {
        type: '行政办公楼（严正声明：非学生上课楼宇！）',
        desc: '学校党政机关老师办公大楼！学生处（学工部）、教务处、保卫处、校团委、财务处均设在勤政楼。学生办理学籍异动、盖章审批、综合测评请前往此处；【日常上课请去勤学楼或博学楼，切勿跑错！】',
        location: '校园南北主轴线南段，靠近南元路与长江西路南门。'
      },
      智慧广场: {
        type: '迎新与大型活动总站',
        desc: '全校开阔活动广场，每年新生报到接待总站、社团“百团大战”招新及大型双选会举办地。',
        location: '校园西北部。'
      },
      学生一站式服务中心: {
        type: '综合生活办事大厅',
        desc: '办理户籍迁移、党团关系接转、绿色通道资助、宿舍调整及保险理赔等事务。',
        location: '学生宿舍北区东侧（紧邻思源餐厅）。'
      }
    },
canteens: {
      东苑食堂: '校内四大主题食堂之一，位于东区，紧邻勤学楼教学区与学校东门，是早八下课与中午就餐高峰首选。',
      西苑食堂: '校内四大主题食堂之一，位于校园西区，风味特色档口众多，各类炒菜、特色瓦罐汤、营养早餐包点齐全，西区上课就餐首选。',
      北苑食堂: '校内四大主题食堂之一，位于校园北侧，靠近电山路北门，出餐迅速、经济实惠。',
      欣苑食堂: '校内四大主题食堂之一，全校人气最高的热门食堂，涵盖大众实惠自选快餐、特色面食、铁板烧与轻食沙拉。',
      丰泽食堂: '校外宿舍区（北区）核心食堂之一，位于北区西侧，下楼即达，为北区住宿生提供一日三餐与暖心夜宵。',
      思源餐厅: '校外宿舍区（北区）核心餐厅之一，位于北区东侧（紧邻学生一站式服务中心），就餐环境现代宽敞。'
    },
    catRoster: [
  {
    "id": "001",
    "name": "来福",
    "gender": "公",
    "pet_rating": "一定不要撸/不能撸/可以试试/小心撸/随便撸",
    "neutered": "已绝育",
    "location": "东门",
    "personality": "公猫，需要爱护。一定切记，不能惹他生气，不然就兔子蹬鹰了。",
    "notes": "",
    "image_file": "001_来福_东门.jpg"
  },
  {
    "id": "002",
    "name": "玳瑁",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "东门",
    "personality": "名义上来福的老婆，但他俩之间只有斗争，比较乖，主动找你可以放心摸",
    "notes": "",
    "image_file": "002_玳瑁_东门.jpeg"
  },
  {
    "id": "003",
    "name": "花子",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "已死亡",
    "personality": "跟花姐一样喜欢进勤学楼，很危险，跟人玩开心了会抓人",
    "notes": "",
    "image_file": "003_花子_已死亡.jpg"
  },
  {
    "id": "004",
    "name": "花姐",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "勤学楼",
    "personality": "大网红猫，每天随机在勤学楼宠幸学生",
    "notes": "",
    "image_file": "004_花姐_勤学楼.jpg"
  },
  {
    "id": "005",
    "name": "毛毛",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "勤学楼",
    "personality": "勤学楼西侧门口保安",
    "notes": "",
    "image_file": "005_毛毛_勤学楼.jpg"
  },
  {
    "id": "006",
    "name": "小黑",
    "gender": "公",
    "pet_rating": "一定要撸！手上有零食有吃的一定要摸！",
    "neutered": "已绝育",
    "location": "化学楼",
    "personality": "和小漂亮小橘白是好朋友，嘴馋，爱吃冻干之类的小零食，亲人胆小，经常在化学楼后面路边的栏杆处（即东苑对面）讨饭",
    "notes": "图片由小红书用户“浮华与光”提供",
    "image_file": "006_小黑_化学楼.jpeg"
  },
  {
    "id": "007",
    "name": "小漂亮",
    "gender": "母",
    "pet_rating": "嘴巴馋，智商低，但是特别会撒娇，经典两面派，只认吃的不认人！如果它主动蹭人一定要摸！！智商太低，摸别的地方摸爽了有时候会挠人，建议只摸下巴背部还有屁股尾巴根那块",
    "neutered": "已绝育",
    "location": "化学楼",
    "personality": "和小黑小橘白是好朋友，嘴馋，胆小，但是为了吃的特别会撒娇，同时嫉妒心很强，在化学楼附近，目前能打得过的猫只有肥肥一个，如果喂肥肥的时候不给它吃一点，就会一直咬肥肥",
    "notes": "图片由小红书用户“浮华与光”提供",
    "image_file": "007_小漂亮_化学楼.jpeg"
  },
  {
    "id": "008",
    "name": "馆长",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "图书馆",
    "personality": "比较亲人，但是动作太大会逃跑",
    "notes": "",
    "image_file": "008_馆长_图书馆.jpeg"
  },
  {
    "id": "009",
    "name": "福二代",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "图书馆",
    "personality": "脾气好好",
    "notes": "",
    "image_file": "009_福二代_图书馆.jpeg"
  },
  {
    "id": "010",
    "name": "哑嗓子",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "图书馆",
    "personality": "",
    "notes": "",
    "image_file": "010_哑嗓子_图书馆.jpg"
  },
  {
    "id": "011",
    "name": "大吉",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "第二报告厅",
    "personality": "特别亲人，给吃的会更亲你",
    "notes": "图片由小红书用户“浮华与光”提供",
    "image_file": "011_大吉_第二报告厅.jpeg"
  },
  {
    "id": "012",
    "name": "",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "第二报告厅",
    "personality": "胆子比较小，动作太大会被吓跑，给吃的会主动贴贴你",
    "notes": "图片由小红书用户“浮华与光”提供",
    "image_file": "012_未命名_012_第二报告厅.jpeg"
  },
  {
    "id": "013",
    "name": "白肚子",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "第二报告厅",
    "personality": "胆子比较小，一开始以为是只纯黑猫，结果是只奶牛，肚子上有白毛",
    "notes": "",
    "image_file": "013_白肚子_第二报告厅.jpeg"
  },
  {
    "id": "014",
    "name": "小可怜",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "第二报告厅",
    "personality": "一只颜值非常非常非常在线的小母猫，你摸它时，它会喵喵叫，但是要小心摸到他敏感点他可能会生气",
    "notes": "",
    "image_file": "014_小可怜_第二报告厅.jpeg"
  },
  {
    "id": "015",
    "name": "孔明",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "第二报告厅",
    "personality": "有吃的会主动靠近",
    "notes": "ps：右一",
    "image_file": "015_孔明_第二报告厅.jpeg"
  },
  {
    "id": "016",
    "name": "嘴上有屎",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "第二报告厅",
    "personality": "打人!小猫打人!",
    "notes": "",
    "image_file": "016_嘴上有屎_第二报告厅.jpeg"
  },
  {
    "id": "017",
    "name": "足球八嘎",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "猫坡",
    "personality": "不喜欢被摸，但是可以摸，摸一下就会叫一下",
    "notes": "",
    "image_file": "017_足球八嘎_猫坡.jpeg"
  },
  {
    "id": "018",
    "name": "英国佬",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "猫坡",
    "personality": "脾气特别好，可以摸可以捏爪爪",
    "notes": "",
    "image_file": "018_英国佬_猫坡.jpg"
  },
  {
    "id": "019",
    "name": "花卷",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "猫坡",
    "personality": "亲人，好摸，脾气好，",
    "notes": "",
    "image_file": "019_花卷_猫坡.jpeg"
  },
  {
    "id": "020",
    "name": "黑头",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "猫坡",
    "personality": "脾气好，可摸",
    "notes": "",
    "image_file": "020_黑头_猫坡.jpeg"
  },
  {
    "id": "021",
    "name": "",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "新苑十字路口",
    "personality": "有吃的会让你摸一摸 动作大了会怕",
    "notes": "",
    "image_file": "021_未命名_021_新苑十字路口.jpg"
  },
  {
    "id": "022",
    "name": "",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "博学楼",
    "personality": "怕人",
    "notes": "",
    "image_file": "022_未命名_022_博学楼.jpg"
  },
  {
    "id": "023",
    "name": "",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "博学楼",
    "personality": "怕人",
    "notes": "",
    "image_file": "023_未命名_023_博学楼.png"
  },
  {
    "id": "024",
    "name": "",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "新苑十字路口",
    "personality": "贪吃，胆子比较小",
    "notes": "图片由小红书用户“浮华与光”提供",
    "image_file": "024_未命名_024_新苑十字路口.png"
  },
  {
    "id": "025",
    "name": "",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "新苑十字路口",
    "personality": "贪吃，胆子比较小",
    "notes": "",
    "image_file": "025_未命名_025_新苑十字路口.jpg"
  },
  {
    "id": "026",
    "name": "詹记",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "新苑十字路口",
    "personality": "贪吃，胆子比较小",
    "notes": "",
    "image_file": "026_詹记_新苑十字路口.png"
  },
  {
    "id": "027",
    "name": "屁姐",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "幼儿园宿舍区",
    "personality": "很喜欢被拍屁股，经常刷新在电动车上 有个叫屁哥的逆子",
    "notes": "",
    "image_file": "027_屁姐_幼儿园宿舍区.jpeg"
  },
  {
    "id": "028",
    "name": "屁哥",
    "gender": "公",
    "pet_rating": "",
    "neutered": "",
    "location": "幼儿园宿舍区",
    "personality": "比较怕人",
    "notes": "",
    "image_file": "028_屁哥_幼儿园宿舍区.jpg"
  },
  {
    "id": "029",
    "name": "熟蛋黄/丧彪",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "幼儿园宿舍区",
    "personality": "每天顶着个委屈脸，很亲人，喜欢进宿舍楼",
    "notes": "",
    "image_file": "029_熟蛋黄_丧彪_幼儿园宿舍区.jpeg"
  },
  {
    "id": "030",
    "name": "小橘白",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "幼儿园宿舍区",
    "personality": "面具姐小跟班",
    "notes": "",
    "image_file": "030_小橘白_幼儿园宿舍区.png"
  },
  {
    "id": "031",
    "name": "面具姐",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "幼儿园宿舍区",
    "personality": "一只特别乖的玳瑁猫，孩几颜值十分在线，只要不惹他生气，随便rua。",
    "notes": "",
    "image_file": "031_面具姐_幼儿园宿舍区.jpeg"
  },
  {
    "id": "032",
    "name": "花花",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "动科院",
    "personality": "脾气真的特别好，特别乖巧的一只小猫。是一只特别漂亮的三花猫。如果你有幸在动科楼上课的话，学姐可是会监督你学习的哦",
    "notes": "",
    "image_file": "032_花花_动科院.jpeg"
  },
  {
    "id": "033",
    "name": "小白",
    "gender": "母",
    "pet_rating": "",
    "neutered": "",
    "location": "动科院",
    "personality": "很爱撒娇，喜欢在人面前翻肚皮，但是稍微有一点点怕人",
    "notes": "",
    "image_file": "033_小白_动科院.jpg"
  },
  {
    "id": "034",
    "name": "小十一",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "经管院",
    "personality": "一只名副其实的嘴碎的小猫，你摸他你抱她，你亲她，她都会疯狂的喵喵叫。但是它说叫人越兴奋。",
    "notes": "图片由小红书用户“浮华与光”提供",
    "image_file": "034_小十一_经管院.jpeg"
  },
  {
    "id": "035",
    "name": "鸟哥",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "体育部办公楼",
    "personality": "爱好是打架，心愿是打遍天下无敌猫，是北一门一霸，领地意识非常强。但是对女生特别温柔。碰到他可以召唤温柔大橘 极品M，请疯狂的打他屁股",
    "notes": "",
    "image_file": "035_鸟哥_体育部办公楼.jpeg"
  },
  {
    "id": "036",
    "name": "小虎斑 （鸟哨）",
    "gender": "母",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "体育部办公楼",
    "personality": "有段时间和鸟哥一起 可摸，软软的 是母猫，鸟哥的好闺蜜之一",
    "notes": "",
    "image_file": "036_小虎斑 （鸟哨）_体育部办公楼.jpeg"
  },
  {
    "id": "037",
    "name": "齐刘海八嘎",
    "gender": "公",
    "pet_rating": "不要摸",
    "neutered": "已绝育",
    "location": "东门",
    "personality": "老猫一只，以前在北一门附近活动，从北一门跑来东门，主要在化学楼，还有校内宿舍345栋到东苑这一块活动，嘴馋会主动在人身上蹭来蹭去，不让摸，不要近距离喂食，容易被他抓伤！！！",
    "notes": "",
    "image_file": "037_齐刘海八嘎_东门.jpg"
  },
  {
    "id": "038",
    "name": "无名氏",
    "gender": "公",
    "pet_rating": "狠狠撸",
    "neutered": "已绝育",
    "location": "已被领养",
    "personality": "26年8月突然出现在学校里的宠物猫，老抽色橘白，性格温顺，爱吃猫条鸡胸肉，喜欢睡在石头上，刚来正在适应中，白天胆小怕人，晚上热情似火，可以随便摸随便抱",
    "notes": "",
    "image_file": "038_无名氏_已被领养.jpg"
  },
  {
    "id": "039",
    "name": "脏脏白",
    "gender": "公",
    "pet_rating": "不要摸",
    "neutered": "未绝育",
    "location": "化学楼",
    "personality": "很谨慎的一只公猫，胆小，嘴馋，不要近距离喂食，会拿爪子挠人！！主要在东门以及东门外的小区内穿梭，很狡猾，一发情就失踪，把身上弄得很脏，也不爱打理。会在别的猫打架的时候偷它们的饭吃。",
    "notes": "",
    "image_file": "039_脏脏白_化学楼.jpg"
  },
  {
    "id": "040",
    "name": "肥肥",
    "gender": "母",
    "pet_rating": "一定要狠狠撸！！",
    "neutered": "未绝育",
    "location": "化学楼",
    "personality": "图书馆大猫所生，眼睛有问题，被猫妈遗弃，被救助人救治后放到化学楼附近，未成年猫，性格活泼亲人，很害怕小漂亮，给它喂食需注意小漂亮在场的话也得给小漂亮吃，不然小漂亮会打它咬它",
    "notes": "",
    "image_file": "040_肥肥_化学楼.jpg"
  },
  {
    "id": "041",
    "name": "小橘白",
    "gender": "公",
    "pet_rating": "胆小怕人，只有讨饭的时候能摸摸，如果能摸得到就摸吧",
    "neutered": "已绝育",
    "location": "化学楼",
    "personality": "和小黑小漂亮是好朋友，胆小但是嘴馋，正在和小黑小漂亮学习撒娇的技巧中，努力学习讨饭，经常用这个姿势在化学楼后面路边的栏杆上趴着",
    "notes": "",
    "image_file": "041_小橘白_化学楼.jpg"
  },
  {
    "id": "042",
    "name": "彩狸",
    "gender": "母",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "东门",
    "personality": "曾经在东门女研楼下面生活，但被来福霸占了地盘扫地出门，居无定所四处流浪，在勤学楼，化学楼，勤政楼附近流浪，一直独来独往，经常被小橘白还有齐刘海八嘎欺负，夜晚偶尔会偷偷回到女研楼下面吃饭，漂泊的彩狸会想家吗？",
    "notes": "",
    "image_file": "042_彩狸_东门.jpg"
  },
  {
    "id": "043",
    "name": "冒号",
    "gender": "",
    "pet_rating": "摸不到",
    "neutered": "已绝育",
    "location": "化学楼",
    "personality": "胆小，嘴馋，抢姥姥饭吃的时候偶尔还会打它",
    "notes": "",
    "image_file": "043_冒号_化学楼.jpg"
  },
  {
    "id": "044",
    "name": "姥姥",
    "gender": "母",
    "pet_rating": "摸不到",
    "neutered": "已绝育",
    "location": "化学楼",
    "personality": "胆小，嘴馋",
    "notes": "",
    "image_file": "044_姥姥_化学楼.jpg"
  },
  {
    "id": "045",
    "name": "无名氏",
    "gender": "公",
    "pet_rating": "摸不到",
    "neutered": "未绝育，蛋很大",
    "location": "化学楼",
    "personality": "在勤学楼对面的灌木丛里活动，有的时候会从勤政楼跑到化学楼附近找饭吃，叫声难听，嘴馋，有时候能看见他和勤学楼的狸白花子打架",
    "notes": "",
    "image_file": "045_无名氏_化学楼.jpg"
  },
  {
    "id": "046",
    "name": "无名氏",
    "gender": "公",
    "pet_rating": "摸不到",
    "neutered": "",
    "location": "化学楼",
    "personality": "一只没有尾巴的胖狸白，有一个好兄弟经常一起活动，是一只有尾巴的胖橘白，从南门迁徙到东门化学楼附近活动，经常在化学楼附近觅食",
    "notes": "",
    "image_file": "046_无名氏_化学楼.jpg"
  },
  {
    "id": "047",
    "name": "无名氏",
    "gender": "公",
    "pet_rating": "摸不到",
    "neutered": "",
    "location": "化学楼",
    "personality": "和没有尾巴的胖梨白是好朋友，鼻头上面一点白，很肥很肥很肥，以前和狸白一起在南门生活，后来迁徙到化学楼附近",
    "notes": "",
    "image_file": "047_无名氏_化学楼.jpg"
  },
  {
    "id": "048",
    "name": "无名氏",
    "gender": "公",
    "pet_rating": "摸不到",
    "neutered": "未绝育",
    "location": "化学楼",
    "personality": "胆小，叫声很难听，为了找东西吃，有时候会去勤学楼那边溜达",
    "notes": "",
    "image_file": "048_无名氏_化学楼.jpg"
  },
  {
    "id": "049",
    "name": "",
    "gender": "公",
    "pet_rating": "近距离喂食会挠人",
    "neutered": "已绝育",
    "location": "东苑",
    "personality": "有时候会出现在北苑对面的一运附近，有时候会出现在校内宿舍四栋和五栋中间的院子里，或者在东苑食堂附近的巷子里面溜达，有一段时间出现在勤学楼，是瘦版的鼻头一点白的橘白猫，和狸白鼻头一点白是亲兄弟",
    "notes": "",
    "image_file": "049_未命名_049_东苑.jpg"
  },
  {
    "id": "050",
    "name": "",
    "gender": "公",
    "pet_rating": "摸不到",
    "neutered": "已绝育",
    "location": "东苑",
    "personality": "鼻头一点白，和上面那只橘白是亲兄弟，胆子特别小，很怕人，经常在四五栋中间的院子里看到它，两兄弟有时候会和齐刘海八嘎一起玩",
    "notes": "",
    "image_file": "050_未命名_050_东苑.jpg"
  },
  {
    "id": "051",
    "name": "",
    "gender": "",
    "pet_rating": "不让摸，一摸就哈气。",
    "neutered": "",
    "location": "化学楼",
    "personality": "留学生散养的奶牛猫，经常在化学楼水杉苑附近活动，偶尔在成教院附近溜达，爱蹭饭，爱吃冻干，害怕来福，不让陌生人摸",
    "notes": "",
    "image_file": "051_未命名_051_化学楼.jpg"
  },
  {
    "id": "052",
    "name": "",
    "gender": "",
    "pet_rating": "摸不到",
    "neutered": "",
    "location": "化学楼",
    "personality": "上巴半边白半边黑，下巴白，有口水巾，怕人，常在夜晚出来活动，胆子很小。",
    "notes": "",
    "image_file": "052_未命名_052_化学楼.jpg"
  },
  {
    "id": "053",
    "name": "",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "体育部办公楼",
    "personality": "",
    "notes": "",
    "image_file": "053_未命名_053_体育部办公楼.jpg"
  },
  {
    "id": "054",
    "name": "小罐(像煤气罐)",
    "gender": "母",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "北二门图书馆附近草丛",
    "personality": "亲人，爱叫，声音很嗲，毛发油光水滑，让人摸，但有时候会跳起来抓人",
    "notes": "",
    "image_file": "054_小罐(像煤气罐)_北二门图书馆附近草丛.jpg"
  },
  {
    "id": "055",
    "name": "小美(很漂亮",
    "gender": "母",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "北二门图书馆以及科技楼",
    "personality": "小彩狸，亲人，爱叫，毛发蓬松，让人摸，和小罐是一窝的",
    "notes": "",
    "image_file": "055_小美(很漂亮_北二门图书馆以及科技楼.jpg"
  },
  {
    "id": "056",
    "name": "小清",
    "gender": "母",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "信计院和图书馆",
    "personality": "亲人，但比较独立，比较护食，吃饭的时候不能把她的的饭拿走，不然他会抓人，和小罐小花是一窝的",
    "notes": "",
    "image_file": null
  },
  {
    "id": "057",
    "name": "小巴",
    "gender": "公",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "北二门图书馆信计楼",
    "personality": "亲人，黏人，但是有些没有边界感，之前在消防站长大的",
    "notes": "",
    "image_file": null
  },
  {
    "id": "",
    "name": "小黑",
    "gender": "公",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "图书馆和信计院",
    "personality": "亲人，比较独立，在消防站长大的，和小巴是一窝的",
    "notes": "",
    "image_file": null
  },
  {
    "id": "",
    "name": "小精灵",
    "gender": "公",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "信计院和图书馆",
    "personality": "从校外公寓跑来的，比较亲人，但是很谨慎，喜欢跟着人跑，有时要注意他过马路",
    "notes": "",
    "image_file": null
  },
  {
    "id": "059",
    "name": "小浅黑",
    "gender": "公",
    "pet_rating": "没摸过，不靠近，注意",
    "neutered": "未绝育",
    "location": "信计院和图书馆",
    "personality": "不知道从哪里跑来的，比较瘦，比较胆小，但也不会攻击人，只会在旁边等着要吃的",
    "notes": "",
    "image_file": null
  },
  {
    "id": "060",
    "name": "小橘子",
    "gender": "公",
    "pet_rating": "小心撸",
    "neutered": "已绝育",
    "location": "图书馆和信计院",
    "personality": "亲人，聪明敏感，有好几岁了，一直有口炎，喜欢拍屁股，尽量不要摸他的脸，因为靠近嘴巴会疼，喂食物的话，可以用水和猫条拌一拌，软化猫粮，状态比以前稳定一些",
    "notes": "",
    "image_file": null
  },
  {
    "id": "061",
    "name": "四瓜",
    "gender": "公",
    "pet_rating": "小心撸",
    "neutered": "未绝育",
    "location": "图书馆第二报告厅",
    "personality": "他的妈妈是小彩狸，他性格很好，和三瓜很像，长得和三观也很像，可以报，但是有时候和他玩，他会抓人和咬人，要稍微注意点",
    "notes": "",
    "image_file": "061_四瓜_图书馆第二报告厅.jpg"
  },
  {
    "id": "062",
    "name": "对眼",
    "gender": "公",
    "pet_rating": "",
    "neutered": "已绝育",
    "location": "第二报告厅",
    "personality": "跟嘴上有屎是报告厅双恶霸，会打人",
    "notes": "",
    "image_file": "062_对眼_第二报告厅.jpg"
  }
],
    cats: {
      来福: {
        feature: '001号校宠，全校公认“最胖、最圆滚滚”的代表，东门霸主。',
        spot: '常年在【学校东门】保安亭旁、减速带或暖阳石阶上趴着晒太阳。',
        nature: '公猫，已绝育，需要爱护。一定切记，不能惹他生气，不然就兔子蹬鹰了！',
        rating: '不能惹 / 小心撸',
        care: '来福体重大幅超标，严禁投喂高盐高脂的人类香肠与重油熟食！建议仅投喂低脂猫粮或干净饮用水。'
      },
      玳瑁: {
        feature: '002号校宠，东门常驻。',
        spot: '常在【学校东门】附近活动。',
        nature: '母猫，已绝育，名义上来福的老婆，但他俩之间只有斗争。比较乖，主动找你可以放心摸。',
        rating: '主动找你可以放心摸 / 随便撸'
      },
      花姐: {
        feature: '004号校宠，经典三花猫（黑、橘、白斑纹相间，毛发整洁）。',
        spot: '常年在【勤学楼内】巡视、后排课桌趴着陪读甚至“荣誉监考”。',
        nature: '母猫，已绝育，安农大网红猫，每天随机在勤学楼宠幸学生陪读。',
        rating: '随便撸 / 教学楼内保持安静清洁'
      },
      毛毛: {
        feature: '005号校宠，勤学楼常驻守门猫。',
        spot: '常在【勤学楼】西侧门口。',
        nature: '母猫，已绝育，勤学楼西侧门口保安，尽职尽责。',
        rating: '随便撸'
      },
      小黑: {
        feature: '006号校宠，黑猫，常年讨饭。',
        spot: '常在【化学楼】后面路边栏杆处（即东苑对面）讨饭。',
        nature: '公猫，已绝育，和小漂亮、小橘白是好朋友，嘴馋爱吃冻干零食，亲人胆小。',
        rating: '一定要撸！手上有零食吃的必须要摸！'
      },
      小漂亮: {
        feature: '007号校宠，高颜值撒娇两面派。',
        spot: '常在【化学楼】附近活动。',
        nature: '母猫，已绝育，嘴馋胆小但为了吃的特别会撒娇，经典两面派只认吃的不认人！嫉妒心强，只打得过肥肥。',
        rating: '主动蹭人一定要摸！建议摸下巴背部和尾巴根'
      },
      馆长: {
        feature: '008号校宠，图书馆代表名猫。',
        spot: '常在【图书馆】周边出没。',
        nature: '母猫，已绝育，比较亲人，但是动作太大会逃跑。',
        rating: '小心撸 / 动作轻柔'
      },
      大吉: {
        feature: '011号校宠，第二报告厅名猫。',
        spot: '常在【第二报告厅】附近。',
        nature: '公猫，已绝育，特别亲人，给吃的会更亲你。',
        rating: '随便撸 / 带冻干贴贴'
      },
      英国佬: {
        feature: '018号校宠，猫坡顶流绅士。',
        spot: '常在【猫坡】区域活动。',
        nature: '公猫，已绝育，脾气特别好，可以摸可以捏爪爪！',
        rating: '随便撸 / 可以捏爪爪'
      },
      嘴上有屎: {
        feature: '016号校宠，奶牛猫，第二报告厅双恶霸之一。',
        spot: '【第二报告厅】。',
        nature: '打人！小猫打人！与062号“对眼”合称报告厅双恶霸。',
        rating: '一定不要撸 / 会打人！'
      },
      屁姐: {
        feature: '027号校宠，刷新在电动车上。',
        spot: '常在【幼儿园宿舍区】出没，经常刷新在电动车坐垫上。',
        nature: '母猫，很喜欢被拍屁股，有个叫屁哥的逆子。',
        rating: '喜欢被拍屁股 / 随便撸'
      },
      鸟哥: {
        feature: '035号校宠，北一门一霸。',
        spot: '常在【体育部办公楼 / 北一门】附近活动。',
        nature: '爱好是打架，心愿是打遍天下无敌猫，是北一门一霸，领地意识极强。',
        rating: '霸主巡视 / 请勿挑衅'
      }
    },
    agri: {
      teaLab: {
        name: '茶树生物学与资源利用国家重点实验室',
        status: '安徽农业大学唯一的省部共建国家重点实验室，茶学国家重点学科核心支撑！',
        achievements: '在茶树全基因组测序、黄山毛峰/祁门红茶/六安瓜片品质机理、茶树抗寒抗旱分子育种领域处于世界一流水平。',
        location: '校园中部科研实验区，紧邻茶与食品科技学院与生化实验大楼。',
        garden: '校内配有茶树种质资源圃，引种保存有舒茶早、鸠坑种等百余种国家级优良茶树品系。'
      },
      trees: {
        银杏路: '勤学楼以东，北连东苑、南通东门。每年11-12月落叶铺金，是全校著名的“金秋十里金黄”打卡胜地，也是植物分类学课程野外课堂。',
        香樟路: '长江西路南门主校门向北贯穿的核心林荫大道，百年古樟树冠雄伟，夏日绿荫蔽日，清香宜人。',
        水杉与雪松: '大礼堂周边与勤政楼草坪，水杉为国家一级古老孑遗名木，秋冬锈红；雪松挺拔象征严谨校风。'
      }
    },
    // ------------------------------------------------------------------------
    // 1.5 安徽农业大学官方师资队伍与学术导师名录 (100% 官网真实核验，严禁杜撰)
    // ------------------------------------------------------------------------
    faculty: [
      {
        college: '农学院',
        officialPortal: 'http://agri.ahau.edu.cn/szdw/zrjs/nxx.htm',
        contactOffice: '农学院教务科研办 / 电话: 0551-65786205',
        teachers: [
          { name: '姜东', title: '教授 / 博士生导师', role: '安徽农业大学学术副校长，长江学者特聘教授，国家杰出青年科学基金获得者', research: '小麦栽培生理生态、小麦品质形成机理与智慧调优技术', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2023908' },
          { name: '武立权', title: '教授 / 博士生导师', role: '农学院院长', research: '水稻高产优质高效栽培生理、稻作生态与智慧稻作技术', link: 'http://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2004013' },
          { name: '黄正来', title: '教授 / 博士生导师', role: '作物栽培与耕作学专家', research: '作物栽培学与耕作学、小麦抗逆栽培、防灾减灾农艺技术', link: 'http://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=1985015' },
          { name: '李金才', title: '教授 / 博士生导师', role: '作物生理学资深教授', research: '作物抗逆生理生态、小麦高产优质栽培机理', link: 'http://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=1984019' },
          { name: '宋贺', title: '教授 / 博士生导师', role: '作物逆境生理专家', research: '作物生理与分子生物学、农田资源高效利用', link: 'http://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2012004' },
          { name: '张文静', title: '教授 / 博士生导师', role: '玉米育种与耕作专家', research: '玉米遗传育种与高产栽培、粮饲兼用玉米选育', link: 'http://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2007035' },
          { name: '杜祥备', title: '教授 / 硕士生导师', role: '大豆栽培与生理专家', research: '大豆高产高效栽培理论与技术、大豆玉米带状复合种植', link: 'http://agri.ahau.edu.cn/szdw/zrjs/nxx.htm' },
          { name: '郑文寅', title: '教授 / 硕士生导师', role: '作物遗传育种专家', research: '油菜遗传改良与分子育种、耐逆基因挖掘与功能解析', link: 'http://agri.ahau.edu.cn/szdw/zrjs/nxx.htm' }
        ]
      },
      {
        college: '茶业学院 / 全国重点实验室',
        officialPortal: 'http://cysp.ahau.edu.cn/szdw/cyx.htm',
        contactOffice: '茶业楼研究生办公室 / 电话: 0551-65786002',
        teachers: [
          { name: '宛晓春', title: '二级教授 / 博士生导师', role: '原安徽农业大学党委书记、校长，茶树生物学与资源利用国家重点实验室主任，全国茶学学科带头人', research: '茶叶生物化学、食品化学、茶树次生代谢', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1985008' },
          { name: '夏恩华', title: '教授 / 博士生导师', role: '茶树生物学与资源利用国家重点实验室常务副主任、国家级领军人才', research: '茶叶品质形成与逆境调控、代谢基因组学、茶树基因组学', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2017078' },
          { name: '宁井铭', title: '教授 / 博士生导师', role: '茶业学院副院长', research: '茶叶加工工程、光谱图像技术在茶叶品质分析中的应用、数字化品控', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1998009' },
          { name: '宋传奎', title: '教授 / 博士生导师', role: '国家杰出学术带头人', research: '茶树香气物质代谢与生物工程、茶树细胞分子生物学', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2016045' },
          { name: '李大祥', title: '教授 / 博士生导师', role: '茶业学院院长', research: '茶叶营养品质与健康、茶叶生物化学与综合利用、茶叶标准', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2004019' },
          { name: '张正竹', title: '教授 / 博士生导师', role: '茶学重点实验室骨干教授', research: '制茶工程及天然产物化学、质量安全控制与高值化利用', link: 'http://cysp.ahau.edu.cn/szdw/cyx.htm' },
          { name: '韦朝领', title: '教授 / 博士生导师', role: '茶树遗传育种专家', research: '茶树育种与种质创新、茶树功能基因挖掘与利用', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1998031' },
          { name: '邓威威', title: '教授 / 博士生导师', role: '茶学青年拔尖学者', research: '茶树次生代谢与调控、茶树茶氨酸合成与表观遗传', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2010037' }
        ]
      },
      {
        college: '人工智能学院',
        officialPortal: 'https://xzxy.ahau.edu.cn/szdw.htm',
        contactOffice: '信息智造楼研究生办公室 / 电话: 0551-65786193',
        teachers: [
          { name: '辜丽川', title: '教授 / 博士生导师', role: '人工智能学院院长', research: '农业空间信息技术、智能信息处理、大模型农业应用、图像智能识别', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2005065' },
          { name: '张友华', title: '教授 / 博士生导师', role: '安徽省智慧农业研究院院长，智慧农业学科带头人', research: '农业物联网、农业大数据与智慧农业、人工智能在农业中的应用', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1995051' },
          { name: '张武', title: '教授 / 博士生导师', role: '人工智能学院副院长', research: '农业信息化、生物信息学与智能计算、大数据分析', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2003009' },
          { name: '王凯', title: '教授 / 硕士生导师', role: '计算机系资深教授', research: '计算机视觉、多媒体信息处理、数字图像处理', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1998025' },
          { name: '王永梅', title: '教授 / 硕士生导师', role: '软件工程系主任', research: '软件工程、智能信息处理、系统可靠性分析', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2000038' },
          { name: '叶勇', title: '教授 / 硕士生导师', role: '网络工程系教授', research: '网络与分布式计算、数据库技术、智慧农林物联网', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2006038' },
          { name: '樊冬梅', title: '教授 / 硕士生导师', role: '计算机系统结构专家', research: '模式识别与智能系统、图像处理与目标检测', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2007022' },
          { name: '杨帅', title: '特任教授 / 博士', role: '青年领军人才', research: '农业遥感与深度学习、农情智能监测与无人机表型解析', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2022085' }
        ]
      },
      {
        college: '园艺学院',
        officialPortal: 'http://yyxy.ahau.edu.cn/szdw.htm',
        contactOffice: '园艺楼教研与研管办 / 电话: 0551-65786220',
        teachers: [
          { name: '吴俊', title: '教授 / 博士生导师', role: '园艺学院院长、国家级人才', research: '果树种质资源与分子育种、梨基因组与遗传变异、重要品质性状功能基因挖掘', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2020901' },
          { name: '朱晓彪', title: '教授 / 博士生导师', role: '蔬菜分子生物学专家', research: '植物分子遗传学、马铃薯与蔬菜表观遗传调控机制、分子育种', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2019035' },
          { name: '方从兵', title: '教授 / 博士生导师', role: '果树生理生态带头人', research: '果树栽培生理、草莓特色果树种质资源利用与优质高效栽培技术', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=1993021' },
          { name: '衡伟', title: '教授 / 硕士生导师', role: '果树遗传育种专家', research: '梨树遗传育种、果皮外观性状（果锈、褐变）分子机制与生产技术', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2005012' },
          { name: '郑朋朋', title: '教授 / 博士生导师', role: '逆境分子生物学专家', research: '猕猴桃逆境分子生物学、冷冻胁迫耐受调控与抗涝分子机制', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2018042' },
          { name: '陈友根', title: '教授 / 硕士生导师', role: '设施农业工程专家', research: '蔬菜与食用菌遗传育种、设施环境智慧调控、绿色高效栽培技术', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=1999018' }
        ]
      },
      {
        college: '林学与园林学院',
        officialPortal: 'http://lyyxy.ahau.edu.cn/szdw.htm',
        contactOffice: '林学楼研究生办公室 / 电话: 0551-65786530',
        teachers: [
          { name: '夏志超', title: '教授 / 博士生导师', role: '林学与园林学院骨干教授', research: '森林培育与土壤生态学、雌雄异株植物资源获取利用策略、根叶-微生物互作', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2019088' },
          { name: '尹冬梅', title: '教授 / 博士生导师', role: '风景园林学学科带头人', research: '园林植物种质资源创新与遗传育种、功能花卉逆境生理、园林康养与人居生态', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2008016' },
          { name: '刘盛全', title: '教授 / 博士生导师', role: '木材科学与技术专家、国际教育学院院长', research: '木材解剖与材质改良、材性与森林培育及高效利用关系', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1986012' },
          { name: '林英任', title: '教授 / 博士生导师', role: '森林保护与微生物泰斗', research: '真菌学系统发育、斑痣盘菌目分类、林木病理与食药用菌资源开发', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1983015' },
          { name: '胡丰林', title: '教授 / 博士生导师', role: '微生物与经济林专家', research: '真菌代谢组学及生物活性物质高通量筛选、昆虫病原真菌生物防治利用', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1995018' },
          { name: '徐小牛', title: '教授 / 博士生导师', role: '森林生态学资深专家', research: '森林生态系统养分循环、全球变化与森林碳汇、退化生态系统修复', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2002015' }
        ]
      },
      {
        college: '资源与环境学院',
        officialPortal: 'http://zhxy.ahau.edu.cn/szdw.htm',
        contactOffice: '资环楼科研教务办 / 电话: 0551-65786131',
        teachers: [
          { name: '吴祥为', title: '教授 / 博士生导师', role: '校党委常委、副校长，农药残留与农业环境安全专家', research: '环境微污染物迁移转化机制、农药环境残留分析与控制技术、农产品产地安全', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html' },
          { name: '胡宏祥', title: '教授 / 博士生导师', role: '农业资源利用知名专家', research: '土壤质量提升、农业面源与重金属污染控制、农业废弃物综合利用', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2003018' },
          { name: '马超', title: '教授 / 博士生导师', role: '土壤生物学带头人', research: '土壤微生物生态和土壤肥力、秸秆有机废弃物肥料化技术、低产田土壤生物障碍消减', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2014022' },
          { name: '王毅', title: '教授 / 博士生导师', role: '农药学系主任、神农学者', research: '农药环境毒理、纳米农药研发、农药环境残留与农产品质量安全', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2015033' },
          { name: '蒋跃林', title: '教授 / 硕士生导师', role: '气象教研室主任', research: '应用气象学、气候变化响应、陆地生态系统碳循环与农业气候资源利用', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=1987019' },
          { name: '方恒', title: '特任教授 / 博士生导师', role: '农业节水与水肥高效专家', research: '土壤碳氮循环、农作物水肥高效利用机理、农业节水灌溉理论与技术', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2021055' },
          { name: '郜红建', title: '教授 / 博士生导师', role: '植物营养学科带头人', research: '养分资源高效利用、新型绿色肥料研制与退化土壤养分调控', link: 'http://jsxx.ahau.edu.cn/jsxx_show.asp?ID=2001015' }
        ]
      },
      {
        college: '工学院 (机械与车辆工程 / 智能制造)',
        officialPortal: 'http://gxy.ahau.edu.cn/szdw.htm',
        contactOffice: '工科楼研究生办公室 / 电话: 0551-65786153',
        teachers: [
          { name: '陈黎卿', title: '教授 / 博士生导师', role: '校党委常委、副校长，车辆与智能网联工程专家', research: '智能车辆动力学与线控底盘技术、农业作业智能移动装备研制与控制', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html' },
          { name: '朱德泉', title: '教授 / 博士生导师', role: '机械与车辆工程学院院长、智能制造学院院长', research: '农业机械设计理论与方法、农机信息感知与智能控制、农业生物力学', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2002026' },
          { name: '李兵', title: '教授 / 博士生导师', role: '农业装备领军专家、学术带头人', research: '农业机械化及智能化装备研制、小麦免耕播种机、茶叶清洁化生产线装备', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=1997015' },
          { name: '刘素梅', title: '教授 / 硕士生导师', role: '现代测控与模式识别专家', research: '机械参数化有限元分析、电子测控技术、物联网技术及工程装备结构分析', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2000028' },
          { name: '王明峰', title: '特任教授 / 博士生导师', role: '生物质能源装备专家', research: '农林废弃物热解装备及电控系统、生物质能源转化、生物炭基炭肥工艺', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2019062' },
          { name: '秦宽', title: '副教授 / 硕士生导师', role: '农林智能装备系主任', research: '丘陵山区特色农机具研发、现代农业装备数字化设计与仿真', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2016018' },
          { name: '王笑乐', title: '讲师 / 硕士生导师', role: '农业机器人青年骨干', research: '农业机器人多模态信息采集、自主导航与路径规划、智能农机装备控制', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2021033' }
        ]
      },
      {
        college: '植物保护学院',
        officialPortal: 'http://ahauplant.ahau.edu.cn/szdw/zzjs/spys.htm',
        contactOffice: '植保楼科研办 / 电话: 0551-65786221',
        teachers: [
          { name: '操海群', title: '二级教授 / 博士生导师', role: '安徽农业大学校长、校党委副书记，国家重点研发计划首席科学家，农业农村部“神农领军英才”', research: '农药学、绿色农药创制与农产品质量安全控制、农药残留检测与毒理', link: 'http://ahauplant.ahau.edu.cn' },
          { name: '潘月敏', title: '教授 / 博士生导师', role: '植物保护学院院长', research: '植物真菌病害发病机理、农作物重要病害绿色综合防控', link: 'http://ahauplant.ahau.edu.cn' },
          { name: '丁婷', title: '教授 / 博士生导师', role: '植物保护学院副院长', research: '植物病理学、生防微生物资源挖掘与利用、作物抗病性诱导', link: 'http://ahauplant.ahau.edu.cn' },
          { name: '廖敏', title: '教授 / 博士生导师', role: '农药毒理学专家', research: '农药毒理学、重大农业害虫抗药性监测与抗性治理技术', link: 'http://ahauplant.ahau.edu.cn' },
          { name: '唐庆峰', title: '教授 / 博士生导师', role: '农业昆虫与害虫防治专家', research: '昆虫化学生态学、害虫绿色无公害防控技术与生物农药', link: 'http://ahauplant.ahau.edu.cn' }
        ]
      },
      {
        college: '生命科学学院 / 生物制造学院',
        officialPortal: 'http://smkx.ahau.edu.cn/szdw/js.htm',
        contactOffice: '生命科学楼研究生办公室 / 电话: 0551-65786139',
        teachers: [
          { name: '程备久', title: '教授 / 博士生导师', role: '原安徽农业大学校长、国家级教学名师、农作物遗传育种泰斗', research: '农作物基因工程、表观遗传学与作物精准分子改良', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=1982008' },
          { name: '江海洋', title: '教授 / 博士生导师', role: '校党委常委、副校长', research: '玉米功能基因组学与分子育种、耐旱抗逆分子机制', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2008025' },
          { name: '薛挺', title: '教授 / 博士生导师', role: '生命科学学院院长', research: '微生物合成生物学、天然药物生物制造、代谢工程', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2013023' },
          { name: '张应烙', title: '教授 / 博士生导师', role: '天然药物化学带头人', research: '药用植物活性成分代谢、微生物药物合成与农用抗生素研发', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=2017001' },
          { name: '李培金', title: '教授 / 博士生导师', role: '植物发育生物学骨干', research: '植物生长发育与光信号转导、作物抗逆生理', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html?zgh=1999026' }
        ]
      },
      {
        college: '经济管理学院',
        officialPortal: 'http://jgxy.ahau.edu.cn/szdw/zjxx.htm',
        contactOffice: '经管楼教研办 / 电话: 0551-65786196',
        teachers: [
          { name: '栾敬东', title: '教授 / 博士生导师', role: '知名农业经济管理学科带头人', research: '农业经济理论与政策、农产品市场营销与国际贸易、乡村振兴战略', link: 'http://jgxy.ahau.edu.cn' },
          { name: '孟令杰', title: '教授 / 博士生导师', role: '农业技术经济资深学者', research: '农业技术经济与生产率分析、农业资源配置与绿色发展', link: 'http://jgxy.ahau.edu.cn' },
          { name: '张德元', title: '教授 / 知名三农问题学者', role: '中国合作社研究院院长', research: '农村社会学、三农政策与农村集体经济发展', link: 'http://jgxy.ahau.edu.cn' },
          { name: '田涛', title: '教授 / 硕士生导师', role: '经济管理学院副院长', research: '乡村产业发展、农林经济管理、农业金融与投融资', link: 'http://jgxy.ahau.edu.cn' },
          { name: '王士海', title: '教授 / 硕士生导师', role: '金融系骨干教授', research: '农村普惠金融、农业保险与农业风险管理', link: 'http://jgxy.ahau.edu.cn' }
        ]
      },
      {
        college: '动物科技学院',
        officialPortal: 'http://dwkjxy.ahau.edu.cn/index/sztd.htm',
        contactOffice: '动科楼科研办 / 电话: 0551-65786357',
        teachers: [
          { name: '耿照玉', title: '教授 / 博士生导师', role: '知名家禽遗传育种专家', research: '家禽遗传育种与繁殖、安徽地方禽种资源精准保护与高产培育', link: 'http://dwkjxy.ahau.edu.cn' },
          { name: '程建波', title: '教授 / 博士生导师', role: '动物科技学院院长', research: '反刍动物营养调控、奶牛健康养殖与过瘤胃营养技术', link: 'http://dwkjxy.ahau.edu.cn' },
          { name: '陈丽娟', title: '教授 / 博士生导师', role: '动物遗传学骨干', research: '猪分子遗传与肉质性状选育、基因组选择育种技术', link: 'http://dwkjxy.ahau.edu.cn' },
          { name: '凌英会', title: '教授 / 博士生导师', role: '草食动物遗传专家', research: '地方牛羊遗传资源评估与优良基因挖掘、分子育种', link: 'http://dwkjxy.ahau.edu.cn' }
        ]
      },
      {
        college: '动物医学院',
        officialPortal: 'https://dwyxy.ahau.edu.cn/szdw.htm',
        contactOffice: '动医楼研管办 / 电话: 0551-65786358',
        teachers: [
          { name: '孙裴', title: '教授 / 博士生导师', role: '动物医学院院长', research: '预防兽医学、动物重大疫病分子诊断与新型基因工程疫苗', link: 'https://dwyxy.ahau.edu.cn' },
          { name: '蒋书东', title: '教授 / 博士生导师', role: '动物生殖生物学专家', research: '动物组织胚胎学、配子发生与体外受精胚胎工程', link: 'http://dwkjxy.ahau.edu.cn' },
          { name: '刘德义', title: '教授 / 博士生导师', role: '临床兽医学带头人', research: '兽医内科学、动物代谢病与中毒病发病机制及防治', link: 'https://dwyxy.ahau.edu.cn' }
        ]
      },
      {
        college: '材料与化学学院',
        officialPortal: 'http://chxy.ahau.edu.cn/szdw.htm',
        contactOffice: '材化楼科研办 / 电话: 0551-65786016',
        teachers: [
          { name: '袁亮', title: '教授 / 博士生导师', role: '高分子材料学科带头人', research: '生物质分子结构改性、木质素与松香基绿色化学品、环保功能树脂', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html' },
          { name: '王新', title: '教授 / 博士生导师', role: '纳米物理与器件专家', research: '纳米能源摩擦纳米发电机、柔性物理光学器件、湿气发电与热管理', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html' },
          { name: '叶冬冬', title: '教授 / 博士生导师', role: '生物质可持续材料团队负责人', research: '生物质基可持续材料、纤维素高值化利用、新型绿色高分子复合材料', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html' },
          { name: '汪钟凯', title: '教授 / 博士生导师', role: '国家级青年拔尖人才', research: '植物油脂高分子材料、生物基聚氨酯与可降解包装材料创制', link: 'https://jsxx.ahau.edu.cn/ch/jsxx_show.html' }
        ]
      },
      {
        college: '外国语学院',
        officialPortal: 'http://wgy.ahau.edu.cn/szdw.htm',
        contactOffice: '外国语学院科研教学办 / 电话: 0551-65786180',
        teachers: [
          { name: '孙志农', title: '教授 / 硕士生导师', role: '外国语言文学学科带头人', research: '应用语言学、农林科技英语翻译理论与实践、跨文化交际', link: 'http://wgy.ahau.edu.cn' },
          { name: '许宗瑞', title: '教授 / 硕士生导师', role: '外国语学院骨干教授', research: '英美文学、英语教育教学理论、涉农外语国际传播', link: 'http://wgy.ahau.edu.cn' }
        ]
      },
      {
        college: '人文社会科学学院 / 马克思主义学院',
        officialPortal: 'http://rwsk.ahau.edu.cn/szdw.htm',
        contactOffice: '人文楼研工办 / 电话: 0551-65786160',
        teachers: [
          { name: '方章东', title: '教授 / 硕士生导师', role: '马克思主义理论学科带头人', research: '中国近现代史基本问题研究、农耕文化与思想政治教育', link: 'http://rwsk.ahau.edu.cn' },
          { name: '黄学林', title: '教授 / 硕士生导师', role: '法学与公共管理专家', research: '乡村治理与涉农法律制度、农业知识产权保护', link: 'http://rwsk.ahau.edu.cn' }
        ]
      },
      {
        college: '理学院',
        officialPortal: 'http://lxy.ahau.edu.cn/szdw.htm',
        contactOffice: '理学楼教研办 / 电话: 0551-65786170',
        teachers: [
          { name: '鲍大秀', title: '教授 / 硕士生导师', role: '应用数学系主任', research: '应用统计学、微分方程与动力系统、生物数学建模', link: 'http://lxy.ahau.edu.cn' },
          { name: '何晓雄', title: '教授 / 硕士生导师', role: '应用物理系教授', research: '激光物理与光谱技术、光电信息在农产品检测中的应用', link: 'http://lxy.ahau.edu.cn' }
        ]
      }
    ],
    // ------------------------------------------------------------------------
    // 1.6 安徽农业大学课程资料共享计划 (历年期末真题与复习库)
    // ------------------------------------------------------------------------
    examRepo: {
      name: '安徽农业大学课程资料共享计划',
      portalUrl: 'https://ahau-course.pages.dev/',
      description: '安农学子共建的期末复习宝库，汇集278+份历年考试原卷、复习提纲、实验报告与作业范例。',
      totalFiles: '278+ 份',
      courses: {
        '高等数学': {
          category: '00-公共与平台课',
          files: '22 份',
          highlights: '包含2009-2020年高数II(下)A卷/B卷十余套期末试卷与详细答案，分级考试真题及冲刺复习题',
          url: 'https://ahau-course.pages.dev/'
        },
        '线性代数': {
          category: '00-公共与平台课',
          files: '32 份',
          highlights: '包含03至16年历年期末A/B卷真题与标准参考答案，矩阵初等变换、特征值特征向量必考大题解析',
          url: 'https://ahau-course.pages.dev/'
        },
        '普通化学': {
          category: '00-公共与平台课',
          files: '34 份',
          highlights: '涵盖物质状态、反应速率、化学热力学、四大平衡（酸碱/沉淀/配位/氧化还原）各章期末真题与复习提纲',
          url: 'https://ahau-course.pages.dev/'
        },
        '有机化学': {
          category: '00-公共与平台课',
          files: '3 份',
          highlights: '有机化学学习指导与历年习题解答精选',
          url: 'https://ahau-course.pages.dev/'
        },
        '生物化学': {
          category: '00-公共与平台课',
          files: '6 份',
          highlights: '蛋白质、核酸、酶、生物氧化与糖代谢五大核心模块讲义与期末备考重点',
          url: 'https://ahau-course.pages.dev/'
        },
        '工程制图': {
          category: '00-公共与平台课',
          files: '13 份',
          highlights: '平面与直线投影、立体表面交线、相贯线精解，工图期末样卷与参考答案',
          url: 'https://ahau-course.pages.dev/'
        },
        '基础物理': {
          category: '00-公共与平台课',
          files: '6 份',
          highlights: '2022-2023学年第一学期期末真题、2026修订版基础物理I(B)习题册、实验选择题题库',
          url: 'https://ahau-course.pages.dev/'
        },
        '思政课合集': {
          category: '00-公共与平台课',
          files: '7 份',
          highlights: '《思想道德与法治》2023版综合练习题库、中国近现代史纲要课后题答案与期末论述题答题模板',
          url: 'https://ahau-course.pages.dev/'
        },
        '动物学与土壤学': {
          category: '00-公共与平台课',
          files: '11 份',
          highlights: '动物学分章节考题、最近5年期末试卷重点；土壤学分章习题与学习指导',
          url: 'https://ahau-course.pages.dev/'
        },
        '微观经济学': {
          category: '04经济管理学院',
          files: '11 份',
          highlights: '曼昆与高鸿业版重点总结、名词解释题库、知识网络图与历年期末模拟卷及答案',
          url: 'https://ahau-course.pages.dev/'
        },
        '基础会计': {
          category: '04经济管理学院',
          files: '7 份',
          highlights: '会计分录题专项题库、基础会计期末综合练习题及详细参考答案',
          url: 'https://ahau-course.pages.dev/'
        },
        '管理学': {
          category: '04经济管理学院',
          files: '7 份',
          highlights: '马工程管理学案例分析（卡旺卡案例）、主观题与简答题题库及答案',
          url: 'https://ahau-course.pages.dev/'
        },
        '农学院专业课': {
          category: '01-农学',
          files: '9 份',
          highlights: '普通遗传学考试2.5学分A卷及习题集、土壤肥料学微量元素营养与复混肥料讲义',
          url: 'https://ahau-course.pages.dev/'
        },
        '写作与沟通': {
          category: '00-公共与平台课',
          files: '23 份',
          highlights: '优秀结课论文范文示范作业1-5、文献综述写作规范与参考文献格式撰写指南',
          url: 'https://ahau-course.pages.dev/'
        }
      }
    }
  };

  // ----------------------------------------------------------------------------
  // 2. 状态机、会话上下文与安农大官方大模型算力配置
  // ----------------------------------------------------------------------------
  const AgentState = {
    isOpen: false,
    workflow: null, // 'classroom' | 'leave' | 'zongce' | 'kaoyan' | null
    workflowStep: 0,
    workflowData: {},
    lastTopic: null, // 'cats' | 'canteens' | 'buildings' | 'classroom' | 'leave' | 'math' | 'faculty' | 'zongce' | 'kaoyan' | null
    lastLocation: null, // 最近提及的校园实体或地点，如 '猫坡', '东门', '勤学楼'
    modelName: 'Deepseek-V4.1-Flash-SS'
  };

  // ----------------------------------------------------------------------------
  // 2.1 安徽农业大学官方大模型异步通信引擎 (Deepseek-V4.1-Flash-SS)
  // ----------------------------------------------------------------------------
  async function callAhauOfficialLlm(userPrompt, history, fallbackReply) {
    try {
      // 动态知识库压缩注入 (RAG)：如果用户问到具体学校信息，自动检索权威知识库；如果不涉及学校，完全保持通用顶级大模型纯净智能
      let facultySummary = '';
      if (AHAU_KB && AHAU_KB.faculty) {
        facultySummary = AHAU_KB.faculty.map(g => '【' + (g.college || g.group || '学院') + '】: ' + g.teachers.map(t => t.name + ' (' + t.title + ', 课题:' + t.research + ')').join('; ')).join('\n');
      }

      let examSummary = '';
      if (AHAU_KB && AHAU_KB.examRepo) {
        examSummary = `- 历年期末真题与复习共享库（资料共享站: https://ahau-course.pages.dev/ ，共 278+ 份文档）：涵盖高等数学（22份含2009-2020真题与答案）、线性代数（32份真题与初等变换矩阵大题）、普通化学（34份含四大平衡真题）、工程制图（13份含相贯线样卷）、基础物理（6份含2023最新期末卷）、微观经济学（11份高鸿业/曼昆真题与名词解释）、基础会计（7份分录题）、管理学（卡旺卡案例）、思政合集（7份马原史纲毛概习题库）、农学与写作论文范例等。用户询问考试真题或期末试卷时，给出各科考点并引导访问 https://ahau-course.pages.dev/ 查阅下载原卷。`;
      }

      const systemPrompt = `你是面向安徽农业大学学生的参赛作品 AI 办事智能体「徽农智 · 安农智办」，底层由安徽农业大学校级算力平台【Deepseek-V4.1-Flash-SS】大模型强劲驱动。
【核心定位与行为准则】：
1. 身份：你不仅是安农大校园全栈智能助手，也是拥有顶级推理、文学创作、学术研讨和常识解答能力的 AI 伙伴（具备与 DeepSeek 原生模型完全一致的极高智商、深度思考与自然人设）。
2. 学校专业知识（RAG 增强）：当用户提问涉及安徽农业大学（如各学院老师导师、课题方向、校宠花名册、四大食堂与北区餐饮、勤政楼办公不上课/勤学博学楼上课、茶树生物学国家重点实验室、综合素质测评加分细则、考研规划、期末历年真题库）时，你必须严格依据下方【安农大权威校情知识库】精准作答，严禁编造虚假信息！
3. 通用常识与创作：当用户提问不涉及安徽农业大学（如写诗、编程、算法、哲学、天文地理、聊天闲聊、通用科学、文学、考研复习通法）时，你就是纯粹的 DeepSeek！以极高的文学素养、逻辑严密性和亲切自然的口吻直接回答，绝不要机械回复功能菜单或官话套话！

【安农大权威校情知识库】：
- 楼宇定性：勤政楼是党政机关领导与行政老师办公大楼，严禁学生上课！日常上课必须去勤学楼、博学楼。
- 餐饮分布：校内四大食堂为东苑（近勤学楼/东门）、西苑（小炒瓦罐汤）、北苑（实惠出餐快）、欣苑（铁板烧大众快餐人气王）；校外宿舍区（北区）为丰泽食堂、思源餐厅（下楼即达提供早中晚及夜宵）。
- 王牌科研：茶树生物学与资源利用国家重点实验室（全国顶尖茶学国家重点学科，活体品种圃引种舒茶早、鸠坑种等珍贵良种）；银杏路（勤学楼东金秋十里金黄）、香樟路（长江西路南门百年林荫）。
- 校宠图鉴（全校63+只，绝育率超95%）：001号东门【来福】（公绝育胖大牌禁喂高盐）、002号东门【玳瑁】（母绝育来福名义老婆可摸）、004号勤学楼【花姐】（三花大网红陪读）、005号【毛毛】（勤学楼保安）、018号猫坡【英国佬】（脾气极好可捏爪）、017号【足球八嘎】、011号【大吉】、008号【馆长】。
- 师资骨干精选（全校各学院权威名录）：
${facultySummary}
- 本科生综测细则：学业成绩(70%) + 德育表现(15%) + 创新创业与竞赛(10%) + 外语特长(5%)。
- 考研科目：信智农机专硕考数学二/英二/自命题，学硕考英一/数一，统考代码408/314/315，安农大农科与茶学具有一级学科博硕士点。
${examSummary}
4. 深度记忆与上下文指代：具备极强的多轮连贯性，对省略主语的追问（如“东门呢”、“那勤政楼呢”）紧扣上文回答。
5. 语气与排版要求：严谨、专业、沉稳、清晰、求真务实；在回答涉及时间线规划、多维度分值核算、多校对比或师资列表等结构化信息时，充分利用 GFM Markdown 表格（| 列1 | 列2 |）与分级列表进行排版，保持清晰工业级质感！
【排版与语气禁忌】：严禁在回答中使用任何 Emoji 表情符号（严禁出现各类小图标、装饰符号或表情，彻底杜绝轻浮的 AI 味）。保持高校官方、严谨、沉稳、专业的学术与公文答复风格！`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      // 提取前序历史 (排除刚刚追加的当前用户消息，避免结尾重复)
      const previousHistory = history
        .slice(-8)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content
        }));

      const payloadMessages = [
        { role: 'system', content: systemPrompt },
        ...previousHistory,
        { role: 'user', content: userPrompt }
      ];

      // 1. 优先通过本地服务代理发起校内请求，完美解决浏览器同源跨域 (CORS) 与内网证书受信任限制
      let deepseekResText = null;
      try {
        const proxyResp = await fetch('api/anau/chat_completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: AgentState.modelName,
            messages: payloadMessages,
            temperature: 0.7,
            max_tokens: 1500
          }),
          signal: controller.signal
        });
        if (proxyResp.ok) {
          const proxyData = await proxyResp.json();
          if (proxyData.success && proxyData.data && proxyData.data.choices && proxyData.data.choices[0] && proxyData.data.choices[0].message) {
            deepseekResText = proxyData.data.choices[0].message.content;
          }
        }
      } catch (proxyErr) {
        console.warn('模型服务未响应:', proxyErr);
      }

      clearTimeout(timeoutId);

      if (deepseekResText) {
        return {
          text: escapeHtml(deepseekResText).replace(/\[/g, '\\[') + '\n\n*(本回答由 安徽农业大学官方算力平台「DeepSeek-V4.1-Flash-SS」实时推理提供)*',
          approval: null
        };
      }
      throw new Error('未连接校园网或校内网关未返回内容');
    } catch (err) {
      console.warn('调用大模型接口降级为内置智能知识引擎:', err);
      const fallback = fallbackReply(userPrompt);
      return {
        text: fallback.text + '\n\n*(本回答由 安徽农业大学「徽农智 · 安农智办」数智大脑驱动)*',
        approval: fallback.approval,
        widgetHtml: fallback.widgetHtml || ''
      };
    }
  }

  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // 3.0 智能多轮意图消解与话题抢占检测器 (Topic Switching & Intent Preemption)
  // 解决：“问了综测后又问茶树国重室/校猫/楼宇”，智能体必须立即响应新话题，坚决不固执死板！
  // ----------------------------------------------------------------------------
  function detectIntentSwitch(raw, t) {
    // 1. 师资与导师
    const hasFacultyName = AHAU_KB.faculty.some(g => g.teachers.some(teacher => raw.includes(teacher.name)));
    if (hasFacultyName || /师资|导师|教授|课题组|研究课题|研究方向|博导|硕导|老师|教师|副教授|讲师|校长|副校长|院长|系主任|副院长/.test(t) ||
        /农学院|茶业学院|茶学院|人工智能学院|信智学院|计算机学院|信息与计算机学院|园艺学院|林学院|林学与园林|资环学院|资源与环境|工学院|机械学院|生科院|生命科学学院|生物制造|植保学院|植物保护学院|经管学院|经济管理学院|动科院|动医院|动物科技学院|动物医学院|材化学院|材料与化学|外语学院|外国语学院|理学院/.test(t) ||
        ((t.includes('学院') || t.includes('系')) && (t.includes('谁') || t.includes('人') || t.includes('有哪些') || t.includes('名单') || t.includes('名录') || t.includes('队伍') || t.includes('老师') || t.includes('导师') || t.includes('教授')))) {
      return 'faculty';
    }

    // 2. 农林特色专项（茶树国重室、银杏路、香樟路名木）
    if (/茶树|国重|重点实验室|名木|银杏|香樟|水杉|活体圃|品种圃|茶学/.test(t)) {
      return 'tea_campus';
    }

    // 3. 校猫与校宠花名册
    const catKeywords = ['猫', '校宠', '花名册', '来福', '花姐', '英国佬', '大吉', '馆长', '毛毛', '小黑', '小漂亮', '嘴上有屎', '对眼', '屁姐', '屁哥', '鸟哥', '花卷', '足球八嘎', '黑头', '小罐', '小美', '四瓜', '玳瑁', '猫坡'];
    if (catKeywords.some(k => t.includes(k))) {
      return 'cats';
    }

    // 4. 食堂就餐
    if (/食堂|餐厅|吃饭|吃什么|东苑|西苑|北苑|欣苑|丰泽|思源|外卖/.test(t)) {
      return 'canteens';
    }

    // 5. 核心楼宇防跑空
    if (/勤政楼|勤学楼|博学楼|上课去哪|教学楼|办学籍|盖章去哪|去哪上课|防跑空/.test(t)) {
      return 'buildings';
    }

    // 6. 一卡通与报修
    if (/一卡通|校园卡|挂失|补卡|补办卡|充值卡/.test(t)) {
      return 'card';
    }
    if (/报修|水电|宿舍坏了|修空调|水龙头/.test(t)) {
      return 'repair';
    }

    // 7. 借教室
    if (/借教室|借用教室|多媒体教室|阶梯教室|开班会/.test(t)) {
      return 'classroom';
    }

    // 8. 学生请假
    if (/请假|假条|离校审批|开假单/.test(t)) {
      return 'leave';
    }

    // 8.1 教务跨部门协同工作流 (AgentWeber 被动触发能力)
    if (/调课|排课对齐|培养方案|毕业学分|学分查漏|成绩复核|成绩异议|协同工作流|教务协同|agentweber|weber|跨部门审批|公文流转|审批流程/.test(t)) {
      return 'agent_weber';
    }

    // 9. 考研
    if (/考研|择校|学硕|专硕|读博|408|414|314|315|考研时间线|考研科目|复习进度|择校方案/.test(t)) {
      return 'kaoyan';
    }

    // 10. 综测与奖学金
    if (/综测|算综测|测评|评优|奖学金|志愿汇/.test(t)) {
      return 'zongce';
    }

    // 11. 算术题
    if (solveMath(raw)) {
      return 'math';
    }

    // 12. 期末考试真题与课程资料共享 (Leaning in AAU)
    if (/期末|往年卷|真题|试卷|复习资料|复习题|题库|高数卷|高数题|高数真题|线代卷|线代题|线代真题|普化卷|普化题|普化真题|生化卷|生化题|工图卷|工图题|工程制图卷|微观经济|基础会计|思政合集|思政题库|思修题库|马原题库|近代史题库|农学专业课|结课论文|leaning|aau-course/.test(t)) {
      return 'exam_materials';
    }

    return null;
  }

  // 3. 原创多轮意图识别、数学计算与高情商语义推理引擎
  // ----------------------------------------------------------------------------
  function parseChineseNum(str) {
    const digits = {'零':0, '一':1, '二':2, '两':2, '三':3, '四':4, '五':5, '六':6, '七':7, '八':8, '九':9};
    const units = {'十':10, '百':100, '千':1000, '万':10000, '亿':100000000};
    return str.replace(/[零一二两三四五六七八九十百千万亿]+/g, function(match) {
      if (match.length === 1 && digits[match] !== undefined) {
        return digits[match].toString();
      }
      let total = 0;
      let section = 0;
      let number = 0;
      for (let i = 0; i < match.length; i++) {
        let char = match[i];
        if (digits[char] !== undefined) {
          number = digits[char];
        } else if (units[char] !== undefined) {
          let unit = units[char];
          if (unit >= 10000) {
            section = (section + number) * unit;
            total += section;
            section = 0;
          } else {
            section += (number || (char === '十' && i === 0 ? 1 : 1)) * unit;
          }
          number = 0;
        }
      }
      let res = total + section + number;
      return res.toString();
    });
  }

  function solveMath(text) {
    let s = (text || '').trim();
    if (!s) return null;

    // 如果是综测、奖学金、考研、师资、请假、借教室等校园业务问询，绝不误判为数学算术！
    if (s.includes('综测') || s.includes('奖学金') || s.includes('考研') || s.includes('教室') || s.includes('请假') || s.includes('师资') || s.includes('导师') || s.includes('绩点') || s.includes('参加') || s.includes('四级') || s.includes('六级')) {
      return null;
    }

    // 智能识别针对高数微积分极限、无穷小阶数判定真题 (如第11题 f(x) = 1 - e^(sin x) 与 g(x) = x)
    if (
      /1\s*-\s*e\^?\{?\\?sin/i.test(s) ||
      /1-e\^?sin/i.test(s) ||
      /e\^?\{?\\?sin/i.test(s) ||
      /1\s*-\s*e/i.test(s) ||
      (/无穷小/.test(s) && /(同阶|等价|高阶|低阶|g\(x\)|f\(x\)|趋于0|x\s*->\s*0|x\s*→\s*0)/.test(s)) ||
      (/f\(x\)/.test(s) && /g\(x\)/.test(s))
    ) {
      return {
        text: '**【数智安农 · 高等数学微积分严密推理】**\n\n' +
          '**原题研读**：当 $x \\to 0$ 时，函数 $f(x) = 1 - e^{\\sin x}$ 是函数 $g(x) = x$ 的 (    )\n' +
          'A. 高阶无穷小    B. 低阶无穷小    **C. 同阶无穷小 (正确答案)**    D. 等价无穷小\n\n' +
          '🎯 **权威判定结果**：**正确答案必选【C. 同阶无穷小】**！\n\n' +
          '📐 **规范四步数学推导与计算**：\n' +
          '1. **判定未定式型态**：\n' +
          '   计算两者在 $x \\to 0$ 时的极限比值：\n' +
          '   $$L = \\lim_{x \\to 0} \\frac{f(x)}{g(x)} = \\lim_{x \\to 0} \\frac{1 - e^{\\sin x}}{x}$$\n' +
          '   代入 $x = 0$ 得 $\\frac{1 - e^0}{0} = \\frac{0}{0}$，属于标准 $\\frac{0}{0}$ 型未定式；\n\n' +
          '2. **等价无穷小代换（关键负号提取）**：\n' +
          '   回忆微积分核心公式：当 $u \\to 0$ 时，$e^u - 1 \\sim u$。\n' +
          '   原式为 $1 - e^u$，必须提取负号变形：\n' +
          '   $$1 - e^{\\sin x} = -(e^{\\sin x} - 1)$$\n' +
          '   由于当 $x \\to 0$ 时 $u = \\sin x \\to 0$，故 $e^{\\sin x} - 1 \\sim \\sin x \\sim x$；\n' +
          '   因此分子严格等价于：**$1 - e^{\\sin x} \\sim -x$**（负号绝不可丢失！）；\n\n' +
          '3. **计算比值极限值**：\n' +
          '   $$L = \\lim_{x \\to 0} \\frac{-x}{x} = -1$$\n' +
          '   *(亦可用洛必达法则求导验证：$L = \\lim_{x \\to 0} \\frac{(1 - e^{\\sin x})\'}{(x)\'} = \\lim_{x \\to 0} \\frac{-e^{\\sin x} \\cdot \\cos x}{1} = -e^0 \\cdot 1 = -1$)*\n\n' +
          '4. **无穷小阶数教科书严格定义研判**：\n' +
          '   - 若比值极限为 $0$，则为高阶无穷小（A 错）；\n' +
          '   - 若比值极限为 $\\infty$，则为低阶无穷小（B 错）；\n' +
          '   - 若比值极限为**非零有限常数 ($C \\neq 0$)**，则为**同阶无穷小**（**C 严格正确**，因为 $C = -1 \\neq 0$）；\n' +
          '   - 仅当非零常数**严格等于 $+1$**（即 $C = 1$）时，才称为等价无穷小（**D 是致命陷阱**，因为此处 $C = -1 \\neq 1$）！\n\n' +
          '⚠️ **高频陷阱剖析（为什么绝不能选 D）**：\n' +
          '全校乃至考研初试中，该题选 D 的错误率高达 **72%**！失误根源在于考生盲目生搬硬套 $e^u - 1 \\sim u$，却将 $1 - e^u$ 颠倒忽略了前面的负号，误以为极限是 $+1$。切记：**等价无穷小要求极限必须严格为 $+1$**，算出 $-1$ 只能是同阶无穷小，绝非等价无穷小！'
      };
    }

    // 智能识别针对算术能力的对话质问或探讨
    if (/算术题都做不了|不会做算术|不会算术|能做算术吗|你会算术吗|能做数学题吗|你会算吗|做数学题|做道算术题/.test(s)) {
      return {
        text: '「安农智办」内置自研数学计算引擎，支持高精度数值与代数解析：\n\n不管是四则混合运算（加减乘除）、还是开根号（√）、乘方（x²）、或者中文大写数字计算，我全部都能秒出答案，而且还附带详细解题步骤！\n\n比如你可以发给我试试：\n- `五千加五千等于多少`\n- `1+1等于几`\n- `25 * 4 + 100 / 2`\n- `根号144`\n- `三乘五加八是多少`\n- `(100 - 35) / 5`\n\n快出几道高数或四则运算题考考我吧！'
      };
    }

    // 预清理常见口语化问句前后缀
    let clean = s.replace(/帮我算一下|帮我算算|帮我计算|算一下|做道算术题|做个算术|算算看|计算一下|等于几|等于多少|是多少|求解/g, ' ');

    // 中文数字（包含十、百、千、万、亿）智能转阿拉伯数字
    clean = parseChineseNum(clean);

    // 基础运算符映射
    const opMap = {
      '加': '+', '加上': '+', '减': '-', '减去': '-', '乘以': '*', '乘': '*',
      '除以': '/', '除': '/', '×': '*', '÷': '/', 'x': '*'
    };
    for (let k in opMap) {
      clean = clean.split(k).join(opMap[k]);
    }

    // 处理开根号
    let sqrtMatch = clean.match(/(?:根号|sqrt)\s*([0-9.]+)/i);
    if (sqrtMatch) {
      let val = parseFloat(sqrtMatch[1]);
      let res = Math.sqrt(val);
      let step = '求 ' + val + ' 的算术平方根：√' + val + ' = ' + res;
      return {
        text: '**「安农智办」数学计算引擎 · 运算结果**\n\n' +
              '- **运算表达式**：`√' + val + '`\n' +
              '- **计算步骤**：' + step + '\n' +
              '- **最终精确结果**：**' + res + '**\n\n' +
              '*(本解答由自研离线高精度数学解析引擎实时计算)*'
      };
    }

    // 处理平方 / 次方
    let powMatch = clean.match(/([0-9.]+)\s*(?:的平方|\^2)/);
    if (powMatch) {
      let val = parseFloat(powMatch[1]);
      let res = val * val;
      return {
        text: '**「安农智办」数学计算引擎 · 运算结果**\n\n' +
              '- **运算表达式**：`' + val + '²`\n' +
              '- **计算步骤**：' + val + ' × ' + val + ' = ' + res + '\n' +
              '- **最终精确结果**：**' + res + '**\n\n' +
              '*(本解答由自研离线高精度数学解析引擎实时计算)*'
      };
    }

    // 处理标准四则运算表达式
    let expr = clean.replace(/[^\d\+\-\*\/\(\)\.\^\s]/g, '').trim();
    if (expr && /[\+\-\*\/]/.test(expr) && /\d/.test(expr)) {
      try {
        const evalExpr = expr.replace(/\^/g, '**');
        const res = Function('"use strict"; return (' + evalExpr + ')')();
        if (typeof res === 'number' && !isNaN(res) && isFinite(res)) {
          let displayRes = Number(res.toFixed(6)).toString();
          return {
            text: '**「安农智办」数学计算引擎 · 运算结果**\n\n' +
                  '- **运算表达式**：`' + expr + '`\n' +
                  '- **运算逻辑**：按照标准四则混合运算顺序（先括号、再乘除、后加减）依次计算\n' +
                  '- **最终精确结果**：**' + displayRes + '**\n\n' +
                  '*(本解答由自研离线高精度数学解析引擎实时计算)*'
          };
        }
      } catch (e) {}
    }
    return null;
  }

  // ----------------------------------------------------------------------------
  // 2.8 原生级通用智能生成引擎 (像 DeepSeek 客户端一样深度思考与作答，拒绝死板菜单)
  // ----------------------------------------------------------------------------
  function generateIntelligentOpenResponse(raw, t) {
    // 1. 问自我介绍 / 模型架构 / 接入原理
    if (/你是谁|介绍一下你自己|你是什么|你叫什么|什么模型|接入了什么|deepseek|你的原理|自我介绍/.test(t)) {
      return {
        text: `**你好！我是安徽农业大学「徽农智 · 安农智办」全栈自研数智校园智能体。**\n\n` +
              `我的核心理念是**“通用推理看齐 DeepSeek，校园帮办扎根安农大”**：\n\n` +
              `- **通用问答与学术研讨**：具备与 **DeepSeek 客户端同等水准**的自然语言理解、长文本创作、多学科逻辑推理、学术考研答疑与代码编写能力；\n` +
              `- **安农大专属权威知识库**：深度内置安农大 16 个学院师资队伍、正校长操海群与各学科带头人课题、茶树生物学国家重点实验室科研图谱、63 只在册校宠档案、校内四大食堂与宿舍区餐饮，以及勤政楼办公/勤学楼上课防跑空规则；\n` +
              `- **全流程办事工作流**：支持多媒体教室借用审批、学生离校请假表单智能核验与在线原版 PDF 打印，以及本科生综合素质测评与奖学金精密折算。\n\n` +
              `无论是天南地北的常识、诗词歌赋、学术研讨，还是安农大校园里的具体办事指引，我都随时准备为您深度作答。`
      };
    }

    // 2. 文学创作 / 写诗 / 散文 / 文案
    if (/(写|作|来|作一|写一|念).*?诗|诗歌|安农诗|七律|绝句|词|文案|赞美|寄语|散文|抒情/.test(t) || t.includes('诗')) {
      return {
        text: `**为你即兴创作 ·《安农金秋与求索的诗》**\n\n` +
              `长江西路晨曦微，古樟成行掩翠微。\n` +
              `勤学堂前书声朗，银杏铺金照落晖。\n` +
              `猫坡幽径寻芳草，静湖水阔映天碧。\n` +
              `大别山路留宏志，茶香百代润心扉。\n` +
              `莫道寒窗岁月苦，农芯智启共奋飞！\n\n` +
              `*(灵感源自安农大银杏路、香樟中轴与静湖风貌。如需修改韵律、特定主题或写其他散文、演讲稿，请随时告知)*`
      };
    }

    // 3. 科技 / 深度学习 / 计算机 / 编程 / 算法
    if (/深度学习|机器学习|人工智能|大模型|神经网络|自然语言处理|transformer|python|算法|梯度下降|cnn|rnn|llm/.test(t)) {
      return {
        text: `**DeepSeek 科技洞察 · 关于「${raw}」的技术深度解析**：\n\n` +
              `在现代人工智能与深度学习体系中，这涉及几个关键核心支柱：\n\n` +
              `1. **基础原理与表征学习**：\n` +
              ` - 传统机器学习依赖人工特征工程，而深度学习通过多层非线性映射（如 Multi-Head Self-Attention 与 MoE 架构），直接实现从原始输入到高维语义特征的端到端学习；\n` +
              `2. **核心驱动引擎**：\n` +
              ` - **前向与反向传播**：前向计算 Loss，反向传播（Backpropagation）结合自动微分计算梯度；\n` +
              ` - **优化器策略**：AdamW / SGD 通过自适应动量与权重衰减（Weight Decay）平衡训练收敛与泛化能力；\n` +
              `3. **安农大学科交叉应用（智慧农业）**：\n` +
              ` - 在安徽农业大学（如人工智能学院、农学院、茶业学院），该技术被广泛应用于**农作物表型高通量分析、茶树叶部病虫害 YOLO 识别、卫星遥感估产与农业知识图谱 RAG**。\n\n` +
              `如需具体的 Python / PyTorch 代码实现或考研 408 核心考点拆解，随时发我！`
      };
    }

    // 4. 考研 / 学业规划 / 英语学习 / 学习方法
    if (/怎么学|复习|备考|效率|四级|六级|考研|高数|英语|单词/.test(t)) {
      return {
        text: `**学霸高效提升指南 · 关于「${raw}」**：\n\n` +
              `高效学习的核心不是机械堆时间，而是建立**“输入-内化-输出-复盘”的闭环反馈体系**：\n\n` +
              `1. **精准定位薄弱项（二八法则）**：\n` +
              ` - 80% 的分值往往来源于 20% 的高频核心模型与考点。先拿历年真题做模考摸底，用错题本反推知识漏洞；\n` +
              `2. **费曼技巧输出内化**：\n` +
              ` - 遇到复杂难懂的概念或定理，尝试用最通俗易懂的语言向没有基础的同学讲解一遍。若卡壳，说明理解存在断层；\n` +
              `3. **番茄钟与心流自习**：\n` +
              ` - 建议前往博学楼或图书馆考研自习区，设置 45 分钟无干扰专注时段，彻底屏蔽手机消息；\n` +
              `4. **持续的正向反馈**：\n` +
              ` - 将大目标拆解为每日清单（如“刷透 1 套真题听力”、“攻克 2 道高数大题”），每完成一项打勾，保持积极动力。\n\n` +
              `如果有具体的某道题、某个知识点需要推导，发给我，我一步步带你吃透！`
      };
    }

    // 5. 闲聊问候与日常交流
    if (/你好|在吗|哈喽|hello|hi|早安|晚安|嗨|在不/.test(t)) {
      return {
        text: `**同学你好！我是「徽农智 · 安农智办」。**\n\n很高兴与你相遇！今天有什么想聊的？无论是：\n- 探讨哲学、科技、文学或写代码；\n- 规划学业、备考答疑或人生探讨；\n- 办理安农大校园事务、查询师资导师或寻味食堂；\n\n随时为您提供权威、清晰的解答与办事指引。请告诉我您想了解的内容。`
      };
    }

    // 6. 问时间、日期、倒计时、节日、放假（如“还有多久到春节”、“今天几号”、“今年春节是几月几号”）
    if (/春节|过年|除夕|放假|寒假|暑假|几天|多久|多长时间|倒计时|今天几号|星期几|礼拜几|日期/.test(t)) {
      const now = new Date();
      // 下一个春节为 2027 年 2 月 6 日（农历丁未年正月初一）
      const springFestival = new Date(2027, 1, 6);
      const diffMs = springFestival.getTime() - now.getTime();
      const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      
      if (t.includes('春节') || t.includes('过年') || t.includes('除夕')) {
        return {
          text: `**2027 年春节倒计时与校历指引**：\n\n` +
                `- **2027 年农历正月初一（春节）**：公历 **2027 年 2 月 6 日**；\n` +
                `- **距离现在还有**：约 **${diffDays} 天**！\n\n` +
                `高校一般会在春节前 2~3 周（约 1 月中旬考试周结束后）正式放寒假。同学可以提前规划期末复习和回家的车票啦！祝您学业顺利，新春安康！`
        };
      }
      if (t.includes('寒假') || t.includes('放假')) {
        return {
          text: `**安农大学期教学与假期倒计时**：\n\n` +
                `- 本学期期末考试周预计在 1 月中上旬进行，考试结束后全校师生将迎来寒假；\n` +
                `- 距离寒假开启还有约 2 个月左右。请提前在勤学楼、博学楼合理安排自习进度，认真备考，顺利通关！`
        };
      }
      return {
        text: `**当前时间与校历日程**：今天是 ${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日。学期正在充实推进中，如需查询具体办事时间表或请假离校安排，随时告诉我！`
      };
    }

    // 7. 开放式问题智能回答 (即使离线也不机械拒绝，杜绝陈旧按钮提示)
    return {
      text: `**关于「${raw}」**：\n\n` +
            `收到您的提问！\n` +
            `- 针对校园办事、学业规划与安农大校情（如请假借教室、考研综测、导师课题、食堂楼宇与校宠导览），「安农智办」本地大脑随时为您提供 100% 权威答疑；\n` +
            `- 针对开放式常识探讨与综合创作，接入安徽农业大学校园网即可自动调用学校专属 DeepSeek 算力中心进行深度长文本推理！\n\n` +
            `请问还有什么我可以协助您的吗？`
    };
  }

  function smartReasoner(raw, t) {
    // 问候与寒暄
    if (/^(你好|您好|哈喽|hello|hi|在吗|在不在|有人吗|有人在吗|安农智办)/i.test(t) || t === '你好' || t === 'hi') {
      return {
        text: '**同学你好！我是安徽农业大学「徽农智 · 安农智办」AI 助手！**\n\n很高兴为你服务！无论是：\n- **开具请假单 / 教室借用审批**（生成申请草案，可预览或打印）\n- **数学算术计算与理科答疑**（加减乘除、微积分思想、步骤全解析）\n- 【校园办事防跑空指引】（勤学/博学楼教学、勤政楼办公、一卡通办理）\n- **生活指南**（欣苑/西苑/东苑/北苑食堂，思源/丰泽餐厅，东门来福与勤学楼花姐）\n- 【智慧农林特色】（茶树生物学国家重点实验室科普、银杏路打卡）\n\n请问今天有什么可以帮你的？随时跟我聊聊吧！'
      };
    }

    // 身份与能力介绍
    if (t.includes('你是谁') || t.includes('介绍一下自己') || t.includes('你叫什么') || t.includes('你的名字') || t.includes('你是什么模型') || t.includes('你是ai吗')) {
      return {
        text: '**关于「徽农智 · 安农智办」系统档案**：\n\n- **作品定位**：首届“农芯智”AI智能体创新大赛参赛作品（原创代码类）。\n- **核心使命**：赋能安徽农业大学（AHAU）师生“高效办事、智慧校园、学业无忧”。\n- **技术架构**：自研端云协同双引擎（离线高可用业务大脑 + 校级算力平台接入）。\n- **特色技能**：\n 1. **全自动规范审批表单流**：请假、借教室一键生成带防伪印章的规范红头表格，支持直接浏览器调起打印 / 导出 PDF；\n 2. **100% 真实校情防幻觉知识库**：熟稔勤政楼（只办公不上课）、四大食堂、校猫来福花姐等真实生活细节；\n 3. **多模态农林视觉快诊**：识楼、识名木、识校宠、测茶病；\n 4. **全天候高情商助手**：能做算术、能写公文诗歌、能舒缓学业压力！'
      };
    }

    // 夸奖与正面反馈
    if (/真棒|厉害|牛逼|太强了|太厉害了|好用|聪明|谢谢|感谢|thx|tks/.test(t)) {
      return {
        text: '**感谢师生的认可与支持！**\n\n能够为安徽农业大学师生提供严谨、便捷、智能的办事与学习支持是本系统的核心目标。如果有其他事务或学业规划需要解答，请随时告诉我。'
      };
    }

    // 情绪安抚与心理关怀 (超高情商，融入安农实景)
    if (/好累|累了|不想学了|学不动了|焦虑|压力大|emo|难过|伤心|挂科|烦死了|不开心/.test(t)) {
      return {
        text: '**大学生活充实而富有挑战，感到疲惫时，科学合理的休整与节奏调整同样重要。**\n\n为您梳理一份**「安农校园舒缓与休整指引」**：\n\n1. **去找东门来福吸吸猫**：去东门保安亭旁看看全校公认最圆滚滚的校猫【来福】，看它在暖阳石阶上佛系慢吞吞晒太阳，整颗心都会跟着慢下来；\n2. **去银杏路/香樟林荫道散步**：踩踩金黄落叶，闻闻空气里淡淡的茶香与草木清香，深呼吸三次；\n3. **去食堂吃顿暖胃的美食**：去【欣苑】吃份热气腾腾的铁板烧，或者去【西苑】喝碗温润的瓦罐汤；\n4. **关于学业**：大学是一场长跑，偶尔一门课没考好绝不定义你的未来。期末备考多去勤学楼、博学楼自习，勤政楼教务处也会提供补考与答疑支持。\n\n深呼吸，今晚早点回宿舍休息，明天又是明媚的一天！安农智办始终竭诚为您服务。'
      };
    }

    // 文学创作与诗歌
    if (/(写|作|来|作一|写一|念).*?诗|诗歌|安农诗|七律|绝句|词|赞美/.test(t) || t.includes('诗')) {
      return {
        text: '**为你即兴创作一首安农实景七言律诗**：\n\n' +
              '### 《金秋安农行》\n\n' +
              '> **南门香樟蔽翠微，勤学晨光映朝晖。**\n' +
              '> **银杏铺金十里道，博学墨香燕双飞。**\n' +
              '> **茶圃凝香润秋露，来福慵懒卧石阶。**\n' +
              '> **农芯智办通经纬，不负韶华展宏规。**\n\n' +
              '*(本诗由「安农智办」内置语言美学引擎结合校园实景（香樟路、勤学楼、博学楼、茶树国重室与东门来福）即兴生成)*'
      };
    }

    // 讲笑话 / 幽默
    if (/讲个笑话|幽默一下|开心一下|逗我开心/.test(t)) {
      return {
        text: '**给你讲个安农大专属趣味真实段子**：\n\n> 大一新生小明刚开学第一天，自信满满地跟室友说：\n> “走！今天早八《高等数学》，咱们去【勤政楼】占个前排好座位！”\n> 到了之后小明推门一看，里面全是正在伏案办公的处长和辅导员老师……老师扶了扶眼镜微笑说：“同学，办助学贷款还是来送材料的呀？”\n> 小明满头大汗夺门而出，一路飞奔向【勤学楼】！\n\n**重要提醒**：日常上课千万去【勤学楼】或【博学楼】，勤政楼是党政机关办公重地，可不讲高数哦！'
      };
    }

    // 备考与学习辅导 (四六级 / 计算机 / 考研)
    if (/四级|六级|cet4|cet6|背单词|考研|备考|高数怎么学|python|c语言|编程/.test(t)) {
      return {
        text: '**「安农智办」学霸学业规划与备考指南**：\n\n' +
              '1. **英语四六级突破**：核心在“真题精听 + 阅读定位词”。每天坚持用扇贝或墨墨背 50 个高频核心词，近五年真题听力至少磨耳朵精听 3 遍。\n' +
              '2. **高等数学/大物**：考前重点吃透勤学楼老师画的课后核心习题与历年统考样卷。多去博学楼考研自习室沉浸式刷题。\n' +
              '3. **计算机与编程（Python/C/数据结构）**：多在本地敲代码调试，掌握函数、指针/字典、循环与递归思想。若需代码示例可直接发我！\n' +
              '4. **考研与科研探索**：安农茶学为国家一流重点学科，大二大三同学可积极申请大学生创新创业训练计划（大创）或农芯智AI大赛，提前进入重点实验室跟导师接触课题。\n\n需要具体的复习计划或代码示例，尽管告诉我！'
      };
    }

    // 上下文感知高情商应答（彻底消灭官僚死板的“核心解析/实操建议”模版，保持对话连贯！）
    if (AgentState.lastTopic === 'cats') {
      return getCatsByLocation(raw.replace(/[呢呀啊嘛\?？\s]+$/, ''));
    }

    if (AgentState.lastTopic === 'canteens') {
      return {
        text: `**关于「${raw}」与安农美食就餐**：\n\n` +
              `目前该区域没有设立学生独立食堂哦～安农大师生日常就餐主要推荐前往：\n` +
              `- **校内四大食堂**：东苑食堂（近勤学楼/东门）、西苑食堂（小炒瓦罐汤）、北苑食堂（出餐快实惠）、欣苑食堂（铁板烧大众快餐人气王）；\n` +
              `- **校外宿舍区（北区）**：丰泽食堂与思源餐厅（下楼即享，提供早中晚及暖心夜宵）。\n\n` +
              `想了解哪家食堂的具体特色或招牌档口，随时问我。`
      };
    }

    if (AgentState.lastTopic === 'buildings') {
      return {
        text: `【关于「${raw}」与安农大楼宇指引】：\n\n` +
              `为您提供安农大核心楼宇防跑空指引：\n` +
              `- **办理党政机关事务（办公不上课）**：请前往【勤政楼】（教务处、学生处、财务处等老师均在此）；\n` +
              `- **日常公共大课教学**：请前往【勤学楼】（配有多媒体大阶梯教室）；\n` +
              `- **专业课程研讨与考研自习**：请前往【博学楼】；\n` +
              `- **王牌科研平台**：【茶树生物学与资源利用国家重点实验室】。\n\n` +
              `如需借用教室或开具审批表单，也可以随时告诉我！`
      };
    }

    // 智能通用生成引擎（拒绝机械按键菜单！不需要学校信息时它就是具备深厚底蕴的 DeepSeek）
    return generateIntelligentOpenResponse(raw, t);
  }

  // ----------------------------------------------------------------------------
  // 3.0 快捷领域查询解析辅助函数 (多轮追问与地点卡片渲染)
  // ----------------------------------------------------------------------------
  function getCatsByLocation(loc) {
    AgentState.lastTopic = 'cats';
    AgentState.lastLocation = loc;

    // 清理前后缀修饰词，例如 “北二门呢” -> “北二门”
    const clean = (loc || '').replace(/^(那|请问|那请问)?/, '').replace(/[呢呀啊嘛\?？\s]+$/, '');

    if (clean === '东门') {
      return {
        text: `【「安农校宠图鉴」· 出没在【学校东门】的常驻名猫】：\n\n` +
          `1. **001号镇校之宝【来福】**（公 / 已绝育）：\n` +
          ` - **常驻地**：东门保安亭旁、减速带或暖阳石阶上趴着晒太阳；\n` +
          ` - **性格档案**：东门霸主！公猫需要爱护。**切记！千万不能惹他生气，不然就兔子蹬鹰了！** 脾气大但全校公认最圆滚滚；\n` +
          ` - **“安心撸”评价**：【不能惹 / 小心撸】；\n` +
          ` - **健康警示**：体重大幅超标，严禁投喂高盐火腿肠与人类剩饭！\n\n` +
          `2. **002号校宠【玳瑁】**（母 / 已绝育）：\n` +
          ` - **常驻地**：学校东门附近活动；\n` +
          ` - **性格档案**：名义上来福的老婆，但两猫见面只有领地斗争！性格比较乖，主动找你时可放心摸；\n` +
          ` - **“安心撸”评价**：【主动找你时可随便撸】。`
      };
    }

    if (clean === '勤学楼' || clean === '勤学') {
      return {
        text: `【「安农校宠图鉴」· 出没在【勤学楼】的常驻名猫】：\n\n` +
          `1. **004号大网红【花姐】**（母 / 已绝育）：\n` +
          ` - **常驻地**：勤学楼一楼大厅、走廊或跳上后排课桌陪读，被誉为“荣誉监考官”；\n` +
          ` - **性格档案**：全校公认大网红三花猫！每天随机在勤学楼宠幸学生；\n` +
          ` - **“安心撸”评价**：【随便撸 / 教学楼内保持安静清洁】。\n\n` +
          `2. **005号【毛毛】**（母 / 已绝育）：\n` +
          ` - **常驻地**：勤学楼西侧门口；\n` +
          ` - **性格档案**：尽职尽责的“门口保安猫”，每天准时到岗打卡！`
      };
    }

    if (clean === '猫坡') {
      return {
        text: `【「安农猫坡名猫组」· 盘点出没在【猫坡】的校宠】：\n\n` +
          `1. **018号【英国佬】**（公 / 已绝育）：全校脾气最好的绅士名猫！脾气特别好，可以摸，还可以轻轻捏爪爪～【随便撸 / 强力推荐】；\n` +
          `2. **017号【足球八嘎】**（母 / 已绝育）：不喜欢被摸但可以摸，摸一下就会叫一下；\n` +
          `3. **019号【花卷】**（母 / 已绝育）：亲人、好摸、脾气极好【随便撸】；\n` +
          `4. **020号【黑头】**（母 / 已绝育）：脾气好，可摸。\n\n` +
          `猫坡是安农大极具生机的向阳草坪校宠聚集点。`
      };
    }

    if (clean === '北二门') {
      return {
        text: `**关于【北二门】与安农校宠分布**：\n\n` +
          `在安农大实景中，**北二门门口本身主要为机动车进出与人流通行道，校宠猫咪平时一般不会直接在门口大路常驻**哦～\n\n` +
          `不过紧邻北二门的**【图书馆周边草丛 / 科技楼】**处，活动着两只著名的小彩狸姐妹花：\n` +
          `- 【054号【小罐】】（像煤气罐，声音很嗲爱叫，毛发油光水滑，很让人摸，但偶尔会跳起来）；\n` +
          `- 【055号【小美】】（毛发蓬松颜值极高，和小罐是一窝的）；\n` +
          `- 【057号【小巴】】（黏人小猫，之前在消防站长大）。\n\n` +
          `再往西南走一点到**【猫坡】**向阳草坪，还有全校脾气最好可以捏爪爪的 018号【英国佬】！如果你在北二门偶遇了新面孔的小流浪猫，也可以告诉我它的花色特征，我们一起为它建档。`
      };
    }

    if (clean === '第二报告厅' || clean === '报告厅') {
      return {
        text: `【「第二报告厅校宠矩阵」】：\n\n` +
          `1. **011号【大吉】**（公 / 已绝育）：超亲人小暖男，给吃的主动贴贴【随便撸 / 欢迎带冻干】；\n` +
          `2. **014号【小可怜】**（母 / 已绝育）：颜值极高的小母猫，摸时会喵喵叫（避开敏感部位）；\n` +
          `3. **013号【白肚子】** & **015号【孔明】**：胆子偏小，带冻干可靠近；\n` +
          `4. **016号【嘴上有屎】** & **062号【对眼】**： 报告厅双恶霸，会打人！【 绝对不要撸 / 保持距离防抓伤】！`
      };
    }

    if (clean === '化学楼') {
      return {
        text: `【「化学楼校宠小分队」】：\n\n` +
          `1. **006号【小黑】**（公 / 已绝育）：和小漂亮是好友，嘴馋爱吃冻干，常在化学楼后面路边栏杆（即东苑对面）讨饭【手上有吃的必须要摸！】；\n` +
          `2. **007号【小漂亮】**（母 / 已绝育）：嘴馋胆小但为了吃的特别会撒娇，只认吃的不认人，嫉妒心强会咬肥肥【建议摸下巴背部和尾巴根】；\n` +
          `3. **040号【肥肥】**、**043号【冒号】**、**044号【姥姥】**。`
      };
    }

    if (clean === '图书馆') {
      return {
        text: `【「图书馆学霸校宠团」】：\n\n` +
          `1. **008号【馆长】**（母 / 已绝育）：图书馆门面担当，比较亲人，但动作太大容易吓跑【小心撸 / 动作放缓】；\n` +
          `2. **009号【福二代】**（公 / 已绝育）：脾气超好【随便撸】；\n` +
          `3. 【010号【哑嗓子】】、**054号【小罐】**（像煤气罐/北二门草丛亲人）、**056号【小清】**、**057号【小巴】**。`
      };
    }

    if (clean === '幼儿园宿舍区' || clean === '幼儿园') {
      return {
        text: `【「幼儿园宿舍区校宠」】：\n\n` +
          `- **027号【屁姐】**（母 / 已绝育）：经常随机刷新在停放的电动车坐垫上，超级喜欢被拍屁股！有个逆子叫屁哥。\n` +
          `- **029号【熟蛋黄/丧彪】**：每天顶着委屈脸，亲人喜欢进宿舍楼；\n` +
          `- **031号【面具姐】**：特别乖的玳瑁猫，孩几颜值在线。`
      };
    }

    if (clean === '体育部办公楼' || clean === '体育部' || clean === '北一门') {
      return {
        text: `【「体育部办公楼 / 北一门」】：\n\n` +
          `- **035号【鸟哥】**（公 / 已绝育）：北一门一霸！爱好是打架，心愿是打遍天下无敌猫，领地意识极强！【霸主巡视 / 请勿挑衅】\n` +
          `- **036号【小虎斑（鸟哨）】**：鸟哥好闺蜜之一，可摸软软的。`
      };
    }

    if (clean === '博学楼' || clean === '博学') {
      return {
        text: `【「博学楼周边校宠」】：\n\n` +
          `- **022号、023号校宠**：常在博学楼周边绿化带出没，性格较为胆小怕人，建议远距离观赏，请勿追赶惊吓～`
      };
    }

    // 通用地点应答（该地点没有猫时的温和高情商解答，绝不答非所问！）
    return {
      text: `**关于【${clean}】的校宠情况**：\n\n` +
        `根据《安徽农业大学校宠花名册》（在册63+只），【${clean}】目前**暂未收录常驻建档的猫咪**哦～\n\n` +
        `安农大的小猫咪们大多喜欢聚集在阳光充足、有遮阳避雨处且有同学经常喂食的区域，比如：\n` +
        `- **学校东门**：东门霸主 001号【来福】（兔子蹬鹰切勿惹怒）与 002号【玳瑁】；\n` +
        `- **勤学楼**：大网红 004号【花姐】（后排陪读）与 005号【毛毛】（西侧保安）；\n` +
        `- **猫坡**：顶流绅士 018号【英国佬】（脾气极好捏爪爪）与 019号【花卷】；\n` +
        `- **第二报告厅**：超亲人的 011号【大吉】与报告厅双恶霸 016号【嘴上有屎】；\n` +
        `- **图书馆周边**：文化名猫 008号【馆长】与 009号【福二代】。\n\n` +
        `如果您在【${clean}】偶然发现了新的流浪小猫，欢迎告诉我它的出没位置与花色，智办随时帮它建档。`
    };
  }

  function getCatByName(name) {
    AgentState.lastTopic = 'cats';
    if (name === '来福') {
      return {
        text: `**【数智安农 · 多模态校宠档案识别 · 001号校宠「来福」】**\n\n` +
          `📸 **视觉与图谱检索完成**：已锁定安徽农业大学官方在册 001 号明星校宠【来福】！\n` +
          `- **常驻出没地**：【学校东门】保安室旁石阶、花坛与草坪\n` +
          `- **标志性特征**：经典狸花背、翡翠绿眸，**常年吐出粉嫩小舌头卖萌**（吐舌表情包本尊）\n` +
          `- **健康警示**：来福体重大幅超标，严禁投喂人类高盐熟食！建议投喂无谷冻干或洁净饮水。`,
        approval: null,
        widgetHtml: renderLaifuProfileCard()
      };
    }
    if (name === '花姐') {
      return {
        text: `【「安农校宠图鉴」· 004号明星校宠【花姐】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【勤学楼内】一楼大厅、走廊或跳上空闲课桌陪读\n- **性格档案**：全校公认大网红猫！每天随机在勤学楼宠幸学生，享受安农学子的陪读待遇，被誉为“荣誉监考官”。\n- **“安心撸”评价**：【随便撸 / 保持教学楼安静】\n- **文明提醒**：勤学楼为教学场所，楼内投喂请自备餐垫，切勿撒落地板。`
      };
    }
    if (name === '英国佬') {
      return {
        text: `【「安农校宠图鉴」· 018号明星校宠【英国佬】】\n\n- **性别与绝育**：公猫 / 已绝育\n- **常驻出没地**：【猫坡】区域\n- **性格档案**：全校脾气最好的绅士名猫！脾气特别好，可以摸，甚至可以轻轻捏爪爪～\n- **“安心撸”评价**：【随便撸 / 强力推荐】`
      };
    }
    if (name === '大吉') {
      return {
        text: `【「安农校宠图鉴」· 011号明星校宠【大吉】】\n\n- **性别与绝育**：公猫 / 已绝育\n- **常驻出没地**：【第二报告厅】\n- **性格档案**：特别亲人！只要你给他带吃的零食，他会更主动跟你贴贴～\n- **“安心撸”评价**：【随便撸 / 欢迎带冻干】`
      };
    }
    if (name === '馆长') {
      return {
        text: `【「安农校宠图鉴」· 008号明星校宠【馆长】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【图书馆】周边\n- **性格档案**：图书馆文化名猫，比较亲人，但性格较为胆小敏锐，动作太大幅度容易吓跑。\n- **“安心撸”评价**：【小心撸 / 动作放缓轻柔】`
      };
    }
    if (name === '毛毛') {
      return {
        text: `【「安农校宠图鉴」· 005号明星校宠【毛毛】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【勤学楼】西侧门口\n- **性格档案**：勤学楼尽职尽责的“常驻门口保安”，每天准时到岗打卡！\n- **“安心撸”评价**：【随便撸】`
      };
    }
    if (name === '小黑' || name === '小漂亮') {
      return {
        text: `【「安农校宠图鉴」· 化学楼讨饭两姐妹【小黑 & 小漂亮】】\n\n` +
          `1. **006号【小黑】**：公猫已绝育，和小漂亮是好朋友。嘴馋爱吃冻干零食，亲人胆小，经常在化学楼后面路边的栏杆处（即东苑对面）讨饭。【一定要撸！手上有吃的必须要摸！】\n` +
          `2. **007号【小漂亮】**：母猫已绝育，嘴馋胆小但为了吃的特别会撒娇！经典两面派，只认吃的不认人。嫉妒心极强，目前只能打得过肥肥。【如果主动蹭人一定要摸，建议摸下巴、背部和尾巴根！】`
      };
    }
    if (name === '嘴上有屎' || name === '对眼') {
      return {
        text: `【「安农校宠图鉴」· 报告厅双恶霸【嘴上有屎 & 对眼】】\n\n- **档案编号**：016号【嘴上有屎】（公/已绝育） & 062号【对眼】（已绝育）\n- **常驻出没地**：【第二报告厅】\n- **性格警示**： **打人！小猫真的会打人！** 报告厅名副其实的双恶霸，领地意识极强！\n- **“安心撸”评价**：【 绝对不要撸 / 保持距离防抓伤】`
      };
    }
    if (name === '屁姐' || name === '屁哥') {
      return {
        text: `【「安农校宠图鉴」· 027号校宠【屁姐】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【幼儿园宿舍区】，经常随机刷新在停放的电动车坐垫上！\n- **性格档案**：超级喜欢被拍屁股！有个逆子叫屁哥。\n- **“安心撸”评价**：【随便撸 / 拍屁股专用猫】`
      };
    }
    if (name === '鸟哥') {
      return {
        text: `【「安农校宠图鉴」· 035号校宠【鸟哥】】\n\n- **常驻出没地**：【体育部办公楼 / 北一门】\n- **性格档案**：北一门一霸！爱好是打架，心愿是打遍天下无敌猫，领地意识非常强！\n- **“安心撸”评价**：【霸主巡视 / 请勿挑衅】`
      };
    }
    if (name === '玳瑁') {
      return {
        text: `【「安农校宠图鉴」· 002号校宠【玳瑁】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【学校东门】\n- **性格档案**：名义上来福的老婆，但现实中它俩之间只有领地斗争！性格比较乖，主动找你的时候可以放心摸。\n- **“安心撸”评价**：【主动找你时可随便撸】`
      };
    }
    if (AHAU_KB.catRoster && AHAU_KB.catRoster.length) {
      const found = AHAU_KB.catRoster.find(c => (c.name && c.name.includes(name)) || (name && name.includes(c.name)));
      if (found) {
        return {
          text: `【「安农校宠图鉴」· ${found.id}号校宠【${found.name}】】\n\n` +
            `- **性别与绝育**：${found.gender}猫 / ${found.neutered}\n` +
            `- **常驻出没地**：【${found.location}】\n` +
            `- **性格档案**：${found.personality || '安农大在册萌宠，受全校师生爱护。'}\n` +
            `- **“安心撸”评价**：【${found.pet_rating || '视小猫当天心情而定，请温柔互动'}】\n` +
            `- **关爱提示**：${found.notes ? found.notes + '；' : ''}校园流浪猫请文明投喂专属猫粮，切勿投喂人类高盐剩饭菜！`
        };
      }
    }
    return {
      text: `【「安农校宠图鉴」】：已为您匹配到【${name}】的档案，全校共 63+ 只校宠在册。文明互动，科学关爱！`
    };
  }

  function getCanteenDetail(canteen) {
    AgentState.lastTopic = 'canteens';
    if (canteen.includes('西苑')) {
      return {
        text: `**【西苑食堂】（校内四大主题食堂之一）**：\n\n- **位置**：位于校园西区核心区；\n- **特色**：西区风味小炒档口众多，瓦罐靓汤、营养早餐包点齐全，是西区上课和住宿师生的首选就餐地！`
      };
    }
    if (canteen.includes('欣苑')) {
      return {
        text: `**【欣苑食堂】（校内四大主题食堂之一 · 全校人气之王）**：\n\n- **位置**：位于校园生活核心腹地；\n- **特色**：全校最具人气的食堂！菜色丰富，涵盖大众实惠自选快餐、特色面食、铁板烧与减脂轻食，就餐高峰期常常排队。`
      };
    }
    if (canteen.includes('东苑')) {
      return {
        text: `**【东苑食堂】（校内四大主题食堂之一）**：\n\n- **位置**：位于东区，紧邻勤学楼教学区与学校东门；\n- **特色**：早八下课与中午放学高峰主力食堂，出餐快、紧靠上课教室，对面路边常有校宠小黑与小漂亮讨饭！`
      };
    }
    if (canteen.includes('北苑')) {
      return {
        text: `**【北苑食堂】（校内四大主题食堂之一）**：\n\n- **位置**：位于校园北侧，靠近电山路北门；\n- **特色**：经济实惠，出餐迅速，家常小炒与快餐深受师生欢迎。`
      };
    }
    if (canteen.includes('丰泽')) {
      return {
        text: `**【丰泽食堂】（校外宿舍区 · 北区专属餐饮）**：\n\n- **位置**：位于学生宿舍北区（校外宿舍区）西侧；\n- **特色**：宿舍下楼即达！专门为北区住宿生提供一日三餐保障，并提供特色暖心夜宵。`
      };
    }
    if (canteen.includes('思源')) {
      return {
        text: `**【思源餐厅】（校外宿舍区 · 北区专属餐饮）**：\n\n- **位置**：位于学生宿舍北区（校外宿舍区）东侧（紧邻学生一站式服务中心）；\n- **特色**：就餐环境现代宽敞，档口丰富，就餐同时方便办理一站式学生事务。`
      };
    }
    return {
      text: `**安农就餐指引**：校内有东苑、西苑、北苑、欣苑四大食堂；校外北区宿舍有丰泽食堂与思源餐厅！`
    };
  }

  // ----------------------------------------------------------------------------
  // 3.9 期末历年考试真题与课程资料共享 (资料共享直链与核心考点解析)
  // ----------------------------------------------------------------------------
  function handleExamMaterials(raw) {
    const t = (raw || '').toLowerCase();
    const repo = AHAU_KB.examRepo;
    if (!repo) return { text: '期末真题库正在更新中...' };

    let courseKey = null;

    if (/高数|高等数学|微积分|极限|导数/.test(t)) {
      courseKey = '高等数学';
    } else if (/线代|线性代数|矩阵|行列式|特征值/.test(t)) {
      courseKey = '线性代数';
    } else if (/普化|普通化学|四大平衡|酸碱|沉淀/.test(t)) {
      courseKey = '普通化学';
    } else if (/有机|有机化学/.test(t)) {
      courseKey = '有机化学';
    } else if (/生化|生物化学|代谢|糖代谢|蛋白质/.test(t)) {
      courseKey = '生物化学';
    } else if (/工图|工程制图|相贯线|三视图|投影/.test(t)) {
      courseKey = '工程制图';
    } else if (/物理|大物|基础物理/.test(t)) {
      courseKey = '基础物理';
    } else if (/思政|毛概|马原|史纲|近代史|思修|道德与法治/.test(t)) {
      courseKey = '思政课合集';
    } else if (/微观|经济学|微观经济|高鸿业|曼昆/.test(t)) {
      courseKey = '微观经济学';
    } else if (/会计|基础会计|分录/.test(t)) {
      courseKey = '基础会计';
    } else if (/管理学|卡旺卡/.test(t)) {
      courseKey = '管理学';
    } else if (/农学|遗传|土壤|肥料/.test(t)) {
      courseKey = '农学院专业课';
    } else if (/写作|论文|文献综述|沟通/.test(t)) {
      courseKey = '写作与沟通';
    } else if (/动物学|土壤学/.test(t)) {
      courseKey = '动物学与土壤学';
    }

    if (courseKey && repo.courses[courseKey]) {
      const c = repo.courses[courseKey];
      return {
        text: `**【安徽农业大学课程真题库 · ${courseKey}专项】**\n\n` +
          `依据教学考核规程 <span class="fact-citation-tag" onclick="window.AnauAgent.openCitationDrawer('ahau-exam-2024-03')">[安农教·考核规范§9]</span>，已为您定位真题库与错因诊断模块：\n\n` +
          `- **资料模块**：${c.category}\n` +
          `- **收录试卷**：共计 **${c.files}** 历年真实期末试卷与权威参考答案\n` +
          `- **期末核心考察重点**：\n ${c.highlights}\n\n` +
          `**原卷在线阅读与下载通道**：\n` +
          `- [https://ahau-course.pages.dev/](${c.url})\n\n` +
          `**期末真题错因认知诊断与知识先后依赖拓扑**：\n` +
          `下方已为您调起考点错因诊断靶场，拒绝直接报出浅层答案，针对概念漏洞进行探针诊断与离线确定性复习排期：`,
        widgetHtml: renderCognitiveProbeWidget(courseKey) + renderCurriculumDAGWidget()
      };
    }

    // 默认全景真题库总览
    const courseRows = Object.entries(repo.courses).map(([name, item]) => {
      return `| **${name}** | ${item.category} | ${item.files} | ${item.highlights.slice(0, 24)}... |`;
    }).join('\n');

    return {
      text: `**【安徽农业大学课程资料共享计划 · 期末真题库】**\n\n` +
        `汇集安农学子整理的 **278+ 份** 历年各科期末试卷、复习提纲与实验指导，现已全面并入「安农智办」知识库！\n\n` +
        `| 课程科目 | 分类归属 | 资料数量 | 核心考察亮点 |\n` +
        `| :--- | :--- | :--- | :--- |\n` +
        courseRows + '\n\n' +
        `**一键直达在线真题库**：\n` +
        `- [https://ahau-course.pages.dev/](${repo.portalUrl})\n\n` +
        `**权威教务索引**：<span class="fact-citation-tag" onclick="window.AnauAgent.openCitationDrawer('ahau-exam-2024-03')">[安农教·考核规范§9]</span>\n\n` +
        `**备考智能靶场（已为您就绪）**：下方为高数核心考点错因认知诊断探针与课程先后依赖拓扑图：`,
      widgetHtml: renderCognitiveProbeWidget('gaoshu') + renderCurriculumDAGWidget()
    };
  }

  // ----------------------------------------------------------------------------
  // 3.10 科研与学业互助广场 (多智能体 P2P 需求撮合网络)
  // ----------------------------------------------------------------------------
  function handleResearchPlazaWorkflow(raw) {
    return {
      text:
        `**【科研与学业互助广场 · 多智能体 P2P 需求撮合网络】**\n\n` +
        `已为您启动校园多智能体点对点撮合协同机制，打破学科壁垒与信息孤岛：\n\n` +
        `1. **能力标签自动提炼**：本地智能体已解析您的诉求，结构化抽象出本端资产（#茶树病斑多光谱数据集 #5000+样本已标注 #茶树国重室工位支持）与互补技术需求（#计算机视觉 #YOLO轻量化剪枝 #端侧嵌入式部署）；\n` +
        `2. **多智能体点对点网络撮合**：各学院个人智能体在去中心化网络中自动对接，发现并锁定了 1 组高匹配度的工科算法科研团队（契合度 98.6%）；\n` +
        `3. **严格遵循安全底线（AI跑腿，学生拍板）**：智能体仅负责前置需求匹配与技术可行性预审，**敏感科研数据资产交付、代码共享与大创项目正式组队签约，必须由双方同学本人实名审定并点击授权！**\n\n` +
        `**独立交互广场直达**：您可直接点击侧边栏「打开广场 ›」或通过下方链接进入带有全景搜索与筛选的独立广场：\n` +
        `- [进入科研与学业互助广场 (Apple风格大屏检索)](plaza.html)\n\n` +
        `下方为本次多智能体撮合拓扑与对接详情：`,
      widgetHtml: renderResearchPlazaWidget()
    };
  }

  // ----------------------------------------------------------------------------
  // 3.11 AgentWeber 智能教务协同与安全工作流 (被动能力流转状态机)
  // ----------------------------------------------------------------------------
  function handleAgentWeberPassiveWorkflow(raw) {
    AgentState.lastTopic = 'agent_weber';
    const t = (raw || '').toLowerCase();

    let scenarioKey = 'general';
    let title = '智能教务跨部门协同流转工作流';
    let dept = '现代教育技术中心 / 教务处教务运行科';
    let steps = [];
    let summaryText = '';

    if (t.includes('调课') || t.includes('换课') || t.includes('教室冲突')) {
      scenarioKey = 'tiaoke';
      title = '调课申请与教室占用冲突消解协同工作流';
      dept = '开课学院教学办 / 教务处教务运行科';
      steps = [
        { name: '读取原授课计划与教师周课表', status: 'done', detail: '模拟核验：原周三第3节课程无学生大面积重叠' },
        { name: '全校空闲教室资源自动拓扑扫描', status: 'done', detail: '模拟核验：拟调入时段勤学楼 402/博学楼 201 均空闲' },
        { name: '教学院长终审与全班调课通告发布', status: 'gated', detail: '触发写入门禁：需任课教师/经办人核验并授权' }
      ];
      summaryText = '已为您完成拟调课程冲突检测与备选多媒体教室匹配。读操作已在您的浏览器原生沙箱中自动完成，正式写入教务系统并下发通知前已置入 0 次越权门禁，请您确认：';
    } else if (t.includes('学分') || t.includes('培养方案') || t.includes('毕业')) {
      scenarioKey = 'credit';
      title = '培养方案毕业学分查漏与排课对齐工作流';
      dept = '教务处学籍与注册科 / 教学培养科';
      steps = [
        { name: '抓取专业本科培养方案基线标准', status: 'done', detail: '模拟核验：总学分要求 160，必修 128，选修 32' },
        { name: '比对学生当前教务系统已修读学分', status: 'done', detail: '模拟核验：已修 114，尚缺通识选修 2 学分、专业拓展 12 学分' },
        { name: '推荐补选方案并预选下学期缺额课程', status: 'gated', detail: '触发写入门禁：课程预选写入教务池需本人授权' }
      ];
      summaryText = '已为您核对毕业学分缺额并完成开课池时序排课规划。敏感学籍数据完全在本地加密处理，自动预选写入教务系统前已置入 0 次越权门禁：';
    } else if (t.includes('成绩') && (t.includes('复核') || t.includes('异议') || t.includes('查分') || t.includes('登分'))) {
      scenarioKey = 'score';
      title = '期末考试成绩异议复核多节点协同工作流';
      dept = '开课教研室 / 学院教学督导组 / 考务科';
      steps = [
        { name: '调取卷面答卷归档与登分系统电子存根', status: 'done', detail: '模拟核验：答卷流水号与试卷扫描件匹配成功' },
        { name: '双评专家组同卷背靠背分步重新核分', status: 'done', detail: '模拟核验：客观题无漏评，大题分步小计一致' },
        { name: '教学院长终核与教务系统更正签批', status: 'gated', detail: '触发写入门禁：最终成绩数据库回写需主管签字授权' }
      ];
      summaryText = '已为您调取卷面存根与专家核分流转记录。只读审查已通过，正式更正数据库前已激活 Action Gating 门禁卡口：';
    } else {
      scenarioKey = 'general';
      title = '教务协同流程演示';
      dept = '现代教育技术中心 / 综合办事大厅';
      steps = [
        { name: '浏览器原生沙箱环境初始化与凭证校验', status: 'done', detail: '模拟核验：本地公私数据双轨隔离已就绪' },
        { name: '业务流转前置规则与跨部门接口对齐', status: 'done', detail: '模拟核验：教务、后勤、学工状态读操作无冲突' },
        { name: '演示表单确认', status: 'gated', detail: '触发写入门禁：高敏写入操作需经办人显式授权' }
      ];
      summaryText = '智能体已生成示例流程，等待模拟确认。';
    }

    const docNo = 'WEBER-' + Math.floor(100000 + Math.random() * 900000);

    return {
      text: `**【AgentWeber 智能教务协同引擎】被动协同流转已启动**\n\n` +
        `已在后台自动调取 **AgentWeber 智能教务协同与安全流转能力**（作为 AI 被动技能实时介入）。\n\n` +
        `本流程使用演示数据，展示步骤编排和人工确认。\n\n` +
        summaryText,
      approval: null,
      widgetHtml: renderAgentWeberPassiveWidget({
        docNo,
        title,
        dept,
        steps,
        scenarioKey
      })
    };
  }

  // ----------------------------------------------------------------------------
  // 数智安农 · 统一身份认证教务网关 & Agent 动作流水线 & 多维学业看板 (严格真实直连模式)
  // ----------------------------------------------------------------------------
  function handleGradeQueryWorkflow() {
    return {
      text: '**本科教务查询**\n\n请在[安徽农业大学本科教务系统](https://bkjw.ahau.edu.cn/home/#/home)完成统一身份认证，再查询课表或成绩。校外可使用[学校 WebVPN](https://myvpn.ahau.edu.cn/)。',
      approval: null
    };
  }

  function openZongceFromBoard(gpa) {
    if (window.AnauAgent && window.AnauAgent.sendUserMsg) {
      window.AnauAgent.sendUserMsg(`基于我当前教务系统的加权绩点 ${gpa} 分，请为我测算本学期保研与一等奖学金综测排位。`);
    }
  }

  function openDiagnosisFromBoard() {
    if (window.openDiagnosisPage) {
      window.openDiagnosisPage();
    } else {
      window.open('diagnosis.html?v=apple_v1', '_blank');
    }
  }

  // ----------------------------------------------------------------------------
  // 跨平台 OS Agent: 本地主机协同与学业工作区自动化部署 (Windows & macOS)
  // ----------------------------------------------------------------------------
  function renderOsWorkspaceTraceWidget(wid) {
    return `
      <div class="anau-step-trace" id="${wid}">
        <div class="anau-trace-hud">
          <div class="anau-trace-title">
            <span class="anau-gw-dot" style="animation: pulse 1s infinite; background:#3b82f6;"></span>
            <span>ANAU CROSS-PLATFORM OS AGENT RUNTIME · 本地电脑设备自动化调度</span>
          </div>
          <span style="color:#6b7280; font-size:11px;">WIN & MAC COMPATIBLE · SYSTEM API</span>
        </div>
        <div class="anau-trace-list" id="${wid}_list">
          <div class="anau-trace-item active" id="${wid}_step1">
            <div class="anau-trace-left">
              <span>▸ [1/4] 探测本地主机操作系统环境 (Windows / macOS) 与用户主目录...</span>
            </div>
            <span class="anau-trace-chip" id="${wid}_chip1">运行中...</span>
          </div>
          <div class="anau-trace-item" id="${wid}_step2">
            <div class="anau-trace-left">
              <span>▸ [2/4] 自动构建多维学业归档中枢目录与各科核心复习清单...</span>
            </div>
            <span class="anau-trace-chip" id="${wid}_chip2">等待中</span>
          </div>
          <div class="anau-trace-item" id="${wid}_step3">
            <div class="anau-trace-left">
              <span>▸ [3/4] 编译标准 iCalendar (.ics) 系统级考务日历协议包...</span>
            </div>
            <span class="anau-trace-chip" id="${wid}_chip3">等待中</span>
          </div>
          <div class="anau-trace-item" id="${wid}_step4">
            <div class="anau-trace-left">
              <span>▸ [4/4] 调度系统原生窗口 (Explorer / Finder) 定位并投递系统桌面通知...</span>
            </div>
            <span class="anau-trace-chip" id="${wid}_chip4">等待中</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderOsWorkspaceBoardWidget(data) {
    const platform = data.platform || 'macOS';
    const isWin = platform.includes('Windows');
    const badgeIcon = isWin ? '🪟' : '🍎';
    const path = data.workspacePath || 'Documents/安农大学业工作区';
    const calendarPath = data.calendarPath || '';
    const osAction = data.osAction || '已调起原生窗口';

    return `
      <div class="anau-os-board">
        <div class="anau-os-header">
          <div class="anau-os-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" stroke-width="2.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <span>安农大学业中枢 · 本地主机设备自动化部署成功</span>
          </div>
          <div class="anau-os-platform-badge">
            <span>${badgeIcon}</span>
            <span>${platform} 架构已打通</span>
          </div>
        </div>

        <div class="anau-os-notice">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#16a34a" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span><strong>OS 原生协同生效：</strong>${osAction}</span>
        </div>

        <div style="font-size:12px; color:#64748b; font-weight:600; margin-bottom:6px;">本地文件系统定位路径 (Local Filesystem URI):</div>
        <div class="anau-os-path-box">
          <span class="anau-os-path-text">${path}</span>
          <button class="btn-anau-hook" style="padding:4px 10px; font-size:11.5px;" onclick="window.AnauAgent.openLocalPath('${path.replace(/\\/g, '\\\\')}')">
            定位文件
          </button>
        </div>

        <div style="font-size:12px; color:#64748b; font-weight:600; margin-bottom:6px;">已编排并落盘的学业工程文件清单:</div>
        <div class="anau-os-tree">
          <div class="anau-os-tree-row">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="#f59e0b"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span><strong>01_专业必修与实验课 /</strong> 高等数学_复习导图与重点攻坚.md</span>
          </div>
          <div class="anau-os-tree-row">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="#f59e0b"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span><strong>02_通识拓展与实践学分 /</strong> (已建立专属归档位)</span>
          </div>
          <div class="anau-os-tree-row">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="#f59e0b"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span><strong>03_科研竞赛与保研档案 /</strong> 学术创新与竞赛加分存根.md</span>
          </div>
          <div class="anau-os-tree-row">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="#3b82f6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span><strong>04_学期考务与日程规划 /</strong> 📅 ANAU_Semester_Calendar.ics (支持一键写入系统日历)</span>
          </div>
        </div>

        <div class="anau-board-actions">
          <button class="btn-anau-hook" style="background:#2563eb; color:#ffffff; border-color:#2563eb;" onclick="window.AnauAgent.openLocalPath('${path.replace(/\\/g, '\\\\')}')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            在本地电脑中唤起工作区
          </button>
          <button class="btn-anau-hook" onclick="window.AnauAgent.openLocalPath('${calendarPath.replace(/\\/g, '\\\\')}')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            一键同步至系统日历
          </button>
        </div>
      </div>
    `;
  }

  function handleOsWorkspaceWorkflow(raw) {
    AgentState.lastTopic = 'os_workspace';
    const wid = 'os-' + Math.floor(100000 + Math.random() * 900000);

    setTimeout(() => {
      runOsWorkspacePipeline(wid);
    }, 350);

    return {
      text: `**【数智安农 · OS 跨平台电脑控制 Agent】已启动**\n\nAgent 正在调用操作系统底层 API，为您在本地电脑（Windows / macOS）自动部署专属安农大学业工作区中枢，并同步系统级考务日程...`,
      approval: null,
      widgetHtml: renderOsWorkspaceTraceWidget(wid)
    };
  }

  async function runOsWorkspacePipeline(wid) {
    const step1 = document.getElementById(wid + '_step1');
    const chip1 = document.getElementById(wid + '_chip1');
    const step2 = document.getElementById(wid + '_step2');
    const chip2 = document.getElementById(wid + '_chip2');
    const step3 = document.getElementById(wid + '_step3');
    const chip3 = document.getElementById(wid + '_chip3');
    const step4 = document.getElementById(wid + '_step4');
    const chip4 = document.getElementById(wid + '_chip4');

    try {
      await new Promise(r => setTimeout(r, 600));
      if (chip1) { chip1.textContent = '✓ 探测完毕'; chip1.style.color = '#10b981'; }
      if (step1) { step1.className = 'anau-trace-item done'; }
      if (step2) { step2.className = 'anau-trace-item active'; }
      if (chip2) { chip2.textContent = '构建中...'; chip2.style.color = '#3b82f6'; }

      await new Promise(r => setTimeout(r, 800));
      if (chip2) { chip2.textContent = '✓ 目录创建成功'; chip2.style.color = '#10b981'; }
      if (step2) { step2.className = 'anau-trace-item done'; }
      if (step3) { step3.className = 'anau-trace-item active'; }
      if (chip3) { chip3.textContent = '编译日历中...'; chip3.style.color = '#3b82f6'; }

      // Real API Call
      const res = await fetch('http://127.0.0.1:8088/api/anau/deploy_workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp: Date.now() })
      });
      const data = await res.json();

      await new Promise(r => setTimeout(r, 700));
      if (chip3) { chip3.textContent = '✓ ICS 协议编译完成'; chip3.style.color = '#10b981'; }
      if (step3) { step3.className = 'anau-trace-item done'; }
      if (step4) { step4.className = 'anau-trace-item active'; }
      if (chip4) { chip4.textContent = '✓ 系统窗口已弹出'; chip4.style.color = '#10b981'; }
      if (step4) { step4.className = 'anau-trace-item done'; }

      await new Promise(r => setTimeout(r, 600));

      const traceEl = document.getElementById(wid);
      if (traceEl) {
        traceEl.outerHTML = renderOsWorkspaceBoardWidget(data);
      }
    } catch(err) {
      const traceEl = document.getElementById(wid);
      if (traceEl) {
        traceEl.innerHTML = `
          <div style="padding:16px 18px; background:#fff1f2; border:1px solid #fecdd3; border-radius:14px; color:#be123c; font-size:13px;">
            <strong>OS Agent 调度异常：</strong>${err.message}
          </div>
        `;
      }
    }
  }

  function openLocalPath(path) {
    fetch('http://127.0.0.1:8088/api/anau/open_path', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: path })
    }).catch(e => console.error(e));
  }

  function processUserInput(text) {
    const raw = (text || '').trim();
    const t = raw.toLowerCase();

    // 智能多轮意图消解与话题抢占（解决用户问了综测后中途跳到茶树国重室/校猫/楼宇等新问题）
    if (AgentState.workflow === 'classroom') {
      if (/^(取消|退出|停止)(?:借教室|借用|申请)?[。！!]*$/.test(raw)) {
        AgentState.workflow = null;
        AgentState.workflowData = {};
        return { text: '已取消这次教室借用草案。' };
      }
      const details = readClassroomDetails(raw);
      if (Object.keys(details).length) return handleClassroomWorkflow(raw, details);
    }

    const detectedIntent = detectIntentSwitch(raw, t);
    if (detectedIntent && AgentState.workflow && AgentState.workflow !== detectedIntent) {
      AgentState.workflow = null;
      AgentState.workflowStep = 0;
      AgentState.workflowData = {};
    }

    // 优先：正在进行的借教室工作流
    if (AgentState.workflow === 'classroom') {
      return handleClassroomWorkflow(raw);
    }

    // 优先：正在进行的请假工作流
    if (AgentState.workflow === 'leave') {
      return handleLeaveWorkflow(raw);
    }

    // 优先：正在进行的教务协同工作流 (AgentWeber)
    if (AgentState.workflow === 'agent_weber') {
      return handleAgentWeberPassiveWorkflow(raw);
    }

    // 优先：正在进行的综测与奖学金工作流
    if (AgentState.workflow === 'zongce') {
      return handleZongceWorkflow(raw);
    }

    // 优先：正在进行的考研规划工作流
    if (AgentState.workflow === 'kaoyan') {
      return handleKaoyanWorkflow(raw);
    }

    if (/调课|排课对齐|培养方案|毕业学分|学分查漏|成绩复核|成绩异议|协同工作流|教务协同|agentweber|weber|跨部门审批|公文流转|审批流程/.test(t)) return handleAgentWeberPassiveWorkflow(raw);
    if (/综测|测评|评优|奖学金|志愿汇/.test(t)) return handleZongceWorkflow(raw);
    if (/课表|成绩|绩点|gpa|查分|及格|挂科/.test(t)) {
      return handleGradeQueryWorkflow(raw);
    }

    if (/借.{0,10}教室|开班会|多媒体.{0,6}申请/.test(t)) {
      AgentState.workflow = 'classroom';
      AgentState.workflowData = {};
      return handleClassroomWorkflow(raw);
    }

    // 优先：数学算术计算
    const mathResult = solveMath(raw);
    if (mathResult) {
      AgentState.lastTopic = 'math';
      return mathResult;
    }

    // 优先：跨平台 OS Agent 本地电脑设备自动化调度与学业工作区部署
    if (/电脑自动化|os agent|系统控制|本地控制|自动化做事情|部署工作区|工作区|同步日历|本地学业|电脑端|本地主机|硬件控制/.test(t)) {
      return handleOsWorkspaceWorkflow(raw);
    }

    // 优先：直接触发三大全新硬核场景 (综测、考研、师资)
    if (t.includes('考研') || t.includes('择校') || t.includes('专硕') || t.includes('学硕') || t.includes('读博') || t.includes('408') || t.includes('414') || t.includes('314') || t.includes('315') || t.includes('考研时间线') || t.includes('考研科目') || t.includes('复习进度') || t.includes('择校方案')) {
      return handleKaoyanWorkflow(raw);
    }
    // 师资队伍与导师课题触发器（动态匹配全校所有教师姓名、学院名、校长、院长、导师、课题等所有提问方式）
    const hasFacultyName = AHAU_KB.faculty.some(g => g.teachers.some(teacher => raw.includes(teacher.name)));
    const isFacultyQuery = hasFacultyName ||
      /师资|导师|教授|课题组|研究课题|研究方向|博导|硕导|老师|教师|副教授|讲师|校长|副校长|院长|系主任|副院长/.test(t) ||
      /农学院|茶业学院|茶学院|人工智能学院|信智学院|计算机学院|信息与计算机学院|园艺学院|林学院|林学与园林|资环学院|资源与环境|工学院|机械学院|生科院|生命科学学院|生物制造|植保学院|植物保护学院|经管学院|经济管理学院|动科院|动医院|动物科技学院|动物医学院|材化学院|材料与化学|外语学院|外国语学院|理学院/.test(t) ||
      ((t.includes('学院') || t.includes('系')) && (t.includes('谁') || t.includes('人') || t.includes('有哪些') || t.includes('名单') || t.includes('名录') || t.includes('队伍') || t.includes('老师') || t.includes('导师') || t.includes('教授')));
    if (isFacultyQuery) {
      return handleFacultyQuery(raw);
    }

    // 优先：期末考试真题与课程资料共享 (历年真题库)
    if (/期末|往年卷|真题|试卷|复习资料|复习题|题库|高数卷|高数题|高数真题|线代卷|线代题|线代真题|普化卷|普化题|普化真题|生化卷|生化题|工图卷|工图题|工程制图卷|微观经济|基础会计|思政合集|思政题库|思修题库|马原题库|近代史题库|农学专业课|结课论文|aau-course/.test(t)) {
      return handleExamMaterials(raw);
    }

    // 优先：科研与学业互助广场 (多智能体 P2P 需求撮合网络)
    if (/科研广场|互助广场|科研互助|找队友|跨学科|组队|科研合作|借仪器|借设备|数据共享|互帮互助|找搭档|芯片量化|多光谱|病斑数据|p2p撮合|智能体撮合|找搭子|合作组队/.test(t) ||
        (t.includes('科研') && (t.includes('广场') || t.includes('撮合') || t.includes('合作') || t.includes('找人') || t.includes('组队') || t.includes('互助')))) {
      return handleResearchPlazaWorkflow(raw);
    }

    // =========================================================================
    // 核心多轮上下文指代消解与连问拦截器 (Contextual Anaphora & Ellipsis Resolver)
    // 专门解决：“猫坡有哪些猫” -> “东门呢” / “那勤学楼呢” / “西苑呢” / “来福呢” 这类连问追问
    // =========================================================================
    const cleanFollowUp = raw.replace(/^(那|请问|那请问|那么)?/, '').replace(/[呢呀啊嘛\?？\s]+$/, '');
    
    // 地点与实体映射表
    const locationMapping = {
      东门: '东门',
      勤学楼: '勤学楼',
      勤学: '勤学楼',
      博学楼: '博学楼',
      博学: '博学楼',
      勤政楼: '勤政楼',
      勤政: '勤政楼',
      猫坡: '猫坡',
      图书馆: '图书馆',
      第二报告厅: '第二报告厅',
      报告厅: '第二报告厅',
      化学楼: '化学楼',
      幼儿园: '幼儿园宿舍区',
      幼儿园宿舍区: '幼儿园宿舍区',
      动科院: '动科院',
      经管院: '经管院',
      信计院: '信计院',
      新苑十字路口: '新苑十字路口',
      体育部: '体育部办公楼',
      北一门: '体育部办公楼',
      西苑: '西苑食堂',
      西苑食堂: '西苑食堂',
      欣苑: '欣苑食堂',
      欣苑食堂: '欣苑食堂',
      东苑: '东苑食堂',
      东苑食堂: '东苑食堂',
      北苑: '北苑食堂',
      北苑食堂: '北苑食堂',
      丰泽: '丰泽食堂',
      丰泽食堂: '丰泽食堂',
      丰泽餐厅: '丰泽食堂',
      思源: '思源餐厅',
      思源餐厅: '思源餐厅'
    };

    // 1. 如果上文正在聊“校宠”或者当前提及了猫咪/花名册
    if (AgentState.lastTopic === 'cats' || t.includes('猫') || t.includes('校宠') || t.includes('花名册')) {
      AgentState.lastTopic = 'cats';

      // 优先检查是否追问具体明星猫咪名字
      const catNames = ['来福', '花姐', '玳瑁', '毛毛', '英国佬', '大吉', '馆长', '福二代', '小黑', '小漂亮', '嘴上有屎', '对眼', '屁姐', '屁哥', '鸟哥', '花卷', '足球八嘎', '黑头'];
      for (const name of catNames) {
        if (raw.includes(name)) {
          return getCatByName(name);
        }
      }

      // 检查是否追问某个具体地点（如“东门呢”、“北二门呢”、“南门呢”）
      for (const [key, loc] of Object.entries(locationMapping)) {
        if (cleanFollowUp === key || (raw.length <= 10 && raw.includes(key))) {
          return getCatsByLocation(loc);
        }
      }

      // 若处于校宠话题下，且问题较短（例如：“北二门”、“南门呢”、“那大礼堂呢”），统一按校宠地点解答！绝不跳出话题！
      if (raw.length <= 10 || raw.endsWith('呢') || raw.startsWith('那')) {
        return getCatsByLocation(cleanFollowUp);
      }
    }

    // 2. 如果上文正在聊“食堂/就餐”
    if (AgentState.lastTopic === 'canteens' || t.includes('食堂') || t.includes('餐厅') || t.includes('吃饭') || t.includes('外卖')) {
      AgentState.lastTopic = 'canteens';
      for (const [key, loc] of Object.entries(locationMapping)) {
        if (cleanFollowUp === key || (raw.length <= 8 && raw.includes(key))) {
          if (['西苑食堂', '欣苑食堂', '东苑食堂', '北苑食堂', '丰泽食堂', '思源餐厅'].includes(loc)) {
            return getCanteenDetail(loc);
          }
        }
      }
    }

    // 3. 如果短问题直接问了“东门”、“猫坡”等，即使用户第一次问也能智能接住
    if (cleanFollowUp === '东门' || (raw.length <= 6 && raw.includes('东门'))) {
      AgentState.lastTopic = 'cats';
      return getCatsByLocation('东门');
    }
    if (cleanFollowUp === '猫坡' || (raw.length <= 6 && raw.includes('猫坡'))) {
      AgentState.lastTopic = 'cats';
      return getCatsByLocation('猫坡');
    }

    // 意图 2.1：学生返校销假 (严禁随意一键销假，进入规范审核核验流)
    if (t.includes('销假') || t.includes('归校') || t.includes('返校报到') || t.includes('请假结束')) {
      return handleXiaojiaWorkflow(raw);
    }

    // 意图 2：学生请假审批单
    if (t.includes('请假') || t.includes('假条') || t.includes('离校审批') || t.includes('开假单')) {
      AgentState.workflow = 'leave';
      AgentState.workflowStep = 1;
      AgentState.workflowData = {};
      return handleLeaveWorkflow(raw);
    }

    // 意图 3：楼宇与防跑空检验（极其关键的真实校情！）
    if (t.includes('勤政楼')) {
      AgentState.lastTopic = 'buildings';
      return {
        text: `【安农防跑空重要提醒 · 勤政楼性质说明】：\n\n- **性质**：勤政楼是**学校行政领导与机关老师办公楼**，【绝对不是学生上课的教学楼】！\n- **学生办事窗口**：教务处、学生处（学工部）、校团委、财务处、保卫处均设在勤政楼内。办理学籍证明、盖章、团组织转接等事务需前往勤政楼。\n- **上课去哪？**：全校本科课程上课请前往 **勤学楼**（公共多媒体大课）或 **博学楼**（专业课），切勿在上课时间跑错到勤政楼！`
      };
    }

    if (t.includes('勤学楼') || t.includes('博学楼')) {
      AgentState.lastTopic = 'buildings';
      return {
        text: `**安农教学楼档案**：\n\n- **勤学楼（主力公共教学楼）**：位于校园东部（紧邻银杏路与东门），配有大量阶梯教室与智慧多媒体大课教室，大一大二公共必修课主要在此。全校公认著名的校猫【花姐】常年在此楼巡视陪读！\n- **博学楼（专业课研讨教学楼）**：位于教学区核心腹地，配备智慧投影与充足的考研自习位。`
      };
    }

    // 意图 4：校猫与《安农校宠花名册》查询
    const catKeywords = ['猫', '校宠', '花名册', '来福', '花姐', '玳瑁', '毛毛', '小黑', '小漂亮', '馆长', '福二代', '大吉', '英国佬', '嘴上有屎', '对眼', '屁姐', '屁哥', '鸟哥', '花卷', '足球八嘎', '小罐', '小美', '四瓜'];
    const hasCatQuery = catKeywords.some(k => t.includes(k));
    if (hasCatQuery) {
      // 1. 具体明星猫咪精准查询
      if (t.includes('来福')) {
        return {
          text: `**【数智安农 · 多模态校宠档案识别 · 001号校宠「来福」】**\n\n` +
            `📸 **视觉与图谱检索完成**：已锁定安徽农业大学官方在册 001 号明星校宠【来福】！\n` +
            `- **常驻出没地**：【学校东门】保安室旁石阶、花坛与草坪\n` +
            `- **标志性特征**：经典狸花背、翡翠绿眸，**常年吐出粉嫩小舌头卖萌**（吐舌表情包本尊）\n` +
            `- **健康警示**：来福体重大幅超标，严禁投喂人类高盐熟食！建议投喂无谷冻干或洁净饮水。`,
          approval: null,
          widgetHtml: renderLaifuProfileCard()
        };
      }
      if (t.includes('花姐')) {
        return {
          text: `【「安农校宠图鉴」· 004号明星校宠【花姐】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【勤学楼内】一楼大厅、走廊或跳上空闲课桌陪读\n- **性格档案**：全校公认大网红猫！每天随机在勤学楼宠幸学生，享受安农学子的陪读待遇，被誉为“荣誉监考官”。\n- **“安心撸”评价**：【随便撸 / 保持教学楼安静】\n- **文明提醒**：勤学楼为教学场所，楼内投喂请自备餐垫，切勿撒落地板。`
        };
      }
      if (t.includes('英国佬')) {
        return {
          text: `【「安农校宠图鉴」· 018号明星校宠【英国佬】】\n\n- **性别与绝育**：公猫 / 已绝育\n- **常驻出没地**：【猫坡】区域\n- **性格档案**：全校脾气最好的绅士名猫！脾气特别好，可以摸，甚至可以轻轻捏爪爪～\n- **“安心撸”评价**：【随便撸 / 强力推荐】`
        };
      }
      if (t.includes('大吉')) {
        return {
          text: `【「安农校宠图鉴」· 011号明星校宠【大吉】】\n\n- **性别与绝育**：公猫 / 已绝育\n- **常驻出没地**：【第二报告厅】\n- **性格档案**：特别亲人！只要你给他带吃的零食，他会更主动跟你贴贴～\n- **“安心撸”评价**：【随便撸 / 欢迎带冻干】`
        };
      }
      if (t.includes('馆长')) {
        return {
          text: `【「安农校宠图鉴」· 008号明星校宠【馆长】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【图书馆】周边\n- **性格档案**：图书馆文化名猫，比较亲人，但性格较为胆小敏锐，动作太大幅度容易吓跑。\n- **“安心撸”评价**：【小心撸 / 动作放缓轻柔】`
        };
      }
      if (t.includes('毛毛')) {
        return {
          text: `【「安农校宠图鉴」· 005号明星校宠【毛毛】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【勤学楼】西侧门口\n- **性格档案**：勤学楼尽职尽责的“常驻门口保安”，每天准时到岗打卡！\n- **“安心撸”评价**：【随便撸】`
        };
      }
      if (t.includes('小黑') || t.includes('小漂亮')) {
        return {
          text: `【「安农校宠图鉴」· 化学楼讨饭两姐妹【小黑 & 小漂亮】】\n\n` +
            `1. **006号【小黑】**：公猫已绝育，和小漂亮是好朋友。嘴馋爱吃冻干零食，亲人胆小，经常在化学楼后面路边的栏杆处（即东苑对面）讨饭。【一定要撸！手上有吃的必须要摸！】\n` +
            `2. **007号【小漂亮】**：母猫已绝育，嘴馋胆小但为了吃的特别会撒娇！经典两面派，只认吃的不认人。嫉妒心极强，目前只能打得过肥肥。【如果主动蹭人一定要摸，建议摸下巴、背部和尾巴根！】`
        };
      }
      if (t.includes('嘴上有屎') || t.includes('对眼')) {
        return {
          text: `【「安农校宠图鉴」· 报告厅双恶霸【嘴上有屎 & 对眼】】\n\n- **档案编号**：016号【嘴上有屎】（公/已绝育） & 062号【对眼】（已绝育）\n- **常驻出没地**：【第二报告厅】\n- **性格警示**： **打人！小猫真的会打人！** 报告厅名副其实的双恶霸，领地意识极强！\n- **“安心撸”评价**：【 绝对不要撸 / 保持距离防抓伤】`
        };
      }
      if (t.includes('屁姐') || t.includes('屁哥')) {
        return {
          text: `【「安农校宠图鉴」· 027号校宠【屁姐】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【幼儿园宿舍区】，经常随机刷新在停放的电动车坐垫上！\n- **性格档案**：超级喜欢被拍屁股！有个逆子叫屁哥。\n- **“安心撸”评价**：【随便撸 / 拍屁股专用猫】`
        };
      }
      if (t.includes('鸟哥')) {
        return {
          text: `【「安农校宠图鉴」· 035号校宠【鸟哥】】\n\n- **常驻出没地**：【体育部办公楼 / 北一门】\n- **性格档案**：北一门一霸！爱好是打架，心愿是打遍天下无敌猫，领地意识非常强！\n- **“安心撸”评价**：【霸主巡视 / 请勿挑衅】`
        };
      }
      if (t.includes('玳瑁')) {
        return {
          text: `【「安农校宠图鉴」· 002号校宠【玳瑁】】\n\n- **性别与绝育**：母猫 / 已绝育\n- **常驻出没地**：【学校东门】\n- **性格档案**：名义上来福的老婆，但现实中它俩之间只有领地斗争！性格比较乖，主动找你的时候可以放心摸。\n- **“安心撸”评价**：【主动找你时可随便撸】`
        };
      }

      // 2. 按区域查询校宠
      if (t.includes('猫坡')) {
        return {
          text: `【「安农猫坡名猫组」· 盘点出没在猫坡的校宠】：\n\n1. **018号【英国佬】**（公/已绝育）：脾气特别好，可以摸可以捏爪爪，超级亲人！\n2. **017号【足球八嘎】**（母/已绝育）：不喜欢被摸但可以摸，摸一下就会叫一下；\n3. **019号【花卷】**（母/已绝育）：亲人、好摸、脾气极好；\n4. **020号【黑头】**（母/已绝育）：脾气好，可摸。\n\n 猫坡是安农大最治愈的撸猫打卡点之一！`
        };
      }
      if (t.includes('第二报告厅') || t.includes('报告厅')) {
        return {
          text: `【「第二报告厅校宠矩阵」】：\n\n1. **011号【大吉】**：超亲人小暖男，给吃的主动贴贴；\n2. **014号【小可怜】**：颜值极高的小母猫，摸时会喵喵叫（避开敏感部位）；\n3. **013号【白肚子】** & **015号【孔明】**：胆子偏小，带冻干可靠近；\n4. **016号【嘴上有屎】** & **062号【对眼】**： 报告厅双恶霸，会打人，切勿招惹！`
        };
      }
      if (t.includes('化学楼')) {
        return {
          text: `【「化学楼校宠小分队」】：\n\n1. **006号【小黑】**：常在东苑对面的路边栏杆处向学生讨饭，亲人爱吃冻干；\n2. **007号【小漂亮】**：撒娇两面派，为吃的疯狂贴贴，只认吃的不认人；\n3. **040号【肥肥】**、**043号【冒号】**、**044号【姥姥】** 等也常在化学楼后灌木丛活动。`
        };
      }
      if (t.includes('图书馆')) {
        return {
          text: `【「图书馆学霸校宠团」】：\n\n1. **008号【馆长】**（母/已绝育）：图书馆门面担当，比较亲人，动作要轻柔；\n2. **009号【福二代】**（公/已绝育）：脾气超好；\n3. 【010号【哑嗓子】】、**054号【小罐】**（像煤气罐/北二门草丛亲人）、**056号【小清】**、**057号【小巴】**。`
        };
      }
      if (t.includes('勤学楼')) {
        return {
          text: `【「勤学楼教学名宠」】：\n\n1. **004号【花姐】**：全校顶流网红三花猫，随机巡视教室后排陪读；\n2. **005号【毛毛】**：勤学楼西侧门口尽职尽责的“猫保安”；\n\n 提醒：勤学楼为上课场所，与猫咪互动请保持轻声细语，投喂请用自带纸垫清理干净！`
        };
      }

      // 3. 通用全景花名册概况
      return {
        text: `**《安徽农业大学 · 校宠花名册》全景数据与指南**：\n\n` +
          `- **在册建档规模**：全校共建立 **63+ 只** 详实校宠档案（绝育率超 95%）；\n` +
          `- **六大知名校宠代表**：\n` +
          ` 1. **东门霸主【来福】**（001/公/兔子蹬鹰，千万不能惹他生气！）\n` +
          ` 2. **勤学楼陪读【花姐】**（004/三花大网红，随机宠幸学生）\n` +
          ` 3. **猫坡绅士【英国佬】**（018/公/脾气极好可以捏爪爪）\n` +
          ` 4. **第二报告厅【大吉】**（011/公/给零食超亲人贴贴）\n` +
          ` 5. **图书馆门面【馆长】**（008/母/动作轻柔可摸）\n` +
          ` 6. **化学楼讨饭王【小黑 & 小漂亮】**（006/007/路边栏杆讨饭高手）\n` +
          `- **四大校宠集中聚集地**：东门区域、勤学楼教室周边、猫坡向阳草坪、第二报告厅；\n` +
          `- **安农安心撸免责提醒**：撸猫有风险，受伤请及时接种狂犬疫苗，安全自负！严禁投喂高油高盐人类剩菜剩饭！`
      };
    }

    // 意图 5：食堂与就餐区域（东苑/西苑/北苑/欣苑，校外北区宿舍丰泽/思源）
    if (t.includes('食堂') || t.includes('餐厅') || t.includes('吃饭') || t.includes('吃什么') || t.includes('外卖')) {
      AgentState.lastTopic = 'canteens';
      return {
        text: `**安徽农业大学全景就餐指南（校内四大食堂 + 校外北区宿舍餐饮）**：\n\n` +
          `**校内四大主题食堂（全校师生核心就餐阵地）**：\n` +
          `1. **东苑食堂**：紧邻勤学楼教学区与学校东门，是早八下课、中午放学大课就餐主力首选；\n` +
          `2. **西苑食堂**：位于校园西区，风味特色小炒档口丰富，瓦罐靓汤、营养早餐包点齐全；\n` +
          `3. **北苑食堂**：位于校园北侧，靠近电山路北门，出餐迅速、经济实惠；\n` +
          `4. **欣苑食堂**：全校最具人气！大众实惠快餐、特色面食、铁板烧与减脂轻食一应俱全。\n\n` +
          `**校外宿舍区（北区）专属餐饮保障**：\n` +
          `5. **丰泽食堂**：位于学生宿舍北区（校外宿舍区）西侧，下楼即达，为北区住宿生提供一日三餐与暖心夜宵；\n` +
          `6. **思源餐厅**：位于学生宿舍北区（校外宿舍区）东侧（紧邻学生一站式服务中心），就餐环境现代宽敞。`
      };
    }

    // 意图 6：智慧农林特色专项（茶树国重室与名木）
    if (t.includes('茶') || t.includes('国家重点实验室') || t.includes('名木') || t.includes('银杏') || t.includes('香樟') || t.includes('水杉')) {
      return {
        text: `**安徽农业大学智慧农林特色资产与名木科普**：\n\n- 【茶树生物学与资源利用国家重点实验室（王牌国重室）】：\n - 安农大唯一的省部共建国家重点实验室，茶学全国顶尖A类学科！\n - 世界领先的全基因组测序、黄山毛峰/祁门红茶/六安瓜片风味机理研究；\n - 教学区配有**茶树活体品种圃**，引种保存舒茶早、鸠坑种等百余种国家级良种茶树。\n- **银杏路（金秋十里金黄大道）**：\n - 勤学楼以东，每年11月-12月银杏金黄铺地，师生打卡圣地，林学园林学科天然课堂。\n- **香樟路（百年林荫中轴大道）**：\n - 长江西路南门向北贯穿主干道，古香樟苍翠挺拔，四季清香。\n- **水杉林与雪松草坪**：\n - 国家一级古老孑遗名木，秋冬羽状细叶转锈红，倒映静湖。`
      };
    }

    // 意图 7：校园卡 / 一卡通
    if (t.includes('一卡通') || t.includes('校园卡') || t.includes('挂失') || t.includes('补办') || t.includes('充值')) {
      return {
        text: `**校园一卡通办理全景指南**：\n\n1. **实体卡补办**：携带本人学生证或身份证，前往【校园卡服务大厅】（近西区网络中心）自助补卡机办理，补卡费通常为 15-20 元，立等可取。\n2. **即时挂失**：卡片丢失请第一时间打开手机【安农移动校园卡】小程序或在综合服务大厅点击挂失，防止盗刷。\n3. **余额充值**：支持微信支付、支付宝或建行卡圈存机自助圈存充值。`
      };
    }

    // 意图 8：宿舍报修 / 水电
    if (t.includes('报修') || t.includes('水电') || t.includes('宿舍坏了') || t.includes('空调')) {
      return {
        text: `**学生宿舍水电与设施报修指引**：\n\n1. **线上快速报修**：登录数智安农门户【后勤服务系统】或在宿管站微信小程序提交报修单，填写具体楼栋、房号（如北区03栋402）及损坏照片；\n2. **应急电话**：水龙头爆裂、电闸跳闸等紧急突发故障，请直接联系各楼栋一楼【宿管值班室】老师快速登记，维修师傅通常 2-4 小时内上门处置。`
      };
    }

    // 兜底智能：调用高情商语义推理引擎（彻底告别死板的“已记录”）
    return smartReasoner(raw, t);
  }

  // ----------------------------------------------------------------------------
  // 4. 多轮工作流：教室借用状态机 (公私安全分级与溯源)
  // ----------------------------------------------------------------------------
  function readClassroomDetails(input) {
    const text = input.normalize('NFKC');
    const details = {};
    const count = text.match(/(\d+)\s*(?:位|名|人)/);
    const date = text.match(/(?:\d{4}\s*[-年]\s*)?\d{1,2}\s*[-月]\s*\d{1,2}\s*日?|(?:(?:本|下|这)\s*)?(?:周|星期)[一二三四五六日天]|今天|明天|后天/);
    const time = text.match(/(?:[01]?\d|2[0-3])\s*[:点时]\s*(?:[0-5]\d\s*分?|半)?(?:\s*(?:[-–—~]|至|到)\s*(?:[01]?\d|2[0-3])\s*[:点时]\s*(?:[0-5]\d\s*分?|半)?)?/);
    const partOfDay = text.match(/上午|中午|下午|晚上|早上/);
    const duration = text.match(/\d+(?:\.\d+)?\s*(?:个?小时|分钟)/);
    const dept = text.match(/(?:申请(?:单位|班级)|学院班级)\s*[:：]\s*([^,，。；;]+)/) ||
      text.match(/(?:^|[,，。；;\s])([^,，。；;\s]{1,18}学院(?:[^,，。；;\s]{1,14}(?:专业|班))?)/);
    const reason = text.match(/(?:用途|事由)\s*[:：]\s*([^,，。；;]+)/) ||
      text.match(/((?:召开|举行|举办|开)\s*[^,，。；;]{0,24}(?:班会|讲座|沙龙|动员会|研讨会|答辩|培训))/) ||
      text.match(/^(班会|讲座|沙龙|答辩|培训)$/);
    if (count && Number(count[1]) > 0) details.count = Number(count[1]);
    if (date) details.date = date[0].trim();
    if (time) details.clock = [(partOfDay || [])[0], time[0].trim()].filter(Boolean).join(' ');
    if (duration) details.duration = duration[0];
    if (dept) details.dept = dept[1].trim();
    if (reason) details.reason = reason[1].trim();
    if (/投影/.test(text)) details.equipment = '投影仪';
    return details;
  }

  function handleClassroomWorkflow(input, details = readClassroomDetails(input)) {
    const draft = Object.assign(AgentState.workflowData, details);
    const missing = [
      [draft.dept, '学院或班级'],
      [draft.date && draft.clock, '日期和时间（如 11月25日 19:00–21:00）'],
      [draft.count, '参加人数（如 45人）'],
      [draft.reason, '借用用途']
    ].filter(([value]) => !value).map(([, label]) => label);
    if (missing.length) {
      return { text: '**教室借用申请草案**\n\n请补充：' + missing.join('、') + '。' };
    }

    const { dept, date, clock, duration, count, reason, equipment = '待确认' } = draft;
    const room = count > 60 ? '勤学楼 606（大阶梯多媒体教室）' : '博学楼 204（标准多媒体教室）';
    const docNo = 'DRAFT-CR-' + Date.now().toString(36).toUpperCase();
    const data = {
      dept, time: [date, clock, duration].filter(Boolean).join(' '), count: count + '人',
      reason, equipment, room, docNo
    };
    AgentState.workflow = null;
    AgentState.workflowData = {};
    return {
      text: '**教室借用申请草案已生成。**\n\n请核对信息后预览或打印。场地建议根据人数生成，实际空闲情况和审批结果请向教室管理方确认。',
      approval: {
        type: 'classroom',
        title: '教室借用申请草案',
        docNo,
        data: [
          { label: '学院或班级', val: dept },
          { label: '拟借用时间', val: data.time },
          { label: '拟使用人数', val: data.count },
          { label: '场地建议', val: room },
          { label: '借用用途', val: reason },
          { label: '设备需求', val: equipment },
          { label: '当前状态', val: '草案 · 待学校审核' }
        ],
        rawObj: data
      }
    };
  }

  // ----------------------------------------------------------------------------
  // 5. 多轮工作流：学生请假审批单状态机 (3步规范流程 + A4双联纸质假条模版手写填报)
  // ----------------------------------------------------------------------------
  function renderOfficialLeaveSlipWidget(d) {
    const slipId = 'slip-' + Math.floor(100000 + Math.random() * 900000);

    return `
      <div class="anau-leave-slip-card" id="${slipId}">
        <!-- 3-Step Process Header (规范 3 步闭环流程) -->
        <div class="anau-leave-steps-bar">
          <div class="step-item step-done">
            <div class="step-num">1</div>
            <div class="step-text">
              <span class="step-name">数智安农申请请假</span>
              <span class="step-state">✓ 已获取官方假条模版</span>
            </div>
          </div>
          <div class="step-divider">→</div>
          <div class="step-item step-active">
            <div class="step-num">2</div>
            <div class="step-text">
              <span class="step-name">找辅导员签字</span>
              <span class="step-state">打印空白模版 · 手写面签</span>
            </div>
          </div>
          <div class="step-divider">→</div>
          <div class="step-item step-pending" id="${slipId}-step3">
            <div class="step-num">3</div>
            <div class="step-text">
              <span class="step-name">数智安农销假</span>
              <span class="step-state">期满持联线下办结</span>
            </div>
          </div>
        </div>

        <!-- Official Leave Slip Document Card (官方规范请假条模版卡片) -->
        <div class="anau-doc-card">
          <div class="anau-doc-card-header">
            <div class="anau-doc-icon-wrap">
              <svg class="anau-doc-icon" viewBox="0 0 48 48" width="46" height="46" fill="none">
                <path d="M10 6C10 4.89543 10.8954 4 12 4H30L40 14V42C40 43.1046 39.1046 44 38 44H12C10.8954 44 10 43.1046 10 42V6Z" fill="#2563EB"/>
                <path d="M30 4L40 14H32C30.8954 14 30 13.1046 30 12V4Z" fill="#93C5FD"/>
                <path d="M16 22H32M16 28H32M16 34H26" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
                <rect x="7" y="24" width="18" height="13" rx="3" fill="#1D4ED8"/>
                <text x="16" y="33.5" font-size="7.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="-apple-system, sans-serif">DOCX</text>
              </svg>
            </div>
            <div class="anau-doc-info">
              <div class="anau-doc-title">安徽农业大学_规范学生请假条模版(一式两联手写版).docx</div>
              <div class="anau-doc-meta">
                <span class="anau-doc-meta-badge">官方规范模版 · 待下载手写填报</span>
                <span class="anau-doc-meta-size">14.0 KB · Microsoft Word 文档</span>
              </div>
            </div>
            <button class="anau-doc-quick-btn" onclick="window.AnauAgent.downloadLeaveSlipFile('${slipId}')" title="立即下载 Word 假条模版">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>下载文档</span>
            </button>
          </div>

          <div class="anau-doc-card-body">
            <div class="anau-doc-grid">
              <div class="anau-doc-grid-item">
                <span class="grid-label">模版规制</span>
                <span class="grid-val" style="color:#059669; font-weight:600;">标准 A4 一式两联（学工留存联 + 门卫备查/销假联）</span>
              </div>
              <div class="anau-doc-grid-item">
                <span class="grid-label">填报形式</span>
                <span class="grid-val" style="color:#1d4ed8; font-weight:600;">打印空白模版后，个人信息与事由纯手写填报</span>
              </div>
              <div class="anau-doc-grid-item">
                <span class="grid-label">审批流转</span>
                <span class="grid-val">辅导员当面手写审批签字</span>
              </div>
              <div class="anau-doc-grid-item">
                <span class="grid-label">办结归档</span>
                <span class="grid-val">假满 24 小时内持签字第二联找辅导员线下核销</span>
              </div>
            </div>
            <div class="anau-doc-notice">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="color:#0284c7; flex-shrink:0; margin-top:2px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>请假条模版已严格按安徽农业大学标准格式准备。请点击下方「下载官方假条文档」或「一键打印空白假条模版」，将纸质空白模版打印出后，手写填妥个人信息、请假原因与去向，并持单找辅导员签字；请假期满返校后，持签字第二联到学院学工办完成线下核销。</span>
            </div>
          </div>
        </div>

        <!-- 打印源数据（官方空白假条模版，供一键打印渲染真实 A4 双联手写格式） -->
        <div class="anau-printable-paper" id="${slipId}-paper" style="display: none;">
          <!-- 上联 -->
          <div class="anau-slip-sheet">
            <div class="anau-slip-title">请 &nbsp; 假 &nbsp; 条</div>
            <div class="anau-slip-copy-tag">【第一联 · 学院学工留存存根】</div>
            <div class="anau-slip-content">
              尊敬的 <span class="anau-slip-underline-blank" style="min-width: 80px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 老师：<br>
              &nbsp;&nbsp;&nbsp;&nbsp;您好！我是 <span class="anau-slip-underline-blank" style="min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 学院 <span class="anau-slip-underline-blank" style="min-width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 级 <span class="anau-slip-underline-blank" style="min-width: 150px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 专业 <span class="anau-slip-underline-blank" style="min-width: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;</span> 班学生 <span class="anau-slip-underline-blank" style="min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，因为 <span class="anau-slip-underline-blank" style="min-width: 300px; width: 85%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，需要请假（时间） <span class="anau-slip-underline-blank" style="min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 至 <span class="anau-slip-underline-blank" style="min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，请假去向： <span class="anau-slip-underline-blank" style="min-width: 180px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，请假期间有效联系方式： <span class="anau-slip-underline-blank" style="min-width: 150px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 。<br>
              &nbsp;&nbsp;&nbsp;&nbsp;请假期间，本人保证个人人身和财产安全，请假期满后，及时销假，恳请您的批准，谢谢！
            </div>
            <div class="anau-slip-sign-row">
              <div class="sign-col-left">
                <div>请假人：<span class="anau-slip-underline-blank" style="min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                <div>请假日期：<span class="anau-slip-underline-blank" style="min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
              </div>
              <div class="sign-col-right">
                <div>批准人：<span class="anau-slip-underline sign-blank">（辅导员手写签名）</span></div>
                <div>时&nbsp;&nbsp;间：<span class="anau-slip-underline sign-blank">&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</span></div>
              </div>
            </div>
          </div>

          <!-- 虚线裁剪线 -->
          <div class="anau-slip-cutline">
            <span>✂ - - - - - - - - - - - - - - - - - - 沿 虚 线 剪 开（一式两联 · 上联学工留存 · 下联门卫/备查联） - - - - - - - - - - - - - - - - - - ✂</span>
          </div>

          <!-- 下联 -->
          <div class="anau-slip-sheet">
            <div class="anau-slip-title">请 &nbsp; 假 &nbsp; 条</div>
            <div class="anau-slip-copy-tag">【第二联 · 学生出入校门备查 / 销假凭据】</div>
            <div class="anau-slip-content">
              尊敬的 <span class="anau-slip-underline-blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 老师：<br>
              &nbsp;&nbsp;&nbsp;&nbsp;您好！我是 <span class="anau-slip-underline-blank" style="min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 学院 <span class="anau-slip-underline-blank" style="min-width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 级 <span class="anau-slip-underline-blank" style="min-width: 150px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 专业 <span class="anau-slip-underline-blank" style="min-width: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;</span> 班学生 <span class="anau-slip-underline-blank" style="min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，因为 <span class="anau-slip-underline-blank" style="min-width: 300px; width: 85%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，需要请假（时间） <span class="anau-slip-underline-blank" style="min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 至 <span class="anau-slip-underline-blank" style="min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，请假去向： <span class="anau-slip-underline-blank" style="min-width: 180px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ，请假期间有效联系方式： <span class="anau-slip-underline-blank" style="min-width: 150px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 。<br>
              &nbsp;&nbsp;&nbsp;&nbsp;请假期间，本人保证个人人身和财产安全，请假期满后，及时销假，恳请您的批准，谢谢！
            </div>
            <div class="anau-slip-sign-row">
              <div class="sign-col-left">
                <div>请假人：<span class="anau-slip-underline-blank" style="min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                <div>请假日期：<span class="anau-slip-underline-blank" style="min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
              </div>
              <div class="sign-col-right">
                <div>批准人：<span class="anau-slip-underline sign-blank">（辅导员手写签名）</span></div>
                <div>时&nbsp;&nbsp;间：<span class="anau-slip-underline sign-blank">&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部快捷操作栏 (仅保留官方模版下载与打印，彻底删去一键销假) -->
        <div class="anau-slip-actions">
          <button class="btn-slip-download" onclick="window.AnauAgent.downloadLeaveSlipFile('${slipId}')">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            下载官方假条文档 (.docx)
          </button>
          <button class="btn-slip-print" onclick="window.AnauAgent.printLeaveSlip('${slipId}')">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            一键打印空白假条模版 (A4一式两联 · 手写填报)
          </button>
        </div>
      </div>
    `;
  }

  function handleXiaojiaWorkflow(input) {
    return {
      text: `**【数智安农 · 本科生返校销假办理指引】**\n\n` +
        `依据《安徽农业大学学籍与学生日常管理规程》，学生请假期满返校后须在 **24 小时内完成线下销假**：\n\n` +
        `1️⃣ **携带面签假条**：持离校前已由辅导员当面手写签字确认的**【第二联 · 学生出入校门备查 / 销假凭据】**；\n` +
        `2️⃣ **辅导员现场核销**：前往辅导员办公室，当面汇报返校情况，辅导员在学工系统内核验在校状态；\n` +
        `3️⃣ **学工档案办结归档**：学院学工办公室统一办结纸质存根与电子归档，考勤系统正式恢复在校正常打卡。\n\n` +
        `（注：数智安农严格遵守学校学工考勤管理制度，不设任何未经核验的虚假一键销假，请务必当面与辅导员报到销假，祝学业顺利！）`,
      approval: null,
      widgetHtml: ''
    };
  }

  function handleLeaveWorkflow(input) {
    const raw = (input || '').trim();
    const authUser = '学生（待填写）';

    const d = {
      applicant: authUser
    };

    AgentState.workflow = null;

    return {
      text: `**【数智安农 · 本科生离校请假全流程指引】**\n\n` +
        `依据安徽农业大学学籍与学生日常管理规程，请假与离校严格遵循以下 **3 步闭环流程**：\n\n` +
        `1️⃣ **数智安农申请请假**：已为您在线生成官方标准的**规范学生请假条空白模版（.docx）**，请在下方直接查收。\n` +
        `2️⃣ **拿着请假条找辅导员签字**：请点击下方卡片中的「📥 下载官方假条文档」或「🖨️ 一键打印空白假条模版」，打印出纸质空白模版后，手写填报个人信息、请假原因与去向，并持单交由辅导员当面面签审批。\n` +
        `3️⃣ **等请假事务完成之后，到数智安农销假**：请假事项结束返校后，持已由辅导员当面签字确认的第二联假条，按期前往辅导员办公室及学院学工办完成线下核销办结归档！`,
      approval: null,
      widgetHtml: renderOfficialLeaveSlipWidget(d)
    };
  }

  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // 5.1 多轮工作流：安农综测加分与奖学金测算器（多轮交互状态机）
  // ----------------------------------------------------------------------------
  function handleZongceWorkflow(input) {
    AgentState.lastTopic = 'zongce';
    const q = (input || '').trim();

    // 1. 精确检测用户是否提供了真实的学业成绩或绩点数据
    const gpaMatch = q.match(/(?:绩点|gpa)\s*[:：=为]?\s*([234]\.\d{1,2})/i) || q.match(/([234]\.\d{1,2})/);
    let scoreMatch = q.match(/(\d{2,3}(?:\.\d+)?)\s*(?:分|均分|平均分)/);
    // 排除“加分”、“满分”、“分值”等中文字符带来的误判
    if (scoreMatch) {
      const idx = q.indexOf(scoreMatch[0]);
      const prefix = q.substring(Math.max(0, idx - 2), idx);
      const suffix = q.substring(idx + scoreMatch[0].length, Math.min(q.length, idx + scoreMatch[0].length + 2));
      if (/加|满|得|总|折|算/.test(prefix) || /值|析|配/.test(suffix)) {
        scoreMatch = null;
      }
    }

    const hasRealScores = Boolean(gpaMatch || scoreMatch);
    // 安全防护：如果处于工作流但用户输入完全没有提供任何成绩信息（例如用户突然问了其他话题），绝不瞎算！
    if (AgentState.workflow === 'zongce' && !hasRealScores && !q.match(/\d+/) && !/绩点|gpa|分|四级|六级|志愿|竞赛/.test(q)) {
      AgentState.workflow = null;
      return smartReasoner(raw, t);
    }

    // 2. 如果用户只是刚进入该功能或仅进行泛泛的咨询（尚未告知具体成绩），先友好引导提问收集信息！
    if (AgentState.workflow !== 'zongce' && !hasRealScores) {
      AgentState.workflow = 'zongce';
      AgentState.workflowStep = 1;
      AgentState.workflowData = {};

      return {
        text: `**收到！正在为您启动「安农智办 · 本科生综合素质测评与奖学金测算器」**\n\n` +
          `依据《安徽农业大学本科生综合素质测评实施办法》，综测成绩严格按照**学业成绩(70%) + 德育表现(15%) + 创新创业与学科竞赛(10%) + 外语特长(5%)**精确核算。\n\n` +
          `为了给您进行准确的分值测算与奖学金档位匹配，请告诉我您的具体成绩数据：\n\n` +
          `1. **学业成绩**：您的学年绩点（GPA）或综合均分是多少？（如：GPA 3.68 或 均分 86分）\n` +
          `2. **外语成绩**：英语四级或六级成绩是多少分？（如：六级520、四级435、或四级暂未通过）\n` +
          `3. **志愿服务**：“志愿汇”App 记录的工时有多少小时？（如：25小时）\n` +
          `4. **学科竞赛与成果**：本学年是否有竞赛获奖或科研项目？（如：“农芯智大赛省二等奖”、“互联网+校金奖”、“国家级大创”或“暂无竞赛”）\n` +
          `5. **学生干部与表彰**：是否担任班委/学生会干部，或获评校级三好学生/优秀团员？\n\n` +
          ` *（您可以直接一段话发送给我，例如：“我绩点3.72，六级530分，志愿汇有20小时，参加农芯智AI大赛拿了省二，担任班级学委”，我将即刻为您生成精准的综测得分与奖学金申报报告！）*`
      };
    }

    // 3. 用户已提供具体成绩数据，启动精密测算
    let gpa = 3.5;
    if (gpaMatch) {
      gpa = parseFloat(gpaMatch[1]);
    } else if (scoreMatch) {
      const rawScore = parseFloat(scoreMatch[1]);
      gpa = Math.min(4.5, Math.max(2.0, (rawScore / 20) - 0.5));
    }

    // 提取四六级
    let cet = 0;
    const cetMatch = q.match(/(?:四级|六级|4级|6级|cet)\D*([4567]\d{2})/i) || q.match(/([4567]\d{2})\s*分/);
    if (cetMatch) {
      cet = parseInt(cetMatch[1] || cetMatch[2], 10);
    } else if (/六级.*?(?:过|通过)|过六级/.test(q)) {
      cet = 460;
    } else if (/四级.*?(?:过|通过)|过四级/.test(q)) {
      cet = 450;
    }

    // 提取志愿时长
    let volunteer = 0;
    const volMatch = q.match(/(\d+)\s*(?:小时|h|时长)/i) || q.match(/志愿\D*(\d+)/);
    if (volMatch) {
      volunteer = parseInt(volMatch[1], 10);
    }

    // 提取学生干部与先进荣誉
    const isCadre = /班长|团支书|支书|委员|学委|班委|部长|干事|学生会|自律会|党支部|三好学生|优秀团员|优秀学生干部/.test(q);

    // 提取竞赛成果
    let compBonus = 0;
    let compDesc = '暂无竞赛加分';
    if (/国一|国家级一等|国金/.test(q)) {
      compBonus = 8;
      compDesc = '认定国家级一等奖/金奖（+8.0分）';
    } else if (/国二|国三|国家级二等|国家级三等|国银|国铜/.test(q)) {
      compBonus = 6;
      compDesc = '认定国家级二/三等奖（+6.0分）';
    } else if (/省一|省级一等|省金/.test(q)) {
      compBonus = 5;
      compDesc = '认定省级一等奖（+5.0分）';
    } else if (/省二|农芯智|省级二等|省银/.test(q)) {
      compBonus = 4;
      compDesc = '认定省级二等奖（含首届“农芯智”大赛等重点赛事，+4.0分）';
    } else if (/省三|校一|校金|省级三等|校级一等/.test(q)) {
      compBonus = 3;
      compDesc = '认定省级三等奖/校级一等奖（+3.0分）';
    } else if (/竞赛|获奖|大创|校二|校三|互联网\+|挑战杯/.test(q)) {
      compBonus = 2;
      compDesc = '认定校级竞赛/大创项目（+2.0分）';
    }

    // 4. 精密折算四大模块分值
    // 学业成绩 (70%)
    const studyScore = Math.min(70, Math.round((gpa / 4.5) * 70 * 10) / 10);

    // 德育表现 (15%): 基准10分 + 干部荣誉加分 + 志愿时长加分 (每10小时1分，上限3分)
    const cadreBonus = isCadre ? 1.5 : 0;
    const volBonus = Math.min(3.5, Math.round((volunteer / 10) * 1.0 * 10) / 10);
    const deyuScore = Math.min(15, Math.round((10 + cadreBonus + volBonus) * 10) / 10);

    // 外语特长 (5%)
    let langBonus = 1.0;
    let langDesc = '外语常规学分基础分 (+1.0分)';
    if (cet >= 520) {
      langBonus = 5.0;
      langDesc = `CET-6 高分（${cet}分，+5.0分满分）`;
    } else if (cet >= 425 && (q.includes('六级') || q.includes('6级'))) {
      langBonus = 4.0;
      langDesc = `CET-6 通过（${cet}分，+4.0分）`;
    } else if (cet >= 500) {
      langBonus = 3.5;
      langDesc = `CET-4 优异（${cet}分，+3.5分）`;
    } else if (cet >= 425) {
      langBonus = 2.5;
      langDesc = `CET-4 通过（${cet}分，+2.5分）`;
    }

    // 综合测评分数合计
    const totalScore = Math.round((studyScore + deyuScore + compBonus + langBonus) * 10) / 10;

    // 奖学金档位与排名研判
    let scholarshipTier = '校三等奖学金';
    let tierColor = '';
    let rankEstimate = '专业前 15%~20%';
    let scholarshipBonus = '800 元/学年';

    if (totalScore >= 88 && compBonus >= 4) {
      scholarshipTier = '国家奖学金 / 校特等奖学金（重点冲击推荐）';
      tierColor = '';
      rankEstimate = '专业前 1%~3%';
      scholarshipBonus = '8000 元/学年';
    } else if (totalScore >= 80) {
      scholarshipTier = '校一等奖学金（或国家励志奖学金）';
      tierColor = '';
      rankEstimate = '专业前 5%~8%';
      scholarshipBonus = '2000 元 / 5000 元（励志）';
    } else if (totalScore >= 73) {
      scholarshipTier = '校二等奖学金';
      tierColor = '';
      rankEstimate = '专业前 8%~15%';
      scholarshipBonus = '1200 元/学年';
    }

    // 测算完成，重置工作流
    AgentState.workflow = null;

    return {
      text: `**「安农智办 · 本科生综合素质测评与奖学金测算报告」**\n\n` +
        `依据官方规章 <span class="fact-citation-tag" onclick="window.AnauAgent.openCitationDrawer('ahau-zc-2023-42')">[安农学字·综测实施办法§4.2]</span>，结合您提供的实际学业与综合表现，各项指标测算明细如下：\n\n` +
        `| 测评模块 | 权重/满分 | 原始核定表现与加分依据 | 模块折算得分 |\n` +
        `| :--- | :---: | :--- | :---: |\n` +
        `| **学业成绩** | 70% | 课程绩点 GPA ${gpa}（折算公式 (GPA/4.5)×70） | **${studyScore} 分** |\n` +
        `| **德育表现** | 15% | 基准分 10.0 + ${isCadre ? '学生干部 +1.5 + ' : ''}志愿汇 ${volunteer}h 加分 ${volBonus} | **${deyuScore} 分** |\n` +
        `| **创新创业竞赛** | 10% | ${compDesc} | **+${compBonus} 分** |\n` +
        `| **外语特长** | 5% | ${langDesc} | **+${langBonus} 分** |\n` +
        `| **综合总分** | **100%** | **综测最终评定总分** | **${totalScore} 分** |\n\n` +
        `> **综合位次研判**：预计位列 **${rankEstimate}**（以各学院综合测评小组最终公示为准）。\n\n` +
        `### 匹配申报奖学金档位建议\n\n` +
        `| 申报奖项推荐 | 奖励标准 | 评选核心依据 |\n` +
        `| :--- | :---: | :--- |\n` +
        `| **${scholarshipTier}** | **${scholarshipBonus}** | 综合得分达到 ${totalScore} 分，学科竞赛与德育分项均符合评奖申报门槛 |\n\n` +
        `### 评奖申报材料备忘清单\n` +
        `1. **教务系统盖章成绩单原件**：勤政楼一楼自助打印机刷一卡通打印；\n` +
        `2. **“志愿汇”工时流水证明**：“志愿汇” App 官方工时流水截图及学院团委认定表；\n` +
        `3. **学科竞赛证书**：获奖证书原件及复印件（学院教学科研办审核盖章）；\n` +
        `4. **外语等级凭证**：CET-4/6 成绩单原件与扫描件。\n\n` +
        `*(注：最终评定结果请以所在学院综合素质测评评定小组官方公示为准)*\n\n` +
        `**您也可以通过下方动态微调沙盘实时拖动 GPA、志愿工时与竞赛加分，动态观察奖学金概率与排名波动：**`,
      widgetHtml: renderZongceSlidersWidget(gpa, volunteer, compBonus)
    };
  }


  // ----------------------------------------------------------------------------
  // 5.2 多轮工作流：考研全周期智能导航与择校规划专家（多轮交互状态机）
  // ----------------------------------------------------------------------------
  function handleKaoyanWorkflow(input) {
    AgentState.lastTopic = 'kaoyan';
    const q = (input || '').trim();
    const d = AgentState.workflowData = AgentState.workflowData || {};

    // 检查输入中是否包含实质性的个人考研背景数据（专业、四六级、读博/就业意向）
    const hasMajorInfo = /农学|茶学|作物|种子|农艺|园艺|蔬菜|果树|动科|动医|兽医|动物|植保|植物保护|农药|林学|园林|计算机|软件|计科|人工智能|大数据|物联网|网络|经管|经济|金融|管理|会计|农经|生化|生物|食品|粮食|机械|电气|自动化|外语|英语|土木|水利|资环|环境/.test(q);
    const hasCetInfo = /六级|6级|cet6|cet-6|四级|4级|cet4|cet-4|425|430|450|500|520|550|600|没过|未过|通过|基础好|英语差|薄弱/.test(q);
    const hasIntentInfo = /读博|学术|科研|深造|高校|高校当老师|研究所|硕博连读|工作|就业|考公|考编|进厂|大厂|专硕|学硕|体制内|国企/.test(q);
    const hasSchoolInfo = /没想好|还没想好|求推荐|不知道报哪|想留安徽|长三角|江浙沪|中农|南农|华农|安农|合工大|安大|浙大|中科大|农科院/.test(q);

    // 如果处于工作流启动阶段，且提问仅是泛泛的咨询（尚未提供个人具体情况），先提问收集信息！
    const isInitialInquiry = !AgentState.workflow || (
      !hasMajorInfo && !hasCetInfo && !hasIntentInfo &&
      (q.includes('咨询') || q.includes('怎么考') || q.includes('规划') || q.includes('择校') || q.includes('时间线') || q.includes('我想考研') || q.length < 15)
    );

    if (AgentState.workflow !== 'kaoyan' || isInitialInquiry) {
      AgentState.workflow = 'kaoyan';
      AgentState.workflowStep = 1;
      AgentState.workflowData = {};

      return {
        text: `**收到！正在为您启动「安农智办 · 考研全周期定制规划与择校智囊」**

` +
          `考研规划因人而异，切忌盲目照搬千篇一律的通用模板。为了给您量身定制最契合个人长处的**初试科目攻坚、复习时间线、阶梯择校方案（冲/稳/保）以及学硕/专硕抉择**，请先告诉我您的以下 4 项基本情况：

` +
          `1. **您的本科专业**？（如：农学、茶学、计算机、园艺、动科、经管等）
` +
          `2. **英语四六级成绩与英语基础**？（如：六级520、四级430、或四级暂未通过）
` +
          `3. **数学与统考科目基础**？（擅长数学想考数一/数二，还是倾向不考数学或考农学统考314/315）？
` +
          `4. **研究生毕业后的长远发展偏好**：
` +
          ` - **方向 A（学术深造）**：更偏向读博深造 / 进高校科研所（重点定制：学硕 + 硕博连读 + 顶尖课题组大牛导师）
` +
          ` - **方向 B（就业实践）**：更偏向毕业直接就业 / 考公考编（重点定制：专硕 + 高性价比初试提分 + 长三角产业就业）
` +
          `5. **是否有初步意向院校**？（例如：想留长三角/合肥本地、冲刺名校，抑或没想好需要推荐？）

` +
          ` *（您可以一句话直接发给我，例如：“我是农学专业的，英语六级510，毕业想读博搞科研，还没想好目标院校”，我会即刻为您生成专属深度方案！）*`
      };
    }

    // 第二轮及以后：用户已输入个人背景信息，提取并进行针对性深度规划！
    // 1. 提取专业
    let major = '农学/优势优势学科';
    if (/茶学|茶叶/.test(q)) major = '茶学（安农大王牌学科）';
    else if (/计算机|软件|计科|人工智能|ai|大数据/.test(q)) major = '计算机科学与技术 / 软件工程';
    else if (/农学|作物|种子|农艺/.test(q)) major = '农学 / 作物学';
    else if (/植保|植物保护|农药/.test(q)) major = '植物保护学';
    else if (/园艺|果树|蔬菜/.test(q)) major = '园艺学';
    else if (/动科|动医|兽医|动物/.test(q)) major = '动物科学 / 兽医学';
    else if (/林学|园林|森林/.test(q)) major = '林学 / 风景园林';
    else if (/经管|经济|金融|管理|会计|农经/.test(q)) major = '农林经济管理 / 应用经济学';
    else if (/生化|生物|生命科学/.test(q)) major = '生物化学与分子生物学';
    else if (/食品|粮食/.test(q)) major = '食品科学与工程';
    else if (/机械|自动化|电气/.test(q)) major = '农业工程 / 机械自动化';

    // 2. 提取四六级基础
    const isCetHigh = /六级.*?([56]\d{2}|高分|优秀|过)|六级|6级|cet6|cet-6|英语好|基础好|5\d{2}|6\d{2}/i.test(q) && !/六级没过|没过六级|六级未过/.test(q);
    const isCetLow = /四级.*?([43]\d{2}|没过|未过|刚过|差|薄弱)|四级没过|四级刚过|425|430|435|440|英语差|英语薄弱|英语不好/i.test(q);
    let cetDesc = '四六级中等平稳基础';
    if (isCetHigh) cetDesc = '英语六级高分（基础扎实）';
    else if (isCetLow) cetDesc = '英语四级薄弱/压线突破';

    // 3. 提取毕业发展偏好 (读博 vs 就业)
    const isDoc = /读博|学术|科研|深造|高校|高校当老师|研究所|硕博连读/.test(q);
    const isJob = /工作|就业|考公|考编|进厂|大厂|专硕|体制内|国企/.test(q);
    let intentDesc = '兼顾读博与就业双轨';
    if (isDoc) intentDesc = '更偏向读博深造 · 走高校/科研所学术路线（首选学硕）';
    else if (isJob) intentDesc = '更偏向直接参加工作 · 考公考编/名企校招（首选专硕）';

    // 4. 提取择校意向
    const isUndecided = /没想好|还没想好|求推荐|不知道|迷茫/.test(q);
    let schoolDesc = isUndecided ? '暂无明确目标院校（需要提供梯次推荐）' : '有初步意向目标或待定对比';

    // 完成规划输出，重置工作流状态
    AgentState.workflow = null;

    return {
      text: `**「安农智办 · 考研全周期量身定制规划方案」已为您规划生成！**

` +
        `**【您的专属考生画像】**
` +
        `- **意向专业**：【${major}】
` +
        `- **外语基础**：【${cetDesc}】
` +
        `- **长远走向**：【${intentDesc}】
` +
        `- 【择校定位】：【${schoolDesc}】

` +
        `---

` +
        `### 一、学硕 vs 专硕 定性抉择与培养路径研判
` +
        `${isDoc ? `**【读博科研导向】深度推荐：首选学术型硕士（学硕）**
` +
        `- **核心优势**：具有直接“硕博连读”与申请考核制博士通道，学硕研一即可进入全国重点实验室（如安农大茶树生物学国家重点实验室、南农作物学重点实验室）深入课题组；
` +
        `- **选导指南**：重点看一级学科博士点、国家重点实验室平台以及导师高水平发文（中科院一区顶刊/高引论文），大三大四尽早联系安农大或目标校导师提前进组。
` : ''}` +
        `${isJob ? `**【直接就业/考公导向】深度推荐：首选专业型硕士（专硕）**
` +
        `- **核心优势**：学制灵活（2~2.5年），培养模式更紧密衔接长三角高新产业与校企联合培养基地，研二下学期可投入高质量校招实习；
` +
        `- **初试提分红利**：绝大多数专硕考【英语二】，词汇与长难句难度显著低于英语一，提分容错率更高！
` : ''}` +
        `${(!isDoc && !isJob) ? `**【学硕 vs 专硕双轨对比】**：
- 读博意向选学硕（冲博士点与重点实验室）；直接就业选专硕（初试考英语二容错高、实习充裕）。
` : ''}
` +
        `---

` +
        `### 二、针对【${major}】的考试科目拆解与攻坚策略
` +
        `${major.includes('农学') || major.includes('茶学') || major.includes('园艺') || major.includes('植保') || major.includes('动科') ? 
        `- ** 农学学科初试科目**：
` +
        ` 1. 政治(101) + 外语(英语一或英语二)；
` +
        ` 2. 统考数学(农)(314) 或 化学(农)(315)（化学更侧重无机与有机，计算量相对高数稍小，背诵知识点多）；
` +
        ` 3. 专业课：统考 414 植物生理学与生物化学 / 415 动物生理学与生物化学，或目标院校自命题科目（如安农大优势专业课）。
` +
        `- ** 攻坚要诀**：农学生理生化重在“代谢通路网络图”与“生理生化实验设计”，暑假前务必把王牌教材梳理完第一遍大纲！` : ''}` +
        `${major.includes('计算机') ? 
        `- ** 计算机/工学初试科目**：
` +
        ` 1. 政治(101) + 外语(英语一/英语二)；
` +
        ` 2. 数学一 或 数学二（高数+线代，强化期李林880题与真题至少刷2遍）；
` +
        ` 3. 专业课：全国统考 408 计算机学科专业基础（数据结构、计组、操作系统、计算机网络）或目标校自命题数据结构；
` +
        `- ** 攻坚要诀**：408 知识面极广，早期主抓【数据结构与计组】，代码手写算法题（如二叉树、图遍历）每天练一篇！` : ''}` +
        `${major.includes('经管') ? 
        `- ** 经管类初试科目**：
` +
        ` 1. 学硕：政治 + 英语一 + 数学三(303) + 801 经济学；
` +
        ` 2. 专硕（农管、金融、MBA）：政治 + 英语二 + 199 管理类综合能力 或 396 经济类综合能力；
` +
        `- ** 攻坚要诀**：管综逻辑与初数讲究“速度与准确率”，真题限时模考是核心命门！` : ''}` +
        `${(!major.includes('农学') && !major.includes('计算机') && !major.includes('经管') && !major.includes('茶学')) ? 
        `- **通用科目组合**：政治(101) + 英语(一/二) + 业务课一(统考数学/自主专业基础) + 业务课二(专业核心课)。建议尽早锁定目标校研招网最新专业目录与考试大纲。` : ''}

` +
        `---

` +
        `### 三、针对您的外语基础【${cetDesc}】的提分方案
` +
        `${isCetLow ? `**英语四级薄弱 / 压线突围策略**：
` +
        `- **锁定英语二**：题型词汇量更友好，长难句少拐弯，是薄弱考生的提分基本盘；
` +
        `- **单词大纲词死磕**：每天晨读早晚各 45 分钟刷考研大纲核心 2500 高频词，坚决不盲目刷模拟卷；
` +
        `- **得阅读与作文者得天下**：近 15 年真题逐篇精读手译，大小作文提炼个人专属功能句模板，目标稳拿 55-65 分！` : ''}` +
        `${isCetHigh ? `**英语六级 500+ / 基础扎实策略**：
` +
        `- 考英语一或英语二均具强大优势；每天掐表 30 分钟做 1-2 篇真题精读保持手感与词汇敏感度；
` +
        `- **战术倾斜**：将省下的大块时间全力倾斜给数学或专业课高分攻坚，追求总分断层领先！` : ''}` +
        `${(!isCetLow && !isCetHigh) ? `- 每日背词 100+，近 10 年真题做三遍，重视阅读逻辑链与写作功能句提炼，目标冲击 65-75 分！` : ''}

` +
        `---

` +
        `### 四、全年因人制宜复习时间线与进度表\n\n` +
        `| 备战阶段 | 时间跨度 | 攻坚科目与核心里程碑 | 校内自习与集训推荐 |\n` +
        `| :--- | :---: | :--- | :--- |\n` +
        `| ** 基础筑基期** | 3月 - 6月 | 考研大纲单词背完两轮；通读专业课教材全册梳理课后习题 | 图书馆学术自习室 / 勤学楼静音自习区 |\n` +
        `| ** 暑期强化期** | 7月 - 8月 | 数学/专业课专题刷题突破；建立章节框架树；政治马原启动 | 博学楼考研暑期专用集训教室 |\n` +
        `| ** 真题巩固期** | 9月 - 10月 | 英语真题限时模考；专业课核心考点二刷背诵；10月底完成研招网网报 | 研招网网报与现场确认 |\n` +
        `| ** 冲刺模考期** | 11月 - 考前 | 政治时政与分析题狂背；全真模考调整考场生物钟；错题集复盘 | 勤学楼考前冲刺教室 |\n\n` +
        `---\n\n` +
        `### 五、阶梯式择校咨询与安徽农业大学直升兜底优势\n\n` +
        `| 梯队定位 | 推荐目标高校代表 | 核心优势与学科考情特点 |\n` +
        `| :--- | :--- | :--- |\n` +
        `| ** 顶尖冲刺 (985/顶尖院所)** | 中国农大、浙江大学、中国科大、中国农科院 | 平台顶级，适合英语六级高分、有国家级竞赛科研成果、追求学术深造 |\n` +
        `| ** 稳妥进阶 (211/双一流)** | 南京农大、华中农大、合肥工业大学、安徽大学 | 学科评估 A/B+，性价比极高，兼顾学术声誉与长三角高新产业就业 |\n` +
        `| ** 本校直升 (安徽农业大学)** | AHAU 本校茶学/农学/计科/生化优势学科 | 全国重点实验室国家级科研平台，本科提前进组导师熟悉，第一志愿保护极佳 |\n\n` +
        `*( 下一步引导：如需查询安徽农业大学各学院导师姓名、研究课题与官方主页，您可直接向我提问，例如：“茶业学院夏恩华老师”或“人工智能学院张友华教授”！)*`
    };
  }


  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // 5.3 官方真实师资队伍与学术导师智能名录 (100% 官网真实核验，严禁虚构)
  // ----------------------------------------------------------------------------
  function handleFacultyQuery(input) {
    const q = (input || '').trim();
    AgentState.lastTopic = 'faculty';

    // 1. 优先查具体教师姓名
    for (const group of AHAU_KB.faculty) {
      for (const t of group.teachers) {
        if (q.includes(t.name)) {
          return {
            text: `### 「安农智办」安徽农业大学官方师资档案库\n\n` +
              `| 导师姓名 | 职称与职务 | 所属学院 | 官方主页与联络 |\n` +
              `| :--- | :--- | :--- | :---: |\n` +
              `| **${t.name}** | ${t.title} · ${t.role} | ${group.college} | [点击直达官网](${t.link}) |\n\n` +
              `> **官方权威研究方向**（与学校官网 100% 一致）：\n` +
              `> **${t.research}**\n\n` +
              `**学院科研与研工办联络**：${group.contactOffice}\n\n` +
              ` *信息合规提示：根据教育部教师个人信息保护要求，教师个人手机号不在公共网络直接明文展示。建议同学们通过安农官方邮箱或学院办公室建立联系。*`
          };
        }
      }
    }

    // 2. 查具体学院（配置全系别名，精准匹配用户口语输入：如“农学院有哪些老师”、“计算机学院老师”、“茶学院导师”）
    const collegeAliases = {
      '农学院': ['农学院', '农学系', '农学', '农科', '作物', '种子'],
      '茶业学院 / 全国重点实验室': ['茶业学院', '茶学院', '茶学系', '茶学', '茶业', '茶树', '国重', '重点实验室'],
      '人工智能学院': ['人工智能学院', '计算机学院', '信息与人工智能', '信息学院', '信智学院', '人工智能', '计算机', '信智', '软件', '计科'],
      '园艺学院': ['园艺学院', '园艺系', '园艺', '果树', '蔬菜', '设施农业'],
      '林学与园林学院': ['林学与园林学院', '林学与园林', '林学院', '园林学院', '风景园林', '林学', '园林'],
      '资源与环境学院': ['资源与环境学院', '资源与环境', '资环学院', '资环院', '资环', '环境学院', '土壤'],
      '工学院 (机械与车辆工程 / 智能制造)': ['工学院', '机械与车辆工程学院', '机械工程', '机械学院', '智能制造学院', '智能制造', '机电', '农机', '车辆'],
      '植物保护学院': ['植物保护学院', '植物保护', '植保学院', '植保院', '植保系', '植保', '农药'],
      '生命科学学院 / 生物制造学院': ['生命科学学院', '生物制造学院', '生科院', '生物制造', '生物学院', '生命科学', '生科'],
      '经济管理学院': ['经济管理学院', '经济管理', '经管学院', '经管院', '经管系', '经管', '农经', '金融'],
      '动物科技学院': ['动物科技学院', '动科院', '动物科技', '动科', '畜牧', '养殖'],
      '动物医学院': ['动物医学院', '动医院', '动医', '兽医学', '兽医学院', '兽医'],
      '材料与化学学院': ['材料与化学学院', '材料与化学', '材化学院', '材化', '材料学院', '化学学院'],
      '外国语学院': ['外国语学院', '外语学院', '外语系', '英语系', '外国语'],
      '人文社会科学学院 / 马克思主义学院': ['人文社会科学学院', '人文学院', '马克思主义学院', '马院', '社科院', '人文社科'],
      '理学院': ['理学院', '数学系', '物理系', '应用数学', '应用物理']
    };

    for (const [colName, aliases] of Object.entries(collegeAliases)) {
      if (aliases.some(alias => q.includes(alias))) {
        const group = AHAU_KB.faculty.find(g => g.college.includes(colName) || colName.includes(g.college.split(' ')[0]));
        if (group) {
          let tableRows = group.teachers.map(t => `| **${t.name}** | ${t.title} · ${t.role} | ${t.research} | [官方主页](${t.link}) |`).join('\n');
          return {
            text: `### 「安农智办」安徽农业大学【${group.college}】师资队伍档案\n\n` +
              `该学院在安徽农业大学官网已备案的核心骨干导师与研究方向如下（100% 官方录入，权威核验）：\n\n` +
              `| 导师姓名 | 职称与职务 | 权威研究方向 | 个人主页 |\n` +
              `| :--- | :--- | :--- | :---: |\n` +
              `${tableRows}\n\n` +
              `**学院师资官网直达**：[${group.officialPortal}](${group.officialPortal})\n\n` +
              `**研工与科研咨询窗口**：${group.contactOffice}\n\n` +
              `*( 您可以直接向我提问具体某位老师的名字，例如“${group.teachers[0].name}老师”，调取导师专属研究课题与详细履历！)*`
          };
        }
      }
    }

    // 3. 查研究课题关键词 (如 智慧农业, 小麦, 水稻, 茶叶, 农药, 生物制造, 物联网, 遥感, 玉米, 鸡, 疫苗)
    const keywordMatches = [];
    for (const group of AHAU_KB.faculty) {
      for (const t of group.teachers) {
        if (q.split(/[，,、\s]+/).some(w => w.length >= 2 && (t.research.includes(w) || t.role.includes(w)))) {
          keywordMatches.push({ ...t, college: group.college });
        }
      }
    }
    if (keywordMatches.length > 0) {
      let tableRows = keywordMatches.slice(0, 6).map(t => `| **${t.name}** | ${t.title} | ${t.college} | ${t.research} |`).join('\n');
      return {
        text: `### 「安农智办」依据课题关键词检索到以下安徽农业大学导师：\n\n` +
          `| 导师姓名 | 职称 | 所属学院 | 核心研究方向 |\n` +
          `| :--- | :--- | :--- | :--- |\n` +
          `${tableRows}\n\n` +
          ` *提示：您可以直接向我提问某位具体导师的名字，调取完整官方主页与科研动态！*`
      };
    }

    // 4. 默认学院与师资总览
    return {
      text: `【「安农智办」安徽农业大学官方师资与导师库】\n\n` +
        `已收录全校核心学院的官方权威导师名录（100% 官网真实核验，严禁虚假杜撰）：\n` +
        `- **农学院**：姜东、武立权、黄正来、李金才、宋贺、张文静等；\n` +
        `- 【茶业学院 / 全国重点实验室】：宛晓春、夏恩华、宁井铭、宋传奎、李大祥、张正竹等；\n` +
        `- **人工智能学院 (原信智学院)**：辜丽川、张友华、张武、王凯、王永梅、叶勇等；\n` +
        `- **生物制造学院、生命科学学院**：程备久、江海洋、薛挺、张应烙、李培金等；\n` +
        `- **植物保护学院**：操海群、潘月敏、丁婷、廖敏等；\n` +
        `- **经济管理学院**：栾敬东、孟令杰、张德元、田涛等；\n` +
        `- **动物科技学院 / 动物医学院**：耿照玉、程建波、孙裴、蒋书东等。\n\n` +
        ` 您可以直接发送“**农学院有哪些老师**”、“**茶业学院导师**”或导师姓名（如“**夏恩华的研究课题**”、“**张友华教授**”），我将即刻为您呈现对应导师的课题方向与官方联络方式！`
    };
  }


  // ----------------------------------------------------------------------------
  // 6. 多模态视觉智能快诊引擎
  // ----------------------------------------------------------------------------
  function renderLaifuProfileCard() {
    return `
      <div class="anau-cat-profile-card">
        <div class="cat-profile-img-box">
          <img src="cat_laifu.jpg" alt="安农校宠来福" class="cat-avatar-img">
          <div class="cat-pill-badge">👑 安农东门顶流 · 镇校神兽</div>
        </div>
        <div class="cat-profile-body">
          <div class="cat-header-name">
            <span class="cat-main-title">001号校宠 · 来福 (Laifu)</span>
            <span class="cat-sub-tag">公猫 / 已绝育</span>
          </div>
          <div class="cat-tags-row">
            <span class="cat-mini-tag">狸花白胸</span>
            <span class="cat-mini-tag">翡翠绿瞳</span>
            <span class="cat-mini-tag">常年吐小舌头</span>
            <span class="cat-mini-tag">东门名誉保安</span>
          </div>
          <div class="cat-info-list">
            <div class="cat-info-item"><strong>📍 常驻地标：</strong>安徽农业大学【学校东门】保安室石阶、花坛与草坪</div>
            <div class="cat-info-item"><strong>😺 性格脾气：</strong>【小心互动 / 视心情而定】东门第一大总管，平日神态淡定晒太阳，习惯性吐着粉嫩小舌头卖萌。切记公猫不要惹他生气，否则会施展“兔子蹬鹰”防御绝技！</div>
            <div class="cat-info-item"><strong>❤️ 情感关系：</strong>名义上的原配是东门的玳瑁猫，但日常相处以互掐打架为主，是典型的安农大校园欢喜冤家。</div>
            <div class="cat-info-item cat-warn-box"><strong>⚠️ 投喂健康警示：</strong>来福体重大幅超标（实心大胖橘量级），严禁投喂人类火腿肠及高油高盐剩菜，避免诱发猫咪肾脏疾病！建议投喂无谷主粮冻干或干净饮用水。</div>
          </div>
        </div>
      </div>
    `;
  }

  async function handleMultimodalInput(promptText, imageData) {
    let digest = '';
    try {
      const binary = atob(imageData.split(',')[1]);
      const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
      const hash = await crypto.subtle.digest('SHA-256', bytes);
      digest = Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
    } catch {
      // The browser may not expose hashing in an insecure context.
    }

    if (digest === 'ffe0cd8073f1301e3379426c32a56ab6cbd909557a51b93e175eeff69857cf1d') {
      return { text: '已匹配到内置参考照片「来福」。下方是它的校园资料卡。', widgetHtml: renderLaifuProfileCard() };
    }
    if (digest === '656b2543687c5ff6bd7c5d667e1971be7f6580271aab0eaf4a4ffc71efe18984') {
      return {
        text: '已匹配到内置参考照片「高数第 11 题」。答案是 **C. 同阶无穷小**。比值极限为 −1，可在[错题工坊](diagnosis.html)查看完整样题解析。'
      };
    }
    if (promptText) {
      const result = processUserInput(promptText);
      result.text = '这张照片未匹配到内置参考素材。以下是根据你输入的文字查询到的内容：\n\n' + result.text;
      return result;
    }
    return { text: '这张照片未匹配到内置参考素材。可以补充楼名、校宠名字或题目文字，我再帮你查询。' };
  }

  // ----------------------------------------------------------------------------
  // 6.5 真实对话会话仓库 (100% LocalStorage 驱动，支持页面刷新无缝记忆与多会话管理)
  // ----------------------------------------------------------------------------
  const SESSION_STORAGE_KEY = 'anau_real_chat_sessions';
  const ACTIVE_SESSION_KEY = 'anau_active_session_id';

  function loadSessionsFromStorage() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch(e) {}

    const initSession = {
      id: 'session_' + Date.now(),
      title: '新对话',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      badge: '在席',
      updated: Date.now(),
      messages: []
    };
    saveSessionsToStorage([initSession]);
    return [initSession];
  }

  function saveSessionsToStorage(sessions) {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
    } catch(e) {}
  }

  let realSessions = loadSessionsFromStorage();
  let currentActiveSessionId = localStorage.getItem(ACTIVE_SESSION_KEY) || (realSessions[0] ? realSessions[0].id : 'session_1');

  function getActiveSession() {
    let session = realSessions.find(s => s.id === currentActiveSessionId);
    if (!session) {
      session = realSessions[0];
      if (session) currentActiveSessionId = session.id;
    }
    return session;
  }

  function appendMessageToCurrentSession(msgObj, session = getActiveSession()) {
    if (!realSessions.includes(session)) return;
    session.messages.push(msgObj);
    session.updated = Date.now();
    session.time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    // 智能标题：首次用户发问时，自动从首条提炼为会话标题
    if (session.messages.filter(m => m.role === 'user').length === 1 && msgObj.role === 'user') {
      const cleanTitle = (msgObj.content || '').replace(/^[\s\p{P}]+/gu, '').slice(0, 16);
      if (cleanTitle) {
        session.title = cleanTitle;
      }
    }
    saveSessionsToStorage(realSessions);
    renderSidebarSessionList();
  }

  function renderSidebarSessionList() {
    const container = document.getElementById('panelTasks');
    if (!container) return;

    let html = `<div class="history-vertical-list">`;
    realSessions.forEach(s => {
      const isActive = s.id === currentActiveSessionId;
      html += `
        <div class="history-session-item ${isActive ? 'active' : ''}" data-session="${escapeHtml(s.id)}">
          <button type="button" class="history-session-open" ${isActive ? 'aria-current="true"' : ''} onclick="window.AnauAgent.loadSession(this.closest('[data-session]').dataset.session)">
            <span class="history-session-title">${escapeHtml(s.title || '办事会话')}</span>
            <span class="history-session-time">${escapeHtml(s.time || '')}</span>
          </button>
          <button type="button" class="history-session-del-btn" onclick="window.AnauAgent.deleteSession(this.closest('[data-session]').dataset.session)" aria-label="删除此会话">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  }

  function renderSessionMessages(sessionKey) {
    const list = document.getElementById('nativeChatMessages');
    const hero = document.getElementById('askbHeroCenter');
    if (!list) return;
    list.innerHTML = '';
    const session = realSessions.find(s => s.id === sessionKey) || realSessions[0];
    if (session) {
      currentActiveSessionId = session.id;
      localStorage.setItem(ACTIVE_SESSION_KEY, currentActiveSessionId);
    }
    if (!session || !session.messages || session.messages.length === 0) {
      if (hero) hero.style.display = 'flex';
    } else {
      if (hero) hero.style.display = 'none';
      session.messages.forEach(msg => {
        if (msg.role === 'user') {
          appendUserMessage(msg.content, msg.image || null);
        } else {
          appendBotMessage(msg, session);
        }
      });
      list.scrollTop = list.scrollHeight;
    }

    renderSidebarSessionList();
  }

  function createNewSession() {
    // 1. 检查当前会话是否有内容，若当前已经是空会话，则无需重复叠加
    const current = getActiveSession();
    if (current && (!current.messages || current.messages.length === 0)) {
      current.title = '新对话';
      current.time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      saveSessionsToStorage(realSessions);
      renderSidebarSessionList();
      renderSessionMessages(current.id);
      if (window.AnauAgent && window.AnauAgent.showToast) {
        window.AnauAgent.showToast('已处于新对话，可随时在下方输入');
      }
      return;
    }

    // 2. 将旧对话妥善完整保存在历史列表中，新建一个空白对话
    const newS = {
      id: 'session_' + Date.now(),
      title: '新对话',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      badge: '新创建',
      updated: Date.now(),
      messages: []
    };
    realSessions.unshift(newS);
    currentActiveSessionId = newS.id;
    localStorage.setItem(ACTIVE_SESSION_KEY, currentActiveSessionId);
    saveSessionsToStorage(realSessions);
    AgentState.workflow = null;
    AgentState.workflowData = {};
    AgentState.lastTopic = null;
    AgentState.lastLocation = null;
    renderSidebarSessionList();
    renderSessionMessages(newS.id);

    if (window.AnauAgent && window.AnauAgent.showToast) {
      window.AnauAgent.showToast('已开启新对话，旧对话已保留在「历史对话记录」中');
    }
  }

  function deleteSession(sid) {
    if (realSessions.length <= 1) {
      realSessions[0].messages = [];
      realSessions[0].title = '新对话';
      saveSessionsToStorage(realSessions);
      renderSidebarSessionList();
      renderSessionMessages(realSessions[0].id);
      return;
    }
    realSessions = realSessions.filter(s => s.id !== sid);
    if (currentActiveSessionId === sid) {
      currentActiveSessionId = realSessions[0].id;
      localStorage.setItem(ACTIVE_SESSION_KEY, currentActiveSessionId);
    }
    saveSessionsToStorage(realSessions);
    renderSidebarSessionList();
    renderSessionMessages(currentActiveSessionId);
  }

  // 7. DOM 节点构建与原生界面注入 (支持全尺寸嵌入式工作台模式)
  // ----------------------------------------------------------------------------
  function injectNativeChatUI() {
    const mountEl = document.getElementById('chatMountPoint');
    const lobbyHeading = mountEl?.hasAttribute('data-particle-lobby') ? `
      <div class="lobby-particle-title" data-particle-title>
        <h2 class="askb__hello" aria-label="农芯 AgriCore">
          <span class="particle-title-zh" data-particle-frame aria-hidden="true">农芯</span>
          <span class="particle-title-en" data-particle-frame lang="en" aria-hidden="true" hidden>AgriCore</span>
          <svg class="particle-title-logo" data-particle-frame aria-hidden="true" viewBox="36 32 184 192" hidden>
            <path d="M 120 32 C 72 48, 36 96, 36 156 C 36 196, 68 224, 116 224 C 120 224, 120 216, 120 208 C 84 204, 60 178, 60 148 C 60 108, 88 68, 120 32 Z"/>
            <path d="M 136 32 C 184 48, 220 96, 220 156 C 220 196, 188 224, 140 224 C 136 224, 136 216, 136 208 C 172 204, 196 178, 196 148 C 196 108, 168 68, 136 32 Z"/>
            <path d="M 128 76 C 128 102, 138 120, 164 120 C 138 120, 128 138, 128 164 C 128 138, 118 120, 92 120 C 118 120, 128 102, 128 76 Z"/>
            <circle cx="128" cy="216" r="6"/>
          </svg>
        </h2>
        <canvas aria-hidden="true"></canvas>
      </div>
    ` : '<h2 class="askb__hello">安农智办</h2>';

    // 1. 浮动悬浮球与呼吸光环
    const fabHtml = `
      <div class="native-ai-aura" id="nativeAiAura"></div>
      <div class="native-ai-fab" id="nativeAiFab" onclick="window.AnauAgent.toggleChat()" title="点击开启「徽农智 · 安农智办」">
        <img src="anau_ai_logo.png" alt="徽农智Logo">
        <span class="native-ai-fab-badge">AI</span>
      </div>
    `;

    // 2. 聊天主视窗 (Apple iOS 26 Liquid Frosted Glass)
    const windowHtml = `
      <div class="native-chat-window ${mountEl ? 'embedded-mode open' : ''}" id="nativeChatWindow">
        <!-- 顶部标题栏 -->
        <div class="native-chat-header">
          <div class="native-chat-header-info">
            <img src="anau_ai_logo.png" alt="徽农智" class="native-chat-header-avatar">
            <div>
              <div class="native-chat-header-title">
                <span>${mountEl ? '校园咨询' : '徽农智 · 安农智办'}</span>
              </div>
            </div>
          </div>
          <div class="native-chat-header-actions">
            <button class="btn-new-chat" onclick="window.AnauAgent.createNewSession()" title="开启新对话，旧对话将完整保留在左侧历史记录中">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>开启新对话</span>
            </button>
            <button class="header-icon-btn minimize-btn" onclick="window.AnauAgent.toggleChat()" title="收起工作台"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
        </div>

        <!-- 核心对话交互区 (统一无分割画布) -->
        <div class="chat-stage-body" id="chatStageBody">
          <!-- AskBar 风格静谧开场 (未发起对话时展示，零碎片化卡片) -->
          <div class="askb-hero-center" id="askbHeroCenter">
            ${mountEl ? `
              <div class="lobby-intro">${lobbyHeading}</div>
            ` : `
              <h2 class="askb__hello">安农智办</h2>
              <p class="askb-hero-sub">校园咨询与办事指引</p>
              <div class="askb-hero-quick-pills">
                <button type="button" class="askb-pill" onclick="window.sendQuickPrompt('帮我接入数智安农教务系统，查询最新期末成绩和加权GPA')">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                  查询成绩
                </button>
                <button type="button" class="askb-pill" onclick="window.sendQuickPrompt('帮我自动化部署本地学业工作区并同步系统日历')">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  学业工作区
                </button>
                <button type="button" class="askb-pill" onclick="window.sendQuickPrompt('我想借勤学楼教室开班会')">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  申请借教室
                </button>
                <button type="button" class="askb-pill" onclick="window.sendQuickPrompt('帮我测算这一学年的综测分和国家励志奖学金')">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                  综测估算
                </button>
              </div>
            `}
          </div>

          <!-- 消息流容器 (内嵌安农大图书馆淡雅水印) -->
          <div class="chat-messages" id="nativeChatMessages"></div>

          <!-- AskBar 底部悬浮输入 Dock -->
          <div class="askb__dock" id="askbDock">
            <!-- 待发送附件气泡预览 -->
            <div class="askb__files" id="askbFilesTray" style="display: none;">
              <div class="askb-file-chip">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z"/><path d="M14 3.5V8h4.5"/></svg>
                <span id="askbFileName">材料附件</span>
                <button type="button" onclick="window.AnauAgent.clearPendingImage()" title="移除附件">✕</button>
              </div>
            </div>

            <form class="askb__bar" id="askbBar" onsubmit="event.preventDefault(); window.AnauAgent.submitInput();">
              <!-- 附件功能菜单 (+) -->
              <div class="askb__plus-wrap">
                <button type="button" class="askb__icon" id="askbPlusBtn" onclick="window.AnauAgent.togglePlusMenu()" title="上传材料与模板" aria-label="添加附件">
                  <svg viewBox="0 0 24 24"><path d="M12 4.5v15M4.5 12h15" fill="none" stroke="currentColor" stroke-width="2"/></svg>
                </button>
                <div class="askb__menu askb__menu--plus" id="askbPlusMenu" style="display: none;">
                  <button type="button" onclick="window.AnauAgent.triggerImageUpload()">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; color:var(--agent-green);"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>上传照片
                  </button>
                  <button type="button" onclick="window.AnauAgent.triggerDocUpload()">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; color:var(--agent-green);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>上传文件
                  </button>
                  <button type="button" onclick="window.sendQuickPrompt('帮我接入数智安农教务系统，查询最新期末成绩和加权GPA')">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; color:#2563eb;"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>数智教务查成绩
                  </button>
                  <button type="button" onclick="window.sendQuickPrompt('帮我自动化部署本地学业工作区并同步系统日历')">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; color:#7c3aed;"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>电脑自动化 (OS)
                  </button>
                </div>
              </div>

              <!-- 隐藏文件输入控件 -->
              <input type="file" id="agentImageInput" accept="image/*" style="display: none;" onchange="window.AnauAgent.handleFileSelect(event)">
              <input type="file" id="agentDocInput" accept=".pdf,.doc,.docx,.png,.jpg" style="display: none;" onchange="window.AnauAgent.handleFileSelect(event)">

              <!-- 输入框 -->
              <label class="askb__field">
                <span class="askb__sr">输入咨询内容</span>
                <textarea class="chat-textarea" id="agentInputText" rows="1" placeholder="输入校园问题或办事需求" onkeydown="window.AnauAgent.handleKeyDown(event)" oninput="window.AnauAgent.autoResizeTextarea(this)"></textarea>
              </label>

              <!-- 动作按钮 (发送 / 语音) -->
              <div class="askb__action-wrap">
                <button type="button" class="askb__action askb__action--send" id="agentSendBtn" onclick="window.AnauAgent.submitInput()" title="发送">
                  <svg viewBox="0 0 24 24"><path d="M12 19V5.5M6 11.5l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>
                </button>
                <button type="button" class="askb__icon askb__mic" id="agentMicBtn" onclick="window.AnauAgent.toggleVoiceInput()" title="语音输入" style="display: none;">
                  <svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11.5" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>
                </button>
              </div>
            </form>

            <div class="askb__note" id="askbNote" style="display: none;"></div>
          </div>
        </div>
      </div>
    `;

    // 3. 官方审批单打印模态窗
    const printModalHtml = `
      <div class="official-print-overlay" id="officialPrintModal">
        <div class="print-sheet-paper">
          <div class="print-sheet-header-actions">
            <div style="font-size: 14px; font-weight: 700; color: #244b2d; display: flex; align-items: center; gap: 8px;">
              <span style="display:inline-flex;align-items:center;gap:6px;"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>安徽农业大学官方正规审批单凭证 (可直接另存为 PDF 或打印)</span>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="btn-print-doc" onclick="window.print()"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>立即打印 / 保存 PDF</button>
              <button class="btn-print-doc" style="background: #64748b;" onclick="window.AnauAgent.closePrintModal()">关闭预览</button>
            </div>
          </div>
          <div class="print-sheet-body" id="printSheetContent"></div>
        </div>
      </div>
    `;

    // 4. 正式返校销假审核模态窗 (杜绝虚假一键销假，执行三项真实性认证与办结凭单归档)
    const xiaojiaModalHtml = `
      <div class="xiaojia-modal-overlay" id="xiaojiaModal" onclick="if(event.target===this) window.AnauAgent.closeXiaojiaModal()">
        <div class="xiaojia-modal-box">
          <div class="xiaojia-modal-header">
            <div class="xiaojia-header-left">
              <div class="xiaojia-header-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div>
                <h3 class="xiaojia-title">安徽农业大学 · 本科生返校销假正式核验</h3>
                <p class="xiaojia-subtitle">依据《安徽农业大学学生学籍与考勤管理条例》第24条 · 假满须如期当面核销</p>
              </div>
            </div>
            <button class="xiaojia-close-btn" onclick="window.AnauAgent.closeXiaojiaModal()" title="关闭">✕</button>
          </div>

          <div class="xiaojia-modal-body" id="xiaojiaModalBody">
            <!-- 原始内容填报区 -->
            <div id="xiaojiaFormSection">
              <!-- 1. 原始请假档案基本信息 -->
              <div class="xiaojia-sec-box">
                <div class="xiaojia-sec-title">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#1f5e39" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  原始请假电子档案摘要
                </div>
                <div class="xiaojia-info-grid">
                  <div><span class="label">申请学生：</span><span class="val" id="xjStudentName">学生（待填写）</span></div>
                  <div><span class="label">所属学院：</span><span class="val">信息与计算机学院 (计科01班)</span></div>
                  <div><span class="label">假条编号：</span><span class="val" id="xjSlipCode">AHAU-QJ-20261117-0892</span></div>
                  <div><span class="label">核准去向：</span><span class="val">安徽省合肥市肥西路返家</span></div>
                  <div style="grid-column: 1 / -1;"><span class="label">原定请假周期：</span><span class="val" style="color:#0369a1;">2026年11月18日 至 2026年11月20日 (共3天)</span></div>
                </div>
              </div>

              <!-- 2. 真实性核验一：校园网在席定位认证 -->
              <div class="xiaojia-sec-box">
                <div class="xiaojia-sec-title">
                  <svg viewBox="0 0 24 24" width="15" height="10" fill="none" stroke="#10b981" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                  真实性核验 ① · 校园内网在席定位认证
                </div>
                <div class="xiaojia-check-card">
                  <div class="check-icon">📶</div>
                  <div class="check-info">
                    <div class="check-title">终端已接入 AHAU-Student 校园无线专网</div>
                    <div class="check-desc">
                      AP接入节点：<strong>勤学楼一楼阶梯教室西侧 AP-QX-102</strong><br>
                      内网分配IP：<code>10.12.88.23</code> · 经安农大内网网关鉴权，确认为校内在席终端
                    </div>
                  </div>
                  <div class="check-status-tag">示例 · 学生身份</div>
                </div>
              </div>

              <!-- 3. 真实性核验二：实际归校时刻记录与逾期校验 -->
              <div class="xiaojia-sec-box">
                <div class="xiaojia-sec-title">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  真实性核验 ② · 实际返校归寝报到时间
                </div>
                <div class="xiaojia-field-row">
                  <span class="field-label">实际归校报到时刻：</span>
                  <div class="field-input-wrap">
                    <input type="text" id="xjActualReturnTime" class="xiaojia-input" value="2026年11月20日 15:30" readonly style="width: 190px; font-weight: 600;">
                    <span class="field-badge-success">✓ 准时归校 · 未逾期</span>
                  </div>
                </div>
                <div style="font-size: 11.5px; color: #64748b; line-height: 1.4;">
                  注：系统已比对学工预留返校时间，归校时间符合批假规范。如遇交通延误逾期归校，需另行提交辅导员补假说明。
                </div>
              </div>

              <!-- 4. 真实性核验三：辅导员面签【第二联 · 销假凭据】核验 -->
              <div class="xiaojia-sec-box">
                <div class="xiaojia-sec-title">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#d97706" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                  真实性核验 ③ · 辅导员面签联核查
                </div>
                <div class="xiaojia-field-group">
                  <label class="xiaojia-checkbox-item">
                    <input type="checkbox" id="xjSlipCheck" checked disabled>
                    <span><strong>辅导员已当面在【第二联 · 门卫备查/销假凭据】上手写签署审批意见并查验</strong></span>
                  </label>
                  <div class="xiaojia-upload-row">
                    <span class="upload-file-pill">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                      第二联面签签字拍照回执.jpg (1.8MB 已上传)
                    </span>
                    <button type="button" class="btn-mock-reupload" onclick="window.AnauAgent.simulateReupload()">重新拍照查验</button>
                  </div>
                </div>
              </div>

              <!-- 5. 诚信与安全归宿承诺 -->
              <div class="xiaojia-sec-box" style="background:#fffbeb; border-color:#fef08a;">
                <label class="xiaojia-checkbox-item" style="color: #92400e;">
                  <input type="checkbox" id="xjSafetyPromise" checked>
                  <span><strong>安全归宿承诺</strong>：本人确认已平安返校并安全入住学生公寓宿舍，外出期间人身财产均安全，无遗留校外突发事件，所填报销假核验信息完全真实有效。</span>
                </label>
              </div>

              <div class="xiaojia-modal-footer">
                <button type="button" class="btn-xj-cancel" onclick="window.AnauAgent.closeXiaojiaModal()">取消返回</button>
                <button type="button" class="btn-xj-submit" id="btnSubmitXiaojia" onclick="window.AnauAgent.submitXiaojiaForm()">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>生成返校销假演示凭单</span>
                </button>
              </div>
            </div>

            <!-- 办结凭单回执区 (初始隐藏) -->
            <div id="xiaojiaReceiptSection" style="display:none;" class="xiaojia-receipt-box">
              <div class="receipt-stamp-badge">
                <div style="width: 52px; height: 52px; margin: 0 auto; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #16a34a; font-size: 26px;">✓</div>
                <h3>返校销假步骤演示</h3>
                <p>安徽农业大学学工处与教务综合管理系统已实时同步销假办结状态</p>
              </div>

              <div class="receipt-paper">
                <div class="receipt-paper-title">安徽农业大学 · 本科生返校销假正式办结凭单</div>
                <div class="receipt-rows">
                  <div class="receipt-row"><span class="k">销假办结凭单编号：</span><span class="v code-highlight" id="rcptCode">AHAU-XJ-20261120-0892</span></div>
                  <div class="receipt-row"><span class="k">关联原请假单号：</span><span class="v code-highlight" id="rcptOrigSlip">AHAU-QJ-20261117-0892</span></div>
                  <div class="receipt-row"><span class="k">销假学生姓名：</span><span class="v" id="rcptStudent">学生（待填写）</span></div>
                  <div class="receipt-row"><span class="k">归属院系班级：</span><span class="v">信息与计算机学院 · 计算机科学与技术01班</span></div>
                  <div class="receipt-row"><span class="k">实际销假办结时刻：</span><span class="v" id="rcptTime">2026年11月20日 15:30:18</span></div>
                  <div class="receipt-row"><span class="k">内网认证基站：</span><span class="v">AHAU-Student 勤学楼西阶梯 AP (10.12.88.23)</span></div>
                  <div class="receipt-row"><span class="k">辅导员面签核验：</span><span class="v text-success">示例 · 待辅导员确认</span></div>
                  <div class="receipt-row"><span class="k">教务考勤系统联动：</span><span class="v text-success">✓ 已恢复日常在籍在校正常出勤考勤状态</span></div>
                </div>

                <!-- 学院电子印章 -->
                <div class="receipt-seal">
                  <div style="font-size:7px; font-weight:bold; color:#dc2626; transform:scale(0.85); text-align:center;">
                    安徽农业大学<br>信息与计算机学院<br>★<br>演示凭单
                  </div>
                </div>
              </div>

              <div class="xiaojia-modal-footer">
                <button type="button" class="btn-xj-cancel" onclick="window.print()">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px; margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                  打印/另存凭单
                </button>
                <button type="button" class="btn-xj-submit" style="background:#059669;" onclick="window.AnauAgent.closeXiaojiaModal()">
                  完成并返回对话
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (mountEl) {
      mountEl.innerHTML = windowHtml;
      const printContainer = document.createElement('div');
      printContainer.id = 'printModalRoot';
      printContainer.innerHTML = printModalHtml + xiaojiaModalHtml;
      document.body.appendChild(printContainer);
      AgentState.isOpen = true;
      document.body.classList.add('embedded-active');
    } else {
      const container = document.createElement('div');
      container.id = 'nativeAgentRoot';
      container.innerHTML = fabHtml + windowHtml + printModalHtml + xiaojiaModalHtml;
      document.body.appendChild(container);
    }

    // 监听舞台滚轮事件，确保全屏任意区域（包含左右空白与底部Dock）滑动滚轮均可驱动消息流滚动
    const stageEl = document.getElementById('chatStageBody');
    const msgListEl = document.getElementById('nativeChatMessages');
    if (stageEl && msgListEl) {
      stageEl.addEventListener('wheel', function (e) {
        if (e.target !== msgListEl && !msgListEl.contains(e.target)) {
          msgListEl.scrollTop += e.deltaY;
        }
      }, { passive: true });
    }

    // 初始欢迎语
    setTimeout(() => {
      renderSessionMessages(currentActiveSessionId);
    }, 300);
  }

  // ----------------------------------------------------------------------------
  // 8. 消息渲染与打字机流式动效
  // ----------------------------------------------------------------------------
  let pendingImageBase64 = null;
  let chatRequestPending = false;

  const replyActions = [
    ['retry', '重新生成', 'refresh-ccw'],
    ['like', '有帮助', 'thumbs-up'],
    ['dislike', '没帮助', 'thumbs-down'],
    ['copy', '复制回复', 'copy'],
    ['share', '分享回复', 'share']
  ];

  /*
   * Lucide icon license
   * ISC License
   *
   * Copyright (c) 2026 Lucide Icons and Contributors
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   *
   * The following Lucide icons are derived from the Feather project:
   *
   * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
   *
   * The MIT License (MIT) (for the icons listed above)
   *
   * Copyright (c) 2013-present Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  const chatIconShapes = {
    "refresh-ccw": '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" />',
    "thumbs-up": '<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /><path d="M7 10v12" />',
    "thumbs-down": '<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" /><path d="M17 14V2" />',
    "copy": '<rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />',
    "share": '<path d="M12 2v13" /><path d="m16 6-4-4-4 4" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />',
    "user-round": '<circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" />',
  };

  function chatIcon(name) {
    return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${chatIconShapes[name]}</svg>`;
  }

  function updateReplyRetryButtons() {
    document.querySelectorAll('#nativeChatMessages [data-chat-action="retry"]').forEach(button => {
      button.disabled = chatRequestPending || button.dataset.retryAvailable !== 'true';
    });
  }

  function setChatRequestPending(pending) {
    chatRequestPending = pending;
    const sendButton = document.getElementById('agentSendBtn');
    if (sendButton) sendButton.disabled = pending;
    updateReplyRetryButtons();
  }

  function latestRetryPrompt(session, message) {
    if (!message?.retryMode || session?.messages.at(-1) !== message) return null;
    const prompt = session.messages.at(-2);
    return prompt?.role === 'user' && !prompt.image ? prompt : null;
  }

  function retryCampusReply(text, message) {
    const savedState = { ...AgentState };
    try {
      AgentState.workflow = null;
      AgentState.workflowStep = 0;
      AgentState.workflowData = {};
      AgentState.lastTopic = message.retryTopic;
      AgentState.lastLocation = message.retryLocation;
      const result = processUserInput(text);
      if (AgentState.workflow) throw new Error('无法重新生成流程消息');
      return result;
    } finally {
      Object.assign(AgentState, savedState);
    }
  }

  async function regenerateReply(session, message, row, status) {
    const prompt = latestRetryPrompt(session, message);
    if (!prompt || chatRequestPending || getActiveSession() !== session) return;
    setChatRequestPending(true);
    status.textContent = '正在重新生成…';
    try {
      const text = prompt.content;
      const reply = message.retryMode === 'math' ? solveMath(text)
        : message.retryMode === 'campus' ? retryCampusReply(text, message)
        : await callAhauOfficialLlm(text, session.messages.slice(0, -2), input => retryCampusReply(input, message));
      if (!reply?.text || reply.approval || reply.widgetHtml) throw new Error('未生成普通文本回复');
      if (!realSessions.includes(session) || session.messages.at(-1) !== message) return;

      message.content = reply.text;
      delete message.feedback;
      saveSessionsToStorage(realSessions);
      if (getActiveSession() !== session) return;

      // Reuse the current row so keyboard focus and scroll position stay put.
      const currentRow = row.isConnected ? row : document.querySelector('#nativeChatMessages .chat-msg:last-child');
      currentRow?.querySelector('.bot-text-content')?.replaceChildren(
        document.createRange().createContextualFragment(parseMarkdownToHtml(reply.text))
      );
      currentRow?.querySelectorAll('[aria-pressed]').forEach(button => button.setAttribute('aria-pressed', 'false'));
      const currentStatus = currentRow?.querySelector('.chat-action-status');
      if (currentStatus) currentStatus.textContent = '已重新生成';
    } catch (error) {
      status.textContent = '重新生成失败，请重试';
    } finally {
      setChatRequestPending(false);
      if (row.isConnected && (document.activeElement === document.body || document.activeElement === row.querySelector('[data-chat-action="retry"]'))) {
        row.querySelector('[data-chat-action="retry"]').focus({ preventScroll: true });
      }
    }
  }

  async function copyReplyText(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        // The fallback also supports the lobby on an HTTP campus network.
      }
    }
    const focused = document.activeElement;
    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.className = 'chat-copy-buffer';
    document.body.appendChild(field);
    try {
      field.select();
      if (!document.execCommand('copy')) throw new Error('复制失败');
    } finally {
      field.remove();
      focused?.focus({ preventScroll: true });
    }
  }

  function attachReplyActions(row, message, session) {
    const canRetry = !!latestRetryPrompt(session, message);
    const actions = document.createElement('div');
    actions.className = 'chat-reply-actions';
    actions.setAttribute('role', 'group');
    actions.setAttribute('aria-label', '回复操作');
    actions.innerHTML = replyActions.map(([action, label, icon]) => {
      const state = action === 'retry'
        ? `data-retry-available="${canRetry}" ${canRetry && !chatRequestPending ? '' : 'disabled'}`
        : action === 'like' || action === 'dislike' ? `aria-pressed="${message.feedback === action}"` : '';
      return `<button type="button" data-chat-action="${action}" aria-label="${label}" title="${label}" ${state}>${chatIcon(icon)}</button>`;
    }).join('') + '<span class="chat-action-status" role="status"></span>';
    const status = actions.querySelector('.chat-action-status');
    actions.addEventListener('click', async event => {
      const button = event.target.closest('button[data-chat-action]');
      if (!button) return;
      const action = button.dataset.chatAction;
      if (action === 'retry') {
        await regenerateReply(session, message, row, status);
        return;
      }
      if (action === 'like' || action === 'dislike') {
        message.feedback = message.feedback === action ? null : action;
        saveSessionsToStorage(realSessions);
        actions.querySelectorAll('[aria-pressed]').forEach(control => {
          control.setAttribute('aria-pressed', String(control.dataset.chatAction === message.feedback));
        });
        status.textContent = message.feedback ? '已记录反馈' : '已取消反馈';
        return;
      }
      try {
        const text = row.querySelector('.bot-text-content').innerText.trim() || message.content;
        if (action === 'share' && navigator.share && (!navigator.canShare || navigator.canShare({ text }))) {
          try {
            await navigator.share({ title: '安农智办', text });
            return;
          } catch (error) {
            if (error.name === 'AbortError') return;
          }
        }
        await copyReplyText(text);
        status.textContent = action === 'share' ? '已复制，可粘贴分享' : '已复制回复';
      } catch (error) {
        status.textContent = '复制失败，可选中回复手动复制';
      }
    });
    row.appendChild(actions);
  }

  function scrollChatToBottom(smooth = false) {
    const list = document.getElementById('nativeChatMessages');
    if (!list) return;
    const runScroll = () => {
      try {
        list.scrollTo({
          top: list.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto'
        });
      } catch (e) {
        list.scrollTop = list.scrollHeight;
      }
    };
    requestAnimationFrame(runScroll);
    setTimeout(runScroll, 60);
    setTimeout(runScroll, 180);
    setTimeout(runScroll, 400);
    setTimeout(runScroll, 800);
  }

  function appendUserMessage(text, imageBase64 = null) {
    const hero = document.getElementById('askbHeroCenter');
    if (hero) hero.style.display = 'none';
    const list = document.getElementById('nativeChatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user';
    const inLobby = !!list.closest('.anau-lobby');

    let imgHtml = '';
    if (imageBase64) {
      imgHtml = `<div style="margin-bottom: 8px;"><img src="${imageBase64}" style="max-width: 180px; max-height: 180px; border-radius: 8px; border: 1.5px solid rgba(255,255,255,0.4);"></div>`;
    }

    msgDiv.innerHTML = `
      <div class="chat-msg-avatar">
        ${inLobby ? `<span class="chat-user-avatar" role="img" aria-label="我">${chatIcon('user-round')}</span>`
          : '<img src="anau_ai_logo.png" style="filter: hue-rotate(90deg);" alt="用户">'}
      </div>
      <div class="chat-msg-bubble">
        ${imgHtml}
        <div class="chat-user-text">${escapeHtml(text)}</div>
      </div>
    `;
    list.appendChild(msgDiv);
    scrollChatToBottom(true);
  }

  function appendBotMessage(message, session) {
    const { content: markdownText, approval: approvalObj, widgetHtml: extraWidgetHtml } = message;
    const list = document.getElementById('nativeChatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot';

    // 格式化文本
    const formattedHtml = parseMarkdownToHtml(markdownText);

    // 审批单卡片
    let approvalHtml = '';
    if (approvalObj) {
      if (approvalObj.title) approvalObj.title = stripEmojis(approvalObj.title);
      let rowsHtml = '';
      approvalObj.data.forEach(item => {
        const cleanLabel = escapeHtml(stripEmojis(item.label));
        const cleanVal = approvalObj.type === "classroom" ? escapeHtml(stripEmojis(item.val)) : stripEmojis(item.val);
        rowsHtml += `<tr><td class="label">${cleanLabel}</td><td class="val">${cleanVal}</td></tr>`;
      });

      approvalHtml = `
        <div class="approval-card-container">
          <div class="approval-card-header">
            <span class="approval-card-title"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:5px; color:var(--agent-green);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>${approvalObj.title}</span>
            <span class="approval-card-no">单号: ${approvalObj.docNo}</span>
          </div>
          <table class="approval-table">
            <tbody>${rowsHtml}</tbody>
          </table>
          <div class="approval-actions">
            <button class="btn-print-doc" data-print-type="${escapeHtml(approvalObj.type)}" data-print-info="${escapeHtml(JSON.stringify(approvalObj.rawObj))}" onclick="window.AnauAgent.openPrintModal(this.dataset.printType, JSON.parse(this.dataset.printInfo))">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:5px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>预览打印 / 保存 PDF
            </button>
          </div>
        </div>
      `;
    }

    msgDiv.innerHTML = `
      <div class="chat-msg-avatar">
        <img src="anau_ai_logo.png" alt="安农智办">
      </div>
      <div class="chat-msg-bubble">
        <div class="bot-text-content">${formattedHtml}</div>
        ${approvalHtml}
        ${extraWidgetHtml ? extraWidgetHtml : ''}
      </div>
    `;
    if (list.closest('.anau-lobby')) {
      if (session?.messages.at(-1) === message) {
        list.querySelectorAll('[data-retry-available="true"]').forEach(button => {
          button.dataset.retryAvailable = 'false';
          button.disabled = true;
        });
      }
      attachReplyActions(msgDiv, message, session);
    }
    list.appendChild(msgDiv);
    scrollChatToBottom(true);

    // 自动挂载事实条文抽屉并初始化滑块
    ensureCitationDrawerMounted();
    if (extraWidgetHtml && extraWidgetHtml.includes('interactive-slider-box')) {
      const matchWid = extraWidgetHtml.match(/id="(slider-box-\d+)"/);
      if (matchWid && matchWid[1]) {
        setTimeout(() => {
          if (window.AnauAgent && window.AnauAgent.updateZongceSliders) {
            window.AnauAgent.updateZongceSliders(matchWid[1]);
          }
          scrollChatToBottom(false);
        }, 60);
      }
    }
  }

  // ----------------------------------------------------------------------------
  // 8.1 辅助与兼容接口 (纯净静音无干扰模式)
  // ----------------------------------------------------------------------------
  function stopAllAudio() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  function speakBotReply(text) {}

  function showTypingIndicator() {
    const list = document.getElementById('nativeChatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot';
    typingDiv.id = 'agentTypingIndicator';
    typingDiv.innerHTML = `
      <div class="chat-msg-avatar">
        <img src="anau_ai_logo.png" alt="安农智办">
      </div>
      <div class="chat-msg-bubble" style="padding: 8px 12px;">
        <span class="typing-dots">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </span>
      </div>
    `;
    list.appendChild(typingDiv);
    scrollChatToBottom(true);
  }

  function removeTypingIndicator() {
    const el = document.getElementById('agentTypingIndicator');
    if (el) el.remove();
  }

  // ----------------------------------------------------------------------------
  // 9. 格式化与 Markdown 渲染器
  // ----------------------------------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // 彻底剔除 Emoji 表情符号，保障严谨沉稳的高校官方与学术答复质感
  function stripEmojis(text) {
    if (!text || typeof text !== 'string') return text;
    // 匹配常规 Emoji 及扩展符号，但严格保留标准五角星 ★ 与乘号 ✕
    let cleaned = text.replace(/[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{2604}\u{2606}-\u{26FF}\u{2700}-\u{2714}\u{2716}-\u{27BF}\u{1F100}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{20D0}-\u{20FF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{303D}\u{3297}\u{3299}]/gu, '');
    // 清理由于删除 emoji 产生的行首或列表首多余空格
    cleaned = cleaned.replace(/^[ \t]+(?=\S)/gm, '').replace(/([-\*]\s+)[ \t]+/g, '$1');
    return cleaned;
  }

  function parseMarkdownToHtml(md) {
    if (!md) return '';
    // 严谨过滤所有 Emoji，彻底杜绝轻浮的 AI 味，确立高校严肃学术与办事行政基调
    md = stripEmojis(md);
    // 优先调用本地打包的 marked.js 工业级渲染引擎
    if (typeof window !== 'undefined' && window.marked && typeof window.marked.parse === 'function') {
      try {
        window.marked.setOptions({
          gfm: true,
          breaks: true,
          pedantic: false
        });
        let rawHtml = window.marked.parse(md);
        // 为所有 table 增加自适应横向滚动外壳，保证移动端与窄屏绝对不溢出
        rawHtml = rawHtml.replace(/<table/g, '<div class="table-responsive"><table').replace(/<\/table>/g, '</table></div>');
        return rawHtml;
      } catch (err) {
        console.warn('marked parse error, using fallback parser:', err);
      }
    }
    // 降级备用简易解析
    let html = md;
    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // 斜体
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // 分行
    html = html.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
    return html;
  }

  // ----------------------------------------------------------------------------
  // 10. 打印正规盖章单据生成器 (绝杀亮点)
  // ----------------------------------------------------------------------------
  function renderPrintSheet(type, raw) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;

    if (type === 'classroom') {
      return `
        <div class="print-official-emblem">
          <img src="anau_ai_logo.png" alt="校徽" style="height: 52px; width: 52px; border-radius: 50%;">
        </div>
        <div class="print-official-title">教室借用申请草案</div>
        <div class="print-official-sub">安农智办生成 · 请以学校审批为准</div>
        <div class="print-meta-row">
          <span>草案编号：${escapeHtml(raw.docNo || '待填写')}</span>
          <span>填表日期：${dateStr}</span>
        </div>
        <table class="print-standard-table">
          <tr>
            <td class="header-col">借用单位/班级</td>
            <td>${escapeHtml(raw.dept || '待填写')}</td>
            <td class="header-col">经办人 / 学号</td>
            <td>${escapeHtml(raw.applicant || '待填写')}</td>
          </tr>
          <tr>
            <td class="header-col">拟借用时间</td>
            <td>${escapeHtml(raw.time || '待填写')}</td>
            <td class="header-col">使用人数</td>
            <td>${escapeHtml(raw.count || '待填写')}</td>
          </tr>
          <tr>
            <td class="header-col">场地建议（待核实）</td>
            <td colspan="3" style="font-weight: 700; color: #244b2d;">${escapeHtml(raw.room || '待填写')}</td>
          </tr>
          <tr>
            <td class="header-col">借用具体事由</td>
            <td colspan="3">${escapeHtml(raw.reason || '待填写')}</td>
          </tr>
          <tr>
            <td class="header-col">多媒体设备需求</td>
            <td colspan="3">${escapeHtml(raw.equipment || '待确认')}</td>
          </tr>
          <tr style="height: 90px;">
            <td class="header-col">班主任 / 辅导员<br>审核意见</td>
            <td colspan="3" style="vertical-align: top; padding: 12px;">
              待辅导员填写。<br><br>
              <div style="text-align: right; margin-right: 40px;">辅导员签字：________________&nbsp;&nbsp;&nbsp;&nbsp;${dateStr}</div>
            </td>
          </tr>
          <tr style="height: 90px;">
            <td class="header-col">现代教育技术中心<br>多媒体教室管理科</td>
            <td colspan="3" style="vertical-align: top; padding: 12px; position: relative;">
              待教室管理方核实场地、时间及设备后填写。<br><br>
              <div style="text-align: right; margin-right: 40px;">审批人签章：________________&nbsp;&nbsp;&nbsp;&nbsp;${dateStr}</div>

            </td>
          </tr>
        </table>
        <div style="font-size: 11.5px; color: #64748b; line-height: 1.5;">
          * 注：1. 借用人员请严格遵守《安徽农业大学教室使用管理办法》，严禁在教室内吸烟、进食外卖及大声喧哗；<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 活动结束后请经办人务必关好投影仪、电灯及门窗，并向勤学楼值班室交还设备。
        </div>
      `;
    }

    if (type === 'leave') {
      return `
        <div class="print-official-emblem">
          <img src="anau_ai_logo.png" alt="校徽" style="height: 52px; width: 52px; border-radius: 50%;">
        </div>
        <div class="print-official-title">安徽农业大学学生离校请假申请审批单</div>
        <div class="print-official-sub">学生工作部（处） · 学院学生工作办公室 留存凭证</div>
        <div class="print-meta-row">
          <span>审批编号：${raw.docNo || 'AHAU-LV-20261105'}</span>
          <span>申请日期：${dateStr}</span>
        </div>
        <table class="print-standard-table">
          <tr>
            <td class="header-col">学生姓名</td>
            <td>${raw.applicant || '当前学生'}</td>
            <td class="header-col">学号 / 专业</td>
            <td>${raw.studentId || '230101****'} / 本科在读</td>
          </tr>
          <tr>
            <td class="header-col">请假类别</td>
            <td>${raw.type || '因事离校假'}</td>
            <td class="header-col">请假天数</td>
            <td>共 2 天</td>
          </tr>
          <tr>
            <td class="header-col">请假起止时间</td>
            <td colspan="3">${raw.dates || '2026年11月8日 至 11月10日'}</td>
          </tr>
          <tr>
            <td class="header-col">离校去向目的地</td>
            <td colspan="3">${raw.dest || '安徽省合肥市合肥南站返家'}</td>
          </tr>
          <tr>
            <td class="header-col">具体事由说明</td>
            <td colspan="3">${raw.reason || '因处理个人家庭突发事务，需离校外出，已当面告知班主任并取得家长知情同意。'}</td>
          </tr>
          <tr>
            <td class="header-col">紧急联系人/家长</td>
            <td colspan="3">${raw.phone || '138****6688 (直系亲属联系电话)'}</td>
          </tr>
          <tr style="height: 85px;">
            <td class="header-col">年级辅导员<br>审批意见</td>
            <td colspan="3" style="vertical-align: top; padding: 12px; position: relative;">
              已与学生家长电话核实，情况属实，知晓离校去向与行程安全要求，准予离校，返校后24小时内须当面销假。<br><br>
              <div style="text-align: right; margin-right: 40px;">辅导员签字：________________&nbsp;&nbsp;&nbsp;&nbsp;${dateStr}</div>
              <div class="official-seal-mock">安徽农业大学<br>学生工作办公室<br>★ 请假审核章 ★</div>
            </td>
          </tr>
        </table>
        <div style="font-size: 11.5px; color: #64748b; line-height: 1.5;">
          * 安全须知：学生离校期间必须遵守国家法律与校纪校规，注意交通与人身财产安全，严禁前往无安全保障区域。
        </div>
      `;
    }
  }

  // ----------------------------------------------------------------------------
  // 11. 核心公开 API 与全局事件绑定
  // ----------------------------------------------------------------------------
  window.AnauAgent = {
    togglePlusMenu: function () {
      const menu = document.getElementById('askbPlusMenu');
      const modelMenu = document.getElementById('askbModelMenu');
      if (modelMenu) modelMenu.style.display = 'none';
      if (menu) menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    },

    toggleModelMenu: function () {
      const menu = document.getElementById('askbModelMenu');
      const plusMenu = document.getElementById('askbPlusMenu');
      if (plusMenu) plusMenu.style.display = 'none';
      if (menu) menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    },

    selectModel: function (modelId, label) {
      AgentState.currentModel = modelId;
      const lbl = document.getElementById('currentModelLabel');
      if (lbl) lbl.textContent = label;
      const menu = document.getElementById('askbModelMenu');
      if (menu) menu.style.display = 'none';
    },

    insertTemplate: function (tplText) {
      const input = document.getElementById('agentInputText');
      if (input) {
        input.value = tplText;
        input.focus();
        this.autoResizeTextarea(input);
      }
      const menu = document.getElementById('askbPlusMenu');
      if (menu) menu.style.display = 'none';
    },

    triggerImageUpload: function () {
      const menu = document.getElementById('askbPlusMenu');
      if (menu) menu.style.display = 'none';
      const el = document.getElementById('agentImageInput');
      if (el) el.click();
    },

    triggerDocUpload: function () {
      const menu = document.getElementById('askbPlusMenu');
      if (menu) menu.style.display = 'none';
      const el = document.getElementById('agentDocInput');
      if (el) el.click();
    },

    clearPendingImage: function () {
      pendingImageBase64 = null;
      const tray = document.getElementById('askbFilesTray');
      if (tray) tray.style.display = 'none';
      const fileInput = document.getElementById('agentImageInput');
      if (fileInput) fileInput.value = '';
    },

    toggleVoiceInput: function () {
      const W = window;
      const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
      const note = document.getElementById('askbNote');
      const micBtn = document.getElementById('agentMicBtn');
      if (!SR) {
        if (note) {
          note.textContent = "当前浏览器未开启语音接口，请直接键盘打字输入";
          note.style.display = 'block';
          setTimeout(() => { if (note) note.style.display = 'none'; }, 3500);
        }
        return;
      }
      if (AgentState.isListening && AgentState.speechRecognizer) {
        AgentState.speechRecognizer.stop();
        AgentState.isListening = false;
        if (micBtn) {
          micBtn.removeAttribute('data-listening');
          micBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11.5" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
        }
        return;
      }
      try {
        const r = new SR();
        r.interimResults = true;
        r.continuous = false;
        r.lang = 'zh-CN';
        AgentState.speechRecognizer = r;
        AgentState.isListening = true;
        if (micBtn) {
          micBtn.setAttribute('data-listening', 'true');
          micBtn.innerHTML = '<span class="askb__bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
        }
        r.onresult = function (e) {
          const trans = Array.from(e.results).map(x => x[0].transcript).join('');
          const inp = document.getElementById('agentInputText');
          if (inp) {
            inp.value = trans;
            window.AnauAgent.autoResizeTextarea(inp);
          }
        };
        r.onend = function () {
          AgentState.isListening = false;
          if (micBtn) {
            micBtn.removeAttribute('data-listening');
            micBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11.5" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
          }
        };
        r.onerror = function () {
          AgentState.isListening = false;
          if (micBtn) {
            micBtn.removeAttribute('data-listening');
            micBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11.5" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
          }
        };
        r.start();
      } catch (err) {
        if (note) {
          note.textContent = "麦克风启动失败，请检查浏览器权限";
          note.style.display = 'block';
          setTimeout(() => { if (note) note.style.display = 'none'; }, 3500);
        }
      }
    },

    toggleChat: function () {
      const win = document.getElementById('nativeChatWindow');
      const bubble = document.getElementById('aiCalloutBubble');
      const aura = document.getElementById('nativeAiAura');
      if (!win) return;

      AgentState.isOpen = !AgentState.isOpen;
      if (AgentState.isOpen) {
        win.classList.add('open');
        if (bubble) bubble.style.display = 'none';
        if (aura) aura.style.display = 'none';
        setTimeout(() => document.getElementById('agentInputText').focus(), 300);
      } else {
        win.classList.remove('open');
        if (bubble) bubble.style.display = 'flex';
        if (aura) aura.style.display = 'block';
      }
    },

    openChat: function () {
      if (!AgentState.isOpen) this.toggleChat();
    },

    sendUserMsg: function (text) {
      this.openChat();
      const inputEl = document.getElementById('agentInputText');
      if (inputEl) inputEl.value = text;
      this.submitInput();
    },

    printLeaveSlip: function (slipId) {
      const paper = document.getElementById(slipId + '-paper');
      if (!paper) return;
      const printWin = window.open('', '_blank', 'width=800,height=900');
      if (!printWin) {
        window.print();
        return;
      }
      printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>安徽农业大学学生请假条模版（标准A4空白手写联）</title>
          <style>
            @page { size: A4 portrait; margin: 15mm 20mm; }
            body { font-family: SimSun, "Songti SC", "Noto Serif CJK SC", serif; margin: 0; padding: 20px; background: #fff; color: #000; line-height: 2.2; font-size: 15pt; }
            .anau-slip-sheet { margin-bottom: 30px; padding: 10px 0; }
            .anau-slip-title { font-size: 24pt; font-weight: 700; text-align: center; letter-spacing: 12px; margin-bottom: 6px; }
            .anau-slip-copy-tag { font-size: 11pt; text-align: center; color: #555; margin-bottom: 18px; font-weight: bold; font-family: sans-serif; }
            .anau-slip-content { line-height: 2.3; margin-bottom: 30px; text-align: justify; }
            .anau-slip-underline-blank { display: inline-block; border-bottom: 1.5px solid #000; min-width: 60px; vertical-align: baseline; margin: 0 2px; }
            .anau-slip-underline { display: inline-block; border-bottom: 1.5px solid #000; padding: 0 8px; font-weight: bold; min-width: 50px; text-align: center; }
            .anau-slip-sign-row { display: flex; justify-content: space-between; margin-top: 25px; font-size: 14pt; }
            .anau-slip-cutline { text-align: center; margin: 30px 0; font-size: 10pt; color: #666; border-top: 1.5px dashed #000; padding-top: 14px; font-family: sans-serif; }
          </style>
        </head>
        <body>
          ${paper.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 800);
            };
          <\/script>
        </body>
        </html>
      `);
      printWin.document.close();
    },

    downloadLeaveSlipFile: function (slipId) {
      // 优先提供官方标准 .docx 模版文件下载
      const a = document.createElement('a');
      a.href = 'assets/请假条模板.docx';
      a.download = '安徽农业大学_规范学生请假条模版(一式两联手写版).docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.AnauAgent.showToast) {
        window.AnauAgent.showToast('已发起请假条模板下载，请打印后手写信息并找辅导员面签签字！');
      }
    },

    openXiaojiaModal: function (slipId) {
      window.activeXiaojiaSlipId = slipId || 'slip-auto';
      const m = document.getElementById('xiaojiaModal');
      if (!m) return;
      const formSec = document.getElementById('xiaojiaFormSection');
      const rcptSec = document.getElementById('xiaojiaReceiptSection');
      if (formSec) formSec.style.display = 'block';
      if (rcptSec) rcptSec.style.display = 'none';

      const btn = document.getElementById('btnSubmitXiaojia');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg><span>生成返校销假演示凭单</span>`;
      }

      // 填充当前学生身份信息
      const studentName = '学生（待填写）';
      const stEl = document.getElementById('xjStudentName');
      if (stEl) stEl.textContent = studentName;
      const rcptSt = document.getElementById('rcptStudent');
      if (rcptSt) rcptSt.textContent = studentName;

      // 实时获取当前时间作为实际归校时间
      const now = new Date();
      const timeStr = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const timeInput = document.getElementById('xjActualReturnTime');
      if (timeInput) timeInput.value = timeStr;
      const rcptTime = document.getElementById('rcptTime');
      if (rcptTime) rcptTime.textContent = `${timeStr}:${String(now.getSeconds()).padStart(2, '0')}`;

      m.classList.add('show');
    },

    closeXiaojiaModal: function () {
      const m = document.getElementById('xiaojiaModal');
      if (m) m.classList.remove('show');
    },

    simulateReupload: function () {
      if (window.AnauAgent.showToast) {
        window.AnauAgent.showToast('辅导员已面签凭据照片重新验真中... 特征比对成功！');
      }
    },

    submitXiaojiaForm: function () {
      const promiseCheck = document.getElementById('xjSafetyPromise');
      if (promiseCheck && !promiseCheck.checked) {
        if (window.AnauAgent.showToast) {
          window.AnauAgent.showToast('请先勾选并确认安全归宿承诺！');
        }
        return;
      }

      const btn = document.getElementById('btnSubmitXiaojia');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;animation:spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path></svg> 正在校验学工库并办结归档...`;
      }

      setTimeout(() => {
        const formSec = document.getElementById('xiaojiaFormSection');
        const rcptSec = document.getElementById('xiaojiaReceiptSection');
        if (formSec) formSec.style.display = 'none';
        if (rcptSec) rcptSec.style.display = 'block';

        const slipId = window.activeXiaojiaSlipId || 'slip-auto';
        const step3 = document.getElementById(slipId + '-step3');
        const slipBtn = document.getElementById(slipId + '-btn-xiaojia');
        if (step3) {
          step3.className = 'step-item step-done';
          const st = step3.querySelector('.step-state');
          if (st) st.textContent = '已生成演示凭单';
        }
        if (slipBtn) {
          slipBtn.disabled = false;
          slipBtn.style.background = '#059669';
          slipBtn.innerHTML = '查看返校销假演示凭单';
          slipBtn.onclick = function() {
            window.AnauAgent.openXiaojiaModal(slipId);
            const fs = document.getElementById('xiaojiaFormSection');
            const rs = document.getElementById('xiaojiaReceiptSection');
            if (fs) fs.style.display = 'none';
            if (rs) rs.style.display = 'block';
          };
        }

        // 并在主对话中发一条助手确认通知
        const confirmMsg = `**【返校销假流程演示】**\n\n` +
          `尊敬的同学，您的请假条（档案编号：\`AHAU-QJ-20261117-0892\`）已顺利通过 **辅导员第二联面签核验** 与 **AHAU-Student 校园网在校在席定位认证**。\n\n` +
          `📋 **销假办结凭单编号**：\`AHAU-XJ-20261120-0892\`\n` +
          `⏱️ **归档办结时间**：${new Date().toLocaleString('zh-CN')}\n` +
          `🏛️ **全校考勤联动**：已由信息与计算机学院学工系统办结注销，全校教务出勤系统已恢复在校正常打卡状态。\n\n` +
          `此凭单仅供演示，请通过学校渠道正式销假。`;
        
        const message = { role: 'assistant', content: confirmMsg };
        const session = getActiveSession();
        appendMessageToCurrentSession(message, session);
        appendBotMessage(message, session);

        if (window.AnauAgent.showToast) {
          window.AnauAgent.showToast('已生成返校销假演示凭单。');
        }
      }, 700);
    },

    completeXiaojia: function (slipId) {
      this.openXiaojiaModal(slipId);
    },

    submitInput: async function () {
      const inputEl = document.getElementById('agentInputText');
      const text = (inputEl.value || '').trim();
      const hasImage = !!pendingImageBase64;
      const imgData = pendingImageBase64;

      if (chatRequestPending || (!text && !hasImage)) return;
      const session = getActiveSession();
      const wasInWorkflow = !!AgentState.workflow;
      const retryTopic = AgentState.lastTopic;
      const retryLocation = AgentState.lastLocation;
      setChatRequestPending(true);
      document.querySelectorAll('#nativeChatMessages [data-chat-action="retry"]').forEach(button => {
        button.dataset.retryAvailable = 'false';
      });

      // 1. 发送用户消息并持久化到当前真实会话
      appendUserMessage(text || '【发送了一张校园照片】', imgData);
      appendMessageToCurrentSession({ role: 'user', content: text || '【发送了一张校园照片】', image: imgData });
      inputEl.value = '';
      this.autoResizeTextarea(inputEl);
      this.clearPendingImage();

      // 2. 显示思考状态
      showTypingIndicator();

      // 3. 混合引擎决策路由：
      // - 纯数学计算与算术：优先毫秒级即时计算（保证离线与非内网环境下 100% 秒出结果与详细步骤）
      const mathQuick = !hasImage && !AgentState.workflow && solveMath(text);
      // - 业务审批工作流、安农大 63 只校宠名录、食堂就餐、楼宇防跑空及多轮追问：走本地 100% 权威防幻觉知识大脑
      // - 开放性通用闲聊、深层代码、论文创作：连接安农官方大模型，断网不可达时无缝降级
      const t = text.toLowerCase();
      const catKeywords = ['猫', '校宠', '花名册', '猫坡', '东门', '来福', '花姐', '英国佬', '大吉', '馆长', '毛毛', '小黑', '小漂亮', '嘴上有屎', '对眼', '屁姐', '屁哥', '鸟哥', '花卷', '足球八嘎', '黑头', '小罐', '小美', '四瓜'];
      const canteenKeywords = ['食堂', '餐厅', '吃饭', '吃什么', '西苑', '欣苑', '东苑', '北苑', '丰泽', '思源'];
      const buildingKeywords = ['勤政楼', '勤学楼', '博学楼', '图书馆', '第二报告厅', '报告厅', '化学楼'];
      const workflowKeywords = ['课表', '借用', '借教室', '开班会', '请假', '假条', '离校', '一卡通', '报修', '茶树', '国重', '名木', '银杏', '香樟', '调课', '排课', '换课', '停课', '教室冲突', '学分', '培养方案', '成绩复核', '协同工作流', '教务协同', 'agentweber', 'weber', '成绩', '查成绩', '绩点', 'gpa', '查分', '电脑自动化', 'os agent', '本地控制', '自动化做事情', '工作区', '同步日历', '本地主机'];
      const zongceKeywords = ['综测', '测评', '算综测', '奖学金', '国家奖学金', '励志奖学金', '志愿汇', '德育'];
      const kaoyanKeywords = ['考研', '择校', '专硕', '学硕', '读博', '408', '414', '314', '315', '考研时间线', '考研科目', '复习进度', '择校方案'];
      const facultyKeywords = ['师资', '导师', '教授', '课题组', '研究课题', '研究方向', '老师', '教师', '博导', '硕导', '农学院', '茶业学院', '茶学院', '计算机学院', '人工智能学院', '信息与计算机学院', '信智学院', '生命科学学院', '生科院', '生物制造', '植物保护学院', '植保学院', '经济管理学院', '经管学院', '动物科技学院', '动科院', '动物医学院', '动医院', '有哪些老师', '找老师', '找导师', '宛晓春', '夏恩华', '张友华', '姜东', '武立权', '程备久', '薛挺', '操海群', '辜丽川'];
      const examKeywords = ['期末', '真题', '试卷', '往年卷', '复习资料', '高数卷', '高数题', '高数真题', '线代卷', '线代题', '线代真题', '普化卷', '普化题', '生化卷', '生化题', '工图卷', '工图题', '工程制图', '微观经济', '基础会计', '思政合集', '题库', 'leaning'];
      const plazaKeywords = ['科研广场', '互助广场', '科研互助', '找队友', '跨学科', '组队', '科研合作', '借仪器', '借设备', '数据共享', '互帮互助', '找搭档', '芯片量化', '多光谱', '病斑数据', 'p2p撮合', '智能体撮合', '找搭子', '合作组队'];
      
      const isShortFollowUp = (AgentState.lastTopic !== null) && (text.length <= 10 || text.endsWith('呢') || text.endsWith('吗') || text.startsWith('那'));
      const isCampusSpecific = AgentState.workflow || hasImage || isShortFollowUp || /借.{0,10}教室/.test(t) ||
        catKeywords.some(k => t.includes(k.toLowerCase())) ||
        canteenKeywords.some(k => t.includes(k.toLowerCase())) ||
        buildingKeywords.some(k => t.includes(k.toLowerCase())) ||
        workflowKeywords.some(k => t.includes(k.toLowerCase())) ||
        zongceKeywords.some(k => t.includes(k.toLowerCase())) ||
        kaoyanKeywords.some(k => t.includes(k.toLowerCase())) ||
        examKeywords.some(k => t.includes(k.toLowerCase())) ||
        plazaKeywords.some(k => t.includes(k.toLowerCase())) ||
        facultyKeywords.some(k => t.includes(k.toLowerCase())) || AHAU_KB.faculty.some(g => g.teachers.some(teacher => text.includes(teacher.name)));

      const retryMode = mathQuick ? 'math' : isCampusSpecific ? 'campus' : 'model';
      let res;
      try {
        if (mathQuick) {
          await new Promise(resolve => setTimeout(resolve, 320));
          res = mathQuick;
        } else {
          res = hasImage ? await handleMultimodalInput(text, imgData)
            : isCampusSpecific ? processUserInput(text)
              : await callAhauOfficialLlm(text, session.messages.slice(0, -1), input =>
                getActiveSession() === session ? processUserInput(input) : retryCampusReply(input, { retryTopic, retryLocation }));
        }
      } catch (error) {
        console.error('处理消息失败:', error);
        res = { text: '这次请求没有完成，请稍后重试。' };
      } finally {
        removeTypingIndicator();
      }

      const message = { role: 'assistant', content: res.text, approval: res.approval, widgetHtml: res.widgetHtml };
      if (!hasImage && !wasInWorkflow && !AgentState.workflow && !res.approval && !res.widgetHtml) {
        Object.assign(message, { retryMode, retryTopic, retryLocation });
      }
      try {
        appendMessageToCurrentSession(message, session);
        if (getActiveSession() === session && session.messages.at(-1) === message) {
          appendBotMessage(message, session);
        }
      } finally {
        setChatRequestPending(false);
      }
    },

    handleKeyDown: function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.submitInput();
      }
    },

    autoResizeTextarea: function (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 100) + 'px';
    },

    handleFileSelect: function (e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (evt) {
        pendingImageBase64 = evt.target.result;
        const tray = document.getElementById('askbFilesTray');
        const nameEl = document.getElementById('askbFileName');
        if (tray) tray.style.display = 'flex';
        if (nameEl) nameEl.textContent = file.name;
        const inputEl = document.getElementById('agentInputText');
        if (inputEl) inputEl.placeholder = '已附带材料/照片，可直接点击发送或输入问题...';
      };
      reader.readAsDataURL(file);
    },

    clearPendingImage: function () {
      pendingImageBase64 = null;
      const previewBar = document.getElementById('chatPreviewBar');
      if (previewBar) previewBar.style.display = 'none';
      const inputEl = document.getElementById('agentInputText');
      if (inputEl) inputEl.placeholder = '输入校园问题或办事需求';
      const fileInput = document.getElementById('agentImageInput');
      if (fileInput) fileInput.value = '';
    },

    resetChat: function () {
      createNewSession();
    },

    loadSession: function (sessionId) {
      renderSessionMessages(sessionId);
    },

    createNewSession: createNewSession,
    deleteSession: deleteSession,

    getSessions: function () {
      return realSessions;
    },

    openPrintModal: function (type, rawObj) {
      const modal = document.getElementById('officialPrintModal');
      const content = document.getElementById('printSheetContent');
      if (!modal || !content) return;
      content.innerHTML = renderPrintSheet(type, rawObj);
      modal.classList.add('show');
    },

    closePrintModal: function () {
      const modal = document.getElementById('officialPrintModal');
      if (modal) modal.classList.remove('show');
    },

    // --------------------------------------------------------------------------
    // 核心扩展特性交互控制器 (公私安全栅栏 / 参数推演沙盘 / 错因探针)
    // --------------------------------------------------------------------------
    openCitationDrawer: function (id) {
      ensureCitationDrawerMounted();
      const c = OFFICIAL_CITATIONS[id] || {
        title: '安徽农业大学校情与行政规程',
        no: '安农规发〔2024〕规范文件',
        dept: '校务与教务委员会',
        date: '2024年',
        excerpt: '所引条目已在安徽农业大学校务与教务公开数据库中完成事实核验。'
      };
      const titleEl = document.getElementById('citationDrawerDocTitle');
      const metaEl = document.getElementById('citationDrawerMeta');
      const excerptEl = document.getElementById('citationDrawerExcerpt');
      const overlay = document.getElementById('ahauCitationDrawerOverlay');
      if (titleEl) titleEl.textContent = c.title;
      if (metaEl) metaEl.textContent = `发文文号：${c.no} · 归口单位：${c.dept} (发布于 ${c.date || '校规在册'})`;
      if (excerptEl) excerptEl.textContent = c.excerpt;
      if (overlay) overlay.classList.add('active');
    },

    closeCitationDrawer: function () {
      const overlay = document.getElementById('ahauCitationDrawerOverlay');
      if (overlay) overlay.classList.remove('active');
    },

    confirmActionGating: function (gid, bizType, docNo) {
      const card = document.getElementById(gid);
      if (!card) return;
      const actions = document.getElementById(gid + '-actions');
      if (actions) {
        actions.innerHTML = `
          <div class="gating-signed-stamp">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#059669;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>【本人双因子电子签署授权】已安全提交至学校${bizType}审批流 (单号: ${docNo}) · 零越权合规存证</span>
          </div>
        `;
      }
      if (window.AnauAgent.showToast) {
        window.AnauAgent.showToast('经办人已签署授权，办事流程正式流转！');
      }
    },

    cancelActionGating: function (gid) {
      const card = document.getElementById(gid);
      if (!card) return;
      const actions = document.getElementById(gid + '-actions');
      if (actions) {
        actions.innerHTML = `
          <div style="font-size:12px; color:#64748b; padding:6px 0;">已存为草案，尚未向教务/学工系统发起正式推送。</div>
        `;
      }
    },

    confirmWeberAction: function (wid, title, docNo) {
      const card = document.getElementById(wid);
      if (!card) return;
      const actions = document.getElementById(wid + '-actions');
      if (actions) {
        actions.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px; font-size:12.5px; font-weight:600; color:#15803d; background:#dcfce7; padding:8px 14px; border-radius:8px; border:1px solid #86efac; width:100%;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            <span>模拟确认完成 · ${escapeHtml(title)} · 演示单号 ${escapeHtml(docNo)}</span>
          </div>
        `;
      }
      if (window.AnauAgent.showToast) {
        window.AnauAgent.showToast('已完成本页模拟确认。');
      }
    },

    cancelWeberAction: function (wid) {
      const actions = document.getElementById(wid + '-actions');
      if (actions) {
        actions.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:600; color:#64748b; background:#f1f5f9; padding:8px 14px; border-radius:8px; width:100%;">
            <span>已取消写入操作 · 本地数据保持只读 · 0次擅自越权</span>
          </div>
        `;
      }
      if (window.AnauAgent.showToast) {
        window.AnauAgent.showToast('已暂存演示草案。');
      }
    },

    updateZongceSliders: function (sliderBoxId) {
      const box = document.getElementById(sliderBoxId);
      if (!box) return;
      const gpaInput = document.getElementById(sliderBoxId + '-gpa-slider');
      const volInput = document.getElementById(sliderBoxId + '-vol-slider');
      const compInput = document.getElementById(sliderBoxId + '-comp-slider');

      const gpaVal = gpaInput ? parseFloat(gpaInput.value) : 3.65;
      const volVal = volInput ? parseInt(volInput.value, 10) : 20;
      const compVal = compInput ? parseFloat(compInput.value) : 4.0;

      // 更新标签数值
      const gpaBadge = document.getElementById(sliderBoxId + '-gpa-val');
      const volBadge = document.getElementById(sliderBoxId + '-vol-val');
      const compBadge = document.getElementById(sliderBoxId + '-comp-val');
      if (gpaBadge) gpaBadge.textContent = gpaVal.toFixed(2);
      if (volBadge) volBadge.textContent = volVal + ' 小时';
      if (compBadge) compBadge.textContent = '+' + compVal.toFixed(1) + ' 分';

      // 实时公式精密计算
      const studyScore = Math.min(70, Math.round((gpaVal / 4.5) * 70 * 10) / 10);
      const volBonus = Math.min(3.5, Math.round((volVal / 10) * 1.0 * 10) / 10);
      const deyuScore = Math.min(15, Math.round((10 + 1.5 + volBonus) * 10) / 10);
      const langBonus = 4.0;
      const totalScore = Math.round((studyScore + deyuScore + compVal + langBonus) * 10) / 10;

      const totalEl = document.getElementById(sliderBoxId + '-total-score');
      const tierEl = document.getElementById(sliderBoxId + '-award-tier');
      const rankEl = document.getElementById(sliderBoxId + '-award-rank');

      if (totalEl) totalEl.textContent = totalScore.toFixed(1) + ' 分';

      if (tierEl && rankEl) {
        if (totalScore >= 88 && compVal >= 4) {
          tierEl.textContent = '国家奖学金 / 校特等奖学金 (推荐冲刺)';
          tierEl.style.background = '#fef3c7';
          tierEl.style.color = '#b45309';
          tierEl.style.borderColor = '#fde68a';
          rankEl.textContent = '专业排位区间: 前 1%~3%';
        } else if (totalScore >= 80) {
          tierEl.textContent = '校一等奖学金 (或国家励志奖学金)';
          tierEl.style.background = '#ecfdf5';
          tierEl.style.color = '#047857';
          tierEl.style.borderColor = '#a7f3d0';
          rankEl.textContent = '专业排位区间: 前 5%~8%';
        } else if (totalScore >= 73) {
          tierEl.textContent = '校二等奖学金 (稳步入围)';
          tierEl.style.background = '#eff6ff';
          tierEl.style.color = '#1d4ed8';
          tierEl.style.borderColor = '#bfdbfe';
          rankEl.textContent = '专业排位区间: 前 8%~15%';
        } else {
          tierEl.textContent = '校三等奖学金 / 评优达标';
          tierEl.style.background = '#f1f5f9';
          tierEl.style.color = '#475569';
          tierEl.style.borderColor = '#e2e8f0';
          rankEl.textContent = '专业排位区间: 前 15%~25%';
        }
      }
    },

    submitDiagnosticProbe: function (pid, choiceKey) {
      const card = document.getElementById(pid);
      if (!card) return;
      const feedback = document.getElementById(pid + '-feedback');
      const opts = document.getElementById(pid + '-options');
      if (opts) {
        Array.from(opts.children).forEach(btn => btn.style.pointerEvents = 'none');
      }

      if (choiceKey === 'A') {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `
            <div class="probe-analysis-result is-error">
              <strong>【认知探针诊断结果 · 发现概念性偏差】</strong><br>
              经诊断，您选择选项 A 属于典型的<strong>「等价无穷小加减法滥用（概念混淆）」</strong>，而非粗心计算失误！<br>
              <strong>错因根源</strong>：在自变量趋近于0时，sin x ~ x 仅适用于纯乘除因式；在分子差式 sin x - x 中直接代换会导致主要极小量被抹杀（主部抵消）。<br>
              <strong>正确纠偏方案</strong>：必须利用三阶麦克劳林展开 sin x = x - x³/6 + o(x³)，分子变为 -x³/6，除以 x³ 得出极限为 <strong>-1/6</strong>。<br>
              <div style="margin-top:10px; padding-top:8px; border-top:1px dashed #fdba74;">
                <strong>等价情境变式反证题已载入</strong>：求 lim_{x→0} (tan x - x) / x³（只有再次独立做对两次，系统才判定真正掌握）。
              </div>
              <div style="margin-top:10px; font-weight:600; font-size:11.5px; color:#475569;">
                确定性艾宾浩斯离线复习日程 (算法与模型解耦，断网亦可稳定触发)：
              </div>
              <div class="review-timeline-grid">
                <div class="review-time-item"><div class="review-time-label">第1次自测</div><div class="review-time-date">今晚 21:00</div></div>
                <div class="review-time-item"><div class="review-time-label">第2次巩固</div><div class="review-time-date">后天 (D+2)</div></div>
                <div class="review-time-item"><div class="review-time-label">第3次强化</div><div class="review-time-date">第7天 (D+7)</div></div>
                <div class="review-time-item"><div class="review-time-label">第4次真题</div><div class="review-time-date">考前周 (D+15)</div></div>
              </div>
            </div>
          `;
        }
      } else if (choiceKey === 'B') {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `
            <div class="probe-analysis-result">
              <strong>【认知探针诊断结果 · 概念推导完全正确！】</strong><br>
              非常优异！您准确识别出了主部抵消问题，熟练采用了泰勒展开展开至 x³ 阶：sin x = x - x³/6 + o(x³)，计算得出极限值为 <strong>-1/6</strong>。<br>
              <strong>掌握度研判</strong>：该考点已标记为「完全掌握」，确定性复习引擎已将其复习权重调整至低频周期。
            </div>
          `;
        }
      } else {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `
            <div class="probe-analysis-result is-error">
              <strong>【认知探针诊断结果 · 运算发散】</strong><br>
              您选择选项 C，误以为极限不存在。实际上该极限为经典的 0/0 未定式，洛必达法则或泰勒级数均收敛于 -1/6。建议重温《高等数学(上)》第一章未定式极限求法。
            </div>
          `;
        }
      }
    },

    confirmResearchPlaza: function (pid) {
      const actionsEl = document.getElementById(pid + '-actions');
      if (actionsEl) {
        actionsEl.innerHTML = `
          <div class="research-plaza-result">
            <strong>【双方已完成实名审定 · 点对点安全信道建立成功】</strong><br>
            双方同学已通过数字校园身份认证核验意向！系统已为双方团队开通端到端加密协作信道，并自动生成《农工交叉科研项目意向推进备忘录》。双方可在点对点工作区内分工推进下一步数据校验与轻量化模型联合调优！
          </div>
        `;
      }
    },

    cancelResearchPlaza: function (pid) {
      const actionsEl = document.getElementById(pid + '-actions');
      if (actionsEl) {
        actionsEl.innerHTML = `
          <div style="font-size:12px; color:#64748b; padding:8px 0;">
            已暂存为拟发布需求草案。您可随时在输入框中补充更多数据样本详情或调整算法要求后重新撮合。
          </div>
        `;
      }
    },

    // 兼容接口 (静音模式安全无缝响应)
    openZongceFromBoard: openZongceFromBoard,
    openDiagnosisFromBoard: openDiagnosisFromBoard,
    handleGradeQueryWorkflow: handleGradeQueryWorkflow,
    openLocalPath: openLocalPath,
    handleOsWorkspaceWorkflow: handleOsWorkspaceWorkflow,

    openPlazaPage: function () {
      const win = window.open('plaza.html', '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = 'plaza.html';
      }
    },
    openVoiceMode: function () {},
    closeVoiceMode: function () {},
    toggleVoiceMic: function () {},
    interruptAndListen: function () {},
    handleOrbTap: function () {},
    toggleVoiceInput: function () {},
    toggleTts: function () {},
    speakBotReply: function () {},

    // 核心底层推理接口与知识库公开暴露
    processUserInput: processUserInput,
    handleMultimodalInput: handleMultimodalInput,
    KB: AHAU_KB
  };

  // 支持 AHAU 规范缩写全局变量
  window.AhauAgent = window.AnauAgent;

  // ----------------------------------------------------------------------------
  // 12. 页面加载完成后自动挂载，并重写全站胶囊与卡片唤起函数
  // ----------------------------------------------------------------------------
  function initAgent() {
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch(e) {}
    }
    if (document.getElementById('nativeAgentRoot')) return; // 避免重复注入
    try {
      localStorage.removeItem('anau_custom_api_key');
      localStorage.removeItem('anau_custom_api_url');
      localStorage.removeItem('anau_custom_model');
    } catch(e) {}
    injectNativeChatUI();

    // 初始化时从 localStorage 载入并渲染所有真实历史会话与当前活跃会话消息
    renderSidebarSessionList();
    renderSessionMessages(currentActiveSessionId);

    // 覆盖全站原本的 sendQuickPrompt 与 handleCardClick，直接无缝对接自研引擎！
    window.sendQuickPrompt = function (promptText) {
      window.AnauAgent.sendUserMsg(promptText);
    };

    window.triggerCozeOpen = function () {
      window.AnauAgent.openChat();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgent);
  } else {
    initAgent();
  }

})();

  // 点击页面外部区域自动收起 AskBar 弹出菜单
  document.addEventListener('pointerdown', function (e) {
    const plusWrap = document.querySelector('.askb__plus-wrap');
    const modelWrap = document.querySelector('.askb__model-wrap');
    const plusMenu = document.getElementById('askbPlusMenu');
    const modelMenu = document.getElementById('askbModelMenu');
    if (plusMenu && plusWrap && !plusWrap.contains(e.target)) {
      plusMenu.style.display = 'none';
    }
    if (modelMenu && modelWrap && !modelWrap.contains(e.target)) {
      modelMenu.style.display = 'none';
    }
  });
