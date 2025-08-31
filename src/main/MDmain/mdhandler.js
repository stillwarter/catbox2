import {
  getDirectoryFiles,
  createDirectory,
  createFile,
  deleteDirectory,
  deleteFile,
  renameDirectory,
  renameFile,
  getFileContent,
  overwriteFileContent,
  uploadImg
} from '../../utils/fileHandle'
import { getFilePath } from '../../utils/path/pathResolver'
import path from 'path'

const aimpath = getFilePath()
export async function handle_getMdMarkList () {
  return await getDirectoryFiles(aimpath, true, true)
}

export async function handle_createDirectroyRoot (pathname) {
  const directorypath = path.join(aimpath, pathname.toString())
  return await createDirectory(directorypath, true, true)
}

export async function handle_createDirectroy (pathname) {
  return await createDirectory(pathname, true, true)
}

export async function handle_createFile (pathname) {
  return await createFile(pathname)
}

export async function handle_delDirectory (pathname) {
  return await deleteDirectory(pathname)
}

export async function handle_delMdFile (pathname) {
  return await deleteFile(pathname)
}

export async function handle_renamedirectory ({ oldpath, newpath }) {
  const parentname = path.dirname(oldpath)
  const newpathname = path.join(parentname, newpath)
  return await renameDirectory(oldpath, newpathname)
}

export async function handle_renamefile ({ oldpath, newpath }) {
  const newpathname = path.join(path.dirname(oldpath), newpath)
  return await renameFile(oldpath, newpathname)
}

export async function handle_getMdContent (pathname) {
  return await getFileContent(pathname)
}

export async function handle_setMdContent ({ pathname, content, meta }) {
  return await overwriteFileContent(pathname, content, meta)
}

export async function handle_uploadImg ({ content, imgtype }) {
  return await uploadImg(content, imgtype)
}
