<template>
  <main class="ratings">
    <rankings-options @search-table="searchHandler" />
    <div id="rankings-table">
      <div id="rankings-header">
        <rankings-header
          title="Rank"
          :category="CategoryTypes.RANK"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="Title"
          :category="CategoryTypes.TITLE"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="Year"
          :category="CategoryTypes.YEAR"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="Platform"
          :category="CategoryTypes.PLATFORM"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="IG Score"
          :category="CategoryTypes.OVERALL"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="Gameplay"
          :category="CategoryTypes.GAMEPLAY"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="Aesthetics"
          :category="CategoryTypes.AESTHETICS"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="Content"
          :category="CategoryTypes.CONTENT"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="P. Overall"
          :category="CategoryTypes.POVERALL"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
        <rankings-header
          title="K. Overall"
          :category="CategoryTypes.KOVERALL"
          :sort-by="sortedCategory"
          @sort-table="sortHandler"
        />
      </div>
      <template
        v-for="ranking in sortedRankings"
        :key="ranking.id"
      >
        <ranking-row
          :rank="ranking.rank"
          :title="ranking.game"
          :guest="ranking.guest"
          :year="ranking.year"
          :platform="ranking.platform"
          :overall="ranking.ig_score"
          :gameplay="ranking.gameplay"
          :aesthetics="ranking.aesthetics"
          :content="ranking.content"
          :p-overall="ranking.p_rating"
          :k-overall="ranking.k_rating"
          :sort-by="sortedCategory"
          :selected="selectedEpisode"
          @row-selected="selectedRowHandler"
        />
        <rankings-info
          :date="getReviewDate(ranking.simplecast_id)"
          :img="ranking.game_image"
          :title="ranking.game"
          :selected="selectedEpisode"
          :rank-info="ranking"
          :ign="ranking.ign"
          :metacritic="ranking.metacritic"
        />
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CategoryTypes, IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo"; //Used in template
import RankingsOptions from "@/components/RankingsOptions.vue";
import RankingsHeader from "@/components/RankingsHeader.vue";
import RankingRow from "@/components/RankingRow.vue";
import RankingsInfo from "@/components/RankingsInfo.vue";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { getRatings, getEpisodes } from "@/globals/supabase";

let episodes: IEpisodeInfo[] = reactive([]);
let rankings: IRatingInfo[] = reactive([]);
let sortedCategory = ref(CategoryTypes.RANK);
let sortedIsAscending = ref(true);
let selectedEpisode = ref(undefined);
let searchTxt = ref("");

onBeforeMount(async() => {
  await getEpisodes(episodes);
  await getRatings(rankings);
});

function selectedRowHandler(e: any) {
  selectedEpisode.value = e;
}

function sortHandler(e: any) {
  sortedCategory.value = e[0];
  sortedIsAscending.value = e[1];
}

function sortByNumber(a: any, b: any) {
  const category = sortedCategory.value;
  return sortedIsAscending.value ? a[category] - b[category] : b[category] - a[category];
}

function sortByAlphabet(a: any, b: any) {
  const category = sortedCategory.value;
  return sortedIsAscending.value ? a[category].localeCompare(b[category]) : b[category].localeCompare(a[category]);
}

function searchHandler(searchInput: string) {
  searchTxt.value = searchInput;
}

//TODO: Instead of this, can use a map to map episodes to ratings
function getReviewDate(simplecastId: string) {
  const episode = episodes.find(ep => ep.simplecast_id === simplecastId);
  return episode?.published_at.toLocaleString();
}

const sortedRankings = computed((): IRatingInfo[] => {
  const isAlphabeticSort = sortedCategory.value === CategoryTypes.TITLE || sortedCategory.value === CategoryTypes.PLATFORM;
  const sortFunc = isAlphabeticSort ? sortByAlphabet : sortByNumber;

  let sortedRanks = rankings.slice(0).sort((a, b) => sortFunc(a, b));

  return searchTxt.value !== "" ? sortedRanks.filter((rank) => {
    return rank.game.includes(searchTxt.value) || rank.platform.includes(searchTxt.value);
  }) : sortedRanks;
});
</script>

<style scoped>
#rankings-table {
  position: relative;
  top: 67px;
  width: 100%;
  min-width: fit-content;
  text-align: center;
}
#rankings-header {
  position: sticky;
  top: 137px;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(150px, 2fr) repeat(
      8,
      minmax(150px, 1fr)
    );
  background-color: var(--primary-color);
}
@media screen and (prefers-color-scheme: dark) {
  #rankings-header {
    background-color: var(--secondary-color);
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px) {
  body {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
