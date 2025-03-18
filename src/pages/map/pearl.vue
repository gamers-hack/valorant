<script setup lang="ts">
/**
 * Pearl.vue - パールマップページコンポーネント
 *
 * パールマップを表示し、マップ上の重要ポイントとそれに紐づくサブポイントを
 * インタラクティブに表示するページコンポーネント。
 *
 * 機能：
 * - パールマップの表示
 * - ズーム機能
 * - 赤い点（メインポイント）と青い点（サブポイント）の表示
 * - サイドメニューの表示
 *
 * レイアウト：
 * - 左側にメニュー
 * - 右側にマップ
 */
import MapLeftMenu from '@/uiParts/MapLeftMenu.vue';
import { definePageMeta } from '~~/.nuxt/imports';
import useMapZoom from '@/composables/useMapZoom';
import { ref } from 'vue';
import MapPointsConnections from '@/components/MapPointsConnections.vue';

// withHeaderレイアウトを使用するためのメタ設定
definePageMeta({
  layout: 'with-header',
  name: 'map-pearl',
});

/**
 * ズーム機能のComposableを使用
 * scale: 現在のズームスケール
 * handleWheel: ホイールイベントハンドラー
 */
const { scale, handleWheel } = useMapZoom();

/**
 * 赤い点（メインポイント）のデータ配列
 * id: ポイントの一意識別子
 * x, y: マップ上の相対位置（0-100%）
 * name: ポイントの名前（ホバー時に表示）
 */
const redPoints = ref([
  { id: 1, x: 25, y: 25, name: 'サイトA' },
  { id: 2, x: 75, y: 75, name: 'サイトB' },
  { id: 3, x: 50, y: 50, name: 'ミッド' },
]);

/**
 * 青い点（サブポイント）のデータ配列
 * id: ポイントの一意識別子
 * redPointId: 関連する赤い点のID
 * x, y: マップ上の相対位置（0-100%）
 * name: ポイントの名前（ホバー時に表示）
 */
const bluePoints = ref([
  { id: 1, redPointId: 1, x: 20, y: 20, name: 'Aメイン' },
  { id: 2, redPointId: 1, x: 30, y: 30, name: 'Aリンク' },
  { id: 3, redPointId: 2, x: 70, y: 70, name: 'Bメイン' },
  { id: 4, redPointId: 2, x: 80, y: 80, name: 'Bリンク' },
  { id: 5, redPointId: 3, x: 45, y: 45, name: 'ミッドコネクター' },
  { id: 6, redPointId: 3, x: 55, y: 55, name: 'ミッドウォーター' },
]);

/**
 * マップ画像のURL
 * 本番環境では実際のマップ画像URLに差し替える
 */
const mapImageUrl = 'https://placehold.jp/1000x1000.png';
</script>

<template>
  <div class="page">
    <!-- 左側のサイドメニュー -->
    <div class="page__left">
      <MapLeftMenu />
    </div>
    <!-- メインコンテンツエリア（マップ表示） -->
    <div class="page__main">
      <MapPointsConnections
        :red-points="redPoints"
        :blue-points="bluePoints"
        :map-image-url="mapImageUrl"
        :scale="scale"
        @wheel="handleWheel"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  height: calc(100% - 72px);

  &__left {
    width: 300px;
    height: 100%;
    background-color: $color-background-light;
  }

  &__main {
    flex: 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
