<template>
    <th class="rankings-header sorted" :click="sortTableByCategory(category)" ascending>
	    <div class="header-text">{{title}} 
            <font-awesome-icon v-if="ascending" :icon="['fas','sort-up']"></font-awesome-icon>
            <font-awesome-icon v-else :icon="['fas','sort-down']"></font-awesome-icon>
        </div>
	</th>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RankingHeader extends Vue {
    @Prop() title!: string;
    @Prop() ascending!: boolean;
    @Prop() category!: string;
    @Prop() sorted!: boolean;

    sortTableByCategory (val: string) {
        this.$emit('sort-table', val)
    }
}
</script>

<style scoped>
</style>
