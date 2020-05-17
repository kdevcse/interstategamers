import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faPauseCircle, faGamepad, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlayCircle, faPauseCircle, faGamepad, faSortUp, faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
