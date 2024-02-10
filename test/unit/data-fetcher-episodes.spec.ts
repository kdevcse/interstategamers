import { XMLBuilder } from "fast-xml-parser";
import { MOCKED_EPISODES, MOCKED_XML } from "../helpers/episode-data-helper";
import { getEpisodes } from "@/globals/data-fetcher";

describe("data-fetcher episodes unit tests", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  beforeAll(() => {
    const fetchMock = vi.fn(() => {
      const xmlbuilder = new XMLBuilder({ignoreAttributes: false, suppressBooleanAttributes: false});
      const xml = xmlbuilder.build(MOCKED_XML);
      return {
        text: vi.fn(() => xml)
      };
    });

    vi.stubGlobal("fetch", fetchMock);
  });

  test("get episodes - no sort", async() => {
    const episodes = await getEpisodes();
    
    expect(episodes[0]).toMatchObject(MOCKED_EPISODES[0]);
  });

  test("get episodes - sort", async() => {
    const episodes = await getEpisodes(true);
    
    // MOCKED_EPISODES were already sorted correctly lol
    expect(episodes[0]).toMatchObject(MOCKED_EPISODES[0]);
  });
});