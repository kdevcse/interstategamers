<template>
  <header id="ig-header">
    <aside id="ig-header-right">
      <img
        class="ig-header-right-logo"
        :src="mainLogo"
      >
      <img
        class="ig-header-right-logo dark"
        :src="mainDarkLogo"
      >
      <div id="ig-icons">
        <a
          href="https://www.facebook.com/TheInterstateGamers/"
          title="Facebook"
        >
          <font-awesome-icon :icon="['fab','facebook-square']" />
        </a>
        <a
          href="https://twitter.com/theIG_cast"
          title="Twitter"
        >
          <font-awesome-icon :icon="['fab','twitter']" />
        </a>
        <a
          href="https://instagram.com/theigcast"
          title="Instagram"
        >
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a
          href="https://www.patreon.com/TheIGCast"
          title="Patreon"
        >
          <font-awesome-icon :icon="['fab', 'patreon']" />
        </a>
        <a
          href="https://feeds.simplecast.com/naeWXDEF"
          title="RSS"
        >
          <font-awesome-icon :icon="['fas', 'rss']" />
        </a>
      </div>
    </aside>
    <section id="ig-header-left">
      <div class="ig-header-left-text-container">
        <h1>The Interstate Gamers</h1>
        <p>
          The podcast where your hosts, deal_4_real and KSlugs, rate and discuss your favorite
          video games by category from two different states, Colorado and Texas.
        </p>
      </div>
      <div
        id="ig-header-left-trailer"
        @click="playTrailer()"
      >
        <font-awesome-icon
          v-if="playing"
          id="ig-trailer-playButton"
          :icon="['fas', 'pause-circle']"
        />
        <font-awesome-icon
          v-else
          id="ig-trailer-playButton"
          :icon="['fas', 'play-circle']"
        />
        <span>Listen to the trailer</span>
      </div>
    </section>
  </header>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
import mainLogo from "@/assets/images/main.png";
import mainDarkLogo from "@/assets/images/main_dark-mode-colors.png";
import trailerPromo from "@/assets/audio/ig_promo.mp3";

let playing = ref(false);
let trailer = reactive(new Audio(trailerPromo));
trailer.title = "Listen to the trailer";
trailer.preload = "none";

function playTrailer() {
  playing.value = !playing.value;
  playing.value ? trailer.play() : trailer.pause();
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
.ig-header-right-logo.dark{
  display: none;
}
.ig-header-left-text-container {
  align-items: center;
  color: white;
}
#ig-header-left-trailer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: white;
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
    justify-self: center;
  }
  #ig-header-left-trailer > svg {
    margin-right: 8px;
    font-size: 25px;
    color: var(--accent-color);
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
  }
  #ig-header-left-trailer > svg {
    margin-right: 10px;
    font-size: 23px;
    color: var(--accent-color);
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
  }
  #ig-header-left-trailer > svg {
    margin-right: 11px;
    font-size: 27px;
    color: var(--accent-color);
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
    justify-self: center;
  }
  .ig-header-left-text-container > p {
    font-size: 25px;
  }
}
@media screen and (prefers-color-scheme: dark) {
  header{
    background-color: var(--secondary-color);
    border-bottom: solid var(--primary-color);
  }
  #ig-header-left-trailer {
  	background-color: var(--elevation-second-lvl-color);
    color: var(--default-text-color);
  }
  #ig-icons > a > svg, .ig-header-left-text-container {
    color: var(--default-text-color);
  }
  .ig-header-right-logo {
    opacity: 0.87;
    display: none;
  }
  .ig-header-right-logo.dark{
    display: inline;
  }
}
</style>
