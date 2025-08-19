// 封装导航栏跳转相关代码
import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory() {
  const categoryData = ref({})
  // 获取当前页面
  const route = useRoute()
  const getCategory = async (id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => { getCategory(route.params.id) })

  // 监听
  // to:获取到路径
  onBeforeRouteUpdate((to) => {
    console.log('change')
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}