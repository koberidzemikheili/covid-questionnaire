import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Start",
      component: () => import("../views/StartView.vue"),
    },
    {
      path: "/identification",
      name: "Identification",
      component: () => import("../views/IdentificationView.vue"),
    },
    {
      path: "/covidquestions",
      name: "Covidquestions",
      component: () => import("../views/CovidquestionsView.vue"),
    },
  ],
});

export default router;
