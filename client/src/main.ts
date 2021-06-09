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
  apiKey: "AIzaSyBtt-MwRoY5x0ValrczH7bomtx5cyMvopc",
  authDomain: "interstategamers-7122d.firebaseapp.com",
  projectId: "interstategamers-7122d",
  storageBucket: "interstategamers-7122d.appspot.com",
  messagingSenderId: "960788987586",
  appId: "1:960788987586:web:d1fe11bb12f8c6512d455b",
  measurementId: "G-2342HJ4PT9"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
