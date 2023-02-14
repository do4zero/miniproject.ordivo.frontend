<template>
  <div>
    <!-- main page -->
    <div class="global-wrapper">
      <div class="main">
        <a
          href="javascript:void(0)"
          @click="back"
          class="topbar-back"
        >
          <font-awesome-icon icon="chevron-left" />
          <div class="back-text">Back</div>
        </a>

        <div class="main-produk">
          <sized-box :height="40" />
          <div class="content">
            <div class="bg-white" style="padding: 20px">
              <payment-box
                @setPaymentPilihan="setPaymentPilihan"
              ></payment-box>
            </div>
          </div>

          <sized-box :height="140" />
        </div>
        <MainMenu
          @handleConfirmation="handleConfirmation"
          :paymentPick="paymentPick"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import MainMenu from '@/components/menu/PesanMenu.vue';
import PaymentBox from '@/components/payment/Index.vue';

// @ is an alias to /src
import { mapActions } from 'vuex';

// import scripts
import { Models } from '@/scripts/metodepembayaran/models';
import { Controllers } from '@/scripts/metodepembayaran/controllers';

import { mapState } from 'vuex';

export default {
  components: {
    MainMenu,
    PaymentBox,
  },
  data() {
    return {
      ...Models,
    };
  },
  mounted() {
    if (this.payments) {
      this.paymentPick = this.payments;
    }
  },
  methods: {
    ...mapActions('transactions', ['resetForm']),
    ...Controllers,
  },
  computed: {
    ...mapState('shoppingcart', ['orders']),
    ...mapState('payment', ['payments']),
  },
};
</script>
