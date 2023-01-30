import pos from '@/utils/pos';
import $store from '@/stores/index';

const Controllers = {
  setPaymentPilihan(values) {
    this.paymentPick = values;
  },
  handleConfirmation() {
    if (this.paymentPick) {
      $store.dispatch('payment/setPayments', this.paymentPick);

      this.$router.push({
        name: 'order-belanja',
        params: {
          tokoid: this.$route.params.tokoid,
          bookid: this.$route.params.bookid,
        },
      });
    } else {
      this.$swal({
        icon: 'error',
        title: 'Pilih Metode Pembayaran',
        text: 'Belum ada metode pembayaran yang anda pilih.',
      });
    }
  },
  back() {
    this.paymentPick = null;
    this.$router.go(-1);
  },
};

export { Controllers };
