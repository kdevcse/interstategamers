<template>
  <section class="ig-content">
    <div id="episodes">
      <HomeEpisode
        :v-if="pageIsReady"
        v-for="(episode, index) in sortedEpisodes" :key="episode.id"
        @show-score='showScores'
        :title="episode.title"
        :description="episode.description"
        :audio="episode.enclosure_url"
        :season="episode.season.number"
        :episodeNumber="episode.number"
        :episodeType="episode.type"
        :rankingId="getRankingId(episode.season.number, episode.number)"
        :finale="isFinale(index)">
      </HomeEpisode>
    </div>
    <HomeRanking
    :v-if="pageIsReady"
    :gameplay="hoveredRanking.gameplay"
    :aesthetics="hoveredRanking.aesthetics"
    :content="hoveredRanking.content"
    :overall="hoveredRanking.ig_score"
    :rank="hoveredRanking.rank"
    :title="getHoveredRankingsTitle(hoveredRanking.episode, hoveredRanking.game)" 
    :totalGames="getTotalGames"></HomeRanking>
  </section>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import HomeEpisode from '@/components/HomeEpisode.vue'
import HomeRanking from '@/components/HomeRanking.vue'
import { IHoveredRanking, IRankingInfo } from '../interfaces/IRankingInfo'
import { IEpisodeInfo } from '../interfaces/IRankingInfo'
import firebase from 'firebase/app';
import '@firebase/firestore';

@Component({
  components: {
    HomeEpisode,
    HomeRanking
  }
})
export default class IgContent extends Vue {
  episodes: Array<IEpisodeInfo> = []
  rankings: Array<IRankingInfo> = [];
  hoveredRankingId: string = '';

  mounted () {
    var podcastDataPromise = this.getDataFromFirestore('podcast', this.episodes);
    var ratingsDataPromise = this.getDataFromFirestore('ratings', this.rankings);

    Promise.all([podcastDataPromise, ratingsDataPromise]).then(() => {
      this.hoveredRankingId = this.getRankingId(this.sortedEpisodes[0].season.number, this.sortedEpisodes[0].number);
    });
  }

  showScores (e: Array<any>) {
    if (e[0]) {
      this.hoveredRankingId = e[0];
    }
  }

  getRankingId(seasonNumber: number, episodeNumber: number) {
    var rankingInfo = this.rankings.find((ranking) => ranking.episode === `${seasonNumber}-${episodeNumber}`);
    return rankingInfo ? rankingInfo.id : '';
  }

  getHoveredRankingsTitle(episode: string | undefined, game: string | undefined) {
    return episode && game ? `${episode}: ${game}`: null;
  }

  async getDataFromFirestore(type: string, dataArray: Array<any>) {
    try {
      const c = await firebase.firestore().collection(`${type}-data`).get();
      c.docs.forEach((doc: firebase.firestore.DocumentData) => {
        dataArray.push(doc.data())
      });
    } catch (error) {
      console.error(`An error occured fetching ${type} data: ${error}`);
    }
  }
  
  isFinale(index: number) {
    return this.sortedEpisodes[index - 1] && this.sortedEpisodes[index - 1].season.number > this.sortedEpisodes[index].season.number || index === 0;
  }

  get hoveredRanking(): IHoveredRanking {
    let hoveredRank: IHoveredRanking = {};
    for(let i = 0; i < this.sortedRankings.length; i++) {
      const ranking = this.sortedRankings[i] as IHoveredRanking;
      const currentScore = ranking.ig_score;
      const lastScore = i > 0 ? this.sortedRankings[i - 1].ig_score : null;
      ranking.rank = lastScore && (currentScore === lastScore) ? this.sortedRankings[i - 1].rank : i + 1;

      if (ranking.id === this.hoveredRankingId) {
        hoveredRank = ranking;
        break;  
      }
    }

    return hoveredRank;
  }

  get getTotalGames () {
    return this.episodes.filter((ep: IEpisodeInfo) => ep.type === 'full').length;
  }

  get sortedEpisodes () {
    return this.episodes.sort((epA: IEpisodeInfo, epB: IEpisodeInfo) => {
      return (new Date(epB.published_at) as any) - (new Date(epA.published_at) as any);
    });
  }

  get sortedRankings () {
    return this.rankings.sort((epA: IRankingInfo, epB: IRankingInfo) => {
      return (new Date(epB.ig_score) as any) - (new Date(epA.ig_score) as any);
    });
  }

  get pageIsReady () {
    return this.rankings && this.episodes && this.rankings.length > 0 && this.episodes.length > 0;
  }
}
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
