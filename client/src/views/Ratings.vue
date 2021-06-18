<template>
  <main class="ratings">
    <RankingsOptions @search-table="searchHandler"></RankingsOptions>
    <div id="rankings-table">
      <div id="rankings-header">
        <RankingsHeader
          @sort-table="sortHandler"
          title="Rank"
          category="rank"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="Title"
          category="Game"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="Year"
          category="Year"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="Platform"
          category="Platform"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="IG Score"
          category="IG Score"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="Gameplay"
          category="Gameplay"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="Aesthetics"
          category="Aesthetics"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="Content"
          category="Content"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="P. Overall"
          category="Peter's Rating"
          :sortBy="sortedCategory"
        ></RankingsHeader>
        <RankingsHeader
          @sort-table="sortHandler"
          title="K. Overall"
          category="Kevin's Rating"
          :sortBy="sortedCategory"
        ></RankingsHeader>
      </div>
      <template v-for="ranking in sortedRankings">
        <RankingRow
          :key="ranking.id"
          :rank="ranking.rank"
          :title="ranking.game"
          :guest="ranking.guest"
          :year="ranking.year"
          :platform="ranking.platform"
          :overall="ranking.ig_score"
          :gameplay="ranking.gameplay"
          :aesthetics="ranking.aesthetics"
          :content="ranking.content"
          :pOverall="ranking.p_rating"
          :kOverall="ranking.k_rating"
          :sortBy="sortedCategory"
          :selected="selectedEpisode"
          @row-selected="selectedRowHandler"
        ></RankingRow>
        <RankingsInfo
          :key="`${ranking.id}-info`"
          :date="ranking.published_at"
          :img="ranking.game_image"
          :title="ranking.game"
          :selected="selectedEpisode"
          :rankInfo="ranking"
          :ign="ranking.ign"
          :metacritic="ranking.metacritic"
        ></RankingsInfo>
      </template>
    </div>
  </main>
</template>

<script>
import RankingsOptions from "@/components/RankingsOptions";
import RankingsHeader from "@/components/RankingsHeader";
import RankingRow from "@/components/RankingRow";
import RankingsInfo from "@/components/RankingsInfo";
import firebase from "firebase/app";
import "@firebase/firestore";

export default {
  name: "Ratings",
  components: {
    RankingsOptions,
    RankingsHeader,
    RankingRow,
    RankingsInfo
  },
  mounted() {
    const episodePromise = this.getDataFromFirestore('podcast', this.episodes);
    const rankingsPromise = this.getDataFromFirestore('ratings', this.rankings);
  },
  data: function() {
    return {
      episodes: [],
      rankings: [],
      sortedCategory: "ig_score",
      sortedIsAscending: true,
      hoveredEpisode: null,
      selectedEpisode: null,
      searchTxt: null,
    };
  },
  computed: {
    sortedRankings() {
      const isAlphabeticSort = this.sortedCategory === "game" || this.sortedCategory === "platform";
      const sortFunc = isAlphabeticSort ? this.sortByAlphabet : this.sortByNumber;
      const sortedRanks = this.rankings.sort((a, b) => sortFunc(a, b));
      sortedRanks.forEach((ranking, index) => {
        const currentScore = ranking.ig_score;
        const lastScore = index > 0 ? sortedRanks[index - 1].ig_score : null;
        ranking.rank = lastScore && (currentScore === lastScore) ? sortedRanks[index - 1].rank : index + 1;

        if (ranking.id === this.hoveredRankingId) {
          rankingFound = ranking;
          return;   
        }
      });
      return this.searchTxt ? sortedRanks.filter((rank) => {
        const allInfo = Object.values(rank);
        return allInfo.some(i => i.toString().includes(this.searchTxt));
      }) : sortedRanks;
    }
  },
  methods: {
    getDataFromFirestore(type, dataArray) {
      return firebase
        .firestore()
        .collection(`${type}-data`)
        .get()
        .then(c => {
          c.docs.forEach(doc => {
            dataArray.push(doc.data());
          });
        })
        .catch(error => {
          console.error(`An error occured fetching ${type} data: ${error}`);
        });
    },
    shouldHighlight(category) {
      return category === this.sortedCategory;
    },
    shouldEmphasize(episode) {
      return (
        episode === this.hoveredEpisode || episode === this.selectedEpisode
      );
    },
    hoveredRowHandler(e) {
      this.hoveredEpisode = e;
    },
    selectedRowHandler(e) {
      this.selectedEpisode = e;
    },
    sortHandler(e) {
      this.sortedCategory = e[0];
      this.sortedIsAscending = e[1];
    },
    sortByNumber(a, b) {
      const category = this.sortedCategory;
      return this.sortedIsAscending ? b[category] - a[category] : a[category] - b[category];
    },
    sortByAlphabet(a, b) {
      const category = this.sortedCategory;
      return this.sortedIsAscending ? a[category].localeCompare(b[category]) : b[category].localeCompare(a[category]);
    },
    searchHandler(searchTxt) {
      this.searchTxt = searchTxt;
    }
  }
};
</script>

<style scoped>
#rankings-table {
  position: relative;
  top: 67px;
  width: 100%;
  min-width: fit-content;
  text-align: center;
}
#rankings-header {
  position: sticky;
  top: 137px;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(150px, 2fr) repeat(
      8,
      minmax(150px, 1fr)
    );
  background-color: var(--primary-color);
}
@media screen and (prefers-color-scheme: dark) {
  #rankings-header {
    background-color: var(--secondary-color);
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px) {
  body {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
