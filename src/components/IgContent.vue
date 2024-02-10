<template>
  <section class="ig-content">
    <div id="episodes">
      <home-episode
        v-for="(episode, index) in episodesWithRatingData"
        :key="episode.guid['#text']"
        :v-if="pageIsReady"
        :spotify-id="episode.guid['#text']"
        :title="episode.title"
        :description="episode.description"
        :audio="episode.enclosure['@_url']"
        :season="episode['itunes:season']"
        :episode-type="episode['itunes:episodeType']"
        :finale="isFinale(index)"
        @id-hovered="showScores"
      />
    </div>
    <home-ranking
      :v-if="pageIsReady"
      :gameplay="hoveredEpisode.ratingData?.gameplay"
      :aesthetics="hoveredEpisode.ratingData?.aesthetics"
      :content="hoveredEpisode.ratingData?.content"
      :overall="hoveredEpisode.ratingData?.ig_score"
      :rank="hoveredEpisode.ratingData?.rank"
      :title="hoveredEpisode.title" 
      :total-games="totalGames"
    />
  </section>
</template>

<script setup lang='ts'>
import HomeEpisode from "@/components/HomeEpisode.vue";
import HomeRanking from "@/components/HomeRanking.vue";
import { useIgContent } from "@/composables/IgContent";

const {
  episodesWithRatingData,
  hoveredEpisode,
  totalGames, 
  pageIsReady,
  isFinale,
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
