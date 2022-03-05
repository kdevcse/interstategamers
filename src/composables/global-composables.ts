import { ref } from "vue";

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