// process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
import { app, BrowserWindow, Menu } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { Stconfig } from "./config/stconfig";
import { MainEventList } from "./main/index";
import { registerIpcHandlers } from "./utils/ipc/ipcMainHandle";
import { startStaticServer, stopStaticServer } from "./services/staticImg";
import { createProxy, closeProxy } from "./services/fishProxy";
import { getFilePath, getFilePathTwo } from "./utils/path/pathResolver";
process.baseFilePath = getFilePath();
process.basePlanPath = getFilePathTwo("public/Plan");
process.baseWorkPath = getFilePathTwo("public/Worklog");
if (started) {
  app.quit();
}

// 确保应用单实例运行
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // 主窗口创建
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    title: Stconfig.projname,
    icon: path.join(__dirname, "penicon.ico"),
    // frame: false, // 不显示边框和工具栏
    autoHideMenuBar: true, // 隐藏菜单栏
    menuBarVisible: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
    fullscreen: false,
  });
  // Menu.setApplicationMenu(null);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.on("did-finish-load", () => {
      // 可选：仅在需要时通过代码打开
      mainWindow.webContents.openDevTools();
    });
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  // mainWindow.webContents.openDevTools();

  // 窗口事件监听
  mainWindow.on("closed", () => {});
};

app.whenReady().then(async () => {
  registerIpcHandlers(MainEventList);

  try {
    await startStaticServer(Stconfig.staticImgPort);
    await createProxy();
    createWindow();
  } catch (err) {
    console.error("初始化失败:", err);
  }
});

app.on("will-quit", () => {
  stopStaticServer();
  closeProxy();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
