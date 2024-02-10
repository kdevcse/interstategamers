/* eslint-disable @typescript-eslint/naming-convention */
export interface IRatingInfo {
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
  enclosure: EpisodeEnclosureType;
  guid: EpisodeGuidType;
  "itunes:duration": string;
  "itunes:explicit": string;
  "itunes:image": string;
  "itunes:summary": string;
  "itunes:season": number;
  "itunes:episode"?: number;
  "itunes:episodeType": EpisodeTypes;
  link: string;
  pubDate: Date;
  title: string;
  ratingData?: IRatingInfo;
}

export interface EpisodeEnclosureType {
  "@_url": string
  "@_length": number
  "@_type": string
}

export interface EpisodeGuidType {
  "#text": string,
  "@_isPermaLink": boolean
}

export enum EpisodeTypes {
  FULL = "full",
  BONUS = "bonus",
  TRAILER = "trailer"
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
