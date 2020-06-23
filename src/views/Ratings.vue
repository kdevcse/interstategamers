<template>
  <main class='Ratings'>
    <table id="rankings-table">
		<tr id="rankings-table-options">
			<th class="options-header" colspan="10">
				<input id="options-searchbox" type="text" placeholder="Search" value="" autocomplete="off">
				<div id="scroll-indicators">
					<i id="scroll-indicator-left" class="fas fa-caret-square-left" title="Scroll left to see more content"></i>
					<span>Scroll for more</span>
					<i id="scroll-indicator-right" class="fas fa-caret-square-right" title="Scroll right to see more content"></i>
				</div>
			</th>
		</tr>
		<tr class="rankings-table-header">
			<RankingsHeader @sort-table="sortCateogry" title="Rank" category="rank" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="Title" category="Game" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="Year" category="Year" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="Platform" category="Platform" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="IG Score" category="IG Score" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="Gameplay" category="Gameplay" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="Aesthetics" category="Aesthetics" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="Content" category="Content" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="P. Overall" category="Peter's Rating" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortCateogry" title="K. Overall" category="Kevin's Rating" :sortBy="sortedCategory"></RankingsHeader>
		</tr>
		<RankingRow 
			v-for="episode in episodes"
			:key="episode.id"
			:rank="episode['Ranking Info'].rank"
			:title="episode['Ranking Info'].Game"
			:year="episode['Ranking Info'].Year"
			:platform="episode['Ranking Info'].Platform"
			:overall="episode['Ranking Info']['IG Score']"
			:gameplay="episode['Ranking Info'].Gameplay"
			:aesthetics="episode['Ranking Info'].Aesthetics"
			:content="episode['Ranking Info'].Content"
			:pOverall="episode['Ranking Info']['Peter\'s Rating']"
			:kOverall="episode['Ranking Info']['Kevin\'s Rating']"
			:sortBy="sortedCategory">
		</RankingRow>
	</table>
  </main>
</template>

<script>
import { pingClient } from '../database/faunadb'
import RankingsHeader from '@/components/RankingsHeader'
import RankingRow from '@/components/RankingRow'
import episodeData from '../database/episode-data'

export default {
	name: 'Ratings',
	components: {
		RankingsHeader,
		RankingRow
	},
	mounted () {
		pingClient();
	},
	data: function () {
		return {
			episodes: episodeData.filter(x => x['Ranking Info']).sort((a, b) => {
				return a['Ranking Info']['rank'] - b['Ranking Info']['rank'];
			}),
			sortedCategory: "rank"
		}
	},
	methods: {
		sortCateogry: function(e){
			const category = e[0];
			const ascending = e[1];

			this.episodes = this.episodes.sort(function (a, b) {
				if(ascending) {
					return a['Ranking Info'][category] - b['Ranking Info'][category];
				}
				else {
					return b['Ranking Info'][category] - a['Ranking Info'][category];
				}
			});

			this.sortedCategory = category;
		}
	}
}
</script>

<style scoped>
#rankings-table{
	position: relative;
	top: 45px;
	min-width: 100%;
	text-align: center;
	border-collapse: collapse;
	table-layout: fixed;
}
#rankings-table-options{
	background-color: #2d32af;
	color: white;
}
#rankings-table-options .options-header{
	background-color: #2d32af;
	position: fixed;
	height: 45px;
	width: 100%;
	top: 70px;
	text-align: left;
	align-items: center;
	padding: 20px 65px 0px 65px;
}
.options-header input {
	height: 25px;
	border: none;
	border: solid 1px #ccc;
	border-radius: 3px;
	border-collapse: collapse;
	padding: 6px 8px;
	margin-right: 30px;
}
.options-header input::-ms-clear{
	display: none;
}
#scroll-indicators{
	float: right;
}
#scroll-indicator-left, #scroll-indicator-right{
	visibility: hidden;
}
.rankings-table-header{
	background-color: #2d32af;
	color: white;
	font-weight: normal;
}
.rankings-row-info{
	display: table-row;
}
.rankings-table-info{
	padding: 0;
}
.charts{
	display: none;
	transition: height 2s linear;
	align-items: center;
}
.breakdown-day{
	margin: 0 auto 9px auto;
	font-size: 15px;
}
.breakdown-img{
	max-width: 200px;
	max-height: 188px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 3px;
	align-self: center;
}
.breakdown-scores{
	margin-left: auto;
	margin-right: auto;
	margin-top: 2px;
}
.meta-container, .ign-container{
	align-items: center;
	align-self: center;
	display: inline-flex;
}
.meta-logo, .ign-logo{
	height: 30px;
	width: 30px;
	margin-right: 5px;
}
.meta-score{
	margin-right: 20px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px){
	body{
		-webkit-overflow-scrolling: touch;
	}
	#rankings-table-options .options-header{
		padding: 10px 20px 0px 20px;
	}
	.options-header input {
		margin-right: 15px;
	}
}
/* Larger devices than phones */
@media only screen and (min-width: 770px){
	#rankings-table-options .options-header{
		padding: 20px 65px 0px 65px;
	}
	.options-header input {
		margin-right: 30px;
	}
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
	.expanded{
		display: table-row;
		background-color: #f0f0f5;
		border-bottom: #2d32af solid 1px;
	}
}
</style>
