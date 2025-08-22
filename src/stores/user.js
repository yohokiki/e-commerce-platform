import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/apis/user'
import {mergeCartAPI} from '@/apis/cart'
import {useCartStore} from '@/stores/cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 定义数据
  // 用户信息
  
  const userInfo = ref({})

  // action 负责和接口函数交互，获取值
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 合并购物车
    await mergeCartAPI(cartStore.cartList.map((item)=>{
      return {
        skuId:item.skuId,
        selected:item.selected,
        count:item.count
      }
    }))
    // console.log(userInfo.value.token,res.result)
    cartStore.updateNewList()
  }

  // 清除用户数据
  const clearUserInfo = ()=>{
    userInfo.value = {}
    cartStore.clearCart()
    // console.log(userInfo.value,'我是clear User info')
  }

  // 把数据导出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},
  {
    persist: true
  }
)