import { ref } from 'vue';

export default function useMapZoom() {
  // 拡大縮小の倍率を管理するref
  const scale = ref(1);
  const minScale = 0.5;
  const maxScale = 3;

  // マウスホイールイベントのハンドラー
  const handleWheel = (event: WheelEvent) => {
    // デフォルトスクロール動作を防止
    event.preventDefault();

    // wheelDeltaの変化量に基づいて拡大縮小を調整
    // 下にスクロール（正の値）→拡大、上にスクロール（負の値）→縮小
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(minScale, Math.min(maxScale, scale.value + delta));
    scale.value = newScale;
  };

  return {
    scale,
    handleWheel,
  };
}
