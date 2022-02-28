<template>
  <div>
    <h1 v-if='finale' class='season-title'>Season {{season}}</h1>
    <div class='episode' :class="{top: finale}" @mouseover="sendScore(rankingId)">
      <section class='player'>
        <font-awesome-icon :icon="['fas', 'pause-circle']" v-if="playing" @click='play()'></font-awesome-icon>
        <font-awesome-icon :icon="['fas', 'play-circle']" v-else @click='play()'></font-awesome-icon>
      </section>
      <aside class='ep-info'>
        <h2 class='episode-title'>
            {{title}}
            <font-awesome-icon title="Game Review" :icon="['fas', 'gamepad']" v-if="rankingId"></font-awesome-icon>
        </h2>
        <p class='ep-description'>{{description}}</p>
      </aside>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';

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
const emit = defineEmits(['show-score']);

let playing = ref(false);
let epAudio = reactive(new Audio(props.audio));
epAudio.preload = 'none';

function sendScore (rankingId: string | undefined) {
  if (!rankingId)
    return;
  emit('show-score', [rankingId]);
};
function play () {
  playing.value = !playing.value;
  playing.value ? epAudio.play() : epAudio.pause();
}
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
    10%, 30%, 50%, 70%, 90% {
      transform: translateY(-1px);
    }
    20%, 40%, 60%, 80%, 100% {
      transform: translateY(1px);
    }
  }
}
@media screen and (prefers-color-scheme: dark) {
  .episode-title, .ep-description, .season-title, .player > svg {
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
