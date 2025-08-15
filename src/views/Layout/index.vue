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
</script>

<style lang='scss' scoped>
</style>