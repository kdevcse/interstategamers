<template>
  <main class='Ratings'>
	<RankingsOptions @search-table="searchHandler"></RankingsOptions>
    <div id="rankings-table">
		<div id="rankings-header">
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
		</div>
		<template v-for="episode in episodes">
				<RankingRow
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
					:sortBy="sortedCategory"
					:selected="selectedEpisode"
					@row-selected="selectedRowHandler">
				</RankingRow>
				<RankingsInfo 
					:key="`${episode.id}-info`"
					:date="episode.published_at"
					:title="episode['Ranking Info'].Game"
					:selected="selectedEpisode"
					:rankInfo="episode['Ranking Info']"
					:ign="episode['Ranking Info'].IGN"
					:metacritic="episode['Ranking Info'].Metacritic">
				</RankingsInfo>
		</template>
	</div>
  </main>
</template>

<script>
import RankingsOptions from '@/components/RankingsOptions'
import RankingsHeader from '@/components/RankingsHeader'
import RankingRow from '@/components/RankingRow'
import RankingsInfo from '@/components/RankingsInfo'
import episodeData from '../database/episode-data'

export default {
	name: 'Ratings',
	components: {
		RankingsOptions,
		RankingsHeader,
		RankingRow,
		RankingsInfo
	},
	data: function () {
		return {
			episodes: episodeData.filter(x => x['Ranking Info']).sort((a, b) => {
				return a['Ranking Info']['rank'] - b['Ranking Info']['rank'];
			}),
			sortedCategory: "rank",
			sortedIsAscending: true,
			hoveredEpisode: null,
			selectedEpisode: null
		}
	},
	methods: {
		shouldHighlight(category) {
			return category === this.sortedCategory;
		},
		shouldEmphasize(episode) {
			return episode === this.hoveredEpisode || episode === this.selectedEpisode;
		},
		hoveredRowHandler(e) {
			this.hoveredEpisode = e;
		},
		selectedRowHandler(e) {
			this.selectedEpisode = e;
		},
		sortHandler(e) {
			this.sortByCategory(e[0],e[1]);
		},
		searchHandler(searchTxt) {
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
		sortByCategory(category, ascending) {
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
#rankings-table {
	position: relative;
	top: 65px;
	width: 100%;
	text-align: center;
}
#rankings-header{
	position: sticky;
	top: 135px;
	display: grid;
	grid-template-columns: minmax(150px, 1fr) minmax(150px, 2fr) repeat(8, minmax(150px, 1fr));
}
.rankings-table-header {
	background-color: #2d32af;
	color: white;
	font-weight: normal;
	width: 100%;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px){
	body{
		-webkit-overflow-scrolling: touch;
	}
}
</style>
