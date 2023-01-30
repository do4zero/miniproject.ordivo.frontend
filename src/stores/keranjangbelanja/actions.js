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
  setUniqSession({ commit }, payload) {
    commit('SET_UNIQUE_SESSION', payload);
  },
  setTokoInfo({ commit }, payload) {
    commit('SET_STORE_INFO', payload);
  },
  setAddress({ commit }, payload) {
    commit('SET_ADDRESS', payload);
  },
};

export default actions;
