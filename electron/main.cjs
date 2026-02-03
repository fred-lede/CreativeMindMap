const { app, BrowserWindow } = require('electron');
const http = require('http');
const path = require('path');

// --- 內建 CORS Proxy Server 設定 ---
const PROXY_PORT = 11435; // 這是前端要連的 Port
const TARGET_PORT = 11434; // 這是 Ollama 原本的 Port
const TARGET_HOST = '127.0.0.1';

function startLocalProxy() {
  const server = http.createServer((clientReq, clientRes) => {
    // 1. 設定 CORS 標頭 (允許所有來源)
    clientRes.setHeader('Access-Control-Allow-Origin', '*');
    clientRes.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    clientRes.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 2. 處理 Preflight
    if (clientReq.method === 'OPTIONS') {
      clientRes.writeHead(200);
      clientRes.end();
      return;
    }

    // --- [增強功能] 動態決定目標主機 ---
    // 預設目標：本機 Ollama
    let targetHost = TARGET_HOST;
    let targetPort = TARGET_PORT;
    let targetPath = clientReq.url;

    // 支援格式: http://127.0.0.1:11435/proxy/192.168.1.50:11434/api/generate
    // 透過 URL 路徑來指定要連線的區網 IP
    const proxyPrefix = '/proxy/';
    if (clientReq.url.startsWith(proxyPrefix)) {
      try {
        // 解析路徑中的目標，例如 "192.168.1.50:11434/api/generate"
        const pathAfterPrefix = clientReq.url.slice(proxyPrefix.length); 
        const firstSlash = pathAfterPrefix.indexOf('/');
        
        let hostAndPort = '';
        if (firstSlash !== -1) {
            hostAndPort = pathAfterPrefix.substring(0, firstSlash);
            targetPath = pathAfterPrefix.substring(firstSlash);
        } else {
            hostAndPort = pathAfterPrefix;
            targetPath = '/';
        }

        const [h, p] = hostAndPort.split(':');
        if (h) targetHost = h;
        if (p) targetPort = parseInt(p);
        
        console.log(`[Dynamic Proxy] Forwarding to ${targetHost}:${targetPort}${targetPath}`);
      } catch (e) {
        console.warn('Proxy URL parsing failed, falling back to localhost');
      }
    }
    // ----------------------------------

    const options = {
      hostname: targetHost,
      port: targetPort,
      path: targetPath,
      method: clientReq.method,
      headers: clientReq.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(clientRes, { end: true });
    });

    proxyReq.on('error', (e) => {
      console.error(`Proxy Error (${targetHost}): ${e.message}`);
      if (!clientRes.headersSent) {
        clientRes.writeHead(502);
        clientRes.end(`Proxy Error: Cannot connect to ${targetHost}:${targetPort}`);
      }
    });

    clientReq.pipe(proxyReq, { end: true });
  });

  server.listen(PROXY_PORT, () => {
    console.log(`[Internal Proxy] Running at http://127.0.0.1:${PROXY_PORT}`);
  });
}

// 判斷是否為開發環境
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    resizable: true,
    frame: true, // 根據您的需求設定
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // 注意：安全性設定
      webSecurity: false, // 既然有 Proxy，這裡其實可以設為 true 提高安全性，但設為 false 兼容性最高
    },
  });

  if (isDev) {
    // 開發模式
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    // 生產模式
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// --- 在 App 啟動時執行 Proxy 並建立視窗 ---
app.whenReady().then(() => {
  startLocalProxy(); // 1. 先啟動 Proxy
  createWindow();    // 2. 再建立視窗
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});