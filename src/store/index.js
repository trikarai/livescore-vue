import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rightDrawer: false,
  },
  mutations: {
    setRightDrawer: (state, payload) => {
      state.rightDrawer = payload;
    },
  },
  actions: {},
  modules: {},
});
