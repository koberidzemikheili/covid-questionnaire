import { createRouter, createWebHistory } from "vue-router";
import StartView from "../views/StartView.vue";
import IdentificationView from "../views/IdentificationView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Start",
      component: StartView,
    },
    {
      path: "/identification",
      name: "Identification",
      component: IdentificationView,
    },
  ],
});

export default router;
