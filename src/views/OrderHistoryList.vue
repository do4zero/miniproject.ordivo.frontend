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

        <sized-box :height="40" />
        <div
          class="content"
          v-for="product in products"
          :key="product.id"
          @click="
            () => {
              redirect({ ...product });
            }
          "
        >
          <div class="bg-white">
            <div class="card-order">
              <div class="order-id items">
                <span class="label"><strong>Order ID</strong></span>
                <span class="value">{{ product.trxid }}</span>
              </div>
              <div class="order-date items">
                <span class="label"><strong>Trx Date</strong></span>
                <span class="value">{{ product.order_date }}</span>
              </div>
              <div class="order-qty items">
                <span class="label"><strong>Qty</strong></span>
                <span class="value"
                  >{{ product.total_qty }} items</span
                >
              </div>
              <div class="order-amount items">
                <span class="label"><strong>Amount</strong></span>
                <span class="value"
                  >Rp {{ rp(product.total_amount) }}</span
                >
              </div>
              <div class="order-amount items">
                <span class="label"><strong>Status</strong></span>
                <span
                  :class="
                    `value ${
                      product.status === 'WAITING' ||
                      product.status === 'WAITING'
                        ? 'red'
                        : 'green'
                    }`
                  "
                >
                  {{
                    product
                      ? product.status.toLowerCase(0) === 'waiting' ||
                        product.status.toLowerCase(0) === 'failed'
                        ? 'Belum Dibayar'
                        : 'Sudah Dibayar'
                      : 'Belum Dibayar'
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';

// import scripts
import { Models } from '@/scripts/historylist/models';
import { Controllers } from '@/scripts/historylist/controllers';

import { mapState } from 'vuex';

export default {
  components: {},
  data() {
    return {
      ...Models,
    };
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
    redirect(product) {
      const { tokoid } = this.$route.params;

      if (product.payment_group === 'QRIS') {
        this.$router.push({
          name: 'transactionResponseQRIS',
          params: {
            id: product.trxid,
            tokoid: tokoid,
          },
        });
      }

      if (product.payment_group === 'EMONEY') {
        this.$router.push({
          name: 'transactionResponseEMONEY',
          params: {
            id: product.trxid,
            tokoid: tokoid,
          },
        });
      }

      if (product.payment_group === 'VA') {
        this.$router.push({
          name: 'transactionResponseVA',
          params: {
            id: product.trxid,
            tokoid: tokoid,
          },
        });
      }

      if (product.payment_group === 'SETORTUNAI') {
        this.$router.push({
          name: 'transactionResponseSETUN',
          params: {
            id: product.trxid,
            tokoid: tokoid,
          },
        });
      }
    },
  },
  created() {
    this.getHistoryList();
  },
  computed: {
    ...mapState('shoppingcart', ['orders']),
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

.bg-white {
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 1px 0px;
}

.card-order {
  .items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0px;

    .label,
    .value {
      font-size: 11px;
    }

    .red {
      border: 1px solid rgb(248, 82, 82);
      padding: 0px 8px;
      border-radius: 5px;
      color: rgb(248, 82, 82);
    }
    .green {
      border: 1px solid rgb(143, 248, 82);
      padding: 0px 8px;
      color: rgb(143, 248, 82);
    }
  }
}
</style>
