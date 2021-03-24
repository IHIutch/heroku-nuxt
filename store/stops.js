import { getStop, getStops, postStop, putStop } from '~/lib/api/stops'

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
  async fetchAllStops({ commit }) {
    try {
      const data = await getStops()
      commit('SET_STOPS', data)
    } catch (err) {
      throw new Error(err)
    }
  },
  async fetchUniqueStop({ commit }, id) {
    try {
      const data = await getStop(id)
      commit('SET_UNIQUE_STOP', data)
    } catch (err) {
      throw new Error(err)
    }
  },
  async createStop({ commit }, stop) {
    try {
      const data = await postStop(stop)
      commit('CREATE_STOP', data)
    } catch (err) {
      throw new Error(err)
    }
  },
  async updateStop({ commit }, stop) {
    try {
      const data = await putStop(stop.id, stop)
      commit('UPDATE_STOP', data)
    } catch (err) {
      throw new Error(err)
    }
  },
  async deleteStop({ commit }, id) {
    await this.$axios.$delete(`${this.$axios.defaults.baseURL}/stops/${id}`)
    commit('DELETE_STOP', id)
  },
}
