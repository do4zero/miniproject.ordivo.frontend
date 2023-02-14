<template>
  <div class="main-menu">
    <div class="menu">
      <div class="menu-block">
        <div class="menu-icon">
          <font-awesome-icon icon="shopping-bag" />
        </div>
        Produk
      </div>
      <div class="menu-block" @click="bagikan">
        <div class="menu-icon">
          <font-awesome-icon icon="question" />
        </div>
        Tanya Penjual
      </div>
      <div
        class="menu-block"
        @click="
          () => {
            $router.push({
              name: 'order-history-list',
              params: {
                tokoid: $route.params.tokoid,
              },
            });
          }
        "
      >
        <div class="menu-icon">
          <font-awesome-icon icon="history" />
        </div>
        Riwayat
      </div>
    </div>
  </div>
</template>

<script>
import $store from '@/stores/index';

export default {
  methods: {
    bagikan() {
      const {
        phone,
      } = this.$store.state.shoppingcart.storeInfo.seller;
      const url =
        'https://api.whatsapp.com/send?phone=' +
        phone +
        '&text=' +
        encodeURI('Hallo, saya mau bertanya...');
      window.open(url, '_self');
    },
  },
};
</script>
<style lang="scss" scoped>
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
      background: #5da6b1;
      color: #fff;
    }
  }

  .menu-icon {
    text-align: center;
    font-size: 14px;
  }
}
</style>
