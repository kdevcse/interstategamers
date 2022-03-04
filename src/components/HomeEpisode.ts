import { ref, Ref} from "vue";

export function useSendScore() {
  const emit = defineEmits(["show-score"]);

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
