<template>
    <tr class="rankings-table-row">
	    <td v-bind:class="{ sorted: highlightRed('rank')}">{{rank}}</td>
	    <td v-bind:class="{ sorted: highlightRed('Game')}">
			{{title}}
        	<font-awesome-icon class='guest-icon' :icon="['fas', 'user-plus']" v-if="guest"></font-awesome-icon>
		</td>
	    <td v-bind:class="{ sorted: highlightRed('Year')}">{{year}}</td>
	    <td v-bind:class="{ sorted: highlightRed('Platform')}">{{platform}}</td>
	    <td v-bind:class="{ sorted: highlightRed('IG Score')}">{{overall.toFixed(2)}}</td>
	    <td v-bind:class="{ sorted: highlightRed('Gameplay')}">{{gameplay.toFixed(2)}}</td>
	    <td v-bind:class="{ sorted: highlightRed('Aesthetics')}">{{aesthetics.toFixed(2)}}</td>
	    <td v-bind:class="{ sorted: highlightRed('Content')}">{{content.toFixed(2)}}</td>
	    <td v-bind:class="{ sorted: highlightRed('Peter\'s Rating')}">{{pOverall.toFixed(2)}}</td>
	    <td v-bind:class="{ sorted: highlightRed('Kevin\'s Rating')}">{{kOverall.toFixed(2)}}</td>
	</tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CategoryTypes } from '../interfaces/IRankingInfo';

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
	@Prop() sortBy!: string;
	@Prop() guest!: string;

    highlightRed(category: string) {
        return category === this.sortBy;
	}
}
</script>

<style scoped>
.rankings-table-row{
	padding: 5px 0px;
}
.rankings-table-row > td {
	color: #2d32af;
    height: 62px;
    min-width: 179px;
	width: 10%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
td.sorted {
	color: red !important;
}
.rankings-table-row > td > svg {
	color: red;
}
.guest-icon{
	margin-left: 5px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px){
	.rankings-table-row > td{
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.rankings-table-row > td{
		font-size: 14px;
		min-width: 93px;
	}
}
/* Larger devices than phones */
@media only screen and (min-width: 770px){
	.rankings-table-row.selected{
		background-color: #f0f0f5;
		border-top: #2d32af solid 1px;
		color: #2d32af;
	}
	.rankings-table-row:hover{
		background-color: #f1f1f1;
		cursor: pointer;
	}
}
</style>
