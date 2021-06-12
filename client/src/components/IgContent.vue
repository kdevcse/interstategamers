<template>
  <section class="ig-content">
    <div id="episodes">
      <HomeEpisode
        v-for="episode in sortedEpisodes" :key="episode.id"
        @show-score='showScores'
        :title="episode.title"
        :description="episode.description"
        :audio="episode.enclosure_url"
        :season="episode.season.number"
        :episodeNumber="episode.number"
        :episodeType="episode.type"
        :info="episode['Ranking Info']"
        :finale="episode.finale">
      </HomeEpisode>
    </div>
    <!--<HomeRanking
    :gameplay="rankings.Gameplay"
    :aesthetics="rankings.Aesthetics"
    :content="rankings.Content"
    :overall="rankings['IG Score']"
    :rank="rankings.rank"
    :title="hoveredTitle" 
    :totalGames="getTotalGames"></HomeRanking>-->
  </section>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import HomeEpisode from '@/components/HomeEpisode.vue'
import HomeRanking from '@/components/HomeRanking.vue'
//import episodeData from '../database/episode-data'
import { IRankingInfo } from '../interfaces/IRankingInfo'
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
  rankings: any;
  hoveredTitle: string = '';

  mounted () {
    firebase.firestore().collection('podcast-data').get().then((c: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      c.docs.forEach((doc: firebase.firestore.DocumentData) => {
        this.episodes.push(doc.data());
      });
      this.hoveredTitle = this.episodes[0].title;
    });
  }

  showScores (e: Array<any>) {
    if (e[0]) {
      this.rankings = e[0];
      this.hoveredTitle = e[1];
    }
  }

  get getTotalGames () {
    return this.episodes.filter((ep: IEpisodeInfo) => ep.type === 'full').length;
  }

  get sortedEpisodes () {
    return this.episodes.sort((epA: IEpisodeInfo, epB: IEpisodeInfo) => {
      return (new Date(epB.published_at) as any) - (new Date(epA.published_at) as any)
    });
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
