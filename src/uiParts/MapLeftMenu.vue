<script setup lang="ts">
/**
 * MapLeftMenu.vue - マップ画面の左側メニューコンポーネント
 *
 * マップページの左側に表示されるメニュー。
 * エージェント（キャラクター）選択のUIを提供する。
 *
 * 構成：
 * - エージェント選択セクション
 * - エージェントカードのグリッド表示
 */
import AgentCard from './agentSelector/AgentCard.vue';

/**
 * エージェント（キャラクター）の型定義
 * @property name - エージェントの名前
 * @property image - エージェントの画像URL
 */
type Agent = {
  name: string;
  image: string;
};

/**
 * 利用可能なエージェントの配列
 * 実際のアプリケーションでは、APIやストアから取得するデータに置き換える
 */
const agents: Agent[] = [
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
  {
    name: 'エージェント1',
    image: 'https://placehold.jp/150x150.png',
  },
];
</script>

<template>
  <div>
    <!-- キャラクター選択タイトル -->
    <p>キャラ選択</p>
    <!-- エージェントカードのグリッド表示 -->
    <div class="agent-card-container">
      <AgentCard
        v-for="agent in agents"
        :key="agent.name"
        :agent-name="agent.name"
        :agent-image="agent.image"
        class="agent-card-container__card"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agent-card-container {
  &__card {
    display: inline-block;
    margin: 10px;
  }
}
</style>
