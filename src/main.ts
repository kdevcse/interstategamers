import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle, faPauseCircle, faGamepad, faSortUp, faSortDown, 
        faUserPlus, faCaretSquareLeft, faCaretSquareRight, faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlayCircle, faPauseCircle, faGamepad, faSortUp,
             faSortDown, faUserPlus, faCaretSquareLeft, faCaretSquareRight,
             faBars, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
