export const state = () => ({
  unique_watcher: null,
})

export const mutations = {
  SET_UNIQUE_WATCHER(state, watcher) {
    state.unique_watcher = watcher
  },
}

export const getters = {
  getUniqueWatcher: (state) => state.unique_watcher,
}

export const actions = {
  async fetchUniqueWatcher({ commit }, id) {
    const data = await this.$axios.$get(
      `${this.$axios.defaults.baseURL}/watchers/${id}`
    )
    commit('SET_UNIQUE_WATCHER', data)
  },
  async createWatcher({ commit }, watcher) {
    const data = await this.$axios.$post(
      `${this.$axios.defaults.baseURL}/watchers`,
      { watcher }
    )
    commit('SET_UNIQUE_WATCHER', data)
  },
  async updateWatcher({ commit }, watcher) {
    const data = await this.$axios.$put(
      `${this.$axios.defaults.baseURL}/watchers/${watcher.id}`,
      { watcher }
    )
    commit('SET_UNIQUE_WATCHER', data)
  },
}
