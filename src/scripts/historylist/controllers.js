import ordivo from '@/utils/ordivo';
import $store from '@/stores/index';

const Controllers = {
  async getHistoryList() {
    const { session_id } = $store.state.shoppingcart.session;
    const response = await ordivo.get(
      `/api/transaction/${session_id}/historyorder`
    );

    const { data } = response.data;
    this.products = data;
  },
};

export { Controllers };
