import pos from '@/utils/pos';
import $store from '@/stores/index';

const Controllers = {
  addAddress() {
    this.$refs.modal_address.showModal();
  },
  initialShippingAddress() {
    const shop = $store.state.shoppingcart.storeInfo.shop;
    const seller = $store.state.shoppingcart.storeInfo.seller;
    const { fullname, nohp, email } = seller;

    const address = {
      address: shop.alamat,
      email: email,
      name: fullname,
      phone: nohp,
    };

    $store.dispatch('shoppingcart/setShopAddress', address);
    $store.dispatch('shoppingcart/setAddress', address);
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

    if (
      !recipient.name ||
      recipient.name == '' ||
      !recipient.phone ||
      recipient.phone == ''
    ) {
      this.$swal({
        icon: 'error',
        title: 'Lengkapi alamat pemesan',
        text: 'Alamat pemesan anda belum lengkap.',
      });

      return false;
    }

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

    const body = {
      nama_pemesan: name,
      alamat_pemesan: address,
      nohp_pemesan: phone,
      toko_id: id,
      sof_id: paymentId,
      total_amount: parseInt(priceTotal),
      transaksi_item: products,
    };

    const response = await pos.post(`/micro/reqtransaksi`, body);
    const { data } = response.data;
    this.setPaymentResponse(data);

    // Save Order
    const itemsorder = items;
    const bodyOrder = {
      session_id: session_id,
      order_id: orders.id,
      total_amount: parseInt(priceTotal),
      total_qty: parseInt(qtyTotal),
      shipper_name: name,
      shipper_address: address,
      shipper_phone: phone,
      shipper_email: email ? email : null,
      trxid: data ? data.trxid : null,
      items: itemsorder,
      payment_response: JSON.stringify(data),
      payment_group: paymentGroup,
      payment_image: paymentImage,
      referral_code: toko_id,
      recipient_name: this.recipient_name
        ? this.recipient_name
        : null,
      recipient_phone: this.recipient_phone
        ? this.recipient_phone
        : null,
    };
    const order = await pos.post(`/guest/save_order`, bodyOrder);

    // reset orders
    $store.dispatch('shoppingcart/resetOrdersOnlyItems');

    if (paymentGroup === 'QRIS') {
      this.$router.push({
        name: 'transactionResponseQRIS',
        params: {
          id: data.trxid,
          tokoid: toko_id,
        },
      });
    }

    if (paymentGroup === 'EMONEY') {
      this.$router.push({
        name: 'transactionResponseEMONEY',
        params: {
          id: data.trxid,
          tokoid: toko_id,
        },
      });
    }

    if (paymentGroup === 'VA') {
      this.$router.push({
        name: 'transactionResponseVA',
        params: {
          id: data.trxid,
          tokoid: toko_id,
        },
      });
    }

    if (paymentGroup === 'SETORTUNAI') {
      this.$router.push({
        name: 'transactionResponseSETUN',
        params: {
          id: data.trxid,
          tokoid: toko_id,
        },
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
