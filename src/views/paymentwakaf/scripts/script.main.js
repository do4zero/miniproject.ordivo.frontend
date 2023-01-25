// Import Component
import VueNumeric from 'vue-numeric';
import PaymentBox from '../payment/Index.vue';
import { mapState, mapActions } from 'vuex';
import { cantZeroValue, minimalDonation } from '@/utils/helpers';

// Controllers & Models
import Controllers from './script.controllers';
import Models from './script.models';

// Export Default
export default {
  name: 'zakatpayment',
  components: { VueNumeric, PaymentBox },
  data() {
    return {
      ...Models,
    };
  },
  validations: {
    nominal: {
      cantZeroValue,
      minimalDonation,
    },
  },
  created() {
    const { id } = this.$router.history.current.params;
    this.id = id;
    this.setPaymentResponse(null);
  },
  mounted() {
    window.scrollTo(0, 0);
    this.loadMitra();
  },
  computed: {
    ...mapState('transactions', ['paymentResponse']),
  },
  methods: {
    ...Controllers,
    ...mapActions('transactions', [
      'setPaymentResponse',
      'setProduct',
    ]),
  },
};
