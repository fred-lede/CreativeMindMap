# Brainstorm AI (創意發散)

> **設定目標，讓 AI 成為您的策略顧問。**  
> Set a goal, let AI guide you.

[🇨🇳 繁體中文 (Traditional Chinese)](./README.md) | [🇺🇸 English (英文)](./README_EN.md)

Brainstorm AI 是一個互動式的 AI 心智圖工具，旨在幫助您發想創意、分析策略並視覺化各種關聯。無論您是在規劃行銷活動、撰寫故事，還是整理思緒，Brainstorm AI 都能利用先進的大型語言模型 (LLMs) 來擴展您的思考邊界。

![Screenshot Placeholder](https://via.placeholder.com/800x450?text=Brainstorm+AI+Interface)

## ✨ 核心功能 (Key Features)

-   **🤖 AI 驅動腦力激盪**: 輸入核心主題，讓 AI 自動生成策略性的子概念與可執行的想法。
-   **🧠 深度分析**: 點選任意節點，獲取結構化的分析報告，包含定義、關聯性與關鍵因素。
-   **🔗 探索關聯**: 選取兩個節點，讓 AI 發掘並解釋它們之間隱藏的關聯。
-   **📝 路徑總結**: 自動總結從核心主題到任意特定節點的邏輯路徑。
-   **🌍 雙語支援**: 無縫在 **繁體中文** 與 **英文** 之間切換，並自動翻譯概念。
-   **🎨 高度客製化介面**:
    -   多種主題：極簡白 (Default)、暗黑科技 (Cyberpunk)、復古紙張 (Retro)。
    -   可調整節點形狀：圓形、圓角矩形、膠囊形。
    -   自動佈局與力導向圖形 (Force-Directed Graph)。
-   **🔍 Google 搜尋整合**: (僅限 Gemini) 利用 Google 搜尋的即時數據來增強 AI 的回答準確度。

## 🚀 支援的 AI 供應商

1.  **Google Gemini** (推薦)
    -   模型：`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro`
    -   特色：回應速度快，整合 **Google Web Search**。
2.  **OpenAI**
    -   模型：`gpt-4o`, `gpt-4-turbo`
3.  **Local LLM (Ollama)**
    -   注重隱私，在您的本機上運行。
    -   支援模型：`llama3`, `mistral` 等。

## 🛠️ 安裝與設定

###先決條件
-   Node.js (v16 或更高版本)
-   npm 或 yarn

### 步驟
1.  **Clone 儲存庫**
    ```bash
    git clone https://github.com/fred-lede/CreativeMindMap.git
    cd CreativeMindMap
    ```

2.  **安裝依賴套件**
    ```bash
    npm install
    ```

3.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```

4.  **在瀏覽器中開啟**
    前往 `http://localhost:5173` (或終端機中顯示的網址)。

## ⚙️ 設定說明

### 設定 API Key
1.  點擊側邊欄的 **設定 (Settings)** 圖示。
2.  選擇您的 **供應商 (Provider)** (Gemini 或 OpenAI)。
3.  在欄位中輸入您的 API Key。
    -   *Key 僅會儲存在您瀏覽器的 `localStorage` 中，不會上傳至伺服器。*

### 使用本機 LLM (Ollama)
若要透過 Ollama 使用本機模型，您必須設定 CORS 以允許瀏覽器連線到您的本機 Ollama 實例。

1.  **設定 `OLLAMA_ORIGINS` 環境變數**:
    -   **macOS / Linux**:
        ```bash
        OLLAMA_ORIGINS="*" ollama serve
        ```
    -   **Windows**:
        設定使用者環境變數 `OLLAMA_ORIGINS` 的值為 `*`，然後重新啟動 Ollama。

2.  **HTTPS 連線問題**:
    如果您透過 HTTPS (或某些特定的網路環境) 執行此應用程式，瀏覽器可能會阻擋連線至 `http://localhost:11434`。
    -   **解決方案**: 使用 `ngrok` 為您的本機 Ollama 建立通道 (Tunnel)：
        ```bash
        ngrok http 11434 --host-header="localhost:11434"
        ```
    -   然後在應用程式的設定中，將 **Endpoint URL** 填入 ngrok 提供的網址。

## 🎮 使用指南

1.  **開始新專案**: 輸入關鍵字 (例如："2025 行銷計畫") 與背景脈絡。點擊 **分析並啟動**。
2.  **延伸想法**: 點擊任意節點以生成相關的子節點。
3.  **編輯節點**: 雙擊節點以編輯文字。
4.  **工具操作**:
    -   **右鍵點擊**: 選取節點。
    -   **多選**: 右鍵點擊多個節點以使用 "探索關聯" 功能。
    -   **儲存/載入**: 使用側邊欄管理多個腦力激盪專案。

## 📄 授權 (License)

MIT License
