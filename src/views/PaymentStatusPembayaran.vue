<template>
  <div class="global-wrapper">
    <top-bar
      :backlink="`/payment-info/${data.slug}`"
      :title="data.title ? ucwords(data.title) : ''"
      img="/img/slider1.jpg"
    >
    </top-bar>

    <div class="main-content bg-white pad-36">
      <form
        class="standar-form payment-after-action"
        action="javascript:void(0)"
      >
        <!-- method label -->

        <h4>Status Pembayaran</h4>
        <div class="spacer"></div>

        <div class="nominal-label">
          <div class="row">
            <div class="col-md-12">
              <div class="text">ID Transaksi</div>
            </div>
            <div class="col-md-12">
              <div>
                {{ statusData.no_transaksi || '' }}
              </div>
            </div>

            <div class="col-md-12">
              <div class="text">Tanggal Transaksi</div>
            </div>
            <div class="col-md-12">
              <div>{{ statusData.tgl_transaksi }}</div>
            </div>

            <div class="col-md-12">
              <div class="text">Nama Donatur</div>
            </div>
            <div class="col-md-12">
              <div>{{ statusData.namaDonatur }}</div>
            </div>

            <div class="col-md-12">
              <div class="text">Email Donatur</div>
            </div>
            <div class="col-md-12" v-if="statusData.emailDonatur !== null">
              <div>{{ statusData.emailDonatur }}</div>
            </div>

            <div class="col-md-12">
              <div class="text">Telepon Donatur</div>
            </div>
            <div class="col-md-12">
              <div>{{ statusData.telpDonatur }}</div>
            </div>

            <div class="col-md-12">
              <div class="text">Nominal</div>
            </div>
            <div class="col-md-6">
              <div>Rp. {{ statusData.amount | numeral('0,0') | rupiah }}</div>
            </div>

            <div class="col-md-12">
              <div class="text">Status Pembayaran</div>
            </div>
            <div class="col-md-6">
              <div
                class="number"
                :class="statusData.status === 'unverified' ? 'red' : 'green'"
              >
                {{ statusData.status }}
              </div>
            </div>

            <div class="col-md-12">
              <div class="text">Metode Pembayaran</div>
            </div>
            <div class="col-md-6">
              <div>{{ statusData.namaPembayaran }}</div>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <router-link to="/" class="btn btn-cta btn-full">
            Kembali Ke Beranda
          </router-link>
        </div>
      </form>

      <div class="spacer"></div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/FixedTopbar.vue';

import axios from '../utils/api';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    TopBar,
  },
  data() {
    return {
      data: [],
      submitStatus: false,
      novirtual: 'XXXXXX',
      dataPayment: '',
      statusData: '',
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchDetail();
    window.history.forward(1);
    this.initialPaymentResponse();
  },
  created() {
    window.addEventListener('popstate', this.popstateEventAction);
  },
  computed: {
    ...mapState('transactions', [
      'programId',
      'paymentId',
      'paymentTitle',
      'paymentImage',
      'programTitle',
      'nominalDonasi',
      'userData',
      'paymentResponse',
    ]),
  },
  methods: {
    ucwords(str) {
      let temp = str.toLowerCase();
      return (temp + '').replace(/^([a-z])|\s+([a-z])/g, function($1) {
        return $1.toUpperCase();
      });
    },
    initialPaymentResponse() {
      const { data } = this.paymentResponse;
      this.dataPayment = data;
      this.novirtual = data.no_va || 'XXXXX';
    },
    ...mapActions('transactions', ['setPaymentResponse']),
    async fetchDetail() {
      const { slug } = this.$router.history.current.params;
      const detail = await axios.get(`/detailcampaign?slug=${slug}`);
      const { campaign } = detail.data.data;
      const { data } = this.paymentResponse;

      const cekStatus = await axios.get(
        `/cektransaksi?no_transaksi=${data.trxid}`
      );

      this.statusData = cekStatus.data.data;

      this.data = campaign;

      if (typeof this.data === 'undefined') {
        location.href = '/';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/payment-after-action';
.text {
  font-weight: bold;
  font-size: 12px !important;
}

.red {
  color: rgb(189, 27, 27);
}

.green {
  color: rgb(13, 172, 13);
}
</style>
