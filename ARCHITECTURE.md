# 当前架构与目标接口边界

## 当前系统结构

```text
浏览器
  ├─ 多页面 UI：index.html / diagnosis.html / math_lab.html / plaza.html 等
  ├─ 主要智能体逻辑与静态校园知识：anau_agent.js
  ├─ 样式：anau_agent.css
  ├─ 会话历史：浏览器 localStorage
  └─ 同源相对路径请求
       ├─ GitHub Pages 静态站点：根目录 HTML/CSS/JS + `notices.json` 官方快照
       └─ 本地开发服务（`anau_agent_service.py`，`127.0.0.1:8088`，仅本地实时演示）
            ├─ 静态文件白名单服务
            ├─ JSON API
            ├─ 官方通知列表采集与 5 分钟内存缓存
            └─ 校级 DeepSeek API（urllib，ANAU_DEEPSEEK_API_KEY）
```

GitHub Pages 只提供静态文件，不运行 Python。线上通知页读取带采集时间的 `notices.json` 官方快照；本地开发服务可以实时采集，但不是已确认可供全校访问的生产后端。不能仅凭静态发布材料推断生产模型代理、密钥配置或数据库部署已完成。

## 模块关系

- **页面层**：独立 HTML 页面引入共享 CSS/JS，负责大厅、聊天、诊断、函数探究及广场等界面。
- **智能体前端**：`anau_agent.js` 管理本地意图/工作流、校园静态知识、模型请求和 UI；部分能力在浏览器端执行。
- **会话层**：`anau_real_chat_sessions` 与活动会话 ID 保存于 `localStorage`；不具备服务端用户隔离或跨设备同步。
- **本地服务**：`anau_agent_service.py` 使用 `ThreadingHTTPServer` 绑定 loopback 地址，向浏览器提供白名单静态资源及 API。
- **模型网关**：Python `request_model` 读取 `ANAU_DEEPSEEK_API_KEY`，通过 `urllib` 请求 `https://llmv1.ahau.edu.cn/v1/chat/completions`；目标模型 `Deepseek-V4.1-Flash-SS`。可达性依赖校园网环境。
- **知识资料**：部分内嵌于 JS 的 `AHAU_KB` 和本地文本/JSON/图片资产；未发现独立知识库服务或完整 RAG 管线。

## 当前可见 API

| 方法与路径 | 用途 | 现状说明 |
|---|---|---|
| `GET /api/anau/ping` | 本地服务存活探测 | 返回在线状态。 |
| `GET /api/anau/campus_network_status` | 校级模型连通探测 | 实际向模型发送短 ping，消耗一次模型请求；只反映当时网络状态。 |
| `POST /api/anau/chat_completions` | 聊天模型代理 | 接收消息数组，服务端请求校级模型并返回完整 JSON；不是流式接口。 |
| `POST /api/anau/deepseek_diagnose` | 错题解析 | 接收题目 prompt，加入固定系统提示词后请求模型。 |
| `GET /api/anau/notices`（本地演示） | 官方通知查询 | 从代码白名单内的学校官网、教务处、农学院、机械与车辆工程学院（工学院）、人工智能学院栏目读取标题/日期/链接；支持关键词、部门、类别和日期筛选；`refresh=1` 强制刷新。默认进程内缓存 5 分钟，不落数据库；部分来源失败时返回成功来源并附错误。该 Python 服务不在 GitHub Pages 上运行。 |
| `POST /api/anau/open_path` | 本机打开路径 | 演示用本地桌面能力；属于高影响本机操作，后续需严格限制允许路径与调用来源。 |
| `POST /api/anau/deploy_workspace` | 本机生成演示工作区 | 会创建文件、调用系统打开程序/通知；不是学校业务系统提交。 |

部分 POST 路由检查本地 Host 与同源 Origin；`open_path`、`deploy_workspace` 的实现还应单独做安全审查。模型代理目前检查消息数组存在，但本次核对未见完整的 role、长度、token 等服务端参数白名单校验。

## 数据库现状

本地项目中未发现数据库 schema、ORM 配置或迁移文件。已确认的持久化数据只有浏览器端 `localStorage` 会话；静态校园资料随代码或文件存放。不要在规划中假定已经有数据库。若以后需通知/知识库持久化，先依据比赛演示部署形态选择轻量存储并说明初始化、备份和迁移方案；不为竞赛原型预先引入复杂数据库架构。

## 增量扩展建议（规划，不代表已实现）

```text
前端查询/管理组件
  └─ 固定、受校验的 Python API
       ├─ notices：通知来源与真实通知检索
       ├─ knowledge：后续资料解析、检索和来源引用
       ├─ locations / procedures：经核实地点与办事流程
       ├─ tools：固定注册工具，调用上述查询服务
       └─ admin / observability：后续权限、维护、审计和统计
```

