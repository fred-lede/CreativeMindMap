# Brainstorm AI

> **Set a goal, let AI guide you.**

[🇨🇳 繁體中文 (Traditional Chinese)](./README.md) | [🇺🇸 English (英文)](./README_EN.md)

Brainstorm AI is an interactive, AI-powered mind mapping tool designed to help you generate ideas, analyze strategies, and visualize connections. Whether you're planning a marketing campaign, writing a story, or just organizing your thoughts, Brainstorm AI leverages advanced Large Language Models (LLMs) to expand your thinking.

![Screenshot Placeholder](https://via.placeholder.com/800x450?text=Brainstorm+AI+Interface)

## ✨ Key Features

-   **🤖 AI-Driven Brainstorming**: Enter a core topic and let the AI automatically generate strategic sub-concepts and actionable ideas.
-   **🧠 Deep Analysis**: Select any node to get a structural analysis including definition, relevance, and key factors.
-   **🔗 Connection Discovery**: Select two nodes to have the AI discover and explain hidden relationships between them.
-   **📝 Path Summary**: Automatically summarize the logical path from the root topic to any specific node.
-   **🌍 Dual Language Support**: Seamlessly switches between Traditional Chinese and English, with automatic translation of concepts.
-   **🎨 Customizable UI**:
    -   Multiple Themes: Default (Minimal), Cyberpunk (Dark Mode), Retro (Paper).
    -   Adjustable Node Shapes: Circle, Rounded, Pill.
    -   Auto-Layout & Force-Directed Graph.
-   **🔍 Google Search Grounding**: (Gemini Only) Enhance AI responses with real-time data from Google Search.

## 🚀 Supported AI Providers

1.  **Google Gemini** (Recommended)
    -   Models: `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro`
    -   Features: Fast response, **Web Search** integration.
2.  **OpenAI**
    -   Models: `gpt-4o`, `gpt-4-turbo`
3.  **Local LLM (Ollama)**
    -   Privacy-focused, runs locally on your machine.
    -   Supports models like `llama3`, `mistral`, etc.

## 🛠️ Installation & Setup

### Prerequisites
-   Node.js (v16 or higher)
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

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` (or the URL shown in your terminal).

## ⚙️ Configuration

### Setting up API Keys
1.  Click the **Settings** icon in the sidebar.
2.  Select your **Provider** (Gemini or OpenAI).
3.  Enter your API Key in the field provided.
    -   *Keys are stored locally in your browser's `localStorage`.*

### Using Local LLM (Ollama)
To use a local model via Ollama, you must configure CORS to allow the browser to connect to your local Ollama instance.

1.  **Set the `OLLAMA_ORIGINS` environment variable**:
    -   **macOS / Linux**:
        ```bash
        OLLAMA_ORIGINS="*" ollama serve
        ```
    -   **Windows**:
        Set a User Environment Variable named `OLLAMA_ORIGINS` with value `*`, then restart Ollama.

2.  **HTTPS Issues**:
    If you are running the app via HTTPS (or some specific network setups), browsers may block connections to `http://localhost:11434`.
    -   **Workaround**: Use `ngrok` to tunnel your local Ollama instance:
        ```bash
        ngrok http 11434 --host-header="localhost:11434"
        ```
    -   Then enter the ngrok URL in the App's settings under **Endpoint URL**.

## 🎮 Usage Guide

1.  **Start a Project**: Enter a keyword (e.g., "2025 Marketing Plan") and context. Click **Analyze & Start**.
2.  **Expand Ideas**: Click on any node to generate related sub-nodes.
3.  **Edit Nodes**: Double-click a node to edit its text.
4.  **Tools**:
    -   **Right-Click**: Select a node.
    -   **Multi-Select**: Right-click multiple nodes to use "Explore Connect".
    -   **Save/Load**: Use the sidebar to manage multiple brainstorming sessions.

## 📄 License

MIT License
