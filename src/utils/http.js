// axios 基础封装
import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from "@/router";

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

// 拦截器
// axios请求拦截
httpInstance.interceptors.request.use(config => {
  const useStore = useUserStore()
  const token = useStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截
httpInstance.interceptors.response.use(res => res.data, e => {
  const useStore = useUserStore()
  // 统一错误处理
  ElMessage({
    type: 'error',
    message: e.response.data.message
  })

  // 401 token失效
  // 清除本地用户数据 => 返回登陆页
  if (e.response.status === 401) {
    useStore.clearUserInfo()
    router.push('/login')
  }



  return Promise.reject(e)
})


export default httpInstance