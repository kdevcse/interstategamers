<template>
  <article>
      <h1 class="extras-header"><span><i class="fab fa-twitch"></i></span> Twitch</h1>
      <div class="extras-cat" id="extras-twitch">
          <TwitchLink channel="deal_4_real" href="https://www.twitch.tv/deal_4_real" v-bind:src="deal4RealTwitch"/>
          <TwitchLink channel="kslugs" href="https://www.twitch.tv/kslugs" v-bind:src="kslugsTwitch"/>
          <TwitchLink channel="zlinkgaming" href="https://www.twitch.tv/zlinkgaming" v-bind:src="zlinkTwitch"/>
      </div>
      <ExtrasSection header="Music" icon="fas fa-music" v-bind:items="music"/>
      <ExtrasSection header="Code" icon="fas fa-code" v-bind:items="code"/>
      <ExtrasSection header="Friends" icon="fas fa-users" v-bind:items="friends"/>
  </article>
</template>

<script>
import ExtrasSection from '../components/ExtrasSection'
import extrasSectionData from '../database/extra-sections'
import TwitchLink from '../components/TwitchLink'

export default {
  name: 'Extras',
  components: {
    ExtrasSection,
    TwitchLink
  },
  data: function () {
    return {
      music: extrasSectionData.musicSection,
      code: extrasSectionData.codeSections,
      friends: extrasSectionData.friendSections,
      deal4RealTwitch: require('../assets/images/d4r.png'),
      kslugsTwitch: require('../assets/images/kslugs.png'),
      zlinkTwitch: require('../assets/images/zlg.png')
    }
  }
}
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
