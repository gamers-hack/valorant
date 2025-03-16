<script setup lang="ts">
defineProps<{
  mapName: string;
  mapImage: string;
}>();
</script>

<template>
  <div class="map-card">
    <img :src="mapImage" alt="map" />
    <p class="map-card__name">{{ mapName }}</p>
  </div>
</template>

<style lang="scss" scoped>
.map-card {
  position: relative;
  width: fit-content;
  cursor: pointer;
  &__name {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: fit-content;
    text-align: center;
    margin: 0 auto;
  }
}
</style>
