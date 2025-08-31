import path from 'path'
import { isDevelopment } from './pathResolver'

export function getImgPath () {
  let basePath

  if (isDevelopment()) {
    // 开发环境：使用项目根目录
    basePath = path.join(__dirname, '../', '../', 'public', 'MdImage') // 根据实际目录结构调整
  } else {
    // 生产环境：使用应用安装目录
    if (process.platform === 'win32') {
      // Windows 系统
      let parentpath = path.dirname(process.execPath)
      basePath = path.join(parentpath, 'resources', 'public', 'MdImage')
    } else if (process.platform === 'darwin') {
      // macOS 系统 (应用通常在 .app 包内)
      basePath = path.join(app.getAppPath(), '../..')
    } else {
      // Linux 系统
      basePath = path.dirname(process.execPath)
    }
  }

  // 组合最终路径
  return basePath
}
