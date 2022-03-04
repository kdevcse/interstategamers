import { useAudio, useSendScore } from "@/components/HomeEpisode";

describe("HomeEpisode unit tests", () => {
  test("useAudio composable with audio element", () => {
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

  test("useAudio composable with audio element", () => {
    const { playing, play } = useAudio(null as any);

    expect(playing.value).toBe(false);
    play();
    expect(playing.value).toBe(false);
  });

  test("useSendScore composable with ranking id", () => {
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

  test("useSendScore composable without ranking id", () => {
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
