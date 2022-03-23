import { useIgContent } from "@/composables/IgContent";
import { MOCKED_RATINGS, MOCKED_EPISODES, pushAllMockedEpisodes, pushAllMockedRatings } from "../helpers/episode-data-helper";

describe("IgContent unit tests", () => {
  describe("useIgContent composable", () => {
    test("showScores", () => {
      const rateIdFromHover = MOCKED_EPISODES[0].simplecast_id;
      const { showScores, episodes, hoveredEpisode } = useIgContent();

      pushAllMockedEpisodes(episodes.value);
      showScores([rateIdFromHover]);

      expect(hoveredEpisode.value.ratingData).toMatchObject(MOCKED_RATINGS[0]);
    });

    test("showScores - null rating id from hover", () => {
      const { showScores, episodes, hoveredEpisode } = useIgContent();

      pushAllMockedEpisodes(episodes.value);
      showScores([]);

      expect(hoveredEpisode.value).toMatchObject({});
    });

    test("showScores x2 - episode not found on 2nd hover", () => {
      const rateIdFromHover = MOCKED_EPISODES[0].simplecast_id;
      const { showScores, episodes, hoveredEpisode } = useIgContent();

      pushAllMockedEpisodes(episodes.value);

      showScores([rateIdFromHover]);
      expect(hoveredEpisode.value.ratingData).toMatchObject(MOCKED_RATINGS[0]);
      
      showScores(["hdj3nfj3"]);
      expect(hoveredEpisode.value.ratingData).toMatchObject(MOCKED_RATINGS[0]);
    });

    test("isFinale: true and index not 0", () => {
      const { isFinale, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes.value);

      const finale = isFinale(2);

      expect(finale).toBe(true);
    });

    test("isFinale: false and index not 0", () => {
      const { isFinale, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes.value);

      const finale = isFinale(1);

      expect(finale).toBe(false);
    });

    test("isFinale: index not 0", () => {
      const { isFinale, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes.value);

      const finale = isFinale(0);

      expect(finale).toBe(true);
    });

    test("pageIsReady: true", () => {
      const { ratings, episodes, pageIsReady } = useIgContent();

      pushAllMockedEpisodes(episodes.value);
      pushAllMockedRatings(ratings.value);

      expect(pageIsReady.value).toBe(true);
    });

    test("pageIsReady: false", () => {
      const { pageIsReady } = useIgContent();

      expect(pageIsReady.value).toBe(false);
    });

    test("totalGames", () => {
      const { totalGames, episodes } = useIgContent();

      pushAllMockedEpisodes(episodes.value);

      expect(totalGames.value).toBe(3);
    });
  });
});