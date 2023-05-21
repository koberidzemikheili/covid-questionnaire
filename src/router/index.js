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
      path: "/covid-questions",
      name: "CovidQuestions",
      component: () => import("../views/CovidquestionsView.vue"),
    },
    {
      path: "/vaccine-questions",
      name: "VaccineQuestions",
      component: () => import("../views/VaccinequestionsView.vue"),
    },
    {
      path: "/suggestions",
      name: "Suggestions",
      component: () => import("../views/SuggestionsView.vue"),
    },
    {
      path: "/thank-you",
      name: "ThankYou",
      component: () => import("../views/ThankYouView.vue"),
    },
  ],
});

export default router;
