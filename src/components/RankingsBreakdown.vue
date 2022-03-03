<template>
  <div class="rankings-breakdown">
    <h3>{{ reviewer }}'s Scores</h3>
    <rank-meter
      alt
      type="Overall"
      :percentage="getScore(0)"
    />
    <rank-meter
      type="Gameplay"
      :percentage="getScore(1)"
    />
    <rank-meter
      type="Visuals"
      :percentage="getScore(2)"
    />
    <rank-meter
      type="Audio"
      :percentage="getScore(3)"
    />
    <rank-meter
      type="Content"
      :percentage="getScore(4)"
    />
  </div>
</template>

<script setup lang="ts">
import RankMeter from '@/components/RankMeter.vue';

const props = defineProps<{
  reviewer?: string,
  scores?: number[]
}>();

function getScore(index: number) {
  if (!props.scores || !props.scores[index])
    return 0;

  return props.scores[index];
}

</script>

<style scoped>
.rankings-breakdown {
  margin: 0px 5%;
  padding: 16px 8% 20px 8%;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 6px;
}
h3 {
  margin: 5px 0px;
}
@media screen and (prefers-color-scheme: dark) {
  .rankings-breakdown {
    background-color: var(--elevation-second-lvl-color);
    border-color: var(--secondary-color);
  }
}
</style>
