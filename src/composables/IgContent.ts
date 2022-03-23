
import { computed, onBeforeMount, ref } from "vue";
import { IRatingInfo, IEpisodeWithRating } from "@/interfaces/IRatingInfo";
import { getEpisodes, getRatings } from "@/globals/supabase";

export function useIgContent() {
  const episodes = ref<IEpisodeWithRating[]>([]);
  const ratings = ref<IRatingInfo[]>([]);
  const hoveredEpisode = ref({} as IEpisodeWithRating);

  onBeforeMount(async() => {
    await getEpisodes(episodes.value, true);
    await getRatings(ratings.value);

    mapRatingsToEpisodes(ratings.value, episodes.value);

    const firstGameReview = episodes.value.find(e => e.ratingData);
    
    if (!firstGameReview)
      return;

    hoveredEpisode.value = firstGameReview;
  });

  function mapRatingsToEpisodes(ratings: IRatingInfo[], episodes: IEpisodeWithRating[]) {
    return episodes.map(ep => {
      ep.ratingData = ratings.find(r => r.simplecast_id === ep.simplecast_id);
      return ep;
    });
  }

  function showScores(e: Array<any>) {
    const hoveredEpisodeId = e[0];

    if (!hoveredEpisodeId)
      return;

    hoveredEpisode.value = episodes.value.find(ep => (ep.simplecast_id === hoveredEpisodeId) && ep.ratingData) || hoveredEpisode.value;
  }

  function isFinale(index: number) {
    return ((episodes.value[index - 1] && episodes.value[index]) && (episodes.value[index - 1].season > episodes.value[index].season)) || index === 0;
  }

  const totalGames = computed(() => {
    return episodes.value.filter(ep => ep.type === "full").length;
  });

  const pageIsReady = computed(() => {
    return ratings.value && episodes.value && ratings.value.length > 0 && episodes.value.length > 0;
  });

  return {
    episodes,
    ratings,
    hoveredEpisode,
    totalGames,
    pageIsReady,
    showScores,
    isFinale
  };
}