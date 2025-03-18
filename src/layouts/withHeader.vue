<template>
  <!-- 
   * withHeader.vue - ヘッダー付きレイアウト
   *
   * アプリケーション全体で使用される標準レイアウト。
   * 上部にヘッダーを配置し、その下にページコンテンツを表示する。
   * 
   * 構成:
   * - 上部: DefaultHeaderコンポーネント
   * - メイン: NuxtPageでルートに基づいたページコンポーネントを表示
   *
   * 使用方法:
   * ```
   * definePageMeta({
   *   layout: 'with-header',
   * });
   * ```
   -->
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
  height: 100vh;
}
</style>
