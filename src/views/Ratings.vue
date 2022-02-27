<template>
  <main class="ratings">
    <rankings-options @search-table="searchHandler"></rankings-options>
    <div id="rankings-table">
      <div id="rankings-header">
        <rankings-header
          @sort-table="sortHandler"
          title="Rank"
          :category="CategoryTypes.Rank"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="Title"
          :category="CategoryTypes.Title"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="Year"
          :category="CategoryTypes.Year"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="Platform"
          :category="CategoryTypes.Platform"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="IG Score"
          :category="CategoryTypes.Overall"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="Gameplay"
          :category="CategoryTypes.Gameplay"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="Aesthetics"
          :category="CategoryTypes.Aesthetics"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="Content"
          :category="CategoryTypes.Content"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="P. Overall"
          :category="CategoryTypes.POverall"
          :sortBy="sortedCategory"
        ></rankings-header>
        <rankings-header
          @sort-table="sortHandler"
          title="K. Overall"
          :category="CategoryTypes.KOverall"
          :sortBy="sortedCategory"
        ></rankings-header>
      </div>
      <template v-for="ranking in sortedRankings" :key="ranking.id">
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
          :pOverall="ranking.p_rating"
          :kOverall="ranking.k_rating"
          :sortBy="sortedCategory"
          :selected="selectedEpisode"
          @row-selected="selectedRowHandler"
        ></ranking-row>
        <rankings-info
          :date="ranking.published_at"
          :img="ranking.game_image"
          :title="ranking.game"
          :selected="selectedEpisode"
          :rankInfo="ranking"
          :ign="ranking.ign"
          :metacritic="ranking.metacritic"
        ></rankings-info>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CategoryTypes, IEpisodeInfo, IRankingInfo } from "../interfaces/IRankingInfo"; //Used in template
import RankingsOptions from "@/components/RankingsOptions.vue";
import RankingsHeader from "@/components/RankingsHeader.vue";
import RankingRow from "@/components/RankingRow.vue";
import RankingsInfo from "@/components/RankingsInfo.vue";
import firebase from "firebase/app";
import "@firebase/firestore";
import { computed, onBeforeMount, reactive, ref } from "vue";

let episodes: IEpisodeInfo[] = reactive([]);
let rankings: IRankingInfo[] = reactive([]);
let sortedCategory = ref(CategoryTypes.Rank);
let sortedIsAscending = ref(true);
let selectedEpisode = ref(undefined);
let searchTxt = ref('');

onBeforeMount(() => {
  getDataFromFirestore('podcast', episodes);
  getDataFromFirestore('ratings', rankings);
});

async function getDataFromFirestore(type: string, dataArray: any[]) {
  try {
    const collection = await firebase.firestore().collection(`${type}-data`).get();
    collection.docs.forEach(doc => {
      dataArray.push(doc.data());
    });

    if (type !== 'ratings')
      return;

    //Assign Rankings
    //TODO: Perhaps in the future we can re-rank them on category sort?
    dataArray.sort((a, b) => b[CategoryTypes.Overall] - a[CategoryTypes.Overall]).forEach((ranking, index) => {
      const currentScore = ranking[CategoryTypes.Overall];
      const lastScore = index > 0 ? dataArray[index - 1][CategoryTypes.Overall] : null;
      ranking[CategoryTypes.Rank] = lastScore && (currentScore === lastScore) ? dataArray[index - 1][CategoryTypes.Rank] : index + 1;
    });
  } catch (error) {
    console.error(`An error occured fetching ${type} data: ${error}`);
  }
};
function selectedRowHandler(e: any) {
  selectedEpisode.value = e;
};
function sortHandler(e: any) {
  sortedCategory.value = e[0];
  sortedIsAscending.value = e[1];
};
function sortByNumber(a: any, b: any) {
  const category = sortedCategory.value;
  return sortedIsAscending ? a[category] - b[category] : b[category] - a[category];
};
function sortByAlphabet(a: any, b: any) {
  const category = sortedCategory.value;
  return sortedIsAscending ? a[category].localeCompare(b[category]) : b[category].localeCompare(a[category]);
};
function searchHandler(searchInput: string) {
  searchTxt.value = searchInput;
}

const sortedRankings = computed((): IRankingInfo[] => {
  const isAlphabeticSort = sortedCategory.value === CategoryTypes.Title || sortedCategory.value === CategoryTypes.Platform;
  const sortFunc = isAlphabeticSort ? sortByAlphabet : sortByNumber;

  rankings.sort((a, b) => sortFunc(a, b));

  return searchTxt.value !== '' ? rankings.filter((rank) => {
    const allInfo = Object.values(rank);
    return allInfo.some(i => i.toString().includes(searchTxt));
  }) : rankings;
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
