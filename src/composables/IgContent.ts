
import { computed, onBeforeMount, reactive, ref } from "vue";
import { IHoveredRanking, IRankingInfo } from "@/interfaces/IRankingInfo";
import { IEpisodeInfo } from "@/interfaces/IRankingInfo";
import { SUPABASE, SupabaseTables } from "@/globals/supabase";

export function useIgContent() {
  const episodes: Array<IEpisodeInfo> = reactive([]);
  const rankings: Array<IRankingInfo> = reactive([]);
  const hoveredRankingId = ref("");

  onBeforeMount(() => {
    const podcastDataPromise = getDataFromFirestore(SupabaseTables.SIMPLECAST_EPISODES, episodes);
    const ratingsDataPromise = getDataFromFirestore(SupabaseTables.RATINGS, rankings);

    Promise.all([podcastDataPromise, ratingsDataPromise]).then(() => {
      const sortedEps = sortedEpisodes.value;
      hoveredRankingId.value = getRankingId(sortedEps[0].simplecast_id);
    });
  });

  function showScores(e: Array<any>) {
    if (e[0]) {
      hoveredRankingId.value = e[0];
    }
  }

  function getRankingId(episodeId: string) {
    const rankingInfo = rankings.find((ranking) => ranking.simplecast_id === episodeId);
    return rankingInfo ? rankingInfo.id : "";
  }

  async function getDataFromFirestore(table: SupabaseTables, dataArray: Array<any>) {
      const { data, error } = await SUPABASE.from(table).select("*");

      if (error) {
        console.error(`Error retrieving data: ${error.message}`);
        return;
      }

      data?.forEach((d) => {
        dataArray.push(d);
      });
  }

  function isFinale(index: number) {
    const sortedEps = sortedEpisodes.value;
    return ((sortedEps[index - 1] && sortedEps[index]) && sortedEps[index - 1].season > sortedEps[index].season) || index === 0;
  }

  const hoveredRanking = computed((): IHoveredRanking => {
    let hoveredRank: IHoveredRanking = {};
    const sortedRanks = sortedRankings.value;
    for(let i = 0; i < sortedRanks.length; i++) {
      const ranking = sortedRanks[i] as IHoveredRanking;
      const currentScore = ranking.ig_score;
      const lastScore = i > 0 ? sortedRanks[i - 1].ig_score : null;
      ranking.rank = lastScore && (currentScore === lastScore) ? sortedRanks[i - 1].rank : i + 1;

      if (ranking.id === hoveredRankingId.value) {
        hoveredRank = ranking;
        break;  
      }
    }

    return hoveredRank;
  });

  const hoveredEpisode = computed(() => {
    return episodes.find(ep => ep.simplecast_id === hoveredRanking.value.simplecast_id);
  });

  const totalGames = computed(() => {
    return episodes.filter((ep: IEpisodeInfo) => ep.type === "full").length;
  });

  const sortedEpisodes = computed(() => {
    return episodes.slice(0).sort((epA: IEpisodeInfo, epB: IEpisodeInfo) => {
      return (new Date(epB.published_at) as any) - (new Date(epA.published_at) as any);
    });
  });

  const sortedRankings = computed((): IRankingInfo[] => {
    return rankings.slice(0).sort((epA: IRankingInfo, epB: IRankingInfo) => {
      return (new Date(epB.ig_score) as any) - (new Date(epA.ig_score) as any);
    });
  });

  const pageIsReady = computed(() => {
    return rankings && episodes && rankings.length > 0 && episodes.length > 0;
  });

  return {
    episodes,
    rankings,
    hoveredRanking,
    hoveredRankingId,
    hoveredEpisode,
    totalGames,
    sortedEpisodes,
    sortedRankings,
    pageIsReady,
    showScores,
    getRankingId,
    getDataFromFirestore,
    isFinale
  };
}