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
                    {{
                      storeInfo
                        ? storeInfo.shop.nama_toko
                        : 'Toko Kami'
                    }}
                  </strong>
                  <br />
                  <br />

                  {{
                    trxStatus
                      ? trxStatus.status.toLowerCase(0) ===
                          'waiting' ||
                        trxStatus.status.toLowerCase(0) === 'failed'
                        ? 'Silahkan selesaikan pembayaran transaksi anda'
                        : ''
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
                  <span style="font-size:12px">Total Transaksi</span>
                  <br />Rp
                  {{ response.amount | numeral('0,0') | rupiah }}
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
                          : ''
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
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    const { id } = this.$router.history.current.params;
    this.response = this.paymentResponse;
    this.cekTransaksi(this.response.trxid);
    this.call_deeplink(this.response.landing_page);
  },
  computed: {
    ...mapState('transactions', [
      'paymentResponse',
      'masjid',
      'currentRoute',
    ]),
    ...mapState('payment', ['payments']),
    ...mapState('shoppingcart', ['storeInfo', 'session']),
  },
  methods: {
    handleClick() {},
    async cekTransaksi(id) {
      this.trxLoading = true;
      const response = await pos.post(`/micro/cektransaksi`, {
        invref: id,
      });
      const data = response.data.data;
      this.statusPembayaran = response.data.data;
      this.trxStatus = data;
      this.trxLoading = false;
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
      const { toko_id } = this.session;
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
</style>
