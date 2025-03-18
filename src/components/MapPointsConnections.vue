<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';

interface Point {
  id: number;
  x: number;
  y: number;
  name: string;
}

interface BluePoint extends Point {
  redPointId: number;
}

interface _LinePoint {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const props = defineProps({
  // 赤い点のデータ配列
  redPoints: {
    type: Array as () => Point[],
    required: true,
  },
  // 青い点のデータ配列
  bluePoints: {
    type: Array as () => BluePoint[],
    required: true,
  },
  // 表示するマップ画像のURL
  mapImageUrl: {
    type: String,
    default: 'https://placehold.jp/1000x1000.png',
  },
  // マップのスケール
  scale: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['wheel']);

// 現在ホバーしている赤い点のID
const hoveredRedPointId = ref<number | null>(null);
// 現在ホバーしている青い点のID
const hoveredBluePointId = ref<number | null>(null);

// 表示する青い点
const visibleBluePoints = computed(() => {
  // 青い点にホバーしている場合、そのホバーした青い点のみを表示
  if (hoveredBluePointId.value) {
    return props.bluePoints.filter(point => point.id === hoveredBluePointId.value);
  }
  // 赤い点にホバーしている場合、その赤い点に紐づく青い点を表示
  if (hoveredRedPointId.value) {
    return props.bluePoints.filter(point => point.redPointId === hoveredRedPointId.value);
  }
  // どちらにもホバーしていない場合は全ての青い点を表示
  return props.bluePoints;
});

// 表示する赤い点
const visibleRedPoints = computed(() => {
  // 青い点にホバーしている場合、その青い点に紐づく赤い点のみを表示
  if (hoveredBluePointId.value) {
    const hoveredBluePoint = props.bluePoints.find(point => point.id === hoveredBluePointId.value);
    if (hoveredBluePoint) {
      return props.redPoints.filter(point => point.id === hoveredBluePoint.redPointId);
    }
  }
  // それ以外の場合は全ての赤い点を表示
  return props.redPoints;
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
    const bluePoint = props.bluePoints.find(bp => bp.id === hoveredBluePointId.value);
    if (!bluePoint) return [];

    const redPoint = props.redPoints.find(rp => rp.id === bluePoint.redPointId);
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
    const redPoint = props.redPoints.find(rp => rp.id === hoveredRedPointId.value);
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

// ホイール操作時の処理
const handleWheel = (event: WheelEvent) => {
  emit('wheel', event);
};
</script>

<template>
  <div class="map-container" :style="{ transform: `scale(${scale})` }" @wheel.prevent="handleWheel">
    <img :src="mapImageUrl" alt="map" class="map" />

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
</template>

<style lang="scss" scoped>
.map-container {
  position: relative;
  transition: transform 0.1s ease;
  transform-origin: center;
}

.map {
  display: block;
  width: 100%;
  height: auto;
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
