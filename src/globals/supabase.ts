import { CategoryTypes, IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const SUPABASE = createClient(supabaseUrl, supabaseAnonKey);

export enum SupabaseTables {
  RATINGS = "ratings",
  SIMPLECAST_EPISODES = "episodes_simplecast"
}

export async function getDataFromSupabase<Type>(table: SupabaseTables): Promise<Type[]> {
  const { data, error } = await SUPABASE.from(table).select("*");

  if (error || !data) {
    console.error(`Error retrieving data: ${error.message}`);
    return [];
  }

  return data as Type[];
}

export async function getRatings(ratings: IRatingInfo[]) {
  const supabaseRatings =  await getDataFromSupabase<IRatingInfo>(SupabaseTables.RATINGS);

  supabaseRatings.sort((a, b) => b[CategoryTypes.OVERALL] - a[CategoryTypes.OVERALL]).forEach((rating, index) => {
    const currentScore = rating[CategoryTypes.OVERALL];
    const lastScore = index > 0 ? ratings[index - 1][CategoryTypes.OVERALL] : null;
    rating[CategoryTypes.RANK] = lastScore && (currentScore === lastScore) ? ratings[index - 1][CategoryTypes.RANK] : index + 1;
    ratings.push(rating);
  });
}

export async function getEpisodes(episodes: IEpisodeInfo[], sort = false) {
  const supabaseEpisodes = await getDataFromSupabase<IEpisodeInfo>(SupabaseTables.SIMPLECAST_EPISODES);
  supabaseEpisodes.forEach(ep => {
    episodes.push(ep);
  });

  if (!sort) {
    return;
  }
  
  episodes.sort((epA: IEpisodeInfo, epB: IEpisodeInfo) => {
    return (new Date(epB.published_at) as any) - (new Date(epA.published_at) as any);
  });
}