# 🏀 BALLTO 运动社交 (AI-Powered Sports Social App)

![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-FF6F00?logo=google)

**BALLTO** 是一款基于 LBS（地理位置服务）与大模型技术的 AI 赋能运动社交小程序/Web应用。本项目从“产品视角”出发，旨在解决年轻群体在线下运动中“找场难、找人慢、互动门槛高”的痛点，通过 AI Agent 主动撮合匹配，并利用多模态大模型降低 UGC 内容创作门槛。

---

## ✨ 核心功能 (Core Features)

### 📍 1. 找场馆 (LBS 动态雷达)
* **动态地理位置**：真实调用浏览器 `navigator.geolocation` API 获取用户当前经纬度坐标。
* **智能筛选**：支持按运动类型（篮球、羽毛球、飞盘等）快速过滤周边场馆。
* **场馆状态可视化**：直观展示场馆的“拥挤度”、“距离”与“价格”，辅助用户快速决策。

### 🤝 2. 组局与社交 (AI 智能撮合)
* **AI Agent 主动推送**：打破传统的“被动等待”，系统基于距离和用户画像（如水平标签），模拟 AI Agent 主动向潜在用户推送个性化组局邀请（“局找人”）。
* **组局大厅**：清晰展示局的状态、人数、费用及发起人信用分，建立核心交易/社交撮合机制。

### 📸 3. 运动社区 (AI 瞬间生成器)
* **大模型 UGC 赋能**：接入 **Google Gemini 3.1 Flash** 大模型。用户只需输入简单的情绪标签（如 `#累但爽`）并上传照片，AI 即可自动生成适合发朋友圈的运动文案。
* **动态信息流**：支持将 AI 生成的动态真实发布并插入到社区信息流顶部，完成完整的内容生产闭环。

### 👤 4. 用户中心 (资产沉淀与 AI 助理)
* **详细身体数据看板**：记录并展示用户的身高、体重、静息心率、BMI 等核心健康数据。
* **运动数据统计**：展示本周运动距离、总时长和总场次。
* **AI 运动助理**：调用大模型，结合用户历史数据（时长、卡路里、击败同城比例等），生成鼓励性与专业性兼具的周度个性化复盘报告。
* **动态设置面板**：包含账号信息、隐私授权状态（位置信息可见性）等高保真交互。

---

## 🛠️ 技术栈 (Tech Stack)

* **前端框架**: React 19 + TypeScript
* **构建工具**: Vite 6
* **样式方案**: Tailwind CSS 4 (Mobile-First 响应式设计)
* **AI 引擎**: `@google/genai` (Google Gemini 3.1 Pro/Flash)
* **图标库**: Lucide React
* **其他**: HTML5 Geolocation API, FileReader API

---

## 🚀 快速开始 (Getting Started)

### 1. 克隆项目
```bash
git clone https://github.com/yourusername/ballto-sports-social.git
cd ballto-sports-social
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
在项目根目录创建一个 `.env` 文件，并填入你的 Google Gemini API Key：
```env
VITE_GEMINI_API_KEY="your_gemini_api_key_here"
```
*(注：本项目在 AI Studio 环境中默认通过 `process.env.GEMINI_API_KEY` 注入，本地运行请确保 Vite 配置能正确读取环境变量)*

### 4. 启动开发服务器
```bash
npm run dev
```
打开浏览器访问 `http://localhost:3000` 即可预览。建议在浏览器开发者工具中开启**移动端模拟器（如 iPhone 14 Pro）**以获得最佳体验。

---

## 💡 产品设计思考 (Product Thinking)

本项目不仅是一个前端工程，更是一份**产品经理（AI PM）的实战作品集**。
* **痛点切入**：传统运动社交靠微信群，效率低且水平不匹配。BALLTO 引入 AI Agent，将“人找局”升级为“局找人”。
* **降低门槛**：运动后用户有分享欲但缺乏文案能力，AI 瞬间生成器完美解决了“发圈难”的问题，极大提升了社区的活跃度（DAU/MAU）。
* **情绪价值**：AI 运动助理不仅提供冷冰冰的数据，更提供带有鼓励性质的周度复盘，增强了产品的用户粘性与留存率。

详细的产品需求文档 (PRD) 请查看项目根目录下的 [`BALLTO_产品说明文档.md`](./BALLTO_产品说明文档.md)。

---

## 📄 许可证 (License)

本项目基于 [MIT License](LICENSE) 开源。欢迎 Fork 和 Star！⭐️
