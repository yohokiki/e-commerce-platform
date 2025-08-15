import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/element/index.scss'
import 'element-plus/theme-chalk/src/index.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from '@/router/index.js'

// 引入初始化样式
import '@/styles/common.scss'

// 测试接口
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res=>{
//   console.log(res)
// })

const app = createApp(App)

app.use(createPinia()).use(ElementPlus).use(router)

app.mount('#app')
