<script setup lang="ts">
/**
 * MapPointsConnections.vue
 *
 * マップ上に赤い点（メインポイント）と青い点（サブポイント）を表示し、
 * ホバー時に点同士の接続線を表示するコンポーネント。
 *
 * 機能：
 * - 赤い点（メインポイント）と青い点（サブポイント）の表示
 * - ホバー時の接続線表示
 * - ズーム操作のハンドリング
 * - 点のホバー状態によるフィルタリング
 */
import { ref, computed, defineProps, defineEmits } from 'vue';

/**
 * 点（ポイント）の基本インターフェース
 * @property id - ポイントの一意識別子
 * @property x - マップ上のX座標（0-100%）
 * @property y - マップ上のY座標（0-100%）
 * @property name - ポイントの表示名
 */
interface Point {
  id: number;
  x: number;
  y: number;
  name: string;
}

/**
 * 青い点（サブポイント）のインターフェース
 * Pointを継承し、紐づく赤い点（メインポイント）のIDを持つ
 * @property redPointId - 関連する赤い点のID
 */
interface BluePoint extends Point {
  redPointId: number;
}

/**
 * 接続線の座標を表すインターフェース
 * 未使用だが型定義のリファレンス用に残す
 */
interface _LinePoint {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * コンポーネントのプロパティ定義
 */
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

/**
 * イベントの発行定義
 * wheel: ズーム操作時に親コンポーネントに通知
 */
const emit = defineEmits(['wheel']);

/**
 * 現在ホバーしている赤い点のID
 * null の場合はホバーしていない状態
 */
const hoveredRedPointId = ref<number | null>(null);

/**
 * 現在ホバーしている青い点のID
 * null の場合はホバーしていない状態
 */
const hoveredBluePointId = ref<number | null>(null);

/**
 * 表示する青い点を計算するcomputed
 * ホバー状態によって表示する点が変わる
 * 1. 青い点にホバー: そのホバーした青い点のみ表示
 * 2. 赤い点にホバー: その赤い点に紐づく青い点を表示
 * 3. ホバーなし: すべての青い点を表示
 */
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

/**
 * 表示する赤い点を計算するcomputed
 * ホバー状態によって表示する点が変わる
 * 1. 青い点にホバー: その青い点に紐づく赤い点のみ表示
 * 2. ホバーなし/赤い点ホバー: すべての赤い点を表示
 */
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

/**
 * 青い点にホバーした時の処理
 * @param pointId - ホバーした青い点のID
 */
const handleBluePointHover = (pointId: number) => {
  hoveredBluePointId.value = pointId;
  hoveredRedPointId.value = null; // 赤い点のホバー状態をクリア
};

/**
 * 青い点からホバーが外れた時の処理
 */
const handleBluePointLeave = () => {
  hoveredBluePointId.value = null;
};

/**
 * 赤い点にホバーした時の処理
 * @param pointId - ホバーした赤い点のID
 */
const handleRedPointHover = (pointId: number) => {
  hoveredRedPointId.value = pointId;
  hoveredBluePointId.value = null; // 青い点のホバー状態をクリア
};

/**
 * 赤い点からホバーが外れた時の処理
 */
const handleRedPointLeave = () => {
  hoveredRedPointId.value = null;
};

/**
 * 接続線を表示するかどうかを判定するcomputed
 * 以下の条件で接続線を表示:
 * 1. 赤い点にホバーしていて、その赤い点に紐づく青い点がある
 * 2. 青い点にホバーしていて、表示する赤い点がある
 */
const showConnections = computed(() => {
  return (
    (hoveredRedPointId.value &&
      visibleBluePoints.value.some(bp => bp.redPointId === hoveredRedPointId.value)) ||
    (hoveredBluePointId.value && visibleRedPoints.value.length > 0)
  );
});

/**
 * 接続線の開始点と終点を取得するcomputed
 * ホバー状態に応じて異なる接続線を計算:
 * 1. 青い点にホバー: その青い点と関連する赤い点を結ぶ線
 * 2. 赤い点にホバー: その赤い点と関連するすべての青い点を結ぶ線
 * @returns 接続線の座標情報の配列
 */
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

/**
 * ホイール操作時の処理
 * 親コンポーネントにwheelイベントを発行
 * @param event - ホイールイベント
 */
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
