import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlayCircle, faPauseCircle, faGamepad, faSortUp, faSortDown,
  faUserPlus, faCaretSquareLeft, faCaretSquareRight, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp({App});

library.add(faPlayCircle, faPauseCircle, faGamepad, faSortUp,
  faSortDown, faUserPlus, faCaretSquareLeft, faCaretSquareRight,
  faBars, faTimes);


app.component('font-awesome-icon', FontAwesomeIcon);

/*Firebase Setup*/
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

app.use(router);

app.mount('#app');
