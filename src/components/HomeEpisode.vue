<template>
  <div>
    <h1
      v-if="finale"
      class="season-title"
    >
      Season {{ season }}
    </h1>
    <div
      class="episode"
      :class="{ top: finale }"
      @mouseover="sendScore(rankingId)"
    >
      <section class="player">
        <font-awesome-icon
          v-if="playing"
          :icon="['fas', 'pause-circle']"
          @click="play()"
        />
        <font-awesome-icon
          v-else
          :icon="['fas', 'play-circle']"
          @click="play()"
        />
      </section>
      <aside class="ep-info">
        <h2 class="episode-title">
          {{ title }}
          <font-awesome-icon
            v-if="rankingId"
            title="Game Review"
            :icon="['fas', 'gamepad']"
          />
        </h2>
        <p class="ep-description">
          {{ description }}
        </p>
      </aside>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useAudio } from "@/composables/global-composables";
import { useSendScore } from "@/composables/HomeEpisode";

const props = defineProps<{
  title?: string,
  description?: string,
  guest?: boolean,
  audio?: string,
  season?: number,
  episodeNumber?: number,
  episodeType?: string,
  rankingId?: string,
  finale?: boolean,
}>();
const emit = defineEmits(["show-score"]);

const audioElement: HTMLAudioElement = new Audio(props.audio);
audioElement.title = props.title || "";
audioElement.preload = "none";

const { playing, play } = useAudio(audioElement);
const { sendScore } = useSendScore(emit);

</script>

<style scoped>
.season-title {
  color: var(--accent-color);
  width: 100%;
  border-bottom: solid var(--accent-color);
  margin-bottom: 0;
}
.episode {
  display: grid;
  align-items: center;
  grid-template-columns: 50px auto;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow: hidden;
}
.episode {
  border-top: var(--primary-color) solid 1px;
}
.episode.top {
  border-top: none;
}
.player > svg {
  font-size: 32px;
  color: black;
}
.player > svg:hover {
  cursor: pointer;
}
.episode-title {
  color: var(--primary-color);
  font-size: 1.3rem;
  margin-bottom: 0;
  margin-top: 0;
}
.episode-title > svg {
  color: var(--accent-color);
}
.ep-description {
  color: var(--primary-color);
  margin-top: 5px;
  margin-bottom: 5px;
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) {
  .player > svg {
    font-size: 32px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .episode:hover {
    background: var(--elevation-first-lvl-color);
  }
  .episode:hover > .ep-info > h2 > svg {
    animation: rumble 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes rumble {
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateY(-1px);
    }
    20%,
    40%,
    60%,
    80%,
    100% {
      transform: translateY(1px);
    }
  }
}
@media screen and (prefers-color-scheme: dark) {
  .episode-title,
  .ep-description,
  .season-title,
  .player > svg {
    color: var(--default-text-color);
  }
  .episode {
    border-top-color: var(--elevation-second-lvl-color);
  }
  .season-title {
    border-bottom-color: var(--primary-color);
  }
}
</style>
