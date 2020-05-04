<template>
  <div class="extras">
      <h1 class="extras-header"><span><i class="fab fa-twitch"></i></span> Twitch</h1>
      <div class="extras-cat" id="extras-twitch">
          <TwitchLink channel="deal_4_real" href="https://www.twitch.tv/deal_4_real" v-bind:src="deal4RealTwitch"/>
          <TwitchLink channel="kslugs" href="https://www.twitch.tv/kslugs" v-bind:src="kslugsTwitch"/>
          <TwitchLink channel="zlinkgaming" href="https://www.twitch.tv/zlinkgaming" v-bind:src="zlinkTwitch"/>
      </div>
      <ExtrasSection header="Music" icon="fas fa-music" v-bind:items="music"/>
      <ExtrasSection header="Code" icon="fas fa-code" v-bind:items="code"/>
      <ExtrasSection header="Friends" icon="fas fa-users" v-bind:items="friends"/>
  </div>
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
      zlinkTwitch: require('../assets/images/ZLG.png')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
