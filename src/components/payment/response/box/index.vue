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
                    {{ response ? response.shop.name : 'Toko Kami' }}
                  </strong>
                  <br />
                  <br />

                  {{
                    response
                      ? response.status === 'WAITING' ||
                        response.status === 'FAILED'
                        ? 'Silahkan selesaikan pembayaran transaksi anda'
                        : 'Berikut adalah detail transaksi anda'
                      : 'Silahkan selesaikan pembayaran transaksi anda'
                  }}
                </div>
              </div>
            </div>

            <div class="trx-info">
              <template v-if="!trxLoading">
                <div class="label">
                  <span style="font-size:12px">Transaksi ID</span>
                  <br />{{ response.invoice_number || '' }}
                </div>

                <div class="label">
                  <span style="font-size:12px"
                    >Tanggal Transaksi</span
                  >
                  <br />{{ response.created_at || '' }}
                </div>

                <div class="label">
                  <span style="font-size:12px">Total Transaksi</span>
                  <br />Rp
                  {{
                    response.total_amount | numeral('0,0') | rupiah
                  }}
                </div>

                <div class="label">
                  <span style="font-size:12px">Detail Transaksi</span>
                  <div class="product_detail">
                    <div
                      class="items"
                      v-for="item in response.items"
                      :key="item.id"
                    >
                      <div
                        style="display:flex; justify-content:space-between; align-items:center"
                      >
                        <p style="font-size: 0.9rem; width: 45%">
                          <strong>{{
                            capitalize(item.product_name)
                          }}</strong>
                        </p>
                        <p style="color: #999">
                          Rp {{ rp(item.price) }}
                        </p>
                      </div>
                      <div
                        style="display:flex; justify-content:space-between; align-items:center"
                      >
                        <p>x{{ item.qty }}</p>
                        <p>Rp {{ rp(item.amount) }}</p>
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
                      response
                        ? response.status === 'WAITING' ||
                          response.status === 'FAILED'
                          ? 'red'
                          : 'green'
                        : 'red'
                    "
                  >
                    {{
                      response
                        ? response.status === 'WAITING' ||
                          response.status === 'FAILED'
                          ? 'Belum Dibayar'
                          : 'Sudah Dibayar'
                        : 'Belum Dibayar'
                    }}
                  </span>
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
                        response
                          ? `/img/metpem/${response.payment.image}`
                          : `/img/metpem/${img_url}`
                      "
                    />
                    <span class="product_name">{{
                      response.produk_name
                    }}</span>
                  </div>
                  <span v-else>EMONEY</span>
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
import ordivo from '@/utils/ordivo';
import $store from '@/stores/index';

export default {
  name: 'transactionbox',
  data() {
    return {
      response: '',
      trxStatus: null,
      trxLoading: false,
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
      this.trxLoading = true;
      const response = await ordivo.get(`/api/transaction/${id}`);
      const data = response.data.data;
      this.response = data;
      this.trxLoading = false;
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
