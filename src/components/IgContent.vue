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
      :total-games="totalGames"
    />
  </section>
</template>

<script setup lang='ts'>
import HomeEpisode from "@/components/HomeEpisode.vue";
import HomeRanking from "@/components/HomeRanking.vue";
import { useIgContent, getHoveredRankingsTitle } from "@/composables/IgContent";

const { 
  sortedEpisodes, 
  hoveredRanking, 
  totalGames, 
  pageIsReady,
  isFinale, 
  getRankingId, 
  showScores 
} = useIgContent();

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
