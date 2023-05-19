import { createStore } from "vuex";
import axios from "axios";
const STORAGE_KEY = "my-app-state";
export default createStore({
  state: {
    first_name: "",
    last_name: "",
    email: "",
    had_covid: "",
    had_antibody_test: false,
    antibodies: {},
    covid_sickness_date: null,
    had_vaccine: false,
    vaccination_stage: "",
    i_am_waiting: "",
    non_formal_meetings: "",
    number_of_days_from_office: "",
    what_about_meetings_in_live: "",
    tell_us_your_opinion_about_us: "",
  },
  mutations: {
    setIdentificationData(state, data) {
      state.first_name = data.name;
      state.last_name = data.lastname;
      state.email = data.email;
    },
    setCovidquestionsData(state, data) {
      state.had_covid = data.had_covid;
      state.had_antibody_test = data.had_antibody_test;
      state.antibodies = data.antibodies;
      state.covid_sickness_date = data.covid_sickness_date;
    },
    setVaccinequestionsData(state, data) {
      state.had_vaccine = data.had_vaccine;
      state.vaccination_stage = data.vaccination_stage;
      state.i_am_waiting = data.i_am_waiting;
    },
    setSuggestionsData(state, data) {
      state.non_formal_meetings = data.non_formal_meetings;
      state.number_of_days_from_office = data.number_of_days_from_office;
      state.what_about_meetings_in_live = data.what_about_meetings_in_live;
      state.tell_us_your_opinion_about_us = data.tell_us_your_opinion_about_us;
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
  actions: {
    async sendDataToServer() {
      try {
        const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const response = await axios.post(
          "https://covid19.devtest.ge/api/create",
          savedState
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
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
