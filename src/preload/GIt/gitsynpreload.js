import { createIpcMethod } from "../../utils/ipc/ipcRenderHandle";

export const gitSynPreloadList = {
  checkSynPath: createIpcMethod("check-gitClonefiel", true),
  initSynFile: createIpcMethod("set-initFile", true),
};
