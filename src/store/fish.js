import { defineStore } from 'pinia'

// 定义并导出一个 store
export const useFishStore = defineStore('Fishpi', {
  // 状态
  state: () => ({
    fishkey: 0
  }),

  actions: {
    setFishkey (key) {
      this.fishkey = key
    },
    clearFishKey () {
      this.fishkey = 0
    }
  },
  persist: {
    storage: localStorage,

    serializer: {
      // 覆盖全局过期时间（例如：设置 token 过期时间为 48 小时）
      serialize: value => {
        return JSON.stringify({
          data: value,
          timestamp: Date.now()
        })
      },
      deserialize: value => {
        const parsed = JSON.parse(value)
        const expireTime = 3600000 * 48
        if (Date.now() - parsed.timestamp > expireTime) {
          return { fishkey: 0 } // 过期后重置为初始值
        }
        return parsed.data
      }
    }
  }
})
