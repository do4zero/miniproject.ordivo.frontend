import VueNumeric from 'vue-numeric';
import PaymentBox from '../payment/Index.vue';
import Controllers from './script.controllers';
import Models from './script.models';
import ModalMasjid from '@/views/masjidpayment/modal/index.vue';
import { mapState, mapActions } from 'vuex';

/**
 * Custom Validation
 */
const cantZeroValue = (value) => {
  if (value > 0) {
    return true;
  }
  return false;
};

const minimalDonation = (value) => {
  // if (value >= 10000) {
  if (value >= 0) {
    return true;
  }
  return false;
};

const emailOrNope = (value) => {
  if (
    value.match(
      /^([\[\(])?(?:(\+62)|62|0)\1? ?-? ?8(?!0|4|6)\d(?!0)\d\1? ?-? ?\d{3,4} ?-? ?\d{3,5}(?: ?-? ?\d{3})?\b/g
    ) ||
    checkEmail(value)
  ) {
    return true;
  }
  return false;
};

function checkEmail(emailAddress) {
  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  var sAtom =
    '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
  var sDomainLiteral =
    '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  var sQuotedString =
    '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  var sDomain_ref = sAtom;
  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

  var reValidEmail = new RegExp(sValidEmail);

  return reValidEmail.test(emailAddress);
}

export default {
  name: 'ziswafpayment',
  components: { VueNumeric, PaymentBox, ModalMasjid },
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
    // emailOrNope: { emailOrNope },
  },
  mounted() {
    const { id } = this.$router.history.current.params;
    this.id = id;
    window.scrollTo(0, 0);
    this.setPaymentResponse(null);
    this.fetchOne();
  },
  computed: {
    ...mapState('transactions', ['paymentResponse']),
  },
  methods: {
    ...Controllers,
    ...mapActions('transactions', ['setPaymentResponse']),
  },
};
