import pos from '@/utils/pos';
import $store from '@/stores/index';

const Controllers = {
  async loadProduk() {
    const { produkid } = this.$route.params;
    this.skeleton = true;
    const response = await pos.get(
      `/shop/${produkid}/products/detail`
    );
    const { data } = response.data;
    this.product = data;
    this.skeleton = false;
  },
  async addToCart() {
    const { orders } = $store.state.shoppingcart;
    const {
      selprod_id,
      desc,
      created_at,
      updated_at,
      ...item
    } = this.product;

    const newItem = this.processChart(item, orders.items);
    const total = this.calculateTotal(newItem);

    $store.dispatch('shoppingcart/setOrders', newItem);
    $store.dispatch('shoppingcart/setTotal', total);
  },
  checkoutChart() {
    const { tokoid } = this.$route.params;
    const { id } = $store.state.shoppingcart.orders;
    const { orders } = $store.state.shoppingcart;
    const {
      selprod_id,
      desc,
      created_at,
      updated_at,
      ...item
    } = this.product;

    const newItem = this.processChart(item, orders.items);
    const total = this.calculateTotal(newItem);

    $store.dispatch('shoppingcart/setOrders', newItem);
    $store.dispatch('shoppingcart/setTotal', total);
    $store.dispatch('shoppingcart/setShopOrders', tokoid);

    this.$router.push({
      name: 'order-belanja',
      params: {
        tokoid: tokoid,
        bookid: id,
      },
    });
  },
  onLoadError() {
    this.imageError = true;
  },
  onLoad() {
    this.imageError = false;
  },
};

export { Controllers };
