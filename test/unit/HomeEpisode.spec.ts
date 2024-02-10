import { useHomeEpisode } from "@/composables/HomeEpisode";

describe("HomeEpisode unit tests", () => {
  describe("useHomeEpisode composable", () => {
    test("emit rating id", () => {
      const ratingId = "123sdsf";
      let eventName = "";
      let eventValues: string[] = [];

      const { emitId } = useHomeEpisode((name: string, vals: Array<string>) => {
        eventName = name;
        eventValues = vals;
      });

      emitId(ratingId);

      expect(eventName).toEqual("id-hovered");
      expect(eventValues[0]).toBe(ratingId);
    });
  });
});
