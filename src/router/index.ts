import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Info from "@/views/Info.vue";
import Extras from "@/views/Extras.vue";
import Ratings from "@/views/Ratings.vue";

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

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
