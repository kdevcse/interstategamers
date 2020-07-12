<template>
    <div class="nav">
        <nav id="mobile-nav-bar">
            <div id="mobile-nav-main-container">
                <router-link id="mobile-nav-logo-container" to="/">
                    <img id="mobile-nav-logo" src="../assets/images/badge_sm.png"/>
                </router-link>
                <div id="mobile-nav-button">
                    <font-awesome-icon v-show="!mobileMenuOpened" id="mobile-nav-icon" :icon="['fa','bars']" @click="toggleMobileMenu()"/>
                    <font-awesome-icon v-show="mobileMenuOpened" id="mobile-nav-icon" :icon="['fa','times']" @click="toggleMobileMenu()"/>
                </div>
            </div>
            <div id="mobile-nav-list" v-bind:class="{ opened: mobileMenuOpened }">
                <router-link to="/ratings">Ratings</router-link>
                <a target="_blank" rel="noopener noreferrer" href="https://www.teepublic.com/stores/the-interstate-gamers?ref_id=7904">Store</a>
                <router-link to="/extras">Extras</router-link>
                <router-link to="/info">Info</router-link>
            </div>
        </nav>
        <nav id="nav-bar">
            <div class="nav-list">
                <router-link class="nav-tab" to="/"><img class="nav-tab-logo" src="../assets/images/badge_sm.png"></router-link>
                <router-link class="nav-tab" to="/ratings">Ratings</router-link>
                <a class="nav-tab" target="_blank" rel="noopener noreferrer" href="https://www.teepublic.com/stores/the-interstate-gamers?ref_id=7904">Store</a>
                <router-link class="nav-tab" to="/extras">Extras</router-link>
                <router-link class="nav-tab" to="/info">Info</router-link>
            </div>
        </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {
  @Prop() selected!: boolean;
  mobileMenuOpened = false;

  toggleMobileMenu(){
      this.mobileMenuOpened = !this.mobileMenuOpened;
  }

  @Watch('$route')
  closeMobileMenu() {
      this.mobileMenuOpened = false;
  }
}
</script>

<style scoped>
nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    z-index: 1;
    list-style-type: none;
    background-color: #2d32af;
}
.nav-tab-logo{
    height: 55px;
}
#mobile-nav-logo{
    width: 45px;
}
.nav-list {
    display: flex;
    align-items: center;
    margin-left: 62px;
}
.nav-tab {
    text-decoration: none;
    color: white;
    font-family: Interstate;
    font-weight: bold;
    font-size: 25px;
    margin-right: 62px;
    margin-top: 8px;
    vertical-align: middle;
    transition: text-decoration .2s ease-in;
}
.nav-list > a:hover, .router-link-exact-active {
    text-decoration: white underline solid;
}
@media only screen and (max-width: 770px){
    #nav-bar{
        display: none;
    }
    #mobile-nav-main-container{
        display: flex;
        align-items: center;
        height: 100%;
        margin-bottom: -2px;
    }
    #mobile-nav-logo-container{
        float: left;
    }
    #mobile-nav-logo-container, #mobile-nav-button{
        font-size: 38px;
        padding: 7.5px 5%;
        margin-top: 7.5px;
    }
    #mobile-nav-bar{
        display: inherit;
        background-color: #2d32af;
    }
    #mobile-nav-list{
        display: none;
        position: fixed;
        width: 100%;
        padding-bottom: 7px;
        background-color: #2d32af;
        z-index: 1;
    }
    #mobile-nav-list.opened{
        display: inherit;
    }
    #mobile-nav-list > a{
        color: white;
        padding: 14px 16px;
        text-decoration: none;
        text-align: center;
        font-size: 15px;
        display: block;
        border-top: white solid 1px;
        margin-left: 5%;
        margin-right: 5%;
    }
    #mobile-nav-button {
        color: white;
        float: right;
        margin-left: auto;
    }
    #mobile-nav-list a:hover {
        background-color: white;
        color: #2d32af;
    }
    #mobile-nav-button > svg{
        vertical-align: unset;
    }
    .active {
        background-color: #4CAF50;
        color: white;
    }
}
@media only screen and (min-width: 770px){
    #nav-bar{
        display: inherit;
        border-bottom: white solid 1px;
    }
    #mobile-nav-bar, #mobile-nav-logo-container, #mobile-nav-logo{
        display: none;
    }
}
</style>
