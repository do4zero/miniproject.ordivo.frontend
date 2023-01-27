import pos from '@/utils/pos';
import $store from '@/stores/index';

const Controllers = {
  setPaymentPilihan(values) {
    $store.dispatch('payment/setPayments', values);
  },
};

export { Controllers };
