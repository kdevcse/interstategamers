<template>
  <div class="nav-container">
    <nav id="mobile-nav-bar">
      <div id="mobile-nav-main-container">
        <router-link
          id="mobile-nav-logo-container"
          to="/"
        >
          <img
            id="mobile-nav-logo"
            :src="smallBadge"
          >
        </router-link>
        <div id="mobile-nav-button">
          <font-awesome-icon
            v-show="!mobileMenuOpened"
            id="mobile-nav-icon"
            :icon="['fa', 'bars']"
            @click="toggleMobileMenu()"
          />
          <font-awesome-icon
            v-show="mobileMenuOpened"
            id="mobile-nav-icon"
            :icon="['fa', 'times']"
            @click="toggleMobileMenu()"
          />
        </div>
      </div>
      <div
        id="mobile-nav-list"
        :class="{ opened: mobileMenuOpened }"
      >
        <router-link to="/ratings">
          Ratings
        </router-link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.teepublic.com/stores/the-interstate-gamers?ref_id=7904"
        >Store</a>
        <router-link to="/extras">
          Extras
        </router-link>
        <router-link to="/info">
          Info
        </router-link>
      </div>
    </nav>
    <nav id="nav-bar">
      <div class="nav-list">
        <router-link
          class="nav-tab light"
          to="/"
        >
          <img
            class="nav-tab-logo"
            :src="smallBadge"
          >
        </router-link>
        <router-link
          class="nav-tab dark"
          to="/"
        >
          <img
            class="nav-tab-logo"
            :src="smallDarkBadge"
          >
        </router-link>
        <router-link
          class="nav-tab"
          to="/ratings"
        >
          Ratings
        </router-link>
        <a
          class="nav-tab"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.teepublic.com/stores/the-interstate-gamers?ref_id=7904"
        >Store</a>
        <router-link
          class="nav-tab"
          to="/extras"
        >
          Extras
        </router-link>
        <router-link
          class="nav-tab"
          to="/info"
        >
          Info
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
import smallBadge from '@/assets/images/badge_sm.png';
import smallDarkBadge from '@/assets/images/badge_sm_dark-mode-colors.png';

defineProps<{
  selected?: boolean
}>();

const route = useRoute();
let mobileMenuOpened = ref(false);

function toggleMobileMenu() {
  mobileMenuOpened.value = !mobileMenuOpened.value;
}

watch(route, () => {
  mobileMenuOpened.value = false;
});
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  z-index: 2;
  list-style-type: none;
  background-color: var(--primary-color);
  color: var(--secondary-color);
}
.nav-tab.dark {
  display: none;
}
.nav-tab-logo {
  height: 55px;
}
#mobile-nav-list {
  background-color: var(--primary-color);
}
#mobile-nav-logo {
  width: 45px;
}
.nav-list {
  display: flex;
  align-items: center;
  padding-left: 62px;
  height: 100%;
}
.nav-tab {
  color: white;
  text-decoration: none;
  font-family: Interstate;
  font-weight: bold;
  font-size: 25px;
  margin-right: 62px;
  margin-top: 8px;
  vertical-align: middle;
  transition: text-decoration 0.2s ease-in;
}
.nav-list > a:hover,
.router-link-exact-active {
  text-decoration: white underline solid;
}
@media only screen and (max-width: 770px) {
  #nav-bar {
    display: none;
  }
  #mobile-nav-main-container {
    display: flex;
    align-items: center;
    height: 100%;
    margin-bottom: -2px;
  }
  #mobile-nav-logo-container {
    float: left;
  }
  #mobile-nav-logo-container,
  #mobile-nav-button {
    font-size: 38px;
    padding: 7.5px 5%;
    margin-top: 7.5px;
  }
  #mobile-nav-bar {
    display: inherit;
  }
  #mobile-nav-list {
    display: none;
    position: fixed;
    width: 100%;
    margin-bottom: 7px;
    z-index: 2;
  }
  #mobile-nav-list.opened {
    display: inherit;
  }
  #mobile-nav-list > a {
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    text-align: center;
    font-size: 15px;
    display: block;
    border-top: white solid 1px;
    padding-left: 5%;
    padding-right: 5%;
  }
  #mobile-nav-button {
    float: right;
    margin-left: auto;
  }
  #mobile-nav-list a:hover {
    background-color: white;
    color: var(--primary-color);
  }
  #mobile-nav-button > svg {
    vertical-align: unset;
  }
}
@media only screen and (min-width: 770px) {
  #nav-bar {
    display: inherit;
    border-bottom: white solid 1px;
  }
  #mobile-nav-bar,
  #mobile-nav-logo-container,
  #mobile-nav-logo {
    display: none;
  }
  @media screen and (prefers-color-scheme: dark) {
    #nav-bar {
      border-bottom: var(--primary-color) solid 1px;
    }
  }
}
@media screen and (prefers-color-scheme: dark) {
  #mobile-nav-list {
    background-color: var(--secondary-color);
  }
  #mobile-nav-list > a {
    background-color: var(--elevation-third-lvl-color);
    color: var(--default-text-color);
    border-top: var(--default-text-color) solid 1px;
  }
  nav {
    color: var(--default-text-color);
  }
  .nav-container > nav {
    background-color: var(--secondary-color);
    color: var(--default-text-color);
  }
  .nav-tab {
    color: var(--default-text-color);
  }
  .nav-tab.dark {
    display: initial;
  }
  .nav-tab.light {
    display: none;
  }
  .nav-container > nav > div {
    background-color: var(--elevation-third-lvl-color);
  }
  .nav-list > a:hover,
  .router-link-exact-active {
    text-decoration: var(--default-text-color) underline solid;
  }
}
</style>
