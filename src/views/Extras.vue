<template>
  <div class="extras">
      <ExtrasSection header="Code" icon="fas fa-code" v-bind:items="code"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ExtrasSection from '../components/ExtrasSection'
import codeSection from '../database/extra-sections'

export default {
  name: 'Extras',
  components: {
    ExtrasSection
  },
  data: function () {
    return {
      code: codeSection
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
