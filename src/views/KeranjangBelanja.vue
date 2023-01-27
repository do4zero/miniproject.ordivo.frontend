<template>
  <div>
    <!-- main page -->
    <div class="global-wrapper">
      <div class="main">
        <a
          href="javascript:void(0)"
          @click="
            () => {
              $router.go(-1);
            }
          "
          class="topbar-back"
        >
          <font-awesome-icon icon="chevron-left" />
          <div class="back-text">Back</div>
        </a>

        <div class="main-produk">
          <sized-box :height="40" />
          <template v-if="orders.items.length > 0">
            <div
              class="content"
              v-for="order in orders.items"
              :key="order.id"
            >
              <CartCard :product="order" />
            </div>
          </template>
          <div v-else style="padding: 15px">
            <div class="alert alert-warning text-center">
              Anda belum memilih produk.
            </div>
          </div>
          <sized-box :height="140" />
        </div>
        <MainMenu />
      </div>
    </div>
  </div>
</template>

<script>
import MainMenu from '@/components/menu/KeranjangMenu.vue';
import CartCard from '@/components/productcard/CartCard.vue';
// @ is an alias to /src
import { mapActions } from 'vuex';

// import scripts
import { Models } from '@/scripts/keranjang/models';
import { Controllers } from '@/scripts/keranjang/controllers';

import { mapState } from 'vuex';

export default {
  components: {
    MainMenu,
    CartCard,
  },
  data() {
    return {
      ...Models,
    };
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
  },
  computed: {
    ...mapState('shoppingcart', ['orders']),
  },
};
</script>

<style lang="scss" scoped>
@mixin mobile-s {
  @media screen and (max-width: 320px) {
    @content;
  }
}

@mixin mobile-m {
  @media screen and (min-width: 321px) and (max-width: 374px) {
    @content;
  }

  @media screen and(min-width: 375px) and (max-width: 480px) {
    @content;
  }
}

@mixin mobile-l {
  @media screen and(min-width: 481px) and (max-width: 768px) {
    @content;
  }
  @media screen and(min-width: 769px) and (max-width: 820px) {
    @content;
  }
}

@mixin tablet {
  @media screen and(min-width: 769px) and (max-width: 1024px) {
    @content;
  }
}
</style>
