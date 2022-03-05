import { useAudio } from "@/composables/global-composables";

describe("Global composables unit tests", () => {
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
  }); 
});