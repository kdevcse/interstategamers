<template>
    <a class="twitch-link" :channel="channel" target="_blank" rel="noopener noreferrer" :href="href">
        <img class="twitch-img" :src="src">
        <p class="live-text">Live!</p>
    </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TwitchLink extends Vue {
    @Prop() channel!: string
    @Prop() href!: string
    @Prop() src!: NodeRequire
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
