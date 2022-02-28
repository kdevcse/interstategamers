<template>
  <article>
      <h1 class="extras-header"><span><i class="fab fa-twitch"></i></span> Twitch</h1>
      <div class="extras-cat" id="extras-twitch">
          <twitch-link channel="deal_4_real" href="https://www.twitch.tv/deal_4_real" v-bind:src="deal4RealTwitch"/>
          <twitch-link channel="kslugs" href="https://www.twitch.tv/kslugs" v-bind:src="kslugsTwitch"/>
          <twitch-link channel="zlinkgaming" href="https://www.twitch.tv/zlinkgaming" v-bind:src="zlinkTwitch"/>
      </div>
      <extras-section header="Music" icon="fas fa-music" v-bind:items="music"/>
      <extras-section header="Code" icon="fas fa-code" v-bind:items="code"/>
      <extras-section header="Friends" icon="fas fa-users" v-bind:items="friends"/>
  </article>
</template>

<script setup lang="ts">
import ExtrasSection from '@/components/ExtrasSection.vue';
import extrasSectionData from '@/database/extra-sections';
import TwitchLink from '@/components/TwitchLink.vue';

const music = extrasSectionData.musicSection;
const code = extrasSectionData.codeSections;
const friends = extrasSectionData.friendSections;
const deal4RealTwitch = '../src/assets/images/d4r.png';
const kslugsTwitch = '../src/assets/images/kslugs.png';
const zlinkTwitch = '../src/assets/images/zlg.png';
</script>

<style scoped>
article {
    padding: 15px 5% 75px 5%;
}
#extras-twitch {
    display: grid;
    grid-auto-rows: 125px;
    margin-top: 30px;
}
.extras-header {
    border-bottom: var(--primary-color) solid 2px;
    color: var(--primary-color);
}

@media only screen and (max-width: 768px){
    #extras-twitch {
        display: block;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
    .extras-header{
        margin-bottom: 0px;
    }
}

@media only screen and (min-width: 768px){
    #extras-twitch{
        grid-template-columns: 150px 150px 150px;
    }
}

@media only screen and (min-width: 992px){
    .fa-play.hovered{
        display: inline;
    }
}
@media screen and (prefers-color-scheme: dark) {
  .extras-header, .friend-info > h3 {
    color: var(--default-text-color);
  }
}
</style>
