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
  resetOrders({ commit }) {
    commit('RESET_ORDERS');
  },
  setShopAddress({ commit }, payload) {
    commit('SET_SHOP_ADDRESS', payload);
  },
  setBuyerAddress({ commit }, payload) {
    commit('SET_BUYER_ADDRESS', payload);
  },
  setShipping({ commit }, payload) {
    commit('SET_SHIPPING', payload);
  },
};

export default actions;
