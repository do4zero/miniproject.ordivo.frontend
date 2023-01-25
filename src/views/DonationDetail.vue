<template>
  <div class="global-wrapper">
    <div class="donation-detail">
      <fixed-banner backlink="/donations" :img="data.cover_path"></fixed-banner>

      <div class="main-content pad-36">
        <!-- BOX TERKUMPUL -->
        <div class="box-terkumpul">
          <h4>Dana Terkumpul</h4>

          <vue-skeleton-loader
            v-if="skeleton"
            type="rect"
            :width="150"
            :height="15"
            :rounded="true"
            animation="fade"
          />
          <div v-else>
            <span class="text_terkumpul">
              Rp.
              {{ data.fund_collected | numeral('0,  0') | rupiah }}
            </span>
            <!--  -->
            <span class="text_target">
              dari Rp.
              {{ data.fund_target | numeral('0,  0') | rupiah }}
            </span>
          </div>
          <sized-box :height="10" />

          <div class="row">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="
                  `width: ${(
                    (data.fund_collected / data.fund_target) *
                    100
                  ).toFixed(3)}%`
                "
                :aria-valuenow="
                  `${((data.fund_collected / data.fund_target) * 100).toFixed(
                    3
                  )}`
                "
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-8 col-md-8">
              <div class="text">Jumlah Donatur</div>
              <div class="text-big" style="display:flex">
                <vue-skeleton-loader
                  v-if="skeleton"
                  type="rect"
                  :width="25"
                  :height="25"
                  :rounded="true"
                  animation="fade"
                />
                <span v-else> {{ data.total_donatur || 0 }}</span
                >&nbsp;Donatur
              </div>
            </div>
            <div class="col-4 col-md-4">
              <div class="text right">Batas Waktu</div>
              <div
                class="text-big right"
                style="display:flex; justify-content:flex-end"
              >
                <vue-skeleton-loader
                  v-if="skeleton"
                  type="rect"
                  :width="25"
                  :height="25"
                  :rounded="true"
                  animation="fade"
                />
                <span v-else>
                  {{ data.valid_date ? diffDays(data.valid_date) : 0 }}</span
                >
                &nbsp;Hari
              </div>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-md-12">
              <a
                :href="
                  `${
                    skeleton
                      ? 'javascript:void(0)'
                      : '/tunaikan-sekarang/' + data.id
                  }`
                "
                class="btn btn-cta btn-full mt-1"
              >
                Tunaikan Sekarang
              </a>
            </div>
          </div>
        </div>

        <!-- BOX CONTENT -->
        <div class="box-content">
          <div v-if="skeleton">
            <vue-skeleton-loader
              type="rect"
              :width="200"
              :height="10"
              :rounded="true"
              animation="fade"
            />
            <div v-for="index in 3" :key="index">
              <sized-box :height="5" />
              <vue-skeleton-loader
                type="rect"
                :width="250"
                :height="10"
                :rounded="true"
                animation="fade"
              />
              <sized-box :height="5" />
              <vue-skeleton-loader
                type="rect"
                :width="230"
                :height="10"
                :rounded="true"
                animation="fade"
              />
            </div>
            <div v-for="index in 3" :key="index">
              <sized-box :height="5" />
              <vue-skeleton-loader
                type="rect"
                :width="230"
                :height="10"
                :rounded="true"
                animation="fade"
              />
              <sized-box :height="5" />
              <vue-skeleton-loader
                type="rect"
                :width="190"
                :height="10"
                :rounded="true"
                animation="fade"
              />
            </div>
          </div>
          <div v-else class="content" v-html="data.desc || ''"></div>
        </div>
        <div class="spacer"></div>

        <!-- BOX SHARE -->
        <div class="box-share">
          <p>Beritahukan program ini kepada teman lewat:</p>
          <div class="spacer"></div>
          <div class="social-media-icon">
            <div class="whatsapp">
              <whats-app
                :url="data.url_slug || ''"
                scale="3"
                :title="data.title"
              ></whats-app>
            </div>
            <div class="twitter">
              <twitter
                :url="data.url_slug || ''"
                scale="3"
                :title="data.title"
              ></twitter>
            </div>
            <div class="facebook">
              <facebook :url="data.url_slug || ''" scale="3"></facebook>
            </div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="spacer"></div>
        <div v-if="skeleton">
          <CardItem />
        </div>
        <div v-else class="owl-wrapper-donations">
          <owl-donations :items="donations"></owl-donations>
        </div>
        <div class="spacer"></div>
        <div class="pad-36">
          <div class="download-aplikasi">
            <div class="section-title pad-36" style="text-align:center">
              <h4>Download Aplikasi Masjed!</h4>
              <p>
                Kemudahan Untuk Kebaikan Makmurkan Masjed dan Sejahterakan Ummat
              </p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <a
                  href="https://play.google.com/store/apps/details?id=id.masjed.app"
                  target="_blank"
                  class="playstore"
                >
                  <img :src="'/img/btn-google-play.png'" />
                </a>
              </div>
              <div class="col-md-6">
                <a
                  href="https://apps.apple.com/id/app/masjed/id1609918324"
                  target="_blank"
                  class="appstore"
                >
                  <img :src="'/img/btn-app-store.png'" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>
      </div>
    </div>

    <div
      v-if="isStickyCta"
      class="fixed-cta"
      :class="{ 'header-container--sticky': isStickyCta }"
    >
      <a
        :href="
          `${skeleton ? 'javascript:void(0)' : '/tunaikan-sekarang/' + data.id}`
        "
        class="btn btn-cta btn-full"
      >
        Tunaikan Sekarang
      </a>
    </div>
  </div>
</template>

<script>
import FixedBanner from '../components/FixedBanner.vue';
import OwlDonations from '@/components/owl-donations/Index.vue';
import axios from '../utils/masjedapi';
import { Facebook, Twitter, WhatsApp } from 'vue-socialmedia-share';
import { mapActions } from 'vuex';
import CardItem from '@/components/card/CardSkeleton';

// import { mapActions } from 'vuex';

export default {
  name: 'donation-detail',
  components: {
    FixedBanner,
    OwlDonations,
    Facebook,
    Twitter,
    WhatsApp,
    CardItem,
  },
  data() {
    return {
      data: [],
      donations: [],
      scrollY: null,
      isStickyCta: false,
      skeleton: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    window.addEventListener('load', () => {
      window.addEventListener('scroll', () => {
        this.scrollY = Math.round(window.scrollY);
      });
    });
    this.fetchDetail();
    this.fetchDonasiLainnya();
    this.resetForm();
  },
  updated() {},
  watch: {
    scrollY(newValue) {
      if (newValue > 450) {
        this.isStickyCta = true;
      } else {
        this.isStickyCta = false;
      }
    },
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    async fetchDetail() {
      const { id } = this.$router.history.current.params;
      this.skeleton = true;
      const detail = await axios.get(`/dkm/pendanaan/microsite/one/${id}`);
      this.skeleton = false;

      this.data = detail.data.data;
    },
    async fetchDonasiLainnya() {
      this.skeleton = true;

      const campaigns = await axios.get('/dkm/pendanaan/microsite/random-five');
      const { data } = campaigns.data;
      this.donations = data;
      this.skeleton = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/donation-detail';
</style>
