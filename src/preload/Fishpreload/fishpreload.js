import { createIpcMethod } from '../../utils/ipc/ipcRenderHandle'

export const fishPreloadList = {
  loadMd2Fish: createIpcMethod('set-loadMdfile',true)
}
