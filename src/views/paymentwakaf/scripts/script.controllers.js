import api from '@/utils/api';

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
  async loadMitra() {
    const response = await api.get(
      `/other/getprogram2?type=LEMBAGA&kategori=WAKAF`
    );
    const { data } = response.data;

    this.mitraOptions = data.map(function(item) {
      const items = {
        id: `${item.id}`,
        text: item.fname,
      };
      return items;
    });
  },
  async loadProductOptions(mitra) {
    const response = await api.get(
      `/other/getprogram2?type=PROGRAM&kategori=WAKAF&mitra=${mitra}`
    );
    const { data } = response.data;

    this.productOptions = data.map(function(item) {
      const items = {
        id: `${item.id}`,
        text: item.kategoriname,
      };
      return items;
    });

    this.productValue = this.productOptions[0].id
      ? this.productOptions[0].id
      : 0;
  },
  async submit() {
    const defaultName = 'Hamba Allah';
    const defaultMail = 'marbot@masjed.id';
    const defaultPhone = '081211300567';
    defaultName;
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = false;
    } else {
      try {
        let phone = defaultPhone;
        let primaryEmail = defaultMail;
        let mailOrPhone = this.emailOrNope;

        if (
          mailOrPhone.match(
            /^(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g
          )
        ) {
          phone = mailOrPhone;
          primaryEmail = defaultMail;
        } else {
          this.$toasted
            .show(`Masukan nomor Handphone yang valid.`, {
              position: 'bottom-center',
            })
            .goAway(1000);
        }

        if (checkEmail(mailOrPhone)) {
          phone = defaultPhone;
          primaryEmail = mailOrPhone;
        }

        var formData = new FormData();
        formData.append('Transaksi[typecampprog]', 'PROGRAM');
        formData.append('Transaksi[idcampprog]', this.productValue);
        formData.append('Transaksi[nominal]', this.nominal);
        if (this.payment.paymentId)
          formData.append('Transaksi[bank]', this.payment.paymentId);
        formData.append('Transaksi[namaDonatur]', defaultName);
        formData.append('Transaksi[emailDonatur]', primaryEmail);
        formData.append('Transaksi[telpDonatur]', phone);
        if (this.isForSelf) {
          const {
            fullname,
            ktp,
            handphone,
            tglLahir,
            gender,
            email,
          } = this.biodataJamaah;

          if (
            !fullname ||
            !ktp ||
            !handphone ||
            !tglLahir ||
            !gender ||
            !email
          ) {
            this.$toasted
              .show(
                `Biodata belum anda lengkapi, lengkapi terlebih dahulu.`,
                {
                  position: 'bottom-center',
                }
              )
              .goAway(1000);
            return false;
          }

          formData.append('BiodataAsuransi[fullname]', fullname);
          formData.append('BiodataAsuransi[ktp]', ktp);
          formData.append('BiodataAsuransi[no_tlp]', handphone);
          formData.append('BiodataAsuransi[tgl_lahir]', tglLahir);
          formData.append('BiodataAsuransi[jenis_kelamin]', gender);
          formData.append('BiodataAsuransi[email]', email);
        }

        this.submitStatus = true;
        this.submitText = 'Loading...';
        const result = await api.post('/default/createtrx', formData);
        if (result.data.rc === 404) {
          this.$toasted
            .show(`Nominal atau Metode Pembayaran belum anda pilih`, {
              position: 'bottom-center',
            })
            .goAway(1000);
          this.loading = false;
          this.submitStatus = false;
          this.submitText = 'Tunaikan Sekarang';
          return false;
        }
        this.submitStatus = false;
        this.submitText = 'Tunaikan Sekarang';
        this.setPaymentResponse(result.data.data);
        this.setProduct(this.masjid);

        if (this.payment.paymentGroup === 'QRIS') {
          this.$router.push({
            name: 'wakafResponseQRIS',
            params: {
              id: this.id,
            },
          });
        }

        if (this.payment.paymentGroup === 'EMONEY') {
          this.$router.push({
            name: 'wakafResponseEMONEY',
            params: {
              id: this.id,
            },
          });
        }

        if (this.payment.paymentGroup === 'VA') {
          this.$router.push({
            name: 'wakafResponseVA',
            params: {
              id: this.id,
            },
          });
        }

        if (this.payment.paymentGroup === 'SETORTUNAI') {
          this.$router.push({
            name: 'wakafResponseSETUN',
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
  setNominal(val) {
    this.nominal = val;
  },
  setPaymentPilihan(values) {
    this.payment = values;
  },
  productChangeEvent(val) {},
  productSelectEvent({ id, text }) {},
  mitraChangeEvent(val) {
    this.loadProductOptions(val);
  },
  mitraSelectEvent({ id, text }) {},
};

export default Controllers;
