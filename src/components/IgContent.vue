<template>
  <section class="ig-content">
    <div id="episodes">
      <home-episode
        v-for="(episode, index) in sortedEpisodes"
        :key="episode.id"
        :v-if="pageIsReady"
        :title="episode.title"
        :description="episode.description"
        :audio="episode.enclosure_url"
        :season="episode.season.number"
        :episode-number="episode.number"
        :episode-type="episode.type"
        :ranking-id="getRankingId(episode.season.number, episode.number)"
        :finale="isFinale(index)"
        @show-score="showScores"
      />
    </div>
    <home-ranking
      :v-if="pageIsReady"
      :gameplay="hoveredRanking.gameplay"
      :aesthetics="hoveredRanking.aesthetics"
      :content="hoveredRanking.content"
      :overall="hoveredRanking.ig_score"
      :rank="hoveredRanking.rank"
      :title="getHoveredRankingsTitle(hoveredRanking.episode, hoveredRanking.game)" 
      :total-games="getTotalGames"
    />
  </section>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, reactive, ref } from "vue";
import HomeEpisode from "@/components/HomeEpisode.vue";
import HomeRanking from "@/components/HomeRanking.vue";
import { IHoveredRanking, IRankingInfo } from "@/interfaces/IRankingInfo";
import { IEpisodeInfo } from "@/interfaces/IRankingInfo";
import firebase from "firebase/app";
import "@firebase/firestore";

const episodes: Array<IEpisodeInfo> = reactive([]);
const rankings: Array<IRankingInfo> = reactive([]);
let hoveredRankingId = ref("");

onBeforeMount(() => {
  var podcastDataPromise = getDataFromFirestore("podcast", episodes);
  var ratingsDataPromise = getDataFromFirestore("ratings", rankings);

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
  var rankingInfo = rankings.find((ranking) => ranking.episode === `${seasonNumber}-${episodeNumber}`);
  return rankingInfo ? rankingInfo.id : "";
}

function getHoveredRankingsTitle(episode: string | undefined, game: string | undefined) {
  return episode && game ? `${episode}: ${game}`: undefined;
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
  return sortedEps[index - 1] && sortedEps[index - 1].season.number > sortedEps[index].season.number || index === 0;
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

const getTotalGames = computed(() => {
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
</script>

<style scoped>
.ig-content {
  display: grid;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  #episodes {
    width: 100%;
    margin-top: 20px;
  }
  .ig-content {
    padding-left: 5%;
    padding-right: 5%;
    grid-template-columns: 100%;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) {
  #episodes {
    width: 100%;
  }
  .ig-content {
    padding: 50px 5%;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  #episodes {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 2%;
  }
  /* width */
  #episodes::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  #episodes::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 30px;
  }
  /* Handle */
  #episodes::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 30px;
  }
  .ig-content {
    grid-template-columns: 50% 50%;
    grid-template-rows: 90vh;
  }
  @media screen and (prefers-color-scheme: dark) {
    #episodes::-webkit-scrollbar-track {
      background: var(--elevation-first-lvl-color);
    }
    #episodes::-webkit-scrollbar-thumb {
      background: var(--elevation-second-lvl-color);
    }
  }
}

</style>
