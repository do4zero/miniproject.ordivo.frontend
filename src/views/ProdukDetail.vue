<template>
  <div>
    <!-- main page -->
    <div class="global-wrapper">
      <div class="main">
        <a
          v-if="!$route.query.type"
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
          <sized-box v-if="!$route.query.type" :height="40" />
          <div class="image">
            <img
              v-if="!imageError"
              :src="product.image"
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
                    <div class="title" v-if="!skeleton">
                      {{ product ? product.nama_produk : '' }}
                    </div>
                    <template v-else>
                      <skeleton
                        :theme="'opacity'"
                        :shape="'radius'"
                        :bg-color="'#dcdbdc'"
                      >
                        <tb-skeleton
                          :width="`100%`"
                          :aspect-ratio="0.05"
                        ></tb-skeleton>
                        <sized-box :height="5" />
                      </skeleton>
                    </template>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="nprice" v-if="!skeleton">
                      Rp
                      {{ product ? rp(parseInt(product.price)) : '' }}
                    </div>
                    <template v-else>
                      <sized-box :height="10" />
                      <skeleton
                        :theme="'opacity'"
                        :shape="'radius'"
                        :bg-color="'#dcdbdc'"
                      >
                        <tb-skeleton
                          :width="`40%`"
                          :aspect-ratio="0.1"
                        ></tb-skeleton>
                        <sized-box :height="5" />
                      </skeleton>
                    </template>
                  </div>
                  <div class="col-md-6">
                    <div class="terjual" v-if="!skeleton">
                      0 Terjual
                    </div>
                    <template v-else>
                      <sized-box :height="10" />
                      <div class="right-skeleton">
                        <skeleton
                          :theme="'opacity'"
                          :shape="'radius'"
                          :bg-color="'#dcdbdc'"
                        >
                          <tb-skeleton
                            :width="`70%`"
                            :aspect-ratio="0.1"
                          ></tb-skeleton>
                          <sized-box :height="5" />
                        </skeleton>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="sprice" v-if="!skeleton">
                      Rp
                      {{ product ? rp(parseInt(product.price)) : '' }}
                    </div>
                    <template v-else>
                      <sized-box :height="10" />
                      <skeleton
                        :theme="'opacity'"
                        :shape="'radius'"
                        :bg-color="'#dcdbdc'"
                      >
                        <tb-skeleton
                          :width="`70%`"
                          :aspect-ratio="0.1"
                        ></tb-skeleton>
                        <sized-box :height="5" />
                      </skeleton>
                    </template>
                  </div>
                  <div class="col-md-6">
                    <div class="stok" v-if="!skeleton">
                      {{ product ? product.stok : 0 }}
                      <strong>Stok Tersedia</strong>
                    </div>
                    <template v-else>
                      <div class="right-skeleton">
                        <skeleton
                          :theme="'opacity'"
                          :shape="'radius'"
                          :bg-color="'#dcdbdc'"
                        >
                          <tb-skeleton
                            :width="`70%`"
                            :aspect-ratio="0.05"
                          ></tb-skeleton>
                          <sized-box :height="5" />
                        </skeleton>
                      </div>
                    </template>
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
                      <template v-if="!skeleton">
                        <template v-if="product">
                          <div v-html="product.description"></div>
                        </template>
                        <div
                          class="alert alert-warning text-center"
                          v-else
                        >
                          Tidak ada deskripsi produk.
                        </div>
                      </template>
                      <template v-else>
                        <skeleton
                          :theme="'opacity'"
                          :shape="'radius'"
                          :bg-color="'#dcdbdc'"
                        >
                          <tb-skeleton
                            :width="`80%`"
                            :aspect-ratio="0.02"
                          ></tb-skeleton>
                          <sized-box :height="10" />
                          <tb-skeleton
                            :width="`60%`"
                            :aspect-ratio="0.02"
                          ></tb-skeleton>
                          <sized-box :height="10" />
                          <tb-skeleton
                            :width="`70%`"
                            :aspect-ratio="0.02"
                          ></tb-skeleton>
                        </skeleton>
                      </template>
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
          :skeleton="skeleton"
        />
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
    width: 100%;
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
  color: #5da6b1;

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
