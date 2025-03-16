<template>
  <div class="layout">
    <DefaultHeader />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from '@/uiParts/DefaultHeader.vue';
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
