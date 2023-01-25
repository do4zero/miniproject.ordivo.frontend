const actions = {
  resetForm({ commit }) {
    commit('RESET_FORM');
  },
  setInitialTransaction({ commit }, payload) {
    commit('SET_PROGRAM', payload.program);
    commit('SET_USER_DATA', payload.user);
  },
  setPayment({ commit }, payload) {
    commit('SET_PAYMENT', payload);
  },
  setUserData({ commit }, payload) {
    commit('SET_USER_DATA', payload);
  },
  setPaymentResponse({ commit }, payload) {
    commit('SET_PAYMENT_RESPONSE', payload);
  },
};

export default actions;
