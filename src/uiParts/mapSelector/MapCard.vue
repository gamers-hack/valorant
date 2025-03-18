<script setup lang="ts">
/**
 * MapCard.vue - マップカードコンポーネント
 *
 * マップ選択画面で各マップを表示するカードUI。
 * マップの画像とマップ名を表示します。
 *
 * 機能：
 * - マップ画像の表示
 * - マップ名の表示
 * - クリックイベントの発火（親コンポーネントでハンドリング）
 */

/**
 * プロパティの型定義
 * @property mapName - マップの名前
 * @property mapImage - マップの画像URL
 */
defineProps<{
  mapName: string;
  mapImage: string;
}>();
</script>

<template>
  <div class="map-card">
    <!-- マップのサムネイル画像 -->
    <img :src="mapImage" alt="map" />
    <!-- マップの名前（右下に表示） -->
    <p class="map-card__name">{{ mapName }}</p>
  </div>
</template>

<style lang="scss" scoped>
.map-card {
  position: relative;
  width: fit-content;
  cursor: pointer;

  /* マップ名の配置（画像の上に重ねて表示） */
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
