import { useAudio } from "@/components/HomeEpisode";

describe("HomeEpisode unit tests", () => {
  test("useAudio composable", () => {
    let playCount = 0;
    let pauseCount = 0;

    const { playing, play } = useAudio({
      play: () => {
        playCount++;
      },
      pause: () => {
        pauseCount++;
      }
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
});
