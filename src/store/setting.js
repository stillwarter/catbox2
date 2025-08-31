import { defineStore } from 'pinia'

// 定义并导出一个 store
export const useSetStore = defineStore('setting', {
  // 状态
  state: () => ({
    theme: 'default'
  }),

  actions: {
    themeDefault () {
      this.theme = 'default'
    },
    themeDark () {
      this.theme = 'dark'
    }
  },
  persist: {
    // 存储键名，默认是 store 的 id
    key: 'setting',
    // 存储位置：localStorage (默认) 或 sessionStorage
    storage: localStorage,

    // 可选：自定义序列化方法
    // serializer: {
    //   // 存储时序列化
    //   serialize: value => JSON.stringify(value),
    //   // 读取时反序列化
    //   deserialize: value => JSON.parse(value)
    // }
  }
})
