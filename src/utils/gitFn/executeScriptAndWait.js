// import { shell } from "electron";
// import shell from "shelljs";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * 执行脚本并等待其完成后返回结果
 * @param {string} scriptPath - 脚本绝对路径
 * @param {number} [timeout=60000] - 超时时间(毫秒)，默认60秒
 * @returns {Promise<string>} 执行成功返回'ok'，失败返回错误信息
 */
export async function executeScriptAndWait(scriptPath, timeout = 60000) {
  shell.beep();
  // 1. 验证脚本是否存在
  try {
    await fs.access(scriptPath);
  } catch {
    return `错误：脚本文件不存在 - ${scriptPath}`;
  }

  // 2. 创建唯一标记文件路径（用于检测脚本是否执行完毕）
  const markerDir = path.join(
    require("os").tmpdir(),
    "electron-script-markers"
  );
  await fs.mkdir(markerDir, { recursive: true });
  const markerFile = path.join(markerDir, `${uuidv4()}-marker.txt`);

  // 3. 生成包装脚本（原脚本执行完毕后创建标记文件）
  let wrapperScriptContent = "";
  const scriptExt = path.extname(scriptPath).toLowerCase();

  // 根据脚本类型生成不同的包装逻辑（支持.sh和.bat）
  if (scriptExt === ".sh") {
    // Unix/Linux/macOS的shell脚本
    wrapperScriptContent = `#!/bin/bash
# 执行原始脚本
"${scriptPath}"
# 无论原始脚本成功与否，都创建标记文件
echo "done" > "${markerFile}"
`;
  } else if (scriptExt === ".bat" || scriptExt === ".cmd") {
    // Windows的批处理脚本
    wrapperScriptContent = `@echo off
:: 执行原始脚本
call "${scriptPath}"
:: 创建标记文件
echo done > "${markerFile}"
`;
  } else {
    return `错误：不支持的脚本类型 - ${scriptExt}`;
  }

  // 4. 写入临时包装脚本
  const wrapperScriptPath = path.join(
    markerDir,
    `${uuidv4()}-wrapper${scriptExt}`
  );
  await fs.writeFile(wrapperScriptPath, wrapperScriptContent);
  // 给shell脚本添加执行权限（Unix系统）
  if (scriptExt === ".sh") {
    await fs.chmod(wrapperScriptPath, 0o755);
  }

  try {
    // 5. 用shell.openPath执行包装脚本
    const openError = await shell.openPath(wrapperScriptPath);
    if (openError) {
      return `打开脚本失败：${openError}`;
    }

    // 6. 轮询等待标记文件出现（判断脚本是否执行完毕）
    return await new Promise((resolve) => {
      const checkInterval = 500; // 每500ms检查一次
      let elapsedTime = 0;

      const checkMarker = async () => {
        // 超时处理
        if (elapsedTime >= timeout) {
          return resolve(`错误：脚本执行超时（超过${timeout}ms）`);
        }

        try {
          // 检查标记文件是否存在
          await fs.access(markerFile);
          // 标记文件存在 = 脚本已执行完毕
          resolve("ok");
        } catch {
          // 标记文件不存在 = 脚本仍在执行
          elapsedTime += checkInterval;
          setTimeout(checkMarker, checkInterval);
        }
      };

      // 开始第一次检查
      checkMarker();
    });
  } finally {
    // 7. 清理临时文件（无论成功失败都执行）
    try {
      await fs.unlink(wrapperScriptPath);
      await fs.unlink(markerFile); // 即使超时也尝试删除标记文件
    } catch (cleanupErr) {
      console.log("临时文件清理警告：", cleanupErr.message);
    }
  }
}
