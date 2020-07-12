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
    <HomeRanking
    :gameplay="rankings.Gameplay"
    :aesthetics="rankings.Aesthetics"
    :content="rankings.Content"
    :overall="rankings['IG Score']"
    :rank="rankings.rank"
    :title="hoveredTitle" 
    :totalGames="getTotalGames"></HomeRanking>
  </section>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import HomeEpisode from '@/components/HomeEpisode.vue'
import HomeRanking from '@/components/HomeRanking.vue'
import episodeData from '../database/episode-data'
import { IRankingInfo } from '../interfaces/IRankingInfo'

@Component({
  components: {
    HomeEpisode,
    HomeRanking
  }
})
export default class IgContent extends Vue {
  episodes = episodeData
  rankings: any = {};
  hoveredTitle = '';

  mounted () {
    this.hoveredTitle = this.episodes[0].title;
    this.rankings = this.episodes[0]['Ranking Info'];
  }

  showScores (e: any) {
    if (e[0]) {
      this.rankings = e[0];
      this.hoveredTitle = e[1];
    }
  }

  get getTotalGames () {
    return this.episodes.filter((ep: any) => ep.type === 'full').length;
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
    background: red;
    border-radius: 30px;
  }
  .ig-content {
    grid-template-columns: 50% 50%;
    grid-template-rows: 90vh;
  }
}

</style>
