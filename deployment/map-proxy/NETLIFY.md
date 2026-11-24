# Netlify Free 候选部署

## 当前状态（2026-11-24）

用户手机关闭 VPN 后，成功打开官方演示
https://edge-functions-examples.netlify.app/ ，显示“Edge Functions on Netlify”。
这是域名/网络初筛，不能替代本项目的真实部署、跨域、地图、定位和路线验收。
目前还未创建 Netlify 项目、未向 Netlify 上传高德密钥、没有新代理 URL。
阿里云函数计算按用户要求保持未开通。

## 免费范围

查阅时 Netlify Free 为每月300 credits硬上限，不提供自动充值，额度耗尽暂停到下周期或手动升级。
不要选择付费试用或升级方案。资源、请求、流量及部署均可能消耗额度，实际以账号控制台显示为准。
高德 API 的免费配额独立计算，不受 Netlify 免费方案替代。

官方：
https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/

## 导入现有 GitHub 仓库

1. 注册 Netlify 并选择 Free。接受协议、授权 GitHub 等操作由用户确认；只需授权 AHAU 仓库。
2. 从 GitHub 导入 `AHAUSMARTER/AHAU`，分支 `main`。
3. Base directory 设为 `deployment/map-proxy`。该目录含 `netlify.toml`，Publish directory 为相对 Base 的 `public`。无构建命令、无第三方依赖。
4. 首先不设置密钥，部署后检查真实的 `https://平台实际分配地址/health`。应返回 `configured:false`，且在手机普通网络下能访问。
5. 经用户授权，在 Netlify 环境变量中配置 `AMAP_JS_KEY` 与 `AMAP_SECURITY_CODE`，作用域须含 Functions；不可放到 `netlify.toml` 或 public 目录。修改后重新部署。
6. 用项目 GitHub Pages 来源验证 `/config`、地点、坐标转换与步行路线。代理仍只开放源码白名单路由。
7. 验收通过后，将根目录 `campus_map_config.json` 的 `proxy_base_url` 改为真实 HTTPS 部署地址，再发布 GitHub Pages，并在手机上验证完整地图。
8. 新入口验收通过后再停用旧 Sites 代理。回滚只需恢复配置文件。

官方接口说明：
https://docs.netlify.com/build/edge-functions/environment-variables/
https://docs.netlify.com/build/edge-functions/api/
https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/

## 结构

`netlify/edge-functions/map-proxy.js` 是平台适配器，复用 `worker.mjs`。
`public/` 仅发布静态服务说明，不包含代理源码、环境文件或安全密钥。
三个显式路径匹配 `/health`、`/config`、`/_AMapService/*`，不拦截所有静态资源。
限流使用平台提供的客户 IP，只用于演示级请求限流，不作为用户定位或身份认证。

## 2026-11-24 部署进行中

- 已创建用户自己的 Free 项目 `ahau-hfnk`（项目 ID `eab04195-6932-488f-85b0-e88289c33793`）。
- 控制台 Base directory 已设为 `deployment/map-proxy`，Publish directory 为 `public`。
- 经用户明确授权，已把两项高德配置设为 Secret，仅为 Live app 提供值；版本、分支、Agent runs、本地上下文不提供值。Free 计划不支持细选 scope，保留平台默认的服务端 scope，没有升级套餐。
- 当前还需重新构建并验证 Edge Function 及公开访问，尚未切换地图页面的代理入口。
