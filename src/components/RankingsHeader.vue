<template>
  <strong
    class="rankings-header"
    :class="{ sorted: isSorted() }"
    @mousedown="sortTableByCategory(category)"
  >
    {{ title }}
    <font-awesome-icon
      v-show="ascending"
      class="sort-icon"
      :class="{ sorted: isSorted() }"
      :icon="['fas', 'sort-up']"
    />
    <font-awesome-icon
      v-show="!ascending"
      class="sort-icon"
      :class="{ sorted: isSorted() }"
      :icon="['fas', 'sort-down']"
    />
  </strong>
</template>

<script setup lang="ts">
import { CategoryTypes } from "@/interfaces/IRankingInfo";
import { ref } from "vue";

const props = defineProps<{
  title?: string,
  category?: CategoryTypes,
  sortBy?: string
}>();

const emit = defineEmits(["sort-table"]);

//NOTE: Default state for icon is here. Needs to match category. See Ratings.vue
let ascending = ref(true);

function computeNonSortedState(category: CategoryTypes | undefined) {
  switch (category) {
    case CategoryTypes.Title:
    case CategoryTypes.Rank:
    case CategoryTypes.Platform:
      ascending.value = false;
      break;
    default:
      ascending.value = true;
      break;
  }
}

function isSorted() {
  const sort = props.category === props.sortBy;
  if (!sort) {
    computeNonSortedState(props.category);
  }
  return sort;
}

function sortTableByCategory(val: CategoryTypes | undefined) {
  ascending.value = !ascending.value;
  emit("sort-table", [val, ascending.value]);
}
</script>

<style scoped>
.rankings-header {
  padding: 16px 0px;
  background-color: var(--elevation-second-lvl-color);
  color: white;
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
.sort-icon {
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
@media only screen and (max-width: 770px) {
  .rankings-header {
    font-size: 14px;
    min-width: 93px;
  }
}
@media screen and (prefers-color-scheme: dark) {
  .rankings-header {
    color: var(--default-text-color);
  }
}
</style>
