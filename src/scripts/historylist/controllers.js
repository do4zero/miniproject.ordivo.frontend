import pos from '@/utils/pos';
import $store from '@/stores/index';

const Controllers = {
  async getHistoryList() {
    const { session_id } = $store.state.shoppingcart.session;
    const response = await pos.get(
      `/shop/order/${session_id}/history/list`
    );

    const { data } = response.data;
    this.products = data;
  },
};

export { Controllers };
