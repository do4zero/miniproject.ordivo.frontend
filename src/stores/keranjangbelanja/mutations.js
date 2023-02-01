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
  RESET_ADDRESS(state, payload) {
    state.orders.address = null;
  },
  SET_STORE_INFO(state, payload) {
    state.storeInfo = payload;
  },
  RESET_ORDERS(state) {
    state.orders.id = null;
    state.orders.date = null;
    state.orders.items = [];
    state.orders.address = null;
    state.orders.priceTotal = 0;
    state.orders.qtyTotal = 0;
  },
  RESET_ORDERS_ONLY_ITEMS(state) {
    state.orders.items = [];
    state.orders.address = null;
    state.orders.priceTotal = 0;
    state.orders.qtyTotal = 0;
  },
  SET_SHOP_ADDRESS(state, payload) {
    state.shopAddress = payload;
  },
  SET_BUYER_ADDRESS(state, payload) {
    state.buyerAddress = payload;
  },
  SET_SHIPPING(state, payload) {
    state.shipping = payload;
  },
  SET_SHOP_ORDER(state, payload) {
    state.orders.toko_id = payload;
  },
  SET_SHOP_ID(state, payload) {
    state.shop = payload;
  },
  SET_RECIPIENT_NAME(state, payload) {
    state.recipient.name = payload;
  },
  SET_RECIPIENT_PHONE(state, payload) {
    state.recipient.phone = payload;
  },
};

export default mutations;
