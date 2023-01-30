const initialState = () => ({
  orders: {
    id: null,
    date: null,
    items: [],
    address: null,
    priceTotal: 0,
    qtyTotal: 0,
  },
  product: {
    id: null,
    name: null,
    price: 0,
    discount: 0,
    qty: 0,
  },
  storeInfo: null,
  session: null,
});

export default initialState;
