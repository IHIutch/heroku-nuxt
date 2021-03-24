export const state = () => ({
  stops: null,
  unique_stop: null,
})

export const mutations = {
  SET_STOPS(state, stops) {
    // eslint-disable-next-line no-sequences
    state.stops = stops.reduce((a, b) => ((a[b.id] = b), a), {})
  },
  SET_UNIQUE_STOP(state, stop) {
    state.unique_stop = stop
  },
  CREATE_STOP(state, stop) {
    state.stops = {
      ...state.stops,
      [stop.id]: stop,
    }
  },
  UPDATE_STOP(state, stop) {
    state.stops = {
      ...state.stops,
      [stop.id]: { ...stop.id, ...stop },
    }
  },
  DELETE_STOP(state, id) {
    state.stops = Object.values(state.stops).filter((v) => v.id !== id)
  },
}

export const getters = {
  getAllStops: (state) => state.stops,
  getOneStop: (state) => (id) => {
    return state.stops[id]
  },
  getUniqueStop: (state) => state.unique_stop,
}

export const actions = {
  fetchAllStops({ commit }, data) {
    commit('SET_STOPS', data)
  },
  fetchUniqueStop({ commit }, data) {
    commit('SET_UNIQUE_STOP', data)
  },
  createStop({ commit }, data) {
    commit('CREATE_STOP', data)
  },
  updateStop({ commit }, data) {
    commit('UPDATE_STOP', data)
  },
  deleteStop({ commit }, id) {
    commit('DELETE_STOP', id)
  },
}
