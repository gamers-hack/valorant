<template>
  <div class="example-component">
    <h2 class="title">SCSSテストコンポーネント</h2>
    <p class="description">SCSSが正常に機能しています</p>
    <div class="responsive-box">
      <div v-for="i in 3" :key="i" class="item">アイテム {{ i }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// コンポーネントのロジックはここに
</script>

<style lang="scss" scoped>
@use '@/assets/style/variables' as *;
@use '@/assets/style/mixins' as *;

.example-component {
  padding: 20px;
  border-radius: 8px;
  background-color: $color-white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: $color-black;
  }

  .description {
    margin-bottom: 20px;

    @include sp {
      font-size: 0.9rem;
    }
  }

  .responsive-box {
    @include grid(1fr 1fr 1fr, auto, 10px);

    @include sp {
      @include grid(1fr, auto, 10px);
    }

    .item {
      padding: 15px;
      background-color: $color-gray-background;
      border-radius: 4px;
      text-align: center;
    }
  }
}
</style>
