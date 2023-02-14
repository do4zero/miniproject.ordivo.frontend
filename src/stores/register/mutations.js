const mutations = {
  SET_OTP_KEY(state, payload) {
    state.otp_key = payload.otp_key;
  },
  SET_HEADER_OTP_KEY(state, payload) {
    state.header_otp_key = payload.header_otp_key;
  },
  SET_NO_HP(state, payload) {
    state.nohp = payload.nohp;
  },
  SET_OTP_NUMBER(state, payload) {
    state.otp_number = payload.otp_number;
  },
  SET_CATEGORY(state, payload) {
    state.category_id = payload.category_id;
    state.category_text = payload.category_text;
  },
  SET_REFERRAL_CODE(state, payload) {
    state.code_referral = payload.code_referral;
    state.isCodeReferral = payload.is_code_referral;
    state.super_agen = payload.super_agen;
  },
  RESET(state) {
    state.otp_key = '';
    state.header_otp_key = '';
    state.nohp = '';
    state.otp_number = '';
    state.code_referral = '';
    state.isCodeReferral = false;
    state.super_agen = null;
    state.category_text = ' ( Sesuai Kategori )';
    state.category_id = '';
  },
};

export default mutations;
