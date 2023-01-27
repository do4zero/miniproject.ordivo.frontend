const mutations = {
  SET_ORDERS(state, payload) {
    state.orders.items = payload;
  },
  SET_TOTAL(state, payload) {
    state.orders.priceTotal = payload.priceTotal;
    state.orders.qtyTotal = payload.qtyTotal;
  },
  SET_UNIQUE_TRANSACTION(state, payload) {
    state.orders.id = payload.id;
    state.orders.date = payload.date;
  },
  SET_ADDRESS(state, payload) {
    state.orders.address = payload;
  },
  SET_STORE_INFO(state, payload) {
    state.storeInfo = payload;
  },
};

export default mutations;
