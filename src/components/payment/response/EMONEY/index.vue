<template>
  <div class="global-wrapper">
    <div class="wrapper-container">
      <section
        class="page-section pembayaran response"
        style="padding: 0px !important;"
      >
        <div class="container">
          <sized-box :height="15" />

          <div class="main-content bg-white">
            <sized-box :height="15" />
            <div class="main-content bg-white">
              <div class="informasi-masjid">
                <p class="thanks"><strong>Terima Kasih</strong></p>
                <div class="alamat" style="text-align:center;">
                  Anda telah bertransaksi <br />
                  di
                  <strong>
                    {{ nama_toko ? nama_toko : 'Toko Kami' }}
                  </strong>
                  <br />
                  <br />

                  {{
                    trxStatus
                      ? trxStatus.status.toLowerCase(0) ===
                          'waiting' ||
                        trxStatus.status.toLowerCase(0) === 'failed'
                        ? 'Silahkan selesaikan pembayaran transaksi anda'
                        : 'Berikut adalah detail transaksi anda'
                      : 'Silahkan selesaikan pembayaran transaksi anda'
                  }}
                </div>
              </div>
            </div>

            <div class="trx-info">
              <template v-if="response">
                <div class="label">
                  <span style="font-size:12px">Transaksi ID</span>
                  <br />{{ response.trxid || '' }}
                </div>

                <div class="label">
                  <span style="font-size:12px"
                    >Tanggal Transaksi</span
                  >
                  <br />{{ order_date ? order_date : '' }}
                </div>

                <div class="label">
                  <span style="font-size:12px">Total Transaksi</span>
                  <br />Rp
                  {{ response.amount | numeral('0,0') | rupiah }}
                </div>

                <div class="label">
                  <span style="font-size:12px">Detail Transaksi</span>
                  <div class="product_detail">
                    <div
                      class="items"
                      v-for="items in product_items"
                      :key="items.id"
                    >
                      <div
                        style="display:flex; justify-content:space-between; align-items:center"
                      >
                        <p>
                          <strong>{{
                            capitalize(items.nama_produk)
                          }}</strong>
                        </p>
                        <p style="color: #999">
                          Rp {{ rp(items.amount) }}
                        </p>
                      </div>
                      <div
                        style="display:flex; justify-content:space-between; align-items:center"
                      >
                        <p>x{{ items.qty }}</p>
                        <p>Rp {{ rp(items.subtotal) }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="label" style="position:relative;">
                  <span style="font-size:12px">Status</span>
                  <br />
                  <span v-if="trxLoading" class="wait-payment">
                    Menunggu status...</span
                  >
                  <span
                    v-else
                    :class="
                      trxStatus
                        ? trxStatus.status.toLowerCase(0) ===
                            'waiting' ||
                          trxStatus.status.toLowerCase(0) === 'failed'
                          ? 'red'
                          : 'green'
                        : 'red'
                    "
                  >
                    {{
                      trxStatus
                        ? trxStatus.status.toLowerCase(0) ===
                            'waiting' ||
                          trxStatus.status.toLowerCase(0) === 'failed'
                          ? 'Belum Dibayar'
                          : 'Sudah Dibayar'
                        : 'Belum Dibayar'
                    }}
                  </span>
                  <a
                    class="cekStatus"
                    href="javascript:void(0)"
                    @click="() => cekTransaksi(response.trxid)"
                  >
                    CEK STATUS&nbsp;&nbsp;<i
                      class="fa fa-recycle"
                    ></i>
                  </a>
                </div>

                <div class="label" style="position:relative">
                  <span style="font-size:12px"
                    >Metode Pembayaran</span
                  >
                  <br />
                  <div v-if="response">
                    <img
                      class="metode-pembayaran"
                      :src="
                        payments
                          ? `/img/metpem/${payments.paymentImage}`
                          : `/img/metpem/${img_url}`
                      "
                    />
                    <span class="product_name">{{
                      response.produk_name
                    }}</span>
                  </div>
                  <span v-else>EMONEY</span>
                  <a
                    class="cekStatus"
                    href="javascript:void(0)"
                    style="top: 35px;"
                    @click="
                      () => call_deeplink(response.landing_page)
                    "
                  >
                    OPEN APP
                  </a>
                </div>
              </template>
              <template v-else>
                <p>Loading ...</p>
              </template>
            </div>
            <sized-box :height="15" />
            <a
              class="btn btn-outline"
              href="javascript:void(0)"
              style="display:block; position:relative; margin: 0 auto;"
              @click="belanjaLagi"
            >
              <i class="fa fa-map"></i> Belanja Produk Lainnya
            </a>
            <sized-box :height="15" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueQrcode from 'vue-qrcode';
import pos from '@/utils/pos';
import $store from '@/stores/index';

export default {
  name: 'qrisResponse',
  components: {
    VueQrcode,
  },
  data() {
    return {
      response: '',
      trxStatus: null,
      trxLoading: false,
      countDown: 15,
      statusPembayaran: '',
      note: '',
      emailphone: '',
      username: '',
      product_items: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getPaymentResponse();
  },
  computed: {
    ...mapState('transactions', [
      'paymentResponse',
      'masjid',
      'currentRoute',
    ]),
    ...mapState('payment', ['payments']),
    ...mapState('shoppingcart', ['storeInfo', 'session', 'shop']),
  },
  methods: {
    handleClick() {},
    async getPaymentResponse() {
      const { id } = this.$route.params;
      const response = await pos.get(
        `/shop/order/${id}/paymentresponse`
      );
      const { data } = response.data;
      const trx = JSON.parse(data.payment_response);
      const orderid = data.order_id;
      this.img_url = data.payment_image;
      this.response = trx;
      this.nama_toko = data.nama_toko;
      this.order_date = data.order_date;

      const productResponse = await pos.get(
        `/shop/order/${orderid}/produk/list`
      );

      this.product_items = productResponse.data.data;
      const openapp = await this.cekTransaksi(trx.trxid);
      if (openapp.status.toLowerCase() === 'waiting') {
        this.call_deeplink(trx.landing_page);
      }
    },
    async cekTransaksi(id) {
      this.trxLoading = true;
      const response = await pos.post(`/micro/cektransaksi`, {
        invref: id,
      });
      const data = response.data.data;
      this.statusPembayaran = response.data.data;
      this.trxStatus = data;
      this.trxLoading = false;

      return data;
    },
    call_deeplink(deeplinking_url) {
      var x = null;
      try {
        x = window.open(deeplinking_url, '_blank');
      } catch (error) {
        console.log(error);
      } finally {
        if (!x) {
          console.log('terjadi kesalahan, refresh ulang browser');
        }
      }
    },
    belanjaLagi() {
      const { shop } = this.storeInfo;
      const { toko_id } = this.shop;
      if (shop) {
        $store.dispatch('shoppingcart/resetOrders');
        $store.dispatch('payment/resetPayment');

        this.$router.push({
          name: 'produk',
          params: {
            tokoid: toko_id,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../views/scss/payment-pick-nominal';

@mixin center {
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

@mixin mobile-s {
  @media screen and (max-width: 320px) {
    @content;
  }
}

@mixin mobile-m {
  @media screen and (min-width: 321px) and (max-width: 374px) {
    @content;
  }

  @media screen and(min-width: 375px) and (max-width: 480px) {
    @content;
  }
}

@mixin mobile-l {
  @media screen and(min-width: 481px) and (max-width: 768px) {
    @content;
  }
  @media screen and(min-width: 769px) and (max-width: 820px) {
    @content;
  }
}

@mixin tablet {
  @media screen and(min-width: 769px) and (max-width: 1024px) {
    @content;
  }
}

.items {
  border-bottom: 1px dotted #e7e7e7;
  padding: 5px;
  p {
    margin: 0px;
    padding: 0px;
    font-size: 11px;
  }
}

.cekStatus {
  @include mobile-s {
    font-size: 9px !important;
  }
}
</style>
