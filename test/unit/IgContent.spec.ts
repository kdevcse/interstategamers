import { useIgContent } from "@/composables/IgContent";
import { MOCKED_RATINGS, MOCKED_EPISODES, pushAllMockedEpisodes, pushAllMockedRatings } from "../helpers/episode-data-helper";

describe("IgContent unit tests", () => {
  describe("useIgContent composable", () => {
    test("showScores", () => {
      const rankIdFromHover = MOCKED_RATINGS[0].id;
      const { showScores, rankings, episodes, hoveredEpisode, hoveredRanking, hoveredRankingId } = useIgContent();

      pushAllMockedEpisodes(episodes);
      pushAllMockedRatings(rankings);
      showScores([rankIdFromHover]);

      expect(hoveredRankingId.value).toBe(rankIdFromHover);
      expect(hoveredRanking.value).toMatchObject(MOCKED_RATINGS[0]);
      expect(hoveredEpisode.value).toMatchObject(MOCKED_EPISODES[0]);
    });

    test("getRankingId found id", () => {
      const { getRankingId, rankings } = useIgContent();

      pushAllMockedRatings(rankings);

      const rankingId = getRankingId(MOCKED_RATINGS[0].simplecast_id);

      expect(rankingId).toBe(MOCKED_RATINGS[0].id);
    });

    test("getRankingId id NOT found", () => {
      const { getRankingId, rankings } = useIgContent();

      pushAllMockedRatings(rankings);

      const rankingId = getRankingId("");

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
});