import { md5Encrypt } from '../common'
import axios from 'axios'

/* 获取鱼排key */
export async function getFishKey (name, pwd) {
  const result = await axios.post('http://localhost:3001/api/getKey', {
    nameOrEmail: name,
    userPassword: md5Encrypt(pwd),
    mfaCode: ''
  })
  return result
}

/* 帖子上传 */
export async function uploadArticle (parmas) {
  const result = await axios.post('http://localhost:3001/article', parmas, {
    withCredentials: true
  })
  return result
}

/* 帖子更新 */
export async function uploadArticlePut (id,parmas) {
  const result = await axios.put(`http://localhost:3001/article/${id}`, parmas, {
    withCredentials: true
  })
  return result
}

/* 上传fish图床 */
export async function uploadFishImage (parmas) {
  const result = await axios.post('http://localhost:3001/upload', parmas, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data;'
    }
  })
  return result
}

/* 获取md内的urlimg地址 */
export function extractMdImageUrls (mdContent) {
  // 正则表达式匹配Markdown图片语法
  // 匹配格式：![alt](url) 或 ![alt](url "title")
  const imgRegex = /!\[(?=.*图片).*?\]\((.*?)(\s+"[^"]+")?\)/g

  const urls = []
  let match

  // 循环匹配所有图片
  while ((match = imgRegex.exec(mdContent)) !== null) {
    // 第一个捕获组就是图片的URL
    const url = match[0].trim()
    urls.push(url)
  }

  return urls
}

/* 获取url地址【】内名称 */
/**
 * 从Markdown图片语法中提取![]里的alt文本
 * @param {string} mdImageSyntax - Markdown图片语法字符串（如"![图片1755780669863](http://xxx)"）
 * @returns {string|null} 提取到的alt文本，若不匹配则返回null
 */
export function extractAltTextFromMdImage (mdImageSyntax) {
  // 正则表达式：匹配![alt](url)中的alt部分
  const altRegex = /!\[(.*?)\]\(.*?\)/

  // 执行匹配
  const match = mdImageSyntax.match(altRegex)

  // 若匹配成功，返回第一个捕获组（alt文本），否则返回null
  return match ? match[1] : null
}

/* 地址替换 */
/**
 * 替换Markdown中指定图片的URL
 * @param {string} mdContent - 原始Markdown内容
 * @param {string} name - 要匹配的图片alt文本（![]中的内容）
 * @param {string} newUrl - 替换后的新URL
 * @returns {string} 替换后的Markdown内容
 */
export function replaceMdImageUrl (mdContent, name, newUrl) {
  // 构建匹配特定alt文本的正则表达式
  // 转义name中的特殊字符，避免影响正则匹配
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // 匹配格式：![name](oldUrl) 或 ![name](oldUrl "title")
  const regex = new RegExp(
    `(!\\[${escapedName}\\]\\()(.*?)(\\s+"[^"]+")?(\\))`,
    'g'
  )

  // 替换URL：保留alt和可选标题，仅替换旧URL为newUrl
  return mdContent.replace(regex, (match, prefix, oldUrl, title, suffix) => {
    // 如果有标题，保留标题部分；否则直接拼接
    return title
      ? `${prefix}${newUrl}${title}${suffix}`
      : `${prefix}${newUrl}${suffix}`
  })
}
