import { MOCKED_RATINGS } from "../helpers/episode-data-helper";
import { getRatings } from "@/globals/supabase";
import { IRatingInfo } from "@/interfaces/IRatingInfo";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn().mockReturnValueOnce({
    from: vi.fn().mockReturnValueOnce({
      select: vi.fn().mockResolvedValueOnce({
        data:  MOCKED_RATINGS
      })
    })
  })
}));

import { createClient } from "@supabase/supabase-js";

describe("supabase ratings unit tests", () => {

  afterEach(() => {
    (createClient as any).mockClear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
  
  test("get ratings", async() => {
    const ratings: IRatingInfo[] = [];
    await getRatings(ratings);
    
    expect(ratings[0]).toMatchObject(MOCKED_RATINGS[0]);
  });
});