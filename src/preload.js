import { registerIpcApis } from "./utils/ipc/ipcRenderHandle";
import { ipcRenderList } from "./preload/index";

console.log(ipcRenderList);

registerIpcApis("electronAPI", { ...ipcRenderList });
