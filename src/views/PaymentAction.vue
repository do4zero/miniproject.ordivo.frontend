<template>
  <div>
    <div class="global-wrapper">
      <top-bar
        backlink="/"
        :title="data.title ? ucwords(data.title) : ''"
        img="/img/slider1.jpg"
      >
      </top-bar>

      <div class="main-content bg-white pad-36">
        <div class="spacer"></div>
        <div class="spacer"></div>

        <form
          class="standar-form"
          action="javascript:void(0)"
          @submit.prevent="submit"
        >
          <div class="nominal-label">
            <p>Nominal Sedekah</p>
            <h3>
              Rp.
              <span>{{ nominalDonasi | numeral('0,  0') | rupiah }}</span>
            </h3>
          </div>
          <div class="spacer"></div>
          <!-- <div class="special-label">
            Pilih Metode Pembayaran
          </div> -->

          <!-- <payment-box></payment-box> -->

          <div class="spacer"></div>

          <div class="mt-3">
            <button
              type="submit"
              class="btn btn-cta btn-full"
              :disabled="submitStatus"
            >
              {{ submitText }}
            </button>
          </div>
        </form>
        <div class="spacer"></div>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/FixedTopbar.vue';
import PaymentBox from '../components/payment/Index.vue';
import { mapState, mapActions } from 'vuex';
import axios from '../utils/api';

export default {
  components: {
    TopBar,
    PaymentBox,
  },
  data() {
    return {
      data: [],
      submitStatus: false,
      submitText: 'Bayar',
      novirtual: 'XXXXXX',
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchDetail();
    window.history.forward(1);
  },
  computed: {
    ...mapState('transactions', [
      'programId',
      'paymentId',
      'programTitle',
      'nominalDonasi',
      'userData',
    ]),
  },
  methods: {
    ucwords(str) {
      let temp = str.toLowerCase();
      return (temp + '').replace(/^([a-z])|\s+([a-z])/g, function($1) {
        return $1.toUpperCase();
      });
    },
    ...mapActions('transactions', ['setPaymentResponse']),
    async fetchDetail() {
      const { slug } = this.$router.history.current.params;
      const detail = await axios.get(`/detailcampaign?slug=${slug}`);
      const { campaign } = detail.data.data;

      this.data = campaign;

      if (typeof this.data === 'undefined') {
        location.href = '/';
      }
    },
    async submit() {
      const { slug } = this.$router.history.current.params;

      // if (this.paymentId === '') {
      //   this.$swal('Anda belum memilih Metode Pembayaran.');
      //   return false;
      // }

      var formData = new FormData();
      formData.append('Transaksi[idcampprog]', this.programId);
      formData.append('Transaksi[nominal]', this.nominalDonasi);
      formData.append('Transaksi[bank]', '8');
      // formData.append('Transaksi[bank]', this.paymentId);
      formData.append('Transaksi[typecampprog]', 'CAMPAIGN');
      formData.append(
        'Transaksi[namaDonatur]',
        this.userData.namaDonatur || ''
      );
      formData.append(
        'Transaksi[emailDonatur]',
        this.userData.emailDonatur || ''
      );
      formData.append(
        'Transaksi[telpDonatur]',
        this.userData.teleponDonatur || ''
      );
      formData.append('Transaksi[comment]', this.userData.doaDonatur || '');

      this.submitStatus = true;
      this.submitText = 'Pembayaran diproses...';
      const result = await axios.post('/default/createtrx', formData);

      this.setPaymentResponse(result.data);
      this.submitStatus = false;
      this.submitText = 'Bayar';

      const { no_va, qris, landing_page } = result.data.data;
      if (no_va === null && qris === null) {
        window.open(landing_page, '_self');
      }
      this.$router.push({ name: 'payment-info', params: { slug } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/payment-action.scss';
</style>
