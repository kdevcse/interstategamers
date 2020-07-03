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
    padding: 0px 15%;
}
h3 {
    margin: 5px 0px;
}
</style>