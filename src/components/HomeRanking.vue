<template>
  <aside id='ig-content-rank'>
    <h2 id='ig-content-rank-game-title'>{{getTitle}}</h2>
    <h1 id='ig-content-rank-game-rank'>Rank {{rank}}/{{totalGames}}</h1>
    <h1 class='rank-header' id='ig-content-rank-game-overall'>
      Overall score {{getOverall.toFixed(2)}}/100
    </h1>
    <div class='progress-background overall'>
      <div
        :style="{width: getOverall + '%'}"
        class='progress-foreground'
        id='ig-content-rank-progress-overall'
      ></div>
    </div>
    <h1 class='rank-header' id='ig-content-rank-game-gameplay'>
      Gameplay {{getGameplay.toFixed(2)}}/100
    </h1>
    <div class='progress-background'>
      <div
        :style="{width: getGameplay + '%'}"
        class='progress-foreground'
        id='ig-content-rank-progress-gameplay'
      ></div>
    </div>
    <h1 class='rank-header' id='ig-content-rank-game-aesthetics'>
      Aesthetics {{getAesthetics.toFixed(2)}}/100
    </h1>
    <div class='progress-background'>
      <div
        :style="{width: getAesthetics + '%'}"
        class='progress-foreground'
        id='ig-content-rank-progress-aesthetics'
      ></div>
    </div>
    <h1 class='rank-header' id='ig-content-rank-game-content'>Content {{getContent.toFixed(2)}}/100</h1>
    <div class='progress-background'>
      <div
        :style="{width: getContent + '%'}"
        class='progress-foreground'
        id='ig-content-rank-progress-content'
      ></div>
    </div>
  </aside>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IRankingInfo } from '../interfaces/IRankingInfo'

@Component
export default class HomeRanking extends Vue {
    @Prop() totalGames!: number;
    @Prop() title!: string;
    @Prop() gameplay!: number;
    @Prop() aesthetics!: number;
    @Prop() content!: number;
    @Prop() overall!: number;
    @Prop() rank!: number;

    get getTitle () : string {
        return this.title ? this.title : 'Hover a review to see its ranking!';
    }

    get getGameplay () : number {
        return this.gameplay ? this.gameplay: 0;
    }

    get getAesthetics () : number {
        return this.aesthetics ? this.aesthetics: 0;
    }

    get getContent () : number {
        return this.content ? this.content: 0;
    }

    get getOverall () : number {
        return this.overall ? this.overall: 0;
    }
}
</script>

<style scoped>
#ig-content-rank {
  margin-left: 5%;
  height: 100%;
  color: #2d32af;
}
#ig-content-rank-game-title {
  margin-bottom: 0;
}
#ig-content-rank-game-rank {
  font-size: 17px;
  margin-top: 5px;
}
.rank-header {
  margin-top: 10px;
  margin-bottom: 10px;
}
#ig-content-rank-game-overall {
  color: red;
}
.progress-background {
  background-color: #f1f1f1;
  width: 100%;
  border: 2px solid;
  border-radius: 6px;
  padding: 2px;
  overflow: hidden;
}
.progress-background.overall {
  border-color: red;
}
.progress-foreground {
  height: 33px;
  background-color: #2d32af;
  border-radius: 4px;
}
#ig-content-rank-progress-overall {
  background-color: red;
}
.progress-foreground {
    transition: width 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  #ig-content-rank {
    display: none;
  }
}
</style>
