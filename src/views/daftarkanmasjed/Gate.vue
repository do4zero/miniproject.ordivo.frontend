<template>
  <div class="global-wrapper">
    <div class="donation-detail">
      <fixed-banner
        backlink="/"
        title="Daftarkan Masjed"
        img="/daftarmasjidbanner.jpeg"
        height="400"
      ></fixed-banner>

      <!-- <top-bar
        backlink="/"
        :title="'Daftarkan Masjed'"
        img="/daftarmasjidbanner.jpeg"
      >
      </top-bar> -->

      <div class="main-content pad-top20">
        <div class="wrapper-syaratketentuan">
          <div
            class="syaratketentuan"
            ref="desktop"
            @mousewheel="handelScroll"
          >
            <h3>PROGRAM <br />SEDEKAH CAHAYA MASJED</h3>
            <br />
            <p>
              Jika anda berpikir semua masjed di penjuru negeri ini
              seperti masjed ditempat anda, yang tak punya masalah
              dengan biaya listrik, maka anda salah. Ada jutaan
              masjed, mushalla, surau, atau langgar yang membutuhkan
              tangan-tangan perkasa membantu biaya beban listriknya.
              Dan kami yakin anda diantara pemilik tangan perkasa itu,
              meringankan beban biaya listrik masjed di seluruh
              pelosok negeri ini. masjed.id menjembatani dalam
              penyaluran pembayaran tagihan listrik ke seluruh
              jaringan masjed secara digital. Ayo, ikut menjadi bagian
              tangan perkasa untuk meringankan beban listrik masjed
              melalui masjed.id. Bersama kita terangi masjed di
              seluruh pelosok negeri dengan sedekah anda.
            </p>
            <h5>Syarat dan Ketentuan</h5>
            <ol>
              <li>
                Pendaftaran masjed berlaku sampai 27 Desember 2021
                untuk seluruh pengguna akun Layanan LinkAja dan
                pengguna aplikasi masjed.id
              </li>
              <li>
                Masjed yang di daftarkan di atas tanggal tersebut
                tidak akan mendapatkan penyaluran
              </li>
              <li>
                Penyaluran dana akan dilakukan di tanggal 28 Desember
                2022 kepada seluruh masjed yang sudah terdaftar di
                aplikasi masjed.id
              </li>
              <li>
                Dana yang disalurkan melalui aplikasi masjed.id
              </li>
              <li>
                Pastikan nomor telepon Pengurus Masjed sudah terdaftar
                di aplikasi LinkAja
              </li>
              <li>
                Untuk nomor telepon yang didaftarkan di aplikasi
                LinkAja dan masjed.id harus menggunakan nomor telepon
                yang sama
              </li>
              <li>
                Penyaluran dana hanya diberikan sekali saja
              </li>
              <li>
                Penyaluran dana diperuntukan untuk operasional masjed
              </li>
              <li>
                Hak pengguna dapat digugurkan apabila ditemukan
                tindakan yang dianggap sebagai penyalahgunaan,
                kecurangan dan atau transaksi mencurigakan lainnya
              </li>
              <li>
                Setiap pengguna bertanggung jawab atas transaksi yang
                dilakukan melalui aplikasi Layanan LinkAja
              </li>
              <li>
                Untuk info lebih lanjut terkait Program silahkan
                hubungi :
                <ol type="a">
                  <li>Email : marbot@masjed.id</li>
                  <li>Telpon : 0812 1130 0567</li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="main-content pad-36">
        <form @submit.prevent="daftarMasjid">
          <div>
            <label class="agreement mb-3">
              <input
                v-model="agreement"
                type="checkbox"
                name="agree"
                value="agree"
              />
              <span
                >Saya telah membaca & menyetujui syarat
                ketentuan.</span
              >
            </label>
            <div class="form-group">
              <button type="submit" class="btn btn-cta btn-full">
                Daftar
              </button>
            </div>
          </div>
        </form>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import TopBar from '../../components/FixedTopbar.vue';
import FixedBanner from '../../components/FixedBanner.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'donation-detail',
  components: {
    FixedBanner,
    // TopBar,
  },
  data() {
    return {
      data: [],
      donations: [],
      scrollY: null,
      isStickyCta: false,
      readDisabled: true,
      isSubmit: false,
      agreement: '',
    };
  },
  validations: {
    agreement: {
      required,
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    handelScroll() {
      if (this.$refs.desktop.scrollTop >= 755) {
        this.readDisabled = false;
      } else {
        this.readDisabled = true;
      }
    },
    daftarMasjid() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.isSubmit = false;
      } else {
        this.$router.push({ name: 'daftarkan' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/donation-detail';

.wrapper-syaratketentuan {
  background: #fff;
  margin: 0px 20px;
  padding: 5px;
  border-radius: 10px;
}
.syaratketentuan {
  background: #fff;
  padding: 30px;
  text-align: justify;
  height: 300px;
  overflow: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: #cece;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #20d2a6;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #eeeeee;
  }

  h3 {
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
  }
}

.pad-top20 {
  padding: 20px 0px !important;
}

.agreement {
  width: 340px;
  display: block;
  position: relative;
  margin: 0 auto;
  text-align: center;

  @media screen and (max-width: 320px) {
    width: 250px;
  }

  @media screen and(min-width: 321px) and (max-width: 375px) {
    width: 200px;
  }

  @media screen and(min-width: 376px) and (max-width: 480px) {
    width: 340px;
  }

  span {
    position: relative;
    top: -2px;
    left: 5px;
    font-size: 12px;
  }
}

.error {
  color: rgb(214, 5, 5);
  font-size: 11px;
}
</style>
