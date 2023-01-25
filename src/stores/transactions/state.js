const initialState = () => ({
  isSubmit: false,
  programId: '',
  programTitle: '',
  nominalDonasi: 0,
  paymentId: '',
  paymentTitle: '',
  paymentImage: '',
  userData: {
    namaDonatur: '',
    emailDonatur: '',
    teleponDonatur: '',
    doaDonatur: '',
  },
  paymentResponse: null,
});

export default initialState;
