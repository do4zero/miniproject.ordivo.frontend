const mutations = {
  RESET_FORM(state) {
    state.programId = '';
    state.paymentId = '';
    state.paymentTitle = '';
    state.paymentImage = '';
    state.programTitle = '';
    state.nominalDonasi = 0;
    state.userData = {
      namaDonatur: '',
      emailDonatur: '',
      teleponDonatur: '',
      doaDonatur: '',
    };
    state.paymentResponse = null;
  },
  SET_PROGRAM(state, payload) {
    state.programId = payload.programId;
    state.programTitle = payload.programTitle;
    state.nominalDonasi = payload.nominalDonasi;
  },
  SET_PAYMENT(state, payload) {
    state.paymentId = payload.paymentId;
    state.paymentTitle = payload.paymentTitle;
    state.paymentImage = payload.paymentImage;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
  SET_SUBMIT(state, payload) {
    state.isSubmit = payload;
  },
  SET_PAYMENT_RESPONSE(state, payload) {
    state.paymentResponse = payload;
  },
};

export default mutations;
