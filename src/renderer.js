import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import './index.css'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())

app.use(router)
app.use(Antd)
app.use(pinia)
app.mount('#app')
