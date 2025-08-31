import { ipcMain } from "electron-better-ipc";

/**
 * IPC事件配置项类型
 * @typedef {Object} IpcHandlerConfig
 * @property {string} channel - 事件通道名称
 * @property {'answer'|'on'} type - 事件类型 (answer: 需要响应, on: 仅监听)
 * @property {Function} handler - 事件处理函数
 * @property {string} [description] - 事件描述（用于调试）
 */

/**
 * 注册单个IPC事件
 * @param {IpcHandlerConfig} config - 事件配置
 */
export function registerIpcHandler(config) {
  const { channel, type, handler, description = "未描述" } = config;

  try {
    // 根据类型注册不同的IPC事件
    if (type === "answer") {
      ipcMain.answerRenderer(channel, async (...args) => {
        try {
          return await handler(...args);
        } catch (error) {
          console.error(
            `[IPC响应错误] 通道: ${channel}, 描述: ${description}`,
            error
          );
          throw error;
        }
      });
    } else if (type === "on") {
      ipcMain.on(channel, async (...args) => {
        try {
          await handler(...args);
        } catch (error) {
          console.error(
            `[IPC监听错误] 通道: ${channel}, 描述: ${description}`,
            error
          );
        }
      });
    }

    console.log(
      `[IPC注册成功] 通道: ${channel}, 类型: ${type}, 描述: ${description}`
    );
  } catch (error) {
    console.error(`[IPC注册失败] 通道: ${channel}, 原因:`, error);
  }
}

/**
 * 批量注册IPC事件
 * @param {IpcHandlerConfig[]} handlers - 事件配置数组
 */
export function registerIpcHandlers(handlers) {
  if (!Array.isArray(handlers)) {
    console.error("IPC注册失败: 必须提供一个事件配置数组");
    return;
  }

  console.log(`开始注册${handlers.length}个IPC事件...`);
  handlers.forEach(registerIpcHandler);
  console.log("IPC事件注册完成");
}
