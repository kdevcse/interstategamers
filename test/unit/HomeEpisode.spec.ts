import { useSendScore } from "@/composables/HomeEpisode";

describe("HomeEpisode unit tests", () => {
  describe("useSendScore composable", () => {
    test("With ranking id", () => {
      const rankingId = "123sdsf";
      let eventName = "";
      let eventValues: Array<string> = [];

      const emit = (name: string, vals: Array<string>) => {
        eventName = name;
        eventValues = vals;
      };

      const { sendScore } = useSendScore(emit);

      sendScore(rankingId);

      expect(eventName).toBe("show-score");
      expect(eventValues[0]).toBe(rankingId);
    });

    test("Without ranking id", () => {
      let eventName = "";
      let eventValues: Array<string> = [];

      const emit = (name: string, vals: Array<string>) => {
        eventName = name;
        eventValues = vals;
      };

      const { sendScore } = useSendScore(emit);

      sendScore(undefined);

      expect(eventName).toBe("");
      expect(eventValues[0]).toBe(undefined);
    });
  });
});
