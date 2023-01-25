<template>
  <div class="global-wrapper">
    <div class="detail-channeled">
      <fixed-banner
        backlink="/"
        title="Detail Himpunan Donasi"
        img="/img/slider2.jpg"
      ></fixed-banner>
      <div class="main-content pad-36">
        <h4 class="bold pt-3">Dana Terkumpul</h4>

        <div class="spacer"></div>

        <div class="box-nominal-dana-terkumpul">
          <h5>Nominal Dana Terkumpul</h5>
          <h3>Rp. {{ danaHimpunan | numeral('0,  0') | rupiah }}</h3>
        </div>

        <div class="spacer"></div>

        <!-- <div class="box-chart">
          <p>this is chart content</p>
        </div> -->

        <div class="spacer"></div>
        <card-channeled
          v-for="channel in channels"
          :key="channel.id"
          :data="channel"
          :button="false"
        ></card-channeled>
      </div>
    </div>
  </div>
</template>

<script>
import FixedBanner from '../components/FixedBanner.vue';
import CardChanneled from '../components/card/CardChanneled.vue';
import axios from '../utils/api';

export default {
  name: 'donation-detail-collected',
  components: {
    FixedBanner,
    CardChanneled,
  },
  data() {
    return {
      danaHimpunan: 0,
      channels: [],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchHimpunan();
    this.fetchProgramPenghimpunan();
  },
  methods: {
    async fetchHimpunan() {
      const campaigns = await axios.get('/danaterkumpul');
      const { data } = campaigns.data;
      this.danaHimpunan = data.totaldonasi || 0;
    },
    async fetchProgramPenghimpunan() {
      const campaigns = await axios.get('/getcampaign');
      const { data } = campaigns.data;

      data.forEach((element) => {
        let temp = {
          id: element.campaign.id,
          title: element.campaign.title,
          total: element.campaign.terkumpul,
        };

        this.channels.push(temp);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/donation-detail-collected.scss';
</style>
