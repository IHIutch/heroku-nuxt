export const state = () => ({
  stops: [],
  unique_stop: [],
})

export const mutations = {
  SET_STOPS(state, stops) {
    state.stops = stops
  },
  CREATE_STOP(state, stop) {
    state.stops.unshift(stop)
  },
  SET_UNIQUE_STOP(state, stop) {
    state.unique_stop = stop
  },
  UPDATE_STOP(state, stop) {
    state.stops[stop.id] = stop
  },
  DELETE_STOP(state, id) {
    state.stops.splice(
      state.stops.findIndex((stop) => stop.id === id),
      1
    )
  },
}

export const getters = {
  getStops: (state) => state.stops,
  getStop: (state) => (id) => {
    return state.stops.find((stop) => stop.stopId === id)
  },
  getUniqueStop: (state) => state.unique_stop,
}

export const actions = {
  async fetchStops({ commit }) {
    const data = await this.$axios.$get(`${this.$axios.defaults.baseURL}/stops`)
    commit('SET_STOPS', data)
  },
  async fetchStop({ commit }, id) {
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
