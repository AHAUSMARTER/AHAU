# 浏览器 OCR 静态依赖

- Tesseract.js 6.0.1：来自 npm 官方 registry 的 tesseract.js 包，Apache-2.0。
- tesseract.js-core 6.0.0：来自 npm 同名包，随包许可证见 licenses/。
- 中文与英文数据：@tesseract.js-data/chi_sim 和 @tesseract.js-data/eng 1.0.0 的 4.0.0_best_int 数据；上游 https://github.com/tesseract-ocr/tessdata_best （Apache-2.0）。
- 只保存浏览器发布文件、WASM、语言数据及许可证；不执行依赖安装脚本。文件校验值见 SHA256SUMS.json。
- 组件按需加载，首选图时下载所需核心和语言数据，后续语言数据可由浏览器缓存。实际首次下载不是整个目录所有核心版本。
- 图片通过本机 Blob/Canvas 在 Web Worker 中处理，无 OCR 上传接口或付费账户；只在用户点击解析后发送其确认的题目文字到原有接口。
- 这是印刷文字 OCR，不是公式识别或视觉推理模型；清晰字体仍可能误识别数学符号，必须校对。复杂公式、手写、几何图不作为已验收能力。

官方实现与部署文档：https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md
