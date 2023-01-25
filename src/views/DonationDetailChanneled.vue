<template>
  <div class="global-wrapper">
    <div class="detail-channeled">
      <fixed-banner
        backlink="/"
        title="Donasi Tersalurkan"
        img="/img/slider1.jpg"
      ></fixed-banner>
      <div class="main-content pad-36">
        <div class="spacer"></div>
        <card-channeled
          v-for="channel in channels"
          :key="channel.id"
          :data="channel"
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
  name: 'donation-detail-channeled',
  components: {
    FixedBanner,
    CardChanneled,
  },
  data() {
    return {
      danaSaluran: 0,
      channels: [],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchSaluran();
    this.fetchProgramSaluran();
  },
  methods: {
    async fetchSaluran() {
      const campaigns = await axios.get('/danaterkumpul');
      const { data } = campaigns.data;
      this.danaSaluran = data.totaldonasi || 0;
    },
    async fetchProgramSaluran() {
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
