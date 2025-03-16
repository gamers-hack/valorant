<script setup lang="ts">
defineProps<{
  agentName: string;
  agentImage: string;
}>();
</script>

<template>
  <div class="agent-card">
    <img :src="agentImage" alt="agent" />
    <p class="agent-card__name">{{ agentName }}</p>
  </div>
</template>

<style lang="scss" scoped>
.agent-card {
  position: relative;
  width: 65px;
  height: 65px;

  &__name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 10px;
    text-align: center;
  }
}
</style>
