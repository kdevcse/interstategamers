import { createApp } from "vue";
import App from "./App.vue";
import ROUTER from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebookSquare, faTwitter, faPatreon, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {
  faPlayCircle, faPauseCircle, faGamepad, faSortUp, faSortDown,
  faUserPlus, faCaretSquareLeft, faCaretSquareRight, faBars, faTimes, faRss
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App as any);

library.add(faPlayCircle, faPauseCircle, faGamepad, faSortUp,
  faSortDown, faUserPlus, faCaretSquareLeft, faCaretSquareRight,
  faBars, faTimes, faFacebookSquare, faTwitter, faPatreon, faInstagram,
  faRss);

app.component("FontAwesomeIcon", FontAwesomeIcon);

app.use(ROUTER);

app.mount("#app");
