<template>
  <div class="rank-meter">
      <p class='rank-header'>{{type}} {{getPercentageTxt()}}/100</p>
      <div class='progress-background' v-bind:class="{red: isRed()}">
        <div first class='progress-foreground' :class="{red: isRed()}" :style="{ width: `${percentage}%` }"></div>
      </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RankMeter extends Vue {
  @Prop() alt!: boolean;
  @Prop() type!: string;
  @Prop() percentage!: number;

  isRed() {
    return this.alt !== undefined ? true : false;
  }

  getPercentageTxt() {
    if (this.percentage) {
      return this.percentage.toFixed(2);
    }

    return "";
  }
}
</script>

<style scoped>
.rank-header {
  margin: 2px 0px 2px 0px;
  font-size: 14px;
  text-align: left;
}
.rank-meter {
  height: auto;
  width: auto;
  padding: 1px 0px;
}
.progress-background {
  margin-left: auto;
  margin-right: auto;
  height: 24px;
  border: 2px solid #2d32af;
  border-radius: 5px;
}
.progress-foreground {
  height: 100%;
  background-color: #2d32af;
}
.progress-background.red {
  border: 2px solid red;
}
.progress-foreground.red {
  background-color: red;
}
</style>
