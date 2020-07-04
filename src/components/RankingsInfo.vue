<template>
    <div class="rankings-info-row" :class="{expanded: isSelected()}">
		<div v-show="isSelected()" class="breakdown-details">
			<p class="breakdown-day">{{getReleaseDateTxt()}}</p>
			<img class="breakdown-img"/>
			<div class="breakdown-scores">
				<div class="critic-section">
					<img class="critic-logo" src="../assets/images/meta_logo.png"/>
					<span>{{metacritic}}</span>
				</div>
				<div class="critic-section">
					<img class="critic-logo" src="../assets/images/ign_logo.png"/>
					<span>{{ign}}</span>
				</div>
			</div>
		</div>
		<RankingsBreakdown  reviewer="Peter" v-show="isSelected()" :scores="peterScores"></RankingsBreakdown>
		<RankingsBreakdown  reviewer="Kevin" v-show="isSelected()" :scores="kevinScores"></RankingsBreakdown>
		<RankingsBreakdown  :reviewer="guest" v-if="guest" v-show="isSelected()" :scores="kevinScores"></RankingsBreakdown>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import RankingsBreakdown from '@/components/RankingsBreakdown.vue';

@Component({
	components: {
		RankingsBreakdown
	}
})
export default class RankingsInfo extends Vue {
	@Prop() title!: string;
	@Prop() selected!: string;
	@Prop() date!: string;
	@Prop() img!: string;
	@Prop() ign!: number;
	@Prop() metacritic!: number;
	@Prop() rankInfo!: any;

	peterScores = [];
	kevinScores = [];
	guestScores = [];
	chartLoaded = false;
	guest = null;

	isSelected() {
		return this.title === this.selected;
	}

	getReleaseDateTxt(): string {
		const dateObj = new Date(this.date);
		let dateTxt = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
		return `Reviewed ${dateTxt}`;
	}

	mounted() {
		this.getScores();
		this.chartLoaded = true;
	}

	@Watch('rankInfo')
	getScores() {
		let gatherKevinScores: any = [];
		gatherKevinScores.push(this.rankInfo['Kevin\'s Rating']);
		gatherKevinScores.push(this.rankInfo['K. Gameplay']);
		gatherKevinScores.push(this.rankInfo['K. Visuals']);
		gatherKevinScores.push(this.rankInfo['K. Audio']);
		gatherKevinScores.push(this.rankInfo['K. Content']);

		let gatherPeterScores: any = [];
		gatherPeterScores.push(this.rankInfo['Peter\'s Rating']);
		gatherPeterScores.push(this.rankInfo['P. Gameplay']);
		gatherPeterScores.push(this.rankInfo['P. Visuals']);
		gatherPeterScores.push(this.rankInfo['P. Audio']);
		gatherPeterScores.push(this.rankInfo['P. Content']);

		if(this.rankInfo.Guest) {
			this.guest = this.rankInfo.Guest;
			let gatherGuestScores: any = [];
			gatherGuestScores.push(this.rankInfo['Guest Rating']);
			gatherGuestScores.push(this.rankInfo['G. Gameplay']);
			gatherGuestScores.push(this.rankInfo['G. Visuals']);
			gatherGuestScores.push(this.rankInfo['G. Audio']);
			gatherGuestScores.push(this.rankInfo['G. Content']);
			this.guestScores = gatherGuestScores;
		}

		this.kevinScores = gatherKevinScores;
		this.peterScores = gatherPeterScores;
	}
}
</script>

<style scoped>
.rankings-info-row {
	grid-column: 1/-1;
	height: 0px;
	transition: height 0.2s ease-out;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-auto-columns: 1fr;
	overflow: hidden;
}
.charts {
	display: none;
	transition: height 2s linear;
	align-items: center;
}
.breakdown-day {
	margin: 0 auto 9px auto;
	font-size: 15px;
}
.breakdown-img {
	max-width: 200px;
	max-height: 188px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 3px;
	align-self: center;
}
.breakdown-details {
	padding: 0 10%;
	overflow: hidden;
}
.breakdown-scores {
	margin-left: auto;
	margin-right: auto;
	display: grid;
	grid-template-columns: 50% 50%;
}
.critic-logo {
	height: 30px;
	width: 30px;
	margin-right: 5px;
	justify-self: center;
}
.critic-section {
	justify-items: center;
}
.meta-container, .ign-container {
	align-items: center;
	align-self: center;
	display: inline-flex;
}
.meta-logo, .ign-logo {
	height: 30px;
	width: 30px;
	margin-right: 5px;
}
.meta-score{
	margin-right: 20px;
}

/* Larger devices than phones */
@media only screen and (min-width: 770px){
	.chart {
		overflow: hidden;
		width: 200px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}
	.chart > h3{
		margin-top: 0;
		margin-bottom: 8px;
		font-size: 15px;
	}
	.expanded-breakdown{
		display: inline-grid;
		grid-template-columns: 250px 250px 250px 250px;
		margin-bottom: 20px;
	}
	.charts{
		float: left;
		margin-left: 64px;
		margin-top: 13px;
	}
	.stat-category{
		text-align: left;
		margin-top: 0px;
		margin-bottom: 2px;
		font-size: 13px;
	}
	.rank {
		height: 20px;
		width: 100%;
		margin-bottom: 6px;
		background-color: white;
		border: #2d32af solid 2px;
		border-radius: 3px;
	}
	.progress{
		width: 0%;
		height: 100%;
		background-color: #2d32af;
	}
	.overall{
		border: red solid 2px;
	}
	.overall-progress{
		background-color: red;
	}
	.rankings-info-row.expanded {
		height: 325px;
		background-color: #f0f0f5;
		border-bottom: #2d32af solid 1px;
	}
	.rankings-info-row.expanded > .breakdown-radar {
		height: auto;
	}
}
</style>