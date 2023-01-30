<template>
  <div>
    <div class="total-menu">
      <div
        class="checkout"
        style="display:flex; justify-content: space-between; align-items:center; gap: 10px !important; width: 100%"
      >
        <button
          class="btn-bagikan"
          style="height:40px; flex: 1;"
          @click="bagikan"
        >
          <font-awesome-icon icon="share-alt" /> Bagikan
        </button>
        <button
          class="btn-checkout"
          style="height:40px; flex: 1"
          @click="
            () => {
              $emit('checkoutChart');
            }
          "
          :disabled="skeleton"
        >
          Checkout
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
          <span>Produk</span>
        </div>
        <div
          class="menu-block"
          @click="
            () => {
              $emit('addToCart');
            }
          "
        >
          <div class="menu-icon">
            <font-awesome-icon icon="plus" />
          </div>
          <span>Masukan Keranjang</span>
        </div>
        <div
          class="menu-block"
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
          <div class="menu-icon">
            <font-awesome-icon icon="shopping-basket" />
          </div>
          Keranjang Belanja
          <span v-if="qty > 0" class="badge-shopping">
            {{ qty }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    total: {
      type: Number,
      default: () => 0,
    },
    qty: {
      type: Number,
      default: () => 0,
    },
    skeleton: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapState('shoppingcart', ['orders']),
  },
  methods: {
    bagikan() {
      const { fullPath } = this.$router.currentRoute;
      const url =
        'https://wa.me/?text=' +
        encodeURI(window.location.origin + fullPath);
      window.open(url, '_blank');
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
    padding: 3px 10px;
    border-radius: 5px;
    text-align: center;
    position: relative;
    &:hover {
      background: #ff8823;
      color: #fff;
    }

    .menu-icon {
      text-align: center;
      font-size: 14px;
    }

    span {
      font-size: 10px;
      @include mobile-s {
        font-size: 8px;
      }
    }

    .badge-shopping {
      position: absolute;
      top: -10px;
      left: 55px;
      width: 20px;
      height: 20px;
      background: red;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
