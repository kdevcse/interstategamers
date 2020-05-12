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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.contact-list {
  color: #2d32af;
}
.contact-list > li {
  padding: 0.5vw;
}
.contact-list-item,
.contact-list-no-link {
  text-decoration: none;
  color: #2d32af;
}
.contact-list-item:hover {
  color: red;
}
h1 {
  color: #2d32af;
  border-bottom: 2px #2d32af solid;
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
