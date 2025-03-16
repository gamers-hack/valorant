<template>
  <div>
    <h1>ルールテスト</h1>
    <!-- これはルール違反になるはずです -->
    <IndexPage />
  </div>
</template>

<script setup lang="ts">
// この行はページから別のページをインポートしているためエラーになるはずです
import IndexPage from '@/pages/index.vue';
</script>

<style scoped>
h1 {
  color: red;
}
</style>
