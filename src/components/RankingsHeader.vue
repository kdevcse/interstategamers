<template>
    <th class="rankings-header" v-bind:class="{sorted: isSorted()}" @mousedown="sortTableByCategory(category)">
	    <div class="header-text">{{title}} 
            <font-awesome-icon class="sort-icon" v-bind:class="{sorted: isSorted()}" v-show="!ascending" :icon="['fas','sort-up']"></font-awesome-icon>
            <font-awesome-icon class="sort-icon" v-bind:class="{sorted: isSorted()}" v-show="ascending" :icon="['fas','sort-down']"></font-awesome-icon>
        </div>
	</th>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CategoryTypes, IRankingInfo } from '@/interfaces/IRankingInfo'

@Component
export default class RankingsHeader extends Vue {
    @Prop() title!: string;
    @Prop() category!: string;
    @Prop() sortBy!: string;

    ascending: boolean = true;

    mounted() {
        //this.computeAscending(this.category);
    }

    computeAscending(category: string){
        switch(category){
            case CategoryTypes.Rank:
                this.ascending = false;
                break;
            case CategoryTypes.Title:
                this.ascending = false;
                break;
            case CategoryTypes.Year:
                this.ascending = true;
                break;
            case CategoryTypes.Platform:
                this.ascending = false;
                break;
            default:
                this.ascending = true;
                break;
        }
    }

    isSorted() {
        const sort = this.category === this.sortBy;
        if (!sort) {
            this.computeAscending(this.category);
        }
        return sort;
    }

    sortTableByCategory (val: CategoryTypes) {
        this.ascending = !this.ascending;
        this.$emit('sort-table', [val, this.ascending]);
    }
}
</script>

<style scoped>
.rankings-header {
	background-color: #2d32af;
	position: -webkit-sticky; /* Safari */
	position: sticky;
	height: 62px;
	top: 115px;
	min-width: 179px;
	width: 10%;
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
.rankings-header.sorted {
	text-decoration: underline;
}
.rankings-header:hover {  
	cursor: pointer;
	text-decoration: underline;
}
.sort-icon{
    visibility: hidden;
	position: relative;
	bottom: 0;
    padding: 1px;
	margin-left: 5px;
}
.sort-icon.sorted {
    visibility: visible;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px){
    .rankings-header{
		font-size: 14px;
		min-width: 93px;
    }
}
/* Larger devices than phones */
@media only screen and (min-width: 770px){

}
</style>