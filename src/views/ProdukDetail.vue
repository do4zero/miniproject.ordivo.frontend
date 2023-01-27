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
          <div class="image">
            <img
              v-if="imageError"
              :src="product ? product.images : ''"
              @error="onLoadError"
              @load="onLoad"
            />
            <div v-else>No Image</div>
          </div>
          <div class="content">
            <div class="bg-white">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="title">
                      {{ product ? product.nama_produk : '' }}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="nprice">
                      Rp
                      {{
                        product
                          ? rp(parseInt(product.harga_jual))
                          : ''
                      }}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="terjual">0 Terjual</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="sprice">
                      Rp
                      {{
                        product
                          ? rp(parseInt(product.harga_jual))
                          : ''
                      }}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="stok">
                      {{ product ? product.stok : 0 }}
                      <strong>Stok Tersedia</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <sized-box :height="10" />
          <div class="content">
            <div class="bg-white">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="title-desc">Deskripsi produk</div>
                    <sized-box :height="10" />
                    <div class="content-desc">
                      <template v-if="product">
                        <div v-html="product.desc"></div>
                      </template>
                      <div
                        class="alert alert-warning text-center"
                        v-else
                      >
                        Tidak ada deskripsi produk.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <sized-box :height="150" />
        </div>
        <ShoppingMenu
          @addToCart="addToCart"
          @checkoutChart="checkoutChart"
          :qty="orders.qtyTotal > 0 ? orders.qtyTotal : 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
    ...mapState('shoppingcart', ['orders']),
  },
};
</script>

<style lang="scss" scoped>
@mixin center {
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

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

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh - 25vh;
  background: #dedede;
  color: #999;

  img {
    display: block;
    position: relative;
    margin: 0 auto;
    height: 100vh - 25vh;
    object-fit: contain;
  }
}

.bg-white {
  background: #fff;
  padding: 10px;
}

.title {
  font-size: 24px;
  padding: 10px 0px;
  font-weight: 500;

  @include mobile-m {
    font-size: 18px;
  }

  @include mobile-s {
    font-size: 18px;
  }
}

.terjual {
  text-align: right;

  @include mobile-m {
    font-size: 10px;
  }

  @include mobile-s {
    font-size: 11px;
  }
}

.nprice {
  font-size: 15px;
  text-decoration: line-through;

  @include mobile-m {
    font-size: 10px;
  }

  @include mobile-s {
    font-size: 11px;
  }
}

.sprice {
  font-size: 22px;
  font-weight: 500;
  color: #ff8823;

  @include mobile-m {
    font-size: 14px;
  }

  @include mobile-s {
    font-size: 14px;
  }
}

.stok {
  text-align: right;
  font-size: 11px;
}

.title-desc {
  font-size: 14px;
  font-weight: 500;
}
</style>
