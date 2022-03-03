<template>
  <div
    class="rankings-table-row"
    :class="{ selected: rowIsSelected() }"
    @click="selectRowHandler"
  >
    <p :class="{ sorted: highlightRed(CategoryTypes.Rank)}">
      {{ rank }}
    </p>
    <p
      :title="title"
      :class="{ sorted: highlightRed(CategoryTypes.Title)}"
    >
      <span>{{ title }}</span>
      <font-awesome-icon
        v-if="guest"
        class="guest-icon"
        :icon="['fas', 'user-plus']"
        :title="getGuestTxt()"
      />
    </p>
    <p :class="{ sorted: highlightRed(CategoryTypes.Year)}">
      {{ year }}
    </p>
    <p
      :title="platform"
      :class="{ sorted: highlightRed(CategoryTypes.Platform)}"
    >
      {{ platform }}
    </p>
    <p :class="{ sorted: highlightRed(CategoryTypes.Overall)}">
      {{ getOverallTxt }}
    </p>
    <p :class="{ sorted: highlightRed(CategoryTypes.Gameplay)}">
      {{ getGameplayTxt }}
    </p>
    <p :class="{ sorted: highlightRed(CategoryTypes.Aesthetics)}">
      {{ getAestheticsTxt }}
    </p>
    <p :class="{ sorted: highlightRed(CategoryTypes.Content)}">
      {{ getContentTxt }}
    </p>
    <p :class="{ sorted: highlightRed(CategoryTypes.POverall)}">
      {{ getPOverallTxt }}
    </p>
    <p :class="{ sorted: highlightRed(CategoryTypes.KOverall)}">
      {{ getKOverallTxt }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CategoryTypes } from "@/interfaces/IRankingInfo";

const props = defineProps<{
  rank?: number,
  title?: string,
  year?: number,
  platform?: string,
  overall?: number,
  gameplay?: number,
  aesthetics?: number,
  content?: number,
  pOverall?: number,
  kOverall?: number,
  sortBy?: string,
  guest?: string,
  selected?: string
}>();

const emit = defineEmits(['row-selected']);

function getGuestTxt() {
  return `Guest: ${props.guest}`;
}

function highlightRed(category: string) {
  return category === props.sortBy;
}

function rowIsSelected() {
  return props.title === props.selected;
}

function selectRowHandler() {
  if (props.title !== props.selected) {
    emit("row-selected", props.title);
  } else {
    emit("row-selected", undefined);
  }
}

const getOverallTxt = computed(() => {
  return props.overall ? props.overall.toFixed(2) : '';
});

const getGameplayTxt = computed(() => {
  return props.gameplay ? props.gameplay.toFixed(2) : '';
});

const getAestheticsTxt = computed(() => {
  return props.aesthetics ? props.aesthetics.toFixed(2) : '';
});

const getContentTxt = computed(() => {
  return props.content ? props.content.toFixed(2) : '';
});

const getPOverallTxt = computed(() => {
  return props.pOverall ? props.pOverall.toFixed(2) : '';
});

const getKOverallTxt = computed(() => {
  return props.kOverall ? props.kOverall.toFixed(2) : '';
});

//const CategoryTypes = computed(() => { return CategoryTypes });

</script>

<style scoped>
.rankings-table-row {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(150px, 2fr) repeat(
      8,
      minmax(150px, 1fr)
    );
}
.rankings-table-row > p {
  padding: 5px 0px;
  color: var(--default-text-color);
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
  color: var(--accent-color) !important;
}
.rankings-table-row > p > svg {
  color: var(--accent-color);
}
.guest-icon {
  margin-left: 10px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px) {
  .rankings-table-row > div {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .rankings-table-row > div {
    font-size: 14px;
    min-width: 93px;
  }
}
/* Larger devices than phones */
@media only screen and (min-width: 770px) {
  .rankings-table-row.selected {
    background-color: var(--elevation-first-lvl-color);
    border-top: var(--primary-color) solid 1px;
    color: var(--default-text-color);
  }
  .rankings-table-row:hover {
    background-color: var(--elevation-first-lvl-color);
    cursor: pointer;
  }
}
</style>
