<template>
  <div class="global-wrapper">
    <div class="donation-detail">
      <fixed-banner
        backlink="/donations"
        :img="data ? data.img : ''"
      ></fixed-banner>

      <div class="main-content" style="padding: 0px 25px">
        <!-- BOX TERKUMPUL -->
        <sized-box :height="20" />
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
              {{
                (data ? data.terkumpul : 0)
                  | numeral('0,  0')
                  | rupiah
              }}
            </span>
            <!--  -->
            <span class="text_target">
              dari Rp.
              {{
                (data ? data.target : 0) | numeral('0,  0') | rupiah
              }}
            </span>
          </div>
          <sized-box :height="10" />

          <div class="row">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="
                  `width: ${
                    data
                      ? (
                          (data.terkumpul / data.target) *
                          100
                        ).toFixed(3)
                      : 0
                  }%`
                "
                :aria-valuenow="
                  `${
                    data
                      ? (
                          (data.terkumpul / data.target) *
                          100
                        ).toFixed(3)
                      : 0
                  }`
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
                <span v-else> {{ data ? data.donatur : 0 }}</span
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
                  {{
                    data ? diffDays(data.valid_date_campaign) : 0
                  }}</span
                >
                &nbsp;Hari
              </div>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-md-12">
              <a
                href="javascript:void(0)"
                class="btn btn-cta btn-full"
                @click="
                  () => {
                    if (!data) {
                      return false;
                    } else {
                      $router.push({
                        name: 'ziswaf-tunaikan-sekarang',
                        params: {
                          id: data ? data.id : '',
                        },
                      });
                    }
                  }
                "
                :disabled="skeleton ? false : true"
              >
                Tunaikan Sekarang
              </a>
            </div>
          </div>
        </div>
        <sized-box :height="20" />

        <!-- BOX CONTENT -->
        <div class="box-content">
          <div v-if="skeleton">
            <div v-for="index in 20" :key="index">
              <skeleton
                :theme="'opacity'"
                :shape="'radius'"
                :bg-color="'#dcdbdc'"
              >
                <tb-skeleton
                  :width="`100%`"
                  :aspect-ratio="0.02"
                ></tb-skeleton>
                <sized-box :height="5" />
              </skeleton>
              <sized-box :height="5" />
            </div>
          </div>
          <div
            v-else
            class="content"
            v-html="data ? data.desc : ''"
          ></div>
        </div>
        <div class="spacer"></div>

        <!-- BOX SHARE -->
        <div v-if="skeleton">
          <div v-for="index in 5" :key="index">
            <skeleton
              :theme="'opacity'"
              :shape="'radius'"
              :bg-color="'#dcdbdc'"
            >
              <tb-skeleton
                :width="`100%`"
                :aspect-ratio="0.02"
              ></tb-skeleton>
              <sized-box :height="5" />
            </skeleton>
            <sized-box :height="5" />
          </div>
        </div>
        <div class="box-share" v-else>
          <p>Beritahukan program ini kepada teman lewat:</p>
          <div class="spacer"></div>
          <div class="social-media-icon">
            <div class="whatsapp">
              <whats-app
                :url="data ? currentRoute : ''"
                scale="3"
                :title="data ? data.title : ''"
              ></whats-app>
            </div>
            <div class="twitter">
              <twitter
                :url="data ? currentRoute : ''"
                scale="3"
                :title="data ? data.title : ''"
              ></twitter>
            </div>
            <div class="facebook">
              <facebook
                :url="data ? currentRoute : ''"
                scale="3"
              ></facebook>
            </div>
          </div>
        </div>

        <sized-box :height="80" />
      </div>
    </div>

    <div
      v-if="isStickyCta"
      class="fixed-cta"
      :class="{ 'header-container--sticky': isStickyCta }"
    >
      <a
        href="javascript:void(0)"
        class="btn btn-cta btn-full"
        @click="
          () => {
            if (!data) {
              return false;
            } else {
              $router.push({
                name: 'ziswaf-tunaikan-sekarang',
                params: {
                  id: data ? data.id : '',
                },
              });
            }
          }
        "
      >
        Tunaikan Sekarang
      </a>
    </div>
  </div>
</template>

<script>
import FixedBanner from '@/components/FixedBanner.vue';
import OwlDonations from '@/components/owl-donations/Index.vue';
import { Facebook, Twitter, WhatsApp } from 'vue-socialmedia-share';
import { mapActions } from 'vuex';
import CardItem from '@/components/card/CardSkeleton';

// import scripts
import { Models } from '@/scripts/listziswafdetail/models';
import { Controllers } from '@/scripts/listziswafdetail/controllers';

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
      ...Models,
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
    this.currentRoute = window.location.href;
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
    ...Controllers,
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/donation-detail';
</style>
