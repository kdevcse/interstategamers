/* eslint-disable @typescript-eslint/naming-convention */
export interface IRatingInfo {
  episode: string;
  episode_number: number;
  game: string;
  platform: string;
  k_gameplay: number;
  k_visuals: number;
  k_audio: number;
  k_Aesthetics: number;
  k_content: number;
  k_rating: number;
  p_gameplay: number;
  p_visuals: number;
  p_audio: number;
  p_Aesthetics: number;
  p_content: number;
  p_rating: number;
  g_gameplay?: number;
  g_visuals?: number;
  g_audio?: number;
  g_Aesthetics?: number;
  g_content?: number;
  g_rating?: number;
  gameplay: number;
  visuals: number;
  audio: number;
  aesthetics: number;
  content: number;
  ig_score: number;
  rank?: number;
  ign: number;
  metacritic: number;
  year: number;
  guest?: string;
  game_image?: string;
  published_at?: string;
  spotify_guid?: string;
  episodeData?: IEpisodeInfo
}

export interface IEpisodeInfo {
  "dc:creator": string;
  description: string;
  enclosure: string;
  guid: string;
  "itunes:duration": string;
  "itunes:explicit": string;
  "itunes:image": string;
  "itunes:summary": string;
  link: string;
  pubDate: Date;
  title: string;
  type?: string;
}

export interface IEpisodeWithRating extends IEpisodeInfo {
  ratingData?: IRatingInfo
}

export enum CategoryTypes {
  RANK = "rank",
  TITLE = "game",
  YEAR = "year",
  PLATFORM = "platform",
  OVERALL = "ig_score",
  GAMEPLAY = "gameplay",
  AESTHETICS = "aesthetics",
  CONTENT = "content",
  KOVERALL = "k_rating",
  POVERALL = "p_rating",
}
