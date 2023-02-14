<template>
  <div class="product-card-wrapper">
    <div class="product-card">
      <div class="image">
        <div class="noimage">
          No Image
        </div>
      </div>
      <div class="body">
        <div class="title">
          <skeleton
            :theme="'opacity'"
            :shape="'radius'"
            :bg-color="'#dcdbdc'"
          >
            <tb-skeleton
              :width="`100%`"
              :aspect-ratio="0.1"
            ></tb-skeleton>
            <sized-box :height="5" />
          </skeleton>
        </div>
        <sized-box :height="15" />
        <div class="price">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <div class="normal">
                  <skeleton
                    :theme="'opacity'"
                    :shape="'radius'"
                    :bg-color="'#dcdbdc'"
                  >
                    <tb-skeleton
                      :width="`100%`"
                      :aspect-ratio="0.1"
                    ></tb-skeleton>
                    <sized-box :height="5" />
                  </skeleton>
                </div>
              </div>
              <div class="col-md-6">
                <div class="terjual">
                  <div style="padding: 0px 10px">
                    <skeleton
                      :theme="'opacity'"
                      :shape="'radius'"
                      :bg-color="'#dcdbdc'"
                    >
                      <tb-skeleton
                        :width="`30%`"
                        :aspect-ratio="0.1"
                      ></tb-skeleton>
                      <sized-box :height="5" />
                    </skeleton>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="discount">
                  <skeleton
                    :theme="'opacity'"
                    :shape="'radius'"
                    :bg-color="'#dcdbdc'"
                  >
                    <tb-skeleton
                      :width="`40%`"
                      :aspect-ratio="0.05"
                    ></tb-skeleton>
                    <sized-box :height="5" />
                  </skeleton>
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
export default {};
</script>

<style lang="scss">
@import '../../app.scss';

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
          color: #5da6b1;
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
