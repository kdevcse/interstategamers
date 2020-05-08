<template>
  <div class="rank-meter">
      <h1 class='rank-header' id='ig-content-rank-game-gameplay'>{{type}} 0/100</h1>
      <div class='progress-background'>
        <div style='width: 0%;' class='progress-foreground' id='ig-content-rank-progress-gameplay'></div>
      </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IgContent extends Vue {
  @Prop() type!: string;
  @Prop() percentage!: number;
}
</script>

<style scoped>
</style>
