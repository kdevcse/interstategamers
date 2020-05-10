<template>
  <section class="ig-content">
    <div id="episodes">
      <HomeEpisode
        v-for="episode in episodes" :key="episode.id"
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
    <HomeRanking :info="rankings"></HomeRanking>
  </section>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import HomeEpisode from '@/components/HomeEpisode.vue'
import HomeRanking from '@/components/HomeRanking.vue'
import episodeData from '../database/episode-data'
import IRankingInfo from '../interfaces/IRankingInfo'

@Component({
  components: {
    HomeEpisode,
    HomeRanking
  }
})
export default class IgContent extends Vue {
  episodes = episodeData
  rankings = {};

  public showScores (e: IRankingInfo ) {
    if (e){
      console.log(`Hey:\n ${e.Game}`);
      this.rankings = e;
    }
  }
}
</script>

<style scoped>

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  #episodes {
    width: 100%;
    margin-top: 20px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) {
  #episodes {
    width: 100%;
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
    background: red;
    border-radius: 30px;
  }
}

</style>
