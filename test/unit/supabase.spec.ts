import { MOCKED_EPISODES, MOCKED_RATINGS } from "../helpers/episode-data-helper";
import { mockSupabaseEpisodes, mockSupabaseRatings } from "../helpers/supabase-helper";
import { getEpisodes, getRatings } from "@/globals/supabase";
import { IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo";

describe("Supabase unit tests", () => {
  describe("episode tests", () => {
    afterAll(() => {
      vi.resetAllMocks();
    });
  
    test("get episodes", async() => {
      mockSupabaseEpisodes();
      const episodes: IEpisodeInfo[] = [];
      await getEpisodes(episodes);
      
      expect(episodes[0]).toMatchObject(MOCKED_EPISODES[0]);
    });
  });

  describe("ratings tests", () => {
    afterAll(() => {
      vi.resetAllMocks();
    });
  
    test("get ratings", async() => {
      mockSupabaseRatings();
      const ratings: IRatingInfo[] = [];
      console.log(ratings);
      await getRatings(ratings);
      console.log(ratings);
      
      expect(ratings[2]).toMatchObject(MOCKED_RATINGS[0]);
    });
  });
});