const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
const isMac = process.platform === "darwin";
const isWin = process.platform === "win32";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    resizable: true,
    maximizable: true,
    fullscreenable: true,
    frame: false, // 無標題列，靠 React TitleBar
    transparent: false,

    ...(isWin && {
      thickFrame: true,          
      backgroundColor: "#ffffff", 
    }),

    ...(isMac && {
      titleBarStyle: "hiddenInset",
    }),

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // React TitleBar IPC
  ipcMain.on("window:minimize", () => win.minimize());
  ipcMain.on("window:maximize", () =>
    win.isMaximized() ? win.unmaximize() : win.maximize()
  );
  ipcMain.on("window:close", () => win.close());
}

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(createWindow);