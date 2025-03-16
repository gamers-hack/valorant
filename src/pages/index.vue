<template>
  <div class="container">
    <h1>Valorantアプリケーション</h1>
    <p>このアプリはValorantに関する情報を提供します</p>

    <div class="button-container">
      <Button primary>プライマリーボタン</Button>
      <Button>セカンダリーボタン</Button>
      <Button small>小さいボタン</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/uiParts/Button.vue';
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.button-container {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

h1 {
  color: #4f46e5;
  margin-bottom: 1rem;
}
</style>
