const actions = {
  setOTPKey({ commit }, payload) {
    commit('SET_OTP_KEY', payload);
  },
  setHeaderOTPKey({ commit }, payload) {
    commit('SET_HEADER_OTP_KEY', payload);
  },
  setNoHP({ commit }, payload) {
    commit('SET_NO_HP', payload);
  },
  setOTPNumber({ commit }, payload) {
    commit('SET_OTP_NUMBER', payload);
  },
  setCategory({ commit }, payload) {
    commit('SET_CATEGORY', payload);
  },
  setReferral({ commit }, payload) {
    commit('SET_REFERRAL_CODE', payload);
  },
  actionReset({ commit }) {
    commit('RESET');
  },
};

export default actions;
