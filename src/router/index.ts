import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Info from "@/views/InfoPage.vue";
import Extras from "@/views/ExtrasPage.vue";
import Ratings from "@/views/RatingsPage.vue";

const routes: any[] = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/ratings",
    name: "Ratings",
    component: Ratings
  },
  {
    path: "/info",
    name: "Info",
    component: Info
  },
  {
    path: "/extras",
    name: "Extras",
    component: Extras
  }
];

const ROUTER = createRouter({
  history: createWebHashHistory(),
  routes
});

export default ROUTER;
