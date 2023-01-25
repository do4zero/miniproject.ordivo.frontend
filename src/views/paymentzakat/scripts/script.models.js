const Data = {
  id: '',
  nominal: 10000,
  payment: {
    paymentId: null,
    paymentTitle: null,
    paymentImage: null,
    paymentGroup: null,
  },
  loading: false,
  submitStatus: false,
  submitText: 'Tunaikan Sekarang',
  mitraValue: '',
  mitraOptions: [],
  productValue: '',
  productOptions: [],
  isForSelf: false,
  emailOrNope: '',
};

export default {
  ...Data,
};
