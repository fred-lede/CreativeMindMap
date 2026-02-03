# 💡 Brainstorm AI (Electron 桌面應用程式)

「Brainstorm AI」是一款強大的心智圖工具，深度整合了多種 AI 模型，包括 Google Gemini、OpenAI (ChatGPT) 和本地部署的 Ollama。它不僅提供直觀的心智圖介面，更透過 AI 輔助您的策略發想、知識探索和內容創作。

<p align="center">
  <b>CreativeMindMap UI Preview</b>
</p>

<table align="center">
  <tr>
    <td align="center">
      <img src="CreativeMindMap-1.jpg" width="380"><br>
      <sub>Main UI</sub>
    </td>
    <td align="center">
      <img src="CreativeMindMap-2.jpg" width="380"><br>
      <sub>Settings</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="CreativeMindMap-3.jpg" width="380"><br>
      <sub>AI Deep Analysis & Path Summary</sub>
    </td>
    <td align="center">
      <img src="CreativeMindMap-4.jpg" width="380"><br>
      <sub>Connect</sub>
    </td>
  </tr>
</table>

這個版本是基於 Electron 框架構建的桌面應用程式，相較於 Tauri 版本，Electron 版本在本地 Ollama 連線部分，**已內建 Smart Proxy (智慧代理伺服器)**，這意味著：

*   您 **無需手動設定 `OLLAMA_ORIGINS` 環境變數**。
*   您 **無需安裝 Ngrok** 來解決 HTTPS 環境下的混合內容問題。
*   您可以直接輸入本地或區網的 Ollama URL，應用程式會自動處理連線和代理。

## ✨ 主要特色

*   **多模型支援：** 無縫切換 Google Gemini、OpenAI (GPT-3.5/GPT-4o/GPT-4o-mini/GPT-4-Turbo) 及本地 Ollama 模型 (例如：Llama3)。
*   **AI 輔助發想：** 輸入核心主題和背景脈絡，AI 將自動生成策略、拓展分支概念，幫助您深入探索議題。
*   **網路搜尋整合：**
    *   **Gemini：** 結合 Google 搜尋進行即時網路資訊查詢。
    *   **OpenAI：** 支援 OpenAI 官方即時網頁搜尋 (Requires `gpt-4o-mini-search-preview` or other search-enabled models)
    *   **本地模型 (Ollama)：** 可整合 Serper.dev 或 Tavily 外部搜尋 API，實現「搜尋增強生成 (Search-Augmented Generation, SAG)」。
*   **視覺化心智圖：** 直觀拖曳、點擊展開、雙擊編輯，並支援自動佈局、置中視角、縮放。
*   **多語言介面：** 支援繁體中文和英文介面。
*   **主題與節點樣式：** 多種介面主題 (極簡白、暗黑科技、復古紙張) 和節點形狀 (圓形、圓角矩形、藥丸狀) 可供選擇。
*   **專案管理：** 儲存、載入、新建、刪除專案，支援 JSON 格式匯入匯出。
*   **歷史記錄與復原：** 無限步數的撤銷 (Undo) 和重做 (Redo) 功能。
*   **深度分析工具：** 針對心智圖節點進行「深度分析」、「路徑總結」及「探索關聯」，生成詳細報告。

## 🚀 快速開始

### 1. 下載已編譯的可執行檔（更方便）

除了原有的從原始碼安裝方式外，您也可以直接下載已編譯好的可執行檔，這是更方便的選擇。官方 Releases 頁面提供對應各平台的安裝檔，支援：

*   **macOS**
*   **Windows**
*   **Ubuntu (Linux)**

請至 [Releases 頁面](https://github.com/fred-lede/CreativeMindMap/releases) 下載對應平台的版本。

### 2. 從原始碼安裝與啟動

如果您希望自行開發或從原始碼運行：

1.  **克隆專案：**
    ```bash
    git clone https://github.com/fred-lede/CreativeMindMap.git
    cd CreativeMindMap
    ```
2.  **安裝依賴：**
    ```bash
    npm install
    ```
3.  **啟動 Electron 開發模式：**
    ```bash
    npm run electron:dev
    ```

### 3. 建置與打包應用程式 (自行編譯)

若要自行將應用程式打包成可執行檔，請運行：
```bash
npm run electron:build
```
建置完成後，可執行檔將會輸出到專案根目錄下的 `release` 資料夾中。

### 2. Ollama 連線設定 (Electron 版本：零配置！)

Electron 版本內建了智慧代理 (Smart Proxy)，大幅簡化了 Ollama 連線配置。

1.  **啟動 Ollama 應用程式：** 確保您的 Ollama 桌面應用程式或服務正在運行。
2.  **在設定中輸入 Ollama API URL：**
    *   **本地 Ollama：** 保持預設值 `http://127.0.0.1:11434/api/generate` 即可。
    *   **區網內其他電腦的 Ollama：** 直接輸入遠端電腦的 IP 地址和 Port，例如 `http://192.168.1.50:11434/api/generate`。
    
    應用程式內建的 Smart Proxy 會自動處理跨域 (CORS) 和混合內容 (Mixed Content) 問題，無需額外設定。
3.  **測試連線：** 點擊「測試連線」按鈕，確認是否能成功連接並獲取模型列表。

### 3. API Key 設定 (Google Gemini / OpenAI / Serper / Tavily)

1.  進入應用程式的「設定」(`Settings`)。
2.  選擇您想要使用的 AI 模型供應商 (Gemini, OpenAI, Local)。
3.  輸入對應的 API Key。
    *   **Google Gemini：** 需要 Gemini API Key。
    *   **OpenAI：** 需要 OpenAI API Key。
    *   **Serper.dev / Tavily：** 如果您希望本地 Ollama 模型也能進行網路搜尋，請選擇其中一個搜尋提供商並輸入其 API Key。

## 🛠️ 開發

本專案使用以下技術棧：

*   **前端：** React + Vite
*   **UI 框架：** Tailwind CSS
*   **圖形渲染：** 原生 SVG (無額外圖形庫，輕量高效)
*   **桌面框架：** Electron
*   **圖示：** Lucide React Icons

### 專案結構

```
├── public/                 # 靜態資源
├── src/                    # 應用程式前端原始碼
│   ├── App.jsx             # Electron 版本主應用程式邏輯
│   └── ...                 # 其他組件和工具
├── electron/               # Electron 主進程相關檔案
│   └── main.cjs            # Electron 主進程入口檔案
├── index.html              # HTML 模板
├── package.json            # 專案配置
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
└── release/                # 打包後的應用程式編譯檔 (建置後生成)
```

## 許可證

[MIT 許可證](LICENSE)

---
