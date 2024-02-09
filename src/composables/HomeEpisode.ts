import { EpisodeTypes } from "@/interfaces/IRatingInfo";

export interface IHomeEpisodeProps {
  title?: string,
  description?: string,
  guest?: boolean,
  audio?: string,
  season?: number,
  episodeNumber?: number,
  episodeType?: string,
  rankingId?: string,
  finale?: boolean,
  type?: EpisodeTypes
}

export function useHomeEpisode(emit: any) {

  function emitId(episodeId: string) {
    emit("id-hovered", [episodeId]);
  }

  return { emitId };
}

