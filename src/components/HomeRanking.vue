<template>
  <aside id='ig-content-rank'>
    <h2 id='ig-content-rank-game-title'>{{getTitle}}</h2>
    <h1 id='ig-content-rank-game-rank'>Rank {{rank}}/{{totalGames}}</h1>
    <RankMeter alt h1 type="Overall" height="33px" :percentage="getOverall"></RankMeter>
    <RankMeter h1 type="Gameplay" height="33px" :percentage="getGameplay"></RankMeter>
    <RankMeter h1 type="Aesthetics" height="33px" :percentage="getAesthetics"></RankMeter>
    <RankMeter h1 type="Content" height="33px" :percentage="getContent"></RankMeter>
  </aside>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IRankingInfo } from '../interfaces/IRankingInfo'
import RankMeter from '@/components/RankMeter.vue';

@Component({
	components: {
    RankMeter
	}
})
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
  color: var(--primary-color);
}
#ig-content-rank-game-title {
  margin-bottom: 0;
}
#ig-content-rank-game-rank {
  font-size: 17px;
  margin: 5px 0px;
}
#ig-content-rank > .rank-meter > .rank-header {
  margin: 10px 0px;
  font-size: 18.72px;
  font-weight: bolder;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 992px) {
  #ig-content-rank {
    display: none;
  }
}
</style>
