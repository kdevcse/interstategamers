<template>
    <div class='episode'>
        <section class='player' v-on:click="play()">
            <audio :src="audio"></audio>
            <i class='fas fa-play-circle fa-lg' v-on:click="play()"/>
        </section>
        <aside class='ep-info'>
            <h2 class='episode-title'>
                {{title}}
            </h2>
            <p class='ep-description'>
                {{description}}
            </p>
        </aside>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HomeEpisode extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() guest!: boolean;
  @Prop() audio!: string;

  public play () {
    console.log('Hello World')
  }
}
</script>

<style scoped>
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
