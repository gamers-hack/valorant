<script setup lang="ts">
import MapLeftMenu from '@/uiParts/MapLeftMenu.vue';
import { definePageMeta } from '~~/.nuxt/imports';
import useMapZoom from '@/composables/useMapZoom';
import { ref, computed } from 'vue';

definePageMeta({
  layout: 'with-header',
});

// ズーム機能のComposableを使用
const { scale, handleWheel } = useMapZoom();

// 赤い点のデータ配列（位置はマップに対する相対位置 0-100%）
const redPoints = ref([
  { id: 1, x: 20, y: 30, name: 'ポイントA' },
  { id: 2, x: 60, y: 70, name: 'ポイントB' },
  { id: 3, x: 40, y: 50, name: 'ポイントC' },
]);

// 青い点のデータ配列（各青い点は関連する赤い点のIDを持つ）
const bluePoints = ref([
  { id: 1, redPointId: 1, x: 30, y: 35, name: '子ポイントA1' },
  { id: 2, redPointId: 1, x: 25, y: 40, name: '子ポイントA2' },
  { id: 3, redPointId: 2, x: 70, y: 65, name: '子ポイントB1' },
  { id: 4, redPointId: 2, x: 65, y: 80, name: '子ポイントB2' },
  { id: 5, redPointId: 3, x: 50, y: 55, name: '子ポイントC1' },
]);

// 現在ホバーしている赤い点のID
const hoveredRedPointId = ref<number | null>(null);
// 現在ホバーしている青い点のID
const hoveredBluePointId = ref<number | null>(null);

// 表示する青い点
const visibleBluePoints = computed(() => {
  // 青い点にホバーしている場合は、そのホバーした青い点のみを表示
  if (hoveredBluePointId.value) {
    return bluePoints.value.filter(point => point.id === hoveredBluePointId.value);
  }
  // 赤い点にホバーしている場合は、その赤い点に紐づく青い点を表示
  if (hoveredRedPointId.value) {
    return bluePoints.value.filter(point => point.redPointId === hoveredRedPointId.value);
  }
  // どちらにもホバーしていない場合は全ての青い点を表示
  return bluePoints.value;
});

// 表示する赤い点
const visibleRedPoints = computed(() => {
  // 青い点にホバーしている場合は、その青い点に紐づく赤い点のみを表示
  if (hoveredBluePointId.value) {
    const hoveredBluePoint = bluePoints.value.find(point => point.id === hoveredBluePointId.value);
    if (hoveredBluePoint) {
      return redPoints.value.filter(point => point.id === hoveredBluePoint.redPointId);
    }
  }
  // それ以外の場合は全ての赤い点を表示
  return redPoints.value;
});

// 青い点にホバーした時の処理
const handleBluePointHover = (pointId: number) => {
  hoveredBluePointId.value = pointId;
  hoveredRedPointId.value = null; // 赤い点のホバー状態をクリア
};

// 青い点からホバーが外れた時の処理
const handleBluePointLeave = () => {
  hoveredBluePointId.value = null;
};

// 赤い点にホバーした時の処理
const handleRedPointHover = (pointId: number) => {
  hoveredRedPointId.value = pointId;
  hoveredBluePointId.value = null; // 青い点のホバー状態をクリア
};

// 赤い点からホバーが外れた時の処理
const handleRedPointLeave = () => {
  hoveredRedPointId.value = null;
};

// 接続線を表示するかどうかの判定
const showConnections = computed(() => {
  return (
    (hoveredRedPointId.value &&
      visibleBluePoints.value.some(bp => bp.redPointId === hoveredRedPointId.value)) ||
    (hoveredBluePointId.value && visibleRedPoints.value.length > 0)
  );
});

// 接続線の開始点と終点を取得
const getLinePoints = computed(() => {
  if (hoveredBluePointId.value) {
    // 青い点にホバーしている場合
    const bluePoint = bluePoints.value.find(bp => bp.id === hoveredBluePointId.value);
    if (!bluePoint) return [];

    const redPoint = redPoints.value.find(rp => rp.id === bluePoint.redPointId);
    if (!redPoint) return [];

    return [
      {
        x1: redPoint.x,
        y1: redPoint.y,
        x2: bluePoint.x,
        y2: bluePoint.y,
      },
    ];
  } else if (hoveredRedPointId.value) {
    // 赤い点にホバーしている場合
    const redPoint = redPoints.value.find(rp => rp.id === hoveredRedPointId.value);
    if (!redPoint) return [];

    return visibleBluePoints.value
      .filter(bp => bp.redPointId === hoveredRedPointId.value)
      .map(bp => ({
        x1: redPoint.x,
        y1: redPoint.y,
        x2: bp.x,
        y2: bp.y,
      }));
  }

  return [];
});
</script>

<template>
  <div class="page">
    <div class="page__left">
      <MapLeftMenu />
    </div>
    <div class="page__main" @wheel.prevent="handleWheel">
      <div class="page__map-container" :style="{ transform: `scale(${scale})` }">
        <img src="https://placehold.jp/1000x1000.png" alt="map" class="page__map" />

        <!-- 赤い点 -->
        <div
          v-for="point in visibleRedPoints"
          :key="`red-${point.id}`"
          class="map-point map-point--red"
          :style="{ left: `${point.x}%`, top: `${point.y}%` }"
          :title="point.name"
          @mouseenter="handleRedPointHover(point.id)"
          @mouseleave="handleRedPointLeave"
        />

        <!-- 青い点 -->
        <div
          v-for="point in visibleBluePoints"
          :key="`blue-${point.id}`"
          class="map-point map-point--blue"
          :style="{ left: `${point.x}%`, top: `${point.y}%` }"
          :title="point.name"
          @mouseenter="handleBluePointHover(point.id)"
          @mouseleave="handleBluePointLeave"
        />

        <!-- 赤い点と青い点を結ぶ線（SVGで実装） -->
        <svg v-if="showConnections" class="map-connections">
          <line
            v-for="(line, index) in getLinePoints"
            :key="`line-${index}`"
            :x1="`${line.x1}%`"
            :y1="`${line.y1}%`"
            :x2="`${line.x2}%`"
            :y2="`${line.y2}%`"
            class="connection-line"
          />
        </svg>
      </div>
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

  &__map-container {
    position: relative;
    transition: transform 0.1s ease;
    transform-origin: center;
  }

  &__map {
    display: block;
    width: 100%;
    height: auto;
  }
}

.map-point {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  &--red {
    background-color: red;
    z-index: 2;
  }

  &--blue {
    background-color: blue;
    z-index: 1;
  }
}

.map-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connection-line {
  stroke: yellow;
  stroke-width: 2px;
  z-index: 0;
}
</style>
