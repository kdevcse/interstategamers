/* eslint-disable @typescript-eslint/naming-convention */
import { IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo";

const mockedRating1 = {
  episode: "1-1",
  ig_score: 100,
  id: "dafd33-daff35-fdad89",
  episode_number: 1,
  game: "MyGame",
  platform: "",
  k_gameplay: 100,
  k_visuals: 100,
  k_audio: 100,
  k_Aesthetics: 100,
  k_content: 100,
  k_rating: 100,
  p_gameplay: 100,
  p_visuals: 100,
  p_audio: 100,
  p_Aesthetics: 100,
  p_content: 100,
  p_rating: 100,
  gameplay: 100,
  visuals: 100,
  audio: 100,
  aesthetics: 100,
  content: 100,
  rank: 1,
  ign: 0,
  metacritic: 0,
  year: 2018,
  simplecast_id: "djka234fds-34fsdfnjf-12fjek54"
} as IRatingInfo;

const mockedRating2 = {
  episode: "2-1",
  ig_score: 99,
  id: "dafd33-daff35-fdad89",
  episode_number: 2,
  game: "MyGame The Sequel",
  platform: "",
  k_gameplay: 99,
  k_visuals: 99,
  k_audio: 99,
  k_Aesthetics: 99,
  k_content: 99,
  k_rating: 99,
  p_gameplay: 99,
  p_visuals: 99,
  p_audio: 99,
  p_Aesthetics: 99,
  p_content: 99,
  p_rating: 99,
  gameplay: 99,
  visuals: 99,
  audio: 99,
  aesthetics: 99,
  content: 99,
  rank: 2,
  ign: 0,
  metacritic: 0,
  year: 2017,
  simplecast_id: "erta234fds-54fsdfnjf-31fjek89"
} as IRatingInfo;

const mockedRating3 = {
  episode: "2-2",
  ig_score: 98,
  id: "xafddds-daff45-ghad89",
  episode_number: 3,
  game: "MyGame The Threequel",
  platform: "",
  k_gameplay: 98,
  k_visuals: 98,
  k_audio: 98,
  k_Aesthetics: 98,
  k_content: 98,
  k_rating: 98,
  p_gameplay: 98,
  p_visuals: 98,
  p_audio: 98,
  p_Aesthetics: 98,
  p_content: 98,
  p_rating: 98,
  gameplay: 98,
  visuals: 98,
  audio: 98,
  aesthetics: 98,
  content: 98,
  rank: 3,
  ign: 0,
  metacritic: 0,
  year: 2017,
  simplecast_id: "htof869fds-57ftyuikj-15tpok54"
} as IRatingInfo;

const episode1 = {
  "dc:creator": "The Interstate Gamers",
  description: "This is a test description for episode 1-1",
  enclosure: {
    "@_url": "",
    "@_length": "4243234",
    "@_type": ""
  },
  guid: {
    "#text": "djka234fds-34fsdfnjf-12fjek51",
    "@_isPermaLink": "false"
  },
  "itunes:duration": 1235124452345,
  "itunes:explicit": true,
  "itunes:image": "imagelink.com/1_1",
  "itunes:summary": "This is a test summary for episode 1-1",
  "itunes:season": 1,
  "itunes:episode": 1,
  "itunes:episodeType": "full",
  link: "linktoep.com/ep_audo_1_1.mp3",
  pubDate: ("Sat Jan 01 2022 00:00:00 GMT-0600 (Central Standard Time)"as unknown) as Date,
  title: "1-1: MyGame1",
  ratingData: mockedRating1,
} as IEpisodeInfo;

const episode2 = {
  "dc:creator": "The Interstate Gamers",
  description: "This is a test description for episode 2-1",
  enclosure: {
    "@_url": "",
    "@_length": "4243234",
    "@_type": ""
  },
  guid: {
    "#text": "djka234fds-34fsdfnjf-12fjek52",
    "@_isPermaLink": "false"
  },
  "itunes:duration": 1235124452345,
  "itunes:explicit": true,
  "itunes:image": "imagelink.com/2_1",
  "itunes:summary": "This is a test summary for episode 2-1",
  "itunes:season": 2,
  "itunes:episode": 1,
  "itunes:episodeType": "full",
  link: "linktoep.com/ep_audo_2_1.mp3",
  pubDate: ("Tues Feb 01 2022 00:00:00 GMT-0600 (Central Standard Time)"as unknown) as Date,
  title: "2-1: MyGame2",
  ratingData: mockedRating2,
} as IEpisodeInfo;

const episode3 = {
  "dc:creator": "The Interstate Gamers",
  description: "This is a test description for episode 2-2",
  enclosure: {
    "@_url": "",
    "@_length": "4243234",
    "@_type": ""
  },
  guid: {
    "#text": "djka234fds-34fsdfnjf-12fjek53",
    "@_isPermaLink": "false"
  },
  "itunes:duration": 1235124452345,
  "itunes:explicit": true,
  "itunes:image": "imagelink.com/2_2",
  "itunes:summary": "This is a test summary for episode 2-2",
  "itunes:season": 2,
  "itunes:episode": 2,
  "itunes:episodeType": "full",
  link: "linktoep.com/ep_audo_2_2.mp3",
  pubDate: ("Wed Feb 02 2022 00:00:00 GMT-0600 (Central Standard Time)"as unknown) as Date,
  title: "2-2: MyGame3",
  ratingData: mockedRating3,
} as IEpisodeInfo;

//Episode order matters here and date it important
export const MOCKED_EPISODES = [episode3, episode2, episode1];
export const MOCKED_RATINGS = [mockedRating3, mockedRating2, mockedRating1];
export const MOCKED_XML = {
  rss: {
    channel: {
      item: MOCKED_EPISODES
    }
  }
};

export function pushAllMockedEpisodes(originEpisodes: IEpisodeInfo[]) {
  MOCKED_EPISODES.forEach((episode) => {
    originEpisodes.push(episode);
  });
}

export function pushAllMockedRatings(originRatings: IRatingInfo[]) {
  MOCKED_RATINGS.forEach((ranking) => {
    originRatings.push(ranking);
  });
}