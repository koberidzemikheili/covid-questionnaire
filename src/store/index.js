import { createStore } from "vuex";

const STORAGE_KEY = "my-app-state";
export default createStore({
  state: {
    firstName: "",
    lastName: "",
    email: "",
  },
  mutations: {
    setIdentificationData(state, data) {
      state.firstName = data.name;
      state.lastName = data.lastname;
      state.email = data.email;
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
