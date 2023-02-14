import ordivo from '@/utils/ordivo';
import $store from '@/stores/index';

const Controllers = {
  addAddress() {
    this.$refs.modal_address.showModal();
  },
  changeName() {
    $store.dispatch(
      'shoppingcart/setRecipientName',
      this.recipient_name
    );
  },
  changePhone() {
    $store.dispatch(
      'shoppingcart/setRecipientPhone',
      this.recipient_phone
    );
  },
  async pay() {
    this.skeleton = true;
    const store = this.$store.state;
    const recipient = store.shoppingcart.recipient;

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
        title: 'Tentukan Alamat Pengiriman',
        text: 'Alamat pengiriman barang belum ditentukan.',
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

    const orders = store.shoppingcart.orders;
    const {
      paymentId,
      paymentGroup,
      paymentImage,
    } = store.payment.payments;
    const { id } = store.shoppingcart.storeInfo.shop;
    const { priceTotal, qtyTotal } = store.shoppingcart.orders;
    const { items } = store.shoppingcart.orders;
    const { session_id } = store.shoppingcart.session;
    const { toko_id } = store.shoppingcart.shop;
    const {
      address,
      name,
      phone,
      email,
    } = store.shoppingcart.orders.address;

    const products = items.map((item) => {
      return { produk_id: item.id, qty: item.qty };
    });

    try {
      const body = {
        name: name,
        address: address,
        phone: phone,
        email: email,
        shop_id: id,
        payment_id: paymentId,
        total_amount: parseInt(priceTotal),
        total_qty: parseInt(qtyTotal),
        session_id: session_id,
        items: products,
      };

      this.submitLoading = true;

      const response = await ordivo.post(`/api/transaction`, body);
      const { data } = response.data;
      this.setPaymentResponse(data);

      this.submitLoading = false;

      // reset orders
      $store.dispatch('shoppingcart/resetOrdersOnlyItems');
      $store.dispatch('payment/resetPayment');

      this.$router.push({
        name: 'transactionbox',
        params: {
          id: data.invoice_number,
          tokoid: toko_id,
        },
      });
    } catch (error) {
      this.submitLoading = false;
      this.$swal({
        icon: 'error',
        title: 'Error server, silahkan ulangi kembali',
        text: error.message,
      });
    }

    this.skeleton = false;
  },
  pickShipping() {
    $store.dispatch('shoppingcart/setShipping', this.picked);

    const { shopAddress, buyerAddress } = $store.state.shoppingcart;

    if (this.picked === 'dikirim') {
      if (!buyerAddress) {
        this.$swal({
          icon: 'error',
          title: 'Pilih Alamat Pengiriman Barang',
          text: 'Alamat pengiriman barang belum ditentukan.',
        });
        $store.dispatch('shoppingcart/resetAddress');
      } else {
        $store.dispatch('shoppingcart/setAddress', buyerAddress);
      }
      return;
    } else {
      $store.dispatch('shoppingcart/setAddress', shopAddress);
    }
  },
};

export { Controllers };
