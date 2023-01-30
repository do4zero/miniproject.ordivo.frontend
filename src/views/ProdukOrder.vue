<template>
  <div>
    <!-- main page -->
    <div class="global-wrapper">
      <div class="main">
        <a href="javascript:void(0)" class="topbar-back">
          <div class="back-text">Checkout</div>
        </a>

        <div class="main-produk">
          <sized-box :height="40" />
          <div class="content">
            <div class="bg-white">
              <div class="alamat-pengiriman">
                <div class="header">
                  <font-awesome-icon icon="map-marker-alt" />
                  Alamat Pengambilan / Pengiriman
                </div>
                <div class="body">
                  <div v-if="orders.address">
                    <div class="body-alamat">
                      <div class="edit-alamat" @click="addAddress">
                        <font-awesome-icon icon="edit" />
                      </div>
                      <p class="name">{{ orders.address.name }}</p>
                      <p class="phone-email">
                        {{ orders.address.phone }} ,
                        {{ orders.address.email }}
                      </p>
                      <p class="address">
                        {{ orders.address.address }}
                      </p>
                    </div>
                  </div>
                  <div v-else class="alert alert-warning text-center">
                    Alamat belum ditentukan.<br />
                    <a href="javascript:void(0)" @click="addAddress">
                      Atur alamat pengiriman
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template v-if="orders.items.length > 0">
            <div
              class="content"
              v-for="order in orders.items"
              :key="order.id"
            >
              <CartCard :product="order" />
            </div>
          </template>

          <div v-else class="content">
            <div class="bg-white">
              <div
                class="alert alert-warning text-center"
                style="margin: 0px;"
              >
                Anda belum memilih produk.
              </div>
            </div>
          </div>

          <!-- Metode Pembayaran -->
          <div class="content">
            <div class="bg-white">
              <div class="alamat-pengiriman">
                <div class="header">
                  <font-awesome-icon icon="dollar-sign" /> Metode
                  Pembayaran
                </div>
                <div class="body">
                  <div v-if="payments">
                    <div class="body-alamat">
                      <div
                        class="edit-alamat"
                        @click="
                          () => {
                            $router.push({
                              name: 'metode-pembayaran',
                              params: {
                                tokoid: $route.params.tokoid,
                                bookid: $route.params.bookid,
                              },
                            });
                          }
                        "
                      >
                        <font-awesome-icon icon="edit" />
                      </div>
                      <p class="name">
                        {{ payments ? payments.paymentTitle : '' }}
                      </p>
                      <p class="address">
                        <img
                          :src="
                            `/img/metpem/${
                              payments ? payments.paymentImage : ''
                            }`
                          "
                          height="30px"
                        />
                      </p>
                    </div>
                  </div>
                  <div v-else class="alert alert-warning text-center">
                    Metode pembayaran belum ditentukan.<br />
                    <a
                      href="javascript:void(0)"
                      @click="
                        () => {
                          $router.push({
                            name: 'metode-pembayaran',
                            params: {
                              tokoid: $route.params.tokoid,
                              bookid: $route.params.bookid,
                            },
                          });
                        }
                      "
                    >
                      Pilih Metode Pembayaran
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rincian Pembayaran -->
          <div class="content">
            <div class="bg-white">
              <div class="alamat-pengiriman">
                <div class="header">
                  <font-awesome-icon icon="shopping-cart" />
                  Rincian Pembayaran
                </div>
                <sized-box :height="10" />
                <div class="body">
                  <ul class="rincian-pembayaran">
                    <li>
                      <span class="desc">Subtotal Produk</span>
                      <span class="total"
                        >Rp
                        {{ orders ? rp(orders.priceTotal) : 0 }}</span
                      >
                    </li>
                    <li>
                      <span class="desc">Biaya Layanan</span>
                      <span class="total"
                        >Rp
                        {{
                          payments ? rp(payments.paymentAdmin) : 0
                        }}</span
                      >
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li>
                      <span class="desc">Total Pembayaran</span>
                      <span class="total">
                        Rp
                        {{
                          orders
                            ? rp(
                                orders.priceTotal +
                                  (payments
                                    ? payments.paymentAdmin
                                    : 0)
                              )
                            : 0
                        }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <sized-box :height="140" />
        </div>
        <MainMenu @pay="pay" />
      </div>
      <ModalAdress ref="modal_address" />
    </div>
  </div>
</template>

<script>
import MainMenu from '@/components/menu/CheckoutMenu.vue';
import CartCard from '@/components/productcard/CartCard.vue';
import ModalAdress from '@/components/modal/Address.vue';

// @ is an alias to /src
import { mapActions } from 'vuex';

// import scripts
import { Models } from '@/scripts/orders/models';
import { Controllers } from '@/scripts/orders/controllers';

import { mapState } from 'vuex';

export default {
  components: {
    MainMenu,
    CartCard,
    ModalAdress,
  },
  data() {
    return {
      ...Models,
    };
  },
  mounted() {},
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
    ...mapActions('transactions', [
      'setPaymentResponse',
      'setProduct',
    ]),
  },
  computed: {
    ...mapState('shoppingcart', ['orders']),
    ...mapState('payment', ['payments']),
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

.content {
  padding: 10px;
}

.bg-white {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  width: 100%;

  @include mobile-m {
    font-size: 18px;
  }

  @include mobile-s {
    font-size: 18px;
  }
}

.shopping-cart-item {
  display: flex;
  gap: 10px;
  .image {
    height: 110px;
    flex: 0 0 110px;
    overflow: hidden;
    border-radius: 5px;
    background: #888;

    @include mobile-m {
      height: 110px;
      flex: 0 0 110px;
    }

    @include mobile-s {
      height: 100px;
      flex: 0 0 100px;
    }

    img {
      height: 110px;
      width: 110px;
      object-fit: cover;
    }
  }

  .cart-content {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .delete {
      position: absolute;
      border: 1px solid #ddd;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #bd3636;
      border-radius: 3px;
      top: 0px;
      right: 0px;

      @include mobile-s {
        width: 20px;
        height: 20px;
      }

      svg {
        font-size: 12px;

        @include mobile-s {
          font-size: 10px;
        }
      }
    }

    .subtotal {
      font-size: 10px;
      padding: 5px 0px;
      .price {
        color: #ff8823;
        font-size: 12px;
        font-weight: 500;
      }
    }

    .title {
      max-width: 85%;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 48px;
      display: -webkit-box;
      position: relative;

      @include mobile-m {
        font-size: 14px;
      }

      @include mobile-s {
        font-size: 12px;
        height: 35px;
      }
    }
  }
}
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .counter {
    display: flex;
    gap: 0px;
    .item {
      border: 1px solid #888;
      padding: 1px 15px;
      font-size: 10px;
      color: #888;
      cursor: pointer;
      border-right: none;
      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        border-left: 1px solid #888;
      }

      &:last-child {
        border-right: 1px solid #888;
      }

      @include mobile-s {
        padding: 0px 10px;
      }
    }

    .value {
      width: 70px;
      text-align: center;
      font-size: 12px;
      font-weight: 500;

      @include mobile-s {
        width: 50px;
        font-size: 11px;
      }
      @include mobile-m {
        width: 60px;
        font-size: 10px;
      }
    }
  }

  .add-note {
    padding: 2px 5px;
    background: #fff;
    font-size: 10px;
    text-align: center;
    border: 1px solid #888;
    cursor: pointer;
    @include mobile-s {
      width: 50px;
      font-size: 9px;

      svg {
        display: none;
      }
    }
  }
}

.alamat-pengiriman {
  .header {
    font-size: 11px;
    padding: 5px 0px;
  }

  .body {
    font-size: 11px;
    .alert {
      color: #bb9524 !important;
    }
    a {
      text-decoration: none;
      color: #664d03;
      font-weight: 500;
      font-size: 12px;
    }
  }
}

.rincian-pembayaran {
  list-style: none;
  margin: 0px;
  padding: 0px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.body-alamat {
  position: relative;
  border: 1px solid rgb(221, 220, 220);
  padding: 10px;
  border-radius: 5px;

  .edit-alamat {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px;
    cursor: pointer;
  }

  p {
    padding: 0px;
    margin: 0px;
  }

  .name {
    font-size: 10px;
  }

  .phone-email {
    font-size: 8px;
  }

  .address {
    font-size: 14px;
    padding: 5px 0px;
  }
}
</style>
