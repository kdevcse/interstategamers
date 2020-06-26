<template>
  <main class='Ratings'>
    <table id="rankings-table">
		<tr id="rankings-table-options">
			<RankingsOptions @search-table="searchHandler"></RankingsOptions>
		</tr>
		<tr class="rankings-table-header">
			<RankingsHeader @sort-table="sortHandler" title="Rank" category="rank" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="Title" category="Game" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="Year" category="Year" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="Platform" category="Platform" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="IG Score" category="IG Score" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="Gameplay" category="Gameplay" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="Aesthetics" category="Aesthetics" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="Content" category="Content" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="P. Overall" category="Peter's Rating" :sortBy="sortedCategory"></RankingsHeader>
			<RankingsHeader @sort-table="sortHandler" title="K. Overall" category="Kevin's Rating" :sortBy="sortedCategory"></RankingsHeader>
		</tr>
		<RankingRow 
			v-for="episode in episodes"
			:key="episode.id"
			:rank="episode['Ranking Info'].rank"
			:title="episode['Ranking Info'].Game"
			:guest="episode['Ranking Info'].Guest"
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
import RankingsOptions from '@/components/RankingsOptions'
import RankingsHeader from '@/components/RankingsHeader'
import RankingRow from '@/components/RankingRow'
import episodeData from '../database/episode-data'

export default {
	name: 'Ratings',
	components: {
		RankingsOptions,
		RankingsHeader,
		RankingRow
	},
	data: function () {
		return {
			episodes: episodeData.filter(x => x['Ranking Info']).sort((a, b) => {
				return a['Ranking Info']['rank'] - b['Ranking Info']['rank'];
			}),
			sortedCategory: "rank",
			sortedIsAscending: true
		}
	},
	methods: {
		sortHandler: function(e){
			this.sortByCategory(e[0],e[1]);
		},
		searchHandler: function(searchTxt) {
			if (!searchTxt){
				this.episodes = episodeData.filter(x => x['Ranking Info']);
			}
			else {
				this.episodes = episodeData.filter((ep) => {
					if(ep['Ranking Info']){
						const allInfo = Object.values(ep['Ranking Info']);
						return allInfo.some(i => {
							return i.toString().includes(searchTxt);
						});
					}
					else {
						return false;
					}
				});
			}
			this.sortByCategory(this.sortedCategory,this.sortedIsAscending);
		},
		sortByCategory(category, ascending){
			if (category === 'Game' || category === 'Platform'){
				this.episodes.sort(function (a, b) {
					if(ascending) {
						return a['Ranking Info'][category].localeCompare(b['Ranking Info'][category]);
					}
					else {
						return b['Ranking Info'][category].localeCompare(a['Ranking Info'][category]);
					}
				});
			}
			else {
				this.episodes.sort(function (a, b) {
					if(ascending) {
						return a['Ranking Info'][category] - b['Ranking Info'][category];
					}
					else {
						return b['Ranking Info'][category] - a['Ranking Info'][category];
					}
				});
			}

			this.sortedCategory = category;
			this.sortedIsAscending = ascending;
		},
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
