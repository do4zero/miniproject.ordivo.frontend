<template>
  <div>
    <div class="total-menu">
      <div class="information">
        Total
        <span>
          Rp
          {{ orders ? rp(orders.priceTotal) : 0 }}
        </span>
      </div>
      <div class="checkout" @click="redirect">
        <button class="btn-checkout">
          Checkout
          {{
            orders.qtyTotal > 0 ? '( ' + orders.qtyTotal + ' )' : ''
          }}
        </button>
      </div>
    </div>
    <div class="main-menu">
      <div class="menu">
        <div
          class="menu-block"
          @click="
            () => {
              $router.push({
                name: 'produk',
                params: $route.params.tokoid,
              });
            }
          "
        >
          <div class="menu-icon">
            <font-awesome-icon icon="shopping-bag" />
          </div>
          Produk
        </div>
        <div class="menu-block">
          <div class="menu-icon">
            <font-awesome-icon icon="user" />
          </div>
          Akun
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('shoppingcart', ['orders']),
  },
  methods: {
    redirect() {
      if (this.orders.items.length > 0) {
        this.$router.push({
          name: 'order-belanja',
          params: {
            tokoid: this.$route.params.tokoid,
            bookid: this.$route.params.bookid,
          },
        });
      } else {
        this.$swal({
          icon: 'error',
          title: 'Pilih Produk',
          text: 'Belum ada produk yang anda pilih.',
        });
      }
    },
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

.menu {
  display: block;
  background: #fff;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  font-size: 9px;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 6px 0px;
  cursor: pointer;

  .menu-block {
    padding: 5px 10px;
    border-radius: 5px;
    text-align: center;
    &:hover {
      background: #ff8823;
      color: #fff;
    }
  }

  .menu-icon {
    text-align: center;
    font-size: 14px;
  }
}
</style>
