const actions = {
  setFilters({ commit }, payload) {
    commit('SET_FILTERS', payload.filters);
  },
};

export default actions;
