<template>
  <div class='Ratings'>
  </div>
</template>

<script>
// @ is an alias to /src
import { pingClient } from '../database/faunadb'

export default {
  name: 'Ratings',
  components: {
  },
  mounted () {
      pingClient();
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
