<template>
  <a
    class="twitch-link"
    :channel="props.channel"
    target="_blank"
    rel="noopener noreferrer"
    :href="props.href"
  >
    <img
      class="twitch-img"
      :src="props.src"
    >
    <p class="live-text">Live!</p>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  channel?: string,
  href?: string,
  src?: string
}>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.twitch-link {
  text-decoration: none;
  text-align: center;
  position: relative;
}
.twitch-img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}
.live-text {
  visibility: hidden;
  color: var(--accent-color);
  margin-top: 3px;
  margin-bottom: 3px;
}
@media only screen and (max-width: 768px) {
  .twitch-img {
    height: 85px;
    width: 85px;
  }
  .twitch-link {
    display: inline-block;
    margin-left: 3%;
    margin-right: 3%;
  }
}
@media only screen and (min-width: 768px) {
  .twitch-img {
    height: 100px;
    width: 100px;
  }
}
@media only screen and (min-width: 992px) {
  .twitch-img:hover {
    cursor: pointer;
    opacity: 0.5;
  }
}
</style>
