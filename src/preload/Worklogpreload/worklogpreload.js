import { createIpcMethod } from "../../utils/ipc/ipcRenderHandle";

export const worklogPreloadList = {
  updataWorklogJson: createIpcMethod("updata-worklogJson", true),
  getWorklogJson: createIpcMethod("get-worklogJsonCtx", true),
};
