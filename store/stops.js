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
      [stop.id]: { ...stop },
    }
  },
  UPDATE_STOP(state, stop) {
    state.stops = {
      ...state.stops,
      [stop.id]: { ...stop },
    }
  },
  DELETE_STOP(state, id) {
    state.stops = Object.values(state.stops).filter((v) => v.id !== id)
  },
}

export const getters = {
  getAllStops: (state) => state.stops,
  getOneStop: (state) => (id) => {
    return state.stops.find((stop) => stop.stopId === id)
  },
  getUniqueStop: (state) => state.unique_stop,
}

export const actions = {
  async fetchAllStops({ commit }) {
    const data = await this.$axios.$get(`${this.$axios.defaults.baseURL}/stops`)
    commit('SET_STOPS', data)
  },
  async fetchUniqueStop({ commit }, id) {
    const data = await this.$axios.$get(
      `${this.$axios.defaults.baseURL}/stops/${id}`
    )
    commit('SET_UNIQUE_STOP', data)
  },
  async createStop({ commit }, stop) {
    const data = await this.$axios.$post(
      `${this.$axios.defaults.baseURL}/stops`,
      { stop }
    )
    commit('CREATE_STOP', data)
  },
  async updateStop({ commit }, stop) {
    const data = await this.$axios.$put(
      `${this.$axios.defaults.baseURL}/stops/${stop.id}`,
      { stop }
    )
    commit('UPDATE_STOP', data)
  },
  async deleteStop({ commit }, id) {
    await this.$axios.$delete(`${this.$axios.defaults.baseURL}/stops/${id}`)
    commit('DELETE_STOP', id)
  },
}
