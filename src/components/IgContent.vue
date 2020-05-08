<template>
  <section>
      <HomeEpisode
        v-for="episode in episodes" :key="episode.id"
        :title="episode.title"
        :description="episode.description"
        :audio="episode.enclosure_url">
      </HomeEpisode>
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import HomeEpisode from '@/components/HomeEpisode.vue'
import episodeData from '../database/episode-data'

@Component({
  components: {
    HomeEpisode
  }
})
export default class IgContent extends Vue {
  @Prop() placeholder!: string;
  data () {
    return {
      episodes: episodeData
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
