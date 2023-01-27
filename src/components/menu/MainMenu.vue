<template>
  <div class="main-menu">
    <div class="menu">
      <div class="menu-block">
        <div class="menu-icon">
          <font-awesome-icon icon="shopping-bag" />
        </div>
        Produk
      </div>
      <div class="menu-block">
        <div class="menu-icon">
          <font-awesome-icon icon="list" />
        </div>
        Kategori
      </div>
      <div class="menu-block" @click="bagikan">
        <div class="menu-icon">
          <font-awesome-icon icon="question" />
        </div>
        Tanya Penjual
      </div>
      <div class="menu-block">
        <div class="menu-icon"><font-awesome-icon icon="user" /></div>
        Akun
      </div>
    </div>
  </div>
</template>

<script>
import $store from '@/stores/index';

export default {
  methods: {
    bagikan() {
      const { storeInfo } = this.$store.state.shoppingcart;
      const url =
        'https://wa.me/?phone=' +
        storeInfo.seller.nohp +
        '&text=' +
        encodeURI('Assalamu"alaikum, saya mau bertanya...');
      window.open(url, '_blank');
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
