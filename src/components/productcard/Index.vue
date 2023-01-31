<template>
  <div
    class="product-card-wrapper"
    @click="
      () => {
        $router.push({
          name: 'produk-detail',
          params: {
            tokoid: seller,
            produkid: data.id,
          },
        });
      }
    "
  >
    <div class="product-card">
      <div class="image">
        <img
          v-if="!this.imageError"
          :src="data.images"
          @error="onLoadError"
          @load="onLoad"
        />
        <div class="noimage" v-else>
          No Image
        </div>
      </div>
      <div class="body">
        <div class="title">{{ data ? data.nama_produk : 0 }}</div>
        <sized-box :height="15" />
        <div class="price">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <div class="normal">
                  Rp {{ data ? rp(data.harga_jual) : 0 }}
                </div>
              </div>
              <div class="col-md-6">
                <div class="terjual">
                  <div>0 terjual</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="discount">
                  <span class="symbol">Rp</span>
                  {{ data ? rp(data.harga_jual) : 0 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => null,
    },
    seller: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      imageError: false,
    };
  },
  methods: {
    onLoadError() {
      this.imageError = true;
    },
    onLoad() {
      this.imageError = false;
    },
  },
};
</script>

<style lang="scss">
@import '../../app.scss';

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

.product-card-wrapper {
  padding: 5px;
  cursor: pointer;

  .product-card {
    width: 100%;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 6px 0px;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;

    .image {
      height: 180px;
      background: #ccc;

      @include mobile-s {
        height: 130px;
      }

      .noimage {
        text-align: center;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #dfdfdf;
      }
    }

    .body {
      background: #fff;
      padding: 8px;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;

        @include mobile-s {
          font-size: 12px;
          min-height: 33px;
        }

        @include mobile-m {
          font-size: 15px;
          min-height: 33px;
        }
      }

      .price {
        .normal {
          font-size: 11px;
          text-decoration: line-through;
          color: #888;
          @include mobile-s {
            font-size: 8px;
          }
          @include mobile-m {
            font-size: 8px;
          }
        }

        .discount {
          font-weight: 600;
          color: #ff8823;
          @include mobile-s {
            font-size: 13px;
          }
          .symbol {
            font-size: 10px;
            font-weight: normal !important;
          }
        }

        .terjual {
          font-size: 8px;
          height: 100%;
          text-align: right;
          position: relative;
          div {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
