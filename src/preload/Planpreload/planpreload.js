import { createIpcMethod } from "../../utils/ipc/ipcRenderHandle";

export const planPreloadList = {
  createPlanJson: createIpcMethod("create-planJson", true),
  getPlanJson: createIpcMethod("get-planJsonCtx", true),
};
