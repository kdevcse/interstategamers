<template>
  <div class="home">
    <audio id="ig-audio" title="Listen to the trailer" src="../assets/audio/ig_promo.mp3"/>
    <IgHeader></IgHeader>
  </div>
</template>

<script>
import IgHeader from '../components/IgHeader'
export default {
  name: 'Home',
  components: {
    IgHeader
  }
}
</script>

<style>
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
