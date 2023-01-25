<template>
  <div>
    <div class="global-wrapper">
      <top-bar
        :backlink="`/`"
        :title="'Transaksi Berhasil'"
        img="/img/slider1.jpg"
      ></top-bar>

      <div class="main-content bg-white pad-36">
        <div class="spacer"></div>

        <form @submit.prevent="submit" class="standar-form">
          <!-- <div class="spacer"></div> -->
          <div class="notif-success text-center">
            Terima kasih telah menyelesaikan proses pembayaran, Isi
            form berikut untuk menerima bukti pembayaran.
          </div>
          <div class="spacer"></div>
          <div class="spacer"></div>
          <div
            class="form-group"
            :class="{ 'form-group--error': $v.name.$error }"
          >
            <label for="name">Nama Anda</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nama Anda"
              v-model="name"
            />
            <div
              class="error"
              v-if="$v.name.$dirty && !$v.name.required"
            >
              Nama anda harus diisi
            </div>
          </div>

          <div class="spacer"></div>

          <div
            class="form-group"
            :class="{ 'form-group--error': $v.email.$error }"
          >
            <label for="email">E-Mail Anda</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukan Email Anda"
              v-model="email"
            />
            <div
              class="error"
              v-if="$v.email.$dirty && !$v.email.required"
            >
              Email anda harus diisi
            </div>
            <div
              class="error"
              v-if="$v.email.$dirty && !$v.email.email"
            >
              Format email anda salah
            </div>
          </div>

          <div class="spacer"></div>

          <div
            class="form-group"
            :class="{ 'form-group--error': $v.telepon.$error }"
          >
            <label for="email">Telepon</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nomor Telepon Anda"
              v-model="telepon"
            />
            <div
              class="error"
              v-if="$v.telepon.$dirty && !$v.telepon.required"
            >
              telepon anda harus diisi
            </div>
          </div>

          <div class="spacer"></div>

          <div class="form-group">
            <label for="email">Do'a Anda</label>
            <textarea
              type="text"
              class="form-control"
              placeholder="Tulis Do'a terbaik Anda"
              v-model="doa"
            ></textarea>
          </div>

          <div class="spacer"></div>

          <div class="form-group">
            <button
              type="submit"
              @onclick="submit"
              class="btn btn-cta btn-full mt-1"
              :disabled="submitStatus"
            >
              {{ submitText }}
            </button>
          </div>
        </form>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/FixedTopbar.vue';
import { required, email } from 'vuelidate/lib/validators';
import VueNumeric from 'vue-numeric';
import { mapActions, mapState } from 'vuex';
import axios from '../utils/api';

export default {
  components: {
    TopBar,
    VueNumeric,
  },
  data() {
    return {
      data: [],
      nominal: '',
      name: '',
      email: '',
      telepon: '',
      doa: '',
      submitStatus: false,
      submitText: 'Kirim Bukti Transaksi',
      statusData: '',
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    telepon: {
      required,
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.initializeForm();
  },
  computed: {
    ...mapState('transactions', [
      'programId',
      'programTitle',
      'nominalDonasi',
      'userData',
    ]),
  },
  methods: {
    ...mapActions('transactions', ['setPaymentResponse']),
    ucwords(str) {
      let temp = str.toLowerCase();
      return (temp + '').replace(/^([a-z])|\s+([a-z])/g, function(
        $1
      ) {
        return $1.toUpperCase();
      });
    },
    ...mapActions('transactions', [
      'setInitialTransaction',
      'resetForm',
      'setUserData',
    ]),
    initializeForm() {
      this.nominal = this.nominalDonasi || 0;
      this.name = this.userData?.namaDonatur || '';
      this.email = this.userData?.emailDonatur || '';
      this.telepon = this.userData?.teleponDonatur || '';
      this.doa = this.userData?.doaDonatur || '';
    },
    async submit() {
      const { slug } = this.$router.history.current.params;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        const users = {
          namaDonatur: this.name,
          emailDonatur: this.email,
          teleponDonatur: this.telepon,
          doaDonatur: this.doa,
          noinvoice: slug,
        };

        this.submitStatus = true;
        const result = await axios.post('/resend/buktibayar', users);
        this.submitStatus = false;

        this.$swal(
          `Bukti pembayaran anda telah dikirim, silahkan cek email anda.`
        );

        this.setUserData(users);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/payment-pick-nominal';

.notif-success {
  background: rgb(172, 245, 143);
  padding: 15px;
  border-radius: 10px;
  font-size: 14px;
}
</style>
