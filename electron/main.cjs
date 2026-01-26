const { app, BrowserWindow } = require('electron');
const path = require('path');

// 判斷是否為開發環境
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // 注意：為了簡單起見先關閉隔離，安全性要求高時需調整
    },
    // 如果你有 icon，可以在這裡指定 (Linux/Windows)
    // icon: path.join(__dirname, '../public/icon.png') 
  });

  if (isDev) {
    // 開發模式：載入 Vite 的 localhost
    win.loadURL('http://localhost:5173');
    // 開發模式：自動打開開發者工具 (F12)
    win.webContents.openDevTools();
  } else {
    // 生產模式：載入打包好的 HTML
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

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
