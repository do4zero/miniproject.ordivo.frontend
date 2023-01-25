const Data = {
  id: '',
  nominal: 10000,
  payment: {
    paymentId: null,
    paymentTitle: null,
    paymentImage: null,
    paymentGroup: null,
  },
  biodataAqiqah_nama: null,
  biodataAqiqah_gender: null,
  biodataAqiqah_tempat_lahir: null,
  biodataAqiqah_tanggal_lahir: null,
  biodataAqiqah_tanggal_pelaksanaan: null,
  biodataAqiqah_nama_ayah: null,
  biodataAqiqah_nama_ibu: null,
  biodataAqiqah_alamat: null,

  loading: false,
  submitStatus: false,
  submitText: 'Tunaikan Sekarang',
  mitraValue: '',
  mitraOptions: [],
  productValue: '',
  productOptions: [],
  isForSelf: false,
  emailOrNope: '',
  genderOptions: [
    { id: 'L', text: 'Laki-laki' },
    { id: 'P', text: 'Perempuan' },
  ],
};

export default {
  ...Data,
};
