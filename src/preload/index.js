import { createIpcMethod } from "../utils/ipc/ipcRenderHandle";
import { mdPreloadList } from "./MDpreload/mdpreload";
import { fishPreloadList } from "./Fishpreload/fishpreload";
import { gitSynPreloadList } from "./GIt/gitsynpreload";
import { planPreloadList } from "./Planpreload/planpreload";
import { worklogPreloadList } from "./Worklogpreload/worklogpreload";
export const ipcRenderList = {
  getsystemInfo: createIpcMethod("get-system-info"),
  ...mdPreloadList,
  ...fishPreloadList,
  ...gitSynPreloadList,
  ...planPreloadList,
  ...worklogPreloadList,
};
