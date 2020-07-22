<template>
  <div>
    <h1 v-if='finale' class='season-title'>Season {{season}}</h1>
    <div class='episode' :class="{top: finale}" @mouseover="sendScore(info)">
      <section class='player'>
        <font-awesome-icon :icon="['fas', 'pause-circle']" v-if="playing" @click='play()'></font-awesome-icon>
        <font-awesome-icon :icon="['fas', 'play-circle']" v-else @click='play()'></font-awesome-icon>
      </section>
      <aside class='ep-info'>
        <h2 class='episode-title'>
            {{title}}
            <font-awesome-icon title="Game Review" :icon="['fas', 'gamepad']" v-if="info"></font-awesome-icon>
        </h2>
        <p class='ep-description'>{{description}}</p>
      </aside>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IRankingInfo } from '../interfaces/IRankingInfo';

@Component
export default class HomeEpisode extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() guest!: boolean;
  @Prop() audio!: string;
  @Prop() season!: number;
  @Prop() episodeNumber!: number;
  @Prop() episodeType!: string;
  @Prop() info!: IRankingInfo;
  @Prop() finale!: boolean;

  playing = false;
  audioId = `${this.title}-audio`;
  epAudio!: HTMLAudioElement;

  mounted () {
    this.epAudio = new Audio(this.audio);
    this.epAudio.preload = 'none';
  }

  public sendScore (rankingInfo: IRankingInfo) {
    if(rankingInfo){
      this.$emit('show-score', [rankingInfo, this.title]);
    }
  }

  public play () {
    this.playing = !this.playing;
    this.playing ? this.epAudio.play() : this.epAudio.pause();
  }
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
@media screen and (prefers-color-scheme: dark) {
  .episode-title, .ep-description {
    color: white;
  }
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
    background: var(--hover-color);
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
</style>
