/**
 * useMapZoom.ts - マップのズーム機能を提供するコンポーザブル
 *
 * マウスホイールによるズーム操作を実装し、拡大縮小の管理を行う。
 * マップコンポーネントで利用することで、ユーザーがマップを拡大・縮小できるようになる。
 *
 * 使用例:
 * ```
 * const { scale, handleWheel } = useMapZoom();
 *
 * <div @wheel="handleWheel" :style="{ transform: `scale(${scale})` }">
 *   <!-- マップコンテンツ -->
 * </div>
 * ```
 *
 * @returns {Object} scale - 現在のズームスケール, handleWheel - ホイールイベントハンドラー
 */
import { ref } from 'vue';

export default function useMapZoom() {
  /**
   * 拡大縮小の倍率を管理するref
   * デフォルト値: 1（等倍）
   */
  const scale = ref(1);

  /**
   * 最小拡大率 - これ以上縮小できない
   * 0.5 = 50%まで縮小可能
   */
  const minScale = 0.5;

  /**
   * 最大拡大率 - これ以上拡大できない
   * 3 = 300%まで拡大可能
   */
  const maxScale = 3;

  /**
   * マウスホイールイベントのハンドラー
   * ホイールの回転方向に応じてスケールを調整する
   *
   * @param {WheelEvent} event - ホイールイベント
   */
  const handleWheel = (event: WheelEvent) => {
    // デフォルトスクロール動作を防止（ページ全体がスクロールするのを防ぐ）
    event.preventDefault();

    // wheelDeltaの変化量に基づいて拡大縮小を調整
    // 下にスクロール（正の値）→縮小、上にスクロール（負の値）→拡大
    const delta = event.deltaY > 0 ? -0.1 : 0.1;

    // スケール値を最小・最大の範囲内に制限
    const newScale = Math.max(minScale, Math.min(maxScale, scale.value + delta));
    scale.value = newScale;
  };

  // コンポーザブルの戻り値
  return {
    scale,
    handleWheel,
  };
}
