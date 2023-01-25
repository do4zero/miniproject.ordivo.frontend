<template>
  <div>
    <div class="global-wrapper">
      <!-- fix banner -->
      <a
        href="javascript:void(0)"
        @click="
          () => {
            $router.push({ name: 'home' });
          }
        "
        class="topbar-back"
        style="padding: 20px;"
      >
        <font-awesome-icon icon="chevron-left" />
        <div class="title">Kembali</div>
      </a>

      <sized-box :height="60" />

      <!-- list donations main content -->
      <div class="main-content">
        <!-- Title -->
        <div class="ziswaf-title">
          <h4>Daftar Pendanaan</h4>
          <p>
            Pendanaan akan disalurkan kepada yang membutuhkan
          </p>
        </div>

        <!-- Categories -->
        <ZiswafCategories
          :items="categoriesOptions"
          :active="categoriesActive"
        />

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
import CardDonations from '@/components/card/CardZiswaf.vue';
import FixedBanner from '@/components/FixedBanner.vue';
import _ from 'lodash';
import { mapActions } from 'vuex';
import CardItem from '@/components/card/CardSkeleton';
import ZiswafCategories from '@/components/ziswafcategories/Index';

// import scripts
import { Models } from '@/scripts/listziswaf/models';
import { Controllers } from '@/scripts/listziswaf/controllers';

export default {
  name: 'list-donations',
  components: {
    CardDonations,
    FixedBanner,
    CardItem,
    ZiswafCategories,
  },
  data() {
    return {
      ...Models,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchProgram();
    this.getNextProgram();
    this.resetForm();
    this.loadCategory();
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
  },
};
</script>

<style lang="scss" scoped>
.ziswaf-title {
  padding: 20px 20px;
  color: #555;
  h4 {
    font-weight: bold;
  }
}
</style>
