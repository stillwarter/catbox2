import express from 'express'
import { getImgPath } from '../utils/path/pathStaticimg'
let server = null

/**
 * 启动静态图片服务
 * @param {string} imgPath - 图片目录路径
 * @param {number} port - 服务端口
 * @returns {Promise} 启动结果
 */
function startStaticServer (port = 8283) {
  return new Promise((resolve, reject) => {
    if (server) {
      // 已启动则直接返回
      resolve(server)
      return
    }

    const app = express()
    const imgPath = getImgPath()
    app.use(express.static(imgPath))

    server = app.listen(port, err => {
      if (err) {
        console.error('静态服务启动失败:', err)
        reject(err)
        return
      }
      console.log(`静态图片服务启动成功，端口: ${port}`)
      process.staticImg = true
      resolve(server)
    })
  })
}

/**
 * 关闭静态图片服务
 */
function stopStaticServer () {
  if (server) {
    server.close(err => {
      if (err) {
        console.error('静态服务关闭失败:', err)
      } else {
        console.log('静态图片服务已关闭')
        process.staticImg = false
        server = null
      }
    })
  }
}

export { startStaticServer, stopStaticServer }
