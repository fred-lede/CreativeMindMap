const { app, BrowserWindow } = require('electron');
const http = require('http');
const path = require('path');

// ==========================================
// 1. 基礎設定與常數
// ==========================================
const PROXY_PORT = 11435; // 前端連線的 Port
const TARGET_PORT = 11434; // Ollama 預設 Port
const TARGET_HOST = '127.0.0.1';

// 判斷是否為開發環境 (依據您的專案結構，可能需要微調)
const isDev = !app.isPackaged;

// 全域變數，防止視窗被垃圾回收
let mainWindow = null;

// ==========================================
// 2. 啟動內建通用 Proxy (解決 CORS & 支援區網)
// ==========================================
function startLocalProxy() {
  const server = http.createServer((clientReq, clientRes) => {
    // A. 設定 CORS 標頭 (允許前端存取)
    clientRes.setHeader('Access-Control-Allow-Origin', '*');
    clientRes.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    clientRes.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // B. 處理 Preflight (OPTIONS) 請求
    if (clientReq.method === 'OPTIONS') {
      clientRes.writeHead(200);
      clientRes.end();
      return;
    }

    // C. 動態決定目標主機 (支援 /proxy/ 路由)
    let targetHost = TARGET_HOST;
    let targetPort = TARGET_PORT;
    let targetPath = clientReq.url;

    // 檢查是否有 /proxy/ 前綴 (來自前端 Smart Routing)
    const proxyPrefix = '/proxy/';
    if (clientReq.url.startsWith(proxyPrefix)) {
      try {
        // 解析路徑，例如 "/proxy/192.168.1.50:11434/api/generate"
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
        
        // console.log(`[Proxy] Routing to remote: ${targetHost}:${targetPort}`);
      } catch (e) {
        console.warn('[Proxy] URL parsing failed, falling back to localhost');
      }
    }

    // D. 準備轉發選項
    const options = {
      hostname: targetHost,
      port: targetPort,
      path: targetPath,
      method: clientReq.method,
      headers: clientReq.headers,
    };

    // E. 發送請求給 Ollama (本機或遠端)
    const proxyReq = http.request(options, (proxyRes) => {
      // 將 Ollama 的回應標頭寫回給前端
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
      // 將資料流 (Stream) 導回
      proxyRes.pipe(clientRes, { end: true });
    });

    // F. 錯誤處理
    proxyReq.on('error', (e) => {
      console.error(`Proxy Connection Error (${targetHost}:${targetPort}): ${e.message}`);
      if (!clientRes.headersSent) {
        clientRes.writeHead(502);
        clientRes.end(`Proxy Error: Cannot connect to ${targetHost}:${targetPort}. Is Ollama running?`);
      }
    });

    // G. 將前端的 Body 資料導向給 Ollama
    clientReq.pipe(proxyReq, { end: true });
  });

  // H. 啟動伺服器並處理 Port 衝突
  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.error(`Error: Port ${PROXY_PORT} is already in use. Proxy failed to start.`);
    } else {
      console.error('Proxy Server Error:', e);
    }
  });

  try {
    server.listen(PROXY_PORT, () => {
      console.log(`[Internal Proxy] Listening on http://127.0.0.1:${PROXY_PORT}`);
    });
  } catch (e) {
    console.error('Failed to start proxy:', e);
  }
}

// ==========================================
// 3. 建立視窗邏輯
// ==========================================
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    resizable: true,
    frame: true,
    title: "AI Brainstorming",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // 配合您的專案設定
      webSecurity: false,      // 雖然有 Proxy，但保持 false 相容性最高
    },
  });

  // 視窗關閉事件
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    // 開發模式：連線 Vite Server
    // ⚠️ 請確認您的 Vite Port 是否為 5173，若不是請自行修改
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 生產模式：載入打包檔案
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// ==========================================
// 4. 應用程式生命週期 (含單一實例鎖定)
// ==========================================

// 嘗試獲取鎖定 (回傳 true 代表我是第一個實例)
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // 如果拿不到鎖，代表已經有另一個視窗在跑了，直接退出
  app.quit();
} else {
  // 我是第一個實例，設定事件監聽

  // 當第二個實例試圖啟動時，會觸發此事件
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus(); // 把視窗彈到最前面
    }
  });

  // 應用程式準備就緒
  app.whenReady().then(() => {
    startLocalProxy(); // 1. 啟動 Proxy
    createWindow();    // 2. 建立視窗
  });

  // 所有視窗關閉時
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // macOS 點擊 Dock 圖示時
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}