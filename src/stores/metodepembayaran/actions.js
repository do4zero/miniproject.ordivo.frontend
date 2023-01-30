const actions = {
  setPayments({ commit }, payload) {
    commit('SET_PAYMENTS', payload);
  },
  resetPayment({ commit }) {
    commit('RESET_PAYMENTS');
  },
};

export default actions;
