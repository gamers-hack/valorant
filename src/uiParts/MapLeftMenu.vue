<script setup lang="ts">
import AgentCard from './agentSelector/AgentCard.vue';

type Agent = {
  name: string;
  image: string;
};

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
    <p>キャラ選択</p>
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
