# Creative MindMap by Brainstorm AI v0.2.0

> **Set a goal, let AI guide you.**

[🇹🇼 繁體中文 (Traditional Chinese)](./README.md) | [🇺🇸 English (英文)](./README_EN.md)

Creative MindMap by Brainstorm AI is an interactive, AI-powered mind mapping tool designed to help you generate ideas, analyze strategies, and visualize connections. It leverages advanced Large Language Models (LLMs) to expand your thinking.

![Screenshot Placeholder](https://github.com/fred-lede/CreativeMindMap/blob/main/CreativeMindMap-1.jpg)

## ✨ Key Features

-   **🤖 AI-Driven Brainstorming**: Generate strategic sub-concepts and actionable ideas automatically.
-   **🧠 Deep Analysis & Path Summary**:
    -   Get structural reports for any node.
    -   Summarize logical thinking paths.
    -   **[NEW]** Supports **Markdown formatting** and **Clickable Web Links** directly within the analysis modal.
-   **🔗 Connection Discovery**: Discover and explain hidden relationships between two nodes.
-   **🔐 Privacy & Security**: All API keys and project data are stored locally in your `localStorage`. No data is sent to 3rd party servers.
-   **🌍 Dual Language Support**: Seamlessly switch between Traditional Chinese and English.
-   **🎨 Customizable UI**: Cyberpunk and Retro themes with various node shapes.

## 🚀 Supported AI Providers

1.  **Google Gemini**
    -   Models: `models/gemini-2.0-flash`, `models/gemini-1.5-pro`, etc.
    -   Features: High-speed, integrated with **Google Search Grounding**.
2.  **OpenAI**
    -   Models: `gpt-4o`, `gpt-4o-mini-search-preview`, etc.
    -   **[NEW]** **Responses API** Support: Configurable **Search Depth** (Low/Medium/High) using OpenAI's built-in web search.
3.  **Local LLM (Ollama)**
    -   **[NEW] Search-Augmented Generation (SAG)**: Integrate `Serper.dev` or `Tavily` APIs for real-time web search even with local models.
    -   Supports: `llama3.1`, `mistral`, `gemma2`, etc.

## 🛠️ Installation & Setup (v0.2.0 Electron)

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn

### Steps
1.  **Clone the repository**
    ```bash
    git clone https://github.com/fred-lede/CreativeMindMap.git
    cd CreativeMindMap
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run in Development mode**
    ```bash
    npm run electron:dev
    ```

4.  **Build the Application**
    ```bash
    npm run electron:build
    ```

## ⚙️ Configuration

### API Connection Testing
The settings panel now features a **[Test Connection]** button for every provider. Verify your API keys instantly.

### Web Search Settings
-   **Gemini**: Enable "Web Search" directly.
-   **OpenAI**: Choose Low/Medium/High search depth when enabled.
-   **Local**: Select Serper or Tavily as your search provider (requires corresponding API key).

### Using Local LLM (Ollama)
Set CORS origins to allow connections to your local Ollama instance.

1.  **Set `OLLAMA_ORIGINS` Environment Variable**:
    -   **Windows (PowerShell)**: `$env:OLLAMA_ORIGINS="*"; ollama serve`
    -   **macOS / Linux**: `OLLAMA_ORIGINS="*" ollama serve`

2.  **Remote Ollama**: 
    If connecting to a remote Ollama server, ensure the **Endpoint URL** is correctly configured in settings. Version 0.2.0 features improved cross-origin request handling.

## 📄 License

MIT License
