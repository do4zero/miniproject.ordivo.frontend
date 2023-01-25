import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import transactions from './transactions/index.js';
import ziswaf_campaigns from './ziswaf_campaigns/index.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    transactions,
    ziswaf_campaigns,
  },
  state: {
    token: localStorage.getItem('token'),
    errors: [],
    prevPath: '',
    nextPath: '',
    flashMessage: '',
  },
  getters: {
    isAuth: (state) => {
      return state.token != 'null' && state.token != null;
    },
  },
  mutations: {
    SET_PREVIOUS_PATH(state, payload) {
      state.prevPath = payload;
    },
    SET_NEXT_PATH(state, payload) {
      state.nextPath = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
    SET_FLASH_MESSAGE(state, payload) {
      state.flashMessage = payload;
    },
  },
  actions: {
    setFlashMessage({ commit }, payload) {
      commit('SET_FLASH_MESSAGE', payload);
    },
    setNextPath({ commit }, payload) {
      commit('SET_CURRENT_PATH', payload);
    },
    setPrevPath({ commit }, payload) {
      commit('SET_PREVIOUS_PATH', payload);
    },
  },
  plugins: [createPersistedState()],
});

export default store;
