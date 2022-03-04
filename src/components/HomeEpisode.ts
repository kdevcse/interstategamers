
import { ref } from "vue";

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

export function useAudio(audioElement: HTMLAudioElement) {
  const playing = ref(false);

  function play() {
    if (!audioElement) {
      return;
    }

    playing.value = !playing.value;
    playing.value ? audioElement.play() : audioElement.pause();
  }

  return { playing, play };
}
