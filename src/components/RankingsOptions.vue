<template>
    <th class="options-header" colspan="10">
        <input @input="search" id="options-searchbox" type="text" placeholder="Search" value="" autocomplete="off">
        <div id="scroll-indicator">
            <font-awesome-icon id="scroll-indicator-left" :icon="['fas', 'caret-square-left']" title="Scroll left to see more content"></font-awesome-icon>
            <span id="scroll-indicator-txt">Scroll for more</span>
            <font-awesome-icon id="scroll-indicator-right" :icon="['fas', 'caret-square-right']" title="Scroll right to see more content"></font-awesome-icon>
        </div>
    </th>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RankingsOptions extends Vue {
    showIndicator() {

    };

    search(e: any) {
        this.$emit('search-table', e.target.value);
    }
}
</script>

<style scoped>
.options-header{
	background-color: #2d32af;
	position: fixed;
	height: 45px;
	width: 100%;
	top: 70px;
	text-align: left;
	align-items: center;
	padding: 20px 65px 0px 65px;
}
.options-header input {
	height: 25px;
	border: none;
	border: solid 1px #ccc;
	border-radius: 3px;
	border-collapse: collapse;
	padding: 6px 8px;
	margin-right: 30px;
}
.options-header input::-ms-clear{
	display: none;
}
#scroll-indicator{
	float: right;
}
#scroll-indicator-txt {
    padding: 0px 5px;
}
/*#scroll-indicator-left, #scroll-indicator-right{
	visibility: hidden;
}*/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px) {
	.options-header{
		padding: 10px 20px 0px 20px;
	}
	.options-header input {
		margin-right: 15px;
	}
}
/* Larger devices than phones */
@media only screen and (min-width: 770px){
	.options-header{
		padding: 20px 65px 0px 65px;
	}
	.options-header input {
		margin-right: 30px;
	}
}
</style>