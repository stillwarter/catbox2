import { createIpcMethod } from '../../utils/ipc/ipcRenderHandle'

export const mdPreloadList = {
  getMdMarkList: createIpcMethod('get-mdlist-info'),
  addMdDirectoryRoot: createIpcMethod('set-mdDirectoryRoot-add', true),
  addMdDirectory: createIpcMethod('set-mdDirectory-add', true),
  addMdFile: createIpcMethod('set-mdflie-add', true),
  delMdDirectory: createIpcMethod('set-directory-delete', true),
  delMdFile: createIpcMethod('set-mdflie-delete', true),
  renameMdDir: createIpcMethod('set-directory-rename', true),
  renameMdFile: createIpcMethod('set-mdflie-rename', true),
  getMdContent: createIpcMethod('get-mdfile', true),
  setMdContent: createIpcMethod('set-mdfile', true),
  uploadMdImg: createIpcMethod('upload-mdImg', true)
}
