<template>
  <div class="rank-meter">
    <h1 v-if="hasH1()" class="rank-header" :class="{red: isRed()}">{{type}} {{getPercentageTxt()}}/100</h1>
    <p v-else class='rank-header' :class="{red: isRed()}">{{type}} {{getPercentageTxt()}}/100</p>
    <div class='progress-background' :class="{red: isRed()}">
      <div class='progress-foreground' :class="{red: isRed()}" :style="{ width: `${percentage}%`, height:`${height}`}"></div>
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
  @Prop() height!: string;
  @Prop() h1!: boolean;

  isRed() {
    return this.alt !== undefined ? true : false;
  }

  hasH1() {
    return this.h1 !== undefined ? true : false;
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
  text-align: left;
  color: var(--default-text-color);
}
p.rank-header{
  margin: 2px 0px 2px 0px;
  font-size: 14px;
}
h1.rank-header{
  margin: 10px 0px;
  font-size: 19px;
}
.rank-meter {
  height: auto;
  width: auto;
  padding: 1px 0px;
}
.progress-background {
  padding: 2px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  overflow: hidden;
}
.progress-foreground {
  height: 18px;
  border-radius: 3px;
  background-color: var(--primary-color);
  transition: width 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.rank-header.red {
  color: var(--accent-color);
}
.progress-background.red {
  border: 2px solid  var(--accent-color);
}
.progress-foreground.red {
  background-color: var(--accent-color);
}
@media screen and (prefers-color-scheme: dark) {
  .rank-header.red {
    color: var(--default-text-color);
  }
}
</style>
