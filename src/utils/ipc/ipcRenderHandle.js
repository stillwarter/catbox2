import { contextBridge } from "electron";
import { ipcRenderer } from "electron-better-ipc";

// 存储已注册的API方法，用于跟踪
const registeredApis = new Map();

/**
 * 注册IPC方法并通过contextBridge暴露到渲染进程
 * @param {string} apiNamespace - 暴露到window的命名空间（如"electronAPI"）
 * @param {Object} ipcMethods - IPC方法配置对象
 * @param {Function} ipcMethods[methodName] - 方法实现，内部应调用ipcRenderer相关方法
 */
export function registerIpcApis(apiNamespace, ipcMethods) {
  if (typeof apiNamespace !== "string" || !apiNamespace) {
    throw new Error("API命名空间必须是有效的字符串");
  }

  if (typeof ipcMethods !== "object" || ipcMethods === null) {
    throw new Error("IPC方法配置必须是对象");
  }

  // 检查是否已注册过该命名空间
  if (registeredApis.has(apiNamespace)) {
    console.warn(`API命名空间 "${apiNamespace}" 已存在，将合并新方法`);
  }

  // 合并已有方法和新方法
  const existingMethods = registeredApis.get(apiNamespace) || {};
  const mergedMethods = { ...existingMethods, ...ipcMethods };

  // 暴露API到渲染进程
  contextBridge.exposeInMainWorld(apiNamespace, mergedMethods);

  // 更新注册记录
  registeredApis.set(apiNamespace, mergedMethods);

  console.log(
    `已注册IPC API到命名空间 "${apiNamespace}"，方法列表:`,
    Object.keys(mergedMethods)
  );
}

/**
 * 创建调用主进程的IPC方法
 * @param {string} channel - IPC通道名称
 * @param {boolean} [withArgs=false] - 是否需要传递参数
 * @returns {Function} 可直接调用的IPC方法
 */
export function createIpcMethod(channel, withArgs = false) {
  if (withArgs) {
    return (...args) => ipcRenderer.callMain(channel, ...args);
  }
  return () => ipcRenderer.callMain(channel);
}

// 示例：使用封装的函数注册API
// 等同于你提供的示例代码，但更具扩展性
// registerIpcApis("electronAPI", {
//   // 获取当前时间（无参数）
//   getCurrentTime: createIpcMethod("get-time"),

//   // 可以添加更多方法
//   getSystemInfo: createIpcMethod("get-system-info"),
//   showMessage: createIpcMethod("show-message", true), // 带参数的方法
// });

// module.exports = {
//   registerIpcApis,
//   createIpcMethod,
// };
