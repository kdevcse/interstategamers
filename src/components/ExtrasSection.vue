<template>
    <div class="extras-section">
        <h1 class="extras-header"><span><i :class="icon"></i></span>{{header}}</h1>
        <div class="extras-cat logo-promo" id="extras-code">
            <div v-for="item in items" :key="item.heading">
                <img class="friend-img" :src="item.src"/>
                <div class="friend-info">
                    <h3>{{item.heading}}</h3>
                    <p v-html="item.content"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IFriendInfo } from '../interfaces/IFriendInfo'

@Component
export default class ExtrasSection extends Vue {
    @Prop() header!: string;
    @Prop() items!: IFriendInfo[];
    @Prop() icon!: string;
    generateHtml (str: string) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(str, 'text/html')
      return doc.body
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
