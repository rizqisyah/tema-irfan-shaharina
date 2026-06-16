import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // URL sekarang dinamis: /:themeCode/:username?to=NamaTamu
      path: "/:themeCode/:username",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
