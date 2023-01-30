import pos from '@/utils/pos';
import $store from '@/stores/index';

const Controllers = {
  addAddress() {
    this.$refs.modal_address.showModal();
  },
  async pay() {
    this.skeleton = true;
    const store = this.$store.state;

    if (store.shoppingcart.orders.items.length < 1) {
      this.$swal({
        icon: 'error',
        title: 'Pilih Produk',
        text: 'Belum ada produk yang anda pilih.',
      });

      return false;
    }

    if (!store.shoppingcart.orders.address) {
      this.$swal({
        icon: 'error',
        title: 'Pilih Alamat Pengiriman / Pengambilan Barang',
        text:
          'Alamat pengiriman / pengambilan barang belum ditentukan.',
      });

      return false;
    }

    if (!store.payment.payments) {
      this.$swal({
        icon: 'error',
        title: 'Pilih Metode Pembayaran',
        text: 'Belum ada metode pembayaran yang anda pilih.',
      });

      return false;
    }

    const { paymentId, paymentGroup } = store.payment.payments;
    const { id } = store.shoppingcart.storeInfo.shop;
    const { priceTotal } = store.shoppingcart.orders;
    const { items } = store.shoppingcart.orders;
    const {
      address,
      name,
      phone,
    } = store.shoppingcart.orders.address;
    const products = items.map((item) => {
      return { produk_id: item.id, qty: item.qty };
    });

    const params = {
      nama_pemesan: name,
      alamat_pemesan: address,
      nohp_pemesan: phone,
      toko_id: id,
      sof_id: paymentId,
      total_amount: parseInt(priceTotal),
      transaksi_item: products,
    };

    const response = await pos.post(`/micro/reqtransaksi`, params);
    const { data } = response.data;
    this.setPaymentResponse(data);

    if (paymentGroup === 'QRIS') {
      this.$router.push({
        name: 'transactionResponseQRIS',
        params: {
          id: data.trxid,
        },
      });
    }

    if (paymentGroup === 'EMONEY') {
      this.$router.push({
        name: 'transactionResponseEMONEY',
        params: {
          id: data.trxid,
        },
      });
    }

    if (paymentGroup === 'VA') {
      this.$router.push({
        name: 'transactionResponseVA',
        params: {
          id: data.trxid,
        },
      });
    }

    if (paymentGroup === 'SETORTUNAI') {
      this.$router.push({
        name: 'transactionResponseSETUN',
        params: {
          id: data.trxid,
        },
      });
    }

    this.skeleton = false;
  },
};

export { Controllers };
