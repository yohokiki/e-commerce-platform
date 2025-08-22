import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
  // 用户信息
  const userStore = useUserStore()
  const token = computed(() => userStore.userInfo.token)

  // state 购物车列表
  /**
   *  id -商品id
      name -商品名
      pictures -商品照片
      price -商品价格
      count -商品规格数量
      skuId -规格id
      attrsText -规格描述
      selected:true,
   */
  const cartList = ref([])
  // 已选列表
  const chosenList = ref([])
  // 计算总数
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  //计算总价
  const allPrice = computed(() => cartList.value.reduce((a, p) => a + p.price * p.count, 0))
  // 计算选择总数
  const chosenCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  //计算选择总价
  const chosenPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, p) => a + p.price * p.count, 0))

  // action 接口交互

  // 获取最新购物车列表
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // 新增
  const addCart = async (goods) => {
    const item = cartList.value.find((item) => item.skuId === goods.skuId)
    const { skuId, count } = goods
    if (token.value) {
      // token 有效，登陆状态
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      // 未登录状态
      if (item) {
        // 有重复的规格商品
        // 数量加1
        item.count++
      } else {
        // 是新的规格商品
        // 新增商品
        cartList.value.push(goods)
      }
    }
  }
  // 删除
  const delCart = async (skuId) => {
    if (token.value) {
      const res = await delCartAPI([skuId])
      console.log(typeof res.code)
      console.log(res)
      if (res.code === '1') {
        ElMessage.success(res.msg)
      } else {
        ElMessage.error(res.msg)
      }
      updateNewList()
    } else {
      const itemIndex = cartList.value.findIndex(item => item.skuId === skuId)
      const delList = cartList.value.splice(itemIndex, 1)
      if (delList.length != 0) {
        ElMessage.success('操作成功')
      } else {
        ElMessage.error('操作失败')
      }

    }

  }

  /**
   *  单选修改商品状态
   * @param {*} skuId     规格id
   * @param {*} selected  选中状态
   */
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    // 修改状态
    item.selected = selected
    // console.log(typeof item.selected)
  }

  /**
   * 全选 将状态全部改成true
   */
  const singleAllCheck = (flag) => {
    cartList.value.forEach((item) => { item.selected = flag })
  }

  /**
   * 清空购物车
   */
  const clearCart = () => {
    cartList.value = []
  }


  return {
    cartList,
    allCount,
    allPrice,
    chosenList,
    chosenCount,
    chosenPrice,
    updateNewList,
    addCart,
    delCart,
    singleCheck,
    singleAllCheck,
    clearCart
  }

},
  {
    persist: true
  }
)

