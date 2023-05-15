import { createStore } from "vuex";

const STORAGE_KEY = "my-app-state";
export default createStore({
  state: {
    firstName: "",
    lastName: "",
    email: "",
    had_covid: "",
    had_antibody_test: false,
    antibodies: {},
    covid_sickness_date: null,
  },
  mutations: {
    setIdentificationData(state, data) {
      state.firstName = data.name;
      state.lastName = data.lastname;
      state.email = data.email;
    },
    setCovidquestionsData(state, data) {
      state.had_covid = data.had_covid;
      state.had_antibody_test = data.had_antibody_test;
      state.antibodies = data.antibodies;
      state.covid_sickness_date = data.covid_sickness_date;
    },
    initState(state, savedState) {
      Object.assign(state, savedState);
    },
  },
  getters: {
    getIdentificationData: (state) => {
      const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return savedState || state;
    },
  },
  plugins: [
    (store) => {
      const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (savedState) {
        store.commit("initState", savedState);
      }
      store.subscribe((mutation, state) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      });
    },
  ],
});
