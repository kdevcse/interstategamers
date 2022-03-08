import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const SUPABASE = createClient(supabaseUrl, supabaseAnonKey);

export enum SupabaseTables {
  RATINGS = "ratings",
  SIMPLECAST_EPISODES = "episodes_simplecast"
}