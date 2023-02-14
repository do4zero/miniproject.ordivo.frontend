<template>
  <div>
    <!-- main page -->
    <div class="global-wrapper">
      <div class="main" style="background:#fff">
        <div class="notfound">
          <img src="/img/404.jpg" />
          <sized-box :height="20" />
          <p>
            Ooops... <br />Halaman yang anda cari tidak ditemukan.
          </p>
          <a
            class="btn btn-outline"
            href="javascript:void(0)"
            style="display:block; position:relative; margin: 0 auto;"
            v-if="shop"
            @click="
              () => {
                $router.push({
                  name: 'produk',
                  params: {
                    tokoid: shop.toko_id,
                  },
                });
              }
            "
          >
            <i class="fa fa-map"></i> Kembali ke halaman Utama
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import ShoppingMenu from '@/components/menu/ShoppingMenu.vue';
// @ is an alias to /src
import { mapActions } from 'vuex';

// import scripts
import { Models } from '@/scripts/detail/models';
import { Controllers } from '@/scripts/detail/controllers';

import { mapState } from 'vuex';

export default {
  components: {
    ShoppingMenu,
  },
  data() {
    return {
      ...Models,
    };
  },
  created() {
    this.loadProduk();
  },
  mounted() {},
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
  },
  computed: {
    ...mapState('shoppingcart', ['session', 'shop']),
  },
};
</script>

<style lang="scss" scoped>
@mixin tablet {
  @media screen and(min-width: 769px) and (max-width: 1024px) {
    @content;
  }
}

.notfound {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  img {
    width: 70%;
  }

  p {
    text-align: center;
    font-size: 16px;
  }
}
</style>
