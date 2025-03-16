<template>
  <div class="card">
    <div class="card__header">
      <h2 class="card__title">カードタイトル</h2>
    </div>
    <div class="card__body">
      <p class="card__text">カードの内容がここに入ります。</p>
    </div>
    <div class="card__footer">
      <button class="card__button">もっと見る</button>
      <button class="card__button card__button--primary">登録する</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// コンポーネントのロジック
</script>

<style lang="scss" scoped>
// vite.config.tsの設定により、以下のimportは不要になりました
// @use '@/assets/style/variables' as *;
// @use '@/assets/style/mixins' as *;

// BEMのmixinを使ったスタイル
@include block('card') {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @include element('card', 'header') {
    padding: 16px;
    background-color: $color-primary-light;
  }

  @include element('card', 'title') {
    margin: 0;
    font-size: 1.2rem;
    color: $color-text-dark;
  }

  @include element('card', 'body') {
    padding: 16px;
  }

  @include element('card', 'text') {
    margin: 0;
    color: $color-text;
  }

  @include element('card', 'footer') {
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  @include element('card', 'button') {
    padding: 8px 16px;
    border: 1px solid $color-primary;
    border-radius: 4px;
    background: none;
    color: $color-primary;
    cursor: pointer;

    &:hover {
      background-color: rgba($color-primary, 0.1);
    }

    @include element-modifier('card', 'button', 'primary') {
      background-color: $color-primary;
      color: white;

      &:hover {
        background-color: darken($color-primary, 10%);
      }
    }
  }
}
</style>
