// 封装轮播图业务相关代码
import { getBannerAPI } from '@/apis/home';
import { ref, onMounted } from 'vue';


export function useBanner() {
  const imgs = ref([])
  // 获取轮播图
  const getImgs = async () => {
    const res = await getBannerAPI({
      distributionSite: "2"
    })
    imgs.value = res.result
  }
  onMounted(() => getImgs())
  return {
    imgs
  }
}
