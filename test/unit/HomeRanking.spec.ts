import { useRankingValues } from "@/components/HomeRanking";

describe("HomeRanking unit tests", () => {
  describe("useRankingValues composable", () => {
    test("getTitle: non-empty prop", () => {
      const gameTitle = "MyGame";
      const { getTitle } = useRankingValues({
        title: gameTitle
      });
  
      expect(getTitle.value).toBe(gameTitle);
    });

    test("getTitle: empty prop", () => {
      const { getTitle } = useRankingValues({
        title: undefined
      });
  
      expect(getTitle.value).toBe("Hover a review to see its ranking!");
    });

    test("getGameplay: non-empty prop", () => {
      const gameplayScore = 99;
      const { getGameplay } = useRankingValues({
        gameplay: 99
      });
  
      expect(getGameplay.value).toBe(gameplayScore);
    });

    test("getGameplay: empty prop", () => {
      const { getGameplay } = useRankingValues({
        title: undefined
      });
  
      expect(getGameplay.value).toBe(0);
    });

    test("getAesthetics: non-empty prop", () => {
      const aestheticsScore = 99;
      const { getAesthetics } = useRankingValues({
        aesthetics: 99
      });
  
      expect(getAesthetics.value).toBe(aestheticsScore);
    });

    test("getAesthetics: empty prop", () => {
      const { getAesthetics } = useRankingValues({
        aesthetics: undefined
      });
  
      expect(getAesthetics.value).toBe(0);
    });

    test("getContent: non-empty prop", () => {
      const contentScore = 99;
      const { getContent } = useRankingValues({
        content: 99
      });
  
      expect(getContent.value).toBe(contentScore);
    });

    test("getContent: empty prop", () => {
      const { getContent } = useRankingValues({
        content: undefined
      });
  
      expect(getContent.value).toBe(0);
    });

    test("getOverall: non-empty prop", () => {
      const overallScore = 99;
      const { getOverall } = useRankingValues({
        overall: 99
      });
  
      expect(getOverall.value).toBe(overallScore);
    });

    test("getOverall: empty prop", () => {
      const { getOverall } = useRankingValues({
        overall: undefined
      });
  
      expect(getOverall.value).toBe(0);
    });
  });
});