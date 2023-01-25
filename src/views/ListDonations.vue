<template>
  <div>
    <div class="global-wrapper">
      <!-- fix banner -->
      <fixed-banner
        backlink="/"
        title="Program Masjid - masjid"
        img="/img/slider1.jpg"
      ></fixed-banner>
      <!-- list donations main content -->
      <div class="main-content">
        <!-- filter button -->
        <!-- <div class="filter pad-36">
          <div class="row">
            <div class="col-md-6 p-2">
              <button class="btn btn-cta btn-full">
                Filter <font-awesome-icon icon="filter" />
              </button>
            </div>
            <div class="col-md-6 p-2">
              <button class="btn btn-cta btn-full">
                Urutkan <font-awesome-icon icon="sort" />
              </button>
            </div>
          </div>
        </div> -->

        <!-- list of donation -->

        <template v-if="skeleton">
          <CardItem v-for="index in 5" :key="index" />
        </template>

        <div v-else class="list-of-donations">
          <card-donations
            v-for="donation in donations"
            :key="donation.id"
            :data="donation"
          ></card-donations>
        </div>
        <div class="spacer"></div>
        <button
          type="button"
          v-if="data.length > 0"
          class="btn btn-cta"
          style="display:block; margin-bottom: 20px; position:relative; margin:0 auto; border-radius: 120px; padding:10px 40px !important; width: 70%;"
          @click="getLoadMore"
          :disabled="isLoading"
        >
          {{ submitText }}
        </button>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CardDonations from '../components/card/CardDonation.vue';
import FixedBanner from '../components/FixedBanner.vue';
import _ from 'lodash';
import axios from '../utils/masjedapi';
import { mapActions } from 'vuex';
import CardItem from '@/components/card/CardSkeleton';

export default {
  name: 'list-donations',
  components: {
    CardDonations,
    FixedBanner,
    CardItem,
  },
  data() {
    return {
      data: [],
      page: 1,
      donations: [],
      load: true,
      submitText: 'Program Lainnya',
      isLoading: false,
      skeleton: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchProgram();
    this.getNextProgram();
    this.resetForm();
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    async fetchProgram() {
      this.skeleton = true;
      const campaigns = await axios.get('/dkm/pendanaan/microsite');
      const { data } = campaigns.data;
      this.data = data;
      console.log(data);

      this.data.forEach((element) => {
        this.donations.push(element);
      });
      this.skeleton = false;
    },
    getNextProgram() {
      window.onscroll = async () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          // this.loadMore();
        }
      };
    },
    getLoadMore() {
      this.loadMore();
    },
    async loadMore() {
      if (this.load) {
        this.page = this.page + 1;
      }

      this.skeleton = true;
      this.isLoading = true;
      this.submitText = 'Mengambil Data...';

      let url = `/dkm/pendanaan/microsite?page=${this.page}`;
      const nextData = await axios.get(url);

      const { data } = nextData.data;

      if (data.length > 0) {
        data.forEach((element) => {
          if (!_.find(this.newData, { id: element.id })) {
            this.donations.push(element);
          }
        });
        this.load = true;
      } else {
        this.load = false;
      }

      this.skeleton = false;
      this.isLoading = false;
      this.submitText = 'Program Lainnya';
    },
  },
};
</script>