通知页为 `notices.html`，优先尝试同源通知 API；静态托管不可用时回退到 `notices.json` 快照，页面显示采集时间与覆盖范围。快照来自固定官方来源：`https://www.ahau.edu.cn/`（官网“通知公告”模块）、教务处、农学院、机械与车辆工程学院（工学院）和人工智能学院。来源抓取使用 HTTPS 证书校验、固定白名单与有限响应体；展示列表仅保留可识别发布日期的通知链接，避免把栏目导航链接混入结果。只包含各栏目列表页当前返回的条目，不遍历全部历史分页；页面不调用 DeepSeek 生成通知。后续管理员采集/维护路由及 `GET /api/locations`、`GET /api/procedures` 仍属规划；持久化选型和迁移须在具体模块开发前确定。通知查询应直接以真实记录为依据并展示原始 URL；模型不可执行任意 SQL 或取得任意文件/系统命令权限。

## 已知边界与开发注意

- DeepSeek 服务要求校园网可达；本地代码存在探测和请求路径，但本文件不宣称已在特定校园网/比赛网络实测通过。
- 模型响应当前非流式，有超时但无已确认自动重试；会话历史在浏览器侧。
- 静态页面与本地服务部署模式不同。比赛演示应按实际入口验证；学校正式部署架构由指导老师和学校后续确定。
- 校园通知、政策、楼宇位置等需要可靠数据来源；不能用模型补造缺失记录。
- 修改本机操作接口前应进行安全限制审查；不要把演示桌面能力误当作可公开部署的 API。

## 校园地图模块（竞赛演示）

- `campus_map.html` / `campus_map.css` / `campus_map.js` 为独立原生页面，首页校园工具入口直达；查询参数 `?q=图书馆` 可直接发起地点查询。
- GitHub Pages 前端通过同源 `campus_map_config.json` 选择代理，当前向 `https://ahau-hfnk.netlify.app/config` 获取公开 JS API Key 与代理地址；高德 JS API 2.0 用 `serviceHost` 经独立 Worker 代理读取高德地点/步行路线服务。安全密钥仅在托管环境变量，不进入前端或 Git。
- 独立代理无学校系统、模型或数据库访问权限。固定上游 HTTPS 域名、GET 路由白名单、来源限制、响应大小限制与演示级 IP 限流；浏览器 SDK Key 在请求中可见，应配合高德域名白名单。源码及维护说明见 `deployment/map-proxy/`。
- 使用高德返回的 GCJ-02 地点，搜索限定合肥并按 `campus_map/campus_boundary.json` 校园参考多边形过滤。该范围来自 OpenStreetMap way 498810020，采集于 2026-11-24，经高德 GPS→GCJ-02 转换，非学校测绘范围；页面披露来源及 ODbL 归属。定位需主动点击授权，使用设备 Geolocation，禁用 IP 定位替代；WGS-84 坐标经高德转换后才绘制蓝点及精度圈。项目不持久化用户坐标，托管平台可能有请求日志。
- 步行路线和时间只展示高德返回值，失败不生成替代路线。实时导航通过外链交给高德；网页不提供语音转向引导。
- `campus_map/` 两张现有图片作备用方位图，提供切换、放大、滚动和原图入口；不从示意图推算经纬度或步行距离。
- 不新增数据库。回滚可移除首页入口、回退三份地图文件并停用独立代理，不影响原有问答与通知页。

### 校园范围与定位判断

- `campus_map_geometry.mjs` 提供点在多边形内、距边界距离及路线分段采样检查。地图 `mask` 遮蔽校外，并用 `setLimitBounds` / 缩放范围约束视图；校外 POI 不进入列表，经过校外的步行路线不展示。
- 仅精度有效且精度圈不接触边界时判断校内外。定位点在校园内但精度超过150米，或定位精度圈碰到参考边界时，提示无法确认；远在校外且精度圈不触及边界时显示指定校外提示。判断不能作为认证或出勤凭据。
- 校内定位绘制蓝点与精度圈并设为起点；校外清除旧位置，不将校外点作为起点，禁用路线/导航。拒绝权限、超时、系统位置不可用不误报校外。
- 客户端设备坐标通过固定代理白名单 `/v3/assistant/coordinate/convert` 转换；不使用服务端 IP、VPN 出口或校园默认中心冒充用户位置。
- 界面保留地图、搜索、路线三部分；定位按钮固定在地图内，地图类型用单个选择器，详细路线与数据说明折叠。

### 手机网络故障与代理迁移

