<template>
    <tr class="rankings-table-row">
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
