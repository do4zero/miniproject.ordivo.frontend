const actions = {
  setFilters({ commit }, payload) {
    console.log(payload);
    commit('SET_FILTERS', payload.filters);
  },
};

export default actions;
