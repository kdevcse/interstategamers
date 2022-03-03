<template>
  <div class="options-container">
    <div class="options-header">
      <input
        id="options-searchbox"
        type="text"
        placeholder="Search"
        value
        autocomplete="off"
        @input="search"
      >
      <div
        id="scroll-indicator"
        :class="{ show: showBothIndicators }"
      >
        <font-awesome-icon
          id="scroll-indicator-left"
          :class="{ show: showLeftIndicator }"
          :icon="['fas', 'caret-square-left']"
          title="Scroll left to see more content"
        />
        <span id="scroll-indicator-txt">Scroll for more</span>
        <font-awesome-icon
          id="scroll-indicator-right"
          :class="{ show: showRightIndicator }"
          :icon="['fas', 'caret-square-right']"
          title="Scroll right to see more content"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';

onBeforeMount(() => {
  window.addEventListener('resize', showIndicator);
  window.addEventListener('scroll', showIndicator);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', showIndicator);
  window.removeEventListener('scroll', showIndicator);
});

const emit = defineEmits(['search-table']);

let showLeftIndicator = ref(false);
let showRightIndicator = ref(false);
let showBothIndicators = ref(false);

function showIndicator() {
  const pos = window.scrollX;
  const maxWidth = document.documentElement.scrollWidth - document.documentElement.clientWidth;

  if (pos > 0) {
    showLeftIndicator.value = true;
  } else {
    showLeftIndicator.value = false;
  }

  if (pos !== maxWidth) {
    showRightIndicator.value = true;
  } else {
    showRightIndicator.value = false;
  }

  if (showLeftIndicator.value || showRightIndicator.value) {
    showBothIndicators.value = true;
  }
  else {
    showBothIndicators.value = false;
  }
};

function search(e: any) {
  emit('search-table', e.target.value);
};

</script>

<style scoped>
.options-container {
  position: fixed;
  top: 72px;
  z-index: 1;
  background-color: var(--primary-color);
  color: white;
  width: 100%;
  text-align: left;
  align-items: center;
}
.options-header {
  background-color: var(--elevation-second-lvl-color);
  padding: 30px 55px 10px 55px;
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
.options-header input::-ms-clear {
  display: none;
}
#scroll-indicator {
  visibility: hidden;
  float: right;
}
#scroll-indicator-txt {
  margin: 0px 5px;
}
#scroll-indicator-left,
#scroll-indicator-right {
  visibility: hidden;
  height: 15px;
  width: 15px;
}
#scroll-indicator-left.show,
#scroll-indicator-right.show,
#scroll-indicator.show {
  visibility: visible;
}
@media screen and (prefers-color-scheme: dark) {
  .options-container {
    background-color: var(--secondary-color);
    color: var(--default-text-color);
  }
  .options-header input {
    background-color: var(--default-text-color);
  }
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 770px) {
  .options-header {
    padding: 10px 10px 30px 10px;
  }
  .options-header input {
    margin-right: 15px;
    padding: 4px 6px;
  }
}
/* Larger devices than phones */
@media only screen and (min-width: 770px) {
  .options-header input {
    margin-right: 30px;
  }
}
</style>