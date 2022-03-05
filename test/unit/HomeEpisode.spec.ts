import { useAudio, useSendScore } from "@/components/HomeEpisode";

describe("HomeEpisode unit tests", () => {
  describe("useAudio composable", () => {
    test("With audio element", () => {
      let playCount = 0;
      let pauseCount = 0;

      const { playing, play } = useAudio({
        play: () => {
          playCount++;
        },
        pause: () => {
          pauseCount++;
        },
      } as any);

      expect(playing.value).toBe(false);
      expect(playCount).toBe(0);
      expect(pauseCount).toBe(0);
      play();
      expect(playing.value).toBe(true);
      expect(playCount).toBe(1);
      expect(pauseCount).toBe(0);
      play();
      expect(playing.value).toBe(false);
      expect(playCount).toBe(1);
      expect(pauseCount).toBe(1);
    });

    test("Without audio element", () => {
      const { playing, play } = useAudio(null as any);

      expect(playing.value).toBe(false);
      play();
      expect(playing.value).toBe(false);
    });

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
});
