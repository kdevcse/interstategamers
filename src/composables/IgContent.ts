
import { computed, onBeforeMount, ref } from "vue";
import { IHoveredRanking, IRatingInfo } from "@/interfaces/IRatingInfo";
import { IEpisodeInfo } from "@/interfaces/IRatingInfo";
import { getEpisodes, getRatings } from "@/globals/supabase";

export function useIgContent() {
  const episodes = ref<IEpisodeInfo[]>([]);
  const rankings = ref<IRatingInfo[]>([]);
  const hoveredEpisode = ref({} as IEpisodeInfo);

  onBeforeMount(async() => {
    await getEpisodes(episodes.value, true);
    await getRatings(rankings.value);

    const firstGameReview = episodes.value.find(e => e.type === "full");
    
    if (!firstGameReview)
      return;

    hoveredEpisode.value = firstGameReview;
    console.log(hoveredEpisode);
  });

  function showScores(e: Array<any>) {
    const hoveredEpisodeId = e[0];

    if (!hoveredEpisodeId)
      return;

    hoveredEpisode.value = episodes.value.find(ep => ep.simplecast_id === hoveredEpisodeId) || hoveredEpisode.value;
  }

  function isFinale(index: number) {
    return ((episodes.value[index - 1] && episodes.value[index]) && episodes.value[index - 1].season > episodes.value[index].season) || index === 0;
  }

  const hoveredRanking = computed((): IHoveredRanking => {
    const foundRating = rankings.value.find(r => r.simplecast_id === hoveredEpisode.value?.simplecast_id);
    const rating: IHoveredRanking = foundRating || hoveredRanking.value || {};
    rating.title = hoveredEpisode.value?.title;
    return rating;
  });

  const totalGames = computed(() => {
    return episodes.value.filter(ep => ep.type === "full").length;
  });

  const pageIsReady = computed(() => {
    return rankings.value && episodes.value && rankings.value.length > 0 && episodes.value.length > 0;
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