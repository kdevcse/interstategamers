/* eslint-disable @typescript-eslint/naming-convention */
export interface IRatingInfo {
  id: string;
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
  simplecast_id: string;
}

/*TODO: Look at removing this redundancy later*/
export interface IHoveredRanking {
  id?: string;
  episode?: string;
  gameplay?: number;
  visuals?: number;
  audio?: number;
  aesthetics?: number;
  content?: number;
  ig_score?: number;
  rank?: number;
  game?: string;
  simplecast_id?: string;
  title?: string;
}

export interface IEpisodeInfo {
  simplecast_id: string;
  updated_at: Date;
  type: string;
  token: string;
  title: string;
  status: string;
  season: number
  published_at: Date;
  number: number;
  is_hidden: boolean;
  image_url: string;
  image_path: string;
  id: string;
  href: string;
  guid: string;
  enclosure_url: string;
  description: string;
  days_since_release: number;
}

export interface IEpisodeWithRating extends IEpisodeInfo {
  ratingData?: IRatingInfo
}

export interface IRatingWithEpisode extends IRatingInfo {
  episodeData?: IEpisodeInfo
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
