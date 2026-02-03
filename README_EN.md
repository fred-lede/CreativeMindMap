# 💡 Brainstorm AI (Electron Desktop Application)

"Brainstorm AI" is a powerful mind mapping tool deeply integrated with various AI models, including Google Gemini, OpenAI (ChatGPT), and locally deployed Ollama. It not only provides an intuitive mind mapping interface but also assists your strategic brainstorming, knowledge exploration, and content creation with AI.

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

This version is built on the Electron framework as a desktop application. Compared to the Tauri version, the Electron version features a **built-in Smart Proxy** for local Ollama connections, which means:

*   You **DO NOT need to manually set the `OLLAMA_ORIGINS` environment variable**.
*   You **DO NOT need to install Ngrok** to resolve mixed content issues in HTTPS environments.
*   You can directly enter local or LAN Ollama URLs, and the application will automatically handle the connection and proxy.

## ✨ Key Features

*   **Multi-Model Support:** Seamlessly switch between Google Gemini, OpenAI (GPT-3.5/GPT-4o/GPT-4o-mini/GPT-4-Turbo), and local Ollama models (e.g., Llama3).
*   **AI-Assisted Brainstorming:** Input core topics and context, and AI will automatically generate strategies and expand branch concepts to help you explore issues in depth.
*   **Web Search Integration:**
    *   **Gemini:** Integrates with Google Search for real-time web information queries.
    *   **OpenAI:** Supports OpenAI official real-time web search (Requires `gpt-4o-mini-search-preview` or other search-enabled models).
    *   **Local Models (Ollama):** Can integrate with Serper.dev or Tavily external search APIs for "Search-Augmented Generation (SAG)".
*   **Visual Mind Map:** Intuitive drag, click to expand, double-click to edit, with support for auto-layout, centering view, and zooming.
*   **Multi-Language Interface:** Supports Traditional Chinese and English interfaces.
*   **Themes and Node Styles:** Choose from various interface themes (Minimal White, Cyberpunk Dark, Retro Paper) and node shapes (Circle, Rounded Rectangle, Pill).
*   **Project Management:** Save, load, create new, delete projects, and support JSON format import/export.
*   **History and Undo/Redo:** Unlimited undo and redo functionality.
*   **Deep Analysis Tools:** Perform "Deep Analysis," "Path Summary," and "Explore Connections" on mind map nodes to generate detailed reports.

## 🚀 Quick Start

### 1. Download Compiled Executables (More Convenient)

In addition to the original source installation method, you can also download the pre-compiled executables directly, which is a more convenient choice. The official Releases page provides installers for various platforms, supporting:

*   **macOS**
*   **Windows**
*   **Ubuntu (Linux)**

Please download the version for your platform from the [Releases page](https://github.com/fred-lede/CreativeMindMap/releases).

### 2. Install and Launch from Source

If you prefer to develop or run from source:

1.  **Clone the project:**
    ```bash
    git clone https://github.com/fred-lede/CreativeMindMap.git
    cd CreativeMindMap
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Launch the Electron development mode:**
    ```bash
    npm run electron:dev
    ```

### 3. Build and Package the Application (Self-Compile)

To package the application into an executable yourself, run:
```bash
npm run electron:build
```
After building, the executables will be output to the `release` folder in the project root directory.

### 2. Ollama Connection Setup (Electron Version: Zero Config!)

The Electron version includes a built-in Smart Proxy, significantly simplifying Ollama connection configuration.

1.  **Start Ollama Application:** Ensure your Ollama desktop application or service is running.
2.  **Enter Ollama API URL in Settings:**
    *   **Local Ollama:** Keep the default value `http://127.0.0.1:11434/api/generate`.
    *   **Ollama on another computer in the LAN:** Directly enter the remote computer's IP address and Port, e.g., `http://192.168.1.50:11434/api/generate`.

    The application's built-in Smart Proxy will automatically handle Cross-Origin Resource Sharing (CORS) and Mixed Content issues, requiring no additional setup.
3.  **Test Connection:** Click the "Test Connection" button to confirm successful connection and retrieve the model list.

### 3. API Key Configuration (Google Gemini / OpenAI / Serper / Tavily)

1.  Go to the application's "Settings".
2.  Select your desired AI model provider (Gemini, OpenAI, Local).
3.  Enter the corresponding API Key.
    *   **Google Gemini:** Requires a Gemini API Key.
    *   **OpenAI:** Requires an OpenAI API Key.
    *   **Serper.dev / Tavily:** If you want local Ollama models to perform web searches, choose one of these search providers and enter its API Key.

## 🛠️ Development

This project uses the following tech stack:

*   **Frontend:** React + Vite
*   **UI Framework:** Tailwind CSS
*   **Graphics Rendering:** Native SVG (no extra graphics libraries, lightweight and efficient)
*   **Desktop Framework:** Electron
*   **Icons:** Lucide React Icons

### Project Structure

```
├── public/                 # Static assets
├── src/                    # Application frontend source code
│   ├── App.jsx             # Main application logic for Electron version
│   └── ...                 # Other components and utilities
├── electron/               # Electron main process related files
│   └── main.cjs            # Electron main process entry file
├── index.html              # HTML template
├── package.json            # Project configuration
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── release/                # Packaged application executables (generated after build)
```

## License

[MIT License](LICENSE)

---
