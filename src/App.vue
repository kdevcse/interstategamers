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
:root {
  --primary-font: Interstate;
  --primary-color: #2d32af;
  --secondary-color: white;
  --accent-color: red;
  --default-text-color: #2d32af;
  --hover-color: #f0f0f5;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  line-height: 1.5;
  margin-top: 70px;
  background-color: var(--secondary-color);
  color: var(--default-text-color);
}
* {
  box-sizing: border-box;
  font-family: var(--primary-font);
}
body {
  margin: 0;
  scroll-behavior: smooth;
  line-height: 1.5;
}
@media screen and (prefers-color-scheme: dark) {
  :root {
    --primary-color: #4450d2;
    --secondary-color: #121212;
    --accent-color: #ff5436;
    --default-text-color: rgba(255,255,255, 87%);
    --hover-color: rgba(255,255,255,5%);
  }
  body {
    background-color: var(--secondary-color);
  }
}
</style>
