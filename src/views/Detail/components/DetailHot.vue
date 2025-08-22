<script setup>
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
import {fetchHotGoodsAPI} from '@/apis/detail'
import { useRoute } from 'vue-router';
import { computed, onMounted,ref } from 'vue';
const props = defineProps({
  title:{
    type:Number,
  }
})

const myTitle = ref('')
myTitle.value = computed(()=>{
  return props.title===1?'24小时榜单':'周热榜'
})

const route = useRoute()
const reqData = ref({
  id:route.params.id,
  type:props.title,
  limit:3
})
const hotList = ref({})
const getHotList = async()=>{
  const res = await fetchHotGoodsAPI(reqData.value)
  // console.log(res);
  hotList.value = res.result
  
}

onMounted(()=>getHotList())
</script>


<template>
  <div class="goods-hot">
    <h3>{{ myTitle }}</h3>
    <!-- 商品区块 -->
    <!-- <RouterLink to="/" class="goods-item" v-for="item in 3" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">一双男鞋</p>
      <p class="desc ellipsis">一双好穿的男鞋</p>
      <p class="price">&yen;200.00</p>
    </RouterLink> -->
    <GoodsItem v-for="commodity in hotList" :goods="commodity" :key="commodity"></GoodsItem>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>