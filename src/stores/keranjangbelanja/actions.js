const actions = {
  setOrders({ commit }, payload) {
    commit('SET_ORDERS', payload);
  },
  setTotal({ commit }, payload) {
    commit('SET_TOTAL', payload);
  },
  setUniqTransaction({ commit }, payload) {
    commit('SET_UNIQUE_TRANSACTION', payload);
  },
  setTokoInfo({ commit }, payload) {
    commit('SET_STORE_INFO', payload);
  },
  setAddress({ commit }, payload) {
    commit('SET_ADDRESS', payload);
  },
};

export default actions;
