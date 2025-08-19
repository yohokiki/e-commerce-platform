<script setup>
import { onMounted, ref } from 'vue';
import HomePanel from './HomePanel.vue';
import { findHotAPI } from '@/apis/home';

const hotList = ref([])
const getFindHot=async()=>{
  const res = await findHotAPI()
  hotList.value = res.result
}

onMounted(()=>getFindHot())

</script>

<template>
  <HomePanel title="人气推荐" sub-title="火爆商品 包赚不赔">

  </HomePanel>
  <ul class="goods-list">
    <li v-for="item in hotList" :key="item.id">
      <RouterLink to="/">
        <img v-img-lazy="item.picture"  alt="" />
        <p class="name">{{ item.title }}</p>
        <p class="alt">{{ item.alt }}</p>
      </RouterLink>
    </li>
  </ul>
 
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .alt {
      color: $info;
      font-size: small;
    }
  }
}
</style>