<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
});
</script>

<style>
:root {
  --primary-font: Interstate;
  --primary-color: #2d32af;
  --secondary-color: white;
  --accent-color: red;
  --default-text-color: #2d32af;
  --elevation-first-lvl-color: #f0f0f5;
  --elevation-second-lvl-color: #2d32af;
  --elevation-third-lvl-color: rgba(255, 255, 255, 9%);
}
@media screen and (prefers-color-scheme: dark) {
  :root {
    --primary-color: #4450d2;
    --secondary-color: #121212;
    --accent-color: #ff5436;
    --default-text-color: rgba(255, 255, 255, 87%);
    --elevation-first-lvl-color: rgba(255, 255, 255, 5%);
    --elevation-second-lvl-color: rgba(255, 255, 255, 7%);
    --elevation-third-lvl-color: rgba(255, 255, 255, 9%);
  }
  body {
    background-color: var(--secondary-color);
  }
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
</style>
