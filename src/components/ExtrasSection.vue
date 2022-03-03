<template>
  <div class="extras-section">
    <h1 class="extras-header">
      <span>
        <i :class="icon" />
      </span>
      {{ header }}
    </h1>
    <div
      v-for="item in items"
      :key="item.heading" 
      class="extras-cat logo-promo"
    >
      <img
        class="friend-img"
        :src="item.src"
      >
      <div class="friend-info">
        <h3>{{ item.heading }}</h3>
        <p v-html="item.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IFriendInfo } from "@/interfaces/IFriendInfo";

defineProps<{
  header?: string,
  items?: IFriendInfo[],
  icon?: string
}>();
</script>

<style>
.extras-cat {
  margin-bottom: 10px;
}
.friend-info > h3 {
  color: var(--primary-color);
  margin-bottom: 9px;
  font-size: 19px;
}
.friend-info > p {
  margin-top: 0;
  max-width: 850px;
}
.friend-img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.logo-promo {
  display: grid;
  grid-template-columns: 130px auto;
  align-items: center;
}
.info-links {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bolder;
}
.info-links:hover {
  text-decoration: underline;
  color: var(--accent-color);
}
.extras-header {
  border-bottom: var(--primary-color) solid 2px;
  color: var(--primary-color);
}
.extras-header > span > svg {
  color: var(--accent-color);
}

@media only screen and (max-width: 768px) {
  .logo-promo {
    margin-left: 2.5%;
    grid-template-columns: auto;
  }
  .friend-img {
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
  }
  .extras-header {
    margin-bottom: 0px;
  }
}
@media screen and (prefers-color-scheme: dark) {
  .extras-header,
  .friend-info > h3 {
    color: var(--default-text-color);
  }
}
</style>
