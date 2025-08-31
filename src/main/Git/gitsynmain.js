import fs from "fs";
import path from "path";
import { execa } from "execa";
import { checkMain } from "../../utils/gitFn/check";

export const gitSynMainList = [
  {
    channel: "check-gitClonefiel",
    type: "answer",
    description: "检测是否存在同步文件夹",
    handler: async (path) => {
      const result = checkFolderExists(path);
      return result;
    },
  },
  {
    channel: "set-initFile",
    type: "answer",
    description: "同步文件克隆",
    handler: async ({ baseFilePath, shpath }) => {
      const checkState = await checkMain(shpath);
      if (checkState) {
        try {
          // 执行脚本并获取结果
          const { stdout, stderr } = await execa(shpath, [], {
            // shell: '/bin/bash', // 指定 bash 解释器（Unix）
            cwd: baseFilePath, // 脚本所在目录
            stdio: "pipe", // 捕获输出流
          });
          return stdout;
        } catch (error) {
          console.error("执行失败:", error);
          return error.stderr;
        }
      } else {
        return 0;
      }
    },
  },
];

function checkFolderExists(folderPath) {
  // 解析路径为绝对路径（可选，根据需求决定）
  const absolutePath = path.resolve(folderPath);

  // 检查路径是否存在
  if (fs.existsSync(absolutePath)) {
    // 进一步检查是否是文件夹
    return fs.statSync(absolutePath).isDirectory();
  }
  return false;
}
