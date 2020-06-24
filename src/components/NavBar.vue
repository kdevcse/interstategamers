<template>
    <div class="nav">
        <nav id="mobile-nav-bar">
            <div id="mobile-nav-main-container">
                <a id="mobile-nav-logo-container" href="#">
                    <img id="mobile-nav-logo" src="../assets/images/IGLogo.png"/>
                </a>
                <a href="javascript:void(0);" id="mobile-nav-button">
                    <i id="mobile-nav-icon" class="fa fa-bars" onclick="menuDropdown()"/>
                </a>
            </div>
            <div id="mobile-nav-list">
                <router-link to="/ratings">Ratings</router-link>
                <a target="_blank" rel="noopener noreferrer" href="https://medium.com/the-interstate-gamers-podcast">Blog</a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.teepublic.com/stores/the-interstate-gamers?ref_id=7904">Store</a>
                <router-link to="/extras">Extras</router-link>
                <router-link to="/info">Info</router-link>
            </div>
        </nav>
        <nav id="nav-bar">
            <div class="nav-list">
                <router-link class="nav-tab" @click="setSelected" to="/"><img class="nav-tab-logo" src="../assets/images/IGLogo.png"></router-link>
                <router-link class="nav-tab" @click="setSelected" to="/ratings">Ratings</router-link>
                <a class="nav-tab" target="_blank" rel="noopener noreferrer" href="https://www.teepublic.com/stores/the-interstate-gamers?ref_id=7904">Store</a>
                <router-link class="nav-tab" @click="setSelected" to="/extras">Extras</router-link>
                <router-link class="nav-tab" @click="setSelected" to="/info">Info</router-link>
            </div>
        </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {
  @Prop() selected!: boolean;

  setSelected(){
      console.log('Hello World');
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
    height: 50px;
}
#mobile-nav-logo{
    width: 38px;
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
    #mobile-nav-bar, #mobile-nav-logo-container,#mobile-nav-logo{
        display: none;
    }
}
</style>
