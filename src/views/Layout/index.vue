<template class="app-container">
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>

<script setup>
import LayoutNav from './conponents/LayoutNav.vue';
import LayoutHeader from './conponents/LayoutHeader.vue';
import LayoutFooter from './conponents/LayoutFooter.vue';

import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore()
onMounted(()=>{
  categoryStore.getCategory()
})
</script>

<style lang='scss' scoped>
</style>