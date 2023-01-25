const Data = {
  id: '',
  nominal: 10000,
  payment: {
    paymentId: null,
    paymentTitle: null,
    paymentImage: null,
    paymentGroup: null,
  },
  biodataJamaah: {
    fullname: null,
    ktp: null,
    handphone: null,
    tglLahir: null,
    gender: null,
    email: null,
  },
  loading: false,
  submitStatus: false,
  submitText: 'Tunaikan Sekarang',
  productValue: '',
  productOptions: [],
  forValue: '',
  forOptions: [],
  genderOptions: [
    { id: 'L', text: 'Laki-laki' },
    { id: 'P', text: 'Perempuan' },
  ],
  isForSelf: false,
  emailOrNope: '',
};

export default {
  ...Data,
};
