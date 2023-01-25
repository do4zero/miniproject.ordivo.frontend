<template>
  <div>
    <!-- splash screen -->
    <!-- <splash-screen v-if="splashScreen"></splash-screen> -->

    <!-- main page -->
    <div class="global-wrapper">
      <div class="main">
        <div class="topbar">
          <img
            src="@/assets/masjed_society.png"
            alt="Logo"
            class="logo-white"
          />
          <img
            src="@/assets/masjed_society.png"
            alt="Logo"
            class="logo"
          />
          <div class="title">Masjed Indonesia</div>
        </div>

        <sized-box :height="70" />

        <Menu />

        <sized-box :height="20" />

        <!-- Program Penghimpunan -->
        <div class="owl-wrapper-donations">
          <div class="section-title pad-36">
            <h4>Program Masjid - Masjid</h4>
            <sized-box :height="10" />
            <div class="row">
              <div class="col-md-6">
                <div>Terbaru</div>
              </div>
              <div class="col-md-6">
                <a href="/donations">Lihat Semua</a>
              </div>
            </div>
          </div>
          <div v-if="skeletonCard">
            <CardItem />
          </div>
          <template v-else>
            <owl-donations
              v-if="program_masjid.length > 0"
              :items="program_masjid"
            ></owl-donations>
            <div v-else class="pad-36">
              <div class="alert alert-warning text-center">
                Belum ada program pendanaan.
              </div>
            </div>
          </template>
        </div>

        <sized-box :height="20"></sized-box>

        <div class="bg-white box-white">
          <h4 class="title-box">Program Masjed</h4>
          <div
            style="display:block; width: 100%; height: 200px; background: #eee"
            v-if="skeletonCategory"
          ></div>
          <div v-else>
            <template v-if="MasjedCategory">
              <CategoriesSlider :items="MasjedCategory" />
            </template>
          </div>
          <a
            class="seeall"
            href="javascript:void(0)"
            @click="
              () =>
                $router.push({
                  name: 'ziswaf',
                  params: { kode_lembaga: 'masjed' },
                })
            "
          >
            Lihat Semua
            <font-awesome-icon icon="chevron-circle-right" />
          </a>
        </div>

        <sized-box :height="20"></sized-box>

        <div class="bg-white box-white">
          <h4 class="title-box">LAZ Dompet Yatim & Mesjid</h4>
          <div
            style="display:block; width: 100%; height: 200px; background: #eee"
            v-if="skeletonCategory"
          ></div>
          <div v-else>
            <template v-if="YdymCategory">
              <CategoriesSlider :items="YdymCategory" />
            </template>
          </div>
          <a
            class="seeall"
            href="javascript:void(0)"
            @click="
              () =>
                $router.push({
                  name: 'ziswaf',
                  params: { kode_lembaga: 'ydym' },
                })
            "
          >
            Lihat Semua
            <font-awesome-icon icon="chevron-circle-right" />
          </a>
        </div>

        <sized-box :height="20"></sized-box>

        <!-- Layanan Pengguna -->
        <div class="layanan-pengguna">
          <div class="section-title pad-36">
            <h4>Kontak Kami</h4>
          </div>
          <sized-box :height="20" />
          <div class="row pad-36">
            <div class="col-md-4">
              <div class="whatsapp">
                <img :src="'/img/icons/whatsapp.svg'" />
              </div>
              <p>Whatsapp</p>
            </div>
            <div class="col-md-4">
              <div class="email">
                <img :src="'/img/icons/email.svg'" />
              </div>
              <p>Email</p>
            </div>
            <div class="col-md-4">
              <div class="faq">
                <a href="/faq"><img :src="'/img/icons/faq.svg'"/></a>
              </div>
              <p>F.A.Q</p>
            </div>
          </div>
        </div>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SplashScreen from '@/components/SplashScreen.vue';
import CardCollected from '@/components/card/CardCollected.vue';
import OwlDonations from '@/components/owl-donations/Index.vue';
import { mapActions } from 'vuex';
import CardItem from '@/components/card/CardSkeleton';
import Menu from '@/views/menu/Index';
import SizedBox from '../components/SizedBox.vue';
import CategoriesSlider from '@/components/categories/Index.vue';

// import scripts
import { Models } from '@/scripts/home/models';
import { Controllers } from '@/scripts/home/controllers';

export default {
  name: 'Home',
  components: {
    SplashScreen,
    CardCollected,
    OwlDonations,
    CardItem,
    Menu,
    SizedBox,
    CategoriesSlider,
  },
  data() {
    return {
      ...Models,
    };
  },
  mounted() {
    setTimeout(() => {
      this.splashScreen = 0;
    }, 3000);
    window.scrollTo(0, 0);
    this.resetForm();
    this.fetchProgramMasjid();
    this.loadCategory();
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/home.scss';
</style>
