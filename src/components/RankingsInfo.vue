<template>
    <div class="test-info"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RankingsInfo extends Vue {
    
}
</script>

<style scoped>
.test-info {
	grid-column: 1/-1;
	height: 0px;
	transition: height 0.2s ease-out;
}
.rankings-table-info{
	display: table-row;
	padding: 0;
}
.charts{
	display: none;
	transition: height 2s linear;
	align-items: center;
}
.breakdown-day{
	margin: 0 auto 9px auto;
	font-size: 15px;
}
.breakdown-img{
	max-width: 200px;
	max-height: 188px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 3px;
	align-self: center;
}
.breakdown-scores{
	margin-left: auto;
	margin-right: auto;
	margin-top: 2px;
}
.meta-container, .ign-container{
	align-items: center;
	align-self: center;
	display: inline-flex;
}
.meta-logo, .ign-logo{
	height: 30px;
	width: 30px;
	margin-right: 5px;
}
.meta-score{
	margin-right: 20px;
}

/* Larger devices than phones */
@media only screen and (min-width: 770px){
	.chart {
		overflow: hidden;
		width: 200px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}
	.chart > h3{
		margin-top: 0;
		margin-bottom: 8px;
		font-size: 15px;
	}
	.expanded-breakdown{
		display: inline-grid;
		grid-template-columns: 250px 250px 250px 250px;
		margin-bottom: 20px;
	}
	.charts{
		float: left;
		margin-left: 64px;
		margin-top: 13px;
	}
	.stat-category{
		text-align: left;
		margin-top: 0px;
		margin-bottom: 2px;
		font-size: 13px;
	}
	.rank {
		height: 20px;
		width: 100%;
		margin-bottom: 6px;
		background-color: white;
		border: #2d32af solid 2px;
		border-radius: 3px;
	}
	.progress{
		width: 0%;
		height: 100%;
		background-color: #2d32af;
	}
	.overall{
		border: red solid 2px;
	}
	.overall-progress{
		background-color: red;
	}
	.expanded{
		display: table-row;
		background-color: #f0f0f5;
		border-bottom: #2d32af solid 1px;
	}
}
</style>