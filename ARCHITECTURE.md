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
