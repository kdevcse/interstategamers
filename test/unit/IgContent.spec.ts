import { getHoveredRankingsTitle, useIgContent } from "@/components/IgContent";
import { MOCKED_RATINGS, pushAllMockedEpisodes, pushAllMockedRatings } from "../helpers/episode-data-helper";

describe("IgContent unit tests", () => {
  describe("useIgContent composable", () => {

    test("showScores", () => {
      const rankIdFromHover = MOCKED_RATINGS[0].id;
      const { showScores, rankings, hoveredRanking, hoveredRankingId } = useIgContent();

      pushAllMockedRatings(rankings);
      showScores([rankIdFromHover]);

      expect(hoveredRankingId.value).toBe(rankIdFromHover);
      expect(hoveredRanking.value).toMatchObject(MOCKED_RATINGS[0]);
    });

    test("getRankingId found id", () => {
      const season = 1;
      const episode = 1;

      const { getRankingId, rankings } = useIgContent();

      pushAllMockedRatings(rankings);

      const rankingId = getRankingId(season, episode);

      expect(rankingId).toBe(MOCKED_RATINGS[0].id);
    });

    test("getRankingId id NOT found", () => {
      const season = 1;
      const episode = 3;

      const { getRankingId, rankings } = useIgContent();

      pushAllMockedRatings(rankings);

      const rankingId = getRankingId(season, episode);

      expect(rankingId).toBe("");
    });

    test("isFinale: true and index not 0", () => {
      const { isFinale, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes);

      const finale = isFinale(2);

      expect(finale).toBe(true);
    });

    test("isFinale: false and index not 0", () => {
      const { isFinale, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes);

      const finale = isFinale(1);

      expect(finale).toBe(false);
    });

    test("isFinale: index not 0", () => {
      const { isFinale, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes);

      const finale = isFinale(0);

      expect(finale).toBe(true);
    });

    test("pageIsReady: true", () => {
      const { rankings, episodes, pageIsReady } = useIgContent();

      pushAllMockedEpisodes(episodes);
      pushAllMockedRatings(rankings);

      expect(pageIsReady.value).toBe(true);
    });

    test("pageIsReady: false", () => {
      const { pageIsReady } = useIgContent();

      expect(pageIsReady.value).toBe(false);
    });

    test("totalGames", () => {
      const { totalGames, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes);

      expect(totalGames.value).toBe(3);
    });
  });
  describe("getHoveredRankingsTitle function", () => {
    test("episode and game defined", () => {
      const episode = "5-8";
      const game = "The World Is Not Enough";
      const hoveredRankingsTitle = getHoveredRankingsTitle(episode, game);

      expect(hoveredRankingsTitle).toBe(`${episode}: ${game}`);
    });

    test("episode and game undefined", () => {
      const hoveredRankingsTitle = getHoveredRankingsTitle(undefined, undefined);

      expect(hoveredRankingsTitle).toBe(undefined);
    });
  });
});