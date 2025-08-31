import { createFile,overwriteFileContent, readAllFilesContent } from "../../utils/fileHandle";
import path from "path";

export const planMainList = [
  {
    channel: "create-planJson",
    type: "answer",
    description: "创建计划json文件",
    handler: async ({ filename, content }) => {
      const jsonpath = path.join(process.basePlanPath, filename);
      const result = overwriteFileContent(jsonpath, content);
      return result;
    },
  },
  {
    channel: "get-planJsonCtx",
    type: "answer",
    description: "获取所有计划内容",
    handler: async () => {
      const path = process.basePlanPath;
      const result = await readAllFilesContent(path);
      return result;
    },
  },
];
