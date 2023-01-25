// Import Component
import VueNumeric from 'vue-numeric';
import PaymentBox from '../payment/Index.vue';
import { mapState, mapActions } from 'vuex';
import { cantZeroValue, minimalDonation } from '@/utils/helpers';
import { required } from 'vuelidate/lib/validators';

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
    biodataAqiqah_nama: { required },
    biodataAqiqah_gender: { required },
    biodataAqiqah_tempat_lahir: { required },
    biodataAqiqah_tanggal_lahir: { required },
    biodataAqiqah_tanggal_pelaksanaan: { required },
    biodataAqiqah_nama_ayah: { required },
    biodataAqiqah_nama_ibu: { required },
    biodataAqiqah_alamat: { required },
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
