<template>
  <main class='Ratings'>
	<RankingsOptions @search-table="searchHandler"></RankingsOptions>
    <div id="rankings-table">
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
		<template v-for="episode in episodes">
				<RankingsCell 
					:key="`${episode.id}-rank`"
					:class="`${episode.number}`"
					:value="episode['Ranking Info'].rank"
					:highlight="shouldHighlight('rank')"/>
				<RankingsCell 
					:key="`${episode.id}-title`"
					:class="`${episode.number}`"
					:guest="episode['Ranking Info'].Guest"
					:value="episode['Ranking Info'].Game"
					:highlight="shouldHighlight('Game')"/>
				<RankingsCell 
					:key="`${episode.id}-year`"
					:class="`${episode.number}`"
					:value="episode['Ranking Info'].Year"
					:highlight="shouldHighlight('Year')"/>
				<RankingsCell 
					:key="`${episode.id}-platform`"
					:class="`${episode.number}`"
					:value="episode['Ranking Info'].Platform"
					:highlight="shouldHighlight('Platform')"/>
				<RankingsCell 
					:key="`${episode.id}-overall`"
					:class="`${episode.number}`"
					:value="episode['Ranking Info']['IG Score']"
					round="true"
					:highlight="shouldHighlight('IG Score')"/>
				<RankingsCell 
					:key="`${episode.id}-gameplay`"
					:class="`${episode.number}`"
					:value="episode['Ranking Info'].Gameplay"
					round="true"
					:highlight="shouldHighlight('Gameplay')"/>
				<RankingsCell 
					:key="`${episode.id}-aesthetics`" 
					:class="`${episode.number}`"
					:value="episode['Ranking Info'].Aesthetics"
					round="true"
					:highlight="shouldHighlight('Aesthetics')"/>
				<RankingsCell
					:key="`${episode.id}-content`"
					:class="`${episode.number}`"
					:value="episode['Ranking Info'].Content"
					round="true"
					:highlight="shouldHighlight('Content')"/>
				<RankingsCell 
					:key="`${episode.id}-pRating`" 
					:class="`${episode.number}`"
					:value="episode['Ranking Info']['Peter\'s Rating']"
					round="true"
					:highlight="shouldHighlight('Peter\'s Rating')"/>
				<RankingsCell 
					:key="`${episode.id}-kRating`"
					:class="`${episode.number}`"
					:value="episode['Ranking Info']['Kevin\'s Rating']"
					round="true"
					:highlight="shouldHighlight('Kevin\'s Rating')"/>
				<RankingsInfo :key="`${episode.id}-info`"></RankingsInfo>
		</template>
	</div>
  </main>
</template>

<script>
import RankingsOptions from '@/components/RankingsOptions'
import RankingsHeader from '@/components/RankingsHeader'
import RankingsCell from '@/components/RankingsCell'
import RankingRow from '@/components/RankingRow'
import RankingsInfo from '@/components/RankingsInfo'
import episodeData from '../database/episode-data'

export default {
	name: 'Ratings',
	components: {
		RankingsOptions,
		RankingsHeader,
		RankingRow,
		RankingsCell,
		RankingsInfo
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
		shouldHighlight(category) {
			return category === this.sortedCategory;
		},
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
.test:hover {
	background-color: purple;
}
#rankings-table {
	position: relative;
	top: 65px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(10, minmax(150px, auto));
	text-align: center;
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
