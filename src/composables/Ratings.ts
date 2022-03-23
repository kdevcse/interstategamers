import { CategoryTypes, IEpisodeInfo, IRatingWithEpisode } from "@/interfaces/IRatingInfo"; //Used in template
import { computed, onBeforeMount, reactive, ref } from "vue";
import { getRatings, getEpisodes } from "@/globals/supabase";

export function useRatings() {
  const episodes: IEpisodeInfo[] = reactive([]);
  const ratings: IRatingWithEpisode[] = reactive([]);
  const sortedCategory = ref(CategoryTypes.RANK);
  const sortedIsAscending = ref(true);
  const selectedEpisode = ref(undefined);
  const searchTxt = ref("");

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

  function selectedRowHandler(e: any) {
    selectedEpisode.value = e;
  }

  function sortHandler(e: any) {
    sortedCategory.value = e[0];
    sortedIsAscending.value = e[1];
  }

  function searchHandler(searchInput: string) {
    searchTxt.value = searchInput;
  }

  const sortedRatings = computed((): IRatingWithEpisode[] => {
    const isAlphabeticSort = sortedCategory.value === CategoryTypes.TITLE || sortedCategory.value === CategoryTypes.PLATFORM;
    const sortFunc = isAlphabeticSort ? sortByAlphabet : sortByNumber;

    const sortedRats = ratings.slice(0).sort(sortFunc);

    return searchTxt.value !== "" ? sortedRats.filter((rating) => {
      return rating.game.includes(searchTxt.value) || rating.platform.includes(searchTxt.value);
    }) : sortedRats;
  });

  return {
    sortedCategory,
    selectedEpisode,
    selectedRowHandler,
    sortHandler,
    searchHandler,
    sortedRatings
  };
}