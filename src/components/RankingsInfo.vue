<template>
  <div class="rankings-info-row" :class="{expanded: isSelected()}">
    <div class="breakdown-details">
      <p class="breakdown-day">{{getReleaseDateTxt()}}</p>
      <img v-if="img" class="breakdown-img" :src="getImg()" />
      <img v-else class="breakdown-img default" src="../assets/images/main.png" />
      <div class="breakdown-scores">
        <div class="critic-section">
          <img class="critic-logo" title="Metacritic Score" src="../assets/images/meta_logo.png" />
          <p class="critic-score">{{metacritic}}</p>
        </div>
        <div class="critic-section">
          <img class="critic-logo" title="IGN Score" src="../assets/images/ign_logo.png" />
          <p class="critic-score">{{ign}}</p>
        </div>
      </div>
    </div>
    <RankingsBreakdown reviewer="Peter" :scores="peterScores"></RankingsBreakdown>
    <RankingsBreakdown reviewer="Kevin" :scores="kevinScores"></RankingsBreakdown>
    <RankingsBreakdown :reviewer="rankInfo.guest" v-if="rankInfo.guest" :scores="guestScores"></RankingsBreakdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import RankingsBreakdown from "@/components/RankingsBreakdown.vue";
import { IRankingInfo } from "../interfaces/IRankingInfo";

@Component({
  components: {
    RankingsBreakdown
  }
})
export default class RankingsInfo extends Vue {
  @Prop() title!: string;
  @Prop() selected!: string;
  @Prop() date!: string;
  @Prop() img!: string;
  @Prop() ign!: number;
  @Prop() metacritic!: number;
  @Prop() rankInfo!: IRankingInfo;

  peterScores: Array<number> = [];
  kevinScores: Array<number> = [];
  guestScores: Array<number> = [];
  chartLoaded = false;

  mounted() {
    this.getScores();
    this.chartLoaded = true;
  }

  getImg() {
    return `../assets/images/${this.img}`;
  }

  isSelected() {
    return this.title === this.selected;
  }

  getReleaseDateTxt(): string {
    const dateObj = new Date(this.date);
    let dateTxt = `${dateObj.getMonth() +
      1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
    return `Reviewed ${dateTxt}`;
  }

  @Watch("rankInfo")
  getScores() {
    let gatherKevinScores: Array<number> = [];
    gatherKevinScores.push(this.rankInfo.k_rating);
    gatherKevinScores.push(this.rankInfo.k_gameplay);
    gatherKevinScores.push(this.rankInfo.k_visuals);
    gatherKevinScores.push(this.rankInfo.k_audio);
    gatherKevinScores.push(this.rankInfo.k_content);

    let gatherPeterScores: any = [];
    gatherPeterScores.push(this.rankInfo.p_rating);
    gatherPeterScores.push(this.rankInfo.p_gameplay);
    gatherPeterScores.push(this.rankInfo.p_visuals);
    gatherPeterScores.push(this.rankInfo.p_audio);
    gatherPeterScores.push(this.rankInfo.p_content);

    if (this.rankInfo.guest) {
      let gatherGuestScores: any = [];
      gatherGuestScores.push(this.rankInfo.g_rating);
      gatherGuestScores.push(this.rankInfo.g_gameplay);
      gatherGuestScores.push(this.rankInfo.g_visuals);
      gatherGuestScores.push(this.rankInfo.g_audio);
      gatherGuestScores.push(this.rankInfo.g_content);
      this.guestScores = gatherGuestScores;
    }

    this.kevinScores = gatherKevinScores;
    this.peterScores = gatherPeterScores;
  }
}
</script>

<style scoped>
.rankings-info-row {
  grid-column: 1/-1;
  height: 0px;
  border-bottom: none;
  background-color: var(--elevation-first-lvl-color);
  transition: height 0.3s ease-out;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  overflow: hidden;
  align-items: center;
}
.rankings-info-row > * {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  overflow: hidden;
}
.breakdown-day {
  margin: 5px 0px 10px 0px;
}
.breakdown-img {
  max-width: 200px;
  max-height: 188px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid lightgray;
  border-radius: 6px;
  align-self: center;
}
.breakdown-details {
  padding: 0 10%;
  overflow: hidden;
  justify-self: center;
  align-self: center;
}
.breakdown-scores {
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
.critic-logo {
  height: 30px;
  width: 30px;
  margin-right: 5px;
  margin-left: auto;
  margin-top: 5px;
}
.critic-section {
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-items: center;
}
.critic-score {
  margin: 0;
  margin-right: auto;
}
@media screen and (prefers-color-scheme: dark) {
  .breakdown-img {
    border-color: var(--secondary-color);
  }
  .breakdown-img.default {
    opacity: 0.87;
  }
}

/* Larger devices than phones */
@media only screen and (min-width: 770px) {
  .rankings-info-row.expanded {
    height: 375px;
    border-bottom: var(--primary-color) solid 1px;
  }
  .rankings-info-row.expanded > * {
    opacity: 1;
  }
}
</style>
