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
  resetAddress({ commit }) {
    commit('RESET_ADDRESS');
  },
  resetOrders({ commit }) {
    commit('RESET_ORDERS');
  },
  resetOrdersOnlyItems({ commit }) {
    commit('RESET_ORDERS_ONLY_ITEMS');
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
  setShopOrders({ commit }, payload) {
    commit('SET_SHOP_ORDER', payload);
  },
  setShopId({ commit }, payload) {
    // console.log(payload);
    commit('SET_SHOP_ID', payload);
  },
  setRecipientName({ commit }, payload) {
    commit('SET_RECIPIENT_NAME', payload);
  },
  setRecipientPhone({ commit }, payload) {
    commit('SET_RECIPIENT_PHONE', payload);
  },
};

export default actions;
