<script setup lang="ts">
/**
 * MapSection.vue - マップ選択セクションコンポーネント
 *
 * アプリケーションのトップページに表示されるマップ選択UI。
 * 利用可能なすべてのマップをグリッド形式で表示し、
 * ユーザーがマップを選択すると対応するマップ詳細ページに遷移します。
 *
 * 構成：
 * - 複数のMapCardコンポーネント（各マップを表す）
 * - クリック時のページ遷移機能
 */
import MapCard from '@/uiParts/mapSelector/MapCard.vue';
import type { RouteLocationRaw } from 'vue-router';

/**
 * マップデータの型定義
 * @property name - マップの名前
 * @property image - マップのサムネイル画像URL
 * @property page - マップ詳細ページのルート情報
 */
type Map = {
  name: string;
  image: string;
  page: RouteLocationRaw;
};

/**
 * 利用可能なマップのリスト
 * 実際のアプリケーションでは、APIやストアから取得するデータに置き換える
 */
const maps: Map[] = [
  {
    name: 'Abyss',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-abyss' },
  },
  {
    name: 'Ascent',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-ascent' },
  },
  {
    name: 'Bind',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-bind' },
  },
  {
    name: 'Breeze',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-breeze' },
  },
  {
    name: 'Fracture',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-fracture' },
  },
  {
    name: 'Haven',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-haven' },
  },
  {
    name: 'Lotus',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-lotus' },
  },
  {
    name: 'Pearl',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-pearl' },
  },
  {
    name: 'Split',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-split' },
  },
  {
    name: 'Sunset',
    image: 'https://placehold.jp/150x150.png',
    page: { name: 'map-sunset' },
  },
];

/**
 * マップカードクリック時の処理
 * 選択したマップの詳細ページに遷移する
 *
 * @param {Map} map - クリックされたマップのデータ
 */
const moveToMapPage = (map: Map) => {
  navigateTo(map.page);
};
</script>

<template>
  <div class="map-section">
    <!-- マップカードの繰り返し表示 -->
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
