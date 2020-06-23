<template>
  <div>
    <h1 v-if='finale' class='season-title'>Season {{season}}</h1>
    <!-- Perhaps there's a better way to do this -->
    <div class='episode-first' 
      v-if="episodeType !== 'trailer' && finale"
      @mouseover="sendScore(info)">
      <section class='player'>
        <font-awesome-icon :icon="['fas', 'pause-circle']" v-if="playing" @click='play()'></font-awesome-icon>
        <font-awesome-icon :icon="['fas', 'play-circle']" v-else @click='play()'></font-awesome-icon>
      </section>
      <aside class='ep-info'>
        <h2 class='episode-title'>
            {{title}}
            <font-awesome-icon :icon="['fas', 'gamepad']" v-if="info"></font-awesome-icon>
        </h2>
        <p class='ep-description'>{{description}}</p>
      </aside>
    </div>
    <div class='episode' v-else-if="episodeType !== 'trailer'"
      @mouseover="sendScore(info)">
      <section class='player'>
        <font-awesome-icon :icon="['fas', 'pause-circle']" v-if="playing" @click='play()'></font-awesome-icon>
        <font-awesome-icon :icon="['fas', 'play-circle']" v-else @click='play()'></font-awesome-icon>
      </section>
      <aside class='ep-info'>
        <h2 class='episode-title'>
            {{title}}
            <font-awesome-icon :icon="['fas', 'gamepad']" v-if="info"></font-awesome-icon>
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
  color: red;
  width: 100%;
  border-bottom: solid red;
  margin-bottom: 0;
}
.episode,
.episode-first {
  display: grid;
  align-items: center;
  grid-template-columns: 50px auto;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow: hidden;
}
.episode {
  border-top: #2d32af solid 1px;
}
.player > svg {
  font-size: 32px;
}
.player > svg:hover {
  cursor: pointer;
}
.episode-title {
  color: #2d32af;
  font-size: 1.3rem;
  margin-bottom: 0;
  margin-top: 0;
}
.episode-title > svg {
  color: red;
}
.ep-description {
  color: #2d32af;
  margin-top: 5px;
  margin-bottom: 5px;
}
.episode:hover > .ep-info > h2 > svg,
.episode-first:hover > .ep-info > h2 > svg {
  animation: rumble 0.3s ease-out;
}
@keyframes rumble {
  20% {
    transform: translateY(-3px);
  }
  40% {
    transform: translateY(3px);
  }
  60% {
    transform: translateY(-1px);
  }
  80% {
    transform: translate(1px);
  }
  100% {
    transform: translateY(0px);
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
  .episode:hover,
  .episode-first:hover {
    background: #f1f1f1;
  }
}
</style>
