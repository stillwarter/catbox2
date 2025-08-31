import {
  getFileContent,
  overwriteFileContent,
} from "../../utils/fileHandle";
import path from "path";

export const worklogMainList = [
  {
    channel: "updata-worklogJson",
    type: "answer",
    description: "创建更新工作日志json文件",
    handler: async ({ filename, content }) => {
      const jsonpath = path.join(process.baseWorkPath, filename);
      const result = overwriteFileContent(jsonpath, content);
      return result;
    },
  },
  {
    channel: "get-worklogJsonCtx",
    type: "answer",
    description: "获取所有计划内容",
    handler: async (filename) => {
      const jsonpath = path.join(process.baseWorkPath, filename);
      const result = await getFileContent(jsonpath);
      return result;
    },
  },
];
