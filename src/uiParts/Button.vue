<template>
  <!-- 
   * Button.vue - 汎用ボタンコンポーネント
   *
   * アプリケーション全体で使用される標準的なボタンコンポーネント。
   * primary や small などのプロパティで外観を変更できる。
   * 
   * 使用例:
   * ```
   * <Button primary @click="handleClick">送信</Button>
   * <Button small>キャンセル</Button>
   * ```
   -->
  <button
    class="ui-button"
    :class="{ 'ui-button--primary': primary, 'ui-button--small': small }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/**
 * ボタンのプロパティインターフェース
 * @property primary - プライマリスタイルを適用するかどうか
 * @property small - 小さいサイズのボタンにするかどうか
 */
interface Props {
  primary?: boolean;
  small?: boolean;
}

// デフォルト値の設定
withDefaults(defineProps<Props>(), {
  primary: false,
  small: false,
});

/**
 * 発行可能なイベントの型定義
 * click: ボタンがクリックされた時に発火
 */
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

/**
 * クリックイベントのハンドラー
 * クリックイベントを親コンポーネントに伝播する
 *
 * @param {MouseEvent} event - マウスイベント
 */
const onClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
/* ボタンの基本スタイル */
.ui-button {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  transition: all 0.2s ease;
}

/* プライマリボタンのスタイル */
.ui-button--primary {
  background-color: #4f46e5;
  color: white;
  border: none;
}

/* 小さいサイズのボタンのスタイル */
.ui-button--small {
  padding: 6px 12px;
  font-size: 0.875rem;
}

/* ホバー時のスタイル */
.ui-button:hover {
  opacity: 0.9;
}
</style>
