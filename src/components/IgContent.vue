<template>
  <section class="ig-content">
    <div id="episodes">
      <HomeEpisode
        v-for="episode in episodes" :key="episode.id"
        :title="episode.title"
        :description="episode.description"
        :audio="episode.enclosure_url"
        :season="episode.season.number"
        :episodeNumber="episode.number"
        :episodeType="episode.type">
      </HomeEpisode>
    </div>
    <aside id='ig-content-rank'>
      <h2 id='ig-content-rank-game-title'>Hover a review to see its ranking!</h2>
      <h1 id='ig-content-rank-game-rank'></h1>
      <h1 class='rank-header' id='ig-content-rank-game-overall'>Overall score 0/100</h1>
      <div class='progress-background'>
        <div style='width: 0%;' class='progress-foreground' id='ig-content-rank-progress-overall'></div>
      </div>
      <h1 class='rank-header' id='ig-content-rank-game-gameplay'>Gameplay 0/100</h1>
      <div class='progress-background'>
        <div style='width: 0%;' class='progress-foreground' id='ig-content-rank-progress-gameplay'></div>
      </div>
      <h1 class='rank-header' id='ig-content-rank-game-aesthetics'>Aesthetics 0/100</h1>
      <div class='progress-background'>
        <div
          style='width: 0%;'
          class='progress-foreground'
          id='ig-content-rank-progress-aesthetics'
        ></div>
      </div>
      <h1 class='rank-header' id='ig-content-rank-game-content'>Content 0/100</h1>
      <div class='progress-background'>
        <div style='width: 0%;' class='progress-foreground' id='ig-content-rank-progress-content'></div>
      </div>
    </aside>
  </section>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import HomeEpisode from '@/components/HomeEpisode.vue'
import episodeData from '../database/episode-data'

@Component({
  components: {
    HomeEpisode
  }
})
export default class IgContent extends Vue {
  data () {
    return {
      episodes: episodeData
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
