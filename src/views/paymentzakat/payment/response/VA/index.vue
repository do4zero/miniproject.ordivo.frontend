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
                  <span style="font-size:11px;">
                    Anda telah menunaikan program :
                  </span>
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
                    CEK STATUS&nbsp;&nbsp;<i
                      class="fa fa-recycle"
                    ></i>
                  </a>
                </div>

                <div class="label" style="position:relative">
                  <span style="font-size:12px">Nomor VA</span>
                  <br />
                  {{ response.no_va }}
                  <a
                    class="cekStatus"
                    href="javascript:void(0)"
                    v-clipboard:copy="response.no_va"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >
                    SALIN NOMOR&nbsp;&nbsp;<i class="fa fa-copy"></i>
                  </a>
                </div>

                <div class="label">
                  <span style="font-size:12px"
                    >Metode Pembayaran</span
                  >
                  <br />
                  <div v-if="response">
                    <img
                      class="metode-pembayaran"
                      :src="response ? img_url : ''"
                    />
                    <span class="product_name">{{
                      response.produk_name
                    }}</span>
                  </div>
                  <span v-else>TRANSFER VA</span>
                  <div class="carabayar">
                    <template v-if="response">
                      <h2 v-if="response.html_guide.length > 0">
                        Cara Bayar
                      </h2>
                      <div
                        class="accordion accordion-flush"
                        id="accordionFlushExample"
                        v-if="response.html_guide.length > 0"
                      >
                        <div
                          class="accordion-item"
                          v-for="(row, index) in response.html_guide"
                          :key="row.title"
                        >
                          <h2
                            class="accordion-header"
                            :id="`flush-heading${index}`"
                          >
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              :data-bs-target="
                                `#flush-collapse${index}`
                              "
                              aria-expanded="false"
                              :aria-controls="
                                `#flush-collapse${index}`
                              "
                            >
                              {{ row.title }}
                            </button>
                          </h2>
                          <div
                            :id="`flush-collapse${index}`"
                            class="accordion-collapse collapse"
                            :aria-labelledby="`flush-heading${index}`"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              <div v-html="row.desc"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
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
      detail: null,
      loading: false,
      img_url: null,
      productTitle: '',
      productLoading: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    const { id } = this.$router.history.current.params;
    this.response = this.paymentResponse;
    this.cekTransaksi(this.response.trxid);
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
      this.img_url = data.url_icon_pembayaran;

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
    onCopy: function(e) {
      this.$toasted
        .show(`${e.text} telah disalin.`, {
          position: 'bottom-center',
        })
        .goAway(1000);
    },
    onError: function(e) {
      alert(`Failed to copy the text to the clipboard${e}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss/payment-pick-nominal';
</style>
