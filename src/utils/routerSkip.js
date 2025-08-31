import { useRouter } from 'vue-router'

// 基础路由跳转
export const goTo = (path, query = {}, replace = false) => {
  const router = useRouter()
  if (replace) {
    return query => router.replace({ path, query })
  } else {
    return (query) => {
      router.push({ path, query })
    }
  }
}

// 返回上一页
export const goBack = () => {
  const router = useRouter()
  return router.back()
}
