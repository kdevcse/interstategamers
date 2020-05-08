<template>
    <main id="ig-main">
        <aside id="ig-main-right">
            <img class="ig-main-right-logo" src="../assets/images/Main.png"/>
            <div id="ig-icons">
                <a href="https://www.facebook.com/TheInterstateGamers/" title="Facebook">
                    <i class="fab fa-facebook-square fa-2x"></i>
                </a>
                <a href="https://twitter.com/theIG_cast" title="Twitter">
                    <i class="fab fa-twitter fa-2x"></i>
                </a>
                <a href="https://instagram.com/theigcast" title="Instagram">
                    <i class="fab fa-instagram fa-2x"></i>
                </a>
                <a href="https://www.patreon.com/TheIGCast" title="Patreon">
                    <i class="fab fa-patreon fa-2x"></i>
                </a>
                <a href="https://feeds.simplecast.com/naeWXDEF" title="RSS">
                    <i class="fas fa-rss fa-2x"></i>
                </a>
            </div>
        </aside>
        <section id="ig-main-left">
            <div class="ig-main-left-text-container">
                <h1>The Interstate Gamers</h1>
                <p>
                    The podcast where your hosts, deal_4_real and KSlugs, rate and discuss your favorite
                    video games by category from two different states, Colorado and Texas.
                </p>
            </div>
            <div id="ig-main-left-trailer" onclick="playTrailer()">
                <i id="ig-trailer-playButton" class="fas fa-play-circle"></i>
                <span>Listen to the trailer</span>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IgHeader extends Vue {
    @Prop() placeholder!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  display: grid;
  grid-template-columns: 0.5fr 50%;
  grid-template-areas: 'left right';
  align-items: center;
  width: 100%;
  padding: 20px 5%;
  background-color: #2d32af;
}
#ig-main-left {
  display: grid;
  grid-area: left;
  grid-gap: 20px;
  align-items: center;
}
.ig-main-right-logo {
  height: 375px;
}
.ig-main-left-text-container {
  align-items: center;
  color: white;
}
#ig-main-left-trailer {
  display: flex;
  align-items: center;
  justify-content: center;
}
#ig-main-left-trailer:hover {
  cursor: pointer;
  text-decoration: underline;
}
#ig-icons > a > svg:hover {
  cursor: pointer;
  opacity: 0.8;
}
#ig-icons {
  margin-top: 10px;
}
#ig-icons > a {
  text-decoration: none;
}
#ig-icons > a > svg {
  color: white;
  margin-right: 1.1875%;
  margin-left: 1.1875%;
  transition: opacity 0.2s ease-in;
}

@media only screen and (max-width: 768px) {
    main {
        display: block;
        text-align: center;
        padding: 20px 5% 30px 5%;
    }
  #ig-main-right {
    display: block;
  }
  #ig-main-left {
    width: 100%;
    grid-gap: 25px;
    grid-template-columns: 100%;
    justify-content: center;
  }
  .ig-main-right-logo {
    height: 250px;
    border-radius: 6px;
  }
  #ig-icons {
    display: none;
  }
  .ig-main-left-text-container > h1 {
    display: none;
  }
  .ig-main-left-text-container > p {
    margin-bottom: 0;
    margin-top: 25px;
    padding-left: 3%;
    padding-right: 3%;
  }
  #ig-main-left-trailer {
    color: #2d32af;
    padding: 12px;
    border-radius: 6px;
    background-color: white;
    justify-self: center;
  }
  #ig-main-left-trailer > svg {
    margin-right: 8px;
    font-size: 25px;
    color: red;
  }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) {
  main {
    grid-template-columns: minmax(min-content, 45%) 55%;
    height: 500px;
  }
  #ig-main-right {
    text-align: center;
    justify-self: end;
  }
  .ig-main-right-logo {
    height: 340px;
    border-radius: 6px;
  }
  #ig-icons > a > svg {
    font-size: 27px;
  }
  #ig-main-left {
    align-self: center;
  }
  .ig-main-left-text-container > h1 {
    font-size: 34px;
    margin-bottom: 5px;
    margin-top: 0;
  }
  .ig-main-left-text-container > p {
    margin: 0;
    margin-top: 10px;
    font-size: 17px;
  }
  #ig-main-left-trailer {
    width: 225px;
    color: #2d32af;
    font-size: 15px;
    padding: 7px;
    border-radius: 4px;
    background-color: white;
  }
  #ig-main-left-trailer > svg {
    margin-right: 10px;
    font-size: 23px;
    color: red;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  main {
    grid-template-columns: minmax(min-content, 50%) 50%;
  }
  .ig-main-left-text-container > h1 {
    font-size: 45px;
  }
  .ig-main-left-text-container > p {
    font-size: 21px;
  }
  #ig-main-left-trailer {
    width: 275px;
    color: #2d32af;
    font-size: 20px;
    padding: 15px;
    background-color: white;
  }
  #ig-main-left-trailer > svg {
    margin-right: 11px;
    font-size: 27px;
    color: red;
  }
  .ig-main-right-logo {
    height: 375px;
  }
  #ig-icons > a > svg {
    font-size: 30px;
  }

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  main {
    grid-template-columns: minmax(min-content, 50%) 50%;
  }
  #ig-main-right {
    justify-self: normal;
  }
  .ig-main-left-text-container > p {
    font-size: 25px;
  }
}
</style>
