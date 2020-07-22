<template>
    <div class="rankings-breakdown">
        <h3>{{reviewer}}'s Scores</h3>
        <RankMeter alt type="Overall" :percentage="scores[0]"></RankMeter>
        <RankMeter type="Gameplay" :percentage="scores[1]"></RankMeter>
        <RankMeter type="Visuals" :percentage="scores[2]"></RankMeter>
        <RankMeter type="Audio" :percentage="scores[3]"></RankMeter>
        <RankMeter type="Content" :percentage="scores[4]"></RankMeter>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import RankMeter from '@/components/RankMeter.vue';

@Component({
	components: { 
        RankMeter
	}
})
export default class IgContent extends Vue {
    @Prop() reviewer!: string;
    @Prop() scores!: number[];
}
</script>

<style scoped>
.rankings-breakdown {
    margin: 0px 5%;
    padding: 16px 8% 20px 8%;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 6px;
}
h3 {
    margin: 5px 0px;
}
@media screen and (prefers-color-scheme: dark) {
  .rankings-breakdown {
    background-color: rgba(255,255,255, 6%);
    border-color: var(--primary-color);
  }
}
</style>