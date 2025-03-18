<script setup lang="ts">
import MapSection from '@/uiParts/mapSelector/MapSection.vue';

definePageMeta({
  layout: 'with-header',
});
</script>

<template>
  <div class="page">
    <div class="page__left" />
    <div class="page__center">
      <MapSection />
    </div>
    <div class="page__right" />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;

  &__center {
    flex: 1;
  }
}
</style>
