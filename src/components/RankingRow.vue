<template>
    <tr>
	    <td class="rankings-table-rank">{{rank}}</td>
	    <td class="rankings-table-title">{{title}}</td>
	    <td class="rankings-table-year">{{year}}</td>
	    <td class="rankings-table-platform">{{platform}}</td>
	    <td class="rankings-table-overall">{{overall}}</td>
	    <td class="rankings-table-gameplay">{{gameplay}}</td>
	    <td class="rankings-table-aesthetics">{{aesthetics}}</td>
	    <td class="rankings-table-content">{{content}}</td>
	    <td class="rankings-table-p-overall">{{pOverall}}</td>
	    <td class="rankings-table-k-overall">{{kOverall}}</td>
	</tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RankingRow extends Vue {
    @Prop() rank!: number;
    @Prop() title!: string;
    @Prop() year!: number;
    @Prop() platform!: string;
    @Prop() overall!: number;
    @Prop() gameplay!: number;
    @Prop() aesthetics!: number;
    @Prop() content!: number;
    @Prop() pOverall!: number;
    @Prop() kOverall!: number;

    
}
</script>

<style scoped>
</style>
