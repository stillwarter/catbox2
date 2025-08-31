import path from "path";
import { app } from "electron";
import { Stconfig } from "../../config/stconfig";

/**
 * @returns {boolean} 是否为开发环境
 */
function isDevelopment() {
  // 通过环境变量或 app.isPackaged 判断
  return process.env.NODE_ENV === "development" || !app.isPackaged;
}

/**
 * 获取文件的正确路径（适配开发/生产环境）
 * @returns {string} 处理后的绝对路径
 */
function getFilePath() {
  let basePath;

  if (isDevelopment()) {
    // 开发环境：使用项目根目录
    basePath = path.join(__dirname, "../", "../", "public", Stconfig.markpath); // 根据实际目录结构调整
  } else {
    // 生产环境：使用应用安装目录
    if (process.platform === "win32") {
      // Windows 系统
      let a = path.dirname(process.execPath);
      basePath = path.join(a, "resources", "public", Stconfig.markpath);
    } else if (process.platform === "darwin") {
      // macOS 系统 (应用通常在 .app 包内)
      basePath = path.join(app.getAppPath(), "../..");
    } else {
      // Linux 系统
      basePath = path.dirname(process.execPath);
    }
  }

  // 组合最终路径
  return basePath;
}

function getFilePathTwo(aimpath) {
  let basePath;

  if (isDevelopment()) {
    // 开发环境：使用项目根目录
    basePath = path.join(__dirname, "../", "../", aimpath); // 根据实际目录结构调整
  } else {
    // 生产环境：使用应用安装目录
    if (process.platform === "win32") {
      // Windows 系统
      const parent = path.dirname(process.execPath);
      basePath = path.join(parent, "resources", aimpath);
    } else if (process.platform === "darwin") {
      // macOS 系统 (应用通常在 .app 包内)
      basePath = path.join(app.getAppPath(), "../..");
    } else {
      // Linux 系统
      basePath = path.dirname(process.execPath);
    }
  }

  // 组合最终路径
  return basePath;
}

export { isDevelopment, getFilePath, getFilePathTwo };
