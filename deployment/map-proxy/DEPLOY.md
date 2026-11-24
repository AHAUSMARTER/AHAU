# 地图代理迁移（尚未完成）

## 已确认的问题

2026-11-24 用户手机直连当前 `chatgpt.site/health` 显示
“Sorry, you have been blocked / You are unable to access chatgpt.site”。
这确认该用户网络访问当前托管域名被拦截；不据此断言所有国内网络均不可达。
服务端自身健康和 CORS 检查成功，不代表手机网络可达。

当前线上地址仍是原 Sites 代理，迁移未完成，不能标记手机直连已修复。

## 可部署内容

`server.mjs` 用 Node.js 标准库适配 `worker.mjs`，无 npm 依赖。
可在支持 Node.js 自定义启动命令 / HTTP Web 函数的平台运行。

- Node.js 22 或更新版本。
- 启动命令 `node server.mjs`；默认监听 `0.0.0.0:9000`。
- 环境变量 `AMAP_JS_KEY`、`AMAP_SECURITY_CODE` 分别保存高德 JS Key / 安全密钥。
- `PUBLIC_BASE_URL` 必须填云平台实际分配的 HTTPS 公开访问地址，不能编造。
- HTTP 入口仅允许 GET / OPTIONS；供网站调用的公网查询入口需要可匿名访问。
- 开放 HTTP 入口会允许公开网站访问地图查询；保留来源限制、固定接口白名单和配额监控。
- 若平台要求不同监听端口，设置 `PORT`。适配器按实际连接 IP 作演示级限流；若云平台统一转发，限流会合并计算，需正式上线前用平台网关限流替代。
- 本包不含实际凭据。云账号创建、实名、条款及任何付费服务由用户在控制台处理。

## 切换及验收

1. 获得真实 HTTPS 函数地址，设置 `PUBLIC_BASE_URL` 并重新部署。
2. 在用户手机原来的普通网络打开 `/health`，确认可访问。
3. 验证网站来源发起的 `/config` 跨域请求、地点、坐标转换和步行查询。
4. 只修改根目录 `campus_map_config.json` 的 `proxy_base_url` 为新地址；提交并发布 GitHub Pages。
5. 同一台手机验证地图、定位权限、校内外提示和路线。完成前不宣称“无需 VPN 的手机访问已验收”。
6. 新服务验收通过后再停用原 Sites 代理。回滚只需恢复配置文件旧地址。

参考：阿里云函数计算 HTTP 触发器支持公网访问地址和匿名调用：
https://help.aliyun.com/zh/functioncompute/configure-an-http-trigger-for-a-function-and-invoke-the-function-by-using-http-requests
此资料说明能力，不代表该用户已开通服务或享有免费额度。
