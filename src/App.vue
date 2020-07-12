<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  line-height: 1.5;
  margin-top: 70px;
}
* {
  box-sizing: border-box;
  font-family: Interstate;
}
body {
  margin: 0;
  scroll-behavior: smooth;
  line-height: 1.5;
}
</style>