2026-11-24 用户手机访问旧 Sites 代理域名被拦截。前端通过同源 `campus_map_config.json` 选择代理，现已切换为 Netlify；旧域名不再是当前依赖。配置、校园边界、代理连接、地图脚本各阶段提供独立错误提示。`deployment/map-proxy/server.mjs` 保留无依赖 Node.js HTTP 适配，供以后其他平台使用。

当前 Netlify 适配位于 `deployment/map-proxy/netlify/edge-functions/`，复用原 Worker，只匹配三类查询路径，环境变量由 `Netlify.env.get` 读取；发布目录独立为 `public/`，不发布服务端源码与凭据。操作步骤及计费边界见 `deployment/map-proxy/NETLIFY.md`。

### 当前代理入口：Netlify Free（2026-11-24）

- 已部署项目 `ahau-hfnk`（ID `eab04195-6932-488f-85b0-e88289c33793`），生产公开、部署预览私有；基础目录 `deployment/map-proxy`，发布目录 `public`，按目录变更触发构建。
- 高德两项配置已按用户授权保存为 Netlify Secret。只给 Live app 配置值；版本预览、分支、Agent runs、本地上下文不提供值。Free 不支持细选 scope，平台默认服务端 scope 未升级。
- 用户手机普通网络关闭VPN后确认 `https://ahau-hfnk.netlify.app/health` 返回 `configured:true`。公开配置、真实地点、坐标转换、步行查询及 GitHub 来源 CORS 检查通过。
- 当前配置文件已切换至 Netlify；这是对旧 Sites 域名手机被拦截问题的迁移。旧地址仅作历史记录与暂时回滚，不作为当前前端依赖。完整手机地图、系统定位权限与校园实地导航仍需终端核实。
- Free 控制台确认300 credits/月；无升级、绑卡、充值操作。额度是托管用量，不是高德配额；用尽会暂停服务。

- 切换后原 GitHub Pages 地图页面已通过浏览器实测：底图、图书馆搜索、勤学楼南门至图书馆704米步行路线及导航入口均正常。手机健康检查通过不替代完整手机地图和GPS验收。

## 错题工坊浏览器 OCR（2026-11-24）

`diagnosis.html` → `diagnosis_ocr.js` → 同源 `lib/ocr/` Tesseract.js Web Worker / WASM / 中英文语言数据 → 可编辑识别结果 → 用户确认填入题目 → 原有 `POST /api/anau/deepseek_diagnose`。

识别过程不向 OCR 第三方或模型上传图片，不新增后端 API、账户、数据库或付费资源。依赖固定版本、来源、许可证与文件校验记录见 `lib/ocr/README.md`。首次选图才加载识别资源；数据可在浏览器缓存。界面分别处理识别中、待校对、成功、失败和取消；未经确认不覆盖已有输入，不把空白识别或图片指纹匹配当作识别成功。原图在页面使用 Blob URL，取消后释放，不落持久化存储。

当前只承诺印刷文字 OCR，复杂公式、手写、图形含义仍需另行接入经确认可用的视觉模型。学校 API 未说明支持图片，因此本次仍仅向现有解题接口发送用户校对后的文字，未更换 DeepSeek 调用。GitHub Pages 没有该 Python API，OCR 可用并不意味着线上实时解题闭环已完成。

## 恢复后的模型调用路径（2026-11-24，优先于上文历史描述）

大厅 `anau_agent.js` 与错题工坊 `diagnosis.html` 共用 `campus_model.js`。GitHub Pages → 浏览器 → 固定学校 `https://llmv1.ahau.edu.cn/v1/chat/completions`，模型仍为 `Deepseek-V4.1-Flash-SS`。本地等非GitHub入口优先保留同源Python代理，失败后进入学校直连。直连是否成功取决于设备校园网可达性、有效Key、TLS信任及学校CORS许可，不能仅凭站点托管位置判定失败。

直连Key由用户在“模型连接”窗口输入，默认仅页面内存，可主动勾选sessionStorage留在同一标签页供刷新/页面跳转使用。兼容既有 `anau_custom_api_key`，不再启动即删除。请求不允许改学校目标地址，禁止重定向发送Authorization，不把Key放入URL、日志、会话消息、源码或地图代理。清除配置按钮移除本机保存的Key。学校共享Key仍应放在受控后端，不恢复公开硬编码；这是应用户要求恢复的按设备配置路径。

错题OCR依旧只在本机识别，用户校对的文字通过上述通道解题。模型正文经过现有安全Markdown处理。失败时展示明确原因，预置样题与内置规则不标记为实时模型成功。后端和直连的测试使用模拟响应，校园网实测单独验收。
