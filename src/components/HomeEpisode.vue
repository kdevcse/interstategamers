<template>
    <div class='home-episode'>
        <section class='player'>
            <audio></audio>
            <i class='fas fa-play-circle fa-lg'/>
        </section>
        <aside class='ep-info'>
            <h2 class='episode-title'>
                {{title}}
            </h2>
            <p class='ep-description'>
                {{description}}
            </p>
        </aside>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HomeEpisode extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() guest!: boolean;
  @Prop() audio!: string;
}
</script>

<style scoped>
</style>
