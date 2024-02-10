import { getRatings } from "@/globals/data-fetcher";

describe("supabase ratings unit tests", () => {
  test("get ratings", async() => {
    const ratings = getRatings();
    
    expect(ratings.length).toBeGreaterThan(0);
    expect(ratings.every(r => r.rank && r.game)).toBeTruthy();
  });
});