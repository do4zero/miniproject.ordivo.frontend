<template>
  <div>
    <div class="total-menu" style="bottom: 45px !important;">
      <div
        class="information"
        style="font-size: 10px; display:flex; justify-content: center; align-items:left; flex-direction:column; gap: 5px;"
      >
        Pilihan Pembayaran
        <span v-if="!payments" style="font-size: 9px; color: #ff8823">
          ( Belum Dipilih )
        </span>
        <div v-else>
          <img
            :src="`/img/metpem/${payments.paymentImage}`"
            height="20px"
          />
        </div>
      </div>
      <div
        class="information"
        style="font-size: 10px; display:flex; justify-content: center; align-items:right; flex-direction:column; gap: 5px;"
      >
        Biaya Penanganan
        <span v-if="!payments" style="font-size: 12px;">
          Rp 0,00-
        </span>
        <span v-else style="font-size: 12px;">
          Rp {{ rp(payments.paymentAdmin) }}
        </span>
      </div>
    </div>
    <div class="main-menu">
      <div
        class="checkout"
        style="display:flex; justify-content: space-between; align-items:center; gap: 10px !important; width: 100%"
        @click="checkout"
      >
        <button class="btn-pesan" style="height:40px; flex: 1">
          Konfirmasi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('payment', ['payments']),
  },
  methods: {
    checkout() {
      if (this.payments) {
        this.$router.push({
          name: 'order-belanja',
          params: {
            tokoid: this.$route.params.tokoid,
            bookid: this.$route.params.bookid,
          },
        });
      } else {
        this.$swal({
          icon: 'error',
          title: 'Pilih Pembayaran',
          text: 'Metode pembayaran anda belum dipilih.',
        });
      }
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
