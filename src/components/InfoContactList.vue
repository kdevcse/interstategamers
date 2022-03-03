<template>
  <div class="info-contact-list">
    <h1>{{ heading }}</h1>
    <ul class="contact-list">
      <li
        v-for="item in items"
        :key="item.href"
      >
        <a
          class="contact-list-item"
          target="_blank"
          rel="noopener noreferrer"
          :href="item.href"
        >{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IContactListItem } from '@/interfaces/IContactListItem';

defineProps<{
  heading?: string,
  items?: IContactListItem[]
}>();
</script>

<style scoped>
.contact-list {
  color: var(--primary-color);
}
.contact-list > li {
  padding: 0.5vw;
}
.contact-list-item,
.contact-list-no-link {
  text-decoration: none;
  color: var(--primary-color);
}
.contact-list-item:hover {
  color: var(--accent-color);
}
h1 {
  color: var(--primary-color);
  border-bottom: 2px var(--primary-color) solid;
}

@media only screen and (min-width: 600px) {
  .contact-list-item,
  .contact-list-no-link {
    font-size: 125%;
  }
  h1 {
    font-size: 150%;
  }
}
@media screen and (prefers-color-scheme: dark) {
  h1,
  .contact-list-item,
  .contact-list-no-link  {
    color: var(--default-text-color);
  }
}
</style>
