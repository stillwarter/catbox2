import { execSync } from "child_process";
import os from "os";
import { access } from "fs/promises";
import { join } from "path";
/**
 * 检查当前系统是否存在Git Bash环境
 * @returns {Object} 包含是否存在及路径的结果
 */
export function checkGitBashExists() {
  // Git Bash在不同系统中的默认路径
  const possiblePaths =
    os.platform() === "win32"
      ? [
          // Windows系统常见路径
          "C:\\Program Files\\Git\\bin\\bash.exe",
          "C:\\Program Files (x86)\\Git\\bin\\bash.exe",
          "C:\\Program Files\\Git\\usr\\bin\\bash.exe",
          "C:\\Users\\" +
            os.userInfo().username +
            "\\AppData\\Local\\Programs\\Git\\bin\\bash.exe",
        ]
      : [
          // macOS/Linux系统通常在环境变量中
          "/bin/bash",
          "/usr/bin/bash",
          "/usr/local/bin/bash",
        ];

  try {
    // 尝试直接执行bash --version命令（检查环境变量中是否存在）
    const versionOutput = execSync("bash --version", {
      stdio: ["ignore", "pipe", "ignore"], // 只捕获stdout
      timeout: 2000, // 超时时间2秒
    }).toString();

    // 验证输出是否包含git bash特征
    if (versionOutput.includes("git") || versionOutput.includes("bash")) {
      return {
        exists: true,
        path: "环境变量中找到的bash",
        version: versionOutput.split("\n")[0] || "未知版本",
      };
    }
  } catch (err) {
    // 环境变量中未找到，检查常见安装路径
    for (const path of possiblePaths) {
      try {
        // 尝试执行指定路径的bash
        execSync(`"${path}" --version`, {
          stdio: ["ignore", "pipe", "ignore"],
          timeout: 2000,
        });
        return {
          exists: true,
          path: path,
          version: "已找到但未获取版本",
        };
      } catch (e) {
        // 该路径不存在，继续检查下一个
        continue;
      }
    }
  }

  // 所有检查都失败
  return {
    exists: false,
    path: null,
    version: null,
  };
}

/**
 * 检测 public/mark/init.sh 是否存在（ESM 格式）
 * @returns {Promise<number>} 存在返回 1，不存在返回 0
 */
async function checkMarkInitSh(path) {
  try {
    // 2. 检测文件是否存在（access 无异常则表示文件存在且可访问）
    await access(path);
    console.log(`✅ 检测到文件：${path}`);
    return 1;
  } catch (err) {
    // 3. 捕获异常（文件不存在或权限不足）
    if (err.code === "ENOENT") {
      console.log(`❌ 文件不存在：${path}`);
    } else {
      console.error(`❌ 检测失败：${err.message}`);
    }
    return 0;
  }
}

export async function checkMain(path) {
  const check = await checkMarkInitSh(path);
  let result = 0;
  if (check) {
    result = checkGitBashExists();
    if (result.exists) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return result;
  }
}

// 4. 执行检测并处理结果（若作为脚本直接运行，可设置进程退出码）
// if (import.meta.url === import.meta.resolve("./check-init-sh.js")) {
//   // 仅当脚本被直接执行时触发（避免被导入时自动运行）
//   checkMarkInitSh()
//     .then((result) => {
//       process.exit(result); // 进程退出码：存在为 1，不存在为 0（便于外部调用判断）
//     })
//     .catch((globalErr) => {
//       console.error(`❌ 全局错误：${globalErr.message}`);
//       process.exit(2); // 未知错误：退出码设为 2
//     });
// }
