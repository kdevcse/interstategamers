import { computed } from "vue";

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
  type?: string
}

export function useHomeEpisode(type: string, emit: any) {

  function emitId(episodeId: string) {
    emit("id-hovered", [episodeId]);
  }

  const isGameReview = computed(() => {
    return type === "full";
  });

  return { isGameReview, emitId };
}

