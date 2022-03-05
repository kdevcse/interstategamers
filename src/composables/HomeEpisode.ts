
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
}

export function useSendScore(emit: any) {

  function sendScore(rankingId: string | undefined) {
    if (!rankingId) {
      return;
    }

    emit("show-score", [rankingId]);
  }

  return { sendScore };
}

