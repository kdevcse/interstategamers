import { MOCKED_RATINGS } from "../helpers/episode-data-helper";
import { getDataFromSupabase, getRatings, SupabaseTables } from "@/globals/supabase";
import { IRatingInfo } from "@/interfaces/IRatingInfo";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data:  MOCKED_RATINGS
      })
    })
  })
}));

import { createClient } from "@supabase/supabase-js";

describe("supabase ratings unit tests", () => {

  afterAll(() => {
    (createClient as any).mockClear();
    vi.restoreAllMocks();
  });
  
  test("get ratings", async() => {
    const ratings: IRatingInfo[] = [];
    await getRatings(ratings);
    
    expect(ratings[0]).toMatchObject(MOCKED_RATINGS[0]);
  });

  test("getDataFromSupabase - ratings table", async() => {
    const ratings = await getDataFromSupabase<IRatingInfo>(SupabaseTables.RATINGS);

    expect(ratings).toBe(MOCKED_RATINGS);
  });
});