<template>
  <div>
    <!-- main page -->
    <div class="global-wrapper">
      <fixed-banner
        :title="tokoinfo ? tokoinfo.shop.nama_toko : 'Shop Name'"
      ></fixed-banner>
      <div class="main">
        <sized-box :height="10" />
        <div class="container-fluid">
          <div ref="sticky_search" style="padding: 5px;">
            <div class="row">
              <div class="col-md-12">
                <div class="search">
                  <input
                    class="form-control my-input"
                    placeholder="Cari produk yang anda inginkan..."
                    v-model="search"
                  />
                </div>
              </div>
            </div>

            <div class="pencarian">
              <button
                class="btn btn-filter"
                style="display: flex; justify-content: center; gap: 2px;"
                @click="
                  () => {
                    const { tokoid } = $route.params;
                    $router.push({
                      name: 'keranjang-belanja',
                      params: {
                        tokoid,
                        bookid: orders.id,
                      },
                    });
                  }
                "
              >
                <font-awesome-icon icon="shopping-basket" /> Keranjang
                <span
                  v-if="orders.qtyTotal > 0"
                  class="qtyKeranjang"
                  >{{ orders.qtyTotal }}</span
                >
              </button>
              <button class="btn btn-filter" @click="searchProduk">
                <font-awesome-icon icon="search" />
                Cari
              </button>
            </div>
          </div>

          <div class="row"></div>
          <sized-box :height="20" />

          <div class="row">
            <template v-if="!skeletonProduct">
              <div
                class="col-md-6"
                v-for="product in products"
                :key="product.id"
              >
                <ProductCard :data="product" :seller="seller" />
              </div>
            </template>
            <template v-else>
              <div
                class="col-md-6"
                v-for="(_, index) in 6"
                :key="index"
              >
                <SkeletonCard />
              </div>
            </template>
          </div>

          <sized-box :height="130" />

          <MainMenu />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import FixedBanner from '@/components/FixedBanner.vue';
import MainMenu from '@/components/menu/MainMenu.vue';

// @ is an alias to /src
import ProductCard from '@/components/productcard/Index.vue';
import SkeletonCard from '@/components/productcard/SkeletonIndex.vue';
import { mapActions } from 'vuex';

// import scripts
import { Models } from '@/scripts/home/models';
import { Controllers } from '@/scripts/home/controllers';

import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: { ProductCard, SkeletonCard, FixedBanner, MainMenu },
  data() {
    return {
      ...Models,
    };
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.loadProduk();
    this.loadTokoInformation();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    window.scrollTo(0, 0);
    this.resetForm();
  },
  computed: {
    ...mapState('shoppingcart', ['orders']),
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
