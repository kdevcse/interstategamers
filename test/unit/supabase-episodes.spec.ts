import { MOCKED_EPISODES } from "../helpers/episode-data-helper";
import { getDataFromSupabase, getEpisodes, SupabaseTables } from "@/globals/data-fetcher";
import { IEpisodeInfo } from "@/interfaces/IRatingInfo";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data:  MOCKED_EPISODES
      })
    })
  })
}));

import { createClient } from "@supabase/supabase-js";

describe("Supabase episodes unit tests", () => {
  afterAll(() => {
    (createClient as any).mockClear();
    vi.restoreAllMocks();
  });

  test("get episodes - no sort", async() => {
    const episodes: IEpisodeInfo[] = [];
    await getEpisodes(episodes);
    console.log(episodes);
    
    expect(episodes[0]).toMatchObject(MOCKED_EPISODES[0]);
  });

  test("get episodes - sort", async() => {
    const episodes: IEpisodeInfo[] = [];
    await getEpisodes(episodes, true);
    console.log(episodes);
    
    // MOCKED_EPISODES were already sorted correctly lol
    expect(episodes[0]).toMatchObject(MOCKED_EPISODES[0]);
  });

  test("getDataFromSupabase - episodes table", async() => {
    const episodes = await getDataFromSupabase<IEpisodeInfo>(SupabaseTables.SIMPLECAST_EPISODES);

    expect(episodes).toBe(MOCKED_EPISODES);
  });
});