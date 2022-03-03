<template>
  <div
    class="rankings-info-row"
    :class="{ expanded: isSelected() }"
  >
    <div class="breakdown-details">
      <p class="breakdown-day">
        {{ getReleaseDateTxt() }}
      </p>
      <img
        v-if="img"
        class="breakdown-img"
        :src="getImg()"
      >
      <img
        v-else
        class="breakdown-img default"
        :src="mainLogo"
      >
      <div class="breakdown-scores">
        <div class="critic-section">
          <img
            class="critic-logo"
            title="Metacritic Score"
            :src="metacriticLogo"
          >
          <p class="critic-score">
            {{ metacritic }}
          </p>
        </div>
        <div class="critic-section">
          <img
            class="critic-logo"
            title="IGN Score"
            :src="ignLogo"
          >
          <p class="critic-score">
            {{ ign }}
          </p>
        </div>
      </div>
    </div>
    <rankings-breakdown
      reviewer="Peter"
      :scores="getPetersScores"
    />
    <rankings-breakdown
      reviewer="Kevin"
      :scores="getKevinsScores"
    />
    <rankings-breakdown
      v-if="rankInfo && rankInfo.guest"
      :reviewer="rankInfo.guest"
      :scores="getGuestScores"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed} from "vue";
import RankingsBreakdown from "@/components/RankingsBreakdown.vue";
import { IRankingInfo } from "@/interfaces/IRankingInfo";
import metacriticLogo from '@/assets/images/meta_logo.png';
import ignLogo from '@/assets/images/ign_logo.png';
import mainLogo from '@/assets/images/main.png';

const props = defineProps<{
  title?: string,
  selected?: string,
  date?: string,
  img?: string,
  ign?: number,
  metacritic?: number,
  rankInfo: IRankingInfo
}>();
let chartLoaded = ref(false);

onBeforeMount(() => {
  chartLoaded.value = true;
});

function getImg() {
  //TODO: Update to utilize IMDB API
  return `../assets/images/${props.img}`;
}

function isSelected() {
  return props.title === props.selected;
}

function getReleaseDateTxt(): string {
  if (!props.date)
    return '';

  const dateObj = new Date(props.date);
  let dateTxt = `${dateObj.getMonth() +
    1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
  return `Reviewed ${dateTxt}`;
}

const getKevinsScores = computed(() => {
  if (!props.rankInfo)
    return[];

  let gatherKevinScores = [];
  gatherKevinScores.push(props.rankInfo.k_rating);
  gatherKevinScores.push(props.rankInfo.k_gameplay);
  gatherKevinScores.push(props.rankInfo.k_visuals);
  gatherKevinScores.push(props.rankInfo.k_audio);
  gatherKevinScores.push(props.rankInfo.k_content);

  return gatherKevinScores;
});

const getPetersScores = computed(() => {
  if (!props.rankInfo)
    return[];

  let gatherPeterScores: number[] = [];
  gatherPeterScores.push(props.rankInfo.p_rating);
  gatherPeterScores.push(props.rankInfo.p_gameplay);
  gatherPeterScores.push(props.rankInfo.p_visuals);
  gatherPeterScores.push(props.rankInfo.p_audio);
  gatherPeterScores.push(props.rankInfo.p_content);

  return gatherPeterScores;
});

const getGuestScores = computed(() => {
  if (!props.rankInfo || !props.rankInfo.guest)
    return[];
  
  let gatherGuestScores: number[] = [];
  gatherGuestScores.push(props.rankInfo.g_rating);
  gatherGuestScores.push(props.rankInfo.g_gameplay);
  gatherGuestScores.push(props.rankInfo.g_visuals);
  gatherGuestScores.push(props.rankInfo.g_audio);
  gatherGuestScores.push(props.rankInfo.g_content);
  return gatherGuestScores;
});
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
