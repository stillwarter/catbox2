import crypto from 'crypto-js'

export function isEmptyObject (obj) {
  // 先判断是否为对象类型，且不是 null
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }
  // 判断 判断对象自身可枚举属性的数量是否为 0
  return Object.keys(obj).length === 0
}

export function fileToBuffer (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      const arrayBuffer = event.target.result
      const buffer = new Uint8Array(arrayBuffer)
      resolve(buffer)
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.readAsArrayBuffer(file)
  })
}

export function md5Encrypt (data) {
  return crypto.MD5(data).toString().toLowerCase()
}
