const fs = require("fs").promises;
const path = require("path");

// 定义Git相关特征文件/目录
const GIT_MARKERS = [".git", ".gitignore", ".gitattributes", ".github"];
const publicDir = path.resolve(__dirname, "public");

/**
 * 检查目录是否包含Git相关文件
 * @param {string} dirPath - 要检查的目录路径
 * @returns {boolean} 是否包含Git相关文件
 */
async function hasGitFiles(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (GIT_MARKERS.includes(entry.name)) {
        return true;
      }
      // 检查子目录
      if (entry.isDirectory()) {
        const subDir = path.join(dirPath, entry.name);
        if (await hasGitFiles(subDir)) {
          return true;
        }
      }
    }
    return false;
  } catch (err) {
    console.error(`检查目录出错 ${dirPath}:`, err.message);
    return false;
  }
}

/**
 * 递归处理目录，移除包含Git文件的文件夹
 * @param {string} parentDir - 父目录路径
 */
async function processDirectories(parentDir) {
  try {
    const entries = await fs.readdir(parentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(parentDir, entry.name);

        // 先检查子目录是否需要处理
        await processDirectories(dirPath);

        // 检查当前目录是否包含Git文件
        if (await hasGitFiles(dirPath)) {
          console.log(`发现包含Git相关文件的文件夹: ${dirPath}`);
          // 彻底移除该文件夹及所有内容
          await fs.rm(dirPath, { recursive: true, force: true });
          console.log(`已移除文件夹及内容: ${dirPath}`);
        }
      }
    }
  } catch (err) {
    console.error(`处理目录出错 ${parentDir}:`, err.message);
  }
}

// 主函数
async function main() {
  try {
    // 检查public目录是否存在
    await fs.access(publicDir);
    console.log(`开始检测 ${publicDir} 下包含Git相关文件的文件夹...`);
    await processDirectories(publicDir);
    console.log("检测和清理完成，准备启动项目");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("public目录不存在，无需处理");
    } else {
      console.error("处理过程出错:", err.message);
      process.exit(1); // 出错时终止启动
    }
  }
}

// 执行主函数
main();
