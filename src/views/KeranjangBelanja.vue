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

<script type="text/javascript">
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
