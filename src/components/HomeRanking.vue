<template>
  <aside id="ig-content-rank">
    <h2 id="ig-content-rank-game-title">
      {{ getTitle }}
    </h2>
    <h1 id="ig-content-rank-game-rank">
      Rank {{ rank }}/{{ totalGames }}
    </h1>
    <rank-meter
      alt
      h1
      type="Overall"
      height="33px"
      :percentage="getOverall"
    />
    <rank-meter
      h1
      type="Gameplay"
      height="33px"
      :percentage="getGameplay"
    />
    <rank-meter
      h1
      type="Aesthetics"
      height="33px"
      :percentage="getAesthetics"
    />
    <rank-meter
      h1
      type="Content"
      height="33px"
      :percentage="getContent"
    />
  </aside>
</template>

<script setup lang='ts'>
import RankMeter from "@/components/RankMeter.vue";
import { useRankingValues } from "./HomeRanking";

const props = defineProps<{
  totalGames?: number,
  title?: string,
  gameplay?: number,
  aesthetics?: number,
  content?: number,
  overall?: number,
  rank?: number
}>();
const { getTitle, getGameplay, getAesthetics, getContent, getOverall } = useRankingValues(props);

</script>

<style scoped>
#ig-content-rank {
  margin-left: 5%;
  height: 100%;
  color: var(--default-text-color);
}
#ig-content-rank-game-title {
  margin-bottom: 0;
}
#ig-content-rank-game-rank {
  font-size: 17px;
  margin: 5px 0px;
}
#ig-content-rank > .rank-meter > .rank-header {
  margin: 10px 0px;
  font-size: 18.72px;
  font-weight: bolder;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 992px) {
  #ig-content-rank {
    display: none;
  }
}
</style>
