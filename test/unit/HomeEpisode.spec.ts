import { useHomeEpisode } from "@/composables/HomeEpisode";

describe("HomeEpisode unit tests", () => {
  describe("useHomeEpisode composable", () => {
    test("emit rating id", () => {
      const ratingId = "123sdsf";
      let eventName = "";
      let eventValues: string[] = [];

      const { emitId, isGameReview } = useHomeEpisode("some-type", (name: string, vals: Array<string>) => {
        eventName = name;
        eventValues = vals;
      });

      emitId(ratingId);

      expect(eventName).toEqual("id-hovered");
      expect(eventValues[0]).toBe(ratingId);
      expect(isGameReview.value).toBe(false);
    });

    test("is game review - true", () => {
      const { isGameReview } = useHomeEpisode("full", null);
      expect(isGameReview.value).toBe(true);
    });

    test("is game review - false", () => {
      const { isGameReview } = useHomeEpisode("any-type", null);
      expect(isGameReview.value).toBe(false);
    });
  });
});
