<template>
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
                Anda telah menunaikan program :
                <br />
                <skeleton
                  v-if="productLoading"
                  :theme="'opacity'"
                  :shape="'radius'"
                  :bg-color="'#dcdbdc'"
                >
                  <tb-skeleton
                    :width="`100%`"
                    :aspect-ratio="0.05"
                  ></tb-skeleton>
                </skeleton>
                <span style="font-size:18px; color: #20D2A6" v-else>
                  <strong>
                    {{ productTitle ? productTitle : '' }}
                  </strong>
                </span>
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
                <span style="font-size:12px">Jumlah Dibayar</span>
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
                      ? trxStatus.status === 'unverified'
                        ? 'red'
                        : 'green'
                      : 'red'
                  "
                >
                  {{
                    trxStatus
                      ? trxStatus.status === 'unverified'
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
                  CEK STATUS&nbsp;&nbsp;<i class="fa fa-recycle"></i>
                </a>
              </div>

              <div class="label" style="position:relative">
                <span style="font-size:12px">Metode Pembayaran</span>
                <br />
                <div v-if="response">
                  <img
                    class="metode-pembayaran"
                    :src="response.url_img"
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
                  @click="() => call_deeplink(response.landing_page)"
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
            @click="
              () => {
                $router.push({ name: 'home' });
              }
            "
          >
            <i class="fa fa-map"></i> Kembali
          </a>
          <sized-box :height="15" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueQrcode from 'vue-qrcode';
import SizedBox from '../../../../../components/SizedBox.vue';
import axios from '@/utils/api';

export default {
  name: 'qrisResponse',
  components: {
    VueQrcode,
    SizedBox,
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
      productTitle: '',
      productLoading: false,
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
  },
  methods: {
    handleClick() {},
    async cekTransaksi(id) {
      this.trxLoading = true;
      const response = await axios.get(
        `cektransaksi?no_transaksi=${id}`
      );
      const data = response.data.data;

      this.statusPembayaran = response.data.data;

      if (this.statusPembayaran.status === 'unverified') {
        this.note = true;
      }

      this.trxStatus = data;
      this.trxLoading = false;

      if (data) {
        this.productLoading = true;
        const getproduct = await axios.get(
          `/new-microsite/get-product?id=${data.no_transaksi}`
        );
        const { product } = getproduct.data.data;
        this.productTitle = product.kategoriname;
        this.productLoading = false;
      }
    },
    call_deeplink(deeplinking_url) {
      var x = null;
      try {
        x = window.open(deeplinking_url, '_self');
      } catch (error) {
        console.log(error);
      } finally {
        if (!x) {
          console.log('terjadi kesalahan, refresh ulang browser');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss/payment-pick-nominal';
</style>
