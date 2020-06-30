<template>
    <p @mouseenter="hoverRow" @mousedown="selectRow" v-bind:class="{ sorted: highlight, hovered: emphasize}">
        {{getValue()}}
        <font-awesome-icon class='guest-icon' :icon="['fas', 'user-plus']" v-if="guest"></font-awesome-icon>
    </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RankingsCell extends Vue {
    @Prop() highlight!: boolean;
    @Prop() value!: any;
    @Prop() guest!: boolean;
    @Prop() round!: boolean;
    @Prop() episodeId!: string;
    @Prop() emphasize!: boolean;

    getValue() {
        return this.round ? this.value.toFixed(2) : this.value;
    }

    hoverRow() {
        this.$emit('row-hovered', this.episodeId);
    }

    selectRow() {
        this.$emit('row-selected', this.episodeId);
    }
}
</script>

<style scoped>
p {
    cursor: pointer;
    margin: 0;
    padding: 16px 0px;
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
p.hovered {
    background-color: #f1f1f1;
}
p > svg {
	color: red;
}
.guest-icon{
	margin-left: 5px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px){
	.rankings-table-row > p {
		padding-top: 20px;
		padding-bottom: 20px;
		font-size: 14px;
		min-width: 93px;
	}
}
</style>
