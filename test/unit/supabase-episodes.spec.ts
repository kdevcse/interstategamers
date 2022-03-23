import { MOCKED_EPISODES } from "../helpers/episode-data-helper";
import { getEpisodes } from "@/globals/supabase";
import { IEpisodeInfo } from "@/interfaces/IRatingInfo";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn().mockReturnValueOnce({
    from: vi.fn().mockReturnValueOnce({
      select: vi.fn().mockResolvedValueOnce({
        data:  MOCKED_EPISODES
      })
    })
  })
}));

import { createClient } from "@supabase/supabase-js";

describe("Supabase episodes unit tests", () => {
  
  afterEach(() => {
    (createClient as any).mockClear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("get episodes", async() => {
    const episodes: IEpisodeInfo[] = [];
    await getEpisodes(episodes);
    console.log(episodes);
    
    expect(episodes[0]).toMatchObject(MOCKED_EPISODES[0]);
  });
});