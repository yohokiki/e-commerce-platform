import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  // 导航列表的数据管理
  const currentList = ref([])

  // action 获取导航栏数值
  const getCategory = async () => {
    const res = await getCategoryAPI()
    currentList.value = res.result
  }

  return {
    currentList,
    getCategory
  } 

})
