<template>
  <aside id='ig-content-rank'>
    <h2 id='ig-content-rank-game-title'>{{title}}</h2>
    <h1 id='ig-content-rank-game-rank'>Rank {{rank}}/{{totalGames}}</h1>
    <h1 class='rank-header' id='ig-content-rank-game-overall'>
      Overall score {{overall}}/100
    </h1>
    <div class='progress-background'>
      <div
        style='width: 0%;'
        class='progress-foreground'
        id='ig-content-rank-progress-overall'
      ></div>
    </div>
    <h1 class='rank-header' id='ig-content-rank-game-gameplay'>
      Gameplay {{gameplay}}/100
    </h1>
    <div class='progress-background'>
      <div
        style='width: 0%;'
        class='progress-foreground'
        id='ig-content-rank-progress-gameplay'
      ></div>
    </div>
    <h1 class='rank-header' id='ig-content-rank-game-aesthetics'>
      Aesthetics {{aesthetics}}/100
    </h1>
    <div class='progress-background'>
      <div
        style='width: 0%;'
        class='progress-foreground'
        id='ig-content-rank-progress-aesthetics'
      ></div>
    </div>
    <h1 class='rank-header' id='ig-content-rank-game-content'>Content {{content}}/100</h1>
    <div class='progress-background'>
      <div
        style='width: 0%;'
        class='progress-foreground'
        id='ig-content-rank-progress-content'
      ></div>
    </div>
  </aside>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import IRankingInfo from '../interfaces/IRankingInfo'

@Component
export default class HomeRanking extends Vue {
    title: string = 'Hover a review to see its ranking!';
    gameplay: number = 0;
    aesthetics: number = 0;
    content: number = 0;
    overall: number = 0;
    rank: number = 0;
    totalGames: number = 0;
}
</script>

<style scoped>

</style>
