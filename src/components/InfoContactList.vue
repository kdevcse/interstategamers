<template>
  <div class="info-contact-list">
    <h1>{{heading}}</h1>
    <ul class="contact-list">
      <li v-for="item in items" :key="item.href">
        <a class="contact-list-item" target="_blank" rel="noopener noreferrer" :href="item.href">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IContactListItem } from '../interfaces/IContactListItem'

@Component
export default class InfoContactList extends Vue {
  @Prop() heading!: string;
  @Prop() items!: IContactListItem[];
}
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
</style>
