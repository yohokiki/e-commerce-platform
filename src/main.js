import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './styles/element/index.scss'
import 'element-plus/theme-chalk/src/index.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from '@/router/index.js'
// 引入懒加载
import {lazyPlugin} from '@/directives/index'
// 引入全局组件插件
import {componentPlugin} from '@/components/index'

// 引入初始化样式
import '@/styles/common.scss'

// 测试接口
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res=>{
//   console.log(res)
// })

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia).use(ElementPlus).use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


