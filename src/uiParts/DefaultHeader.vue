<template>
  <!-- 
   * DefaultHeader.vue - アプリケーションのデフォルトヘッダーコンポーネント
   *
   * アプリケーション全体で使用されるヘッダー部分。
   * ロゴやナビゲーションなどを表示する。
   * 
   * 構成:
   * - ロゴ: サイトのブランディング要素
   * - (将来的に) ナビゲーションメニュー、ユーザーアイコンなどを追加予定
   *
   * スタイル:
   * - 72pxの高さ
   * - バックグラウンドカラーは $color-background
   * - テキストカラーは $color-white
   -->
  <div class="header">
    <p class="header__logo">ロゴ</p>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px 20px;
  background-color: $color-background;
  height: 72px;
  display: flex;
  align-items: center;

  &__logo {
    color: $color-white;
  }
}
</style>
