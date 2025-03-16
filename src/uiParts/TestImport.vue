<template>
  <div>
    <h2>uiPartsのテストコンポーネント</h2>
    <!-- これはルール違反になるはずです -->
    <IndexPage />
  </div>
</template>

<script setup lang="ts">
// この行はuiPartsからpagesをインポートしているためエラーになるはずです
import IndexPage from '@/pages/index.vue';
</script>

<style scoped>
h2 {
  color: blue;
}
</style>
