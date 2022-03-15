/* eslint-disable @typescript-eslint/naming-convention */
import { IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo";

const mockedRanking1 = {
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

const mockedRanking2 = {
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

const mockedRanking3 = {
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
  updated_at: new Date(),
  type: "full",
  token: "1471vgfjkd",
  title: "1-1: MyGame",
  status: "published",
  slug: "test_slug",
  season: 1,
  scheduled_for:  new Date(),
  published_at: new Date("1/1/2022"),
  number: 1,
  is_hidden: false,
  image_url: "linktoimage.com/my_image.png",
  image_path: "",
  id: "fjf9393jf9-93nfjxv10",
  href: "linktoep.com/ep_audo.mp3",
  guid: "38th98hjf9fxj-8432784yfh-fhjdkdjh3",
  description: "This is a test description for episode 1-1",
  days_since_release: 2,
  finale: true,
  simplecast_id: "djka234fds-34fsdfnjf-12fjek54"
} as IEpisodeInfo;

const episode2 = {
  updated_at: new Date(),
  type: "full",
  token: "1231jdfjkd",
  title: "2-1: MyGame The Sequel",
  status: "published",
  slug: "test_slug",
  season: 2,
  scheduled_for: new Date(),
  published_at: new Date("1/2/2022"),
  number: 1,
  is_hidden: false,
  image_url: "linktoimage.com/my_image2.png",
  image_path: "",
  id: "qw10393jf9-83nfjnv89",
  href: "linktoep.com/ep_audo2.mp3",
  guid: "489fh98hjf9fhj-8734784yfh-fhjkdjh2",
  description: "This is a test description for episode 2-1",
  days_since_release: 1,
  finale: true,
  simplecast_id: "erta234fds-54fsdfnjf-31fjek89"
} as IEpisodeInfo;

const episode3 = {
  updated_at: new Date(),
  type: "full",
  token: "2451jdfjkd",
  title: "2-2: MyGame The Threequel",
  status: "published",
  slug: "test_slug",
  season: 2,
  scheduled_for: new Date(),
  published_at: new Date("1/3/2022"),
  number: 2,
  is_hidden: false,
  image_url: "linktoimage.com/my_image3.png",
  image_path: "",
  id: "dfdkldk32-83nfjnv89",
  href: "linktoep.com/ep_audo3.mp3",
  guid: "093fh98hjf9fhj-8734kaowmnyfh-fhjkdjh2",
  description: "This is a test description for episode 2-2",
  days_since_release: 0,
  finale: true,
  simplecast_id: "htof869fds-57ftyuikj-15tpok54"
} as IEpisodeInfo;

export const MOCKED_EPISODES = [episode1, episode2, episode3];
export const MOCKED_RATINGS = [mockedRanking1, mockedRanking2, mockedRanking3];

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