<template>
  <article>
    <h1 class="extras-header">
      <span><i class="fab fa-twitch" /></span> Twitch
    </h1>
    <div
      id="extras-twitch"
      class="extras-cat"
    >
      <twitch-link
        channel="deal_4_real"
        href="https://www.twitch.tv/deal_4_real"
        :src="deal4RealTwitch"
      />
      <twitch-link
        channel="kslugs"
        href="https://www.twitch.tv/kslugs"
        :src="kslugsTwitch"
      />
      <twitch-link
        channel="zlinkgaming"
        href="https://www.twitch.tv/zlinkgaming"
        :src="zlinkTwitch"
      />
    </div>
    <extras-section
      header="Music"
      icon="fas fa-music"
      :items="EXTRAS_SECTION_DATA.musicSection"
    />
    <extras-section
      header="Code"
      icon="fas fa-code"
      :items="EXTRAS_SECTION_DATA.codeSections"
    />
    <extras-section
      header="Friends"
      icon="fas fa-users"
      :items="EXTRAS_SECTION_DATA.friendSections"
    />
  </article>
</template>

<script setup lang="ts">
import ExtrasSection from "@/components/ExtrasSection.vue";
import EXTRAS_SECTION_DATA from "@/globals/extra-sections";
import TwitchLink from "@/components/TwitchLink.vue";
import deal4RealTwitch from "@/assets/images/d4r.png";
import kslugsTwitch from "@/assets/images/kslugs.png";
import zlinkTwitch from "@/assets/images/zlg.png";
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
