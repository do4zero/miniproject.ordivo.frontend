<template>
  <div>
    <div class="total-menu">
      <div
        class="checkout"
        style="display:flex; justify-content: space-between; align-items:center; gap: 10px !important; width: 100%"
      >
        <button class="btn-checkout" style="height:40px; flex: 1">
          Pesan Sekarang
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
export default {};
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
