<script setup lang="ts">
import MapCard from '@/uiParts/mapSelector/MapCard.vue';
import type { RouteLocationRaw } from 'vue-router';

type Map = {
  name: string;
  image: string;
  page: RouteLocationRaw;
};

const maps: Map[] = [
  {
    name: 'Abyss',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Ascent',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'bind',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Breeze',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Fracture',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Haven',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Icebox',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Lotus',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Pearl',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Split',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Sunset',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
];

const moveToMapPage = (map: Map) => {
  navigateTo(map.page);
};
</script>

<template>
  <div class="map-section">
    <MapCard
      v-for="map in maps"
      :key="map.name"
      :map-name="map.name"
      :map-image="map.image"
      class="map-section__card"
      @click="moveToMapPage(map)"
    />
  </div>
</template>

<style lang="scss" scoped>
.map-section {
  display: flex;
  flex-wrap: wrap;
}
</style>
