
import { computed, onBeforeMount, reactive } from "vue";
import { IHoveredRanking, IRatingInfo } from "@/interfaces/IRatingInfo";
import { IEpisodeInfo } from "@/interfaces/IRatingInfo";
import { getEpisodes, getRatings } from "@/globals/supabase";

export function useIgContent() {
  const episodes: IEpisodeInfo[] = reactive([]);
  const rankings: IRatingInfo[] = reactive([]);
  let hoveredEpisode: IEpisodeInfo;

  onBeforeMount(async() => {
    await getEpisodes(episodes, true);
    await getRatings(rankings);

    const firstGameReview = episodes.find(e => e.type === "full");
    
    if (!firstGameReview)
      return;

    hoveredEpisode = firstGameReview;
    console.log(hoveredEpisode);
  });

  function showScores(e: Array<any>) {
    const hoveredEpisodeId = e[0];

    if (!hoveredEpisodeId)
      return;

    hoveredEpisode = episodes.find(ep => ep.simplecast_id === hoveredEpisodeId) || hoveredEpisode;
    console.log(hoveredEpisode);
  }

  function isFinale(index: number) {
    return ((episodes[index - 1] && episodes[index]) && episodes[index - 1].season > episodes[index].season) || index === 0;
  }

  const hoveredRanking = computed((): IHoveredRanking => {
    const foundRating = rankings.find(r => r.simplecast_id === hoveredEpisode?.simplecast_id);
    const rating: IHoveredRanking = foundRating || hoveredRanking.value || {};
    rating.title = hoveredEpisode?.title;
    return rating;
  });

  const totalGames = computed(() => {
    return episodes.filter((ep: IEpisodeInfo) => ep.type === "full").length;
  });

  const pageIsReady = computed(() => {
    return rankings && episodes && rankings.length > 0 && episodes.length > 0;
  });

  return {
    episodes,
    rankings,
    hoveredRanking,
    totalGames,
    pageIsReady,
    showScores,
    isFinale
  };
}