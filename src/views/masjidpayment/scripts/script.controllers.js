import axios from '../../../utils/masjedapi';

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

const Controllers = {
  async submit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = false;
    } else {
      const defaultName = 'Hamba Allah';
      const defaultMail = 'marbot@masjed.id';
      const defaultPhone = '081211300567';

      // let phone = this.handphone;
      // let email = this.email;
      // let mailOrPhone = this.emailOrNope;

      // if (
      //   mailOrPhone.match(
      //     /^([\[\(])?(?:(\+62)|62|0)\1? ?-? ?8(?!0|4|6)\d(?!0)\d\1? ?-? ?\d{3,4} ?-? ?\d{3,5}(?: ?-? ?\d{3})?\b/g
      //   )
      // ) {
      //   phone = this.emailOrNope;
      //   email = defaultMail;
      // }

      // if (checkEmail(mailOrPhone)) {
      //   phone = defaultPhone;
      //   email = this.emailOrNope;
      // }

      try {
        var formData = new FormData();
        formData.append('trx_kategori', 'CMP_MASJED');
        formData.append('produk_id', this.id);
        formData.append('amount', this.nominal);
        formData.append('sof_id', this.payment.paymentId);
        formData.append('name', defaultName);
        formData.append('nohp', defaultPhone);
        formData.append('email', defaultMail);
        this.submitStatus = true;
        this.submitText = 'Loading...';
        const result = await axios.post(
          '/masjid/transaksi/request',
          formData
        );
        this.submitStatus = false;
        this.submitText = 'Tunaikan Sekarang';
        this.setPaymentResponse(result.data.data);
        this.setProduct(this.masjid);

        if (this.payment.paymentGroup === 'QRIS') {
          this.$router.push({
            name: 'trxResponseMasjidQRIS',
            params: {
              id: this.id,
            },
          });
        }

        if (this.payment.paymentGroup === 'EMONEY') {
          this.$router.push({
            name: 'trxResponseMasjidEMONEY',
            params: {
              id: this.id,
            },
          });
        }

        if (this.payment.paymentGroup === 'VA') {
          this.$router.push({
            name: 'trxResponseMasjidVA',
            params: {
              id: this.id,
            },
          });
        }

        if (this.payment.paymentGroup === 'SETORTUNAI') {
          this.$router.push({
            name: 'trxResponseMasjidSETUN',
            params: {
              id: this.id,
            },
          });
        }
      } catch (error) {
        this.submitText = 'Tunaikan Sekarang';
        this.submitStatus = false;
        const errorStatus = error.response.data.data;

        let errorMessage = '';
        for (var key of Object.keys(errorStatus)) {
          errorMessage += errorStatus[key];
        }

        if (errorMessage.includes('required')) {
          this.$toasted
            .show(`Nominal atau Metode Pembayaran belum anda pilih`, {
              position: 'bottom-center',
            })
            .goAway(1000);
        } else {
          this.$toasted
            .show(`${error.message}`, {
              position: 'bottom-center',
            })
            .goAway(1000);
        }
      }
    }
  },
  handleClick() {
    const masjidmaps_id = this.id;
    this.$refs.modalmasjid.showModal({ masjidmaps_id });
  },
  setNominal(val) {
    this.nominal = val;
  },
  setPaymentPilihan(values) {
    this.payment = values;
  },
  async fetchOne() {
    const { id } = this.$router.history.current.params;
    const detail = await axios.get(
      `/dkm/pendanaan/microsite/one/${id}`
    );
    this.dataProgram = detail.data.data;
  },
};

export default Controllers;
