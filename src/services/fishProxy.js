import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { Stconfig } from '../config/stconfig'
let proxyServer = null
export const createProxy = () => {
  const app = express()

  // 配置代理规则：将/api请求转发到目标跨域服务器
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://fishpi.cn', // 目标跨域服务器地址
      changeOrigin: true, // 转发时修改请求头中的Host为目标服务器
      //   pathRewrite: { '^/api': '' }, // 移除请求路径中的/api前缀
      // 携带Cookie转发（关键：确保跨域请求能传递Cookie）
      cookieDomainRewrite: '', // 保留原始Cookie的域名信息
      secure: true, // 开发环境可设为 false（HTTPS 目标服务器建议保持 true）
      withCredentials: true, // 允许跨域携带凭证
      onProxyRes: (proxyRes, req, res) => {
        // 可选：修改响应头，解决跨域相关问题
        proxyRes.headers['Access-Control-Allow-Origin'] =
          'localhost:' + MAIN_WINDOW_VITE_DEV_SERVER_URL
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true'
      }
    })
  )

  // 启动代理服务器（端口号避免与前端冲突，如3001）
  proxyServer = app.listen(Stconfig.proxyFishPort, () => {
    console.log('代理服务器启动在 http://localhost:' + Stconfig.proxyFishPort)
    console.log(
      MAIN_WINDOW_VITE_DEV_SERVER_URL,
      'MAIN_WINDOW_VITE_DEV_SERVER_URL'
    )
    process.ProxyServer = true
  })
}

/**
 * 关闭代理服务器
 */
export const closeProxy = () => {
  if (proxyServer) {
    // 关闭服务器，停止接收新连接并终止现有连接
    proxyServer.close(err => {
      if (err) {
        console.error('关闭代理服务器时出错:', err)
      } else {
        process.ProxyServer = false
        proxyServer = null // 重置服务器实例
      }
    })
  }
}

