import { MOCKED_EPISODES, MOCKED_RATINGS } from "./episode-data-helper";
import { createClient } from "@supabase/supabase-js";

export function mockSupabaseEpisodes() {
  vi.mock("@supabase/supabase-js", () => {
    return {
      createClient: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            data:  MOCKED_EPISODES
          })
        })
      })
    };
  });
}

export function mockSupabaseRatings() {
  vi.mock("@supabase/supabase-js", () => {
    return {
      createClient: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            data:  MOCKED_RATINGS
          })
        })
      })
    };
  });
}

export function unmockSupabase() { 
  vi.mocked(createClient).mockRestore();
  //vi.doUnmock("@supabase/supabase-js");
}