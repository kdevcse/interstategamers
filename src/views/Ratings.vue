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
        v-for="rating in sortedRatings"
        :key="rating.id"
      >
        <ranking-row
          :rank="rating.rank"
          :title="rating.game"
          :guest="rating.guest"
          :year="rating.year"
          :platform="rating.platform"
          :overall="rating.ig_score"
          :gameplay="rating.gameplay"
          :aesthetics="rating.aesthetics"
          :content="rating.content"
          :p-overall="rating.p_rating"
          :k-overall="rating.k_rating"
          :sort-by="sortedCategory"
          :selected="selectedEpisode"
          @row-selected="selectedRowHandler"
        />
        <rankings-info
          :date="rating.episodeData?.published_at?.toLocaleString()"
          :img="rating.game_image"
          :title="rating.game"
          :selected="selectedEpisode"
          :rank-info="rating"
          :ign="rating.ign"
          :metacritic="rating.metacritic"
        />
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CategoryTypes, IEpisodeInfo, IRatingWithEpisode } from "@/interfaces/IRatingInfo"; //Used in template
import RankingsOptions from "@/components/RankingsOptions.vue";
import RankingsHeader from "@/components/RankingsHeader.vue";
import RankingRow from "@/components/RankingRow.vue";
import RankingsInfo from "@/components/RankingsInfo.vue";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { getRatings, getEpisodes } from "@/globals/supabase";

let episodes: IEpisodeInfo[] = reactive([]);
let ratings: IRatingWithEpisode[] = reactive([]);
let sortedCategory = ref(CategoryTypes.RANK);
let sortedIsAscending = ref(true);
let selectedEpisode = ref(undefined);
let searchTxt = ref("");

onBeforeMount(async() => {
  await getEpisodes(episodes);
  await getRatings(ratings);

  mapEpisodesToRatings(ratings, episodes);
});

function mapEpisodesToRatings(ratings: IRatingWithEpisode[], episodes: IEpisodeInfo[]) {
  return ratings.map(r => {
    r.episodeData = episodes.find(e => e.simplecast_id === r.simplecast_id);
    return r;
  });
}

function selectedRowHandler(e: any) {
  selectedEpisode.value = e;
}

function sortHandler(e: any) {
  sortedCategory.value = e[0];
  sortedIsAscending.value = e[1];
}

function sortByNumber(a: IRatingWithEpisode, b: IRatingWithEpisode) {
  const category = sortedCategory.value;
  const aCat = a[category] as number;
  const bCat = b[category] as number;
  return sortedIsAscending.value ? aCat - bCat : bCat - aCat;
}

function sortByAlphabet(a: IRatingWithEpisode, b: IRatingWithEpisode) {
  const category = sortedCategory.value;
  const aCat = a[category] as string;
  const bCat = b[category] as string;
  return sortedIsAscending.value ? aCat.localeCompare(bCat) : bCat.localeCompare(aCat);
}

function searchHandler(searchInput: string) {
  searchTxt.value = searchInput;
}

const sortedRatings = computed((): IRatingWithEpisode[] => {
  const isAlphabeticSort = sortedCategory.value === CategoryTypes.TITLE || sortedCategory.value === CategoryTypes.PLATFORM;
  const sortFunc = isAlphabeticSort ? sortByAlphabet : sortByNumber;

  let sortedRats = ratings.slice(0).sort(sortFunc);

  return searchTxt.value !== "" ? sortedRats.filter((rating) => {
    return rating.game.includes(searchTxt.value) || rating.platform.includes(searchTxt.value);
  }) : sortedRats;
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
