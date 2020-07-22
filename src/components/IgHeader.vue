<template>
  <header id='ig-header'>
    <aside id='ig-header-right'>
      <img class='ig-header-right-logo' src='../assets/images/main.png' />
      <div id='ig-icons'>
        <a href='https://www.facebook.com/TheInterstateGamers/' title='Facebook'>
          <i class='fab fa-facebook-square fa-2x'></i>
        </a>
        <a href='https://twitter.com/theIG_cast' title='Twitter'>
          <i class='fab fa-twitter fa-2x'></i>
        </a>
        <a href='https://instagram.com/theigcast' title='Instagram'>
          <i class='fab fa-instagram fa-2x'></i>
        </a>
        <a href='https://www.patreon.com/TheIGCast' title='Patreon'>
          <i class='fab fa-patreon fa-2x'></i>
        </a>
        <a href='https://feeds.simplecast.com/naeWXDEF' title='RSS'>
          <i class='fas fa-rss fa-2x'></i>
        </a>
      </div>
    </aside>
    <section id='ig-header-left'>
      <div class='ig-header-left-text-container'>
        <h1>The Interstate Gamers</h1>
        <p>
          The podcast where your hosts, deal_4_real and KSlugs, rate and discuss your favorite
          video games by category from two different states, Colorado and Texas.
        </p>
      </div>
      <div id='ig-header-left-trailer' v-on:click='playTrailer()'>
        <font-awesome-icon :icon="['fas', 'pause-circle']" v-if="playing" id='ig-trailer-playButton'></font-awesome-icon>
        <font-awesome-icon :icon="['fas', 'play-circle']" v-else id='ig-trailer-playButton'></font-awesome-icon>
        <span>Listen to the trailer</span>
      </div>
    </section>
  </header>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IgHeader extends Vue {
  playing = false;
  trailer!: HTMLAudioElement;

  mounted () {
    const mp3 = require('../assets/audio/ig_promo.mp3');
    this.trailer = new Audio(mp3);
    this.trailer.title = 'Listen to the trailer';
    this.trailer.preload = 'none';
  }

  playTrailer () {
    this.playing = !this.playing;
    this.playing ? this.trailer.play() : this.trailer.pause();
  }
}
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 0.5fr 50%;
  grid-template-areas: 'left right';
  align-items: center;
  width: 100%;
  padding: 20px 5%;
  background-color: var(--primary-color);
}
#ig-header-left {
  display: grid;
  grid-area: left;
  grid-gap: 20px;
  align-items: center;
}
.ig-header-right-logo {
  height: 375px;
}
.ig-header-left-text-container {
  align-items: center;
  color: white;
}
#ig-header-left-trailer {
  display: flex;
  align-items: center;
  justify-content: center;
}
#ig-header-left-trailer:hover {
  cursor: pointer;
  text-decoration: underline;
}
#ig-icons > a > svg:hover {
  cursor: pointer;
  opacity: 0.8;
  transform: translate(0px,-5px);
}
#ig-icons {
  margin-top: 10px;
  height: 35px;
}
#ig-icons > a {
  text-decoration: none;
}
#ig-icons > a > svg {
  color: white;
  margin-right: 1.5%;
  margin-left: 1.5%;
  transition: opacity 0.25s, transform 0.25s ease-out;
}

@media only screen and (max-width: 768px) {
  header {
    display: block;
    text-align: center;
    padding: 20px 5% 30px 5%;
  }
  #ig-header-right {
    display: block;
  }
  #ig-header-left {
    width: 100%;
    grid-gap: 25px;
    grid-template-columns: 100%;
    justify-content: center;
  }
  .ig-header-right-logo {
    height: 250px;
    border-radius: 6px;
  }
  #ig-icons {
    display: none;
  }
  .ig-header-left-text-container > h1 {
    display: none;
  }
  .ig-header-left-text-container > p {
    margin-bottom: 0;
    margin-top: 25px;
    padding-left: 3%;
    padding-right: 3%;
  }
  #ig-header-left-trailer {
    color: var(--primary-color);
    padding: 12px;
    border-radius: 6px;
    background-color: white;
    justify-self: center;
  }
  #ig-header-left-trailer > svg {
    margin-right: 8px;
    font-size: 25px;
    color: red;
  }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) {
  header {
    grid-template-columns: minmax(min-content, 45%) 55%;
    height: 500px;
  }
  #ig-header-right {
    text-align: center;
    justify-self: end;
  }
  .ig-header-right-logo {
    height: 340px;
    border-radius: 6px;
  }
  #ig-icons > a > svg {
    font-size: 27px;
  }
  #ig-header-left {
    align-self: center;
  }
  .ig-header-left-text-container > h1 {
    font-size: 34px;
    margin-bottom: 5px;
    margin-top: 0;
    color: white;
  }
  .ig-header-left-text-container > p {
    margin: 0;
    margin-top: 10px;
    font-size: 17px;
  }
  #ig-header-left-trailer {
    width: 225px;
    color: var(--primary-color);
    font-size: 15px;
    padding: 7px;
    border-radius: 6px;
    background-color: white;
  }
  #ig-header-left-trailer > svg {
    margin-right: 10px;
    font-size: 23px;
    color: red;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  header {
    grid-template-columns: minmax(min-content, 50%) 50%;
  }
  .ig-header-left-text-container > h1 {
    font-size: 45px;
  }
  .ig-header-left-text-container > p {
    font-size: 21px;
  }
  #ig-header-left-trailer {
    width: 275px;
    color: var(--primary-color);
    font-size: 20px;
    padding: 15px;
    background-color: white;
  }
  #ig-header-left-trailer > svg {
    margin-right: 11px;
    font-size: 27px;
    color: red;
  }
  .ig-header-right-logo {
    height: 375px;
  }
  #ig-icons > a > svg {
    font-size: 30px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  header {
    grid-template-columns: minmax(min-content, 50%) 50%;
  }
  #ig-header-right {
    justify-self: normal;
  }
  .ig-header-left-text-container > p {
    font-size: 25px;
  }
}
</style>
