import { ref } from "vue";

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
