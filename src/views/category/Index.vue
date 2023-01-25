<template>
  <div>
    <!-- splash screen -->
    <!-- <splash-screen v-if="splashScreen"></splash-screen> -->

    <!-- main page -->
    <div class="global-wrapper">
      <div class="main">
        <a
          href="javascript:void(0)"
          @click="
            () => {
              $router.push({ name: 'home' });
            }
          "
          class="topbar-back"
          style="padding: 20px"
        >
          <font-awesome-icon icon="chevron-left" />
          <div class="title">Kembali</div>
        </a>
        <sized-box :height="70" />

        <div class="bg-white box-white">
          <h4 class="title-box">
            <vue-skeleton-loader
              type="rect"
              :width="250"
              :height="15"
              :rounded="true"
              animation="fade"
              v-if="skeletonCard"
            />
            {{
              categories.name ? 'Kategori : ' + categories.name : ''
            }}
          </h4>
          <div
            style="display:block; width: 100%; height: 200px; background: #eee"
            v-if="skeletonCard"
          ></div>
          <template v-else>
            <img
              v-if="!this.imageError"
              :src="categories.img"
              style="width: 100%;"
              @error="onLoadError"
              @load="onLoad"
            />
            <div class="noimage" v-else>
              No Image
            </div>
          </template>
          <div style="padding: 15px;" v-if="skeletonCard">
            <skeleton
              :theme="'opacity'"
              :shape="'radius'"
              :bg-color="'#dcdbdc'"
            >
              <div v-for="index in 17" :key="index">
                <tb-skeleton
                  :width="`100%`"
                  :aspect-ratio="0.02"
                ></tb-skeleton>
                <sized-box :height="5" />
              </div>
            </skeleton>
          </div>
          <p style="padding: 15px; text-align: justify" v-else>
            {{ categories.note ? categories.note : '' }}
          </p>
          <div style="padding: 15px;" v-if="!skeletonCard">
            <button
              class="btn btn-cta btn-full"
              @click="lihatSemuaProgram"
            >
              Lihat Semua Program
            </button>
          </div>
        </div>
        <sized-box :height="10" />

        <!-- <div class="owl-wrapper-donations">
          <div class="section-title pad-36">
            <sized-box :height="10" />
            <div class="row">
              <div class="col-md-6">
                <div>Terbaru</div>
              </div>
              <div class="col-md-6">
                <a href="/donations">Lihat Lainnya</a>
              </div>
            </div>
          </div>
          <div v-if="skeletonCard">
            <CardItem />
          </div>
          <template v-else>
            <owl-donations
              v-if="newDataBasedOnCategory.length > 0"
              :items="newDataBasedOnCategory"
            ></owl-donations>
            <div v-else class="pad-36">
              <div class="alert alert-warning text-center">
                Belum ada program pendanaan.
              </div>
            </div>
          </template>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SplashScreen from '@/components/SplashScreen.vue';
// import OwlDonations from '@/components/owl-donations-ziswaf/Index.vue';
import { mapActions } from 'vuex';
import CardItem from '@/components/card/CardSkeleton';
import CategoriesSlide from '@/components/categories/Index.vue';

// import scripts
import { Models } from '@/scripts/category/models';
import { Controllers } from '@/scripts/category/controllers';

export default {
  name: 'Home',
  components: {
    SplashScreen,
    // OwlDonations,
    CardItem,
    CategoriesSlide,
  },
  data() {
    return {
      ...Models,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.loadData();
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
  },
};
</script>

<style lang="scss" scoped>
@import './../scss/home.scss';
</style>
