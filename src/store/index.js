import { createStore } from "vuex";

const STORAGE_KEY = "my-app-state";
export default createStore({
  state: {
    firstName: "",
    lastName: "",
    email: "",
  },
  mutations: {
    setFirstName(state, name) {
      state.firstName = name;
    },
    setLastName(state, name) {
      state.lastName = name;
    },
    setEmail(state, email) {
      state.email = email;
    },
    initState(state, savedState) {
      Object.assign(state, savedState);
    },
  },
  getters: {
    fullName(state) {
      return state.firstName + " " + state.lastName;
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
