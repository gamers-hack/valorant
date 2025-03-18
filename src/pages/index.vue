<script setup lang="ts">
/**
 * index.vue - トップページコンポーネント
 *
 * アプリケーションのメインページで、マップ選択UIを表示します。
 * ユーザーがマップを選択すると、対応するマップ詳細ページに遷移します。
 *
 * 構成：
 * - 中央：MapSectionコンポーネント（マップカード一覧）
 * - 左右：将来的に拡張可能な余白エリア
 */
import MapSection from '@/uiParts/mapSelector/MapSection.vue';

// withHeaderレイアウトを使用するためのメタ設定
definePageMeta({
  layout: 'with-header',
  name: 'index',
});
</script>

<template>
  <div class="page">
    <!-- 左サイドエリア（将来的な拡張用） -->
    <div class="page__left" />
    <!-- 中央コンテンツエリア（マップセレクター） -->
    <div class="page__center">
      <MapSection />
    </div>
    <!-- 右サイドエリア（将来的な拡張用） -->
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
