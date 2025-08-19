<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import GoodsItem from '../Home/components/GoodsItem.vue';


// 面包屑菜单获取
const route = useRoute()
const categoryData = ref([])
const getcategoryData = async (id = route.params.id) => {
  const res = await getCategoryFilterAPI(id)
  categoryData.value = res.result
}
onMounted(() => getcategoryData())
onBeforeRouteUpdate((to) => {
  getcategoryData(to.params.id)
})

//对应导航下的数据
const goodsList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortFiled: 'publishTime'
})

const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value = res.result
}
onMounted(() => getGoodsList())


// tab 切换
const tabChange =()=>{
  // console.log('tabChange')
  getGoodsList()
  reqData.value.page = 1
  
}

// 延续加载
const disabled = ref(false)
const load = async()=>{
  // console.log('继续吧')
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value.items = [...goodsList.value.items,...res.result.items]
  if(res.result.items.length===0){
    disabled.value=true
    console.log('没有了')
  }
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/category/${categoryData.parentId}`">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container" >
      <el-tabs v-model="reqData.sortFiled" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :v-infinite-disabled="disabled">
        <GoodsItem v-for="goods in goodsList.items" :goods="goods" :key="goods.id" ></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>