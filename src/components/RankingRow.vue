<template>
    <div @click="selectRowHandler" class="rankings-table-row" v-bind:class="{ selected: rowIsSelected() }">
	    <p v-bind:class="{ sorted: highlightRed('rank')}">{{rank}}</p>
	    <p v-bind:class="{ sorted: highlightRed('Game')}">
			<span>{{title}}</span>
        	<font-awesome-icon class='guest-icon' :icon="['fas', 'user-plus']" v-if="guest"></font-awesome-icon>
		</p>
	    <p v-bind:class="{ sorted: highlightRed('Year')}">{{year}}</p>
	    <p v-bind:class="{ sorted: highlightRed('Platform')}">{{platform}}</p>
	    <p v-bind:class="{ sorted: highlightRed('IG Score')}">{{overall.toFixed(2)}}</p>
	    <p v-bind:class="{ sorted: highlightRed('Gameplay')}">{{gameplay.toFixed(2)}}</p>
	    <p v-bind:class="{ sorted: highlightRed('Aesthetics')}">{{aesthetics.toFixed(2)}}</p>
	    <p v-bind:class="{ sorted: highlightRed('Content')}">{{content.toFixed(2)}}</p>
	    <p v-bind:class="{ sorted: highlightRed('Peter\'s Rating')}">{{pOverall.toFixed(2)}}</p>
	    <p v-bind:class="{ sorted: highlightRed('Kevin\'s Rating')}">{{kOverall.toFixed(2)}}</p>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CategoryTypes } from '../interfaces/IRankingInfo';

@Component
export default class RankingRow extends Vue 
{
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
	@Prop() selected!: string;

	highlightRed(category: string) 
	{
        return category === this.sortBy;
	}

	rowIsSelected() 
	{
		return this.title === this.selected;
	}

	selectRowHandler() 
	{
		if(this.title !== this.selected)
		{
			this.$emit('row-selected', this.title);
		}
		else 
		{
			this.$emit('row-selected', null);
		}
	}
}
</script>

<style scoped>
.rankings-table-row {
	padding: 5px 0px;
	display: grid;
	grid-template-columns: minmax(150px, 1fr) minmax(150px, 2fr) repeat(8, minmax(150px, 1fr));
}
.rankings-table-row > p {
	color: #2d32af;
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
p.sorted {
	color: red !important;
}
.rankings-table-row > p > svg {
	color: red;
}
.guest-icon{
	margin-left: 10px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px){
	.rankings-table-row > div{
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.rankings-table-row > div{
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
		background-color: #f0f0f5;
		cursor: pointer;
	}
}
</style>
