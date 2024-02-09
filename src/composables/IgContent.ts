
import { computed, onBeforeMount, ref } from "vue";
import { EpisodeTypes, IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo";
import { getEpisodes, getRatings } from "@/globals/supabase";

export function useIgContent() {
  const episodesWithRatingData = ref<IEpisodeInfo[]>([]);
  const ratings = ref<IRatingInfo[]>([]);
  const hoveredEpisode = ref({} as IEpisodeInfo);

  onBeforeMount(async() => {
    const episodes = await getEpisodes(true);
    const ratings = await getRatings();

    episodesWithRatingData.value = mapRatingsToEpisodes(ratings, episodes);

    const firstGameReview = episodes.find(e => e.ratingData);
    
    if (!firstGameReview)
      return;

    hoveredEpisode.value = firstGameReview;
  });

  function mapRatingsToEpisodes(ratings: IRatingInfo[], episodes: IEpisodeInfo[]) {
    return episodes.map(ep => {
      ep.ratingData = ratings.find(r => r.spotify_guid === ep.guid["#text"]);
      return ep;
    });
  }

  function showScores(e: Array<any>) {
    const hoveredEpisodeId = e[0];

    if (!hoveredEpisodeId)
      return;

    hoveredEpisode.value = episodesWithRatingData.value.find(ep => (ep.guid["#text"] === hoveredEpisodeId) && ep.ratingData) || hoveredEpisode.value;
  }

  function isFinale(index: number) {
    return ((episodesWithRatingData.value[index - 1] && episodesWithRatingData.value[index]) && (episodesWithRatingData.value[index - 1]["itunes:season"] > episodesWithRatingData.value[index]["itunes:season"])) || index === 0;
  }

  const totalGames = computed(() => {
    return episodesWithRatingData.value.filter(ep => ep["itunes:episodeType"] === EpisodeTypes.REVIEW).length;
  });

  const pageIsReady = computed(() => {
    return episodesWithRatingData.value && episodesWithRatingData.value.length > 0;
  });

  return {
    episodesWithRatingData,
    ratings,
    hoveredEpisode,
    totalGames,
    pageIsReady,
    showScores,
    isFinale
  };
}