<template>
  <div class="global-wrapper">
    <div class="donation-detail">
      <top-bar
        backlink="/"
        :title="'Berhasil Mendaftarkan'"
        img="/img/slider1.jpg"
      >
      </top-bar>

      <div
        class="main-content pad-36"
        style="min-height:75vh; padding-top: 20px;"
      >
        <SizedBox :height="30" />
        <div class="alert alert-info">
          <p>
            Data masjid yang Anda input telah kami simpan kami akan mengirimkan
            form pendaftaran masjid melalui email pengurus yang anda daftarkan,
            dan selanjutnya silakan unduh lalu lengkapi formulir yang kami
            sediakan.
          </p>
          <p>
            Formuilir dilengkapi dan ditandatangani oleh Ketua/Pengurus BKM,
            selanjutnya tim kami akan melakukan verifikasi.
          </p>
        </div>
        <SizedBox :height="20" />
        <a href="/" class="btn btn-cta btn-full">
          Selesai
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/FixedTopbar.vue';
import SizedBox from '../../components/SizedBox.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'donation-detail',
  components: {
    TopBar,
    SizedBox,
  },
  data() {
    return {};
  },
  validations: {
    agreement: {
      required,
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../scss/donation-detail';
</style>
