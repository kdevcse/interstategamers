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
</style>
