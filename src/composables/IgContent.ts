
import { computed, onBeforeMount, reactive, ref } from "vue";
import { IHoveredRanking, IRankingInfo } from "@/interfaces/IRankingInfo";
import { IEpisodeInfo } from "@/interfaces/IRankingInfo";
import firebase from "firebase/app";
import "@firebase/firestore";
  
export function getHoveredRankingsTitle(episode: string | undefined, game: string | undefined) {
  return episode && game ? `${episode}: ${game}`: undefined;
}

export function useIgContent() {
  const episodes: Array<IEpisodeInfo> = reactive([]);
  const rankings: Array<IRankingInfo> = reactive([]);
  const hoveredRankingId = ref("");

  onBeforeMount(() => {
    const podcastDataPromise = getDataFromFirestore("podcast", episodes);
    const ratingsDataPromise = getDataFromFirestore("ratings", rankings);

    Promise.all([podcastDataPromise, ratingsDataPromise]).then(() => {
      const sortedEps = sortedEpisodes.value;
      hoveredRankingId.value = getRankingId(sortedEps[0].season.number, sortedEps[0].number);
    });
  });

  function showScores(e: Array<any>) {
    if (e[0]) {
      hoveredRankingId.value = e[0];
    }
  }

  function getRankingId(seasonNumber: number, episodeNumber: number) {
    const rankingInfo = rankings.find((ranking) => ranking.episode === `${seasonNumber}-${episodeNumber}`);
    return rankingInfo ? rankingInfo.id : "";
  }


  async function getDataFromFirestore(type: string, dataArray: Array<any>) {
    try {
      const c = await firebase.firestore().collection(`${type}-data`).get();
      c.docs.forEach((doc: firebase.firestore.DocumentData) => {
        dataArray.push(doc.data());
      });
    } catch (error) {
      console.error(`An error occured fetching ${type} data: ${error}`);
    }
  }

  function isFinale(index: number) {
    const sortedEps = sortedEpisodes.value;
    return ((sortedEps[index - 1] && sortedEps[index]) && sortedEps[index - 1].season.number > sortedEps[index].season.number) || index === 0;
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