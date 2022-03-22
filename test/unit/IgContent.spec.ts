import { useIgContent } from "@/composables/IgContent";
import { MOCKED_RATINGS, MOCKED_EPISODES, pushAllMockedEpisodes, pushAllMockedRatings } from "../helpers/episode-data-helper";

describe("IgContent unit tests", () => {
  describe("useIgContent composable", () => {
    //TODO: replace with component test
    test.todo.skip("showScores", () => {
      const rankIdFromHover = MOCKED_RATINGS[0].id;
      const { showScores, ratings, episodes, hoveredEpisode } = useIgContent();

      pushAllMockedEpisodes(episodes.value);
      pushAllMockedRatings(ratings.value);
      showScores([rankIdFromHover]);

      expect(hoveredEpisode.value.ratingData).toMatchObject(MOCKED_EPISODES[0]);
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