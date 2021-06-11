import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle, faPauseCircle, faGamepad, faSortUp, faSortDown, 
        faUserPlus, faCaretSquareLeft, faCaretSquareRight, faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlayCircle, faPauseCircle, faGamepad, faSortUp,
             faSortDown, faUserPlus, faCaretSquareLeft, faCaretSquareRight,
             faBars, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = true;

/*Firebase Setup*/
const firebaseConfig = {
  apiKey: "AIzaSyCmzX1CIW5vK7ri6C5EL6zt_APHE7n5-WM",
  authDomain: "ig-serverless-functions.firebaseapp.com",
  projectId: "ig-serverless-functions",
  storageBucket: "ig-serverless-functions.appspot.com",
  messagingSenderId: "751599859347",
  appId: "1:751599859347:web:36cb3e4de18bad70d17f66"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
