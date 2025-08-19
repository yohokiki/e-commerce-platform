<script setup>
import { getBannerAPI } from '@/apis/home';
import { onMounted, ref } from 'vue';
const imgs = ref([])

// 获取轮播图
const getImgs = async ()=>{
  const res = await getBannerAPI()
  imgs.value = res.result
  // console.log(imgs.value)
}

onMounted(()=>getImgs())

 
</script>
 
<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in imgs" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
 
 
 
<style scoped lang='scss'>
.home-banner {
  width: 1300px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
 
  img {
    width: 100%;
    height: 500px;
  }
}
</style>