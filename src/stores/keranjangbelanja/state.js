const initialState = () => ({
  orders: {
    id: null,
    date: null,
    items: [],
    address: null,
    priceTotal: 0,
    qtyTotal: 0,
  },
  storeInfo: null,
  session: null,
  shop: null,
  shipping: 'diambil',
  shopAddress: null,
  buyerAddress: null,
  recipient: {
    name: null,
    phone: null,
  },
});

export default initialState;
