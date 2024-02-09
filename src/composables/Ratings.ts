import { CategoryTypes, IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo"; //Used in template
import { computed, onBeforeMount, ref } from "vue";
import { getRatings, getEpisodes } from "@/globals/supabase";

export function useRatings() {
  const ratingsWithEpData = ref<IRatingInfo[]>([]);
  const sortedCategory = ref(CategoryTypes.RANK);
  const sortedIsAscending = ref(true);
  const selectedEpisode = ref(undefined);
  const searchTxt = ref("");

  onBeforeMount(async() => {
    const ratings = await getRatings();
    const episodes = await getEpisodes();

    ratingsWithEpData.value = mapEpisodesToRatings(ratings, episodes);
  });

  function mapEpisodesToRatings(ratings: IRatingInfo[], episodes: IEpisodeInfo[]) {
    const mapNRate = ratings.map(r => {
      r.episodeData = episodes.find(e => e.guid === r.spotify_guid);
      return r;
    });
    
    return mapNRate;
  }

  function sortByNumber(a: IRatingInfo, b: IRatingInfo) {
    const category = sortedCategory.value;
    const aCat = a[category] as number;
    const bCat = b[category] as number;
    return sortedIsAscending.value ? aCat - bCat : bCat - aCat;
  }

  function sortByAlphabet(a: IRatingInfo, b: IRatingInfo) {
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

  const sortedRatings = computed((): IRatingInfo[] => {
    const isAlphabeticSort = sortedCategory.value === CategoryTypes.TITLE || sortedCategory.value === CategoryTypes.PLATFORM;
    const sortFunc = isAlphabeticSort ? sortByAlphabet : sortByNumber;

    const sortedRats = ratingsWithEpData.value.slice(0).sort(sortFunc);

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