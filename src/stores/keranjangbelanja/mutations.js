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
  SET_UNIQUE_SESSION(state, payload) {
    state.session = payload;
  },
  SET_ADDRESS(state, payload) {
    state.orders.address = payload;
  },
  SET_STORE_INFO(state, payload) {
    state.storeInfo = payload;
  },
  RESET_ORDERS(state) {
    state.orders = {
      id: null,
      date: null,
      items: [],
      address: null,
      priceTotal: 0,
      qtyTotal: 0,
    };
  },
};

export default mutations;
