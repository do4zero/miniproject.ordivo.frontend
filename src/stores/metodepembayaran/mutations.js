const mutations = {
  SET_PAYMENTS(state, payload) {
    state.payments = payload;
  },
  RESET_PAYMENTS(state) {
    state.payments = null;
  },
};

export default mutations;
